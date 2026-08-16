import { fetchJson, isoNow, updateManifest, writeJson, getGoogleAccessToken } from "./lib/common.mjs"

const sourceId = "ga4"
const propertyId = process.env.GA4_PROPERTY_ID || "514130776"
const token = getGoogleAccessToken()

if (!token) {
  await updateManifest(sourceId, {
    status: "WAITING_FOR_HUMAN_AUTH",
    freshness: "stale",
    note: "Collector is ready; Google Workload Identity and GA4 property access are not configured.",
  })
  console.log("GA4 skipped: no short-lived Google access token")
  process.exit(process.argv.includes("--strict") ? 1 : 0)
}

async function runReport(body) {
  return fetchJson(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

function rows(report) {
  return (report.rows || []).map((row) => ({
    dimensions: Object.fromEntries((report.dimensionHeaders || []).map((header, index) => [header.name, row.dimensionValues?.[index]?.value || ""])),
    metrics: Object.fromEntries((report.metricHeaders || []).map((header, index) => [header.name, Number(row.metricValues?.[index]?.value || 0)])),
  }))
}

try {
  const generatedAt = isoNow()
  const [eventsReport, retentionReport] = await Promise.all([
    runReport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "3daysAgo" }],
      dimensions: [{ name: "eventName" }, { name: "platform" }],
      metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
      limit: 10000,
    }),
    runReport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "3daysAgo" }],
      dimensions: [{ name: "newVsReturning" }, { name: "platform" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      limit: 1000,
    }),
  ])
  const eventRows = rows(eventsReport)
  const websiteRows = eventRows.filter((row) => row.dimensions.platform === "WEB")
  const trackedEvents = ["app_store_click", "play_store_click", "pricing_view", "get_started_open"]

  await writeJson("data/app/latest.json", {
    source: "GA4 Data API",
    generatedAt,
    propertyId,
    reportingWindow: "28daysAgo through 3daysAgo",
    events: eventRows,
  })
  await writeJson("data/app/retention.json", { generatedAt, cohorts: rows(retentionReport) })
  await writeJson("data/website/funnel.json", {
    generatedAt,
    measurable: websiteRows.length > 0,
    status: websiteRows.length > 0 ? "MEASURED" : "WAITING_FOR_WEB_STREAM",
    events: websiteRows.filter((row) => trackedEvents.includes(row.dimensions.eventName)),
    note: websiteRows.length > 0 ? null : "The GA4 property currently has app streams only; do not infer web conversion rates.",
  })
  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: "fresh",
    latestSyncTime: generatedAt,
    generatedLocalSnapshot: "growth/data/app/latest.json",
    note: websiteRows.length > 0 ? "GA4 app and web data available." : "GA4 app data available; web funnel remains unmeasurable.",
  })
} catch (error) {
  await updateManifest(sourceId, {
    status: error.status === 401 || error.status === 403 ? "WAITING_FOR_HUMAN_AUTH" : "CONNECTOR_FAILURE",
    freshness: "stale",
    note: `${error.message}${error.body ? `: ${JSON.stringify(error.body).slice(0, 500)}` : ""}`,
  })
  console.error(error.message)
  process.exitCode = process.argv.includes("--strict") ? 1 : 0
}
