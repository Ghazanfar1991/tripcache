import HeroSection from "@/components/ui/hero"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { FeatureShowcaseSection } from "@/components/feature-showcase-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { AISearchAnswerSection } from "@/components/ai-search-answer-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Post-Booking Travel Organizer for Emails & Cancellation Deadlines",
  description:
    "Forward travel confirmations, build itineraries, protect free-cancellation deadlines, and keep documents, receipts, flights, stays, and expenses together.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TripCache - Post-Booking Travel Organizer",
    description:
      "Turn travel confirmations into itineraries, protect cancellation deadlines, and keep documents, receipts, and expenses with every trip.",
    url: "https://trip-cache.com",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FeatureShowcaseSection />
      <AISearchAnswerSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
