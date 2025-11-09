import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProductHighlightsSection } from "@/components/product-highlights-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductHighlightsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
