import { daysAgo, fetchJson, isoNow, updateManifest, writeJson, getGoogleAccessToken, percentageChange } from "./lib/common.mjs"

const sourceId = "search-console"
const siteUrl = process.env.GSC_SITE_URL || "sc-domain:trip-cache.com"
const token = getGoogleAccessToken()
const reportingLagDays = 3
const endDate = daysAgo(reportingLagDays)

if (!token) {
  await updateManifest(sourceId, {
    status: "WAITING_FOR_HUMAN_AUTH",
    freshness: "stale",
    note: "Collector is ready; Google Workload Identity and Search Console property access are not configured.",
  })
  console.log("Search Console skipped: no short-lived Google access token")
  process.exit(process.argv.includes("--strict") ? 1 : 0)
}

async function query({ startDate, dimensions = [], rowLimit = 25000 }) {
  const rows = []
  for (let startRow = 0; ; startRow += rowLimit) {
    const data = await fetchJson(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, dimensions, type: "web", rowLimit, startRow }),
      },
    )
    const batch = data.rows || []
    rows.push(...batch)
    if (batch.length < rowLimit) break
  }
  return rows
}

function normalize(rows, dimension) {
  return rows.map((row) => ({
    [dimension]: row.keys?.[0] || "",
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }))
}

function normalizeQueryPages(rows) {
  return rows.map((row) => ({
    page: row.keys?.[0] || "",
    query: row.keys?.[1] || "",
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }))
}

try {
  const currentStart = daysAgo(30)
  const previousStart = daysAgo(58)
  const previousEnd = daysAgo(31)
  const [currentTotalRows, previousTotalRows, dates, queriesRaw, pagesRaw, queryPagesRaw, countriesRaw, devicesRaw] = await Promise.all([
    query({ startDate: currentStart }),
    (async () => {
      const response = await fetchJson(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ startDate: previousStart, endDate: previousEnd, type: "web" }),
        },
      )
      return response.rows || []
    })(),
    query({ startDate: daysAgo(92), dimensions: ["date"] }),
    query({ startDate: currentStart, dimensions: ["query"] }),
    query({ startDate: currentStart, dimensions: ["page"] }),
    query({ startDate: currentStart, dimensions: ["page", "query"] }),
    query({ startDate: currentStart, dimensions: ["country"] }),
    query({ startDate: currentStart, dimensions: ["device"] }),
  ])

  const current = currentTotalRows[0] || { clicks: 0, impressions: 0, ctr: 0, position: null }
  const previous = previousTotalRows[0] || { clicks: 0, impressions: 0, ctr: 0, position: null }
  const queries = normalize(queriesRaw, "query")
  const pages = normalize(pagesRaw, "page")
  const countries = normalize(countriesRaw, "country")
  const devices = normalize(devicesRaw, "device")
  const queryPages = normalizeQueryPages(queryPagesRaw)
  const generatedAt = isoNow()
  const pageOpportunities = pages
    .filter((row) => row.impressions >= 20 && row.position <= 20 && row.ctr < 0.015)
    .sort((a, b) => b.impressions - a.impressions)
  const queryPageOpportunities = queryPages
    .filter((row) => row.impressions >= 5 && row.position <= 20 && row.ctr < 0.015)
    .sort((a, b) => b.impressions - a.impressions)
  const keywordMap = Object.values(queryPages.reduce((map, row) => {
    const entry = map[row.page] || { page: row.page, impressions: 0, clicks: 0, queries: [] }
    entry.impressions += row.impressions
    entry.clicks += row.clicks
    entry.queries.push({
      query: row.query,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })
    map[row.page] = entry
    return map
  }, {})).map((entry) => ({
    ...entry,
    queries: entry.queries.sort((a, b) => b.impressions - a.impressions).slice(0, 25),
  })).sort((a, b) => b.impressions - a.impressions)

  await writeJson("data/search-console/latest.json", {
    source: "Google Search Console API",
    generatedAt,
    reportingLagDays,
    period: { startDate: currentStart, endDate },
    totals: current,
    previousPeriod: { startDate: previousStart, endDate: previousEnd, totals: previous },
    change: {
      clicks: percentageChange(current.clicks, previous.clicks),
      impressions: percentageChange(current.impressions, previous.impressions),
      ctr: percentageChange(current.ctr, previous.ctr),
    },
    daily: normalize(dates, "date").slice(-90),
  })
  await writeJson("data/search-console/queries.json", {
    generatedAt,
    period: { startDate: currentStart, endDate },
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
  await writeJson("data/search-console/pages.json", { generatedAt, pages })
  await writeJson("data/seo/opportunities.json", {
    source: "Google Search Console API",
    generatedAt,
    period: { startDate: currentStart, endDate },
    pageOpportunities: pageOpportunities.slice(0, 100),
    queryPageOpportunities: queryPageOpportunities.slice(0, 250),
  })
  await writeJson("data/seo/keyword-map.json", {
    source: "Google Search Console API",
    generatedAt,
    period: { startDate: currentStart, endDate },
    pages: keywordMap,
  })
  await writeJson("data/search-console/countries.json", { generatedAt, countries })
  await writeJson("data/search-console/devices.json", { generatedAt, devices })
  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: "fresh",
    latestSyncTime: generatedAt,
    coveredDateRange: { startDate: currentStart, endDate },
    warehouseTable: "trip-cache.tripcache_growth.search_console_daily",
    generatedLocalSnapshot: "growth/data/search-console/latest.json",
    note: "Automated through the Search Console API using a repository-scoped short-lived token.",
  })
} catch (error) {
  await updateManifest(sourceId, {
    status: "CONNECTOR_FAILURE",
    freshness: "stale",
    note: `${error.message}${error.body ? `: ${JSON.stringify(error.body).slice(0, 500)}` : ""}`,
  })
  console.error(error.message)
  process.exitCode = process.argv.includes("--strict") ? 1 : 0
}
