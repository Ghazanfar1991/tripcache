import { spawnSync } from "node:child_process"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { isoNow, readJson, repoRoot, runtimeRoot, writeJson } from "./lib/common.mjs"

const dryRun = process.argv.includes("--dry-run")
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

function nextDate(intervalDays) {
  return new Date(now.getTime() + intervalDays * 86400000).toISOString()
}

function classify(output) {
  if (/usage limit|rate limit|429|temporar(?:y|ily)|network|timeout|timed out/i.test(output)) return "RETRYABLE"
  if (/not logged in|authentication|login required|unauthorized|forbidden/i.test(output)) return "WAITING_FOR_HUMAN_AUTH"
  return "FAILED"
}

async function execute(job) {
  const git = spawnSync("git", ["status", "--porcelain", "--untracked-files=no"], { cwd: repoRoot, encoding: "utf8" })
  if (job.dirtyWorktreePolicy === "wait" && git.stdout.trim()) {
    return { status: "WAITING_FOR_CLEAN_WORKTREE", output: "Tracked files have uncommitted changes." }
  }
  const codex = process.env.CODEX_BIN || "/Applications/ChatGPT.app/Contents/Resources/codex"
  const prompt = await readFile(path.join(repoRoot, job.prompt), "utf8")
  const outputPath = path.join(runtimeRoot, `${job.id}-last-message.txt`)
  const result = spawnSync(codex, [
    "exec", "-C", repoRoot, "-s", "workspace-write", "--approve-for-me", "-o", outputPath, prompt,
  ], {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: job.maxRuntimeMinutes * 60 * 1000,
    env: { ...process.env, CODEX_AUTO_TASK: "1" },
  })
  const output = `${result.stdout || ""}\n${result.stderr || ""}`.trim().slice(-8000)
  return { status: result.status === 0 ? "SUCCESS" : classify(output), output, exitCode: result.status }
}

if (!(await acquireLock())) {
  console.log("Dispatcher already running; exiting safely.")
  process.exit(0)
}

try {
  const config = await readJson("config/jobs.yaml")
  const state = await readJson("state/orchestrator-state.json", { dispatcher: {}, jobs: {} })
  state.dispatcher = { ...state.dispatcher, status: dryRun ? "DRY_RUN" : "RUNNING", lastWakeAt: now.toISOString(), pid: process.pid }
  const due = config.jobs.filter((job) => new Date(state.jobs?.[job.id]?.nextDueAt || job.nextDueAt) <= now)
  if (!due.length) {
    console.log(`No jobs due at ${now.toISOString()}.`)
  }
  for (const job of due) {
    const previous = state.jobs?.[job.id] || {}
    console.log(`${dryRun ? "Would run" : "Running"}: ${job.id}`)
    if (dryRun) continue
    const result = await execute(job)
    const attempts = result.status === "SUCCESS" ? 0 : Number(previous.attempts || 0) + 1
    const retryHours = [6, 12, 24][Math.min(attempts - 1, 2)]
    state.jobs[job.id] = {
      ...previous,
      status: result.status,
      attempts,
      lastRunAt: now.toISOString(),
      nextDueAt: result.status === "SUCCESS"
        ? nextDate(job.intervalDays)
        : new Date(now.getTime() + retryHours * 3600000).toISOString(),
      lastOutput: result.output,
      exitCode: result.exitCode ?? null,
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
