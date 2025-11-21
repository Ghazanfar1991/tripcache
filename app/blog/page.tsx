import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCardPremium } from "@/components/blog-card-premium"
import { Newspaper, Search } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { getBlogSummaries } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Travel Tips & Guides Blog",
  description:
    "Expert travel tips, itinerary management guides, and insights on organizing your trips. Learn about TripCase alternatives and modern travel planning.",
  openGraph: {
    title: "TripCache Blog - Travel Tips & Guides",
    description: "Expert travel tips and itinerary management guides",
    type: "website",
  },
}

export default function BlogPage() {
  const blogPosts = getBlogSummaries()
  const [featuredPost, ...regularPosts] = blogPosts

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section - Enhanced */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-purple-500/5 to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Search Bar (Static for now) */}
            <div className="max-w-md mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all dark:border-white/20 dark:bg-background/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-2 lg:py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BlogCardPremium post={featuredPost} featured={true} />
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-12 lg:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Recent Articles</h2>

            {/* Category Pills */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:scale-105">
                All
              </button>
              <button className="px-4 py-2 rounded-full bg-background border border-border/50 text-sm font-medium transition-all hover:border-primary/30 hover:bg-card">
                Guides
              </button>
              <button className="px-4 py-2 rounded-full bg-background border border-border/50 text-sm font-medium transition-all hover:border-primary/30 hover:bg-card">
                Tutorials
              </button>
              <button className="px-4 py-2 rounded-full bg-background border border-border/50 text-sm font-medium transition-all hover:border-primary/30 hover:bg-card">
                Comparisons
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <BlogCardPremium key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Never Miss an Update
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest travel tips, product updates, and exclusive guides delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
