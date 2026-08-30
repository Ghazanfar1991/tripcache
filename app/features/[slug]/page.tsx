import "../../secondary.css"

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IntentLandingPage } from "@/components/seo/intent-landing-page"
import { featurePages, getFeaturePage } from "@/lib/seo-page-data"
import { createPageMetadata } from "@/lib/seo-metadata"

export function generateStaticParams() {
  return featurePages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = getFeaturePage(slug)

  if (!page) {
    return {
      title: "Feature Not Found",
    }
  }

  return createPageMetadata({
    title: page.metaTitle,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.proofPoints, "TripCache", "travel email organizer"],
    path: page.path,
  })
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getFeaturePage(slug)

  if (!page) {
    notFound()
  }

  return <IntentLandingPage page={page} />
}
