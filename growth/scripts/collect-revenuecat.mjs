import { dateOnly, daysAgo, fetchJson, isoNow, updateManifest, writeJson } from "./lib/common.mjs"

const sourceId = "revenuecat"
const projectId = process.env.REVENUECAT_PROJECT_ID || "82e83e04"
const apiKey = process.env.REVENUECAT_API_KEY
const base = `https://api.revenuecat.com/v2/projects/${projectId}`

if (!apiKey) {
  await updateManifest(sourceId, {
    status: "WAITING_FOR_HUMAN_AUTH",
    freshness: "stale",
    note: "Collector is ready; a restricted RevenueCat v2 secret key is not configured.",
  })
  console.log("RevenueCat skipped: no API key")
  process.exit(process.argv.includes("--strict") ? 1 : 0)
}

const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }

async function get(path) {
  return fetchJson(`${base}${path}`, { headers })
}

function resolutionId(options) {
  const resolutions = options.resolutions || options.allowed_resolutions || []
  const daily = resolutions.find((item) => {
    const label = typeof item === "string" ? item : `${item.display_name || ""} ${item.name || ""} ${item.id || ""}`
    return /day|daily/i.test(label)
  })
  if (typeof daily === "string") return daily
  return daily?.id ?? daily?.value ?? null
}

async function chart(name, { currency = true } = {}) {
  try {
    const options = await get(`/charts/${name}/options`)
    const params = new URLSearchParams({
      start_date: daysAgo(90),
      end_date: dateOnly(),
      realtime: "true",
      expand_periods: "false",
    })
    const resolution = resolutionId(options)
    if (resolution !== null) params.set("resolution", String(resolution))
    if (currency) params.set("currency", "AUD")
    return { options, data: await get(`/charts/${name}?${params}`) }
  } catch (error) {
    return {
      unavailable: true,
      reason: `HTTP ${error.status || "error"}`,
      detail: error.body?.message || error.body?.type || null,
    }
  }
}

try {
  const generatedAt = isoNow()
  const overview = await get("/metrics/overview?currency=AUD")
  const charts = {}
  for (const name of [
    "mrr",
    "revenue",
    "actives",
    "trials",
    "churn",
    "initial_conversion",
    "conversion_to_paying",
    "subscription_retention",
    "subscription_status",
  ]) {
    charts[name] = await chart(name, { currency: ["mrr", "revenue", "subscription_status"].includes(name) })
  }

  await writeJson("data/revenue/latest.json", {
    source: "RevenueCat API v2",
    generatedAt,
    currency: "AUD",
    overview,
  })
  await writeJson("data/revenue/subscriptions.json", {
    generatedAt,
    currency: "AUD",
    reportingWindow: { startDate: daysAgo(90), endDate: dateOnly() },
    charts: {
      mrr: charts.mrr,
      revenue: charts.revenue,
      actives: charts.actives,
      trials: charts.trials,
      subscriptionStatus: charts.subscription_status,
    },
  })
  await writeJson("data/revenue/retention.json", {
    generatedAt,
    currency: "AUD",
    reportingWindow: { startDate: daysAgo(90), endDate: dateOnly() },
    charts: {
      churn: charts.churn,
      initialConversion: charts.initial_conversion,
      conversionToPaying: charts.conversion_to_paying,
      subscriptionRetention: charts.subscription_retention,
    },
  })
  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: "fresh",
    latestSyncTime: generatedAt,
    warehouseTable: "trip-cache.tripcache_growth.revenue_daily",
    generatedLocalSnapshot: "growth/data/revenue/latest.json",
    note: "Automated through RevenueCat API v2 with charts/metrics read-only access.",
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
