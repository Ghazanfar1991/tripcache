import { fetchJson, getGoogleAccessToken, isoNow, updateManifest, writeJson } from "../lib/common.mjs"
import { buildAiAssistantReferrals, buildWebsiteStoreIntent, isWebPlatform } from "../lib/measurement.mjs"

// Website half of the GA4 property: landing-page traffic and store-click intent.
// The in-app half lives in aso/scripts/feed/ga4-app.mjs.
const sourceId = "ga4-web"
const propertyId = process.env.GA4_PROPERTY_ID || "514130776"
const token = getGoogleAccessToken()

if (!token) {
  await updateManifest(sourceId, { status: "WAITING_FOR_HUMAN_AUTH", freshness: "stale", note: "No short-lived Google access token." })
  console.log("GA4 web skipped: no short-lived Google access token")
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

const dateRanges = [{ startDate: "28daysAgo", endDate: "yesterday" }]
const webOnly = { filter: { fieldName: "platform", stringFilter: { matchType: "EXACT", value: "web", caseSensitive: false } } }
const storeClicks = { filter: { fieldName: "eventName", inListFilter: { values: ["app_store_click", "play_store_click"], caseSensitive: true } } }

try {
  const generatedAt = isoNow()
  const [eventsReport, acquisitionReport, trafficTotalsReport, storeIntentTotalsReport, storeIntentByPageReport, landingPagesReport] = await Promise.all([
    runReport({
      dateRanges,
      dimensions: [{ name: "eventName" }, { name: "platform" }],
      metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
      limit: 10000,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "sessionSourceMedium" }, { name: "landingPagePlusQueryString" }, { name: "platform" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10000,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "platform" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      dimensionFilter: webOnly,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "platform" }],
      metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
      dimensionFilter: { andGroup: { expressions: [webOnly, storeClicks] } },
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "eventName" }, { name: "pagePathPlusQueryString" }, { name: "platform" }],
      metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
      dimensionFilter: { andGroup: { expressions: [webOnly, storeClicks] } },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 10000,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "landingPage" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }, { name: "engagementRate" }],
      dimensionFilter: webOnly,
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 500,
    }),
  ])
  const websiteRows = rows(eventsReport).filter((row) => isWebPlatform(row.dimensions.platform))
  const acquisitionRows = rows(acquisitionReport).filter((row) => isWebPlatform(row.dimensions.platform))
  const aiAssistantPattern = /(chatgpt|openai|perplexity|claude|copilot|gemini|meta\.ai)/i
  const trafficMeasurable = websiteRows.length > 0 || acquisitionRows.length > 0
  const aiAssistantReferrals = buildAiAssistantReferrals({
    measurable: trafficMeasurable,
    rows: acquisitionRows.filter((row) => aiAssistantPattern.test(row.dimensions.sessionSourceMedium)),
  })
  const trackedEvents = ["app_store_click", "play_store_click", "download_cta_click", "pricing_view", "download_modal_open"]
  const storeIntent = buildWebsiteStoreIntent({
    trafficRows: rows(trafficTotalsReport),
    storeIntentRows: rows(storeIntentTotalsReport),
    byPage: rows(storeIntentByPageReport),
  })

  await writeJson("data/website/funnel.json", {
    generatedAt,
    propertyId,
    webStreamId: process.env.GA4_WEB_STREAM_ID || "15446445587",
    measurementId: process.env.GA4_WEB_MEASUREMENT_ID || "G-JP6JKPVPVY",
    reportingWindow: "28daysAgo through yesterday; recent rows may be incomplete",
    trafficMeasurable,
    measurable: storeIntent.measurable,
    status: storeIntent.measurable ? "MEASURED" : "UNKNOWN_STORE_INTENT_RATE",
    events: websiteRows.filter((row) => trackedEvents.includes(row.dimensions.eventName)),
    landingPages: rows(landingPagesReport),
    acquisition: acquisitionRows,
    storeIntent,
    aiAssistantReferrals,
    note: storeIntent.measurable
      ? null
      : trafficMeasurable
        ? "Web traffic was measured, but no unique-user denominator was returned for the store-intent rate."
        : "No web rows were returned for this window; web conversion is unknown, not zero.",
  })
  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: "fresh",
    latestSyncTime: generatedAt,
    note: storeIntent.measurable
      ? `Store intent ${(storeIntent.rate * 100).toFixed(1)}% (${storeIntent.storeIntentUsers}/${storeIntent.landingUsers} users, 28 days).`
      : "Web traffic measured; store-intent rate unknown.",
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
