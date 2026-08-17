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
  const [eventsReport, retentionReport, screensReport, acquisitionReport, websiteAcquisitionReport] = await Promise.all([
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
    runReport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "3daysAgo" }],
      dimensions: [{ name: "unifiedScreenName" }, { name: "unifiedScreenClass" }, { name: "platform" }],
      metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { matchType: "EXACT", value: "screen_view", caseSensitive: true },
        },
      },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 10000,
    }),
    runReport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "3daysAgo" }],
      dimensions: [{ name: "firstUserSourceMedium" }, { name: "platform" }],
      metrics: [{ name: "newUsers" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "newUsers" }, desc: true }],
      limit: 1000,
    }),
    runReport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "3daysAgo" }],
      dimensions: [
        { name: "sessionSourceMedium" },
        { name: "landingPagePlusQueryString" },
        { name: "platform" },
      ],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10000,
    }),
  ])
  const eventRows = rows(eventsReport)
  const screenRows = rows(screensReport)
    .filter((row) => row.dimensions.platform !== "WEB")
    .filter((row) => !["", "(not set)"].includes(row.dimensions.unifiedScreenName)
      || !["", "(not set)"].includes(row.dimensions.unifiedScreenClass))
  const acquisitionRows = rows(acquisitionReport).filter((row) => row.dimensions.platform !== "WEB")
  const websiteRows = eventRows.filter((row) => row.dimensions.platform === "WEB")
  const websiteAcquisitionRows = rows(websiteAcquisitionReport)
    .filter((row) => row.dimensions.platform === "WEB")
  const aiAssistantPattern = /(chatgpt|openai|perplexity|claude|copilot|gemini|meta\.ai)/i
  const aiReferralRows = websiteAcquisitionRows
    .filter((row) => aiAssistantPattern.test(row.dimensions.sessionSourceMedium))
  const trackedEvents = ["app_store_click", "play_store_click", "pricing_view", "get_started_open"]
  const appFunnelDefinitions = [
    { id: "installProxy", events: ["first_open"] },
    { id: "signUp", events: ["sign_up"] },
    { id: "onboardingComplete", events: ["onboarding_complete", "onboarding_completed"] },
    { id: "activation", events: ["trip_created", "import_completed", "draft_approved"] },
    { id: "paywallView", events: ["paywall_view", "paywall_opened"] },
    { id: "trialStart", events: ["trial_started", "start_trial"] },
    { id: "purchase", events: ["purchase", "in_app_purchase", "subscription_started"] },
  ]
  const appEvents = eventRows.filter((row) => row.dimensions.platform !== "WEB")
  const funnelSteps = appFunnelDefinitions.map((definition) => {
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

  await writeJson("data/app/latest.json", {
    source: "GA4 Data API",
    generatedAt,
    propertyId,
    reportingWindow: "28daysAgo through 3daysAgo",
    events: eventRows,
    screenViews: screenRows,
    acquisition: acquisitionRows,
  })
  await writeJson("data/app/retention.json", { generatedAt, cohorts: rows(retentionReport) })
  await writeJson("data/app/funnel.json", {
    source: "GA4 Data API",
    generatedAt,
    reportingWindow: "28daysAgo through 3daysAgo",
    steps: funnelSteps,
    measurableSteps: funnelSteps.filter((step) => step.measured).map((step) => step.id),
    missingInstrumentation: funnelSteps.filter((step) => !step.measured).map((step) => step.id),
    note: "first_open is an analytics install proxy; official store downloads are collected separately.",
  })
  await writeJson("data/website/funnel.json", {
    generatedAt,
    measurable: websiteRows.length > 0,
    status: websiteRows.length > 0 ? "MEASURED" : "WAITING_FOR_WEB_STREAM",
    events: websiteRows.filter((row) => trackedEvents.includes(row.dimensions.eventName)),
    acquisition: websiteAcquisitionRows,
    aiAssistantReferrals: {
      sessions: aiReferralRows.reduce((sum, row) => sum + row.metrics.sessions, 0),
      activeUsers: aiReferralRows.reduce((sum, row) => sum + row.metrics.activeUsers, 0),
      landingPages: aiReferralRows,
      recognizedSources: ["chatgpt", "openai", "perplexity", "claude", "copilot", "gemini", "meta.ai"],
      note: "Directional GA4 referral measurement; unlinked or privacy-stripped AI discovery may appear as direct traffic.",
    },
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
