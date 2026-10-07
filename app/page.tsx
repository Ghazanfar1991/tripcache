import type { Metadata } from "next"

import { HomePage } from "@/components/home/home-page"
import "./home.css"

export const metadata: Metadata = {
  title: {
    absolute: "Travel Itinerary App for Booking Emails | TripCache",
  },
  description:
    "Keep every booking in one travel itinerary. Free cancellation and check-in reminders, document vault and expenses; forward confirmation emails with Pro.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TripCache",
    title: "Travel Itinerary App for Booking Emails | TripCache",
    description:
      "Keep every booking in one travel itinerary, with free cancellation and check-in reminders, documents and expenses. Forward confirmation emails with Pro.",
    url: "https://trip-cache.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Itinerary App for Booking Emails | TripCache",
    description:
      "Keep every booking in one travel itinerary, with free cancellation and check-in reminders, documents and expenses. Forward confirmation emails with Pro.",
  },
}

export default function Home() {
  return <HomePage />
}
