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
      const rich = data.inspectionResult?.richResultsResult
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
        indexingState: result.indexingState || null,
        crawledAs: result.crawledAs || null,
        referringUrls: (result.referringUrls || []).map(toPath).slice(0, 10),
        richResults: rich
          ? {
              verdict: rich.verdict || null,
              items: (rich.detectedItems || []).map((item) => ({
                type: item.richResultType,
                issues: (item.items || []).flatMap((detected) => (detected.issues || []).map((issue) => `${issue.severity}: ${issue.issueMessage}`)),
              })),
            }
          : null,
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
  // Sitemap status as Google sees it (errors, warnings, last download).
  let sitemaps = []
  try {
    const listed = await fetchJson(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    sitemaps = (listed.sitemap || []).map((entry) => ({
      path: entry.path,
      lastSubmitted: entry.lastSubmitted || null,
      lastDownloaded: entry.lastDownloaded || null,
      isPending: entry.isPending ?? null,
      errors: Number(entry.errors || 0),
      warnings: Number(entry.warnings || 0),
      contents: entry.contents || [],
    }))
  } catch (error) {
    sitemaps = [{ error: error.message }]
  }

  const issues = []
  for (const page of pages) {
    if (page.indexed === false) issues.push({ path: page.path, kind: "not-indexed", detail: page.coverageState })
    // UNSPECIFIED only means Google hasn't crawled the URL yet; that's covered by not-indexed.
    if (page.robotsTxtState === "DISALLOWED") issues.push({ path: page.path, kind: "robots", detail: page.robotsTxtState })
    if (page.pageFetchState && !["SUCCESSFUL", "PAGE_FETCH_STATE_UNSPECIFIED"].includes(page.pageFetchState)) issues.push({ path: page.path, kind: "fetch", detail: page.pageFetchState })
    if (page.googleCanonical && page.userCanonical && toPath(page.googleCanonical) !== toPath(page.userCanonical)) issues.push({ path: page.path, kind: "canonical-mismatch", detail: `Google chose ${page.googleCanonical}` })
    for (const item of page.richResults?.items || []) {
      for (const issue of item.issues) issues.push({ path: page.path, kind: `rich-result:${item.type}`, detail: issue })
    }
  }
  for (const entry of sitemaps) {
    if (entry.error || entry.errors || entry.warnings) issues.push({ path: entry.path || "sitemap", kind: "sitemap", detail: entry.error || `${entry.errors} errors, ${entry.warnings} warnings` })
  }

  const generatedAt = isoNow()
  await writeJson("data/search-console/index-status.json", {
    source: "Search Console URL Inspection API",
    generatedAt,
    sitemapUrls: urls.length,
    indexed: pages.filter((page) => page.indexed === true).length,
    notIndexed: pages.filter((page) => page.indexed === false).length,
    byCoverageState: byState,
    issues,
    sitemaps,
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
