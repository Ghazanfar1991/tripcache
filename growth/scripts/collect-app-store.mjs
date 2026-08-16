import { createPrivateKey, sign } from "node:crypto"
import { gunzipSync } from "node:zlib"
import { daysAgo, isoNow, updateManifest, writeJson } from "./lib/common.mjs"

const sourceId = "app-store-connect"
const issuerId = process.env.APP_STORE_CONNECT_ISSUER_ID
const keyId = process.env.APP_STORE_CONNECT_KEY_ID
const vendorNumber = process.env.APP_STORE_CONNECT_VENDOR_NUMBER
const appleId = process.env.APP_STORE_APP_ID || "6758403056"
const encodedPrivateKey = process.env.APP_STORE_CONNECT_PRIVATE_KEY_BASE64
const plainPrivateKey = process.env.APP_STORE_CONNECT_PRIVATE_KEY

if (!issuerId || !keyId || !vendorNumber || (!encodedPrivateKey && !plainPrivateKey)) {
  await updateManifest(sourceId, {
    status: "WAITING_FOR_CONFIGURATION",
    freshness: "stale",
    note: "App Store Connect Sales and Reports credentials are not fully configured.",
  })
  console.log("App Store Connect skipped: reporting credentials are not fully configured")
  process.exit(process.argv.includes("--strict") ? 1 : 0)
}

function base64url(value) {
  return Buffer.from(value).toString("base64url")
}

function jwt() {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "ES256", kid: keyId, typ: "JWT" }))
  const payload = base64url(JSON.stringify({ iss: issuerId, iat: now, exp: now + 15 * 60, aud: "appstoreconnect-v1" }))
  const privateKey = encodedPrivateKey
    ? Buffer.from(encodedPrivateKey, "base64").toString("utf8")
    : plainPrivateKey.replaceAll("\\n", "\n")
  const signature = sign("sha256", Buffer.from(`${header}.${payload}`), {
    key: createPrivateKey(privateKey),
    dsaEncoding: "ieee-p1363",
  }).toString("base64url")
  return `${header}.${payload}.${signature}`
}

function parseTsv(text) {
  const rows = text.trim().split(/\r?\n/)
  const headers = rows.shift()?.split("\t") || []
  return rows.map((line) => Object.fromEntries(headers.map((header, index) => [header, line.split("\t")[index] || ""])))
}

async function dailyReport(date) {
  const params = new URLSearchParams({
    "filter[frequency]": "DAILY",
    "filter[reportDate]": date,
    "filter[reportSubType]": "SUMMARY",
    "filter[reportType]": "SALES",
    "filter[vendorNumber]": vendorNumber,
    "filter[version]": "1_0",
  })
  const response = await fetch(`https://api.appstoreconnect.apple.com/v1/salesReports?${params}`, {
    headers: { Authorization: `Bearer ${jwt()}`, Accept: "application/a-gzip" },
  })
  if (response.status === 404) return []
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500)
    throw Object.assign(new Error(`HTTP ${response.status} fetching App Store report for ${date}: ${detail}`), { status: response.status })
  }
  const bytes = Buffer.from(await response.arrayBuffer())
  const text = bytes[0] === 0x1f && bytes[1] === 0x8b ? gunzipSync(bytes).toString("utf8") : bytes.toString("utf8")
  return parseTsv(text)
}

try {
  const daily = []
  for (let offset = 35; offset >= 1; offset -= 1) {
    const date = daysAgo(offset)
    const rows = await dailyReport(date)
    const appRows = rows.filter((row) => row["Apple Identifier"] === appleId)
    const initialTypes = new Set(["1", "1F", "1T"])
    const redownloadTypes = new Set(["3", "3F"])
    const updateTypes = new Set(["7", "7F", "7T"])
    const total = (types) => appRows
      .filter((row) => types.has(row["Product Type Identifier"]))
      .reduce((sum, row) => sum + Number(row.Units || 0), 0)
    if (appRows.length) {
      daily.push({
        date,
        firstTimeDownloads: total(initialTypes),
        redownloads: total(redownloadTypes),
        updates: total(updateTypes),
      })
    }
  }

  const generatedAt = isoNow()
  const last28 = daily.slice(-28)
  const totals28Days = last28.reduce((totals, row) => ({
    firstTimeDownloads: totals.firstTimeDownloads + row.firstTimeDownloads,
    redownloads: totals.redownloads + row.redownloads,
    updates: totals.updates + row.updates,
  }), { firstTimeDownloads: 0, redownloads: 0, updates: 0 })
  await writeJson("data/store/app-store.json", {
    source: "App Store Connect Sales and Trends Summary Sales Report",
    generatedAt,
    appleId,
    timezone: "America/Los_Angeles",
    reportingLagDays: 1,
    totals28Days,
    daily,
    definition: "firstTimeDownloads counts product types 1, 1F, and 1T; redownloads and updates are reported separately.",
  })
  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: "fresh",
    latestSyncTime: generatedAt,
    generatedLocalSnapshot: "growth/data/store/app-store.json",
    note: `${totals28Days.firstTimeDownloads} official App Store first-time downloads in the latest 28 reported days.`,
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
