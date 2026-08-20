import { spawnSync } from "node:child_process"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { isoNow, readJson, repoRoot, runtimeRoot, writeJson } from "./lib/common.mjs"
import { codexExecArgs, selectJobs } from "./lib/dispatcher-command.mjs"
import { syncRepository } from "./lib/repository-sync.mjs"
import { nextScheduledAt } from "./lib/schedule.mjs"

const dryRun = process.argv.includes("--dry-run")
const runArg = process.argv.indexOf("--run")
const requestedJobId = runArg >= 0 ? process.argv[runArg + 1] : null
const nowArg = process.argv.indexOf("--now")
const now = new Date(nowArg >= 0 ? process.argv[nowArg + 1] : process.env.GROWTH_NOW || Date.now())
const lockDir = path.join(runtimeRoot, "dispatcher.lock")
const scriptDir = path.dirname(fileURLToPath(import.meta.url))

async function acquireLock() {
  await mkdir(runtimeRoot, { recursive: true })
  try {
    await mkdir(lockDir)
    await writeFile(path.join(lockDir, "owner.json"), JSON.stringify({ pid: process.pid, acquiredAt: isoNow() }))
    return true
  } catch (error) {
    if (error.code !== "EEXIST") throw error
    try {
      const owner = JSON.parse(await readFile(path.join(lockDir, "owner.json"), "utf8"))
      if (Date.now() - new Date(owner.acquiredAt).getTime() > 6 * 60 * 60 * 1000) {
        await rm(lockDir, { recursive: true })
        return acquireLock()
      }
    } catch {}
    return false
  }
}

function classify(output) {
  if (/ENOBUFS|maxBuffer|output buffer/i.test(output)) return "RETRYABLE"
  if (/usage limit|rate limit|429|temporar(?:y|ily)|network|timeout|timed out/i.test(output)) return "RETRYABLE"
  if (/not logged in|authentication|login required|unauthorized|forbidden/i.test(output)) return "WAITING_FOR_HUMAN_AUTH"
  return "FAILED"
}

async function execute(job) {
  const repository = syncRepository({ cwd: repoRoot })
  if (repository.status !== "SUCCESS") return repository
  const codex = process.env.CODEX_BIN || "/Applications/ChatGPT.app/Contents/Resources/codex"
  const prompt = await readFile(path.join(repoRoot, job.prompt), "utf8")
  const outputPath = path.join(runtimeRoot, `${job.id}-last-message.txt`)
  const result = spawnSync(codex, codexExecArgs({ repoRoot, outputPath, prompt }), {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: job.maxRuntimeMinutes * 60 * 1000,
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, CODEX_AUTO_TASK: "1" },
  })
  const diagnostic = result.error
    ? `${result.error.name || "Error"}: ${result.error.message || String(result.error)}`
    : ""
  const processOutput = `${result.stdout || ""}\n${result.stderr || ""}\n${diagnostic}`.trim()
  let finalMessage = ""
  try {
    finalMessage = (await readFile(outputPath, "utf8")).trim()
  } catch {}
  const output = (result.status === 0 && finalMessage ? finalMessage : processOutput).slice(-8000)
  return {
    status: result.status === 0 ? "SUCCESS" : classify(output),
    output,
    exitCode: result.status,
    signal: result.signal ?? null,
    errorCode: result.error?.code ?? null,
    syncedRevision: repository.revision,
  }
}

function sendReportEmail(job) {
  const kind = job.id.startsWith("monthly") ? "monthly" : "weekly"
  const result = spawnSync(process.execPath, [path.join(scriptDir, "send-report-email.mjs"), "--kind", kind], {
    cwd: repoRoot,
    encoding: "utf8",
    env: process.env,
  })
  const output = `${result.stdout || ""}\n${result.stderr || ""}`.trim().slice(-2000)
  return {
    status: result.status !== 0 ? "FAILED" : /email accepted/i.test(output) ? "SENT" : "SKIPPED",
    output,
  }
}

if (runArg >= 0 && !requestedJobId) throw new Error("--run requires a growth job id")

if (!(await acquireLock())) {
  console.log("Dispatcher already running; exiting safely.")
  process.exit(0)
}

try {
  const config = await readJson("config/jobs.yaml")
  const state = await readJson("state/orchestrator-state.json", { dispatcher: {}, jobs: {} })
  state.dispatcher = { ...state.dispatcher, status: dryRun ? "DRY_RUN" : "RUNNING", lastWakeAt: now.toISOString(), pid: process.pid }
  const due = selectJobs({ jobs: config.jobs, state, now, requestedJobId })
  if (!due.length) {
    console.log(`No jobs due at ${now.toISOString()}.`)
  }
  for (const job of due) {
    const previous = state.jobs?.[job.id] || {}
    console.log(`${dryRun ? "Would run" : "Running"}: ${job.id}`)
    if (dryRun) continue
    const result = await execute(job)
    const email = result.status === "SUCCESS" ? sendReportEmail(job) : null
    const attempts = result.status === "SUCCESS" ? 0 : Number(previous.attempts || 0) + 1
    const retryHours = [6, 12, 24][Math.min(attempts - 1, 2)]
    state.jobs[job.id] = {
      ...previous,
      status: result.status,
      trigger: requestedJobId ? "MANUAL" : "SCHEDULED",
      attempts,
      lastRunAt: now.toISOString(),
      nextDueAt: result.status === "SUCCESS"
        ? nextScheduledAt(job.schedule, config.timezone, now)
        : new Date(now.getTime() + retryHours * 3600000).toISOString(),
      lastOutput: result.output,
      exitCode: result.exitCode ?? null,
      signal: result.signal ?? null,
      errorCode: result.errorCode ?? null,
      syncedRevision: result.syncedRevision ?? previous.syncedRevision ?? null,
      email,
    }
    await writeJson("state/orchestrator-state.json", { ...state, updatedAt: isoNow() })
  }
  if (!dryRun) {
    state.dispatcher = { ...state.dispatcher, status: "IDLE", completedAt: isoNow() }
    await writeJson("state/orchestrator-state.json", { ...state, updatedAt: isoNow() })
  }
} finally {
  await rm(lockDir, { recursive: true, force: true })
}
