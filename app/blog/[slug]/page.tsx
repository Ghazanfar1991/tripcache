import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogShareButton } from "@/components/blog-share-button"
import { ReadingProgress } from "@/components/reading-progress"
import { getBlogPostBySlug, getBlogSlugs, getBlogSummaries } from "@/lib/blog"

const BASE_URL = "https://trip-cache.com"

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const { metadata } = post
  const description = metadata.description || metadata.excerpt
  const ogImage = `${BASE_URL}${metadata.image}`

  return {
    title: metadata.title,
    description,
    keywords: metadata.keywords,
    authors: [{ name: metadata.author }],
    openGraph: {
      title: metadata.title,
      description,
      type: "article",
      publishedTime: metadata.date,
      authors: [metadata.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, Content } = post
  const shareUrl = `${BASE_URL}/blog/${slug}`

  // Get related posts (simple: just get 3 other posts)
  const allPosts = getBlogSummaries()
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: metadata.title,
            image: `${BASE_URL}${metadata.image}`,
            datePublished: metadata.date,
            dateModified: metadata.date,
            author: {
              "@type": "Person",
              name: metadata.author,
            },
            publisher: {
              "@type": "Organization",
              name: "TripCache",
              logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/app-icon.png`,
              },
            },
            description: metadata.description || metadata.excerpt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${BASE_URL}/blog/${slug}`,
            },
            keywords: metadata.keywords,
          }),
        }}
      />

      <ReadingProgress />
      <Navigation />

      {/* Hero Image - Full Width */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <Image
          src={metadata.image || "/placeholder.svg"}
          alt={metadata.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-semibold shadow-lg">
            {metadata.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="relative -mt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="flex mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/90 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-foreground shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            {/* Header Card */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 lg:p-12 shadow-2xl mb-0">
              <div className="space-y-6">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  {metadata.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {metadata.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{metadata.author}</div>
                      <div className="text-xs">Travel Expert</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(metadata.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{metadata.readTime}</span>
                  </div>
                  <div className="flex items-center ml-auto">
                    <BlogShareButton url={shareUrl} title={metadata.title} />
                  </div>
                </div>
              </div>
            </div>

            {/* Content with Enhanced Typography */}
            <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-card prose-pre:border prose-pre:border-border
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-ul:my-6 prose-li:my-2
              prose-table:border-collapse prose-th:bg-primary/10 prose-th:p-3 prose-td:p-3
            ">
              <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-3xl p-8 lg:p-12">
                <Content />
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-16 bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20 rounded-3xl p-8 lg:p-10">
              <div className="flex items-start gap-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 shadow-xl">
                  {metadata.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">About {metadata.author}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {metadata.author} is a travel enthusiast and content creator who loves helping others organize their
                    adventures. With years of experience in travel planning, they share insights and tips to make your
                    journeys smoother and more enjoyable.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-20">
                <h2 className="text-3xl font-bold mb-8">Continue Reading</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-xl h-full">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-5">
                          <div className="text-xs text-primary font-semibold mb-2">{relatedPost.category}</div>
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20">
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">Want More Travel Tips?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter for exclusive guides, product updates, and travel hacks delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
