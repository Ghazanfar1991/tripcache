import "../../secondary.css"

import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogShareButton } from "@/components/blog-share-button"
import { ReadingProgress } from "@/components/reading-progress"
import { getBlogPostBySlug, getBlogSlugs, getRelatedBlogPosts } from "@/lib/blog"
import { SectionContainer } from "@/components/section-container"

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
  const modifiedDate = metadata.updatedAt ?? metadata.date
  const pageUrl = `${BASE_URL}/blog/${metadata.slug}`

  return {
    title: { absolute: metadata.seoTitle ?? metadata.title },
    description,
    keywords: metadata.keywords,
    authors: [{ name: metadata.author }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: metadata.seoTitle ?? metadata.title,
      description,
      url: pageUrl,
      type: "article",
      siteName: "TripCache",
      locale: "en_US",
      publishedTime: metadata.date,
      modifiedTime: modifiedDate,
      authors: [metadata.author],
      section: metadata.category,
      tags: metadata.keywords,
      images: [
        {
          url: ogImage,
          alt: metadata.imageAlt ?? metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.seoTitle ?? metadata.title,
      description,
      images: [{ url: ogImage, alt: metadata.imageAlt ?? metadata.title }],
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
  const modifiedDate = metadata.updatedAt ?? metadata.date
  const displayDate = new Date(modifiedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })
  const publishedDate = new Date(metadata.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  const relatedPosts = getRelatedBlogPosts(slug)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${shareUrl}#article`,
        headline: metadata.title,
        description: metadata.description || metadata.excerpt,
        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}${metadata.image}`,
          caption: metadata.imageAlt ?? metadata.title,
        },
        datePublished: metadata.date,
        dateModified: modifiedDate,
        author: {
          "@type": "Organization",
          "@id": `${BASE_URL}/about#editorial-team`,
          name: "TripCache Editorial Team",
          url: `${BASE_URL}/about`,
        },
        publisher: { "@id": `${BASE_URL}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
        articleSection: metadata.category,
        keywords: metadata.keywords?.join(", "),
        isPartOf: { "@id": `${BASE_URL}/blog#collection` },
        breadcrumb: { "@id": `${shareUrl}#breadcrumb` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${shareUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Travel organization guides", item: `${BASE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: metadata.title, item: shareUrl },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f0e8] text-[#121212] [background-image:radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.9),transparent_30%),linear-gradient(rgba(55,45,35,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(55,45,35,0.028)_1px,transparent_1px)] [background-size:auto,32px_32px,32px_32px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ReadingProgress />

      {/* Article navigation and cover */}
      <SectionContainer className="pt-24 lg:pt-32">
        <div className="mb-4 sm:mb-6">
          <Link
            href="/blog"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-xl px-1 text-sm font-semibold text-[#5e564c] transition-colors duration-150 hover:text-[#4d20af] active:text-[#4d20af]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/65 text-[#444444] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_6px_18px_rgba(72,53,33,0.08)] transition-[transform,background-color,color] duration-150 group-hover:-translate-x-0.5 group-hover:bg-white group-hover:text-[#4d20af] group-active:scale-95">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-[#353458] shadow-[0_20px_55px_rgba(62,43,24,0.11)] sm:rounded-[2rem]">
          <Image
            src={metadata.image || "/placeholder.svg"}
            alt=""
            fill
            sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1279px) calc(100vw - 4rem), 73rem"
            className="scale-110 object-cover opacity-45 blur-2xl saturate-75"
            aria-hidden="true"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#121212]/10" aria-hidden="true" />
          <Image
            src={metadata.image || "/placeholder.svg"}
            alt={metadata.imageAlt ?? metadata.title}
            fill
            sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1279px) calc(100vw - 4rem), 73rem"
            className="object-contain"
            preload
          />

          {/* Category Badge */}
          <div className="absolute start-4 top-4 sm:start-6 sm:top-6">
            <span className="inline-flex min-h-9 items-center rounded-full bg-[#602ad2] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(58,24,135,0.24)] sm:px-4 sm:text-sm">
              {metadata.category}
            </span>
          </div>
        </div>
      </SectionContainer>

      {/* Article Content */}
      <article className="relative pb-24 pt-5 sm:-mt-16 sm:pt-0 lg:pb-32">
        <SectionContainer>
          <div className="mx-auto max-w-4xl">
            {/* Header Card */}
            <div className="rounded-[1.5rem] bg-[#f8f4ed]/94 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_60px_rgba(72,53,33,0.12)] backdrop-blur-xl sm:rounded-[2rem] sm:p-10 lg:p-14">
              <div className="space-y-7 sm:space-y-8">
                {/* Title */}
                <h1 className="text-balance text-[2rem] font-semibold leading-[1.04] tracking-[-0.05em] text-[#121212] sm:text-5xl sm:leading-[1.02] lg:text-6xl">
                  {metadata.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-[#666666]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#602ad2] text-lg font-bold text-white shadow-[0_8px_20px_rgba(58,24,135,0.2)]">
                      {metadata.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#121212]">{metadata.author}</div>
                      <div className="text-xs">Research and product guidance</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span title={`Published ${publishedDate}`}>Updated {displayDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{metadata.readTime}</span>
                  </div>
                  <div className="flex items-center sm:ms-auto">
                    <BlogShareButton url={shareUrl} title={metadata.title} />
                  </div>
                </div>
              </div>
            </div>

            {/* Content with Enhanced Typography */}
            <div className="prose prose-lg max-w-none prose-headings:text-[#121212] prose-headings:font-semibold prose-headings:tracking-[-0.035em] prose-p:text-[#444444] prose-li:text-[#444444] lg:prose-xl
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
              prose-a:text-[#4d20af] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#121212] prose-strong:font-semibold
              prose-code:text-[#4d20af] prose-code:bg-[#e5dcff] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-[#121212] prose-pre:text-[#f7f2e9]
              prose-img:rounded-2xl prose-img:shadow-[0_22px_50px_rgba(72,53,33,0.14)]
              prose-blockquote:border-s-[#602ad2] prose-blockquote:bg-[#eee7dc] prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-e-lg prose-blockquote:text-[#444444]
              prose-ul:my-6 prose-li:my-2
              prose-table:border-collapse prose-th:bg-[#e5dcff] prose-th:text-[#121212] prose-th:p-3 prose-td:p-3 prose-td:text-[#444444]
            ">
              <div className="mt-3 rounded-[1.5rem] bg-white/42 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_22px_60px_rgba(72,53,33,0.07)] sm:rounded-[2rem] sm:p-10 lg:p-14">
                <Content />
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-16 rounded-[2rem] bg-[#eee7dc] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-9 lg:p-10">
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#602ad2] text-3xl font-bold text-white shadow-[0_12px_26px_rgba(58,24,135,0.2)]">
                  {metadata.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-2xl font-semibold tracking-[-0.03em] text-[#121212]">About {metadata.author}</h3>
                  <p className="mb-4 leading-relaxed text-[#666666]">
                    The TripCache Editorial Team researches post-booking travel workflows, checks changeable product
                    details against official sources, and reviews guides when features or policies change.
                  </p>
                  <Link href="/about#editorial-standards" className="font-semibold text-[#4d20af] hover:underline">
                    Read our editorial standards
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-24">
                <h2 className="mb-10 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Continue Reading</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group h-full"
                    >
                      <div className="h-full overflow-hidden rounded-[1.5rem] bg-white/45 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_16px_42px_rgba(72,53,33,0.07)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_22px_52px_rgba(72,53,33,0.12)]">
                        <div className="relative aspect-video overflow-hidden rounded-[1rem] bg-[#e5dac7]">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            sizes="(max-width: 767px) calc(100vw - 3.75rem), (max-width: 1023px) 50vw, 18rem"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                          />
                        </div>
                        <div className="px-3 pb-4 pt-5">
                          <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4d20af]">{relatedPost.category}</div>
                          <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-[#121212] transition-colors duration-150 group-hover:text-[#4d20af]">
                            {relatedPost.title}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-6 text-[#666666]">{relatedPost.excerpt}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-16 rounded-[2rem] bg-[#121212] p-8 text-center text-[#f7f2e9] shadow-[0_24px_62px_rgba(42,20,82,0.16)] sm:p-10">
              <h3 className="mb-3 text-2xl font-semibold tracking-[-0.035em] lg:text-3xl">Turn travel emails into organized trips</h3>
              <p className="mx-auto mb-6 max-w-xl leading-7 text-[#b9b0a3]">
                Download TripCache to forward booking emails, track cancellation deadlines, and keep trip documents
                ready when plans change.
              </p>
              <Link
                href="/download"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#602ad2] px-8 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(77,32,175,0.3)] transition-[transform,background-color] duration-150 hover:bg-[#4d20af] active:scale-[0.965]"
              >
                Download TripCache
              </Link>
            </div>
          </div>
        </SectionContainer>
      </article>

      <Footer />
    </main>
  )
}
