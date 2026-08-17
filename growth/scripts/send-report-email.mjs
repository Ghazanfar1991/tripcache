import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import { dateOnly, growthRoot, readJson } from "./lib/common.mjs"

const kindArg = process.argv.indexOf("--kind")
const kind = kindArg >= 0 ? process.argv[kindArg + 1] : "weekly"
const reportArg = process.argv.indexOf("--report")
const explicitReport = reportArg >= 0 ? process.argv[reportArg + 1] : null
const dryRun = process.argv.includes("--dry-run")

function keychain(service) {
  try {
    return execFileSync("security", ["find-generic-password", "-s", service, "-w"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    return ""
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

async function newestReport() {
  if (explicitReport) return path.resolve(explicitReport)
  const candidates = []
  for (const directory of ["reports/weekly", "reports/monthly", "reports"]) {
    const absolute = path.join(growthRoot, directory)
    try {
      for (const name of await readdir(absolute)) {
        if (name.endsWith(".md")) candidates.push(path.join(absolute, name))
      }
    } catch {}
  }
  const dated = await Promise.all(candidates.map(async (file) => ({ file, details: await stat(file) })))
  dated.sort((a, b) => b.details.mtimeMs - a.details.mtimeMs)
  return dated[0]?.file || null
}

const apiKey = process.env.RESEND_API_KEY || keychain("com.tripcache.growth.resend-api-key")
const recipient = process.env.GROWTH_REPORT_EMAIL || keychain("com.tripcache.growth.report-email")
const sender = process.env.GROWTH_EMAIL_FROM || "TripCache Growth <onboarding@resend.dev>"
if (!apiKey || !recipient) {
  console.log("Growth email skipped: RESEND_API_KEY or GROWTH_REPORT_EMAIL is not configured.")
  process.exit(process.argv.includes("--strict") ? 1 : 0)
}

const reportPath = await newestReport()
const report = reportPath ? await readFile(reportPath, "utf8") : "No narrative report was generated."
const search = await readJson("data/search-console/latest.json", {})
const app = await readJson("data/app/latest.json", {})
const play = await readJson("data/store/google-play.json", {})
const apple = await readJson("data/store/app-store.json", {})
const appleBaseline = await readJson("data/store/app-store-dashboard-baseline.json", {})
const quality = await readJson("data/app/quality.json", {})
const revenue = await readJson("data/revenue/latest.json", {})
const opportunities = await readJson("data/seo/opportunities.json", {})
const website = await readJson("data/website/funnel.json", {})
const metric = (id) => revenue.overview?.metrics?.find((item) => item.id === id)?.value ?? "unavailable"
const topScreens = (app.screenViews || []).slice(0, 5)
const topOpportunities = (opportunities.queryPageOpportunities || []).slice(0, 5)
const androidQuality = quality.officialDashboardBaseline?.android
const appleDownloadSummary = apple.totals28Days
  ? `App Store first-time downloads (28 reported days): ${apple.totals28Days.firstTimeDownloads}.`
  : appleBaseline.appUnits != null
    ? `App Store App Units (${appleBaseline.period.startDate} to ${appleBaseline.period.endDate}): ${appleBaseline.appUnits}; API automation pending.`
    : "App Store first-time downloads: awaiting access."
const screenLabel = (row) => {
  const name = row.dimensions.unifiedScreenName
  return name && name !== "(not set)" ? name : row.dimensions.unifiedScreenClass || "unnamed screen"
}

const summary = [
  `Organic: ${search.totals?.clicks ?? "unavailable"} clicks from ${search.totals?.impressions ?? "unavailable"} impressions.`,
  `AI-assistant referrals: ${website.aiAssistantReferrals?.sessions ?? "unavailable"} sessions from recognized AI sources.`,
  `MRR: A$${metric("mrr")}; active subscriptions: ${metric("active_subscriptions")}.`,
  `Google Play installs (28 reported days): ${play.totals28Days?.userInstalls ?? "awaiting access"}.`,
  appleDownloadSummary,
  `Android crash-free users: ${androidQuality ? `${(androidQuality.crashFreeUsers * 100).toFixed(2)}% (${androidQuality.crashes} crashes / ${androidQuality.impactedUsers} users)` : "awaiting Crashlytics"}.`,
]
const subject = `TripCache ${kind} growth report — ${dateOnly()}`
const textBody = [
  subject,
  "",
  ...summary,
  "",
  "Top screens:",
  ...topScreens.map((row) => `- ${screenLabel(row)}: ${row.metrics.eventCount} views`),
  "",
  "Top SEO opportunities:",
  ...topOpportunities.map((row) => `- ${row.query} — ${row.impressions} impressions, ${(row.ctr * 100).toFixed(2)}% CTR, position ${row.position.toFixed(1)}`),
  "",
  report,
].join("\n")
const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;line-height:1.55;color:#172033;max-width:760px;margin:auto;padding:24px">
<h1 style="font-size:24px">${escapeHtml(subject)}</h1>
<h2 style="font-size:18px">Current snapshot</h2><ul>${summary.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
<h2 style="font-size:18px">Most-used app screens</h2><ul>${topScreens.map((row) => `<li>${escapeHtml(screenLabel(row))} — ${row.metrics.eventCount} views</li>`).join("") || "<li>Awaiting screen-level data</li>"}</ul>
<h2 style="font-size:18px">Top SEO opportunities</h2><ul>${topOpportunities.map((row) => `<li>${escapeHtml(row.query)} — ${row.impressions} impressions, ${(row.ctr * 100).toFixed(2)}% CTR, position ${row.position.toFixed(1)}</li>`).join("") || "<li>Awaiting page/query data</li>"}</ul>
<h2 style="font-size:18px">Audit and recommendations</h2><pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#f5f7fb;padding:16px;border-radius:12px">${escapeHtml(report)}</pre>
</body></html>`

if (dryRun) {
  console.log(`${subject}\nRecipient configured: yes\nReport: ${reportPath || "none"}`)
  process.exit(0)
}

const digest = createHash("sha256")
  .update(`${recipient}\0${subject}\0${textBody}\0${html}`)
  .digest("hex")
  .slice(0, 24)
const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Idempotency-Key": `tripcache-growth-${digest}`,
  },
  body: JSON.stringify({ from: sender, to: [recipient], subject, text: textBody, html }),
})
const payload = await response.json().catch(() => ({}))
if (!response.ok) throw new Error(`Growth email failed with HTTP ${response.status}: ${payload.message || "unknown error"}`)
console.log(`Growth report email accepted (${payload.id || "no id returned"}).`)
