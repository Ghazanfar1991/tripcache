import { addDays } from "./common.mjs"

export const changeTypes = ["title-meta", "content-update", "new-page", "internal-links", "technical", "schema", "redirect", "site-wide", "backlink", "removal"]
export const statuses = ["planned", "shipped", "reviewed", "reverted"]
export const windowDays = 28
// Below this many impressions across both windows the numbers are noise.
export const minimumImpressions = 200

export function parseChangelog(text) {
  return text.split("\n").map((line, index) => ({ line: line.trim(), number: index + 1 })).filter(({ line }) => line)
    .map(({ line, number }) => {
      try {
        return JSON.parse(line)
      } catch (error) {
        throw new Error(`seo/changelog.jsonl line ${number} is not valid JSON: ${error.message}`)
      }
    })
}

export function serializeChangelog(entries) {
  return `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`
}

export function validateEntry(entry) {
  const problems = []
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(entry.id || "")) problems.push("id must look like YYYY-MM-DD-short-slug")
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date || "")) problems.push("date must be YYYY-MM-DD (the production ship date)")
  if (!statuses.includes(entry.status)) problems.push(`status must be one of ${statuses.join(", ")}`)
  if (!changeTypes.includes(entry.type)) problems.push(`type must be one of ${changeTypes.join(", ")}`)
  if (!Array.isArray(entry.pages) || entry.pages.length === 0) problems.push('pages must list affected paths, or ["*"] for site-wide changes')
  else if (entry.pages.some((page) => page !== "*" && !page.startsWith("/"))) problems.push("pages must be paths like /blog/x")
  if (!entry.summary) problems.push("summary is required (what changed)")
  if (!entry.why) problems.push("why is required (the evidence or hypothesis)")
  if (entry.keywords && !Array.isArray(entry.keywords)) problems.push("keywords must be an array")
  return problems
}

const isSiteWide = (entry) => entry.type === "site-wide" || entry.pages.includes("*")

export function totals(rows) {
  const sum = rows.reduce((acc, row) => {
    acc.clicks += Number(row.clicks)
    acc.impressions += Number(row.impressions)
    acc.positionWeight += Number(row.position) * Number(row.impressions)
    return acc
  }, { clicks: 0, impressions: 0, positionWeight: 0 })
  return {
    clicks: sum.clicks,
    impressions: sum.impressions,
    ctr: sum.impressions ? Number((sum.clicks / sum.impressions).toFixed(4)) : 0,
    position: sum.impressions ? Number((sum.positionWeight / sum.impressions).toFixed(1)) : null,
  }
}

function inWindow(rows, from, to, pages) {
  return rows.filter((row) => row.date >= from && row.date <= to && (!pages || pages.includes(row.page)))
}

// Compares the 28 days before a change with the 28 days after it, using the
// site as a control so seasonality is not credited to (or blamed on) the change.
export function evaluate(entry, { pageRows, siteRows, allEntries = [] }) {
  const latest = siteRows.map((row) => row.date).sort().at(-1)
  const earliest = siteRows.map((row) => row.date).sort()[0]
  const before = { from: addDays(entry.date, -windowDays), to: addDays(entry.date, -1) }
  const after = { from: addDays(entry.date, 1), to: addDays(entry.date, windowDays) }
  if (!latest || latest < after.to) return { due: false, dueOn: addDays(after.to, 3) }
  if (entry.type === "new-page") {
    // Nothing to compare against: report how the new page(s) did in their first 28 days.
    return { due: true, outcome: { verdict: "launched", after: { ...after, ...totals(inWindow(pageRows, after.from, after.to, entry.pages)) }, computedAt: new Date().toISOString() } }
  }
  if (earliest > before.from) return { due: true, outcome: { verdict: "no-baseline-data", before, after } }

  const siteWide = isSiteWide(entry)
  const scope = siteWide ? null : entry.pages
  const pageBefore = totals(siteWide ? inWindow(siteRows, before.from, before.to) : inWindow(pageRows, before.from, before.to, scope))
  const pageAfter = totals(siteWide ? inWindow(siteRows, after.from, after.to) : inWindow(pageRows, after.from, after.to, scope))
  const siteBefore = totals(inWindow(siteRows, before.from, before.to))
  const siteAfter = totals(inWindow(siteRows, after.from, after.to))
  const siteFactor = !siteWide && siteBefore.clicks >= 20 ? siteAfter.clicks / siteBefore.clicks : 1
  const expectedClicks = pageBefore.clicks * siteFactor
  const clickLift = pageAfter.clicks - expectedClicks
  const threshold = Math.max(5, 0.2 * expectedClicks)
  const positionDelta = pageBefore.position != null && pageAfter.position != null ? Number((pageAfter.position - pageBefore.position).toFixed(1)) : null

  let verdict = "no-clear-change"
  // A site-wide change has no control group: the numbers are just the site trend.
  if (siteWide) verdict = "site-wide"
  else if (pageBefore.impressions + pageAfter.impressions < minimumImpressions) verdict = "too-little-data"
  else if ((clickLift >= threshold && (positionDelta ?? 0) < 3) || ((positionDelta ?? 0) <= -2 && clickLift >= 0)) verdict = "better"
  else if (clickLift <= -threshold || ((positionDelta ?? 0) >= 3 && clickLift <= 0)) verdict = "worse"

  const overlaps = (other) => isSiteWide(other) || siteWide || other.pages.some((page) => entry.pages.includes(page))
  const confoundedBy = allEntries
    .filter((other) => other.id !== entry.id && ["shipped", "reviewed"].includes(other.status))
    .filter((other) => other.date >= before.from && other.date <= after.to && overlaps(other))
    .map((other) => other.id)

  return {
    due: true,
    outcome: {
      verdict,
      before: { ...before, ...pageBefore },
      after: { ...after, ...pageAfter },
      siteClicksChange: siteBefore.clicks ? Number((siteAfter.clicks / siteBefore.clicks - 1).toFixed(3)) : null,
      expectedClicks: Number(expectedClicks.toFixed(1)),
      positionDelta,
      ...(confoundedBy.length ? { confoundedBy } : {}),
      computedAt: new Date().toISOString(),
    },
  }
}
