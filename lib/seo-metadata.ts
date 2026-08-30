import type { Metadata } from "next"

export const SITE_URL = "https://trip-cache.com"

const SOCIAL_IMAGE_ALT =
  "TripCache travel itinerary app for booking emails and cancellation deadlines"
const SOCIAL_IMAGE_VERSION = "20260829"

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  socialTitle?: string
  socialDescription?: string
  keywords?: string[]
}

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = `${title} | TripCache`,
  socialDescription = description,
  keywords,
}: PageMetadataOptions): Metadata {
  const pageUrl = new URL(path, SITE_URL).href

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "TripCache",
      title: socialTitle,
      description: socialDescription,
      url: pageUrl,
      images: [
        {
          url: `/opengraph-image?v=${SOCIAL_IMAGE_VERSION}`,
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [
        {
          url: `/twitter-image?v=${SOCIAL_IMAGE_VERSION}`,
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
  }
}
