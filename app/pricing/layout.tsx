import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "TripCache pricing for free travel itinerary management, booking organization, cancellation reminders, document storage, and Pro automation.",
  alternates: {
    canonical: "/pricing",
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
