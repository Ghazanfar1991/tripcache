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
  title: "Travel Itinerary App for Emails, Documents, Reminders & Expenses",
  description:
    "TripCache turns travel confirmation emails into organized itineraries with flight updates, free-cancellation reminders, secure documents, trip maps, expenses, and CSV exports.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TripCache - Travel Itinerary App for Emails, Documents & Reminders",
    description:
      "Organize confirmation emails, flights, hotels, rental cars, tickets, documents, cancellation deadlines, maps, and expenses in one travel app.",
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
