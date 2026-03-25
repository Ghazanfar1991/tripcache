"use client"

import Image from "next/image"
import { Cloud, FileSpreadsheet, Mail, Plane, Shield, Zap } from "lucide-react"
import { SectionContainer } from "./section-container"

const features = [
  {
    icon: Mail,
    title: "Email-to-trip capture",
    description: "Turn flight confirmations into organized drafts without copying details by hand.",
  },
  {
    icon: Plane,
    title: "Live travel view",
    description: "See upcoming flights, segments, and timing in a layout that stays readable on mobile.",
  },
  {
    icon: FileSpreadsheet,
    title: "Expense export",
    description: "Generate CSV reports quickly for reimbursement, bookkeeping, or client work.",
  },
  {
    icon: Cloud,
    title: "Document access",
    description: "Keep passports, receipts, and trip files ready when you need them most.",
  },
  {
    icon: Zap,
    title: "Flight updates",
    description: "Stay on top of gate changes, delays, and progress without bouncing between apps.",
  },
  {
    icon: Shield,
    title: "Private by design",
    description: "Organize sensitive travel details in a focused app instead of scattered inbox threads.",
  },
]

const previewScreens = [
  "/app-screenshot-trip-detail.webp",
  "/app-screenshot-flight-detail.webp",
  "/app-screenshot-documents.webp",
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden py-12 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.08),transparent_24%)]" />

      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Core features</div>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Everything you need to keep
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              a trip under control.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Mobile app landing pages perform best when the product story is obvious. These are the core workflows TripCache brings together.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="surface-panel h-full p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">{feature.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="surface-panel mt-10 overflow-hidden p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Product preview</div>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Purpose-built for frequent travelers who want one reliable app.
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The interface focuses on clarity first: large previews, short copy, and direct calls to action that keep the product easy to understand.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 self-start">
              {previewScreens.map((screen) => (
                <div key={screen} className="rounded-[1.5rem] border border-border/70 bg-background/75 p-2 dark:border-white/10 dark:bg-white/[0.04]">
                  <Image
                    src={screen}
                    alt="TripCache feature preview"
                    width={132}
                    height={286}
                    className="h-auto w-full rounded-[1.1rem] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
