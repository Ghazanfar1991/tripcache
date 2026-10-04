import assert from "node:assert/strict"
import test from "node:test"
import { datedSourceFreshness, isWebPlatform } from "../scripts/lib/measurement.mjs"

test("web platform matching is case-insensitive and exact", () => {
  assert.equal(isWebPlatform("web"), true)
  assert.equal(isWebPlatform("WEB"), true)
  assert.equal(isWebPlatform(" Web "), true)
  assert.equal(isWebPlatform("Android"), false)
  assert.equal(isWebPlatform("website"), false)
  assert.equal(isWebPlatform(null), false)
})

test("dated source freshness respects the maximum reporting lag", () => {
  assert.deepEqual(datedSourceFreshness({ latestReportedDate: "2026-08-13", generatedAt: "2026-08-20T09:29:57.959Z", maxLagDays: 7 }), { fresh: true, ageDays: 7 })
  assert.deepEqual(datedSourceFreshness({ latestReportedDate: "2026-08-12", generatedAt: "2026-08-20T09:29:57.959Z", maxLagDays: 7 }), { fresh: false, ageDays: 8 })
  assert.deepEqual(datedSourceFreshness({ latestReportedDate: null, generatedAt: "2026-08-20T09:29:57.959Z", maxLagDays: 7 }), { fresh: false, ageDays: null })
})
