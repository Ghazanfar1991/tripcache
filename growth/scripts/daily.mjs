import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { isoNow, readJson, writeJson } from "./lib/common.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const scripts = ["collect-search-console.mjs", "collect-ga4.mjs", "collect-revenuecat.mjs", "generate-report.mjs"]
const failures = []

for (const script of scripts) {
  const args = script.startsWith("collect-") ? [path.join(scriptDir, script), "--strict"] : [path.join(scriptDir, script)]
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env })
  if (result.status !== 0) failures.push({ script, exitCode: result.status })
}

const state = await readJson("state/current.json", {})
state.lastDailyRunAt = isoNow()
state.lastDailyRunStatus = failures.length ? "PARTIAL_FAILURE" : "SUCCESS"
state.failures = failures
await writeJson("state/current.json", state)
if (failures.length) process.exitCode = 1
