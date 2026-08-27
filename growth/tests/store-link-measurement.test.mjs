import assert from "node:assert/strict"
import test from "node:test"

import {
  ANDROID_STORE_URL,
  IOS_STORE_URL,
  classifyStoreIntentLink,
  pickDownloadDestination,
} from "../../lib/store-link-measurement.mjs"

const pageUrl = "https://trip-cache.com/blog/example"

test("direct App Store links map to iOS store intent", () => {
  assert.deepEqual(classifyStoreIntentLink({ href: IOS_STORE_URL, pageUrl }), {
    name: "app_store_click",
    platform: "ios",
    linkUrl: IOS_STORE_URL,
  })
})

test("direct Google Play app links map to Android store intent", () => {
  assert.deepEqual(classifyStoreIntentLink({ href: ANDROID_STORE_URL, pageUrl }), {
    name: "play_store_click",
    platform: "android",
    linkUrl: ANDROID_STORE_URL,
  })
})

test("same-origin download links use the route's iOS decision", () => {
  const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X)"
  assert.equal(pickDownloadDestination(userAgent), IOS_STORE_URL)
  assert.deepEqual(classifyStoreIntentLink({ href: "/download", pageUrl, userAgent }), {
    name: "app_store_click",
    platform: "ios",
    linkUrl: "https://trip-cache.com/download",
  })
})

test("same-origin download links use the route's Android decision", () => {
  const userAgent = "Mozilla/5.0 (Linux; Android 16; Pixel 10 Pro)"
  assert.equal(pickDownloadDestination(userAgent), ANDROID_STORE_URL)
  assert.deepEqual(classifyStoreIntentLink({ href: "/download/", pageUrl, userAgent }), {
    name: "play_store_click",
    platform: "android",
    linkUrl: "https://trip-cache.com/download/",
  })
})

test("desktop download links remain measurable without becoming false store clicks", () => {
  assert.deepEqual(classifyStoreIntentLink({ href: "/download", pageUrl, userAgent: "Mozilla/5.0 (Macintosh)" }), {
    name: "download_cta_click",
    platform: "other",
    linkUrl: "https://trip-cache.com/download",
  })
})

test("handled anchors are excluded to prevent duplicate events", () => {
  assert.equal(classifyStoreIntentLink({ href: IOS_STORE_URL, pageUrl, alreadyHandled: true }), null)
})

test("lookalike external download URLs and non-app Play URLs are ignored", () => {
  assert.equal(classifyStoreIntentLink({ href: "https://example.com/download", pageUrl }), null)
  assert.equal(classifyStoreIntentLink({ href: "https://play.google.com/books", pageUrl }), null)
})
