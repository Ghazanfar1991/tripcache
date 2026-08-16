import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { isoNow, readJson, writeJson } from "./lib/common.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const scripts = [
  { name: "collect-search-console.mjs", required: true },
  { name: "collect-ga4.mjs", required: true },
  { name: "collect-crashlytics.mjs", required: false },
  { name: "collect-revenuecat.mjs", required: true },
  { name: "collect-google-play.mjs", required: false },
  { name: "collect-app-store.mjs", required: false },
  { name: "refresh-state.mjs", required: true },
  { name: "generate-report.mjs", required: true },
]
const failures = []

for (const script of scripts) {
  const args = [path.join(scriptDir, script.name)]
  if (script.required && script.name.startsWith("collect-")) args.push("--strict")
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env })
  if (result.status !== 0) failures.push({ script: script.name, required: script.required, exitCode: result.status })
}

const state = await readJson("state/current.json", {})
const manifest = await readJson("data-manifest.json", { sources: [] })
const connectorGaps = manifest.sources
  .filter((source) => source.status !== "SUCCESS")
  .map((source) => ({ id: source.id, status: source.status }))
state.lastDailyRunAt = isoNow()
state.lastDailyRunStatus = failures.length ? "PARTIAL_FAILURE" : connectorGaps.length ? "SUCCESS_WITH_CONNECTOR_GAPS" : "SUCCESS"
state.failures = failures
state.connectorGaps = connectorGaps
await writeJson("state/current.json", state)
if (failures.some((failure) => failure.required)) process.exitCode = 1
