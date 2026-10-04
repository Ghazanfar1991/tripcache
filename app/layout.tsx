import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import { Allura, Fraunces, Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { StoreLinkAnalytics } from "@/components/store-link-analytics"
import "./globals.css"
import "./design-one.css"

const DEFAULT_GA_MEASUREMENT_ID = "G-JP6JKPVPVY"
const configuredGaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID
const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(configuredGaMeasurementId) && configuredGaMeasurementId !== "G-XXXX"
  ? configuredGaMeasurementId
  : DEFAULT_GA_MEASUREMENT_ID
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const SITE_URL = "https://trip-cache.com"
const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"
const IS_VERCEL_DEPLOYMENT = process.env.VERCEL === "1"
const INSTAGRAM_URL = "https://www.instagram.com/tripcache/"
const EDITORIAL_STANDARDS_URL = `${SITE_URL}/about#editorial-standards`
const PRICING_URL = `${SITE_URL}/pricing`
const US_REGION = { "@type": "Country", name: "US" }

// Site-wide entity graph. Blog posts reference #organization, #website, #app and
// /about#editorial-team by @id, so those nodes must be defined here.
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "TripCache",
      url: SITE_URL,
      logo: `${SITE_URL}/app-icon-violet-indigo.webp`,
      description:
        "TripCache makes a post-booking travel organizer app for iPhone and Android that keeps trips, cancellation deadlines, travel documents and expenses together. Basic is free; TripCache Pro adds booking-email import and live flight-status alerts.",
      email: "support@trip-cache.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@trip-cache.com",
        availableLanguage: "English",
      },
      sameAs: [IOS_STORE_URL, ANDROID_STORE_URL, INSTAGRAM_URL],
      publishingPrinciples: EDITORIAL_STANDARDS_URL,
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/about#editorial-team`,
      name: "TripCache Editorial Team",
      url: `${SITE_URL}/about`,
      description: "The byline TripCache uses for the travel guides and app comparisons it publishes on trip-cache.com.",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      publishingPrinciples: EDITORIAL_STANDARDS_URL,
    },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "TripCache",
  url: SITE_URL,
  description:
    "Official product information and travel organization guides for TripCache, a post-booking travel organizer for confirmations, cancellation deadlines, documents, receipts, and expenses.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
}

const proFeatureSummary =
  "Pro adds booking-email import with a monthly allowance, live flight-status alerts on supported flights, and Live Activity, Dynamic Island and widgets."

const mobileApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": `${SITE_URL}/#app`,
  name: "TripCache",
  applicationCategory: "TravelApplication",
  applicationSubCategory: "Travel itinerary and post-booking organizer",
  operatingSystem: "iOS 16.4+, Android 7.0+",
  url: SITE_URL,
  image: `${SITE_URL}/app-icon-violet-indigo.webp`,
  description:
    "TripCache is a post-booking travel organizer for iPhone and Android. The free Basic plan includes cancellation-deadline and check-in reminders, boarding-pass scanning, a document vault, expenses and CSV or PDF export. TripCache Pro adds booking-email import and live flight-status alerts on supported flights.",
  downloadUrl: [IOS_STORE_URL, ANDROID_STORE_URL],
  inLanguage: "en",
  featureList: [
    "Trips with flights, stays, rental cars, trains, buses, parking, events, restaurants, tours and meetings (Basic, free)",
    "Cancellation-deadline reminders 7 days, 2 days or 1 day before, or on the day (Basic, free)",
    "Check-in reminders 48 and 24 hours before departure, with a check-in shortcut (Basic, free)",
    "Boarding-pass barcode scanning (Basic, free)",
    "Document vault with an optional PIN and Face ID or fingerprint unlock (Basic, free)",
    "Expenses in 153 currencies with locked exchange rates and category budgets (Basic, free)",
    "CSV and PDF export, including Travel History and a Visa / Immigration Summary (Basic, free)",
    "CSV import of past flights (Basic, free)",
    "Trip map and travel history (Basic, free)",
    "Offline access to trips and cached documents (Basic, free)",
    "Add flights and trips to the phone's calendar (Basic, free)",
    "Trip-card and flight-card image sharing (Basic, free)",
    "Booking-email import with a monthly allowance (Pro)",
    "Live flight-status alerts on supported flights (Pro)",
    "Live Activity, Dynamic Island and home-screen widgets (Pro)",
  ],
  provider: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: [
    {
      "@type": "Offer",
      name: "TripCache Basic",
      description:
        "Free plan: cancellation-deadline and check-in reminders, boarding-pass scanning, the document vault, expenses in 153 currencies, CSV and PDF export, CSV import, trip map, travel history and offline access. Storage limits are the same on every plan.",
      price: "0",
      priceCurrency: "USD",
      url: PRICING_URL,
    },
    {
      "@type": "Offer",
      name: "TripCache Pro Monthly",
      description: `Monthly subscription on the App Store and Google Play. ${proFeatureSummary}`,
      price: "5.99",
      priceCurrency: "USD",
      eligibleRegion: US_REGION,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "5.99",
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
      url: PRICING_URL,
    },
    {
      "@type": "Offer",
      name: "TripCache Pro Yearly (Google Play)",
      description: `Yearly subscription bought through Google Play. ${proFeatureSummary}`,
      price: "49.99",
      priceCurrency: "USD",
      eligibleRegion: US_REGION,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "49.99",
        priceCurrency: "USD",
        billingDuration: "P1Y",
      },
      url: ANDROID_STORE_URL,
    },
    {
      "@type": "Offer",
      name: "TripCache Pro Yearly (App Store)",
      description: `Yearly subscription bought through the App Store. ${proFeatureSummary}`,
      price: "50.00",
      priceCurrency: "USD",
      eligibleRegion: US_REGION,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "50.00",
        priceCurrency: "USD",
        billingDuration: "P1Y",
      },
      url: IOS_STORE_URL,
    },
  ],
}

const toJsonLd = (schema: object) => JSON.stringify(schema).replace(/</g, "\\u003c")

// The app's own type system: Fraunces display, Inter body, Allura for the "Trip to" script.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz", "SOFT"], display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const allura = Allura({ subsets: ["latin"], weight: "400", variable: "--font-allura", display: "swap" })

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
  manifest: "/manifest.webmanifest",
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
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TripCache travel itinerary app for booking emails and cancellation deadlines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TripCache - Post-Booking Travel Organizer",
    description: "Forward travel emails, get organized itineraries, and track cancellation deadlines.",
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: "TripCache travel itinerary app for booking emails and cancellation deadlines",
      },
    ],
  },
  icons: {
    icon: "/app-icon-violet-indigo.webp",
    shortcut: "/app-icon-violet-indigo.webp",
    apple: "/app-icon-violet-indigo.webp",
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
    <html lang="en" data-scroll-behavior="smooth" className={`light ${fraunces.variable} ${inter.variable} ${allura.variable}`} suppressHydrationWarning>
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema) }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema) }}
        />
        <script
          id="software-application-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(mobileApplicationSchema) }}
        />
        <meta name="theme-color" content="#f4f0e8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body suppressHydrationWarning className="bg-[#f4f0e8] font-sans text-[#121212] antialiased">
        <a
          href="#main-content"
          className="fixed start-4 top-3 z-[60] -translate-y-24 rounded-full bg-[#121212] px-4 py-2 text-sm font-semibold text-[#f7f2e9] transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navigation />
        <StoreLinkAnalytics />
        <div id="main-content" tabIndex={-1}>{children}</div>
        {IS_VERCEL_DEPLOYMENT ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
        {GA_MEASUREMENT_ID ? (
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });

              (function deferGoogleAnalytics() {
                var loaded = false;
                var events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
                var load = function() {
                  if (loaded) return;
                  loaded = true;
                  events.forEach(function(eventName) {
                    window.removeEventListener(eventName, load);
                  });
                  var script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
                  document.head.appendChild(script);
                };

                events.forEach(function(eventName) {
                  window.addEventListener(eventName, load, { passive: true, once: true });
                });
                window.setTimeout(load, 15000);
              })();
            `}
          </Script>
        ) : null}
      </body>
    </html>
  )
}
