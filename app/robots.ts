import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
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
        ],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    sitemap: "https://trip-cache.com/sitemap.xml",
  }
}
