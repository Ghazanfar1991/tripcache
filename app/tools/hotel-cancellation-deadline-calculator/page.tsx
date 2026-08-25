import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/section-container"
import { HotelCancellationCalculator } from "@/components/seo/hotel-cancellation-calculator"
import { Button } from "@/components/ui/button"

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

export const metadata: Metadata = {
  title: "Hotel Cancellation Deadline Calculator",
  description:
    "Calculate hotel free-cancellation deadlines by check-in date, policy window, cutoff time, and hotel time zone, then copy a reminder summary.",
  keywords: [
    "hotel cancellation deadline calculator",
    "hotel cancellation reminder",
    "free cancellation deadline",
    "booking cancellation tracker",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Hotel Cancellation Deadline Calculator | TripCache",
    description:
      "Calculate the deadline for refundable hotel bookings and create reminder timing before free cancellation closes.",
    url: `${BASE_URL}${PAGE_PATH}`,
    type: "website",
    images: [
      {
        url: "/blog-cover-hotel-cancellation-reminder.webp",
        width: 1200,
        height: 630,
        alt: "Hotel cancellation reminder calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Cancellation Deadline Calculator | TripCache",
    description: "Calculate hotel free-cancellation deadlines and reminder timing.",
    images: ["/blog-cover-hotel-cancellation-reminder.webp"],
  },
}

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
    <main className="min-h-screen bg-[#f4f0e8] text-[#29251f] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <Script
        id="hotel-cancellation-calculator-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="hotel-cancellation-calculator-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden pb-9 pt-28 lg:pb-10 lg:pt-28">
        <div className="pointer-events-none absolute -inset-inline-start-24 top-28 hidden h-60 w-60 rounded-full border border-[#41382e]/10 sm:block" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-inline-start-8 top-52 hidden h-20 w-20 rounded-full bg-white/45 shadow-[inset_0_0_0_1px_rgba(65,56,46,0.05)] sm:block" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-inline-end-[5%] top-24 hidden h-28 w-28 rounded-full border border-[#bd573d]/10 sm:block" aria-hidden="true" />
        <SectionContainer className="relative">
          <div className="design-one-calculator-hero">
            <div className="design-one-calculator-eyebrow inline-flex w-fit items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a44833] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)]">
              <CheckCircle2 className="h-4 w-4" />
              Free cancellation deadline tool
            </div>
            <div className="design-one-calculator-title"><h1 className="design-one-display-feature">
              Hotel cancellation deadline calculator
            </h1></div>
            <p className="design-one-calculator-copy max-w-3xl text-base leading-7 text-[#696158] min-[1100px]:text-lg">
              Calculate the latest time to cancel a refundable hotel booking using the check-in date, policy window,
              cutoff time, and hotel time zone.
            </p>
            <div className="design-one-calculator-actions flex flex-col gap-3 sm:flex-row min-[900px]:items-start">
              <Button asChild size="lg" className="rounded-full bg-[#29251f] px-6 text-[#f7f2e9] hover:bg-[#3a342d]">
                <Link href="/download">
                  Use TripCache for reminders
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-[#41382e]/15 bg-white/50 px-6 text-[#29251f] hover:bg-white/80">
                <Link href="/features/cancellation-reminders">See cancellation reminders</Link>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-24 pt-2 lg:pb-32 lg:pt-4">
        <SectionContainer>
          <HotelCancellationCalculator values={calculatorValues} />
        </SectionContainer>
      </section>

      <section className="bg-[#29251f] py-24 text-[#f7f2e9] lg:py-32">
        <SectionContainer className="grid gap-12 min-[900px]:grid-cols-[0.8fr_1.2fr] min-[900px]:gap-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#e98362]">How policies usually work</p>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
              Most missed deadlines happen because the cutoff is hidden in the confirmation.
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              "Free cancellation until 6 PM local hotel time.",
              "Cancel 24 hours before check-in.",
              "Cancel 48 or 72 hours before arrival.",
              "Non-refundable after a specific local date.",
            ].map((item) => (
              <div key={item} className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-[1.5rem] bg-white/[0.055] p-5 font-medium leading-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6">
                <CheckCircle2 className="mt-1 h-4 w-4 text-[#e98362]" />{item}
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-24 lg:py-32">
        <SectionContainer className="grid gap-12 min-[900px]:grid-cols-[0.72fr_1.28fr] min-[900px]:gap-20">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Hotel cancellation FAQ</h2>
            <p className="mt-5 leading-7 text-[#71695f]">
              Use this calculator as a planning helper, then confirm the final deadline against the provider or hotel
              confirmation.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.5rem] bg-white/46 px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_16px_44px_rgba(72,53,33,0.055)] sm:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold marker:content-none"><span>{faq.question}</span><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eadfce] text-xl font-normal text-[#b9543a] transition-transform duration-150 group-open:rotate-45">+</span></summary>
                <p className="max-w-3xl pb-7 leading-7 text-[#71695f]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-24 lg:pb-32">
        <SectionContainer>
          <div className="rounded-[2rem] bg-[#db6947] p-7 text-white shadow-[0_28px_65px_rgba(98,41,25,0.16)] sm:p-10">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Related TripCache resources</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Link className="rounded-2xl bg-white/[0.12] p-5 font-semibold leading-6 transition-colors duration-150 hover:bg-white/[0.18]" href="/features/cancellation-reminders">
                Cancellation reminder feature
              </Link>
              <Link className="rounded-2xl bg-white/[0.12] p-5 font-semibold leading-6 transition-colors duration-150 hover:bg-white/[0.18]" href="/blog/hotel-cancellation-reminder-app-2026">
                Hotel cancellation guide
              </Link>
              <Link className="rounded-2xl bg-white/[0.12] p-5 font-semibold leading-6 transition-colors duration-150 hover:bg-white/[0.18]" href="/features/email-to-itinerary">
                Email-to-itinerary automation
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>

      <Footer />
    </main>
  )
}
