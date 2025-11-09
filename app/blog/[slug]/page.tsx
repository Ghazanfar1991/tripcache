import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogShareButton } from "@/components/blog-share-button"
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog"

const BASE_URL = "https://tripcache.app"

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

  return (
    <main className="min-h-screen">
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

      <Navigation />

      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <Image src={metadata.image || "/placeholder.svg"} alt={metadata.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <article className="relative -mt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-foreground/5 dark:bg-muted/40 dark:hover:bg-muted/60"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-xl mb-8">
              <div className="space-y-6">
                <div className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {metadata.category}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">{metadata.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
                      {metadata.author.charAt(0)}
                    </div>
                    <span>{metadata.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(metadata.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{metadata.readTime}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <BlogShareButton url={shareUrl} title={metadata.title} />
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
                <Content />
              </div>
            </div>

            <div className="mt-12 bg-card border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-2xl flex-shrink-0">
                  {metadata.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">About {metadata.author}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {metadata.author} is a travel enthusiast and content creator who loves helping others organize their
                    adventures. With years of experience in travel planning, they share insights and tips to make your
                    journeys smoother.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
