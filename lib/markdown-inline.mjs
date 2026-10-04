// Inline Markdown formatting for blog posts (bold, italics, code, links, TripCache addresses).
// Plain ESM so node --test can import it directly (seo/tests/markdown-inline.test.mjs).

export const APP_DOWNLOAD_PATH = "/download"

export const LINK_CLASS =
  "break-words font-medium text-tc-violet underline decoration-tc-violet/35 decoration-[1.5px] underline-offset-[3px] [overflow-wrap:anywhere] transition-[text-decoration-color] duration-200 hover:decoration-tc-violet"
const CODE_CLASS =
  "break-words rounded-[6px] bg-tc-violet-soft px-1.5 py-0.5 font-mono text-[0.86em] text-[#4a1eac] [overflow-wrap:anywhere]"
const TRIPCACHE_HOST = /^(www\.)?trip-cache\.com$/i
// support@trip-cache.com, privacy@trip-cache.com, name@in.trip-cache.com, ...
const TRIPCACHE_EMAIL = /^[\w.+-]+@(?:[\w-]+\.)*trip-cache\.com(?![\w-])/i
const BARE_TRIPCACHE_URL = /^(https?:\/\/)?(www\.)?trip-cache\.com(?![\w-])(\/[^\s)<>"]*)?/i
// Characters that, right before "trip-cache.com", mean it is part of a larger token
// (an email address, a subdomain such as in.trip-cache.com, or another URL's path).
const TOKEN_CHAR = /[\w.@/+-]/

/** @param {string} segment */
export function escapeHtmlSegment(segment) {
  return segment.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

/**
 * Returns the site-relative path for an absolute trip-cache.com URL, or null for any other URL.
 * @param {string} url
 */
function tripCachePath(url) {
  if (!/^https?:\/\//i.test(url)) return null
  try {
    const parsed = new URL(url)
    if (!TRIPCACHE_HOST.test(parsed.hostname)) return null
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/"
  } catch {
    return null
  }
}

/** Only the homepage and /download are app-download calls to action. @param {string} path */
function isDownloadPath(path) {
  const pathname = path.replace(/[?#].*$/, "").replace(/\/+$/, "")
  return pathname === "" || pathname === APP_DOWNLOAD_PATH
}

/**
 * Absolute links to the homepage or /download become the tracked "Download the app" CTA.
 * Absolute links to any other trip-cache.com page stay normal internal links with their own text.
 * @param {string} rawLabel
 * @param {string} rawUrl
 * @returns {{ label: string, url: string }}
 */
export function normalizeBlogCtaLink(rawLabel, rawUrl) {
  const path = tripCachePath(rawUrl)
  if (path === null) return { label: rawLabel, url: rawUrl }
  if (isDownloadPath(path)) return { label: "Download the app", url: APP_DOWNLOAD_PATH }
  return { label: rawLabel, url: path }
}

/**
 * @param {string} href
 * @param {string} labelHtml already-escaped HTML
 */
function anchor(href, labelHtml) {
  const external = !href.startsWith("/") && !href.startsWith("mailto:")
  const targetAttrs = external ? ` target="_blank" rel="noopener noreferrer"` : ""
  return `<a href="${escapeHtmlSegment(href)}"${targetAttrs} class="${LINK_CLASS}">${labelHtml}</a>`
}

/**
 * Formats one line of inline Markdown as HTML.
 * @param {string} text
 * @param {{ autolink?: boolean }} [options] autolink is turned off inside link labels so anchors never nest.
 * @returns {string}
 */
export function formatInline(text, options = {}) {
  const { autolink = true } = options
  const inner = (/** @type {string} */ value) => formatInline(value, options)
  let result = ""
  let i = 0

  while (i < text.length) {
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2)
      if (end !== -1) {
        result += `<strong>${inner(text.slice(i + 2, end))}</strong>`
        i = end + 2
        continue
      }
    }

    if (text.startsWith("__", i)) {
      const end = text.indexOf("__", i + 2)
      if (end !== -1) {
        result += `<strong>${inner(text.slice(i + 2, end))}</strong>`
        i = end + 2
        continue
      }
    }

    if (text[i] === "*" && text[i + 1] !== "*") {
      const end = text.indexOf("*", i + 1)
      if (end !== -1) {
        result += `<em>${inner(text.slice(i + 1, end))}</em>`
        i = end + 1
        continue
      }
    }

    if (text[i] === "_" && text[i + 1] !== "_") {
      const end = text.indexOf("_", i + 1)
      if (end !== -1) {
        result += `<em>${inner(text.slice(i + 1, end))}</em>`
        i = end + 1
        continue
      }
    }

    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1)
      if (end !== -1) {
        result += `<code class="${CODE_CLASS}">${escapeHtmlSegment(text.slice(i + 1, end))}</code>`
        i = end + 1
        continue
      }
    }

    if (text[i] === "[" && text.includes("]", i)) {
      const closeBracket = text.indexOf("]", i)
      const openParen = text.indexOf("(", closeBracket)
      const closeParen = text.indexOf(")", openParen)

      if (closeBracket !== -1 && openParen === closeBracket + 1 && closeParen !== -1) {
        const rawLabel = text.slice(i + 1, closeBracket).trim()
        const rawUrl = text.slice(openParen + 1, closeParen).trim()
        const normalized = normalizeBlogCtaLink(rawLabel, rawUrl)
        result += anchor(normalized.url, formatInline(normalized.label, { autolink: false }))
        i = closeParen + 1
        continue
      }
    }

    if (autolink && (i === 0 || !TOKEN_CHAR.test(text[i - 1]))) {
      const emailMatch = text.slice(i).match(TRIPCACHE_EMAIL)
      if (emailMatch) {
        const address = emailMatch[0]
        result += anchor(`mailto:${address}`, escapeHtmlSegment(address))
        i += address.length
        continue
      }

      const urlMatch = text.slice(i).match(BARE_TRIPCACHE_URL)
      if (urlMatch) {
        // Leave sentence punctuation after a bare URL outside the link.
        const written = urlMatch[0].replace(/[.,;:!?]+$/, "")
        const path = urlMatch[3] ? written.replace(/^(https?:\/\/)?(www\.)?trip-cache\.com/i, "") || "/" : "/"
        result += isDownloadPath(path)
          ? anchor(APP_DOWNLOAD_PATH, "Download the app")
          : anchor(path, escapeHtmlSegment(written))
        i += written.length
        continue
      }
    }

    result += escapeHtmlSegment(text[i])
    i++
  }

  return result
}
