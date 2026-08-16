import { fetchJson, isoNow, updateManifest, writeJson } from "./lib/common.mjs"

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

try {
  const generatedAt = isoNow()
  const overview = await get("/metrics/overview?currency=AUD")
  const charts = {}
  for (const name of ["mrr", "revenue", "actives", "trials", "churn", "initial_conversion"]) {
    try {
      charts[name] = await get(`/metrics/${name}?currency=AUD&resolution=day`)
    } catch (error) {
      charts[name] = { unavailable: true, reason: `HTTP ${error.status || "error"}` }
    }
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
    charts: { mrr: charts.mrr, revenue: charts.revenue, actives: charts.actives, trials: charts.trials },
  })
  await writeJson("data/revenue/retention.json", {
    generatedAt,
    currency: "AUD",
    charts: { churn: charts.churn, initialConversion: charts.initial_conversion },
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
