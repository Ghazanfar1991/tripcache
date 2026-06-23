"use client"

import Image from "next/image"
import { Download, Mail, Sparkles } from "lucide-react"
import { SectionContainer } from "./section-container"

const steps = [
  {
    icon: Mail,
    step: "01",
    title: "Forward your bookings",
    description: "Send flight confirmations and booking emails to TripCache and let the app capture the important details.",
    image: "/app-screenshot-import.webp",
    accent: "from-cyan-400/30 to-sky-500/10",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Review a clean draft",
    description: "TripCache turns those emails into organized drafts, so you can confirm everything before it lands in your itinerary.",
    image: "/app-screenshot-drafts.webp",
    accent: "from-indigo-400/30 to-purple-500/10",
  },
  {
    icon: Download,
    step: "03",
    title: "Travel with everything ready",
    description: "Open trips, flight progress, documents, and expense exports from a single mobile-friendly workspace.",
    image: "/app-screenshot-home.webp",
    accent: "from-emerald-400/30 to-cyan-500/10",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-12 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.08),transparent_32%)]" />

      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">How it works</div>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            A cleaner path from
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              inbox to itinerary.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            The flow is intentionally simple: bring in confirmations, review the details, and keep every trip ready on your phone.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="surface-panel overflow-hidden p-5"
            >
              <div className={`rounded-[1.75rem] bg-gradient-to-br ${step.accent} p-4`}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/85 text-primary dark:border-white/15 dark:bg-slate-950/70">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Step {step.step}</span>
                </div>
                <div className="relative mx-auto w-[180px] sm:w-[200px]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={200}
                    height={432}
                    className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(2,6,23,0.45)]"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>

              <div className="px-1 pb-2 pt-6">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-[1.75rem] border border-border/70 bg-background/75 px-6 py-5 text-center text-sm text-muted-foreground backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
          Designed to help travelers move from booking email to ready-to-use itinerary with less friction.
        </div>
      </SectionContainer>
    </section>
  )
}
