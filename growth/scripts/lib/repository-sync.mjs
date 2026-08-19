import { spawnSync } from "node:child_process"

const runtimeStatePath = "growth/state/orchestrator-state.json"

function commandOutput(result) {
  return `${result.stdout || ""}\n${result.stderr || ""}`.trim().slice(-4000)
}

export function blockingTrackedChanges(statusOutput) {
  return String(statusOutput || "")
    .split("\n")
    .filter(Boolean)
    .filter((line) => line.slice(3) !== runtimeStatePath)
}

export function syncRepository({ cwd, runner = spawnSync }) {
  const run = (args) => runner("git", args, { cwd, encoding: "utf8" })
  const status = run(["status", "--porcelain", "--untracked-files=no"])
  if (status.status !== 0) {
    return { status: "WAITING_FOR_REPOSITORY_SYNC", output: commandOutput(status) || "Unable to inspect the worktree." }
  }
  if (blockingTrackedChanges(status.stdout).length) {
    return { status: "WAITING_FOR_CLEAN_WORKTREE", output: "Tracked files have uncommitted changes." }
  }

  const branch = run(["branch", "--show-current"])
  if (branch.status !== 0 || branch.stdout.trim() !== "main") {
    return {
      status: "WAITING_FOR_MAIN_BRANCH",
      output: `Dispatcher must run from main; current branch is ${branch.stdout.trim() || "unknown"}.`,
    }
  }

  const fetch = run(["fetch", "--quiet", "origin", "main"])
  if (fetch.status !== 0) {
    return { status: "RETRYABLE", output: commandOutput(fetch) || "Unable to fetch origin/main." }
  }

  const merge = run(["merge", "--ff-only", "origin/main"])
  if (merge.status !== 0) {
    return {
      status: "WAITING_FOR_REPOSITORY_SYNC",
      output: commandOutput(merge) || "Local main cannot fast-forward to origin/main.",
    }
  }

  const revision = run(["rev-parse", "HEAD"])
  return {
    status: "SUCCESS",
    output: commandOutput(merge) || "Repository already up to date.",
    revision: revision.status === 0 ? revision.stdout.trim() : null,
  }
}
