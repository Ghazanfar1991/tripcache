import { fetchJson, getGoogleAccessToken, isoNow, readJson, updateManifest, writeJson } from "./lib/common.mjs"

const sourceId = "firebase-crashlytics"
const projectId = process.env.GCP_PROJECT_ID || "trip-cache"
const datasetId = process.env.FIREBASE_CRASHLYTICS_DATASET || "firebase_crashlytics"
const token = getGoogleAccessToken()
const baseline = await readJson("data/app/quality.json", {})

function headers() {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
}

async function listTables() {
  const data = await fetchJson(
    `https://bigquery.googleapis.com/bigquery/v2/projects/${encodeURIComponent(projectId)}/datasets/${encodeURIComponent(datasetId)}/tables?maxResults=1000`,
    { headers: headers() },
  )
  return (data.tables || []).map((table) => table.tableReference?.tableId).filter(Boolean)
}

async function query(sql) {
  const data = await fetchJson(
    `https://bigquery.googleapis.com/bigquery/v2/projects/${encodeURIComponent(projectId)}/queries`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ query: sql, useLegacySql: false, location: process.env.BIGQUERY_LOCATION || "australia-southeast1" }),
    },
  )
  if (!data.jobComplete) throw new Error("Crashlytics BigQuery query did not complete synchronously")
  return (data.rows || []).map((row) => row.f.map((cell) => cell.v))
}

function safeTableName(value) {
  if (!/^[A-Za-z0-9_]+$/.test(value)) throw new Error(`Unsafe BigQuery table name: ${value}`)
  return value
}

if (!token) {
  await updateManifest(sourceId, {
    status: "MANUAL_BASELINE",
    freshness: baseline.officialDashboardBaseline ? "fresh" : "stale",
    note: "Official Crashlytics dashboard baseline preserved; automatic BigQuery collection is waiting for Google authentication.",
    generatedLocalSnapshot: "growth/data/app/quality.json",
  })
  console.log("Crashlytics: preserved dashboard baseline (no Google access token).")
  process.exit(0)
}

try {
  const availableTables = await listTables()
  const appTables = availableTables.filter((table) => /_(ANDROID|IOS)$/.test(table) && !table.endsWith("_REALTIME"))

  if (!appTables.length) {
    await updateManifest(sourceId, {
      status: "MANUAL_BASELINE",
      freshness: baseline.officialDashboardBaseline ? "fresh" : "stale",
      note: `Official Crashlytics dashboard baseline preserved; ${datasetId} export is not enabled yet.`,
      generatedLocalSnapshot: "growth/data/app/quality.json",
    })
    console.log(`Crashlytics: preserved dashboard baseline (${datasetId} export is not enabled).`)
    process.exit(0)
  }

  const generatedAt = isoNow()
  const automated30Days = []
  for (const rawTable of appTables) {
    const table = safeTableName(rawTable)
    const platform = table.endsWith("_ANDROID") ? "ANDROID" : "IOS"
    const rows = await query(`
      SELECT
        COUNTIF(error_type IN ('FATAL', 'ANR')) AS fatal_or_anr_events,
        COUNT(DISTINCT IF(error_type IN ('FATAL', 'ANR'), installation_uuid, NULL)) AS impacted_installations,
        COUNT(DISTINCT IF(error_type IN ('FATAL', 'ANR'), issue_id, NULL)) AS fatal_or_anr_issues
      FROM \`${projectId}.${datasetId}.${table}\`
      WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
    `)
    const topIssueRows = await query(`
      SELECT issue_id, ANY_VALUE(error_type) AS error_type,
        COUNT(*) AS events, COUNT(DISTINCT installation_uuid) AS impacted_installations
      FROM \`${projectId}.${datasetId}.${table}\`
      WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
        AND error_type IN ('FATAL', 'ANR')
      GROUP BY issue_id
      ORDER BY events DESC
      LIMIT 10
    `)
    automated30Days.push({
      platform,
      table,
      fatalOrAnrEvents: Number(rows[0]?.[0] || 0),
      impactedInstallations: Number(rows[0]?.[1] || 0),
      fatalOrAnrIssues: Number(rows[0]?.[2] || 0),
      topIssues: topIssueRows.map(([issueId, errorType, events, impactedInstallations]) => ({
        issueId,
        errorType,
        events: Number(events || 0),
        impactedInstallations: Number(impactedInstallations || 0),
      })),
    })
  }

  await writeJson("data/app/quality.json", {
    ...baseline,
    source: "Firebase Crashlytics dashboard and BigQuery export",
    generatedAt,
    automated30Days,
    automationNote: "Raw fatal/ANR events and impacted installations are refreshed daily. Crash-free percentages remain official dashboard metrics unless Firebase Sessions export supplies the denominator.",
  })
  await updateManifest(sourceId, {
    status: "SUCCESS",
    freshness: "fresh",
    latestSyncTime: generatedAt,
    note: "Automated raw fatal/ANR event collection from the Firebase Crashlytics BigQuery export; official dashboard baseline retained for crash-free percentages.",
    generatedLocalSnapshot: "growth/data/app/quality.json",
  })
  console.log(`Crashlytics collected from ${appTables.length} app table(s).`)
} catch (error) {
  if (error.status === 404) {
    await updateManifest(sourceId, {
      status: "MANUAL_BASELINE",
      freshness: baseline.officialDashboardBaseline ? "fresh" : "stale",
      note: `Official Crashlytics dashboard baseline preserved; ${datasetId} export is not enabled yet.`,
      generatedLocalSnapshot: "growth/data/app/quality.json",
    })
    console.log(`Crashlytics: preserved dashboard baseline (${datasetId} export is not enabled).`)
  } else {
    await updateManifest(sourceId, {
      status: "CONNECTOR_FAILURE",
      freshness: "stale",
      note: `${error.message}${error.body ? `: ${JSON.stringify(error.body).slice(0, 500)}` : ""}`,
      generatedLocalSnapshot: "growth/data/app/quality.json",
    })
    console.error(error.message)
    if (process.argv.includes("--strict")) process.exitCode = 1
  }
}
