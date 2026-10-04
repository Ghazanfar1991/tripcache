import type { BlogFaq, BlogFrontmatter, BlogPost, BlogSummary } from "@/types/blog"
import { renderMarkdown } from "@/lib/markdown"

import * as BestTravelApps from "@/content/blog/best-travel-apps-2025"
import * as EmailToTripAutomation from "@/content/blog/email-to-trip-automation"
import * as PrivacyAndSecurity from "@/content/blog/privacy-and-security"
import * as TripcaseShutdown from "@/content/blog/tripcase-shutdown-what-now"
import * as TripitComparison from "@/content/blog/tripit-vs-tripcache-comparison-2025"
import * as AiTripPlanner from "@/content/blog/ai-trip-planner-2026"
import * as BusinessTravelManagement from "@/content/blog/business-travel-management-guide-2026"
import * as TravelItineraryTemplate from "@/content/blog/travel-itinerary-template-2026"
import * as FlightyComparison from "@/content/blog/flighty-vs-tripcache-2026"
import * as GoogleTravelAlternative from "@/content/blog/google-travel-alternative-2026"
import * as CancellationReminder from "@/content/blog/free-cancellation-reminder-travel-bookings-2026"
import * as TravelBookingOrganizer from "@/content/blog/travel-booking-organizer-app-2026"
import * as TravelDocumentOrganizer from "@/content/blog/best-travel-document-organizer-app-2026"
import * as ConfirmationEmailOrganizer from "@/content/blog/organize-travel-confirmation-emails-2026"
import * as BusinessTravelExpenseReporting from "@/content/blog/business-travel-expense-reporting-app-2026"
import * as HotelCancellationReminder from "@/content/blog/hotel-cancellation-reminder-app-2026"
import * as RentalCarCancellationReminder from "@/content/blog/rental-car-cancellation-reminder-app-2026"
import * as TripExpenseManagement from "@/content/blog/trip-expense-management-app-2026"
import * as TripMapItineraryPlanner from "@/content/blog/trip-map-itinerary-planner-app-2026"
import * as BestTripitAlternatives from "@/content/blog/best-tripit-alternatives-2026"
import * as AiTravelOrganizer from "@/content/blog/ai-travel-organizer-app-2026"
import * as HotelCancellationPolicies from "@/content/blog/hotel-cancellation-policies"
import * as TravelHistory from "@/content/blog/how-to-find-your-travel-history"
import * as WanderlogVsTripit from "@/content/blog/wanderlog-vs-tripit"
import * as FlightTimeZones from "@/content/blog/flight-time-zones-arrival-date"
import * as OfflineTravelDocuments from "@/content/blog/save-travel-documents-offline"

type BlogPostModule = { metadata: BlogFrontmatter; body: string; faq?: BlogFaq[] }

const rawPosts: BlogPostModule[] = [
  HotelCancellationPolicies,
  TravelHistory,
  WanderlogVsTripit,
  FlightTimeZones,
  OfflineTravelDocuments,
  BestTripitAlternatives,
  AiTravelOrganizer,
  HotelCancellationReminder,
  RentalCarCancellationReminder,
  TripExpenseManagement,
  TripMapItineraryPlanner,
  TravelBookingOrganizer,
  TravelDocumentOrganizer,
  ConfirmationEmailOrganizer,
  BusinessTravelExpenseReporting,
  CancellationReminder,
  AiTripPlanner,
  BusinessTravelManagement,
  TravelItineraryTemplate,
  FlightyComparison,
  GoogleTravelAlternative,
  TripitComparison,
  TripcaseShutdown,
  BestTravelApps,
  EmailToTripAutomation,
  PrivacyAndSecurity,
]

// The FAQ is rendered from the same list that feeds the FAQPage JSON-LD, so the visible
// questions and answers always match the structured data word for word.
function faqMarkdown(slug: string, faq: BlogFaq[]): string {
  for (const item of faq) {
    if (/[[\]*_`|#<>]/.test(`${item.question}${item.answer}`)) {
      throw new Error(`FAQ text in ${slug} must be plain text (no markdown) so it matches the FAQPage JSON-LD: "${item.question}"`)
    }
  }
  return ["", "## Frequently asked questions", ...faq.flatMap((item) => ["", `### ${item.question}`, "", item.answer])].join("\n")
}

const posts: BlogPost[] = rawPosts.map((source) => {
  const slug = source.metadata.slug
  const faq = source.faq
  const markdown = faq?.length ? `${source.body.trimEnd()}\n${faqMarkdown(slug, faq)}\n` : source.body
  const contentNodes = renderMarkdown(markdown, { skipFirstH1: true })

  return {
    slug,
    metadata: source.metadata,
    faq,
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

export function getRelatedBlogPosts(slug: string, limit = 3): BlogSummary[] {
  const current = getBlogPostBySlug(slug)?.metadata

  if (!current) return []

  const currentTerms = new Set(
    [current.category, ...(current.keywords ?? [])]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((term) => term.length > 3),
  )

  return getBlogSummaries()
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const candidateTerms = new Set(
        [post.category, ...(post.keywords ?? [])]
          .join(" ")
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter((term) => term.length > 3),
      )
      const sharedTerms = [...currentTerms].filter((term) => candidateTerms.has(term)).length
      const categoryMatch = post.category === current.category ? 3 : 0

      return { post, score: sharedTerms + categoryMatch }
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map(({ post }) => post)
}
