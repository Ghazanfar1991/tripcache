import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const configuredGaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(configuredGaMeasurementId) && configuredGaMeasurementId !== "G-XXXX"
  ? configuredGaMeasurementId
  : null
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const SITE_URL = "https://trip-cache.com"
const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TripCache - Post-Booking Travel Organizer",
    template: "%s | TripCache",
  },
  description:
    "Forward travel emails to TripCache, get organized itineraries, track hotel cancellation deadlines, and manage travel documents, receipts, and expenses.",
  keywords: [
    "TripCase alternative",
    "TripIt alternative",
    "travel email organizer",
    "email to itinerary app",
    "hotel cancellation reminder",
    "booking cancellation deadline reminder",
    "business travel organizer",
    "travel receipt organizer",
    "travel expense tracker",
    "email to trip automation",
    "travel confirmation email organizer",
  ],
  authors: [{ name: "TripCache Team" }],
  creator: "TripCache",
  publisher: "TripCache",
  category: "travel",
  manifest: "/manifest.json",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "TripCache - Post-Booking Travel Organizer",
    description:
      "Forward travel emails, get organized itineraries, track cancellation deadlines, and keep receipts and documents together.",
    siteName: "TripCache",
    images: [
      {
        url: "/app-feature-add-everything.webp",
        width: 1200,
        height: 630,
        alt: "TripCache App Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TripCache - Post-Booking Travel Organizer",
    description: "Forward travel emails, get organized itineraries, and never miss cancellation deadlines.",
    images: ["/app-feature-add-everything.webp"],
    creator: "@tripcache",
  },
  icons: {
    icon: "/app-icon.png",
    shortcut: "/app-icon.png",
    apple: "/app-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: GOOGLE_SITE_VERIFICATION
    ? {
        google: GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  other: {
    "apple-itunes-app": "app-id=6758403056",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {GA_MEASUREMENT_ID ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        ) : null}

        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "TripCache",
              url: SITE_URL,
              logo: `${SITE_URL}/app-icon.png`,
              description:
                "TripCache helps travelers turn confirmation emails into organized itineraries while tracking cancellation reminders, documents, receipts, and expenses.",
              email: "support@trip-cache.com",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "support@trip-cache.com",
                availableLanguage: "English",
              },
            }),
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: "TripCache",
              url: SITE_URL,
              description:
                "Official product information and travel organization guides for TripCache, a post-booking travel organizer for confirmations, cancellation deadlines, documents, receipts, and expenses.",
              publisher: { "@id": `${SITE_URL}/#organization` },
              inLanguage: "en",
            }),
          }}
        />
        <script
          id="software-application-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              "@id": `${SITE_URL}/#app`,
              name: "TripCache",
              applicationCategory: "TravelApplication",
              applicationSubCategory: "Travel itinerary and post-booking organizer",
              operatingSystem: "iOS, Android",
              url: SITE_URL,
              image: `${SITE_URL}/app-icon.png`,
              description:
                "TripCache turns travel confirmation emails into organized itineraries with cancellation reminders, secure documents, receipts, and expense records.",
              downloadUrl: [IOS_STORE_URL, ANDROID_STORE_URL],
              featureList: [
                "Booking confirmation email import",
                "Travel itinerary organization",
                "Free-cancellation deadline reminders",
                "Travel documents and receipts",
                "Flight status context",
                "Travel expense records and CSV export",
              ],
              provider: { "@id": `${SITE_URL}/#organization` },
              offers: {
                "@type": "Offer",
                name: "TripCache Basic",
                price: "0",
                priceCurrency: "USD",
                url: `${SITE_URL}/pricing`,
              },
            }),
          }}
        />
        <meta name="theme-color" content="#0891b2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <ThemeProvider defaultTheme="dark">
          <Navigation />
          {children}
          <Analytics />
          <SpeedInsights />
          {GA_MEASUREMENT_ID ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
            </>
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  )
}
