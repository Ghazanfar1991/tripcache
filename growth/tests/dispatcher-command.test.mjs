import assert from "node:assert/strict"
import test from "node:test"
import { codexExecArgs, selectJobs } from "../scripts/lib/dispatcher-command.mjs"

test("Codex automatic approval selects its own workspace-write sandbox", () => {
  const args = codexExecArgs({ repoRoot: "/repo", outputPath: "/tmp/output", prompt: "Do the work" })
  assert.deepEqual(args, [
    "exec",
    "-C", "/repo",
    "--approve-for-me",
    "-o", "/tmp/output",
    "Do the work",
  ])
  assert.equal(args.includes("--sandbox"), false)
  assert.equal(args.includes("-s"), false)
})

test("manual job selection runs the requested job regardless of its due date", () => {
  const jobs = [
    { id: "weekly", nextDueAt: "2099-01-01T00:00:00Z" },
    { id: "midweek", nextDueAt: "2099-01-01T00:00:00Z" },
  ]
  const selected = selectJobs({ jobs, state: { jobs: {} }, now: new Date(), requestedJobId: "midweek" })
  assert.deepEqual(selected.map((job) => job.id), ["midweek"])
})

test("manual job selection rejects unknown job ids", () => {
  assert.throws(
    () => selectJobs({ jobs: [], state: { jobs: {} }, now: new Date(), requestedJobId: "missing" }),
    /Unknown growth job/,
  )
})
