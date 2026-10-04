import { addDays, daysAgo, fetchJson, getGoogleAccessToken, isoNow, percentageChange, readCsv, toCsv, toPath, updateManifest, writeJson, writeText } from "../lib/common.mjs"

const sourceId = "search-console"
const siteUrl = process.env.GSC_SITE_URL || "sc-domain:trip-cache.com"
const token = getGoogleAccessToken()
const reportingLagDays = 3
const endDate = daysAgo(reportingLagDays)
const freshEndDate = daysAgo(0)
// Search Console keeps ~16 months; the first run backfills all of it.
const maxHistoryDays = 485
// Re-pull the last few finalized days on every run in case Google restates them.
const restateDays = 5
const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`

if (!token) {
  await updateManifest(sourceId, {
    status: "WAITING_FOR_HUMAN_AUTH",
    freshness: "stale",
    note: "No short-lived Google access token (runs in the GitHub data-feed workflow).",
  })
  console.log("Search Console skipped: no short-lived Google access token")
  process.exit(process.argv.includes("--strict") ? 1 : 0)
}

async function query({ startDate, end = endDate, dimensions = [], rowLimit = 25000, dataState }) {
  const rows = []
  for (let startRow = 0; ; startRow += rowLimit) {
    const data = await fetchJson(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate, endDate: end, dimensions, type: "web", rowLimit, startRow, ...(dataState ? { dataState } : {}) }),
    })
    const batch = data.rows || []
    rows.push(...batch)
    if (batch.length < rowLimit) return { rows, metadata: data.metadata }
  }
}

function metrics(row) {
  return { clicks: row.clicks || 0, impressions: row.impressions || 0, ctr: row.ctr || 0, position: row.position || 0 }
}

function normalize(rows, dimension) {
  return rows.map((row) => ({ [dimension]: row.keys?.[0] || "", ...metrics(row) }))
}

const round = (value, digits) => Number(value.toFixed(digits))

async function mergeHistory(file, columns, fetchRows) {
  const existing = await readCsv(file)
  const latest = existing.map((row) => row.date).sort().at(-1)
  const startDate = latest ? addDays(latest, -restateDays) : daysAgo(maxHistoryDays)
  const fresh = await fetchRows(startDate)
  const merged = [...existing.filter((row) => row.date < startDate), ...fresh]
    .sort((a, b) => a.date.localeCompare(b.date) || String(a.page || "").localeCompare(String(b.page || "")))
  await writeText(file, toCsv(merged, columns))
  return { rows: merged.length, from: merged[0]?.date ?? null, to: merged.at(-1)?.date ?? null }
}

const historyRow = (row) => ({ ...row, ctr: round(row.ctr, 4), position: round(row.position, 2) })

try {
  const currentStart = daysAgo(30)
  const previousStart = daysAgo(58)
  const previousEnd = daysAgo(31)
  const freshStartDate = daysAgo(7)
  const [current, previous, dates, queriesRaw, pagesRaw, queryPagesRaw, countriesRaw, devicesRaw, fresh] = await Promise.all([
    query({ startDate: currentStart }),
    query({ startDate: previousStart, end: previousEnd }),
    query({ startDate: daysAgo(92), dimensions: ["date"] }),
    query({ startDate: currentStart, dimensions: ["query"] }),
    query({ startDate: currentStart, dimensions: ["page"] }),
    query({ startDate: currentStart, dimensions: ["page", "query"] }),
    query({ startDate: currentStart, dimensions: ["country"] }),
    query({ startDate: currentStart, dimensions: ["device"] }),
    query({ startDate: freshStartDate, end: freshEndDate, dimensions: ["date", "page"], dataState: "all" }),
  ])

  const totals = current.rows[0] ? metrics(current.rows[0]) : { clicks: 0, impressions: 0, ctr: 0, position: null }
  const previousTotals = previous.rows[0] ? metrics(previous.rows[0]) : { clicks: 0, impressions: 0, ctr: 0, position: null }
  const queries = normalize(queriesRaw.rows, "query")
  const pages = normalize(pagesRaw.rows, "page")
  const queryPages = queryPagesRaw.rows.map((row) => ({ page: row.keys?.[0] || "", query: row.keys?.[1] || "", ...metrics(row) }))
  const generatedAt = isoNow()
  const period = { startDate: currentStart, endDate }

  const keywordMap = Object.values(queryPages.reduce((map, row) => {
    const entry = map[row.page] || { page: row.page, impressions: 0, clicks: 0, queries: [] }
    entry.impressions += row.impressions
    entry.clicks += row.clicks
    entry.queries.push({ query: row.query, clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position })
    map[row.page] = entry
    return map
  }, {}))
    .map((entry) => ({ ...entry, queries: entry.queries.sort((a, b) => b.impressions - a.impressions).slice(0, 25) }))
    .sort((a, b) => b.impressions - a.impressions)

  await writeJson("data/search-console/latest.json", {
    source: "Google Search Console API",
    generatedAt,
    reportingLagDays,
    period,
    totals,
    previousPeriod: { startDate: previousStart, endDate: previousEnd, totals: previousTotals },
    change: {
      clicks: percentageChange(totals.clicks, previousTotals.clicks),
      impressions: percentageChange(totals.impressions, previousTotals.impressions),
      ctr: percentageChange(totals.ctr, previousTotals.ctr),
    },
    daily: normalize(dates.rows, "date").slice(-90),
    fresh: {
      dataState: "all",
      directionalOnly: true,
      period: { startDate: freshStartDate, endDate: freshEndDate },
      firstIncompleteDate: fresh.metadata?.firstIncompleteDate || fresh.metadata?.first_incomplete_date || null,
      pageDaily: fresh.rows.map((row) => ({ date: row.keys?.[0] || "", page: row.keys?.[1] || "", ...metrics(row) })),
      note: "Fresh rows may still change. Use them to spot indexing or tracking breakage after a release, never to judge a change.",
    },
  })
  await writeJson("data/search-console/queries.json", {
    generatedAt,
    period,
    topQueries: queries.slice(0, 250),
    ctrOpportunities: queries
      .filter((row) => row.impressions >= 20 && row.ctr < 0.01 && row.position <= 15)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 100),
    rankingOpportunities: queries
      .filter((row) => row.impressions >= 10 && row.position >= 4 && row.position <= 30)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 100),
  })
  await writeJson("data/search-console/pages.json", { generatedAt, period, pages })
  await writeJson("data/search-console/opportunities.json", {
    source: "Google Search Console API",
    generatedAt,
    period,
    pageOpportunities: pages
      .filter((row) => row.impressions >= 20 && row.position <= 20 && row.ctr < 0.015)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 100),
    queryPageOpportunities: queryPages
      .filter((row) => row.impressions >= 5 && row.position <= 20 && row.ctr < 0.015)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 250),
  })
  await writeJson("data/search-console/keyword-map.json", { source: "Google Search Console API", generatedAt, period, pages: keywordMap })
  await writeJson("data/search-console/countries.json", { generatedAt, period, countries: normalize(countriesRaw.rows, "country") })
  await writeJson("data/search-console/devices.json", { generatedAt, period, devices: normalize(devicesRaw.rows, "device") })

  // Durable daily history. The changelog review compares 28-day windows from these files.
  const siteHistory = await mergeHistory("data/search-console/site-daily.csv", ["date", "clicks", "impressions", "ctr", "position"], async (startDate) =>
    (await query({ startDate, dimensions: ["date"] })).rows.map((row) => historyRow({ date: row.keys[0], ...metrics(row) })))
  const pageHistory = await mergeHistory("data/search-console/page-daily.csv", ["date", "page", "clicks", "impressions", "ctr", "position"], async (startDate) =>
    (await query({ startDate, dimensions: ["date", "page"] })).rows.map((row) => historyRow({ date: row.keys[0], page: toPath(row.keys[1]), ...metrics(row) })))

  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: "fresh",
    reportingLagDays,
    latestSyncTime: generatedAt,
    coveredDateRange: period,
    history: { site: siteHistory, pages: pageHistory },
    note: "Search Console API via the repository-scoped short-lived Google token.",
  })
  console.log(`Search Console: ${totals.clicks} clicks / ${totals.impressions} impressions; history ${pageHistory.from}…${pageHistory.to} (${pageHistory.rows} page-day rows).`)
} catch (error) {
  await updateManifest(sourceId, {
    status: "CONNECTOR_FAILURE",
    freshness: "stale",
    note: `${error.message}${error.body ? `: ${JSON.stringify(error.body).slice(0, 500)}` : ""}`,
  })
  console.error(error.message)
  process.exitCode = process.argv.includes("--strict") ? 1 : 0
}
