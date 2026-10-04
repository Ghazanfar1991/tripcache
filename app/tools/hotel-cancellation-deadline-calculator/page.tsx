import "../../secondary.css"
import "../tools.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BellRing, BookOpen, Check, CheckCircle2, MailCheck, Plus } from "lucide-react"

import { Footer } from "@/components/footer"
import { HotelCancellationCalculator } from "@/components/seo/hotel-cancellation-calculator"
import { Breadcrumbs, ButtonLink, Container, CtaBand, DarkPanel, PageHero, Section, SectionHeading, SitePage } from "@/components/site/kit"
import { createPageMetadata } from "@/lib/seo-metadata"

export const instant = false

const BASE_URL = "https://trip-cache.com"
const PAGE_PATH = "/tools/hotel-cancellation-deadline-calculator"

const faqs = [
  {
    question: "How do I calculate a hotel cancellation deadline?",
    answer:
      "Start with the hotel check-in date, the cancellation policy window, the local cutoff time, and the hotel time zone. The calculator subtracts the policy window from the local cutoff time.",
  },
  {
    question: "Why does the hotel time zone matter?",
    answer:
      "Many policies are based on the property's local time. A 6 PM deadline in Sydney, London, or New York can be a different date and time for the traveler.",
  },
  {
    question: "Should I set more than one reminder?",
    answer:
      "Yes. For refundable bookings, set reminders two days before, one day before, and a final same-day backup so you have time to cancel or rebook.",
  },
]

export const metadata: Metadata = createPageMetadata({
  title: "Hotel Cancellation Deadline Calculator",
  description:
    "Calculate hotel free-cancellation deadlines by check-in date, policy window, cutoff time, and hotel time zone, then copy a reminder summary.",
  keywords: [
    "hotel cancellation deadline calculator",
    "hotel cancellation reminder",
    "free cancellation deadline",
    "booking cancellation tracker",
  ],
  path: PAGE_PATH,
  socialDescription:
    "Calculate the deadline for refundable hotel bookings and create reminder timing before free cancellation closes.",
})

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function HotelCancellationDeadlineCalculatorPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = (await searchParams) ?? {}
  const calculatorValues = {
    hotelName: firstParam(params.hotelName),
    checkInDate: firstParam(params.checkInDate),
    cutoffTime: firstParam(params.cutoffTime),
    policyHours: firstParam(params.policyHours),
    timeZone: firstParam(params.timeZone),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${BASE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hotel Cancellation Deadline Calculator",
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <SitePage>
      <script
        id="hotel-cancellation-calculator-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <script
        id="hotel-cancellation-calculator-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />

      <PageHero
        breadcrumb={
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Tools", href: "/tools" }, { name: "Hotel cancellation deadline calculator" }]} />
        }
        title="Hotel cancellation deadline calculator"
        lede={
          <p>
            Calculate the latest time to cancel a refundable hotel booking using the check-in date, policy window,
            cutoff time, and hotel time zone.
          </p>
        }
      >
        <ButtonLink href="/download" size="lg">
          Use TripCache for reminders
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/features/cancellation-reminders" variant="secondary" size="lg">
          See cancellation reminders
        </ButtonLink>
        <p className="flex basis-full items-center gap-2 pt-1 text-[14px] font-medium text-tc-ink-2">
          <CheckCircle2 className="size-4 text-[#067647]" aria-hidden="true" />
          Free cancellation deadline tool
        </p>
      </PageHero>

      <section className="relative bg-tc-canvas pb-20 pt-2 sm:pb-28">
        <Container>
          <HotelCancellationCalculator values={calculatorValues} />
        </Container>
      </section>

      <section className="bg-white px-3 py-16 sm:px-5 sm:py-24">
        <DarkPanel className="mx-auto max-w-[1240px]">
          <div className="grid gap-10 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16">
            <h2 className="text-balance font-tc-display text-[clamp(30px,3.8vw,50px)] font-semibold leading-[1.06] tracking-[-0.02em]">
              Most missed deadlines happen because the cutoff is hidden in the confirmation.
            </h2>
            <div>
              <h3 className="font-tc-display text-[19px] font-semibold text-white sm:text-[21px]">How policies usually work</h3>
              <ul className="mt-5 grid gap-2.5">
                {[
                  "Free cancellation until 6 PM local hotel time.",
                  "Cancel 24 hours before check-in.",
                  "Cancel 48 or 72 hours before arrival.",
                  "Non-refundable after a specific local date.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 rounded-[16px] border border-white/10 bg-white/[0.05] px-4 py-4 text-[16px] font-medium leading-7 text-white/90 sm:px-5"
                  >
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-[#12b76a]/20 text-[#5ee4a5]">
                      <Check className="size-3.5" strokeWidth={2.8} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DarkPanel>
      </section>

      <Section className="pt-8 sm:pt-12">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-balance font-tc-display text-[clamp(32px,4vw,50px)] font-semibold leading-[1.05] tracking-[-0.02em] text-tc-ink">
              Hotel cancellation FAQ
            </h2>
            <p className="mt-5 max-w-[42ch] text-[17px] leading-8 text-tc-ink-2">
              Use this calculator as a planning helper, then confirm the final deadline against the provider or hotel
              confirmation. Our{" "}
              <Link
                href="/blog/hotel-cancellation-policies"
                className="font-semibold text-tc-violet underline decoration-tc-violet/30 underline-offset-4 transition-colors hover:decoration-tc-violet"
              >
                hotel cancellation policy guide
              </Link>{" "}
              explains refundable rates, fees and brand rules.
            </p>
          </div>
          <div className="border-t border-tc-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="tc-faq group border-b border-tc-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-tc-display text-[19px] font-semibold text-tc-ink sm:text-[21px] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-tc-violet-soft text-tc-violet transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45 group-open:bg-tc-violet group-open:text-white">
                    <Plus className="size-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-7 pr-12 text-[16px] leading-7 text-tc-mute">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <SectionHeading title="Related TripCache resources" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { href: "/features/cancellation-reminders", label: "Cancellation reminder feature", icon: BellRing },
              { href: "/blog/hotel-cancellation-reminder-app-2026", label: "Hotel cancellation guide", icon: BookOpen },
              { href: "/features/email-to-itinerary", label: "Email-to-itinerary automation", icon: MailCheck },
            ].map((link) => {
              const Icon = link.icon
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="tc-press group flex h-full items-center gap-4 rounded-[22px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(14,14,14,0.04),0_36px_70px_-40px_rgba(45,27,87,0.55)] sm:p-6"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-tc-violet-soft text-tc-violet">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-[16px] font-semibold leading-6 text-tc-ink">{link.label}</span>
                    <ArrowRight className="size-4 shrink-0 text-tc-mute transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-tc-violet" aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
          </ul>

          <h3 className="mt-12 font-tc-display text-[19px] font-semibold text-tc-ink sm:text-[21px]">More free travel tools</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/tools/flight-arrival-time-calculator", label: "Flight time calculator" },
              { href: "/tools/layover-calculator", label: "Layover calculator" },
              { href: "/tools/jet-lag-calculator", label: "Jet lag calculator" },
              { href: "/tools/travel-checklist", label: "Travel checklist generator" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="tc-press group flex h-full items-center justify-between gap-3 rounded-[16px] border border-tc-line bg-white px-5 py-4 text-[15.5px] font-semibold leading-6 text-tc-ink transition-colors duration-200 hover:text-tc-violet"
                >
                  {link.label}
                  <ArrowRight className="size-4 shrink-0 text-tc-mute transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-tc-violet" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand placement="tools-calculator" />
      <Footer />
    </SitePage>
  )
}
