import { spawn } from "node:child_process"
import { setTimeout as delay } from "node:timers/promises"
import { isoNow, readJson, updateManifest, writeJson } from "./lib/common.mjs"

const baseArg = process.argv.indexOf("--base-url")
const baseUrl = (baseArg >= 0 ? process.argv[baseArg + 1] : process.env.SITE_URL) || "https://trip-cache.com"
const noWrite = process.argv.includes("--no-write")
const local = /^https?:\/\/(127\.0\.0\.1|localhost)/.test(baseUrl)
let server

async function fetchText(url) {
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) })
  return { status: response.status, ok: response.ok, text: await response.text(), finalUrl: response.url }
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

  const [home, robots, sitemap, llms, llmsFull] = await Promise.all([
    fetchText(baseUrl),
    fetchText(new URL("/robots.txt", baseUrl)),
    fetchText(new URL("/sitemap.xml", baseUrl)),
    fetchText(new URL("/llms.txt", baseUrl)),
    fetchText(new URL("/llms-full.txt", baseUrl)),
  ])
  const locations = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((entry) => entry[1])
  const healthUrls = local
    ? locations.map((location) => {
        const listed = new URL(location)
        return new URL(`${listed.pathname}${listed.search}`, baseUrl).href
      })
    : locations
  const uniqueUrls = [...new Map([baseUrl, ...healthUrls].map((url) => [comparableUrl(url), url])).values()].slice(0, 100)
  const pages = []
  for (const url of uniqueUrls) {
    const result = await fetchText(url)
    const jsonLd = inspectJsonLd(result.text)
    pages.push({
      url,
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
    })
  }

  const failures = []
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
  }

  for (const urls of duplicateGroups(pages, "title")) failures.push(`duplicate title across ${urls.join(", ")}`)
  for (const urls of duplicateGroups(pages, "description")) failures.push(`duplicate meta description across ${urls.join(", ")}`)

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
      llmsStatus: llms.status,
      llmsFullStatus: llmsFull.status,
      pagesWithOneH1: pages.filter((page) => page.h1Count === 1).length,
      pagesWithSelfOpenGraphUrl: pages.filter((page) => page.openGraphUrl && samePage(page.url, page.openGraphUrl, local)).length,
      parseableJsonLdBlocks: pages.reduce((total, page) => total + page.jsonLdCount - page.jsonLdErrors.length, 0),
      duplicateTitleGroups: duplicateGroups(pages, "title").length,
      duplicateDescriptionGroups: duplicateGroups(pages, "description").length,
    },
    failures,
  }
  if (!noWrite) {
    await writeJson("data/seo/technical-health.json", health)
    await writeJson("data/seo/page-inventory.json", { generatedAt, baseUrl, pages })
    if (!local && failures.length === 0) {
      const knownGood = await readJson("state/known-good-production.json", {})
      await writeJson("state/known-good-production.json", { ...knownGood, lastVerifiedAt: generatedAt, baseUrl, homepageStatus: home.status, sitemapUrls: locations.length })
    }
    if (!local) {
      await updateManifest("production-health", {
        status: failures.length ? "HEALTH_CHECK_FAILURE" : "SUCCESS",
        freshness: "fresh",
        latestSyncTime: generatedAt,
        generatedLocalSnapshot: "growth/data/seo/technical-health.json",
        note: failures.length ? failures.join("; ") : `${locations.length} sitemap URLs verified.`,
      })
    }
  }
  console.log(JSON.stringify(health, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  if (server) server.kill("SIGTERM")
}
