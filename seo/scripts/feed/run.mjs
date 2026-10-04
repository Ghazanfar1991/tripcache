import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Nightly SEO data run (GitHub Actions: .github/workflows/data-feed.yml).
const here = path.dirname(fileURLToPath(import.meta.url))
const steps = [
  { file: "feed/search-console.mjs", required: true },
  { file: "feed/index-status.mjs", required: false },
  { file: "feed/ga4-web.mjs", required: false },
  { file: "check-site.mjs", required: false },
  { file: "changelog.mjs", args: ["review"], required: true },
  { file: "summary.mjs", required: true },
]
const failures = []
for (const step of steps) {
  const args = [path.join(here, "..", step.file), ...(step.args || [])]
  if (step.required && step.file.startsWith("feed/")) args.push("--strict")
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env })
  if (result.status !== 0) failures.push(`${step.file} exited ${result.status}${step.required ? "" : " (optional)"}`)
}
if (failures.length) console.error(`SEO feed issues:\n- ${failures.join("\n- ")}`)
if (failures.some((failure) => !failure.endsWith("(optional)"))) process.exitCode = 1
