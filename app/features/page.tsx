import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/section-container"
import { createPageMetadata } from "@/lib/seo-metadata"
import { featurePages } from "@/lib/seo-page-data"

export const metadata: Metadata = createPageMetadata({
  title: "Email Itinerary, Reminder, and Expense Features",
  description:
    "Explore TripCache features for travel email organization, cancellation deadline reminders, business travel receipts, documents, and expenses.",
  path: "/features",
})

const SITE_URL = "https://trip-cache.com"

type Plan = "Free" | "Pro"

const allFeatures: Array<{ name: string; plan: Plan; description: string }> = [
  {
    name: "Cancellation-deadline reminders",
    plan: "Free",
    description:
      "Save the free-cancellation cutoff for a hotel, rental car, tour or ticket and choose a reminder 7 days, 2 days or 1 day before, or on the day. The booking provider's terms remain the final word.",
  },
  {
    name: "Check-in reminders and check-in shortcut",
    plan: "Free",
    description:
      "TripCache sends a heads-up 48 hours before a flight and another alert at 24 hours. The shortcut copies your booking reference and opens the airline's website; it doesn't check you in.",
  },
  {
    name: "Boarding-pass scanning",
    plan: "Free",
    description: "Scan the QR, PDF417 or Aztec barcode on a boarding pass to add the flight to a trip, or update one you already saved.",
  },
  {
    name: "Document vault",
    plan: "Free",
    description:
      "Keep tickets, boarding passes, passport and visa copies, insurance and hotel files with the trip, behind an optional PIN with Face ID or fingerprint unlock. Storage limits are the same on every plan.",
  },
  {
    name: "Expenses in 153 currencies",
    plan: "Free",
    description:
      "Log trip costs in any of 153 currencies. Each expense keeps the exchange rate from the day you added it, and category budgets show what's left to spend.",
  },
  {
    name: "CSV and PDF export, including a Visa / Immigration Summary",
    plan: "Free",
    description:
      "Export your Travel History, a Visa / Immigration Summary, an expense report or a complete archive as CSV or PDF, filtered by dates and by personal or business trips.",
  },
  {
    name: "CSV import of past flights",
    plan: "Free",
    description:
      "Import past flights from a spreadsheet using TripCache's sample CSV template, which helps when you move your flight history from another app.",
  },
  {
    name: "Offline access",
    plan: "Free",
    description:
      "Trips, flights, bookings and cached documents open without a signal. Changes you make offline sync when you reconnect.",
  },
  {
    name: "Trip map and add to calendar",
    plan: "Free",
    description:
      "See flights, stays and activities on a map (Apple Maps on iPhone, Google Maps on Android), and add a flight with both time zones, or a whole trip, to your phone's calendar.",
  },
  {
    name: "Travel history and trip-card sharing",
    plan: "Free",
    description:
      "Look back at past trips and the countries you visited, and share a trip or flight as an image card with the people you travel with.",
  },
  {
    name: "Booking-email import",
    plan: "Pro",
    description:
      "Forward supported confirmations, including attached PDFs and screenshots, to your own TripCache address. TripCache builds a draft for you to review before saving, within a monthly import allowance.",
  },
  {
    name: "Live flight-status alerts",
    plan: "Pro",
    description:
      "Get alerts for departures, arrivals, delays, and gate, terminal and baggage-belt changes on supported flights. The airline remains the final source.",
  },
  {
    name: "Live Activity, Dynamic Island and widgets",
    plan: "Pro",
    description:
      "Follow a flight in a Live Activity and the Dynamic Island on iPhone, in home-screen widgets on iPhone and Android, or in an ongoing notification on Android.",
  },
]

const featuresSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/features#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Features", item: `${SITE_URL}/features` },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/features#feature-pages`,
      name: "TripCache feature guides",
      itemListElement: featurePages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page.title,
        url: `${SITE_URL}${page.path}`,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/features#all-features`,
      name: "TripCache features by plan",
      itemListElement: allFeatures.map((feature, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${feature.name} (${feature.plan})`,
        description: feature.description,
      })),
    },
  ],
}

export default function FeaturesIndexPage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8] pt-28 text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <script
        id="features-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresSchema).replace(/</g, "\\u003c") }}
      />
      <SectionContainer className="pb-20 pt-8 min-[900px]:pb-28 min-[900px]:pt-12">
        <div className="grid items-end gap-8 min-[880px]:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.65fr)] min-[880px]:gap-16">
          <div>
            <p className="inline-flex items-center rounded-full bg-[#e5dcff] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#602ad2]">TripCache features</p>
            <h1 className="design-one-display-index mt-6 max-w-4xl">Travel organization built from your inbox</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[#626262] min-[880px]:pb-2">
            Start with confirmed bookings, then keep cancellation deadlines, receipts, documents, and trip records in
            one organized place. Cancellation reminders, documents, expenses, and exports are free; booking-email
            import and live flight alerts are part of Pro.
          </p>
        </div>

        <div className="mt-12 grid gap-5 min-[760px]:grid-cols-2 min-[1080px]:grid-cols-3 min-[900px]:mt-14">
          {featurePages.map((page, index) => (
            <Link
              key={page.path}
              href={page.path}
              className={`group flex min-h-[22rem] flex-col justify-between rounded-[30px] p-7 shadow-[0_1px_0_rgba(255,255,255,0.7),0_18px_48px_rgba(72,53,33,0.06)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.8),0_26px_60px_rgba(72,53,33,0.1)] sm:p-8 ${index === 0 ? "bg-[#602ad2] text-white min-[760px]:col-span-2 min-[1080px]:col-span-1" : "bg-white/55 text-[#121212]"}`}
            >
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-white/60" : "bg-[#602ad2]"}`} />
              <div className="mt-16">
                <h2 className="max-w-sm text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">{page.title}</h2>
                <p className={`mt-4 max-w-md leading-7 ${index === 0 ? "text-white/78" : "text-[#666666]"}`}>{page.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Explore feature
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <section id="all-features" aria-labelledby="all-features-heading" className="mt-20 scroll-mt-28 min-[900px]:mt-28">
          <div className="max-w-3xl">
            <h2 id="all-features-heading" className="text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Every TripCache feature, free or Pro
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#626262]">
              TripCache Basic is free and covers most of the app. TripCache Pro adds three things: booking-email
              import, live flight-status alerts, and Live Activity and widgets.{" "}
              <Link href="/pricing" className="font-semibold text-[#4d20af] underline underline-offset-4">
                Compare plans and prices
              </Link>
              .
            </p>
          </div>
          <ul className="mt-10 grid gap-4 min-[760px]:grid-cols-2">
            {allFeatures.map((feature) => (
              <li
                key={feature.name}
                className="rounded-[1.5rem] bg-white/55 p-6 shadow-[0_1px_0_rgba(255,255,255,0.7),0_14px_40px_rgba(72,53,33,0.05)] sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em]">{feature.name}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${feature.plan === "Pro" ? "bg-[#602ad2] text-white" : "bg-[#e5dcff] text-[#4d20af]"}`}
                  >
                    {feature.plan}
                  </span>
                </div>
                <p className="mt-3 leading-7 text-[#666666]">{feature.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl leading-7 text-[#626262]">
            TripCache runs on iPhone with iOS 16.4 or later and on Android 7.0 or later. The app is in English.
          </p>
        </section>
      </SectionContainer>
      <Footer />
    </main>
  )
}
