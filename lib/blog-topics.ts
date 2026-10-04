export interface BlogTopic {
  id: string
  title: string
  description: string
  slugs: string[]
  resource: { href: string; label: string }
}

// Curated by the task a traveler is trying to complete, rather than publication date.
export const blogTopics: BlogTopic[] = [
  {
    id: "itineraries",
    title: "Build your itinerary",
    description: "Bring bookings together, understand flight dates, and start with a useful trip template.",
    slugs: [
      "flight-time-zones-arrival-date",
      "travel-itinerary-template-2026",
      "email-to-trip-automation",
      "travel-booking-organizer-app-2026",
      "trip-map-itinerary-planner-app-2026",
    ],
    resource: { href: "/features/email-to-itinerary", label: "How TripCache email import works" },
  },
  {
    id: "cancellation-deadlines",
    title: "Keep track of cancellation deadlines",
    description: "Check refundable-booking cutoffs and plan reminders for hotels, rental cars, and tickets.",
    slugs: [
      "hotel-cancellation-policies",
      "hotel-cancellation-reminder-app-2026",
      "rental-car-cancellation-reminder-app-2026",
      "free-cancellation-reminder-travel-bookings-2026",
    ],
    resource: { href: "/tools/hotel-cancellation-deadline-calculator", label: "Use the free deadline calculator" },
  },
  {
    id: "travel-documents",
    title: "Get your documents ready",
    description: "Keep the files you need within reach and check what will work without a connection.",
    slugs: [
      "save-travel-documents-offline",
      "how-to-find-your-travel-history",
      "best-travel-document-organizer-app-2026",
      "organize-travel-confirmation-emails-2026",
      "privacy-and-security",
    ],
    resource: { href: "/features", label: "Explore TripCache organization features" },
  },
  {
    id: "business-travel",
    title: "Organize receipts and expenses",
    description: "Prepare for a business trip and keep the records you will need after you return.",
    slugs: [
      "business-travel-management-guide-2026",
      "business-travel-expense-reporting-app-2026",
      "trip-expense-management-app-2026",
    ],
    resource: { href: "/features/business-travel-expenses", label: "See expenses and CSV export" },
  },
  {
    id: "compare-travel-apps",
    title: "Choose a travel app",
    description: "Compare itinerary organizers, planning tools, and flight trackers by the work you need done.",
    slugs: [
      "ai-trip-planner-2026",
      "flighty-vs-tripcache-2026",
      "google-travel-alternative-2026",
      "best-tripit-alternatives-2026",
      "wanderlog-vs-tripit",
    ],
    resource: { href: "/alternatives", label: "Compare TripCache alternatives" },
  },
]
