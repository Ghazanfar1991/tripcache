import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IntentLandingPage } from "@/components/seo/intent-landing-page"
import { alternativePages, getAlternativePage } from "@/lib/seo-page-data"

const BASE_URL = "https://trip-cache.com"

export function generateStaticParams() {
  return alternativePages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = getAlternativePage(slug)

  if (!page) {
    return {
      title: "Alternative Not Found",
    }
  }

  return {
    title: page.metaTitle,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.proofPoints, "TripCache", "travel app alternative"],
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: `${BASE_URL}${page.path}`,
      type: "website",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: [page.image],
    },
  }
}

export default async function AlternativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getAlternativePage(slug)

  if (!page) {
    notFound()
  }

  return <IntentLandingPage page={page} />
}
