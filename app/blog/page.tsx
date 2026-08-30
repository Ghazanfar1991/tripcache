import "../secondary.css"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { BlogCardPremium } from "@/components/blog-card-premium"
import { Newspaper, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { getBlogSummaries } from "@/lib/blog"
import { SectionContainer } from "@/components/section-container"

export const metadata: Metadata = {
  title: "Post-Booking Travel Organization Guides",
  description:
    "Practical guides for organizing travel confirmation emails, itineraries, cancellation deadlines, documents, receipts, and business trip expenses.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Post-Booking Travel Organization Guides | TripCache",
    description: "Organize confirmation emails, itineraries, cancellation deadlines, travel documents, receipts, and trip expenses.",
    url: "https://trip-cache.com/blog",
    type: "website",
    siteName: "TripCache",
    images: [{ url: "/opengraph-image?v=20260829", width: 1200, height: 630, alt: "TripCache travel organization guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Post-Booking Travel Organization Guides | TripCache",
    description: "Practical guides for confirmations, itineraries, cancellation deadlines, documents, and trip expenses.",
    images: [{ url: "/twitter-image?v=20260829", width: 1200, height: 630, alt: "TripCache travel organization guides" }],
  },
}

export default function BlogPage() {
  const blogPosts = getBlogSummaries()
  const [featuredPost, ...regularPosts] = blogPosts
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://trip-cache.com/blog#collection",
    name: "TripCache post-booking travel organization guides",
    description: "Guides for travel confirmation emails, itineraries, cancellation deadlines, documents, receipts, and expenses.",
    url: "https://trip-cache.com/blog",
    isPartOf: { "@id": "https://trip-cache.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: `https://trip-cache.com/blog/${post.slug}`,
      })),
    },
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f0e8] text-[#121212] [background-image:radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.9),transparent_30%),linear-gradient(rgba(55,45,35,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(55,45,35,0.028)_1px,transparent_1px)] [background-size:auto,32px_32px,32px_32px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} />
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden pb-14 pt-28 sm:pb-16 lg:pb-20 lg:pt-28">
        <div className="pointer-events-none absolute -end-24 top-20 h-80 w-80 rounded-full bg-[#e5dac7]/70 blur-3xl" />

        <SectionContainer className="relative z-10">
          <div className="mb-7 flex justify-center lg:justify-start">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#444444] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)] backdrop-blur-xl transition-[transform,background-color] duration-150 hover:bg-white/80 active:scale-[0.965]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </div>

          <div className="mx-auto max-w-5xl space-y-6 text-center lg:mx-0 lg:text-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#4d20af] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)]">
              <Newspaper className="h-3.5 w-3.5" />
              <span>Post-booking travel organizer</span>
            </div>

            <h1 className="design-one-display-blog">
              Travel organization guides for <span className="text-[#5121b3]">after you book.</span>
            </h1>

            <p className="mx-auto max-w-3xl text-pretty text-lg leading-8 text-[#626262] sm:text-xl lg:mx-0">
              Learn how to turn travel confirmation emails into itineraries, protect free-cancellation deadlines,
              and keep documents, receipts, flights, stays, and trip expenses organized.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-3 text-sm lg:justify-start">
              <Link className="inline-flex min-h-11 items-center rounded-full bg-white/50 px-4 py-2 font-semibold text-[#5e564c] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08)] transition-[transform,background-color,color] duration-150 hover:bg-white/80 hover:text-[#4d20af] active:scale-[0.965]" href="/features/email-to-itinerary">
                Email automation
              </Link>
              <Link className="inline-flex min-h-11 items-center rounded-full bg-white/50 px-4 py-2 font-semibold text-[#5e564c] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08)] transition-[transform,background-color,color] duration-150 hover:bg-white/80 hover:text-[#4d20af] active:scale-[0.965]" href="/features/cancellation-reminders">
                Cancellation reminders
              </Link>
              <Link className="inline-flex min-h-11 items-center rounded-full bg-white/50 px-4 py-2 font-semibold text-[#5e564c] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08)] transition-[transform,background-color,color] duration-150 hover:bg-white/80 hover:text-[#4d20af] active:scale-[0.965]" href="/features/business-travel-expenses">
                Business expenses
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-2">
          <SectionContainer>
            <BlogCardPremium post={featuredPost} featured={true} />
          </SectionContainer>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-20 lg:py-28">
        <SectionContainer>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Recent Articles</h2>

            <Link href="/tools/hotel-cancellation-deadline-calculator" className="hidden min-h-11 items-center rounded-full bg-[#121212] px-5 py-2 text-sm font-semibold text-[#f7f2e9] shadow-[0_12px_28px_rgba(58,43,28,0.16)] transition-[transform,background-color] duration-150 hover:bg-[#242424] active:scale-[0.965] lg:inline-flex">
              Try the deadline calculator
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogCardPremium key={post.slug} post={post} />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Newsletter CTA */}
      <section className="pb-24 pt-8 lg:pb-32 lg:pt-12">
        <SectionContainer>
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#121212] p-8 text-center text-[#f7f2e9] shadow-[0_28px_70px_rgba(42,20,82,0.18)] sm:p-12 lg:p-16">
            <h2 className="mb-5 text-3xl font-semibold tracking-[-0.045em] lg:text-5xl">Organize your next trip from email</h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-8 text-[#b9b0a3]">
              Forward booking confirmations to TripCache, track cancellation deadlines, and keep documents and receipts
              connected to the itinerary.
            </p>
            <Link href="/download" className="inline-flex min-h-12 items-center rounded-full bg-[#602ad2] px-8 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(77,32,175,0.3)] transition-[transform,background-color] duration-150 hover:bg-[#4d20af] active:scale-[0.965]">
              Download TripCache
            </Link>
          </div>
        </SectionContainer>
      </section>

      <Footer />
    </main>
  )
}
