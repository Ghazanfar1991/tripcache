import assert from "node:assert/strict"
import test from "node:test"

import { LINK_CLASS, formatInline, normalizeBlogCtaLink } from "../../lib/markdown-inline.mjs"

const hrefs = (html) => [...html.matchAll(/href="([^"]*)"/g)].map((match) => match[1])

test("TripCache email addresses render as mailto links, not the download CTA", () => {
  for (const address of ["support@trip-cache.com", "privacy@trip-cache.com"]) {
    const html = formatInline(`Questions? Email ${address}.`)
    assert.deepEqual(hrefs(html), [`mailto:${address}`])
    assert.match(html, new RegExp(`>${address}</a>\\.$`))
    assert.doesNotMatch(html, /Download the app/)
  }
})

test("email addresses inside bold text and forwarding subdomains stay intact", () => {
  assert.deepEqual(hrefs(formatInline("**support@trip-cache.com**")), ["mailto:support@trip-cache.com"])
  const forwarding = formatInline("Forward to you@in.trip-cache.com")
  assert.deepEqual(hrefs(forwarding), ["mailto:you@in.trip-cache.com"])
  assert.doesNotMatch(forwarding, /Download the app/)
})

test("bare homepage mentions still become the download CTA", () => {
  for (const text of ["Visit trip-cache.com", "Visit https://trip-cache.com/", "Visit www.trip-cache.com/download"]) {
    const html = formatInline(text)
    assert.deepEqual(hrefs(html), ["/download"], text)
    assert.match(html, />Download the app<\/a>$/, text)
  }
})

test("bare links to other TripCache pages keep their path and text", () => {
  const html = formatInline("See https://trip-cache.com/pricing.")
  assert.deepEqual(hrefs(html), ["/pricing"])
  assert.match(html, />https:\/\/trip-cache\.com\/pricing<\/a>\.$/)
})

test("markdown links to the homepage or /download become the CTA; other pages keep their label", () => {
  assert.deepEqual(normalizeBlogCtaLink("Get TripCache", "https://trip-cache.com"), { label: "Download the app", url: "/download" })
  assert.deepEqual(normalizeBlogCtaLink("Get TripCache", "https://www.trip-cache.com/download?ref=blog"), { label: "Download the app", url: "/download" })
  assert.deepEqual(normalizeBlogCtaLink("Compare plans", "https://trip-cache.com/pricing"), { label: "Compare plans", url: "/pricing" })
  assert.deepEqual(normalizeBlogCtaLink("Calculator", "https://trip-cache.com/tools/x#faq"), { label: "Calculator", url: "/tools/x#faq" })
  assert.deepEqual(normalizeBlogCtaLink("TripIt", "https://www.tripit.com/web/pro/pricing"), { label: "TripIt", url: "https://www.tripit.com/web/pro/pricing" })
  assert.deepEqual(normalizeBlogCtaLink("Lookalike", "https://trip-cache.com.example.org/"), { label: "Lookalike", url: "https://trip-cache.com.example.org/" })
})

test("internal links open in place, external links in a new tab, and link labels never nest anchors", () => {
  const internal = formatInline("[Basic and Pro](https://trip-cache.com/pricing)")
  assert.equal(internal, `<a href="/pricing" class="${LINK_CLASS}">Basic and Pro</a>`)
  const external = formatInline("[TripIt pricing](https://www.tripit.com/web/pro/pricing)")
  assert.match(external, /target="_blank" rel="noopener noreferrer"/)
  const mailto = formatInline("[support@trip-cache.com](mailto:support@trip-cache.com)")
  assert.equal((mailto.match(/<a /g) || []).length, 1)
  assert.doesNotMatch(mailto, /target=/)
})

test("text is HTML-escaped", () => {
  assert.equal(formatInline('5 < 6 & "quotes"'), "5 &lt; 6 &amp; &quot;quotes&quot;")
})
