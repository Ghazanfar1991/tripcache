import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Newspaper } from "lucide-react"
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

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-2 pb-6 lg:pt-25 lg:pb-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 via-blue-50/30 to-background dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-background" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-start mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm font-medium">
              <Newspaper className="h-4 w-4 text-cyan-500" />
              <span>Travel Insights & Updates</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">TripCache Blog</h1>

            <p className="text-lg text-muted-foreground text-pretty">
              Tips, tutorials, and insights to help you get the most out of your travel organization journey. Including
              guides for former TripCase users.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
