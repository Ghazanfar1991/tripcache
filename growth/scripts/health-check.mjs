import { spawn } from "node:child_process"
import { setTimeout as delay } from "node:timers/promises"
import { isoNow, readJson, updateManifest, writeJson } from "./lib/common.mjs"

const baseArg = process.argv.indexOf("--base-url")
const baseUrl = (baseArg >= 0 ? process.argv[baseArg + 1] : process.env.SITE_URL) || "https://trip-cache.com"
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

function absolute(value) {
  try { return new URL(value, baseUrl).href } catch { return null }
}

try {
  if (local && process.env.START_LOCAL_SITE === "1") {
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", new URL(baseUrl).port || "3000"], {
      stdio: ["ignore", "inherit", "inherit"],
      env: process.env,
    })
    await waitForSite()
  }

  const [home, robots, sitemap] = await Promise.all([
    fetchText(baseUrl),
    fetchText(new URL("/robots.txt", baseUrl)),
    fetchText(new URL("/sitemap.xml", baseUrl)),
  ])
  const locations = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((entry) => entry[1])
  const uniqueUrls = [...new Set([baseUrl, ...locations])].slice(0, 100)
  const pages = []
  for (const url of uniqueUrls) {
    const result = await fetchText(url)
    pages.push({
      url,
      status: result.status,
      finalUrl: result.finalUrl,
      title: match(result.text, /<title[^>]*>([^<]*)<\/title>/i),
      description: match(result.text, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
        || match(result.text, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i),
      canonical: absolute(match(result.text, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)),
    })
  }

  const failures = []
  if (!home.ok) failures.push(`homepage returned ${home.status}`)
  if (!robots.ok || !/sitemap/i.test(robots.text)) failures.push("robots.txt is missing or does not advertise a sitemap")
  if (!sitemap.ok || locations.length === 0) failures.push("sitemap.xml is missing or empty")
  for (const page of pages) {
    if (page.status >= 400) failures.push(`${page.url} returned ${page.status}`)
    if (!page.title) failures.push(`${page.url} has no title`)
    if (!page.description) failures.push(`${page.url} has no meta description`)
  }

  const generatedAt = isoNow()
  const health = {
    generatedAt,
    baseUrl,
    status: failures.length ? "FAIL" : "PASS",
    checks: { homepageStatus: home.status, robotsStatus: robots.status, sitemapStatus: sitemap.status, sitemapUrls: locations.length },
    failures,
  }
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
  console.log(JSON.stringify(health, null, 2))
  if (failures.length) process.exitCode = 1
} finally {
  if (server) server.kill("SIGTERM")
}
