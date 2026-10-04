import { fetchJson, getGoogleAccessToken, isoNow, updateManifest, writeJson } from "../lib/common.mjs"
import { isWebPlatform } from "../lib/measurement.mjs"

// In-app half of the GA4 property: screens, acquisition, retention and the install→purchase funnel.
// The website half lives in seo/scripts/feed/ga4-web.mjs.
const sourceId = "ga4-app"
const propertyId = process.env.GA4_PROPERTY_ID || "514130776"
const token = getGoogleAccessToken()

if (!token) {
  await updateManifest(sourceId, { status: "WAITING_FOR_HUMAN_AUTH", freshness: "stale", note: "No short-lived Google access token." })
  console.log("GA4 app skipped: no short-lived Google access token")
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

// App reporting keeps a three-day lag so late-arriving mobile events settle.
const dateRanges = [{ startDate: "28daysAgo", endDate: "3daysAgo" }]

try {
  const generatedAt = isoNow()
  const [eventsReport, retentionReport, screensReport, acquisitionReport] = await Promise.all([
    runReport({
      dateRanges,
      dimensions: [{ name: "eventName" }, { name: "platform" }],
      metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
      limit: 10000,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "newVsReturning" }, { name: "platform" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      limit: 1000,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "unifiedScreenName" }, { name: "unifiedScreenClass" }, { name: "platform" }],
      metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
      dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "screen_view", caseSensitive: true } } },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 10000,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "firstUserSourceMedium" }, { name: "platform" }],
      metrics: [{ name: "newUsers" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "newUsers" }, desc: true }],
      limit: 1000,
    }),
  ])
  const appEvents = rows(eventsReport).filter((row) => !isWebPlatform(row.dimensions.platform))
  const screenRows = rows(screensReport)
    .filter((row) => !isWebPlatform(row.dimensions.platform))
    .filter((row) => !["", "(not set)"].includes(row.dimensions.unifiedScreenName)
      || !["", "(not set)"].includes(row.dimensions.unifiedScreenClass))
  const funnelDefinitions = [
    { id: "installProxy", events: ["first_open"] },
    { id: "signUp", events: ["sign_up"] },
    { id: "onboardingComplete", events: ["onboarding_complete", "onboarding_completed"] },
    { id: "activation", events: ["trip_created", "import_completed", "draft_approved"] },
    { id: "paywallView", events: ["paywall_view", "paywall_opened"] },
    { id: "trialStart", events: ["trial_started", "start_trial"] },
    { id: "purchase", events: ["purchase", "in_app_purchase", "subscription_started"] },
  ]
  const steps = funnelDefinitions.map((definition) => {
    const matching = appEvents.filter((row) => definition.events.includes(row.dimensions.eventName))
    return {
      id: definition.id,
      eventNames: definition.events,
      measured: matching.length > 0,
      eventCount: matching.reduce((sum, row) => sum + row.metrics.eventCount, 0),
      activeUsers: matching.reduce((sum, row) => sum + row.metrics.activeUsers, 0),
      byPlatform: matching,
    }
  })

  await writeJson("shared/data/app/latest.json", {
    source: "GA4 Data API",
    generatedAt,
    propertyId,
    reportingWindow: "28daysAgo through 3daysAgo",
    events: appEvents,
    screenViews: screenRows,
    acquisition: rows(acquisitionReport).filter((row) => !isWebPlatform(row.dimensions.platform)),
  })
  await writeJson("shared/data/app/retention.json", { generatedAt, cohorts: rows(retentionReport) })
  await writeJson("shared/data/app/funnel.json", {
    source: "GA4 Data API",
    generatedAt,
    reportingWindow: "28daysAgo through 3daysAgo",
    steps,
    measurableSteps: steps.filter((step) => step.measured).map((step) => step.id),
    missingInstrumentation: steps.filter((step) => !step.measured).map((step) => step.id),
    note: "first_open is an analytics install proxy; official store downloads are collected separately.",
  })
  await updateManifest(sourceId, { status: "SUCCESS", freshness: "fresh", latestSyncTime: generatedAt, note: "GA4 in-app events, screens, acquisition and funnel." })
} catch (error) {
  await updateManifest(sourceId, {
    status: error.status === 401 || error.status === 403 ? "WAITING_FOR_HUMAN_AUTH" : "CONNECTOR_FAILURE",
    freshness: "stale",
    note: `${error.message}${error.body ? `: ${JSON.stringify(error.body).slice(0, 500)}` : ""}`,
  })
  console.error(error.message)
  process.exitCode = process.argv.includes("--strict") ? 1 : 0
}
