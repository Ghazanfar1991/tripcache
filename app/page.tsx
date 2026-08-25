import type { Metadata } from "next"

import { DesignOneHome } from "@/components/design-one/home"

export const metadata: Metadata = {
  title: {
    absolute: "Travel Itinerary App for Booking Emails | TripCache",
  },
  description:
    "Turn booking emails into one organized travel itinerary. Track cancellation deadlines and keep documents, receipts, flights, stays, and expenses together.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TripCache",
    title: "Travel Itinerary App for Booking Emails | TripCache",
    description:
      "Turn booking emails into one organized travel itinerary, track cancellation deadlines, and keep documents, receipts, and expenses together.",
    url: "https://trip-cache.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Itinerary App for Booking Emails | TripCache",
    description:
      "Turn booking emails into one organized travel itinerary, with cancellation reminders, documents, receipts, and expenses together.",
  },
}

export default function Home() {
  return <DesignOneHome />
}
