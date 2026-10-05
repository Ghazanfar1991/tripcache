import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"
import { readCsv, readJson, readText, repoRoot, seoRoot } from "./lib/common.mjs"
import { parseChangelog, validateEntry } from "./lib/changelog.mjs"

// Fast static checks (no server). Run in CI on every PR and push:
//   node seo/scripts/check-repo.mjs [--base <git-ref>]
// With --base, also fails when SEO-relevant files changed but seo/changelog.jsonl did not (RULES.md R2).
const baseArg = process.argv.indexOf("--base")
const base = baseArg >= 0 ? process.argv[baseArg + 1] : null
const failures = []

const seoRelevant = [
  /^content\//,
  /^app\/(.*\/)?(page|layout)\.(tsx|ts|mdx)$/,
  /^app\/(sitemap|robots)\.(ts|txt)$/,
  /^next\.config\.mjs$/,
  /^lib\/(seo-page-data|blog|markdown|markdown-inline)\.(ts|tsx|mjs)$/,
  /^components\/seo\//,
  /^public\/llms(-full)?\.txt$/,
]

// URL registry
const registry = await readJson("url-registry.json")
const registryByPath = new Map()
for (const entry of registry.urls) {
  if (!entry.path?.startsWith("/")) failures.push(`url-registry: invalid path ${JSON.stringify(entry.path)}`)
  if (registryByPath.has(entry.path)) failures.push(`url-registry: ${entry.path} is listed twice`)
  registryByPath.set(entry.path, entry)
  if (!["live", "redirected", "removed"].includes(entry.status)) failures.push(`url-registry: ${entry.path} has unknown status "${entry.status}"`)
  if (entry.status === "redirected" && !entry.redirectTo?.startsWith("/")) failures.push(`url-registry: ${entry.path} is redirected but has no redirectTo path`)
}
for (const entry of registry.urls.filter((item) => item.status === "redirected")) {
  const target = registryByPath.get(entry.redirectTo)
  if (target?.status === "redirected") failures.push(`url-registry: ${entry.path} → ${entry.redirectTo} is a redirect chain; point it at ${target.redirectTo}`)
}

// Changelog
const entries = parseChangelog(await readText("changelog.jsonl", ""))
const ids = new Set()
for (const entry of entries) {
  for (const problem of validateEntry(entry)) failures.push(`changelog ${entry.id || "(no id)"}: ${problem}`)
  if (ids.has(entry.id)) failures.push(`changelog: duplicate id ${entry.id}`)
  ids.add(entry.id)
  if (entry.status !== "planned") {
    for (const page of entry.pages.filter((item) => item !== "*")) {
      if (!registryByPath.has(page)) failures.push(`changelog ${entry.id}: ${page} is not in seo/url-registry.json`)
    }
  }
}

// Keyword map: one owner page per cluster, so pages never compete for the same search (RULES.md R5).
if (existsSync(path.join(seoRoot, "keywords.csv"))) {
  const keywords = await readCsv("keywords.csv")
  const required = ["keyword", "cluster", "owner", "priority"]
  const missing = required.filter((column) => keywords.length && !(column in keywords[0]))
  if (missing.length) failures.push(`keywords.csv is missing columns: ${missing.join(", ")}`)
  const ownersByCluster = new Map()
  const seen = new Set()
  for (const row of keywords) {
    const key = row.keyword.toLowerCase()
    if (seen.has(key)) failures.push(`keywords.csv: "${row.keyword}" is listed twice`)
    seen.add(key)
    const owners = ownersByCluster.get(row.cluster) || new Set()
    owners.add(row.owner)
    ownersByCluster.set(row.cluster, owners)
    if (row.owner.startsWith("/")) {
      const entry = registryByPath.get(row.owner)
      if (!entry) failures.push(`keywords.csv: "${row.keyword}" is owned by ${row.owner}, which is not a registered URL (use NEW:/path for pages that don't exist yet)`)
      else if (entry.status !== "live") failures.push(`keywords.csv: "${row.keyword}" is owned by ${row.owner}, which is ${entry.status}${entry.redirectTo ? ` to ${entry.redirectTo}` : ""}`)
    } else if (!/^NEW:\/[a-z0-9/-]+$/.test(row.owner) && row.owner !== "SKIP") {
      failures.push(`keywords.csv: "${row.keyword}" owner must be a live path, NEW:/path or SKIP`)
    }
  }
  for (const [cluster, owners] of ownersByCluster) {
    if (owners.size > 1) failures.push(`keywords.csv: cluster "${cluster}" has ${owners.size} owner pages (${[...owners].join(", ")}); pick one`)
  }
}

// Changed SEO-relevant files must come with a changelog entry.
let changed = null
if (base && !/^0+$/.test(base)) {
  try {
    changed = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`], { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).split("\n").filter(Boolean)
  } catch {
    console.warn(`Could not diff against ${base}; skipping the changelog-required check.`)
  }
}
if (changed) {
  const relevant = changed.filter((file) => seoRelevant.some((pattern) => pattern.test(file)))
  if (relevant.length && !changed.includes("seo/changelog.jsonl")) {
    failures.push(`These changes can affect search but seo/changelog.jsonl was not updated:\n    ${relevant.join("\n    ")}\n  Log it with: npm run seo:log -- add --type <type> --pages <paths> --summary "..." --why "..."`)
  }
}

if (failures.length) {
  console.error(`SEO repo check failed:\n- ${failures.join("\n- ")}`)
  process.exit(1)
}
console.log(`SEO repo check passed: ${registry.urls.length} registered URLs, ${entries.length} changelog entries.`)
