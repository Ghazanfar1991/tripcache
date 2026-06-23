import Link from "next/link"
import { Footer } from "@/components/footer"
import { BlogCardPremium } from "@/components/blog-card-premium"
import { Newspaper, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { getBlogSummaries } from "@/lib/blog"
import { SectionContainer } from "@/components/section-container"

export const metadata: Metadata = {
  title: "Travel Tips & Guides Blog",
  description:
    "Travel itinerary, document organization, booking cancellation reminder, and trip planning guides for modern travelers using TripCache.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "TripCache Blog - Travel Tips & Guides",
    description: "Expert travel tips, booking reminder workflows, and itinerary management guides.",
    url: "https://trip-cache.com/blog",
    type: "website",
  },
}

export default function BlogPage() {
  const blogPosts = getBlogSummaries()
  const [featuredPost, ...regularPosts] = blogPosts

  return (
    <main className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-purple-500/5 to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <SectionContainer className="relative z-10">
          <div className="flex justify-center lg:justify-start mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium">
              <Newspaper className="h-4 w-4 text-primary" />
              <span>Travel Insights & Expert Guides</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
              TripCache <span className="text-gradient-primary">Blog</span>
            </h1>

            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Expert tips, in-depth tutorials, and insights to master travel organization. From TripCase migration guides to automation strategies.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2 text-sm">
              <Link className="rounded-full border border-border/60 bg-background/70 px-4 py-2 font-medium hover:text-primary" href="/features/email-to-itinerary">
                Email automation
              </Link>
              <Link className="rounded-full border border-border/60 bg-background/70 px-4 py-2 font-medium hover:text-primary" href="/features/cancellation-reminders">
                Cancellation reminders
              </Link>
              <Link className="rounded-full border border-border/60 bg-background/70 px-4 py-2 font-medium hover:text-primary" href="/features/business-travel-expenses">
                Business expenses
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-2 lg:py-2">
          <SectionContainer>
            <BlogCardPremium post={featuredPost} featured={true} />
          </SectionContainer>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-12 lg:py-8">
        <SectionContainer>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Recent Articles</h2>

            <Link href="/tools/hotel-cancellation-deadline-calculator" className="hidden rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition hover:border-primary/40 hover:text-primary lg:inline-flex">
              Try the deadline calculator
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <BlogCardPremium key={post.slug} post={post} />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Organize your next trip from email</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Forward booking confirmations to TripCache, track cancellation deadlines, and keep documents and receipts
              connected to the itinerary.
            </p>
            <Link href="/download" className="inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              Download TripCache
            </Link>
          </div>
        </SectionContainer>
      </section>

      <Footer />
    </main>
  )
}
