import type { MetadataRoute } from "next"
import { getBlogSummaries } from "@/lib/blog"
import { seoLandingPages } from "@/lib/seo-page-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://trip-cache.com"
  const siteUpdatedAt = new Date("2026-07-16")

  const blogUrls = getBlogSummaries().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
  }))

  const seoUrls = seoLandingPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: siteUpdatedAt,
  }))

  return [
    {
      url: baseUrl,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/tools/hotel-cancellation-deadline-calculator`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/account-delete`,
      lastModified: siteUpdatedAt,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteUpdatedAt,
    },
    ...seoUrls,
    ...blogUrls,
  ]
}
