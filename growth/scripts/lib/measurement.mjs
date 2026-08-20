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
  const measurable = funnel?.measurable === true
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
