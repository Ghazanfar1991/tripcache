import { spawnSync } from "node:child_process"
import { isoNow, updateManifest, weightedTotals, writeJson } from "./lib/common.mjs"

const archive = process.argv[2]
if (!archive) throw new Error("Usage: node growth/scripts/import-gsc-export.mjs /path/to/Search-Console.zip")

function parseCsv(text) {
  const records = []
  let record = [], field = "", quoted = false
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]
    if (character === '"' && quoted && text[index + 1] === '"') { field += '"'; index += 1 }
    else if (character === '"') quoted = !quoted
    else if (character === "," && !quoted) { record.push(field); field = "" }
    else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index += 1
      record.push(field); field = ""
      if (record.some(Boolean)) records.push(record)
      record = []
    } else field += character
  }
  if (field || record.length) { record.push(field); records.push(record) }
  const [headers, ...rows] = records
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])))
}

function readCsv(name) {
  const result = spawnSync("unzip", ["-p", archive, name], { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(result.stderr || `Unable to read ${name}`)
  return parseCsv(result.stdout)
}

function number(value) { return Number(String(value).replaceAll(",", "")) || 0 }
function percent(value) { return number(String(value).replace("%", "")) / 100 }
function normalize(rows, label, target) {
  return rows.map((row) => ({
    [target]: row[label], clicks: number(row.Clicks), impressions: number(row.Impressions), ctr: percent(row.CTR), position: number(row.Position),
  }))
}

const daily = normalize(readCsv("Chart.csv"), "Date", "date")
const queries = normalize(readCsv("Queries.csv"), "Top queries", "query")
const pages = normalize(readCsv("Pages.csv"), "Top pages", "page")
const countries = normalize(readCsv("Countries.csv"), "Country", "country")
const devices = normalize(readCsv("Devices.csv"), "Device", "device")
const totals = weightedTotals(daily)
const generatedAt = isoNow()
const period = { startDate: daily[0]?.date || null, endDate: daily.at(-1)?.date || null }

await writeJson("data/search-console/latest.json", {
  source: "Authenticated Google Search Console CSV export",
  generatedAt, reportingLagDays: 3, period, totals, daily,
  observedChange: { clicks: -0.3, impressions: 1.02, source: "Search Console Insights comparison shown during audit" },
})
await writeJson("data/search-console/queries.json", {
  generatedAt, period, topQueries: queries.slice(0, 250),
  ctrOpportunities: queries.filter((row) => row.impressions >= 20 && row.ctr < 0.01 && row.position <= 15).sort((a, b) => b.impressions - a.impressions).slice(0, 100),
  rankingOpportunities: queries.filter((row) => row.impressions >= 10 && row.position >= 4 && row.position <= 30).sort((a, b) => b.impressions - a.impressions).slice(0, 100),
})
await writeJson("data/search-console/pages.json", { generatedAt, period, pages })
await writeJson("data/search-console/countries.json", { generatedAt, period, countries })
await writeJson("data/search-console/devices.json", { generatedAt, period, devices })
await updateManifest("search-console", {
  status: "MANUAL_SEED", freshness: "fresh", latestSyncTime: generatedAt, coveredDateRange: period,
  note: "Sanitized aggregates imported from the owner's authenticated Search Console export; API automation awaits Google OIDC.",
  generatedLocalSnapshot: "growth/data/search-console/latest.json",
})
console.log(`Imported Search Console: ${totals.clicks} clicks, ${totals.impressions} impressions, ${(totals.ctr * 100).toFixed(2)}% CTR.`)
