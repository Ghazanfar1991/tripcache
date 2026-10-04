import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Nightly app-store data run (GitHub Actions: .github/workflows/data-feed.yml).
const here = path.dirname(fileURLToPath(import.meta.url))
const steps = ["feed/app-store.mjs", "feed/google-play.mjs", "feed/revenuecat.mjs", "feed/crashlytics.mjs", "feed/ga4-app.mjs", "summary.mjs"]
const failures = []
for (const step of steps) {
  const result = spawnSync(process.execPath, [path.join(here, "..", step)], { stdio: "inherit", env: process.env })
  if (result.status !== 0) failures.push(`${step} exited ${result.status}`)
}
if (failures.length) console.error(`ASO feed issues (non-blocking):\n- ${failures.join("\n- ")}`)
