import assert from "node:assert/strict"
import test from "node:test"
import { blockingTrackedChanges, syncRepository } from "../scripts/lib/repository-sync.mjs"

function mockRunner(responses) {
  const calls = []
  const runner = (_command, args) => {
    calls.push(args)
    const response = responses[calls.length - 1] || { status: 0, stdout: "", stderr: "" }
    return { stderr: "", stdout: "", ...response }
  }
  return { calls, runner }
}

test("runtime dispatcher state does not block a growth run", () => {
  assert.deepEqual(blockingTrackedChanges(" M growth/state/orchestrator-state.json\n"), [])
  assert.deepEqual(blockingTrackedChanges(" M app/page.tsx\n"), [" M app/page.tsx"])
})

test("dispatcher fetches and fast-forwards main before returning a revision", () => {
  const mock = mockRunner([
    { status: 0, stdout: " M growth/state/orchestrator-state.json\n" },
    { status: 0, stdout: "main\n" },
    { status: 0 },
    { status: 0, stdout: "Updating abc..def\n" },
    { status: 0, stdout: "def123\n" },
  ])
  const result = syncRepository({ cwd: "/repo", runner: mock.runner })
  assert.equal(result.status, "SUCCESS")
  assert.equal(result.revision, "def123")
  assert.deepEqual(mock.calls[2], ["fetch", "--quiet", "origin", "main"])
  assert.deepEqual(mock.calls[3], ["merge", "--ff-only", "origin/main"])
})

test("dispatcher refuses to mutate a feature branch", () => {
  const mock = mockRunner([
    { status: 0, stdout: "" },
    { status: 0, stdout: "codex/work\n" },
  ])
  const result = syncRepository({ cwd: "/repo", runner: mock.runner })
  assert.equal(result.status, "WAITING_FOR_MAIN_BRANCH")
  assert.equal(mock.calls.length, 2)
})

test("dispatcher stops safely when main cannot fast-forward", () => {
  const mock = mockRunner([
    { status: 0, stdout: "" },
    { status: 0, stdout: "main\n" },
    { status: 0 },
    { status: 1, stderr: "Not possible to fast-forward" },
  ])
  const result = syncRepository({ cwd: "/repo", runner: mock.runner })
  assert.equal(result.status, "WAITING_FOR_REPOSITORY_SYNC")
})
