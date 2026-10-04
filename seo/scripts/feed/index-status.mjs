import { fetchJson, getGoogleAccessToken, isoNow, readJson, siteOrigin, toPath, updateManifest, writeJson } from "../lib/common.mjs"

const sourceId = "index-status"
const siteUrl = process.env.GSC_SITE_URL || "sc-domain:trip-cache.com"
const token = getGoogleAccessToken()

if (!token) {
  await updateManifest(sourceId, { status: "WAITING_FOR_HUMAN_AUTH", freshness: "stale", note: "No short-lived Google access token." })
  console.log("Index status skipped: no short-lived Google access token")
  process.exit(0)
}

try {
  const sitemap = await (await fetch(`${siteOrigin}/sitemap.xml`, { signal: AbortSignal.timeout(15000) })).text()
  const urls = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).filter((loc) => !/\.(png|jpe?g|webp|gif|svg)$/i.test(loc)))]
  const previous = await readJson("data/search-console/index-status.json", { pages: [] })
  const previousByPath = new Map(previous.pages.map((page) => [page.path, page]))
  const pages = []

  // URL Inspection quota is 2,000/day and 600/minute per property; a few dozen URLs sequentially is well inside it.
  for (const url of urls) {
    const path = toPath(url)
    try {
      const data = await fetchJson("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inspectionUrl: url, siteUrl }),
      })
      const result = data.inspectionResult?.indexStatusResult || {}
      const indexed = result.verdict === "PASS"
      const before = previousByPath.get(path)
      pages.push({
        path,
        verdict: result.verdict || null,
        coverageState: result.coverageState || null,
        indexed,
        lastCrawlTime: result.lastCrawlTime || null,
        googleCanonical: result.googleCanonical || null,
        userCanonical: result.userCanonical || null,
        robotsTxtState: result.robotsTxtState || null,
        pageFetchState: result.pageFetchState || null,
        firstSeenAt: before?.firstSeenAt || isoNow(),
        indexedSince: indexed ? before?.indexedSince || isoNow() : null,
      })
    } catch (error) {
      pages.push({ path, verdict: null, coverageState: `INSPECTION_ERROR: ${error.status || error.message}`, indexed: null })
    }
  }

  const byState = pages.reduce((counts, page) => {
    counts[page.coverageState || "unknown"] = (counts[page.coverageState || "unknown"] || 0) + 1
    return counts
  }, {})
  const generatedAt = isoNow()
  await writeJson("data/search-console/index-status.json", {
    source: "Search Console URL Inspection API",
    generatedAt,
    sitemapUrls: urls.length,
    indexed: pages.filter((page) => page.indexed === true).length,
    notIndexed: pages.filter((page) => page.indexed === false).length,
    byCoverageState: byState,
    pages: pages.sort((a, b) => Number(a.indexed) - Number(b.indexed) || a.path.localeCompare(b.path)),
  })
  const failed = pages.filter((page) => page.indexed === null).length
  await updateManifest(sourceId, {
    status: failed === pages.length ? "CONNECTOR_FAILURE" : "SUCCESS",
    freshness: "fresh",
    latestSyncTime: generatedAt,
    note: `${pages.filter((page) => page.indexed).length}/${urls.length} sitemap URLs indexed${failed ? `; ${failed} inspections failed` : ""}.`,
  })
  console.log(`Index status: ${pages.filter((page) => page.indexed).length}/${urls.length} indexed`)
} catch (error) {
  await updateManifest(sourceId, { status: "CONNECTOR_FAILURE", freshness: "stale", note: error.message })
  console.error(error.message)
}
