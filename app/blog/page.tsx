import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Newspaper } from "lucide-react"
import type { Metadata } from "next"

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

const blogPosts = [
  {
    slug: "tripcase-alternative-2025",
    title: "TripCase Shut Down: Why TripCache is the Best Alternative in 2025",
    excerpt:
      "TripCase closed on April 1, 2025. Discover why TripCache is the perfect replacement with email-to-trip automation, document storage, and CSV exports - all free forever.",
    date: "2025-04-15",
    author: "Sarah Johnson",
    readTime: "8 min read",
    category: "Guide",
    image: "/blog-tripcase-alternative.jpg",
  },
  {
    slug: "tripcase-shutdown-what-now",
    title: "TripCase is Gone: Complete Migration Guide to TripCache",
    excerpt:
      "Step-by-step guide for former TripCase users. Learn how to migrate your travel data and why thousands are choosing TripCache as their new travel companion.",
    date: "2025-04-10",
    author: "Michael Chen",
    readTime: "10 min read",
    category: "Migration",
    image: "/blog-migration-guide.jpg",
  },
  {
    slug: "best-travel-apps-2025",
    title: "Best Travel Itinerary Apps in 2025: TripCache vs TripIt vs Wanderlog",
    excerpt:
      "Comprehensive comparison of the top travel planning apps after TripCase's closure. See why TripCache stands out with unique features and zero cost.",
    date: "2025-04-05",
    author: "Emily Rodriguez",
    readTime: "12 min read",
    category: "Comparison",
    image: "/blog-app-comparison.jpg",
  },
  {
    slug: "getting-started-with-tripcache",
    title: "Getting Started with TripCache: Your Complete Guide",
    excerpt:
      "Learn how to set up TripCache and start organizing your travel itineraries in minutes. From email forwarding to CSV exports, we cover everything you need to know.",
    date: "2025-01-15",
    author: "Sarah Johnson",
    readTime: "5 min read",
    category: "Tutorial",
    image: "/travel-planning-dashboard.jpg",
  },
  {
    slug: "email-to-trip-automation",
    title: "How Email-to-Trip Automation Works: The Technology Behind TripCache",
    excerpt:
      "Discover the magic behind TripCache's email parsing technology. We break down how we automatically extract flight details from your booking confirmations.",
    date: "2025-01-10",
    author: "Michael Chen",
    readTime: "4 min read",
    category: "Technology",
    image: "/email-automation-technology.jpg",
  },
  {
    slug: "travel-expense-tracking",
    title: "Simplify Travel Expense Tracking with CSV Reports",
    excerpt:
      "Managing business travel expenses doesn't have to be painful. Learn how TripCache's CSV export feature makes expense reporting effortless.",
    date: "2025-01-05",
    author: "Emily Rodriguez",
    readTime: "6 min read",
    category: "Business",
    image: "/business-expense-spreadsheet.jpg",
  },
  {
    slug: "digital-nomad-organization",
    title: "Organization Tips for Digital Nomads",
    excerpt:
      "As a digital nomad, keeping track of multiple trips can be overwhelming. Here's how TripCache helps you stay organized while working remotely.",
    date: "2024-12-28",
    author: "Alex Thompson",
    readTime: "7 min read",
    category: "Lifestyle",
    image: "/digital-nomad-working-remotely.jpg",
  },
  {
    slug: "privacy-and-security",
    title: "How We Keep Your Travel Data Secure",
    excerpt:
      "Your privacy matters. Learn about the security measures and encryption protocols we use to protect your sensitive travel information.",
    date: "2024-12-20",
    author: "David Park",
    readTime: "5 min read",
    category: "Security",
    image: "/data-security-encryption.jpg",
  },
  {
    slug: "frequent-flyer-tips",
    title: "10 Tips for Frequent Flyers Using TripCache",
    excerpt:
      "Maximize your productivity and stay organized with these expert tips for frequent travelers. From automation to analytics, we've got you covered.",
    date: "2024-12-15",
    author: "Sarah Johnson",
    readTime: "8 min read",
    category: "Tips",
    image: "/airplane-frequent-flyer.jpg",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-2 pb-6 lg:pt-25 lg:pb-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 via-blue-50/30 to-background dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-background" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
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
