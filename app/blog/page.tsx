import "../secondary.css"

import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Newspaper, ArrowLeft, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { getBlogSummaries } from "@/lib/blog"
import { blogTopics } from "@/lib/blog-topics"
import { Bloom } from "@/components/home/category"
import { BlogCta } from "@/components/site/blog-ui"
import { BlogBrowser } from "@/components/site/blog-browser"
import { PostTicket, Postmark, Stamp, formatPostDate, toneForSlug, topicIdForSlug } from "@/components/site/blog-cards"
import { ButtonLink, Container, Section, SitePage } from "@/components/site/kit"

const HERO_CHIP =
  "tc-press inline-flex min-h-11 items-center rounded-full border border-tc-line bg-white/80 px-4 text-[14.5px] font-semibold text-tc-ink-2 transition-colors duration-200 hover:border-[#d9d2fb] hover:bg-tc-violet-soft hover:text-tc-violet"

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
  const [featuredPost] = blogPosts
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

  const slugs = new Set(blogPosts.map((post) => post.slug))
  const topics = blogTopics.map((topic) => ({ ...topic, count: topic.slugs.filter((slug) => slugs.has(slug)).length }))
  const cards = blogPosts.map((post) => ({
    slug: post.slug,
    topicId: topicIdForSlug(post.slug),
    node: <PostTicket post={post} />,
  }))
  const featuredTone = featuredPost ? toneForSlug(featuredPost.slug) : null

  return (
    <SitePage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} />

      {/* Journal masthead with the cover story */}
      <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#f7f5ff_0%,#f0f2f4_85%)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
          <Bloom className="tc-drift -right-32 -top-24 size-[520px] opacity-35" color="#8b5cf6" />
          <Bloom className="tc-drift-slow -left-40 top-[20%] size-[420px] opacity-20" color="#ec4899" />
        </div>
        <Container size="wide" className="relative grid items-center gap-14 pb-20 pt-[clamp(120px,16svh,164px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <h1 className="text-balance font-tc-display text-[clamp(42px,5.4vw,76px)] font-semibold leading-[1.02] tracking-[-0.02em] text-tc-ink">
              Travel organization guides for <span className="text-tc-violet">after you book.</span>
            </h1>
            <p className="mt-6 max-w-[56ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[19px]">
              Learn how to turn travel confirmation emails into itineraries, protect free-cancellation deadlines,
              and keep documents, receipts, flights, stays, and trip expenses organized.
            </p>
            <p className="mt-8 flex items-center gap-2 text-[13.5px] font-medium text-tc-mute">
              <Newspaper className="size-4 text-tc-violet" aria-hidden="true" />
              <span>Post-booking travel organizer</span>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link className={HERO_CHIP} href="/features/email-to-itinerary">
                Email automation
              </Link>
              <Link className={HERO_CHIP} href="/features/cancellation-reminders">
                Cancellation reminders
              </Link>
              <Link className={HERO_CHIP} href="/features/business-travel-expenses">
                Business expenses
              </Link>
              <Link
                href="/"
                className="tc-press group inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[14.5px] font-semibold text-tc-ink-2 transition-colors duration-200 hover:text-tc-violet"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5" aria-hidden="true" />
                Back home
              </Link>
            </div>
          </div>

          {featuredPost && featuredTone ? (
            <Link href={`/blog/${featuredPost.slug}`} className="group relative block rounded-[30px] focus-visible:outline-offset-8" aria-label={featuredPost.seoTitle ?? featuredPost.title}>
              <Postmark label={formatPostDate(featuredPost.updatedAt ?? featuredPost.date)} className="absolute -left-6 -top-10 z-20 hidden size-[118px] -rotate-12 opacity-80 sm:-left-10 sm:block" />
              <article className="relative rotate-[1.5deg] overflow-hidden rounded-[30px] border border-tc-line bg-white p-2.5 shadow-[0_50px_90px_-45px_rgba(45,27,87,0.65)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 motion-reduce:transition-none">
                <div className="tc-cover relative aspect-[16/11] overflow-hidden rounded-[22px] bg-[#1b1240]">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.imageAlt ?? ""}
                    fill
                    preload
                    sizes="(max-width: 1023px) 100vw, 600px"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
                  />
                  <span aria-hidden="true" className="tc-cover-grade absolute inset-0" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-tc-ink backdrop-blur-md">Featured guide</span>
                  <Stamp slug={featuredPost.slug} label={featuredPost.category} className="absolute right-4 top-4 rotate-[5deg] scale-110" />
                </div>
                <div className="px-4 pb-3 pt-5 sm:px-5">
                  <p className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: featuredTone.text }}>
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: featuredTone.color }} />
                    {featuredPost.category} · {featuredPost.readTime}
                  </p>
                  <h2 className="mt-2 text-balance font-tc-display text-[clamp(24px,2.5vw,32px)] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink transition-colors group-hover:text-tc-violet">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-2 text-[15.5px] leading-7 text-tc-mute">{featuredPost.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-tc-violet">
                    Read the guide
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Link>
          ) : null}
        </Container>
      </section>

      <Section tone="canvas" aria-label="Guides by topic" className="pt-6! sm:pt-8!">
        <Container size="wide">
          <BlogBrowser topics={topics} cards={cards} totalCount={blogPosts.length} />
          <div className="mt-14 flex justify-center">
            <ButtonLink href="/tools/hotel-cancellation-deadline-calculator" variant="secondary">
              Try the deadline calculator
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <BlogCta
        title="Organize your next trip from email"
        text="Track cancellation deadlines for free and keep documents and receipts connected to the itinerary. With Pro, forward booking confirmations and review the trip it builds."
        href="/download"
        label="Download TripCache"
      />

      <Footer />
    </SitePage>
  )
}
