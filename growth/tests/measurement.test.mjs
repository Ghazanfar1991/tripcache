import assert from "node:assert/strict"
import test from "node:test"
import { aiAssistantReferralSummary, buildAiAssistantReferrals } from "../scripts/lib/measurement.mjs"

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
