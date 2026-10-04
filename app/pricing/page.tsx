import "../secondary.css"

import Link from "next/link"
import { ArrowRight, CheckCircle2, MailCheck, Plane, ShieldCheck, Smartphone } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { SectionContainer } from "@/components/section-container"

const basicFeatures = [
  "Cancellation-deadline reminders",
  "Check-in reminders and a check-in shortcut",
  "Manual trips: flights, stays, cars, trains, events, and more",
  "Boarding-pass barcode scanning",
  "Document vault with a PIN, Face ID, or fingerprint lock",
  "Expenses in 153 currencies, with category budgets",
  "CSV and PDF export, including travel history and a Visa / Immigration Summary",
  "Trip map, travel history, CSV import, and offline access",
  "Add trips to your phone's calendar and share a trip-card image",
]

const proFeatures = [
  "Everything in Basic",
  "Booking-email import with a monthly allowance: forward supported confirmations and review each draft",
  "Free-cancellation deadlines read from imported confirmations",
  "Live flight-status alerts on supported flights: delays and gate, terminal, and baggage-belt changes",
  "Live Activity and Dynamic Island on iPhone; home-screen widgets on iPhone and Android",
]

const plans = [
  {
    name: "Basic",
    price: "$0",
    cadence: "forever",
    description: "For travelers who add bookings themselves and want reminders, documents, and records in one place.",
    label: "Free plan",
    badge: null,
    highlight: false,
    features: basicFeatures,
    meta: "No credit card needed. Storage limits are the same on every plan.",
    cta: "Download free",
  },
  {
    name: "Pro Monthly",
    price: "$5.99",
    cadence: "/month",
    description: "For travelers who want booking emails turned into trips and live flight alerts on travel day.",
    label: "Flexible billing",
    badge: null,
    highlight: false,
    features: proFeatures,
    meta: "$71.88 over 12 months. Cancel anytime in your App Store or Google Play subscriptions.",
    cta: "Choose monthly",
  },
  {
    name: "Pro Yearly",
    price: "$49.99",
    cadence: "/year",
    description: "The same Pro features at the lowest price, for travelers who use TripCache all year.",
    label: "Best value",
    badge: "Save 30%",
    highlight: true,
    features: proFeatures,
    meta: "$49.99 on Google Play and $50.00 on the App Store: about $4.17 a month, 30% less than monthly billing.",
    cta: "Choose yearly",
  },
]

const reasons = [
  {
    title: "Skip the retyping",
    copy: "Forward supported confirmations, including attached PDFs and screenshots, and review a structured draft. The importer also picks up free-cancellation deadlines.",
    icon: MailCheck,
  },
  {
    title: "Know when a flight changes",
    copy: "Get alerts for departures, arrivals, delays, and gate, terminal, and baggage-belt changes on supported flights. The airline remains the final source.",
    icon: Plane,
  },
  {
    title: "See the flight at a glance",
    copy: "Follow flight progress in a Live Activity and the Dynamic Island on iPhone, or in a home-screen widget on iPhone and Android.",
    icon: Smartphone,
  },
]

const PRICE_SUMMARY =
  "TripCache Basic is free. TripCache Pro costs $5.99 a month, or $49.99 a year on Google Play and $50.00 on the App Store (US, October 2026)."

const comparisonRows: Array<{ feature: string; basic: string; pro: string }> = [
  { feature: "Price", basic: "Free", pro: "$5.99 a month, or $49.99 a year (Google Play) / $50.00 a year (App Store)" },
  {
    feature: "Trips with flights, stays, rental cars, trains, buses, parking, events, restaurants, tours and meetings",
    basic: "Included",
    pro: "Included",
  },
  { feature: "Cancellation-deadline reminders (7 days, 2 days, 1 day or on the day)", basic: "Included", pro: "Included" },
  { feature: "Check-in reminders (48 and 24 hours before departure) and check-in shortcut", basic: "Included", pro: "Included" },
  { feature: "Boarding-pass barcode scanning", basic: "Included", pro: "Included" },
  { feature: "Document vault with an optional PIN and Face ID or fingerprint unlock", basic: "Included", pro: "Included" },
  { feature: "Document storage limits", basic: "Same on every plan", pro: "Same on every plan" },
  { feature: "Expenses in 153 currencies, with locked exchange rates and category budgets", basic: "Included", pro: "Included" },
  { feature: "CSV and PDF export, including Travel History and a Visa / Immigration Summary", basic: "Included", pro: "Included" },
  { feature: "CSV import of past flights", basic: "Included", pro: "Included" },
  { feature: "Trip map, travel history and offline access", basic: "Included", pro: "Included" },
  { feature: "Add to calendar and trip-card image sharing", basic: "Included", pro: "Included" },
  { feature: "Booking-email import (forwarded confirmations, PDFs and screenshots)", basic: "Not included", pro: "Included, with a monthly allowance" },
  { feature: "Free-cancellation deadlines read from imported confirmations", basic: "Not included", pro: "Included" },
  { feature: "Live flight-status alerts on supported flights", basic: "Not included", pro: "Included" },
  { feature: "Live Activity, Dynamic Island and home-screen widgets", basic: "Not included", pro: "Included" },
]

