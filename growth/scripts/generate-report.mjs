import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { dateOnly, growthRoot, isoNow, readJson } from "./lib/common.mjs"

const manifest = await readJson("data-manifest.json", { sources: [] })
const search = await readJson("data/search-console/latest.json", {})
const funnel = await readJson("data/website/funnel.json", {})
const revenue = await readJson("data/revenue/latest.json", {})
const generatedAt = isoNow()
const unavailable = manifest.sources.filter((source) => source.status !== "SUCCESS")
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
  `- Revenue data: ${revenue.overview ? "available from RevenueCat" : "awaiting authenticated collection"}.`,
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
