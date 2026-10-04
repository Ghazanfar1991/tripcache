import type { MetadataRoute } from "next"

// /api/airports feeds the public flight-time, jet-lag and layover calculators,
// so crawlers that render those pages must be able to fetch it. The longer
// Allow wins over Disallow: /api/ (RFC 9309).
const allow = ["/", "/api/airports"]
const disallow = ["/api/", "/admin/"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow,
        disallow,
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot",
          "Applebot-Extended",
          "Amazonbot",
          "DuckAssistBot",
          "MistralAI-User",
        ],
        allow,
        disallow,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    sitemap: "https://trip-cache.com/sitemap.xml",
  }
}
