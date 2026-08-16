import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { growthRoot, readJson } from "./lib/common.mjs"

const required = [
  "AGENT.md", "README.md", "context.md", "growth-model.md", "metric-definitions.md", "data-manifest.json",
  "config/goals.yaml", "config/jobs.yaml", "config/guardrails.yaml", "config/markets.yaml", "config/connectors.yaml",
  "state/current.json", "state/orchestrator-state.json", "state/setup-state.json", "state/active-experiments.json",
]
const errors = []

async function filesBelow(directory) {
  const output = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) output.push(...await filesBelow(full))
    else output.push(full)
  }
  return output
}

for (const relative of required) {
  try {
    const text = await readFile(path.join(growthRoot, relative), "utf8")
    if (!text.trim()) errors.push(`${relative} is empty`)
    if (/\.(json|yaml)$/.test(relative)) JSON.parse(text)
  } catch (error) {
    errors.push(`${relative}: ${error.message}`)
  }
}

try {
  const jobs = await readJson("config/jobs.yaml")
  const ids = new Set()
  for (const job of jobs.jobs || []) {
    if (!job.id || ids.has(job.id)) errors.push(`duplicate or missing job id: ${job.id}`)
    ids.add(job.id)
    if (!job.schedule || !["weekly", "monthly"].includes(job.schedule.frequency)) errors.push(`${job.id} has invalid schedule frequency`)
    if (!Number.isInteger(job.schedule?.hour) || job.schedule.hour < 0 || job.schedule.hour > 23) errors.push(`${job.id} has invalid schedule hour`)
    if (!Number.isInteger(job.schedule?.minute) || job.schedule.minute < 0 || job.schedule.minute > 59) errors.push(`${job.id} has invalid schedule minute`)
    if (job.schedule?.frequency === "weekly" && (!Number.isInteger(job.schedule.weekday) || job.schedule.weekday < 0 || job.schedule.weekday > 6)) errors.push(`${job.id} has invalid schedule weekday`)
    if (job.schedule?.frequency === "monthly" && (!Number.isInteger(job.schedule.day) || job.schedule.day < 1 || job.schedule.day > 28)) errors.push(`${job.id} has invalid schedule day`)
  }
} catch {}

const secretPatterns = [
  /sk_[A-Za-z0-9]{16,}/,
  /AIza[0-9A-Za-z_-]{30,}/,
  /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/,
  /Bearer\s+[A-Za-z0-9._-]{30,}/i,
]
for (const file of await filesBelow(growthRoot)) {
  const text = await readFile(file, "utf8")
  for (const expression of secretPatterns) {
    if (expression.test(text)) errors.push(`${path.relative(growthRoot, file)} appears to contain a credential`)
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"))
  process.exit(1)
}
console.log(`Growth memory valid (${required.length} required artifacts; no embedded secrets).`)
