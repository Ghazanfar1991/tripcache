import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tripcache.app"

  // Blog posts
  const blogPosts = [
    "tripcase-alternative-2025",
    "getting-started-with-tripcache",
    "email-to-trip-automation",
    "travel-expense-tracking",
    "digital-nomad-organization",
    "privacy-and-security",
    "frequent-flyer-tips",
    "tripcase-shutdown-what-now",
    "best-travel-apps-2025",
  ]

  const blogUrls = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogUrls,
  ]
}
