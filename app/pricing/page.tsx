import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock3, FileSpreadsheet, MailCheck, ShieldCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { SectionContainer } from "@/components/section-container"

const plans = [
  {
    name: "Basic",
    price: "$0",
    cadence: "forever",
    description: "For travelers who want a clear itinerary and prefer to enter trip details manually.",
    label: "Free plan",
    highlight: false,
    features: ["Manual trip entry", "View and organize itineraries", "Core trip organization"],
    meta: "No credit card needed. Upgrade in the app when automation becomes useful.",
    cta: "Download free",
  },
  {
    name: "Pro",
    price: "$5.99",
    cadence: "/month",
    description: "For frequent and business travelers who want confirmations, reminders, and records handled faster.",
    label: "Best for post-booking automation",
    highlight: true,
    features: [
      "Email-to-trip automation",
      "Automatic flight status updates",
      "Free-cancellation deadline reminders",
      "CSV expense export",
      "Expanded document storage",
      "Calendar integration and trip sharing",
      "Priority support",
    ],
    meta: "Cancel anytime. Subscription billing is managed in the mobile app.",
    cta: "Get TripCache Pro",
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
    copy: "Keep receipts and trip costs together, then export a CSV for reimbursement, clients, or tax records.",
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
    <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-muted/30 pt-24 text-foreground">
      <script
        id="pricing-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-[-120px] h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[-60px] top-32 h-96 w-96 rounded-full bg-purple-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.08]" />
      </div>

      <section className="relative pb-12 lg:pb-16">
        <SectionContainer className="space-y-6 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Start free. Pay for the post-booking work you want automated.
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Basic keeps trips organized manually. Pro adds email import, cancellation reminders, flight updates,
              documents, and expense exports for $5.99 per month.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {["Cancel anytime", "No hidden website fees", "Upgrade in the app"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="relative pb-12 lg:pb-16">
        <SectionContainer className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur-sm sm:p-10 ${
                plan.highlight
                  ? "border-primary/40 bg-gradient-to-br from-primary/15 via-background/90 to-purple-500/10 shadow-xl shadow-primary/15"
                  : "border-border/60 bg-card/70"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{plan.label}</p>
              <div className="mt-6 space-y-2">
                <h2 className="text-3xl font-bold">{plan.name}</h2>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-6">
                <p className="text-sm uppercase tracking-tight text-muted-foreground">Price</p>
                <p className="text-4xl font-bold">
                  {plan.price}
                  <span className="text-lg font-semibold text-muted-foreground"> {plan.cadence}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.meta}</p>
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <GetStartedModal
                  triggerLabel={plan.cta}
                  triggerClassName={`h-11 w-full rounded-full text-sm ${
                    plan.highlight
                      ? "bg-cyan-500 text-white hover:bg-cyan-600"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                />
              </div>
            </article>
          ))}
        </SectionContainer>
      </section>

      <section className="relative pb-12 lg:pb-16">
        <SectionContainer className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Why travelers upgrade</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Pro is for costly details, not decorative extras.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The paid plan is focused on the work that can consume time or money after a booking is confirmed.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon
              return (
                <article key={reason.title} className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.copy}</p>
                </article>
              )
            })}
          </div>
        </SectionContainer>
      </section>

      <section className="relative pb-16 lg:pb-20">
        <SectionContainer className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-r from-primary/15 via-background/90 to-purple-500/10 p-8 shadow-xl sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Not sure whether Pro fits your travel workflow?</h2>
                <p className="mt-3 text-muted-foreground">
                  Ask about email import, cancellation reminders, expense exports, or moving your routine from TripCase.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="mailto:support@trip-cache.com?subject=TripCache%20pricing%20question"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:border-primary/40"
                >
                  Contact support
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <GetStartedModal triggerLabel="Download" triggerClassName="h-11 rounded-full px-6" />
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p>Review the Privacy Policy and the current App Store or Google Play disclosures before uploading sensitive travel documents.</p>
            </div>
          </div>
        </SectionContainer>
      </section>

      <Footer />
    </main>
  )
}
