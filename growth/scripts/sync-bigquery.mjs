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
  const app = await readJson("data/app/latest.json", {})
  const play = await readJson("data/store/google-play.json", {})
  const apple = await readJson("data/store/app-store.json", {})
  const quality = await readJson("data/app/quality.json", {})
  const statements = []
  if (search.totals) statements.push(`
MERGE \`trip-cache.tripcache_growth.search_console_daily\` AS target
USING (SELECT DATE '${dateOnly()}' AS snapshot_date, TIMESTAMP '${search.generatedAt}' AS generated_at, ${Number(search.totals.clicks || 0)} AS clicks, ${Number(search.totals.impressions || 0)} AS impressions, ${Number(search.totals.ctr || 0)} AS ctr, ${Number(search.totals.position || 0)} AS average_position) AS source
ON target.snapshot_date = source.snapshot_date
WHEN MATCHED THEN UPDATE SET generated_at = source.generated_at, clicks = source.clicks, impressions = source.impressions, ctr = source.ctr, average_position = source.average_position
WHEN NOT MATCHED THEN INSERT (snapshot_date, generated_at, clicks, impressions, ctr, average_position) VALUES (source.snapshot_date, source.generated_at, source.clicks, source.impressions, source.ctr, source.average_position);`)
  if (revenue.generatedAt) statements.push(`
MERGE \`trip-cache.tripcache_growth.revenue_daily\` AS target
USING (SELECT DATE '${dateOnly()}' AS snapshot_date, TIMESTAMP '${revenue.generatedAt}' AS generated_at, '${String(revenue.currency || "AUD").replaceAll("'", "")}' AS currency, PARSE_JSON('${JSON.stringify(revenue.overview || {}).replaceAll("'", "\\'")}') AS payload) AS source
ON target.snapshot_date = source.snapshot_date
WHEN MATCHED THEN UPDATE SET generated_at = source.generated_at, currency = source.currency, payload = source.payload
WHEN NOT MATCHED THEN INSERT (snapshot_date, generated_at, currency, payload) VALUES (source.snapshot_date, source.generated_at, source.currency, source.payload);`)
  if (funnel.generatedAt) statements.push(`
MERGE \`trip-cache.tripcache_growth.growth_funnel_daily\` AS target
USING (SELECT DATE '${dateOnly()}' AS snapshot_date, TIMESTAMP '${funnel.generatedAt}' AS generated_at, ${Boolean(funnel.measurable)} AS measurable, PARSE_JSON('${JSON.stringify(funnel).replaceAll("'", "\\'")}') AS payload) AS source
ON target.snapshot_date = source.snapshot_date
WHEN MATCHED THEN UPDATE SET generated_at = source.generated_at, measurable = source.measurable, payload = source.payload
WHEN NOT MATCHED THEN INSERT (snapshot_date, generated_at, measurable, payload) VALUES (source.snapshot_date, source.generated_at, source.measurable, source.payload);`)
  if (app.generatedAt) statements.push(`
MERGE \`trip-cache.tripcache_growth.app_usage_daily\` AS target
USING (SELECT DATE '${dateOnly()}' AS snapshot_date, TIMESTAMP '${app.generatedAt}' AS generated_at, PARSE_JSON('${JSON.stringify(app).replaceAll("'", "\\'")}') AS payload) AS source
ON target.snapshot_date = source.snapshot_date
WHEN MATCHED THEN UPDATE SET generated_at = source.generated_at, payload = source.payload
WHEN NOT MATCHED THEN INSERT (snapshot_date, generated_at, payload) VALUES (source.snapshot_date, source.generated_at, source.payload);`)
  for (const [store, snapshot] of [["google-play", play], ["app-store", apple]]) {
    if (!snapshot.generatedAt) continue
    statements.push(`
MERGE \`trip-cache.tripcache_growth.store_daily\` AS target
USING (SELECT DATE '${dateOnly()}' AS snapshot_date, TIMESTAMP '${snapshot.generatedAt}' AS generated_at, '${store}' AS store, PARSE_JSON('${JSON.stringify(snapshot).replaceAll("'", "\\'")}') AS payload) AS source
ON target.snapshot_date = source.snapshot_date AND target.store = source.store
WHEN MATCHED THEN UPDATE SET generated_at = source.generated_at, payload = source.payload
WHEN NOT MATCHED THEN INSERT (snapshot_date, generated_at, store, payload) VALUES (source.snapshot_date, source.generated_at, source.store, source.payload);`)
  }
  if (quality.generatedAt) statements.push(`
MERGE \`trip-cache.tripcache_growth.app_quality_daily\` AS target
USING (SELECT DATE '${dateOnly()}' AS snapshot_date, TIMESTAMP '${quality.generatedAt}' AS generated_at, PARSE_JSON('${JSON.stringify(quality).replaceAll("'", "\\'")}') AS payload) AS source
ON target.snapshot_date = source.snapshot_date
WHEN MATCHED THEN UPDATE SET generated_at = source.generated_at, payload = source.payload
WHEN NOT MATCHED THEN INSERT (snapshot_date, generated_at, payload) VALUES (source.snapshot_date, source.generated_at, source.payload);`)
  if (statements.length) run("bq", queryArgs, { input: statements.join("\n") })
  console.log(`BigQuery synchronized (${statements.length} aggregate rows).`)
} catch (error) {
  console.error(`BigQuery sync failed: ${error.message}`)
  process.exit(1)
}
