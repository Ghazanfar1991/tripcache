import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start with TripCache Basic for free, choose Pro for $5.99/month, or save 30% with Pro Yearly at $49.99/year.",
  alternates: {
    canonical: "/pricing",
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
