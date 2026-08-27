export const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
export const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"

export function storePlatformForUserAgent(userAgent = "") {
  const normalized = userAgent.toLowerCase()
  if (/(iphone|ipad|ipod)/.test(normalized)) return "ios"
  if (/android/.test(normalized)) return "android"
  return null
}

export function pickDownloadDestination(userAgent, fallbackUrl = "https://trip-cache.com") {
  const platform = storePlatformForUserAgent(userAgent)
  if (platform === "ios") return IOS_STORE_URL
  if (platform === "android") return ANDROID_STORE_URL
  return fallbackUrl
}

export function classifyStoreIntentLink({ href, pageUrl, userAgent = "", alreadyHandled = false }) {
  if (alreadyHandled) return null

  let url
  let page
  try {
    page = new URL(pageUrl)
    url = new URL(href, page)
  } catch {
    return null
  }

  if (url.hostname === "apps.apple.com") {
    return { name: "app_store_click", platform: "ios", linkUrl: url.toString() }
  }

  if (url.hostname === "play.google.com" && url.pathname.startsWith("/store/apps/")) {
    return { name: "play_store_click", platform: "android", linkUrl: url.toString() }
  }

  const pathname = url.pathname.replace(/\/+$/, "") || "/"
  if (url.origin !== page.origin || pathname !== "/download") return null

  const platform = storePlatformForUserAgent(userAgent)
  if (platform === "ios") {
    return { name: "app_store_click", platform, linkUrl: url.toString() }
  }
  if (platform === "android") {
    return { name: "play_store_click", platform, linkUrl: url.toString() }
  }

  return { name: "download_cta_click", platform: "other", linkUrl: url.toString() }
}
