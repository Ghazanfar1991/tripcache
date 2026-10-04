import { spawn } from "node:child_process"
import { setTimeout as delay } from "node:timers/promises"
import { isoNow, readJson, toPath, updateManifest, writeJson } from "./lib/common.mjs"

// Crawls the sitemap of a running site (production, or a local `next start` in CI)
// and enforces the technical rules in seo/RULES.md. Exit code 1 on any failure.
const baseArg = process.argv.indexOf("--base-url")
const baseUrl = (baseArg >= 0 ? process.argv[baseArg + 1] : process.env.SITE_URL) || "https://trip-cache.com"
const noWrite = process.argv.includes("--no-write")
const local = /^https?:\/\/(127\.0\.0\.1|localhost)/.test(baseUrl)
const yearInSlug = /(^|[-/])(19|20)\d{2}($|[-/])/
let server

async function fetchText(url, redirect = "follow") {
  const response = await fetch(url, { redirect, signal: AbortSignal.timeout(15000) })
  return { status: response.status, ok: response.ok, text: redirect === "follow" ? await response.text() : "", finalUrl: response.url, location: response.headers.get("location") }
}

async function waitForSite() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(2000) })
      if (response.ok) return
    } catch {}
    await delay(1000)
  }
  throw new Error(`Local site did not become healthy at ${baseUrl}`)
}

function match(html, expression) {
  return html.match(expression)?.[1]?.trim() || null
}

