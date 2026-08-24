const recognizedAiSources = ["chatgpt", "openai", "perplexity", "claude", "copilot", "gemini", "meta.ai"]

export function isWebPlatform(value) {
  return typeof value === "string" && value.trim().toLowerCase() === "web"
}

export function datedSourceFreshness({ latestReportedDate, generatedAt, maxLagDays }) {
  const latest = Date.parse(`${latestReportedDate}T00:00:00.000Z`)
  const generatedDate = typeof generatedAt === "string" ? generatedAt.slice(0, 10) : ""
  const generated = Date.parse(`${generatedDate}T00:00:00.000Z`)
  if (!Number.isFinite(latest) || !Number.isFinite(generated) || !Number.isFinite(maxLagDays)) {
    return { fresh: false, ageDays: null }
  }
  const ageDays = Math.max(0, Math.floor((generated - latest) / 86_400_000))
  return { fresh: ageDays <= maxLagDays, ageDays }
}

export function buildWebsiteStoreIntent({ trafficRows = [], storeIntentRows = [], byPage = [] }) {
  const webTrafficRows = trafficRows.filter((row) => isWebPlatform(row.dimensions?.platform))
  const webStoreIntentRows = storeIntentRows.filter((row) => isWebPlatform(row.dimensions?.platform))
  const landingUsers = webTrafficRows.reduce((sum, row) => sum + (row.metrics?.activeUsers || 0), 0)
  const landingSessions = webTrafficRows.reduce((sum, row) => sum + (row.metrics?.sessions || 0), 0)
  const storeIntentUsers = webStoreIntentRows.reduce((sum, row) => sum + (row.metrics?.activeUsers || 0), 0)
  const storeIntentEvents = webStoreIntentRows.reduce((sum, row) => sum + (row.metrics?.eventCount || 0), 0)
  const measurable = landingUsers > 0

  return {
    measurable,
    status: measurable ? "MEASURED" : "UNKNOWN_WEB_TRAFFIC",
    landingUsers: measurable ? landingUsers : null,
    landingSessions: measurable ? landingSessions : null,
    storeIntentUsers: measurable ? storeIntentUsers : null,
    storeIntentEvents: measurable ? storeIntentEvents : null,
    rate: measurable ? storeIntentUsers / landingUsers : null,
    eventNames: ["app_store_click", "play_store_click"],
    byPage: measurable ? byPage : null,
    note: measurable
      ? "Store-intent users and landing users come from dedicated GA4 WEB reports so per-page active users are not summed into the rate. Recent rows may be incomplete."
      : "No unique WEB landing-user denominator was returned; store intent remains unknown rather than zero.",
  }
}

export function buildAiAssistantReferrals({ measurable, rows }) {
  const note = "Directional GA4 referral measurement; unlinked or privacy-stripped AI discovery may appear as direct traffic."
  if (!measurable) {
    return {
      measurable: false,
      status: "UNKNOWN_WEB_STREAM",
      sessions: null,
      activeUsers: null,
      landingPages: null,
      recognizedSources: recognizedAiSources,
      note: `No WEB rows were returned for this reporting window. ${note}`,
    }
  }

  return {
    measurable: true,
    status: "MEASURED",
    sessions: rows.reduce((sum, row) => sum + row.metrics.sessions, 0),
    activeUsers: rows.reduce((sum, row) => sum + row.metrics.activeUsers, 0),
    landingPages: rows,
    recognizedSources: recognizedAiSources,
    note,
  }
}

export function aiAssistantReferralSummary(funnel) {
  const referrals = funnel?.aiAssistantReferrals || {}
  const trafficMeasurable = funnel?.trafficMeasurable === true
    || (funnel?.trafficMeasurable == null && funnel?.measurable === true)
  const measurable = trafficMeasurable
    && referrals.measurable !== false
    && Number.isFinite(referrals.sessions)
    && Number.isFinite(referrals.activeUsers)

  return measurable
    ? {
        measurable: true,
        text: `${referrals.sessions} sessions / ${referrals.activeUsers} active users from recognized AI sources`,
        landingPages: Array.isArray(referrals.landingPages) ? referrals.landingPages : [],
      }
    : {
        measurable: false,
        text: "unknown (GA4 returned no web rows for the reporting window)",
        landingPages: [],
      }
}
