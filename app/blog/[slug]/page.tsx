import "../../secondary.css"

import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogShareButton } from "@/components/blog-share-button"
import { ReadingProgress } from "@/components/reading-progress"
import { getBlogPostBySlug, getBlogSlugs, getRelatedBlogPosts } from "@/lib/blog"
import { Bloom } from "@/components/home/category"
import { BlogCta } from "@/components/site/blog-ui"
import { ArticleCover, ArticleToc } from "@/components/site/blog-article"
import { PostTicket, Postmark, Stamp, formatPostDate } from "@/components/site/blog-cards"
import { Container, Pill, Section, SectionHeading, SitePage } from "@/components/site/kit"

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

  const { metadata, Content, faq } = post
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
      // Only posts that define an FAQ list get this node; it mirrors the visible FAQ section.
      ...(faq?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${shareUrl}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <SitePage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ReadingProgress />

      <article>
        {/* Cover: cinematic photo; the title sits on it from md up and below it on phones */}
        <header className="px-3 pt-[76px] sm:px-5 sm:pt-[88px]">
          <div className="relative mx-auto max-w-[1280px]">
            <div className="relative h-[clamp(260px,46svh,420px)] overflow-hidden rounded-[28px] shadow-[0_50px_90px_-50px_rgba(45,27,87,0.7)] sm:rounded-[36px] md:h-[min(82svh,760px)]">
              <ArticleCover src={metadata.image || "/placeholder.svg"} alt={metadata.imageAlt ?? metadata.title}>
                <span aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(13,8,36,0.92)_0%,rgba(13,8,36,0.6)_38%,transparent_70%)] md:block" />
                <Postmark label={formatPostDate(modifiedDate)} light className="absolute right-6 top-6 hidden size-[116px] rotate-12 opacity-80 md:block lg:right-10 lg:top-10" />
                <Stamp slug={slug} label={metadata.category} className="absolute left-5 top-5 -rotate-6 md:hidden" />
              </ArticleCover>
            </div>

            <div className="relative px-2 pt-7 text-tc-ink md:absolute md:inset-x-0 md:bottom-0 md:px-12 md:pb-12 md:pt-0 md:text-white lg:px-16 lg:pb-14">
              <Link
                href="/blog"
                className="tc-press group -ms-1 inline-flex min-h-11 items-center gap-2 rounded-[12px] px-1 text-[14.5px] font-semibold text-tc-ink-2 transition-colors duration-200 hover:text-tc-violet md:text-white/85 md:hover:text-white"
              >
                <span className="grid size-8 place-items-center rounded-[10px] border border-tc-line bg-white text-tc-ink-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5 md:border-white/25 md:bg-white/10 md:text-white md:backdrop-blur-md">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </span>
                <span>Back to Blog</span>
              </Link>

              <h1 className="mt-4 max-w-[22ch] text-balance font-tc-display text-[clamp(32px,4.6vw,66px)] font-semibold leading-[1.04] tracking-[-0.02em] md:[text-shadow:0_2px_30px_rgba(13,8,36,0.5)]">
                {metadata.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 text-[14px] tabular-nums text-tc-mute md:text-white/80">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-tc-violet font-tc-display text-[18px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(97,43,211,0.7)] md:ring-2 md:ring-white/30"
                  >
                    {metadata.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[14.5px] font-semibold text-tc-ink md:text-white">{metadata.author}</div>
                    <div className="text-[13px]">Research and product guidance</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" aria-hidden="true" />
                  <span title={`Published ${publishedDate}`}>Updated {displayDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" aria-hidden="true" />
                  <span>{metadata.readTime}</span>
                </div>
                <Pill className="md:bg-white/15 md:text-white md:backdrop-blur-md">{metadata.category}</Pill>
                <div className="flex items-center sm:ms-auto">
                  <BlogShareButton url={shareUrl} title={metadata.title} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Body with a sticky contents rail */}
        <Container size="wide" className="grid gap-x-16 pb-20 pt-10 sm:pb-24 md:pt-16 lg:grid-cols-[230px_minmax(0,720px)] lg:justify-center">
          <aside className="min-w-0">
            <ArticleToc containerId="article-body" />
          </aside>
          <div className="min-w-0">
            <div id="article-body" className="min-w-0 [&>*:first-child]:mt-0 [&_em]:italic [&_strong]:font-semibold [&_strong]:text-tc-ink">
              <Content />
            </div>

            {/* Author Bio */}
            <div className="relative mt-16 overflow-hidden rounded-[26px] border border-tc-line bg-tc-mist p-6 sm:p-8">
              <Bloom className="-right-20 -top-24 size-64 opacity-30" color="#8b5cf6" />
              <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
                <div
                  aria-hidden="true"
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-tc-violet font-tc-display text-[24px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)]"
                >
                  {metadata.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-tc-display text-[22px] font-semibold leading-[1.2] tracking-[-0.015em] text-tc-ink">About {metadata.author}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-7 text-tc-ink-2">
                    The TripCache Editorial Team researches post-booking travel workflows, checks changeable product
                    details against official sources, and reviews guides when features or policies change.
                  </p>
                  <Link
                    href="/about#editorial-standards"
                    className="mt-3 inline-flex min-h-11 items-center text-[14.5px] font-semibold text-tc-violet underline decoration-tc-violet/30 underline-offset-4 transition-colors hover:decoration-tc-violet"
                  >
                    Read our editorial standards
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section tone="canvas">
          <Container size="wide">
            <SectionHeading title="Continue Reading" />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <li key={relatedPost.slug} className="h-full">
                  <PostTicket post={relatedPost} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <BlogCta
        title="Turn travel emails into organized trips"
        text="Download TripCache free to track cancellation deadlines and keep trip documents ready when plans change. With Pro, forward booking emails and review the trip it builds."
        href="/download"
        label="Download TripCache"
      />

      <Footer />
    </SitePage>
  )
}
