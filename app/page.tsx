import type { Metadata } from "next"

import { HomePage } from "@/components/home/home-page"
import "./home.css"

export const metadata: Metadata = {
  title: {
    absolute: "Travel Itinerary App for Booking Emails | TripCache",
  },
  description:
    "Free trip organizer: cancellation and check-in reminders, documents, expenses, a live calendar and Siri. Pro adds booking-email import and live flight alerts.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TripCache",
    title: "Travel Itinerary App for Booking Emails | TripCache",
    description:
      "Free trip organizer: cancellation reminders, documents, expenses, a live calendar and Siri. Pro turns booking emails into trips and adds flight alerts.",
    url: "https://trip-cache.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Itinerary App for Booking Emails | TripCache",
    description:
      "Free trip organizer: cancellation reminders, documents, expenses, a live calendar and Siri. Pro turns booking emails into trips and adds flight alerts.",
  },
}

export default function Home() {
  return <HomePage />
}
