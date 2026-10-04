import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Travel App Pricing",
  description:
    "TripCache Basic is free, with cancellation and check-in reminders, documents, and CSV/PDF export. Pro adds email import and flight alerts from $5.99/month.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
