import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarClock, FileSpreadsheet, MailCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { SectionContainer } from "@/components/section-container"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "About the Post-Booking Travel Organizer",
  description:
    "Learn why TripCache focuses on confirmation emails, cancellation deadlines, travel documents, receipts, and post-trip records.",
  path: "/about",
})

const principles = [
  {
    icon: MailCheck,
    title: "Start with confirmed travel",
    description:
      "TripCache is designed for the moment booking emails and PDFs begin arriving—not for selling flights, hotels, or destination inspiration.",
  },
  {
    icon: CalendarClock,
    title: "Make expensive details visible",
    description:
      "Cancellation cutoffs, flight changes, documents, and receipts should stay attached to the trip instead of disappearing into an inbox.",
  },
  {
    icon: FileSpreadsheet,
    title: "Keep useful records after the trip",
    description:
      "Business and frequent travelers can keep costs and receipts in context, then export structured records when the journey is over.",
  },
]

const SITE_URL = "https://trip-cache.com"

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: "About TripCache",
  description:
    "What TripCache is, who makes it, what is free and what needs Pro, and how the TripCache Editorial Team writes and fact-checks its guides.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  about: { "@id": `${SITE_URL}/#app` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
}

export default function AboutPage() {
  return (
    <main className="journal-paper min-h-screen text-[#121212]">
      <script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema).replace(/</g, "\\u003c") }}
      />
      <SectionContainer className="space-y-16 pb-20 pt-32 sm:pt-36">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="design-one-press inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#5f5f5f] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)] transition-colors hover:text-[#4d20af]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>

        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
            Built for the details that arrive after you book.
          </h1>
          <p className="text-lg leading-8 text-[#666666]">
            Travel information rarely lives in one place. Confirmations sit in email, cancellation policies hide in
            fine print, receipts land in photo libraries, and trip changes arrive through notifications. TripCache
            brings those post-booking details into one itinerary.
          </p>
        </header>

        <section
          id="what-is-tripcache"
          aria-labelledby="what-is-tripcache-heading"
          className="mx-auto max-w-3xl scroll-mt-28 space-y-4 text-lg leading-8 text-[#555555]"
        >
          <h2 id="what-is-tripcache-heading" className="text-3xl font-semibold tracking-[-0.04em] text-[#121212]">
            What is TripCache?
          </h2>
          <p>
            TripCache is a post-booking travel organizer app for iPhone (iOS 16.4 or later) and Android (7.0 or later).
            It keeps the details that arrive after you book (flights, stays, cancellation deadlines, travel documents
            and trip expenses) together in one itinerary.
          </p>
          <p>
            TripCache Basic is free. It includes cancellation-deadline and check-in reminders, boarding-pass scanning, a
            document vault with an optional PIN and Face ID or fingerprint unlock, expenses in 153 currencies, CSV and
            PDF export, CSV import of past flights, a trip map and offline access. TripCache Pro adds booking-email
            import, live flight-status alerts on supported flights, and Live Activity and widgets for $5.99 a month, or
            $49.99 a year on Google Play and $50.00 on the App Store (US prices, October 2026).
          </p>
          <p>
            TripCache is an independent app. It isn&apos;t made by Sabre and has no connection to TripCase, the Sabre
            itinerary app that shut down in 2025.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <article key={principle.title} className="rounded-[28px] bg-white/48 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8e0ff] text-[#602ad2]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{principle.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#666666]">{principle.description}</p>
              </article>
            )
          })}
        </section>

        <section id="editorial-standards" className="scroll-mt-28 rounded-[32px] bg-white/48 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)] sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4d20af]">Editorial standards</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">How we write and fact-check TripCache guides</h2>
            <p className="mt-5 leading-7 text-[#666666]">
              Guides on trip-cache.com are published by TripCache, the maker of the TripCache app, under the TripCache
              Editorial Team byline. We write practical guidance about post-booking travel organization, and we check changeable
              prices, product features, shutdown dates and policies against official product pages, store listings,
              help centers or government sources before relying on them.
            </p>
            <ul className="mt-6 list-disc space-y-3 ps-5 leading-7 text-[#666666]">
              <li>
                Claims about TripCache, including what is free and what needs Pro, are checked against the current app
                and its App Store and Google Play listings.
              </li>
              <li>Prices and features of other apps come from their official websites or store listings, with the date we checked them.</li>
              <li>Material claims link to a source that lets readers verify the detail.</li>
              <li>
                Because we make TripCache, comparisons say so, explain where TripCache is not the best fit, and avoid
                unsupported superiority claims.
              </li>
              <li>We don&apos;t publish invented statistics, testimonials or ratings.</li>
              <li>Publication and update dates stay visible, and substantive corrections receive a new review date.</li>
              <li>Product screenshots and descriptions reflect features available in the current app.</li>
              <li>
                Questions or correction requests can be sent to{" "}
                <a className="font-semibold text-[#4d20af] underline underline-offset-4" href="mailto:support@trip-cache.com">
                  support@trip-cache.com
                </a>
                .
              </li>
            </ul>
          </div>
        </section>

        <section className="rounded-[32px] bg-[#121212] p-8 text-[#f7f2e9] shadow-[0_28px_70px_rgba(64,47,30,0.16)] sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold">TripCache is available now on iPhone and Android.</h2>
              <p className="mt-3 max-w-2xl text-[#b9b0a3]">
                Start with the free Basic plan, which already includes cancellation-deadline and check-in reminders, the
                document vault, expenses, and CSV or PDF export. Upgrade to Pro in the app if booking-email import, live
                flight-status alerts on supported flights, and Live Activity fit your travel routine.
              </p>
              <p className="mt-4 text-sm text-[#b9b0a3]">
                Questions? Email{" "}
                <a className="font-semibold text-[#a98af0]" href="mailto:support@trip-cache.com">
                  support@trip-cache.com
                </a>
                .
              </p>
            </div>
            <GetStartedModal triggerLabel="Download TripCache" triggerClassName="h-11 rounded-full px-6" />
          </div>
        </section>
      </SectionContainer>
      <Footer />
    </main>
  )
}
