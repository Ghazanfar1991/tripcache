import type { BlogPost, BlogSummary } from "@/types/blog"
import { renderMarkdown } from "@/lib/markdown"

import * as BestTravelApps from "@/content/blog/best-travel-apps-2025"
import * as DigitalNomadOrganization from "@/content/blog/digital-nomad-organization"
import * as EmailToTripAutomation from "@/content/blog/email-to-trip-automation"
import * as FrequentFlyerTips from "@/content/blog/frequent-flyer-tips"
import * as GettingStartedWithTripcache from "@/content/blog/getting-started-with-tripcache"
import * as PrivacyAndSecurity from "@/content/blog/privacy-and-security"
import * as TravelExpenseTracking from "@/content/blog/travel-expense-tracking"
import * as TripcaseAlternative from "@/content/blog/tripcase-alternative-2025"
import * as TripcaseShutdown from "@/content/blog/tripcase-shutdown-what-now"

const rawPosts = [
  TripcaseAlternative,
  TripcaseShutdown,
  BestTravelApps,
  GettingStartedWithTripcache,
  EmailToTripAutomation,
  TravelExpenseTracking,
  DigitalNomadOrganization,
  PrivacyAndSecurity,
  FrequentFlyerTips,
]

const posts: BlogPost[] = rawPosts.map((source) => {
  const slug = source.metadata.slug
  const contentNodes = renderMarkdown(source.body)

  return {
    slug,
    metadata: source.metadata,
    Content: () => <>{contentNodes}</>,
  }
})

const sortedPosts = [...posts].sort((a, b) => {
  return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
})

export function getAllBlogPosts(): BlogPost[] {
  return [...sortedPosts]
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getBlogSlugs(): string[] {
  return posts.map((post) => post.slug)
}

export function getBlogSummaries(): BlogSummary[] {
  return getAllBlogPosts().map((post) => post.metadata)
}
