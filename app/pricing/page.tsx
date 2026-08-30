import "../secondary.css"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock3, FileSpreadsheet, MailCheck, ShieldCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { SectionContainer } from "@/components/section-container"

const proFeatures = [
  "Email-to-trip automation",
  "Automatic flight status updates",
  "Free-cancellation deadline reminders",
  "CSV expense export",
  "Expanded document storage",
  "Calendar integration and trip sharing",
  "Priority support",
]

const plans = [
  {
    name: "Basic",
    price: "$0",
    cadence: "forever",
    description: "For travelers who want a clear itinerary and prefer to enter trip details manually.",
    label: "Free plan",
    badge: null,
    highlight: false,
    features: ["Manual trip entry", "View and organize itineraries", "Core trip organization"],
    meta: "No credit card needed. Upgrade in the app when automation becomes useful.",
    cta: "Download free",
  },
  {
    name: "Pro Monthly",
    price: "$5.99",
    cadence: "/month",
    description: "For frequent and business travelers who want confirmations, reminders, and records handled faster.",
    label: "Flexible billing",
    badge: null,
    highlight: false,
    features: proFeatures,
    meta: "$71.88 over 12 months. Cancel anytime in the mobile app.",
    cta: "Choose monthly",
  },
  {
    name: "Pro Yearly",
    price: "$49.99",
    cadence: "/year",
    description: "The complete Pro experience at the lowest price for travelers who plan to use TripCache year-round.",
    label: "Best value",
    badge: "Save 30%",
    highlight: true,
    features: proFeatures,
    meta: "$4.17/month effective. Save $21.89 each year compared with monthly billing.",
    cta: "Choose yearly",
  },
]

const reasons = [
  {
    title: "Save time after booking",
    copy: "Forward confirmation emails and review a structured draft instead of retyping every reservation.",
    icon: MailCheck,
  },
  {
    title: "Protect flexible bookings",
    copy: "Track refundable booking cutoffs and get reminded before a hotel, car, tour, or ticket becomes non-refundable.",
    icon: Clock3,
  },
  {
    title: "Close out work trips faster",
    copy: "Keep receipts and trip costs together, then export a CSV for reimbursement, client review, or your own records.",
    icon: FileSpreadsheet,
  },
]

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TripCache Pricing",
    url: "https://trip-cache.com/pricing",
    mainEntity: {
      "@id": "https://trip-cache.com/#app",
    },
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
        <SectionContainer className="grid items-center gap-8 min-[900px]:grid-cols-[1.16fr_0.84fr] min-[900px]:gap-x-16 min-[900px]:gap-y-5">
          <div className="hidden min-[900px]:col-start-2 min-[900px]:row-start-1 min-[900px]:block">
            <p className="max-w-sm text-sm leading-6 text-[#666666]">
              Basic keeps trips organized manually. Pro adds email import, cancellation reminders, flight updates,
              documents, and expense exports from $5.99 per month—or save 30% with yearly billing.
            </p>
          </div>
          <div className="min-[900px]:col-start-1 min-[900px]:row-span-2 min-[900px]:row-start-1">
            <h1 className="design-one-display-feature">
              Start free. Pay for the post-booking work you want automated.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#626262] min-[900px]:hidden">
              Basic keeps trips organized manually. Pro adds email import, cancellation reminders, flight updates,
              documents, and expense exports from $5.99 per month—or save 30% with yearly billing.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 text-sm text-[#5f5f5f] min-[900px]:col-start-2 min-[900px]:row-start-2 min-[900px]:self-start">
            {["Cancel anytime", "No hidden website fees", "Upgrade in the app"].map((item) => (
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
            Yearly savings: 12 months at $5.99 is $71.88. Pay $49.99 yearly and keep $21.89—a 30% saving.
          </p>
        </SectionContainer>
      </section>

      <section className="relative bg-[#121212] py-24 text-[#f7f2e9] lg:py-32">
        <SectionContainer className="mx-auto max-w-6xl">
          <div className="grid gap-8 min-[860px]:grid-cols-[0.72fr_1.28fr] min-[860px]:items-end min-[860px]:gap-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#a98af0]">Why travelers upgrade</p>
            <div><h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">Pro is for costly details, not decorative extras.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#b9b0a3]">
              The paid plan is focused on the work that can consume time or money after a booking is confirmed.
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

      <section className="relative py-20 lg:py-28">
        <SectionContainer className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#602ad2] p-8 text-white shadow-[0_28px_65px_rgba(58,24,135,0.16)] sm:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Not sure whether Pro fits your travel workflow?</h2>
                <p className="mt-4 leading-7 text-white/75">
                  Ask about email import, cancellation reminders, expense exports, or moving your routine from TripCase.
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
