"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { Footer } from "@/components/footer"

const plans = [
  {
    name: "Basic",
    price: "$0",
    cadence: "forever",
    description: "For travelers who want organized itineraries without automation.",
    badge: "Free forever",
    highlight: false,
    features: ["Manual trip entry", "View itineraries", "Basic organization"],
    cta: { href: "/signup", label: "Start for free" },
    meta: "No credit card needed. Upgrade any time.",
  },
  {
    name: "Pro",
    price: "$9.99",
    cadence: "/mo",
    description: "Automation, exports, and priority help for power travelers and teams.",
    badge: "Most popular",
    highlight: true,
    features: [
      "Email-to-trip automation",
      "Automatic flight status updates",
      "CSV expense export",
      "Unlimited document storage",
      "Calendar integration & trip sharing",
      "Priority support",
    ],
    cta: { href: "/checkout", label: "Upgrade to Pro" },
    meta: "Cancel anytime. Keep all your exports.",
  },
]

const highlightCards = [
  {
    title: "Built to save time",
    copy: "Forward booking emails and TripCache builds the trip timeline for you.",
    icon: Zap,
  },
  {
    title: "Export-ready records",
    copy: "Generate clean CSVs for reimbursements, taxes, or sharing with finance.",
    icon: ShieldCheck,
  },
  {
    title: "Always in sync",
    copy: "Live itinerary updates across devices with priority human support when you need it.",
    icon: MessageCircle,
  },
]

const guarantees = ["Cancel anytime", "No hidden fees", "Data owned by you"]

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-muted/30 text-foreground pt-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-[-120px] h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[-60px] top-32 h-96 w-96 rounded-full bg-purple-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.12]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pb-12 lg:pb-16"
      >
        <SectionContainer className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>Pricing that matches how you travel</span>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Simple plans, premium trip management.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Choose the plan that fits your trips. Start free and unlock automation, exports, and concierge support when
              you are ready.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {guarantees.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </SectionContainer>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pb-12 lg:pb-16"
      >
        <SectionContainer className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              whileHover={{ y: -6 }}
              className={`relative h-full overflow-hidden rounded-3xl border backdrop-blur-sm p-8 sm:p-10 transition-all duration-500 ${
                plan.highlight
                  ? "border-primary/40 bg-gradient-to-br from-primary/15 via-background/90 to-purple-500/10 shadow-xl shadow-primary/15"
                  : "border-border/60 bg-card/70"
              }`}
            >
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span>{plan.badge}</span>
                {plan.highlight && <span className="text-primary">Best for automation</span>}
              </div>

              <div className="mt-10 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">{plan.name}</h2>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-tight text-muted-foreground">Price</p>
                    <p className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg font-semibold text-muted-foreground"> {plan.cadence}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{plan.meta}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="leading-relaxed text-left text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={plan.cta.href}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                      plan.highlight
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-[1.01]"
                        : "border border-border/70 bg-background text-foreground hover:-translate-y-0.5"
                    }`}
                  >
                    {plan.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </SectionContainer>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative pb-12 lg:pb-16"
      >
        <SectionContainer className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] max-w-5xl mx-auto">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Why TripCache Pro</p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              More automation, tighter control, and export-ready reports.
            </h2>
            <p className="text-muted-foreground text-lg">
              TripCache keeps teams and frequent travelers coordinated with reliable parsing, real-time updates, and
              exports that finance teams actually want to use.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlightCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.copy}</p>
                </div>
              )
            })}
          </div>
        </SectionContainer>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative pb-16 lg:pb-20"
      >
        <SectionContainer className="max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-r from-primary/15 via-background/90 to-purple-500/10 p-8 sm:p-10 shadow-xl">
            <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] items-center">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Need help deciding?
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
                  Talk to a human about billing, teams, or migrating from TripCase.
                </h3>
                <p className="text-muted-foreground">
                  We answer within one business day. Ask us about team rollouts, procurement, or how to move existing
                  itineraries into TripCache.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="mailto:support@tripcache.app?subject=TripCache%20pricing%20question"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.01]"
                  >
                    Contact Support
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="mailto:hello@tripcache.com?subject=TripCache%20for%20teams"
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
                  >
                    Schedule a walkthrough
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/70 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Priority routing</p>
                    <p className="text-sm text-muted-foreground">We put billing and migration questions at the front of the queue.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Data handled with care</p>
                    <p className="text-sm text-muted-foreground">Clean imports, exportable records, and secure document handling.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Migration guidance</p>
                    <p className="text-sm text-muted-foreground">We can mirror what you loved about TripCase and add the automation you miss.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </motion.section>

      <Footer />
    </main>
  )
}
