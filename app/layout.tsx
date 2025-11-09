import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://tripcache.app"),
  title: {
    default: "TripCache - Smart Flight & Trip Itinerary Manager | TripCase Alternative",
    template: "%s | TripCache",
  },
  description:
    "The best TripCase alternative for 2025. Effortlessly manage travel itineraries with email-to-trip automation, CSV reports, and document storage. Free forever.",
  keywords: [
    "TripCase alternative",
    "travel itinerary manager",
    "flight tracker",
    "trip organizer",
    "travel planner app",
    "email to trip",
    "travel document storage",
    "expense tracking",
    "business travel",
    "TripIt alternative",
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
    google: "your-google-verification-code",
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
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark">
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
