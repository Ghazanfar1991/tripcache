import type { MetadataRoute } from "next"
import { getBlogSummaries } from "@/lib/blog"
import { seoLandingPages } from "@/lib/seo-page-data"
import { SITE_URL } from "@/lib/seo-metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const blogPosts = getBlogSummaries()
  const changed = (date: string) => new Date(`${date}T00:00:00Z`)
  const latestBlogUpdate = blogPosts.reduce((latest, post) => {
    const candidate = new Date(post.updatedAt ?? post.date)
    return candidate > latest ? candidate : latest
  }, changed("2026-09-11"))

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    images: [new URL(post.image, baseUrl).href],
  }))

  // 2026-10-05: the landing redesign rebuilt the home, pricing, features, about, alternatives and tools pages
  // (and the feature/alternative landing template); keep these dates in step with real changes only.
  const redesigned = changed("2026-10-05")

  const seoUrls = seoLandingPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: redesigned,
    images: [new URL(page.image, baseUrl).href],
  }))

  return [
    {
      url: baseUrl,
      lastModified: redesigned,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: redesigned,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: redesigned,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: redesigned,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: redesigned,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: redesigned,
    },
    {
      url: `${baseUrl}/tools/hotel-cancellation-deadline-calculator`,
      lastModified: redesigned,
    },
    ...[
      "/tools/flight-arrival-time-calculator",
      "/tools/jet-lag-calculator",
      "/tools/layover-calculator",
      "/tools/travel-checklist",
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: redesigned,
    })),
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
