import HeroSection from "@/components/ui/hero"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { FeatureShowcaseSection } from "@/components/feature-showcase-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FeatureShowcaseSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
