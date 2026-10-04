import { existsSync } from "node:fs"
import path from "node:path"
import { dateOnly, isoNow, readCsv, readJson, readText, seoRoot, toPath, writeText } from "./lib/common.mjs"
import { evaluate, parseChangelog } from "./lib/changelog.mjs"

// Writes seo/data/summary.md: the one page to read before deciding what to do next.
const manifest = await readJson("data/manifest.json", { sources: [] })
const search = await readJson("data/search-console/latest.json", {})
const queries = await readJson("data/search-console/queries.json", { topQueries: [] })
const pages = await readJson("data/search-console/pages.json", { pages: [] })
const opportunities = await readJson("data/search-console/opportunities.json", { queryPageOpportunities: [] })
const indexStatus = await readJson("data/search-console/index-status.json", null).catch(() => null)
const funnel = await readJson("data/website/funnel.json", {})
const health = await readJson("data/site/technical-health.json", {})
const entries = parseChangelog(await readText("changelog.jsonl", ""))
const keywords = existsSync(path.join(seoRoot, "keywords.csv")) ? await readCsv("keywords.csv") : []
const siteRows = await readCsv("data/search-console/site-daily.csv")
const pageRows = await readCsv("data/search-console/page-daily.csv")

const pct = (value) => (value == null || !Number.isFinite(value) ? "–" : `${(value * 100).toFixed(1)}%`)
const signed = (value) => (value == null ? "–" : `${value > 0 ? "+" : ""}${(value * 100).toFixed(0)}%`)
const pos = (value) => (value == null || !Number.isFinite(Number(value)) ? "–" : Number(value).toFixed(1))
const storeClicksByPath = new Map()
for (const row of funnel.storeIntent?.byPage || []) {
  const key = toPath(row.dimensions.pagePathPlusQueryString.split("?")[0])
  storeClicksByPath.set(key, (storeClicksByPath.get(key) || 0) + row.metrics.activeUsers)
}
const queryByText = new Map(queries.topQueries.map((row) => [row.query.toLowerCase(), row]))

const lines = [
  `# TripCache SEO summary — ${dateOnly()}`,
  "",
  `Generated ${isoNow()} by \`npm run seo:feed\`. Search Console data lags 3 days; period ${search.period?.startDate ?? "?"} → ${search.period?.endDate ?? "?"}.`,
  "",
  "## Data sources",
  "",
  ...(manifest.sources.length ? manifest.sources.map((source) => `- ${source.id}: **${source.status}** (${source.freshness || "unknown"}) — ${source.note || ""}`) : ["- Not collected yet (first nightly run pending)."]),
  "",
  "## Google Search, last 28 days",
  "",
  "| Clicks | Impressions | CTR | Avg position |",
  "| ---: | ---: | ---: | ---: |",
  `| ${search.totals?.clicks ?? "–"} (${signed(search.change?.clicks)}) | ${search.totals?.impressions ?? "–"} (${signed(search.change?.impressions)}) | ${pct(search.totals?.ctr)} | ${pos(search.totals?.position)} |`,
  "",
  "Change is versus the previous 28 days.",
  "",
  "## Indexing",
  "",
  ...(indexStatus
    ? [
        `${indexStatus.indexed}/${indexStatus.sitemapUrls} sitemap URLs indexed (checked ${indexStatus.generatedAt.slice(0, 10)}).`,
        "",
        ...indexStatus.pages.filter((page) => page.indexed === false).map((page) => `- \`${page.path}\` — ${page.coverageState}${page.lastCrawlTime ? ` (last crawl ${page.lastCrawlTime.slice(0, 10)})` : " (never crawled)"}`),
      ]
    : ["Not collected yet (first nightly run pending)."]),
  "",
  "## Top pages",
  "",
  "| Page | Clicks | Impr | CTR | Pos | Store-click users |",
  "| --- | ---: | ---: | ---: | ---: | ---: |",
  ...pages.pages.slice(0, 20).map((row) => `| \`${toPath(row.page)}\` | ${row.clicks} | ${row.impressions} | ${pct(row.ctr)} | ${pos(row.position)} | ${storeClicksByPath.get(toPath(row.page)) ?? 0} |`),
  "",
  `Website store intent: ${funnel.storeIntent?.measurable ? `${pct(funnel.storeIntent.rate)} of ${funnel.storeIntent.landingUsers} visitors clicked an App Store/Play link` : "unknown"} (GA4, 28 days).`,
  "",
  "## Quick wins (position 4–20, weak CTR)",
  "",
  "| Query | Page | Impr | CTR | Pos |",
  "| --- | --- | ---: | ---: | ---: |",
  ...opportunities.queryPageOpportunities.filter((row) => row.position >= 4).slice(0, 15).map((row) => `| ${row.query} | \`${toPath(row.page)}\` | ${row.impressions} | ${pct(row.ctr)} | ${pos(row.position)} |`),
  "",
  "## Target keywords (seo/keywords.csv, P1)",
  "",
  ...(keywords.length
    ? [
        "| Keyword | Owner page | US volume | GSC impr | GSC pos |",
        "| --- | --- | ---: | ---: | ---: |",
        ...keywords.filter((row) => row.priority === "P1").map((row) => {
          const gsc = queryByText.get(row.keyword.toLowerCase())
          return `| ${row.keyword} | \`${row.owner}\` | ${row.volume_us || "–"} | ${gsc?.impressions ?? 0} | ${gsc ? pos(gsc.position) : "not ranking"} |`
        }),
      ]
    : ["No keyword map yet."]),
  "",
  "## Changelog",
  "",
  ...entries.filter((entry) => entry.status === "shipped").map((entry) => {
    const result = evaluate(entry, { pageRows, siteRows, allEntries: entries })
    return `- Measuring: ${entry.id} — ${result.due ? "due now (run seo:log review)" : `result due ${result.dueOn}`}`
  }),
  ...entries.filter((entry) => entry.status === "reviewed" && !entry.lesson).map((entry) => `- Needs a written lesson: ${entry.id} (${entry.outcome?.verdict})`),
  ...entries.filter((entry) => entry.status === "planned").map((entry) => `- Planned: ${entry.id} — ${entry.summary}`),
  "",
  "## Site health",
  "",
  `${health.status || "unknown"} — ${health.failures?.length ?? 0} failures, ${health.warnings?.length ?? 0} warnings (${health.baseUrl || "?"}, ${health.generatedAt?.slice(0, 10) || "?"}).`,
  ...(health.failures || []).slice(0, 10).map((failure) => `- ❌ ${failure}`),
  ...(health.warnings || []).slice(0, 10).map((warning) => `- ⚠️ ${warning}`),
  "",
]

await writeText("data/summary.md", lines.join("\n"))
console.log("Wrote seo/data/summary.md")
