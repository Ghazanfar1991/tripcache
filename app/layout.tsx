import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { Navigation } from "@/components/navigation"
import { Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "PLACEHOLDER_UPDATE_IN_SEARCH_CONSOLE"
const SITE_URL = "https://trip-cache.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TripCache - AI Travel Inbox & Cancellation Reminder Platform",
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "TripCache - AI Travel Inbox & Cancellation Reminder Platform",
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
    title: "TripCache - AI Travel Inbox & Cancellation Reminder Platform",
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
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* Fallback preconnects */}

        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TripCache",
              url: "https://trip-cache.com",
              logo: "https://trip-cache.com/app-icon.png",
              description:
                "TripCache helps travelers turn confirmation emails into organized itineraries while tracking cancellation reminders, documents, receipts, and expenses.",
              sameAs: [
                "https://twitter.com/tripcache",
                "https://github.com/tripcache",
                "https://linkedin.com/company/tripcache",
              ],
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TripCache",
              url: "https://trip-cache.com",
              description:
                "Travel organization guides and app information for TripCache, an AI travel inbox and cancellation reminder platform for confirmation emails, documents, receipts, and expenses.",
              publisher: {
                "@type": "Organization",
                name: "TripCache",
              },
            }),
          }}
        />
        <Script
          id="software-application-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TripCache",
              applicationCategory: "TravelApplication",
              operatingSystem: "iOS, Android",
              url: "https://trip-cache.com",
              image: "https://trip-cache.com/app-icon.png",
              description:
                "TripCache turns travel confirmation emails into organized itineraries with cancellation reminders, secure documents, receipts, and expense records.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body suppressHydrationWarning className={`${outfit.variable} font-sans antialiased`}>
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
