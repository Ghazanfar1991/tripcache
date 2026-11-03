import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Travel App Pricing",
  description:
    "TripCache Basic is free. Pro adds email import, live flight alerts and ChatGPT or Claude access from $5.99/month, or yearly with a 14-day free trial.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
