import assert from "node:assert/strict"
import test from "node:test"
import { aiAssistantReferralSummary, buildAiAssistantReferrals, datedSourceFreshness, isWebPlatform } from "../scripts/lib/measurement.mjs"

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

test("unmeasurable web data remains unknown instead of becoming zero", () => {
  const referrals = buildAiAssistantReferrals({ measurable: false, rows: [] })
  assert.equal(referrals.measurable, false)
  assert.equal(referrals.sessions, null)
  assert.equal(referrals.activeUsers, null)
  assert.equal(referrals.landingPages, null)
  assert.match(aiAssistantReferralSummary({ measurable: false, aiAssistantReferrals: referrals }).text, /^unknown/)
})

test("a measured absence of AI referrals is a real zero", () => {
  const referrals = buildAiAssistantReferrals({ measurable: true, rows: [] })
  assert.equal(referrals.sessions, 0)
  assert.equal(referrals.activeUsers, 0)
  assert.equal(aiAssistantReferralSummary({ measurable: true, aiAssistantReferrals: referrals }).measurable, true)
})

test("measured AI referrals are summed", () => {
  const referrals = buildAiAssistantReferrals({
    measurable: true,
    rows: [
      { metrics: { sessions: 2, activeUsers: 2 } },
      { metrics: { sessions: 3, activeUsers: 1 } },
    ],
  })
  assert.equal(referrals.sessions, 5)
  assert.equal(referrals.activeUsers, 3)
})
