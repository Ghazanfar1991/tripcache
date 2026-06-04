import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "PLACEHOLDER_UPDATE_IN_SEARCH_CONSOLE";
const SITE_URL = "https://trip-cache.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "TripCache - Travel Itinerary, Document & Cancellation Reminder App",
    template: "%s | TripCache",
  },
  description:
    "Organize travel confirmation emails, flights, hotels, rental cars, tickets, secure documents, free-cancellation reminders, trip maps, and expenses in one itinerary app.",
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
    "booking cancellation reminder",
    "hotel cancellation reminder app",
    "travel document organizer app",
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
    url: SITE_URL,
    title: "TripCache - Travel Itinerary, Document & Cancellation Reminder App",
    description:
      "Manage confirmation emails, flights, stays, rental cars, tickets, documents, reminders, maps, and expenses in one travel app.",
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
    title: "TripCache - Travel Itinerary, Document & Cancellation Reminder App",
    description:
      "Organize confirmation emails, trips, documents, flight updates, expenses, and cancellation reminders.",
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
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TripCache",
              url: "https://trip-cache.com",
              logo: "https://trip-cache.com/app-icon.png",
              description:
                "TripCache helps travelers organize confirmation emails, itineraries, cancellation reminders, secure documents, maps, and expenses.",
              sameAs: [
                "https://twitter.com/tripcache",
                "https://github.com/tripcache",
                "https://linkedin.com/company/tripcache",
              ],
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
              name: "TripCache",
              url: "https://trip-cache.com",
              description:
                "Travel organization guides and app information for TripCache, a travel itinerary app for confirmation emails, documents, reminders, maps, and expenses.",
              publisher: {
                "@type": "Organization",
                name: "TripCache",
              },
            }),
          }}
        />
        <link rel="manifest" href="/manifest.json" />
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
  );
}
