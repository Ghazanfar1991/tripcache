import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { dateOnly, growthRoot, isoNow, readJson } from "./lib/common.mjs"
import { aiAssistantReferralSummary } from "./lib/measurement.mjs"

const manifest = await readJson("data-manifest.json", { sources: [] })
const search = await readJson("data/search-console/latest.json", {})
const funnel = await readJson("data/website/funnel.json", {})
const app = await readJson("data/app/latest.json", {})
const appFunnel = await readJson("data/app/funnel.json", {})
const revenue = await readJson("data/revenue/latest.json", {})
const revenueRetention = await readJson("data/revenue/retention.json", {})
const play = await readJson("data/store/google-play.json", {})
const apple = await readJson("data/store/app-store.json", {})
const appleBaseline = await readJson("data/store/app-store-dashboard-baseline.json", {})
const quality = await readJson("data/app/quality.json", {})
const opportunities = await readJson("data/seo/opportunities.json", {})
const activeExperiments = await readJson("state/active-experiments.json", { experiments: [] })
const guardrails = await readJson("config/guardrails.yaml", {})
const generatedAt = isoNow()
const experimentRequiredSources = new Set(["search-console", "ga4", "revenuecat", "production-health"])
const unavailable = manifest.sources.filter((source) => experimentRequiredSources.has(source.id) && (source.status !== "SUCCESS" || source.freshness !== "fresh"))
const activeExperimentRecords = await Promise.all((activeExperiments.experiments || [])
  .filter((experiment) => experiment.status === "ACTIVE")
  .map((experiment) => readJson(experiment.record.replace(/^growth\//, ""), { id: experiment.id })))
const activeExperimentCount = activeExperimentRecords.length
const experimentCapacity = Math.max(0, Number(guardrails.maxConcurrentExperiments || 0) - activeExperimentCount)
const launchCapacity = Math.min(experimentCapacity, Number(guardrails.maxNewExperimentsPerCycle || experimentCapacity))
const overviewMetric = (id) => revenue.overview?.metrics?.find((metric) => metric.id === id)?.value ?? "unavailable"
const topScreens = (app.screenViews || []).slice(0, 10)
const topOpportunities = (opportunities.queryPageOpportunities || []).slice(0, 10)
const freshSearchRows = search.fresh?.pageDaily || []
const latestFreshDate = freshSearchRows.map((row) => row.date).sort().at(-1) || null
const latestFreshRows = latestFreshDate ? freshSearchRows.filter((row) => row.date === latestFreshDate) : []
const latestFreshTotals = latestFreshRows.reduce((totals, row) => ({
  clicks: totals.clicks + row.clicks,
  impressions: totals.impressions + row.impressions,
}), { clicks: 0, impressions: 0 })
const aiReferralEvidence = aiAssistantReferralSummary(funnel)
const missingAppSteps = appFunnel.missingInstrumentation || []
const churnStatus = revenueRetention.charts?.churn?.unavailable ? "unavailable" : "available"
const androidQuality = quality.officialDashboardBaseline?.android
const iosQuality = quality.officialDashboardBaseline?.ios
const playSource = manifest.sources.find((source) => source.id === "google-play")
const appleDownloadEvidence = apple.totals28Days
  ? `${apple.totals28Days.firstTimeDownloads} official first-time downloads in the latest 28 reported days`
  : appleBaseline.appUnits != null
    ? `${appleBaseline.appUnits} official App Units from ${appleBaseline.period.startDate} to ${appleBaseline.period.endDate} (manual dashboard baseline; API automation pending)`
    : "unavailable"
const playInstallEvidence = playSource?.freshness === "fresh" && play.totals28Days
  ? `${play.totals28Days.userInstalls} official user installs in the latest 28 reported days`
  : `unavailable as fresh evidence${play.latestReportedDate ? ` (latest Play export date ${play.latestReportedDate})` : ""}`
const screenLabel = (row) => {
  const name = row.dimensions.unifiedScreenName
  return name && name !== "(not set)" ? name : row.dimensions.unifiedScreenClass || "unnamed screen"
}
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
  `- Fresh SEO pulse: ${latestFreshDate ? `${latestFreshTotals.clicks} clicks / ${latestFreshTotals.impressions} impressions on ${latestFreshDate}` : "unavailable"} (directional; recent rows may be incomplete).`,
  `- Website funnel: ${funnel.measurable ? "measurable" : "not measurable"}.`,
  `- AI-assistant referrals: ${aiReferralEvidence.text}.`,
  `- RevenueCat: A$${overviewMetric("mrr")} MRR; ${overviewMetric("active_subscriptions")} active subscriptions; churn data ${churnStatus}.`,
  `- Google Play: ${playInstallEvidence}.`,
  `- App Store: ${appleDownloadEvidence}.`,
  `- Android quality: ${androidQuality ? `${(androidQuality.crashFreeUsers * 100).toFixed(2)}% crash-free users / ${androidQuality.crashes} crashes affecting ${androidQuality.impactedUsers} users` : "unavailable"}.`,
  `- iOS quality: ${iosQuality ? `${(iosQuality.crashFreeUsers * 100).toFixed(2)}% crash-free users` : "unavailable"}.`,
  `- App funnel instrumentation still missing: ${appFunnel.generatedAt ? (missingAppSteps.length ? missingAppSteps.join(", ") : "none") : "not collected yet"}.`,
  "",
  "## Most-used app screens",
  "",
  ...(topScreens.length
    ? topScreens.map((row) => `- ${screenLabel(row)} (${row.dimensions.platform}): ${row.metrics.eventCount} views / ${row.metrics.activeUsers} active users${row.dimensions.unifiedScreenName === "(not set)" ? "; Firebase screen name not configured" : ""}.`)
    : ["- Screen-level data is not available yet."]),
  "",
  "## App quality priorities",
  "",
  ...(androidQuality?.openIssues?.length
    ? androidQuality.openIssues.map((issue) => `- Android: ${issue.title} — ${issue.events} events / ${issue.users} users (${issue.subtitle}).`)
    : ["- No Android crash issue baseline is available."]),
  "",
  "## Active experiment pulse",
  "",
  ...(activeExperimentRecords.length
    ? activeExperimentRecords.map((experiment) => {
        const pulse = experiment.latestDirectionalPulse
        return pulse
          ? `- ${experiment.id}: ${pulse.clicks} clicks / ${pulse.impressions} impressions, ${(pulse.ctr * 100).toFixed(2)}% CTR, position ${pulse.averagePosition.toFixed(1)} (${pulse.period.startDate}–${pulse.period.endDate}); ${pulse.guardrailStatus}, directional only, continue to ${experiment.observationWindow.earliestDecisionDate}.`
          : `- ${experiment.id}: no >72-hour pulse recorded yet; continue to ${experiment.observationWindow?.earliestDecisionDate || "the predeclared decision gate"}.`
      })
    : ["- No active experiments."]),
  "",
  "## First-party keyword opportunities",
  "",
  ...(topOpportunities.length
    ? topOpportunities.map((row) => `- “${row.query}” → ${row.page}: ${row.impressions} impressions, ${(row.ctr * 100).toFixed(2)}% CTR, position ${row.position.toFixed(1)}.`)
    : ["- Page/query opportunity data is not available yet."]),
  "",
  "## AI-assistant discovery",
  "",
  ...(aiReferralEvidence.measurable
    ? aiReferralEvidence.landingPages.length
      ? aiReferralEvidence.landingPages.slice(0, 10).map((row) => `- ${row.dimensions.sessionSourceMedium} → ${row.dimensions.landingPagePlusQueryString}: ${row.metrics.sessions} sessions / ${row.metrics.activeUsers} active users.`)
      : ["- Web traffic was measurable; no recognized AI-assistant referral sessions were measured in the current window."]
    : ["- AI-assistant referrals are unknown because GA4 returned no web rows for the reporting window."]),
  "",
  "## Decision gate",
  "",
  unavailable.length
    ? `No autonomous website experiment should be launched while these sources are unavailable: ${unavailable.map((source) => source.id).join(", ")}.`
    : activeExperimentCount >= Number(guardrails.maxConcurrentExperiments || 0)
      ? `All ${activeExperimentCount} experiment slots are occupied. Preserve their 14-day windows and do not launch or stack another page experiment.`
      : `Required experiment sources are fresh; up to ${launchCapacity} independent page experiment(s) may be evaluated.`,
  "",
]

const reportsDir = path.join(growthRoot, "reports", "weekly")
await mkdir(reportsDir, { recursive: true })
await writeFile(path.join(reportsDir, `${dateOnly()}.md`), lines.join("\n"), "utf8")
console.log(lines.join("\n"))
