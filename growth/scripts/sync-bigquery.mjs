import { spawnSync } from "node:child_process"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { dateOnly, growthRoot, readJson } from "./lib/common.mjs"

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", ...options })
  if (result.error || result.status !== 0) {
    const output = [result.stderr, result.stdout].filter(Boolean).join("\n").trim()
    throw new Error(result.error?.message || output || `${command} exited ${result.status}`)
  }
  return result.stdout
}

try {
  const location = process.env.BIGQUERY_LOCATION || "australia-southeast1"
  const queryArgs = ["query", `--location=${location}`, "--use_legacy_sql=false"]
  const sql = await readFile(path.join(growthRoot, "sql", "bootstrap.sql"), "utf8")
  run("bq", queryArgs, { input: sql })
  const search = await readJson("data/search-console/latest.json", {})
  const revenue = await readJson("data/revenue/latest.json", {})
  const funnel = await readJson("data/website/funnel.json", {})
  const statements = []
  if (search.totals) statements.push(`INSERT INTO \`trip-cache.tripcache_growth.search_console_daily\` VALUES (DATE '${dateOnly()}', TIMESTAMP '${search.generatedAt}', ${Number(search.totals.clicks || 0)}, ${Number(search.totals.impressions || 0)}, ${Number(search.totals.ctr || 0)}, ${Number(search.totals.position || 0)});`)
  if (revenue.generatedAt) statements.push(`INSERT INTO \`trip-cache.tripcache_growth.revenue_daily\` VALUES (DATE '${dateOnly()}', TIMESTAMP '${revenue.generatedAt}', '${String(revenue.currency || "AUD").replaceAll("'", "")}', PARSE_JSON('${JSON.stringify(revenue.overview || {}).replaceAll("'", "\\'")}'));`)
  if (funnel.generatedAt) statements.push(`INSERT INTO \`trip-cache.tripcache_growth.growth_funnel_daily\` VALUES (DATE '${dateOnly()}', TIMESTAMP '${funnel.generatedAt}', ${Boolean(funnel.measurable)}, PARSE_JSON('${JSON.stringify(funnel).replaceAll("'", "\\'")}'));`)
  if (statements.length) run("bq", queryArgs, { input: statements.join("\n") })
  console.log(`BigQuery synchronized (${statements.length} aggregate rows).`)
} catch (error) {
  console.error(`BigQuery sync failed: ${error.message}`)
  process.exit(1)
}
