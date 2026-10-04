import { asoRoot, dateOnly, isoNow, readJson } from "./lib/common.mjs"
import { writeFile } from "node:fs/promises"
import path from "node:path"

// Writes one summary per store: aso/app-store/data/summary.md and aso/google-play/data/summary.md.
// Shared sources (RevenueCat, Crashlytics, GA4 app) are sliced by platform where they can be.
const manifest = await readJson("shared/data/manifest.json", { sources: [] })
const apple = await readJson("app-store/data/downloads.json", {})
const play = await readJson("google-play/data/installs.json", {})
const revenue = await readJson("shared/data/revenue/latest.json", {})
const quality = await readJson("shared/data/app/quality.json", {})
const funnel = await readJson("shared/data/app/funnel.json", { steps: [] })
const app = await readJson("shared/data/app/latest.json", { acquisition: [] })
const metric = (id) => revenue.overview?.metrics?.find((item) => item.id === id)?.value ?? "–"
const baseline = quality.officialDashboardBaseline || {}
const percent = (value) => (value == null ? "–" : `${(value * 100).toFixed(2)}%`)

function shared(platform, crashKey, automatedKey) {
  const crash = baseline[crashKey]
  const automated = (quality.automated30Days || []).find((row) => row.platform === automatedKey)
  return [
    "## Quality (store ranking factor)",
    "",
    `- Crash-free users: ${percent(crash?.crashFreeUsers)} (dashboard baseline ${baseline.period?.startDate ?? "?"}–${baseline.period?.endDate ?? "?"})`,
    ...(automated ? [`- Automated 30 days: ${automated.fatalOrAnrEvents} fatal/ANR events on ${automated.impactedInstallations} installs across ${automated.fatalOrAnrIssues} issues`] : []),
    "",
    "## In-app funnel (GA4)",
    "",
    ...funnel.steps.map((step) => {
      const users = (step.byPlatform || []).filter((row) => row.dimensions.platform === platform).reduce((sum, row) => sum + row.metrics.activeUsers, 0)
      return `- ${step.id}: ${step.measured ? `${users} users` : "not instrumented"}`
    }),
    "",
    "## Where new users come from (GA4 first-user source)",
    "",
    ...app.acquisition.filter((row) => row.dimensions.platform === platform).slice(0, 10).map((row) => `- ${row.dimensions.firstUserSourceMedium}: ${row.metrics.newUsers} new users`),
    "",
    "## Revenue (RevenueCat, AUD, both platforms combined)",
    "",
    `- MRR A$${metric("mrr")} · active subscriptions ${metric("active_subscriptions")} · active trials ${metric("active_trials")} · new customers (28d) ${metric("new_customers")}`,
    "",
    "## Data sources",
    "",
    ...(manifest.sources.length ? manifest.sources.map((source) => `- ${source.id}: **${source.status}** (${source.freshness || "unknown"}) — ${source.note || ""}`) : ["- Not collected yet."]),
    "",
  ]
}

const appStore = [
  `# App Store summary — ${dateOnly()}`,
  "",
  `Generated ${isoNow()} by \`npm run aso:feed\`.`,
  "",
  "## Downloads, last 28 reported days (App Store Connect)",
  "",
  `- First-time downloads: ${apple.totals28Days?.firstTimeDownloads ?? "–"} · redownloads ${apple.totals28Days?.redownloads ?? "–"} · updates ${apple.totals28Days?.updates ?? "–"}`,
  `- Latest report: ${apple.latestReportedDate ?? "–"}`,
  "",
  ...shared("iOS", "ios", "IOS"),
]

const googlePlay = [
  `# Google Play summary — ${dateOnly()}`,
  "",
  `Generated ${isoNow()} by \`npm run aso:feed\`.`,
  "",
  "## Installs, last 28 reported days (Play Console)",
  "",
  `- User installs: ${play.totals28Days?.userInstalls ?? "–"} · uninstalls ${play.totals28Days?.userUninstalls ?? "–"} · installed audience ${play.latestInstalledAudience ?? "–"}`,
  `- Latest report: ${play.latestReportedDate ?? "–"} (Play reports lag 3–7 days)`,
  `- Top countries: ${(play.countries || []).slice(0, 8).map((row) => `${row.country} ${row.dailyUserInstalls}`).join(", ") || "–"}`,
  "",
  ...shared("Android", "android", "ANDROID"),
]

await writeFile(path.join(asoRoot, "app-store/data/summary.md"), appStore.join("\n"), "utf8")
await writeFile(path.join(asoRoot, "google-play/data/summary.md"), googlePlay.join("\n"), "utf8")
console.log("Wrote aso/app-store/data/summary.md and aso/google-play/data/summary.md")
