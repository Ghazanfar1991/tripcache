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
import * as TripitComparison from "@/content/blog/tripit-vs-tripcache-comparison-2025"
import * as TravelDocumentOrganization from "@/content/blog/travel-document-organization-guide-2025"
import * as AutomaticFlightTracking from "@/content/blog/how-to-automatically-track-flights-2025"
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
import * as TripitAlternativeReminders from "@/content/blog/tripit-alternative-cancellation-reminders-documents-2026"
import * as HotelCancellationReminder from "@/content/blog/hotel-cancellation-reminder-app-2026"
import * as RentalCarCancellationReminder from "@/content/blog/rental-car-cancellation-reminder-app-2026"
import * as TripExpenseManagement from "@/content/blog/trip-expense-management-app-2026"
import * as TripMapItineraryPlanner from "@/content/blog/trip-map-itinerary-planner-app-2026"

const rawPosts = [
  HotelCancellationReminder,
  RentalCarCancellationReminder,
  TripExpenseManagement,
  TripMapItineraryPlanner,
  TravelBookingOrganizer,
  TravelDocumentOrganizer,
  ConfirmationEmailOrganizer,
  BusinessTravelExpenseReporting,
  TripitAlternativeReminders,
  CancellationReminder,
  AiTripPlanner,
  BusinessTravelManagement,
  TravelItineraryTemplate,
  FlightyComparison,
  GoogleTravelAlternative,
  TravelDocumentOrganization,
  AutomaticFlightTracking,
  TripitComparison,
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
  const contentNodes = renderMarkdown(source.body, { skipFirstH1: true })

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
