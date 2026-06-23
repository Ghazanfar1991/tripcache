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
  title: "AI Travel Inbox for Email Itineraries & Cancellation Reminders",
  description:
    "Forward travel emails to TripCache, get organized itineraries, track cancellation deadlines, and keep receipts, documents, flights, hotels, and expenses together.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TripCache - AI Travel Inbox & Cancellation Reminder Platform",
    description:
      "Forward travel emails, get organized itineraries, and never miss hotel cancellation deadlines.",
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
