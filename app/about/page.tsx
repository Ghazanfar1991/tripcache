import "../secondary.css"

import type { Metadata } from "next"
import Image from "next/image"
import { ArrowLeft, CalendarClock, Check, FileSpreadsheet, Mail, MailCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { ButtonLink, Card, Container, CtaBand, PageHero, Section, SitePage } from "@/components/site/kit"
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

const principleBlooms = ["#8b5cf6", "#f59e0b", "#12b76a"]

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

const editorialStandards = [
  "Claims about TripCache, including what is free and what needs Pro, are checked against the current app and its App Store and Google Play listings.",
  "Prices and features of other apps come from their official websites or store listings, with the date we checked them.",
  "Material claims link to a source that lets readers verify the detail.",
  "Because we make TripCache, comparisons say so, explain where TripCache is not the best fit, and avoid unsupported superiority claims.",
  "We don't publish invented statistics, testimonials or ratings.",
  "Publication and update dates stay visible, and substantive corrections receive a new review date.",
  "Product screenshots and descriptions reflect features available in the current app.",
]

function StandardCheck() {
  return (
    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-tc-violet-soft text-tc-violet">
      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
    </span>
  )
}

const mailLinkClass =
  "font-semibold text-tc-violet underline decoration-tc-violet/30 underline-offset-4 transition-colors hover:decoration-tc-violet"

export default function AboutPage() {
  return (
    <SitePage>
      <script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema).replace(/</g, "\\u003c") }}
      />
      <PageHero
        title="Built for the details that arrive after you book."
        lede={
          <p>
            Travel information rarely lives in one place. Confirmations sit in email, cancellation policies hide in
            fine print, receipts land in photo libraries, and trip changes arrive through notifications. TripCache
            brings those post-booking details into one itinerary.
          </p>
        }
        aside={
          <div className="relative mx-auto max-w-[460px] lg:max-w-none">
            <Image
              src="/brand-suitcase-pass.webp"
              alt=""
              width={900}
              height={750}
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="h-auto w-full drop-shadow-[0_34px_40px_rgba(45,27,87,0.22)]"
            />
          </div>
        }
      >
        <ButtonLink href="/" variant="secondary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back home
        </ButtonLink>
      </PageHero>

      <Section
        id="what-is-tripcache"
        aria-labelledby="what-is-tripcache-heading"
        tone="canvas"
        className="scroll-mt-28 pb-10 pt-4 sm:pb-12 sm:pt-8"
      >
        <Container className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2
            id="what-is-tripcache-heading"
            className="text-balance font-tc-display text-[clamp(30px,3.8vw,50px)] font-semibold leading-[1.06] tracking-[-0.02em] text-tc-ink"
          >
            What is TripCache?
          </h2>
          <div className="max-w-[62ch] space-y-4 text-pretty text-[17px] leading-8 text-tc-ink-2">
            <p>
              TripCache is a post-booking travel organizer app for iPhone (iOS 16.4 or later) and Android (7.0 or
              later). It keeps the details that arrive after you book (flights, stays, cancellation deadlines, travel
              documents and trip expenses) together in one itinerary.
            </p>
            <p>
              TripCache Basic is free. It includes cancellation-deadline and check-in reminders, boarding-pass
              scanning, a document vault with an optional PIN and Face ID or fingerprint unlock, expenses in 153
              currencies, CSV and PDF export, CSV import of past flights, a trip map and offline access. TripCache Pro
              adds booking-email import, live flight-status alerts on supported flights, and Live Activity and widgets
              for $5.99 a month, or $49.99 a year on Google Play and $50.00 on the App Store (US prices, October
              2026).
            </p>
            <p>
              TripCache is an independent app. It isn&apos;t made by Sabre and has no connection to TripCase, the
              Sabre itinerary app that shut down in 2025.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" className="pt-4 sm:pt-6">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <Card key={principle.title} as="li" bloom={principleBlooms[index]} className="h-full p-6 sm:p-8">
                  <span className="grid size-11 place-items-center rounded-[12px] bg-tc-violet-soft text-tc-violet">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-tc-display text-[23px] font-semibold leading-[1.18] tracking-[-0.015em] text-tc-ink sm:text-[25px]">{principle.title}</h2>
                  <p className="mt-3 text-[15.5px] leading-7 text-tc-mute">{principle.description}</p>
                </Card>
              )
            })}
          </ul>
        </Container>
      </Section>

      <Section id="editorial-standards" className="scroll-mt-28">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div id="editorial-team" className="scroll-mt-28">
            <h2 className="text-balance font-tc-display text-[clamp(30px,3.8vw,50px)] font-semibold leading-[1.06] tracking-[-0.02em] text-tc-ink">
              How we write and fact-check TripCache guides
            </h2>
            <p className="mt-5 max-w-[56ch] text-pretty text-[17px] leading-8 text-tc-ink-2">
              Guides on trip-cache.com are published by TripCache, the maker of the TripCache app, under the TripCache
              Editorial Team byline. We write practical guidance about post-booking travel organization, and we check
              changeable prices, product features, shutdown dates and policies against official product pages, store
              listings, help centers or government sources before relying on them.
            </p>
          </div>
          <div>
            <h3 className="font-tc-display text-[19px] font-semibold text-tc-ink sm:text-[21px]">Editorial standards</h3>
            <ul className="mt-4 border-t border-tc-line">
              {editorialStandards.map((item) => (
                <li key={item} className="flex gap-3.5 border-b border-tc-line py-4 text-[16px] leading-7 text-tc-ink-2">
                  <StandardCheck />
                  {item}
                </li>
              ))}
              <li className="flex gap-3.5 border-b border-tc-line py-4 text-[16px] leading-7 text-tc-ink-2">
                <StandardCheck />
                <span>
                  Questions or correction requests can be sent to{" "}
                  <a className={mailLinkClass} href="mailto:support@trip-cache.com">
                    support@trip-cache.com
                  </a>
                  .
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="support" tone="canvas" className="scroll-mt-28">
        <Container>
          <Card bloom="#8b5cf6" className="p-6 sm:p-10 lg:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                <h2 className="text-balance font-tc-display text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.1] tracking-[-0.02em] text-tc-ink">
                  TripCache is available now on iPhone and Android.
                </h2>
                <p className="mt-4 max-w-[60ch] text-pretty text-[17px] leading-8 text-tc-ink-2">
                  Start with the free Basic plan, which already includes cancellation-deadline and check-in reminders,
                  the document vault, expenses, and CSV or PDF export. Upgrade to Pro in the app if booking-email
                  import, live flight-status alerts on supported flights, and Live Activity fit your travel routine.
                </p>
                <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15.5px] text-tc-mute">
                  <Mail className="size-4 text-tc-violet" aria-hidden="true" />
                  <span>
                    Questions? Email{" "}
                    <a className={mailLinkClass} href="mailto:support@trip-cache.com">
                      support@trip-cache.com
                    </a>{" "}
                    or follow{" "}
                    <a className={mailLinkClass} href="https://www.instagram.com/tripcache/" target="_blank" rel="me noopener noreferrer">
                      @tripcache on Instagram
                    </a>
                    .
                  </span>
                </p>
              </div>
              <GetStartedModal
                triggerLabel="Download TripCache"
                triggerClassName="tc-press h-12 rounded-[12px] bg-tc-violet px-6 text-[15.5px] shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] hover:bg-[#5520cb] hover:shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] sm:px-6 sm:text-[15.5px] justify-self-start"
              />
            </div>
          </Card>
        </Container>
      </Section>

      <CtaBand placement="about" />
      <Footer />
    </SitePage>
  )
}
