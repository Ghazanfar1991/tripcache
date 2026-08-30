import type { MetadataRoute } from "next"
import { getBlogSummaries } from "@/lib/blog"
import { seoLandingPages } from "@/lib/seo-page-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://trip-cache.com"
  const changed = (date: string) => new Date(`${date}T00:00:00Z`)
  const latestBlogUpdate = getBlogSummaries().reduce((latest, post) => {
    const candidate = new Date(post.updatedAt ?? post.date)
    return candidate > latest ? candidate : latest
  }, changed("2026-08-29"))

  const blogUrls = getBlogSummaries().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
  }))

  const seoUrls = seoLandingPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: changed("2026-08-29"),
  }))

  return [
    {
      url: baseUrl,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/features`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/tools/hotel-cancellation-deadline-calculator`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/account-delete`,
      lastModified: changed("2026-08-29"),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogUpdate,
    },
    ...seoUrls,
    ...blogUrls,
  ]
}
