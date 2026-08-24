import { isoNow, readJson, writeJson } from "./lib/common.mjs"

const search = await readJson("data/search-console/latest.json", {})
const website = await readJson("data/website/funnel.json", {})
const app = await readJson("data/app/latest.json", {})
const appFunnel = await readJson("data/app/funnel.json", {})
const revenue = await readJson("data/revenue/latest.json", {})
const revenueRetention = await readJson("data/revenue/retention.json", {})
const play = await readJson("data/store/google-play.json", {})
const apple = await readJson("data/store/app-store.json", {})
const quality = await readJson("data/app/quality.json", {})
const manifest = await readJson("data-manifest.json", { sources: [] })

function overviewMetric(id) {
  return revenue.overview?.metrics?.find((metric) => metric.id === id)?.value ?? null
}

const screenMeasurementAvailable = Array.isArray(app.screenViews) && app.screenViews.length > 0
const productScreenNamesAvailable = screenMeasurementAvailable && app.screenViews.some((row) => !["", "(not set)"].includes(row.dimensions?.unifiedScreenName))
const activation = appFunnel.steps?.find((step) => step.id === "activation")
const churnAvailable = !revenueRetention.charts?.churn?.unavailable
const androidQuality = quality.officialDashboardBaseline?.android
const playFresh = manifest.sources.find((source) => source.id === "google-play")?.freshness === "fresh"
const unknown = []
if (!website.measurable) unknown.push("website store-intent conversion")
if (!screenMeasurementAvailable) unknown.push("screen-level app usage")
else if (!productScreenNamesAvailable) unknown.push("product-level screen usage (Firebase screen names are not configured)")
if (!activation?.measured) unknown.push("app activation conversion")
if (!churnAvailable) unknown.push("subscriber churn and retention")
if (!play.totals28Days || !playFresh) unknown.push("official Google Play installs (fresh evidence)")
if (!apple.totals28Days) unknown.push("official App Store downloads")

let primaryConstraint = "The full funnel is measurable; prioritize the largest observed conversion loss in the weekly cycle."
if (androidQuality?.crashFreeUsers < 0.99) primaryConstraint = `Android reliability is the immediate product constraint at ${(androidQuality.crashFreeUsers * 100).toFixed(2)}% crash-free users; fix the two observed startup/native crash groups before scaling acquisition aggressively.`
else if (!website.measurable) primaryConstraint = "Website traffic is measurable, but an attributable unique-user store-intent rate is not yet available."
else if (!play.totals28Days || !playFresh || !apple.totals28Days) primaryConstraint = "Official store download data is incomplete or stale, so store-listing conversion cannot yet be calculated."
else if (!activation?.measured) primaryConstraint = "The app does not emit a verified activation event, so install-to-value conversion remains the largest measurement gap."

const existing = await readJson("state/current.json", {})
await writeJson("state/current.json", {
  ...existing,
  updatedAt: isoNow(),
  phase: unknown.length ? "MEASUREMENT_AND_OPTIMIZATION" : "FULL_FUNNEL_OPTIMIZATION",
  northStar: {
    metric: "mrrAud",
    target: 5000,
    actual: overviewMetric("mrr"),
  },
  known: {
    searchConsole28DayClicks: search.totals?.clicks ?? null,
    searchConsole28DayImpressions: search.totals?.impressions ?? null,
    searchConsoleAveragePosition: search.totals?.position ?? null,
    revenueCatActiveSubscriptions: overviewMetric("active_subscriptions"),
    revenueCatMrrAud: overviewMetric("mrr"),
    googlePlayUserInstalls28Days: playFresh ? play.totals28Days?.userInstalls ?? null : null,
    appStoreFirstTimeDownloads28Days: apple.totals28Days?.firstTimeDownloads ?? null,
    measuredAppScreens: app.screenViews?.length ?? 0,
    measuredAppFunnelSteps: appFunnel.measurableSteps || [],
    websiteTrafficMeasured: website.trafficMeasurable === true || website.measurable === true,
    websiteStoreIntentRate: website.measurable ? website.storeIntent?.rate ?? null : null,
    androidCrashFreeUsers30Days: androidQuality?.crashFreeUsers ?? null,
    androidCrashes30Days: androidQuality?.crashes ?? null,
    iosCrashFreeUsers30Days: quality.officialDashboardBaseline?.ios?.crashFreeUsers ?? null,
  },
  unknown,
  primaryConstraint,
})

console.log(`Growth state refreshed: ${unknown.length} unknowns remain.`)