function matchMeta(html, attribute, value) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return match(html, new RegExp(`<meta[^>]+${attribute}=["']${escapedValue}["'][^>]+content=["']([^"']*)["']`, "i"))
    || match(html, new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${escapedValue}["']`, "i"))
}

function matchCanonical(html) {
  return match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
    || match(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i)
}

function inspectJsonLd(html) {
  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  const errors = []
  for (const [index, block] of blocks.entries()) {
    try {
      JSON.parse(block[1])
    } catch (error) {
      errors.push(`block ${index + 1}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  return { count: blocks.length, errors }
}

function internalLinks(html) {
  const paths = new Set()
  for (const [, href] of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    try {
      const url = new URL(href, baseUrl)
      if (url.origin === new URL(baseUrl).origin || url.hostname === "trip-cache.com") paths.add(toPath(url.href))
    } catch {}
  }
  return paths
}

function absolute(value) {
  if (!value) return null
  try { return new URL(value, baseUrl).href } catch { return null }
}

function comparableUrl(value) {
  try {
    const url = new URL(value)
    url.hash = ""
    return url.href.replace(/\/$/, "")
  } catch {
    return value
  }
}

function samePage(left, right, comparePathOnly = false) {
  try {
    const leftUrl = new URL(left)
    const rightUrl = new URL(right)
    if (comparePathOnly) {
      return `${leftUrl.pathname.replace(/\/$/, "")}${leftUrl.search}` === `${rightUrl.pathname.replace(/\/$/, "")}${rightUrl.search}`
    }
    return comparableUrl(leftUrl.href) === comparableUrl(rightUrl.href)
  } catch {
    return false
  }
}

function duplicateGroups(pages, field) {
  const values = new Map()
  for (const page of pages) {
    const rawValue = page[field]
    if (!rawValue) continue
    const normalized = rawValue.replace(/\s+/g, " ").trim().toLowerCase()
    const urls = values.get(normalized) || []
    urls.push(page.url)
    values.set(normalized, urls)
  }
  return [...values.values()].filter((urls) => urls.length > 1)
}

try {
  if (local && process.env.START_LOCAL_SITE === "1") {
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", new URL(baseUrl).port || "3000"], {
      stdio: ["ignore", "inherit", "inherit"],
      env: process.env,
    })
    await waitForSite()
  }

  const registry = await readJson("url-registry.json")
  const [home, robots, sitemap, llms, llmsFull] = await Promise.all([
    fetchText(baseUrl),
    fetchText(new URL("/robots.txt", baseUrl)),
    fetchText(new URL("/sitemap.xml", baseUrl)),
    fetchText(new URL("/llms.txt", baseUrl)),
    fetchText(new URL("/llms-full.txt", baseUrl)),
  ])
  const locations = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((entry) => entry[1])
    .filter((location) => !/\.(png|jpe?g|webp|gif|svg)$/i.test(location))
  const healthUrls = local
    ? locations.map((location) => {
        const listed = new URL(location)
        return new URL(`${listed.pathname}${listed.search}`, baseUrl).href
      })
    : locations
  const uniqueUrls = [...new Map([baseUrl, ...healthUrls].map((url) => [comparableUrl(url), url])).values()].slice(0, 200)
  const pages = []
  const linksByPage = new Map()
  for (const url of uniqueUrls) {
    const result = await fetchText(url)
    const jsonLd = inspectJsonLd(result.text)
    linksByPage.set(toPath(url), internalLinks(result.text))
    pages.push({
      url,
      path: toPath(url),
      status: result.status,
      finalUrl: result.finalUrl,
      title: match(result.text, /<title[^>]*>([^<]*)<\/title>/i),
      description: matchMeta(result.text, "name", "description"),
      canonical: absolute(matchCanonical(result.text)),
      robots: matchMeta(result.text, "name", "robots"),
      openGraphUrl: absolute(matchMeta(result.text, "property", "og:url")),
      h1Count: (result.text.match(/<h1\b/gi) || []).length,
      jsonLdCount: jsonLd.count,
      jsonLdErrors: jsonLd.errors,
      words: result.text.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
    })
  }
  for (const page of pages) {
    page.inboundLinks = [...linksByPage.entries()].filter(([from, links]) => from !== page.path && links.has(page.path)).length
  }

  const failures = []
  const warnings = []
  if (!home.ok) failures.push(`homepage returned ${home.status}`)
  if (!robots.ok || !/sitemap/i.test(robots.text)) failures.push("robots.txt is missing or does not advertise a sitemap")
  if (!/OAI-SearchBot/i.test(robots.text)) failures.push("robots.txt does not explicitly allow OpenAI search discovery")
  if (!sitemap.ok || locations.length === 0) failures.push("sitemap.xml is missing or empty")
  if (new Set(locations.map(comparableUrl)).size !== locations.length) failures.push("sitemap.xml contains duplicate URLs")
  if (!llms.ok || !/TripCache/i.test(llms.text)) failures.push("llms.txt is missing or invalid")
  if (!llmsFull.ok || !/TripCache Full AI Reference/i.test(llmsFull.text)) failures.push("llms-full.txt is missing or invalid")
  for (const page of pages) {
    if (page.status >= 400) failures.push(`${page.url} returned ${page.status}`)
    if (comparableUrl(page.url) !== comparableUrl(page.finalUrl)) failures.push(`${page.url} redirects to ${page.finalUrl} but is listed in the sitemap`)
    if (!page.title) failures.push(`${page.url} has no title`)
    if (!page.description) failures.push(`${page.url} has no meta description`)
    if (!page.canonical) failures.push(`${page.url} has no canonical URL`)
    else if (!samePage(page.url, page.canonical, local)) failures.push(`${page.url} has a non-self canonical ${page.canonical}`)
    const listedLocation = locations.find((location) => samePage(page.url, location, local))
    if (!listedLocation) failures.push(`${page.url} is missing from the sitemap inventory`)
    else if (page.canonical && comparableUrl(page.canonical) !== comparableUrl(listedLocation)) {
      failures.push(`${page.url} canonical ${page.canonical} does not match sitemap URL ${listedLocation}`)
    }
    if (!page.openGraphUrl) failures.push(`${page.url} has no Open Graph URL`)
    else if (!samePage(page.url, page.openGraphUrl, local)) failures.push(`${page.url} has a non-self Open Graph URL ${page.openGraphUrl}`)
    if (page.h1Count !== 1) failures.push(`${page.url} has ${page.h1Count} H1 elements; expected exactly 1`)
    if (page.jsonLdCount === 0) failures.push(`${page.url} has no JSON-LD`)
    for (const error of page.jsonLdErrors) failures.push(`${page.url} has invalid JSON-LD (${error})`)
    if (/\bnoindex\b/i.test(page.robots || "")) failures.push(`${page.url} has a noindex robots directive`)
    if (page.title && page.title.length > 65) warnings.push(`${page.path} title is ${page.title.length} characters; Google usually truncates past ~60`)
    if (page.description && page.description.length > 165) warnings.push(`${page.path} meta description is ${page.description.length} characters; aim for ≤160`)
    if (page.path !== "/" && page.inboundLinks === 0) warnings.push(`${page.path} has no internal links from other sitemap pages (orphan)`)
  }
  for (const urls of duplicateGroups(pages, "title")) failures.push(`duplicate title across ${urls.join(", ")}`)
  for (const urls of duplicateGroups(pages, "description")) failures.push(`duplicate meta description across ${urls.join(", ")}`)

  // URL registry: every URL ever published stays accounted for (RULES.md R3, R4).
  const registryByPath = new Map(registry.urls.map((entry) => [entry.path, entry]))
  const sitemapPaths = new Set(locations.map(toPath))
  for (const path of sitemapPaths) {
    const entry = registryByPath.get(path)
    if (!entry) failures.push(`${path} is in the sitemap but not in seo/url-registry.json — register new pages (and log them in seo/changelog.jsonl)`)
    else if (entry.status !== "live") failures.push(`${path} is in the sitemap but registered as "${entry.status}"`)
    if (yearInSlug.test(path) && !entry?.legacyYearSlug) failures.push(`${path} has a year in its URL — new URLs must be evergreen (put the year in the title instead)`)
  }
  for (const entry of registry.urls) {
    if (entry.status === "live" && !sitemapPaths.has(entry.path)) {
      failures.push(`${entry.path} was live but is no longer in the sitemap — mark it "redirected" with a target in seo/url-registry.json and add a permanent redirect, or restore it`)
    }
    if (entry.status === "redirected") {
      const result = await fetchText(new URL(entry.path, baseUrl), "manual")
      const location = result.location ? toPath(new URL(result.location, baseUrl).href) : null
      if (![301, 308].includes(result.status)) failures.push(`${entry.path} should permanently redirect to ${entry.redirectTo} but returned ${result.status}`)
      else if (location !== entry.redirectTo) failures.push(`${entry.path} redirects to ${location}, registry says ${entry.redirectTo}`)
    }
  }

  const generatedAt = isoNow()
  const health = {
    generatedAt,
    baseUrl,
    status: failures.length ? "FAIL" : "PASS",
    checks: {
      homepageStatus: home.status,
      robotsStatus: robots.status,
      sitemapStatus: sitemap.status,
      sitemapUrls: locations.length,
      registeredUrls: registry.urls.length,
      redirectsVerified: registry.urls.filter((entry) => entry.status === "redirected").length,
      pagesWithOneH1: pages.filter((page) => page.h1Count === 1).length,
      parseableJsonLdBlocks: pages.reduce((total, page) => total + page.jsonLdCount - page.jsonLdErrors.length, 0),
      duplicateTitleGroups: duplicateGroups(pages, "title").length,
      duplicateDescriptionGroups: duplicateGroups(pages, "description").length,
    },
    failures,
    warnings,
  }
  if (!noWrite) {
    await writeJson("data/site/technical-health.json", health)
    await writeJson("data/site/page-inventory.json", { generatedAt, baseUrl, pages })
    if (!local) {
      await updateManifest("site-health", {
        status: failures.length ? "HEALTH_CHECK_FAILURE" : "SUCCESS",
        freshness: "fresh",
        latestSyncTime: generatedAt,
        note: failures.length ? failures.join("; ").slice(0, 800) : `${locations.length} sitemap URLs verified; ${warnings.length} warnings.`,
      })
    }
  }
  console.log(JSON.stringify({ ...health, warnings: warnings.length ? warnings : undefined }, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  if (server) server.kill("SIGTERM")
}
