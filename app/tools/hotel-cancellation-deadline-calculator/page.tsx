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
    <main className="min-h-screen bg-background text-foreground">
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

      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]" />
        <SectionContainer className="relative">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Free cancellation deadline tool
            </div>
            <h1 className="text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Hotel cancellation deadline calculator
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Calculate the latest time to cancel a refundable hotel booking using the check-in date, policy window,
              cutoff time, and hotel time zone.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-cyan-500 text-white hover:bg-cyan-600">
                <Link href="/download">
                  Use TripCache for reminders
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/features/cancellation-reminders">See cancellation reminders</Link>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-16">
        <SectionContainer>
          <HotelCancellationCalculator values={calculatorValues} />
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-20">
        <SectionContainer className="grid gap-10 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How policies usually work</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
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
              <div key={item} className="rounded-2xl border border-border/60 bg-card/50 p-5 font-medium">
                {item}
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-20">
        <SectionContainer className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Hotel cancellation FAQ</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Use this calculator as a planning helper, then confirm the final deadline against the provider or hotel
              confirmation.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-border/60 bg-card/50 p-5">
                <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-16">
        <SectionContainer>
          <div className="rounded-[2rem] border border-border/60 bg-card/50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Related TripCache resources</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Link className="rounded-2xl border border-border/60 bg-background/70 p-4 font-semibold hover:text-primary" href="/features/cancellation-reminders">
                Cancellation reminder feature
              </Link>
              <Link className="rounded-2xl border border-border/60 bg-background/70 p-4 font-semibold hover:text-primary" href="/blog/hotel-cancellation-reminder-app-2026">
                Hotel cancellation guide
              </Link>
              <Link className="rounded-2xl border border-border/60 bg-background/70 p-4 font-semibold hover:text-primary" href="/features/email-to-itinerary">
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
