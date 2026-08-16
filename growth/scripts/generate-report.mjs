import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { dateOnly, growthRoot, isoNow, readJson } from "./lib/common.mjs"

const manifest = await readJson("data-manifest.json", { sources: [] })
const search = await readJson("data/search-console/latest.json", {})
const funnel = await readJson("data/website/funnel.json", {})
const app = await readJson("data/app/latest.json", {})
const appFunnel = await readJson("data/app/funnel.json", {})
const revenue = await readJson("data/revenue/latest.json", {})
const revenueRetention = await readJson("data/revenue/retention.json", {})
const play = await readJson("data/store/google-play.json", {})
const apple = await readJson("data/store/app-store.json", {})
const quality = await readJson("data/app/quality.json", {})
const opportunities = await readJson("data/seo/opportunities.json", {})
const generatedAt = isoNow()
const experimentRequiredSources = new Set(["search-console", "ga4", "revenuecat", "production-health"])
const unavailable = manifest.sources.filter((source) => experimentRequiredSources.has(source.id) && source.status !== "SUCCESS")
const overviewMetric = (id) => revenue.overview?.metrics?.find((metric) => metric.id === id)?.value ?? "unavailable"
const topScreens = (app.screenViews || []).slice(0, 10)
const topOpportunities = (opportunities.queryPageOpportunities || []).slice(0, 10)
const missingAppSteps = appFunnel.missingInstrumentation || []
const churnStatus = revenueRetention.charts?.churn?.unavailable ? "unavailable" : "available"
const androidQuality = quality.officialDashboardBaseline?.android
const iosQuality = quality.officialDashboardBaseline?.ios
const lines = [
  `# TripCache growth snapshot — ${dateOnly()}`,
  "",
  `Generated: ${generatedAt}`,
  "",
  "## Source health",
  "",
  ...manifest.sources.map((source) => `- ${source.id}: **${source.status}** (${source.freshness || "unknown"})`),
  "",
  "## Current evidence",
  "",
  `- Organic search: ${search.totals?.clicks ?? "unavailable"} clicks / ${search.totals?.impressions ?? "unavailable"} impressions.` ,
  `- Website funnel: ${funnel.measurable ? "measurable" : "not measurable"}.`,
  `- RevenueCat: A$${overviewMetric("mrr")} MRR; ${overviewMetric("active_subscriptions")} active subscriptions; churn data ${churnStatus}.`,
  `- Google Play: ${play.totals28Days?.userInstalls ?? "unavailable"} official user installs in the latest 28 reported days.`,
  `- App Store: ${apple.totals28Days?.firstTimeDownloads ?? "unavailable"} official first-time downloads in the latest 28 reported days.`,
  `- Android quality: ${androidQuality ? `${(androidQuality.crashFreeUsers * 100).toFixed(2)}% crash-free users / ${androidQuality.crashes} crashes affecting ${androidQuality.impactedUsers} users` : "unavailable"}.`,
  `- iOS quality: ${iosQuality ? `${(iosQuality.crashFreeUsers * 100).toFixed(2)}% crash-free users` : "unavailable"}.`,
  `- App funnel instrumentation still missing: ${appFunnel.generatedAt ? (missingAppSteps.length ? missingAppSteps.join(", ") : "none") : "not collected yet"}.`,
  "",
  "## Most-used app screens",
  "",
  ...(topScreens.length
    ? topScreens.map((row) => `- ${row.dimensions.unifiedScreenName || row.dimensions.unifiedScreenClass} (${row.dimensions.platform}): ${row.metrics.eventCount} views / ${row.metrics.activeUsers} active users.`)
    : ["- Screen-level data is not available yet."]),
  "",
  "## App quality priorities",
  "",
  ...(androidQuality?.openIssues?.length
    ? androidQuality.openIssues.map((issue) => `- Android: ${issue.title} — ${issue.events} events / ${issue.users} users (${issue.subtitle}).`)
    : ["- No Android crash issue baseline is available."]),
  "",
  "## First-party keyword opportunities",
  "",
  ...(topOpportunities.length
    ? topOpportunities.map((row) => `- “${row.query}” → ${row.page}: ${row.impressions} impressions, ${(row.ctr * 100).toFixed(2)}% CTR, position ${row.position.toFixed(1)}.`)
    : ["- Page/query opportunity data is not available yet."]),
  "",
  "## Decision gate",
  "",
  unavailable.length
    ? `No autonomous website experiment should be launched while these sources are unavailable: ${unavailable.map((source) => source.id).join(", ")}.`
    : "All required sources are fresh; the weekly agent may evaluate one reversible experiment.",
  "",
]

const reportsDir = path.join(growthRoot, "reports", "weekly")
await mkdir(reportsDir, { recursive: true })
await writeFile(path.join(reportsDir, `${dateOnly()}.md`), lines.join("\n"), "utf8")
console.log(lines.join("\n"))
