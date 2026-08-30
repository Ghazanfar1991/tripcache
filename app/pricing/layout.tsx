import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Travel App Pricing",
  description:
    "Start with TripCache Basic for free, choose Pro for $5.99/month, or save 30% with Pro Yearly at $49.99/year.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
