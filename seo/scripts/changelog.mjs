import { readCsv, readText, writeText } from "./lib/common.mjs"
import { changeTypes, evaluate, parseChangelog, serializeChangelog, validateEntry } from "./lib/changelog.mjs"

// npm run seo:log -- add --type title-meta --pages /blog/x --summary "..." --why "..." [--keywords "a;b"] [--date YYYY-MM-DD] [--status planned] [--commit sha]
// npm run seo:log -- review   (fills outcomes for changes whose 28-day window has finished)
// npm run seo:log -- render   (rewrites seo/CHANGELOG.md)
const [command = "render", ...rest] = process.argv.slice(2)
const flags = Object.fromEntries(rest.reduce((pairs, value, index, all) => {
  if (value.startsWith("--")) pairs.push([value.slice(2), all[index + 1] && !all[index + 1].startsWith("--") ? all[index + 1] : "true"])
  return pairs
}, []))

const entries = parseChangelog(await readText("changelog.jsonl", ""))

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").slice(0, 6).join("-")
}

function pct(value) {
  return value == null ? "–" : `${(value * 100).toFixed(1)}%`
}

function render() {
  const icon = { better: "✅ better", worse: "❌ worse", "no-clear-change": "➖ no clear change", "too-little-data": "… too little data", "no-baseline-data": "… no baseline", "site-wide": "🌐 site-wide (no control; can't attribute)" }
  const rows = [...entries].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)).map((entry) => {
    const outcome = entry.outcome
    const result = outcome?.verdict === "launched"
      ? `🆕 launched<br>first 28 days: ${outcome.after.clicks} clicks · ${outcome.after.impressions} impr · pos ${outcome.after.position ?? "–"}`
      : outcome?.before
      ? `${icon[outcome.verdict] || outcome.verdict}${outcome.confoundedBy ? " ⚠ confounded" : ""}<br>clicks ${outcome.before.clicks}→${outcome.after.clicks} (expected ${outcome.expectedClicks}) · impr ${outcome.before.impressions}→${outcome.after.impressions} · CTR ${pct(outcome.before.ctr)}→${pct(outcome.after.ctr)} · pos ${outcome.before.position ?? "–"}→${outcome.after.position ?? "–"}`
      : outcome ? icon[outcome.verdict] || outcome.verdict : entry.status === "shipped" ? "measuring…" : entry.status
    const lesson = `${entry.notes ? `<br>_Note: ${entry.notes}_` : ""}${entry.lesson ? `<br>**Lesson:** ${entry.lesson}` : ""}`
    return `| ${entry.date} | ${entry.type} | ${entry.pages.map((page) => `\`${page}\``).join(" ")} | ${entry.summary}${lesson} | ${result} |`
  })
  return [
    "# SEO changelog",
    "",
    "Generated from `seo/changelog.jsonl` by `npm run seo:log -- render`. Do not edit by hand.",
    "",
    "Each change is judged 28 days after it ships: the 28 days before vs the 28 days after, with the rest of the site as a control. ⚠ confounded = another change touched the same page(s) in that window, so the result can't be attributed cleanly.",
    "",
    "| Shipped | Type | Pages | Change | Result (28d before → after) |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n")
}

if (command === "add") {
  const date = flags.date || new Date().toISOString().slice(0, 10)
  const entry = {
    id: `${date}-${slug(flags.id || flags.summary || "change")}`,
    date,
    status: flags.status || "shipped",
    type: flags.type,
    pages: (flags.pages || "").split(/[;,]/).map((page) => page.trim()).filter(Boolean),
    keywords: flags.keywords ? flags.keywords.split(";").map((keyword) => keyword.trim()).filter(Boolean) : [],
    summary: flags.summary,
    why: flags.why,
    ...(flags.commit ? { commit: flags.commit } : {}),
  }
  const problems = validateEntry(entry)
  if (entries.some((existing) => existing.id === entry.id)) problems.push(`id ${entry.id} already exists; pass --id with a different short name`)
  if (problems.length) {
    console.error(`Not added:\n- ${problems.join("\n- ")}\nTypes: ${changeTypes.join(", ")}`)
    process.exit(1)
  }
  entries.push(entry)
  await writeText("changelog.jsonl", serializeChangelog(entries))
  await writeText("CHANGELOG.md", render())
  console.log(`Logged ${entry.id}`)
} else if (command === "review") {
  const pageRows = await readCsv("data/search-console/page-daily.csv")
  const siteRows = await readCsv("data/search-console/site-daily.csv")
  let reviewed = 0
  for (const entry of entries.filter((item) => item.status === "shipped")) {
    const result = evaluate(entry, { pageRows, siteRows, allEntries: entries })
    if (!result.due) continue
    entry.outcome = result.outcome
    entry.status = "reviewed"
    reviewed += 1
  }
  await writeText("changelog.jsonl", serializeChangelog(entries))
  await writeText("CHANGELOG.md", render())
  console.log(`Reviewed ${reviewed} change(s); ${entries.filter((entry) => entry.status === "reviewed" && !entry.lesson).length} reviewed change(s) still need a written lesson.`)
} else if (command === "render") {
  await writeText("CHANGELOG.md", render())
  console.log(`Rendered ${entries.length} change(s) to seo/CHANGELOG.md`)
} else {
  console.error(`Unknown command "${command}". Use add, review or render.`)
  process.exit(1)
}
