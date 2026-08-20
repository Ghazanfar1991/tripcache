import { TextDecoder } from "node:util"
import { fetchJson, isoNow, updateManifest, writeJson, getGoogleAccessToken } from "./lib/common.mjs"
import { datedSourceFreshness } from "./lib/measurement.mjs"

const sourceId = "google-play"
const packageName = process.env.GOOGLE_PLAY_PACKAGE_NAME || "app.tripcache"
const maxReportingLagDays = 7
const bucket = (process.env.GOOGLE_PLAY_REPORT_BUCKET || "").replace(/^gs:\/\//, "").replace(/\/.*$/, "")
const token = getGoogleAccessToken()

if (!bucket || !token) {
  await updateManifest(sourceId, {
    status: !bucket ? "WAITING_FOR_CONFIGURATION" : "WAITING_FOR_HUMAN_AUTH",
    freshness: "stale",
    note: !bucket
      ? "Set GOOGLE_PLAY_REPORT_BUCKET to the Play Console report bucket ID."
      : "The Google Play collector needs a short-lived Google access token with read-only report access.",
  })
  console.log(`Google Play skipped: ${!bucket ? "report bucket is not configured" : "no Google access token"}`)
  process.exit(process.argv.includes("--strict") ? 1 : 0)
}

const headers = { Authorization: `Bearer ${token}` }

function parseCsv(text) {
  const rows = []
  let row = []
  let value = ""
  let quoted = false
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        value += '"'
        index += 1
      } else {
        quoted = !quoted
      }
    } else if (char === "," && !quoted) {
      row.push(value)
      value = ""
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1
      row.push(value)
      if (row.some((cell) => cell !== "")) rows.push(row)
      row = []
      value = ""
    } else {
      value += char
    }
  }
  if (value || row.length) {
    row.push(value)
    rows.push(row)
  }
  const [head = [], ...body] = rows
  return body.map((cells) => Object.fromEntries(head.map((name, index) => [name.replace(/^\uFEFF/, ""), cells[index] || ""])))
}

function number(row, field) {
  const value = Number(String(row[field] || "0").replaceAll(",", ""))
  return Number.isFinite(value) ? value : 0
}

function recentMonths(count = 4) {
  const months = []
  const now = new Date()
  for (let offset = 0; offset < count; offset += 1) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1))
    months.push(`${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}`)
  }
  return months
}

async function downloadObject(name) {
  const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(name)}?alt=media`, { headers })
  if (!response.ok) throw Object.assign(new Error(`HTTP ${response.status} downloading ${name}`), { status: response.status })
  const bytes = new Uint8Array(await response.arrayBuffer())
  const utf16 = bytes[0] === 0xff && bytes[1] === 0xfe
  return new TextDecoder(utf16 ? "utf-16le" : "utf-8").decode(bytes)
}

try {
  const prefix = `stats/installs/installs_${packageName}_`
  const listing = await fetchJson(`https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o?prefix=${encodeURIComponent(prefix)}&maxResults=1000`, { headers })
  const monthSet = new Set(recentMonths())
  const objects = (listing.items || [])
    .map((item) => item.name)
    .filter((name) => monthSet.has(name.match(/_(\d{6})_/)?.[1]))
  const selected = recentMonths().map((month) => {
    const candidates = objects.filter((name) => name.includes(`_${month}_`))
    return candidates.find((name) => /_country\.csv$/i.test(name))
      || candidates.find((name) => /_overview\.csv$/i.test(name))
      || null
  }).filter(Boolean)

  const allRows = []
  for (const name of selected) {
    allRows.push(...parseCsv(await downloadObject(name)))
  }

  const dailyMap = new Map()
  const countryMap = new Map()
  for (const row of allRows) {
    const reportedPackageName = row["Package Name"] || row["Package name"]
    if (reportedPackageName && reportedPackageName !== packageName) continue
    const date = row.Date
    if (!date) continue
    const daily = dailyMap.get(date) || {
      date,
      dailyUserInstalls: 0,
      dailyUserUninstalls: 0,
      dailyDeviceInstalls: 0,
      dailyDeviceUninstalls: 0,
      activeDeviceInstalls: 0,
    }
    daily.dailyUserInstalls += number(row, "Daily User Installs")
    daily.dailyUserUninstalls += number(row, "Daily User Uninstalls")
    daily.dailyDeviceInstalls += number(row, "Daily Device Installs")
    daily.dailyDeviceUninstalls += number(row, "Daily Device Uninstalls")
    daily.activeDeviceInstalls += number(row, "Active Device Installs") || number(row, "Installs on active devices")
    dailyMap.set(date, daily)

    const country = row.Country || row["Country / Region"]
    if (country) {
      const aggregate = countryMap.get(country) || { country, dailyUserInstalls: 0, dailyUserUninstalls: 0 }
      aggregate.dailyUserInstalls += number(row, "Daily User Installs")
      aggregate.dailyUserUninstalls += number(row, "Daily User Uninstalls")
      countryMap.set(country, aggregate)
    }
  }

  const generatedAt = isoNow()
  const daily = [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date))
  const latestReportedDate = daily.at(-1)?.date ?? null
  const sourceFreshness = datedSourceFreshness({ latestReportedDate, generatedAt, maxLagDays: maxReportingLagDays })
  const last28 = daily.slice(-28)
  const totals28Days = last28.reduce((totals, row) => ({
    userInstalls: totals.userInstalls + row.dailyUserInstalls,
    userUninstalls: totals.userUninstalls + row.dailyUserUninstalls,
    deviceInstalls: totals.deviceInstalls + row.dailyDeviceInstalls,
    deviceUninstalls: totals.deviceUninstalls + row.dailyDeviceUninstalls,
  }), { userInstalls: 0, userUninstalls: 0, deviceInstalls: 0, deviceUninstalls: 0 })

  await writeJson("data/store/google-play.json", {
    source: "Google Play Console Cloud Storage statistics export",
    generatedAt,
    packageName,
    reportingLagDays: "3-7",
    filesProcessed: selected.map((name) => name.split("/").at(-1)),
    totals28Days,
    latestReportedDate,
    latestInstalledAudience: daily.at(-1)?.activeDeviceInstalls ?? null,
    daily: daily.slice(-92),
    countries: [...countryMap.values()].sort((a, b) => b.dailyUserInstalls - a.dailyUserInstalls).slice(0, 100),
  })
  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: sourceFreshness.fresh ? "fresh" : "stale",
    latestSyncTime: generatedAt,
    generatedLocalSnapshot: "growth/data/store/google-play.json",
    note: sourceFreshness.fresh
      ? `${totals28Days.userInstalls} official Play user installs in the latest 28 reported days.`
      : `Play export fetched successfully, but the latest reported date (${latestReportedDate || "unknown"}) is ${sourceFreshness.ageDays ?? "an unknown number of"} days old; treat install totals as stale.`,
  })
} catch (error) {
  await updateManifest(sourceId, {
    status: error.status === 401 || error.status === 403 ? "WAITING_FOR_HUMAN_AUTH" : "CONNECTOR_FAILURE",
    freshness: "stale",
    note: error.message,
  })
  console.error(error.message)
  process.exitCode = process.argv.includes("--strict") ? 1 : 0
}