const pricingFaqs = [
  {
    question: "Is TripCache free?",
    answer:
      "Yes. TripCache Basic is free and includes cancellation-deadline and check-in reminders, boarding-pass scanning, the document vault, expenses in 153 currencies, CSV and PDF export, CSV import of past flights, the trip map, travel history and offline access. Download it free for iPhone (iOS 16.4 or later) or Android (7.0 or later).",
  },
  {
    question: "What does TripCache Pro add?",
    answer:
      "Pro adds three things: booking-email import with a monthly allowance, live flight-status alerts on supported flights, and Live Activity, Dynamic Island and home-screen widgets. It costs $5.99 a month, or $49.99 a year on Google Play and $50.00 on the App Store (US prices, October 2026).",
  },
  {
    question: "Is email import free?",
    answer:
      "No. Booking-email import is part of Pro and includes a monthly import allowance. You forward supported confirmations, including attached PDFs and screenshots, to your TripCache address and review each draft before saving it. On Basic, you add bookings by hand, scan a boarding pass, or import past flights from a CSV file.",
  },
  {
    question: "Do storage limits differ between Basic and Pro?",
    answer:
      "No. Document storage limits are the same on every plan: up to 10 PDF, JPEG or PNG files per document, 15 MB per file and 50 MB per document.",
  },
  {
    question: "How do I cancel TripCache Pro?",
    answer:
      "Cancel it where you subscribed. On iPhone, open Settings, tap your name, then Subscriptions. On Android, open Google Play, tap your profile icon, then Payments & subscriptions, then Subscriptions. Pro stays active until the end of the period you paid for, and Basic features keep working after that.",
  },
]

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://trip-cache.com/pricing#webpage",
        name: "TripCache Pricing",
        url: "https://trip-cache.com/pricing",
        description: `${PRICE_SUMMARY} Basic includes cancellation-deadline and check-in reminders, the document vault, expenses, and CSV and PDF export. Pro adds booking-email import, live flight-status alerts on supported flights, and Live Activity and widgets.`,
        mainEntity: { "@id": "https://trip-cache.com/#app" },
        isPartOf: { "@id": "https://trip-cache.com/#website" },
        breadcrumb: { "@id": "https://trip-cache.com/pricing#breadcrumb" },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://trip-cache.com/pricing#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://trip-cache.com" },
          { "@type": "ListItem", position: 2, name: "Pricing", item: "https://trip-cache.com/pricing" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://trip-cache.com/pricing#faq",
        mainEntity: pricingFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f0e8] pt-[72px] text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <script
        id="pricing-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema).replace(/</g, "\\u003c") }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] overflow-hidden" aria-hidden="true">
        <div className="absolute -inset-inline-start-24 top-28 hidden h-64 w-64 rounded-full border border-[#41382e]/10 sm:block" />
        <div className="absolute inset-inline-start-8 top-48 hidden h-24 w-24 rounded-full bg-white/45 shadow-[inset_0_0_0_1px_rgba(65,56,46,0.05)] sm:block" />
        <div className="absolute inset-inline-end-[6%] top-28 hidden h-28 w-28 rounded-full border border-[#602ad2]/10 sm:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-[#41382e]/10" />
      </div>

      <section className="relative pb-10 pt-9 lg:pb-12 lg:pt-10">
        <SectionContainer className="grid items-center gap-7 min-[900px]:grid-cols-[1.16fr_0.84fr] min-[900px]:gap-x-16 min-[900px]:gap-y-5">
          <div className="min-[900px]:col-start-1 min-[900px]:row-span-2 min-[900px]:row-start-1">
            <h1 className="design-one-display-feature">
              Start free. Pay for the post-booking work you want automated.
            </h1>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[#626262] min-[900px]:col-start-2 min-[900px]:row-start-1 min-[900px]:max-w-sm min-[900px]:text-sm min-[900px]:leading-6 min-[900px]:text-[#666666]">
            {PRICE_SUMMARY} Basic includes cancellation-deadline and check-in reminders, the document vault, expenses,
            and CSV or PDF export. Pro adds booking-email import, live flight-status alerts on supported flights, and
            Live Activity and widgets.
          </p>
          <div className="flex flex-wrap gap-2.5 text-sm text-[#5f5f5f] min-[900px]:col-start-2 min-[900px]:row-start-2 min-[900px]:self-start">
            {["Free cancellation reminders", "Cancel Pro anytime", "Upgrade in the app"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08)]">
                <CheckCircle2 className="h-4 w-4 text-[#602ad2]" />
                {item}
              </span>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="relative pb-20 lg:pb-28">
        <SectionContainer className="mx-auto grid max-w-7xl gap-5 min-[760px]:grid-cols-2 min-[1080px]:grid-cols-12 min-[1080px]:items-start">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 min-[1080px]:col-span-4 ${
                plan.highlight
                  ? "bg-[#121212] text-[#f7f2e9] shadow-[0_30px_70px_rgba(42,20,82,0.18)] min-[760px]:col-span-2 min-[1080px]:col-span-4 min-[1080px]:-translate-y-5"
                  : "bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_55px_rgba(72,53,33,0.065)]"
              }`}
            >
              <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
                <p className={`text-[10px] font-bold uppercase tracking-[0.17em] ${plan.highlight ? "text-[#a98af0]" : "text-[#4d20af]"}`}>{plan.label}</p>
                {plan.badge ? (
                  <span className="rounded-full bg-[#602ad2] px-3 py-1 text-xs font-bold text-white shadow-[0_8px_20px_rgba(96,42,210,0.2)]">
                    {plan.badge}
                  </span>
                ) : null}
              </div>
              <div className="mt-6 space-y-2">
                <h2 className="text-3xl font-semibold tracking-[-0.04em]">{plan.name}</h2>
                <p className={`leading-7 ${plan.highlight ? "text-[#b9b0a3]" : "text-[#666666]"}`}>{plan.description}</p>
              </div>

              <div className="mt-6">
                <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${plan.highlight ? "text-[#a59b8e]" : "text-[#858585]"}`}>Price</p>
                <p className="mt-2 text-5xl font-semibold tracking-[-0.055em]">
                  {plan.price}
                  <span className={`text-base font-semibold tracking-normal ${plan.highlight ? "text-[#b9b0a3]" : "text-[#666666]"}`}> {plan.cadence}</span>
                </p>
                <p className={`mt-3 text-sm leading-6 ${plan.highlight ? "text-[#b9b0a3]" : "text-[#666666]"}`}>{plan.meta}</p>
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${plan.highlight ? "bg-white/[0.07] text-[#a98af0]" : "bg-[#e8e0ff] text-[#602ad2]"}`}>
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className={`leading-relaxed ${plan.highlight ? "text-[#c3baae]" : "text-[#5f5f5f]"}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <GetStartedModal
                  triggerLabel={plan.cta}
                  triggerClassName={`h-11 w-full rounded-full text-sm ${
                    plan.highlight
                      ? "bg-[#602ad2] text-white shadow-[0_12px_28px_rgba(58,24,135,0.22)] hover:bg-[#5121b3]"
                      : "bg-[#121212] text-[#f7f2e9] hover:bg-[#242424]"
                  }`}
                />
              </div>
            </article>
          ))}
        </SectionContainer>
        <SectionContainer className="mx-auto mt-7 max-w-7xl text-center">
          <p className="text-sm text-[#666666]">
            Yearly savings: 12 months at $5.99 is $71.88. Pro Yearly is $49.99 on Google Play and $50.00 on the App
            Store, about 30% less. US store prices as of October 2026.
          </p>
        </SectionContainer>
      </section>

      <section id="compare" aria-labelledby="compare-heading" className="relative scroll-mt-24 pb-20 lg:pb-28">
        <SectionContainer className="mx-auto max-w-5xl">
          <h2 id="compare-heading" className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            TripCache Basic vs Pro
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#666666]">
            Pro gates three things: booking-email import, live flight-status alerts, and Live Activity and widgets.
            Everything else is in Basic, and storage limits are the same on both plans.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[1.75rem] bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_55px_rgba(72,53,33,0.065)]">
            <table className="w-full border-collapse text-left text-[13px] leading-5 sm:text-sm sm:leading-6">
              <caption className="sr-only">
                Features included in TripCache Basic (free) and TripCache Pro, with US prices as of October 2026
              </caption>
              <thead>
                <tr className="border-b border-[#3f352a]/10">
                  <th scope="col" className="w-[46%] px-3 py-4 font-semibold sm:px-6">
                    Feature
                  </th>
                  <th scope="col" className="w-[24%] px-3 py-4 font-semibold sm:px-6">
                    Basic (free)
                  </th>
                  <th scope="col" className="w-[30%] px-3 py-4 font-semibold text-[#4d20af] sm:px-6">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-[#3f352a]/[0.07] last:border-b-0">
                    <th scope="row" className="px-3 py-3.5 align-top font-medium text-[#3a3a3a] sm:px-6">
                      {row.feature}
                    </th>
                    <td className={`px-3 py-3.5 align-top sm:px-6 ${row.basic === "Not included" ? "text-[#8a8278]" : "text-[#3a3a3a]"}`}>
                      {row.basic}
                    </td>
                    <td className="px-3 py-3.5 align-top text-[#3a3a3a] sm:px-6">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionContainer>
      </section>

      <section className="relative bg-[#121212] py-24 text-[#f7f2e9] lg:py-32">
        <SectionContainer className="mx-auto max-w-6xl">
          <div className="grid gap-8 min-[860px]:grid-cols-[0.72fr_1.28fr] min-[860px]:items-end min-[860px]:gap-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#a98af0]">Why travelers upgrade</p>
            <div><h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">Pro imports your bookings and watches your flights.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#b9b0a3]">
              Reminders, documents, expenses, and exports are already free. Pro adds the parts that save the most time:
              turning booking emails into trips and following flights on the day.
            </p></div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon
              return (
                <article key={reason.title} className="rounded-[1.75rem] bg-white/[0.055] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#602ad2] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em]">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#b2b2b2]">{reason.copy}</p>
                </article>
              )
            })}
          </div>
        </SectionContainer>
      </section>

      <section id="faq" aria-labelledby="pricing-faq-heading" className="relative scroll-mt-24 pt-20 lg:pt-28">
        <SectionContainer className="mx-auto max-w-5xl">
          <h2 id="pricing-faq-heading" className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            TripCache pricing questions
          </h2>
          <div className="mt-8 grid gap-4">
            {pricingFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.5rem] bg-white/50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_44px_rgba(72,53,33,0.055)] sm:p-7"
              >
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{faq.question}</h3>
                <p className="mt-2 leading-7 text-[#666666]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="relative py-20 lg:py-28">
        <SectionContainer className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#602ad2] p-8 text-white shadow-[0_28px_65px_rgba(58,24,135,0.16)] sm:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Not sure whether Pro fits your travel workflow?</h2>
                <p className="mt-4 leading-7 text-white/75">
                  Ask about email import, live flight alerts, or moving your routine from TripCase.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="mailto:support@trip-cache.com?subject=TripCache%20pricing%20question"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#121212] transition-colors duration-150 hover:bg-[#f7f2e9]"
                >
                  Contact support
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <GetStartedModal triggerLabel="Download" triggerClassName="h-11 rounded-full bg-[#121212] px-6 text-white hover:bg-[#242424]" />
              </div>
            </div>
            <div className="mt-7 flex items-start gap-3 border-t border-white/20 pt-7 text-sm leading-6 text-white/75">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-white" />
              <p>Review the Privacy Policy and the current App Store or Google Play disclosures before uploading sensitive travel documents.</p>
            </div>
          </div>
        </SectionContainer>
      </section>

      <Footer />
    </main>
  )
}
