import assert from "node:assert/strict"
import test from "node:test"
import { addDays } from "../scripts/lib/common.mjs"
import { evaluate, validateEntry } from "../scripts/lib/changelog.mjs"

const shipDate = "2026-06-01"

function days(from, count) {
  return Array.from({ length: count }, (_, index) => addDays(from, index))
}

// 28 days before and after the ship date, with constant daily values per window.
function history({ pageBefore, pageAfter, siteBefore = { clicks: 10, impressions: 1000, position: 10 }, siteAfter = siteBefore }) {
  const pageRows = []
  const siteRows = []
  for (const date of days(addDays(shipDate, -28), 57)) {
    const isAfter = date > shipDate
    const page = isAfter ? pageAfter : pageBefore
    const site = isAfter ? siteAfter : siteBefore
    pageRows.push({ date, page: "/blog/x", clicks: page.clicks, impressions: page.impressions, position: page.position })
    siteRows.push({ date, clicks: site.clicks, impressions: site.impressions, position: site.position })
  }
  return { pageRows, siteRows }
}

const entry = { id: "2026-06-01-test", date: shipDate, status: "shipped", type: "title-meta", pages: ["/blog/x"], summary: "s", why: "w" }

test("a change is not judged before its 28-day window has finished", () => {
  const { pageRows, siteRows } = history({ pageBefore: { clicks: 1, impressions: 50, position: 8 }, pageAfter: { clicks: 1, impressions: 50, position: 8 } })
  const result = evaluate(entry, { pageRows, siteRows: siteRows.slice(0, -3) })
  assert.equal(result.due, false)
})

test("more clicks than the site trend predicts is better", () => {
  const { pageRows, siteRows } = history({ pageBefore: { clicks: 1, impressions: 50, position: 8 }, pageAfter: { clicks: 2, impressions: 60, position: 6 } })
  const { outcome } = evaluate(entry, { pageRows, siteRows })
  assert.equal(outcome.verdict, "better")
  assert.equal(outcome.before.clicks, 28)
  assert.equal(outcome.after.clicks, 56)
})

test("growth that only matches the site-wide trend is not credited to the change", () => {
  const { pageRows, siteRows } = history({
    pageBefore: { clicks: 1, impressions: 50, position: 8 },
    pageAfter: { clicks: 2, impressions: 100, position: 8 },
    siteBefore: { clicks: 10, impressions: 1000, position: 10 },
    siteAfter: { clicks: 20, impressions: 2000, position: 10 },
  })
  assert.equal(evaluate(entry, { pageRows, siteRows }).outcome.verdict, "no-clear-change")
})

test("a large ranking drop is worse", () => {
  const { pageRows, siteRows } = history({ pageBefore: { clicks: 1, impressions: 80, position: 7 }, pageAfter: { clicks: 1, impressions: 80, position: 15 } })
  assert.equal(evaluate(entry, { pageRows, siteRows }).outcome.verdict, "worse")
})

test("tiny samples are reported as too little data", () => {
  const { pageRows, siteRows } = history({ pageBefore: { clicks: 0, impressions: 2, position: 8 }, pageAfter: { clicks: 1, impressions: 3, position: 5 } })
  assert.equal(evaluate(entry, { pageRows, siteRows }).outcome.verdict, "too-little-data")
})

test("another change on the same page inside the window is flagged as a confounder", () => {
  const { pageRows, siteRows } = history({ pageBefore: { clicks: 1, impressions: 50, position: 8 }, pageAfter: { clicks: 2, impressions: 60, position: 6 } })
  const redesign = { ...entry, id: "2026-06-10-redesign", date: "2026-06-10", type: "site-wide", pages: ["*"] }
  const { outcome } = evaluate(entry, { pageRows, siteRows, allEntries: [entry, redesign] })
  assert.deepEqual(outcome.confoundedBy, ["2026-06-10-redesign"])
})

test("new pages report their first 28 days instead of a before/after comparison", () => {
  const { pageRows, siteRows } = history({ pageBefore: { clicks: 0, impressions: 0, position: 0 }, pageAfter: { clicks: 1, impressions: 20, position: 12 } })
  const { outcome } = evaluate({ ...entry, type: "new-page" }, { pageRows, siteRows })
  assert.equal(outcome.verdict, "launched")
  assert.equal(outcome.after.impressions, 560)
})

test("site-wide changes are never credited with the site trend", () => {
  const { pageRows, siteRows } = history({
    pageBefore: { clicks: 1, impressions: 50, position: 8 },
    pageAfter: { clicks: 1, impressions: 50, position: 8 },
    siteBefore: { clicks: 10, impressions: 1000, position: 10 },
    siteAfter: { clicks: 20, impressions: 2000, position: 9 },
  })
  const { outcome } = evaluate({ ...entry, type: "site-wide", pages: ["*"] }, { pageRows, siteRows })
  assert.equal(outcome.verdict, "site-wide")
  assert.equal(outcome.after.clicks, 560)
})

test("entries must explain what changed and why", () => {
  assert.deepEqual(validateEntry(entry), [])
  const problems = validateEntry({ ...entry, why: "", pages: ["blog/x"] })
  assert.ok(problems.some((problem) => problem.startsWith("why")))
  assert.ok(problems.some((problem) => problem.startsWith("pages")))
})
