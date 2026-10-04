import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { Breadcrumbs, Card, Container, CtaBand, PageHero, Pill, Section, SitePage } from "@/components/site/kit"
import { IconTile, PhoneShot, productScreen, productTone } from "@/components/site/product-ui"
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
    <>
      <SitePage>
        <script
          id="features-page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresSchema).replace(/</g, "\\u003c") }}
        />
        <PageHero
          align="center"
          breadcrumb={<Breadcrumbs align="center" items={[{ name: "Home", href: "/" }, { name: "Features" }]} />}
          title="Travel organization built from your inbox"
          lede={
            <p>
              Start with confirmed bookings, then keep cancellation deadlines, receipts, documents, and trip records in
              one organized place. Cancellation reminders, documents, expenses, and exports are free; booking-email
              import and live flight alerts are part of Pro.
            </p>
          }
        />

        <section className="bg-tc-canvas pb-24 pt-2 sm:pb-32">
          <Container>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featurePages.map((page) => {
                const tone = productTone(page.slug)
                const screen = productScreen(page)
                return (
                  <li key={page.path} className="flex">
                    <Link href={page.path} className="group flex w-full rounded-[26px]">
                      <Card interactive bloom={tone.bloom} className="flex w-full flex-col [&>div:last-child]:flex [&>div:last-child]:flex-1 [&>div:last-child]:flex-col">
                        <div className="px-6 pt-7 sm:px-8 sm:pt-8">
                          <IconTile icon={tone.icon} tone={tone.tile} />
                          <h2 className="mt-8 text-balance font-tc-display text-[25px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[28px]">
                            {page.title}
                          </h2>
                          <p className="mt-3 text-[15.5px] leading-7 text-tc-mute">{page.description}</p>
                          <span className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-tc-violet">
                            Explore feature
                            <ArrowRight
                              className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div aria-hidden="true" className="relative mt-auto h-[260px] overflow-hidden pt-10">
                          <div className="mx-auto w-[220px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 motion-reduce:transition-none">
                            <PhoneShot src={screen.src} alt="" sizes="220px" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Container>
        </section>

        <Section id="all-features" aria-labelledby="all-features-heading" className="scroll-mt-28">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
              <h2
                id="all-features-heading"
                className="text-balance font-tc-display text-[clamp(30px,3.8vw,50px)] font-semibold leading-[1.06] tracking-[-0.02em] text-tc-ink"
              >
                Every TripCache feature, free or Pro
              </h2>
              <p className="max-w-[58ch] text-pretty text-[17px] leading-8 text-tc-ink-2">
                TripCache Basic is free and covers most of the app. TripCache Pro adds three things: booking-email
                import, live flight-status alerts, and Live Activity and widgets.{" "}
                <Link
                  href="/pricing"
                  className="font-semibold text-tc-violet underline decoration-tc-violet/30 underline-offset-4 transition-colors hover:decoration-tc-violet"
                >
                  Compare plans and prices
                </Link>
                .
              </p>
            </div>
            <ul className="mt-12 grid gap-4 md:grid-cols-2">
              {allFeatures.map((feature) => (
                <li
                  key={feature.name}
                  className="rounded-[22px] border border-tc-line bg-white p-6 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-tc-display text-[19px] font-semibold leading-snug tracking-[-0.01em] text-tc-ink sm:text-[21px]">
                      {feature.name}
                    </h3>
                    <Pill tone={feature.plan === "Pro" ? "pro" : "violet"} className="mt-0.5 shrink-0">
                      {feature.plan}
                    </Pill>
                  </div>
                  <p className="mt-3 text-[15.5px] leading-7 text-tc-mute">{feature.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[62ch] text-[15.5px] leading-7 text-tc-mute">
              TripCache runs on iPhone with iOS 16.4 or later and on Android 7.0 or later. The app is in English.
            </p>
          </Container>
        </Section>

        <CtaBand placement="features_index_cta_band" />
      </SitePage>
      <Footer />
    </>
  )
}
