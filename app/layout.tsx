import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://tripcache.app"),
  title: {
    default: "TripCache - Smart Flight & Trip Itinerary Manager | TripCase Alternative",
    template: "%s | TripCache",
  },
  description:
    "Free travel itinerary manager & best TripCase alternative 2025. Organize trips, track flights, store documents. Start free, upgrade to Pro ($9.99/month) for email-to-trip automation & flight updates.",
  keywords: [
    "TripCase alternative",
    "free travel itinerary manager",
    "flight tracker app",
    "trip organizer",
    "travel planner app",
    "email to trip automation",
    "travel document organizer",
    "business travel expense tracking",
    "TripIt alternative free",
    "automatic flight tracking",
    "email flight parser",
    "travel itinerary app",
    "trip management software",
    "digital nomad tools",
    "flight booking organizer",
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
    url: "https://tripcache.app",
    title: "TripCache - Smart Flight & Trip Itinerary Manager",
    description:
      "The best TripCase alternative. Manage travel itineraries with email automation and CSV reports. Free forever.",
    siteName: "TripCache",
    images: [
      {
        url: "/app-screenshot-home.jpg",
        width: 1200,
        height: 630,
        alt: "TripCache App Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TripCache - Smart Flight & Trip Itinerary Manager",
    description: "The best TripCase alternative. Manage travel itineraries with email automation and CSV reports.",
    images: ["/app-screenshot-home.jpg"],
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
    google: "google-site-verification=PLACEHOLDER_UPDATE_IN_SEARCH_CONSOLE",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TripCache",
              url: "https://tripcache.app",
              logo: "https://tripcache.app/app-icon.png",
              description: "Smart flight and trip itinerary manager",
              sameAs: [
                "https://twitter.com/tripcache",
                "https://github.com/tripcache",
                "https://linkedin.com/company/tripcache",
              ],
            }),
          }}
        />
        <Script
          id="webapp-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "TripCache",
              url: "https://tripcache.app",
              applicationCategory: "TravelApplication",
              operatingSystem: "iOS, Android, Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
            }),
          }}
        />
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${jakarta.className} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <Navigation />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
