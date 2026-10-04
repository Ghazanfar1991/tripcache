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
