import { execFileSync } from "node:child_process"
import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
export const asoRoot = path.resolve(here, "../..")
export const repoRoot = path.resolve(asoRoot, "..")

export async function readText(relativePath, fallback = null) {
  try {
    return await readFile(path.resolve(asoRoot, relativePath), "utf8")
  } catch (error) {
    if (fallback !== null && error.code === "ENOENT") return fallback
    throw error
  }
}

export async function writeText(relativePath, value) {
  const target = path.resolve(asoRoot, relativePath)
  await mkdir(path.dirname(target), { recursive: true })
  const temporary = `${target}.tmp`
  await writeFile(temporary, value, "utf8")
  await rename(temporary, target)
}

export async function readJson(relativePath, fallback = null) {
  const text = await readText(relativePath, fallback === null ? null : "")
  if (text === "" && fallback !== null) return fallback
  return JSON.parse(text)
}

export async function writeJson(relativePath, value) {
  await writeText(relativePath, `${JSON.stringify(value, null, 2)}\n`)
}

// Minimal CSV for the files this system owns: header row, comma separated,
// fields quoted only when they contain a comma, quote or newline.
export function parseCsv(text) {
  const rows = []
  let row = []
  let field = ""
  let quoted = false
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { field += '"'; index += 1 }
      else if (char === '"') quoted = false
      else field += char
    } else if (char === '"') quoted = true
    else if (char === ",") { row.push(field); field = "" }
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[index + 1] === "\n") index += 1
      row.push(field); field = ""
      if (row.some((value) => value !== "")) rows.push(row)
      row = []
    } else field += char
  }
  row.push(field)
  if (row.some((value) => value !== "")) rows.push(row)
  const [header = [], ...body] = rows
  return body.map((values) => Object.fromEntries(header.map((name, index) => [name.trim(), (values[index] ?? "").trim()])))
}

export function toCsv(records, columns) {
  const escape = (value) => {
    const text = value == null ? "" : String(value)
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  return `${[columns.join(","), ...records.map((record) => columns.map((column) => escape(record[column])).join(","))].join("\n")}\n`
}

export async function readCsv(relativePath) {
  return parseCsv(await readText(relativePath, ""))
}

export function isoNow() {
  return new Date().toISOString()
}

export function dateOnly(date = new Date()) {
  const timeZone = process.env.TZ || "Australia/Sydney"
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date).map((part) => [part.type, part.value]),
  )
  return `${parts.year}-${parts.month}-${parts.day}`
}

export function daysAgo(days, from = new Date()) {
  const result = new Date(from)
  result.setUTCDate(result.getUTCDate() - days)
  return dateOnly(result)
}

export function addDays(isoDate, days) {
  const result = new Date(`${isoDate}T00:00:00.000Z`)
  result.setUTCDate(result.getUTCDate() + days)
  return result.toISOString().slice(0, 10)
}

export async function updateManifest(id, patch) {
  const manifest = await readJson("shared/data/manifest.json", { generatedAt: null, sources: [] })
  const index = manifest.sources.findIndex((source) => source.id === id)
  const next = {
    ...(index >= 0 ? manifest.sources[index] : { id }),
    ...patch,
    checkedAt: isoNow(),
  }
  if (index >= 0) manifest.sources[index] = next
  else manifest.sources.push(next)
  manifest.generatedAt = isoNow()
  await writeJson("shared/data/manifest.json", manifest)
}

export function getGoogleAccessToken() {
  if (process.env.GOOGLE_ACCESS_TOKEN) return process.env.GOOGLE_ACCESS_TOKEN
  try {
    return execFileSync("gcloud", ["auth", "print-access-token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim() || null
  } catch {
    return null
  }
}

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options)
  const body = await response.text()
  let parsed
  try {
    parsed = body ? JSON.parse(body) : {}
  } catch {
    parsed = { raw: body.slice(0, 500) }
  }
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status} for ${url}`)
    error.status = response.status
    error.body = parsed
    throw error
  }
  return parsed
}

export function weightedTotals(rows) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.clicks += Number(row.clicks || 0)
      acc.impressions += Number(row.impressions || 0)
      acc.positionWeight += Number(row.position || 0) * Number(row.impressions || 0)
      return acc
    },
    { clicks: 0, impressions: 0, positionWeight: 0 },
  )
  return {
    clicks: totals.clicks,
    impressions: totals.impressions,
    ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
    position: totals.impressions ? totals.positionWeight / totals.impressions : null,
  }
}

export function percentageChange(current, previous) {
  if (!previous) return null
  return (current - previous) / previous
}
