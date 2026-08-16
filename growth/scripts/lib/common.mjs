import { execFileSync } from "node:child_process"
import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
export const growthRoot = path.resolve(here, "../..")
export const repoRoot = path.resolve(growthRoot, "..")
export const runtimeRoot = path.join(repoRoot, ".growth-runtime")

export async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.resolve(growthRoot, relativePath), "utf8"))
  } catch (error) {
    if (fallback !== null && error.code === "ENOENT") return fallback
    throw error
  }
}

export async function writeJson(relativePath, value) {
  const target = path.resolve(growthRoot, relativePath)
  await mkdir(path.dirname(target), { recursive: true })
  const temporary = `${target}.tmp`
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8")
  await rename(temporary, target)
}

export function isoNow() {
  return new Date().toISOString()
}

export function dateOnly(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

export function daysAgo(days, from = new Date()) {
  const result = new Date(from)
  result.setUTCDate(result.getUTCDate() - days)
  return dateOnly(result)
}

export async function updateManifest(id, patch) {
  const manifest = await readJson("data-manifest.json", { generatedAt: null, sources: [] })
  const index = manifest.sources.findIndex((source) => source.id === id)
  const next = {
    ...(index >= 0 ? manifest.sources[index] : { id }),
    ...patch,
    checkedAt: isoNow(),
  }
  if (index >= 0) manifest.sources[index] = next
  else manifest.sources.push(next)
  manifest.generatedAt = isoNow()
  await writeJson("data-manifest.json", manifest)
}

export function getGoogleAccessToken() {
  if (process.env.GOOGLE_ACCESS_TOKEN) return process.env.GOOGLE_ACCESS_TOKEN
  try {
    return execFileSync("gcloud", ["auth", "print-access-token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
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
