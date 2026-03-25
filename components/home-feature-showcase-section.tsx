"use client"

import Image from "next/image"
import { Bell, Clock, Map } from "lucide-react"
import { SectionContainer } from "./section-container"

const showcases = [
  {
    id: "live-updates",
    icon: Bell,
    title: "Real-time flight tracking",
    subtitle: "Stay ahead of schedule",
    description: "Gate changes, delays, and boarding updates appear inside the same trip workspace, so travelers do not need to keep rechecking airline apps.",
    image: "/app-screenshot-flight-detail.webp",
    points: ["See live status details", "Keep the itinerary context next to the update"],
    accent: "from-amber-300 to-orange-400",
  },
  {
    id: "trip-progress",
    icon: Clock,
    title: "Live trip progress",
    subtitle: "Your journey at a glance",
    description: "The home view keeps the next segment, timing, and overall trip progress easy to scan, which is exactly what a mobile travel app should prioritize.",
    image: "/app-screenshot-home-flight-progress.webp",
    points: ["Quick status at a glance", "Designed for in-transit mobile use"],
    accent: "from-cyan-300 to-sky-400",
  },
  {
    id: "flight-details",
    icon: Map,
    title: "Details without inbox digging",
    subtitle: "Everything in one place",
    description: "Terminal information, flight numbers, and journey details stay organized in a focused interface that removes the usual travel-email clutter.",
    image: "/app-screenshot-trip-detail.webp",
    points: ["Cleaner than searching mail threads", "Built to reduce travel-day friction"],
    accent: "from-indigo-300 to-violet-400",
  },
]

export function FeatureShowcaseSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20">
      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Detailed workflows</div>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Premium travel details,
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ready when you need them.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            These views show what the traveler actually sees at the moment it matters, not just a list of features.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {showcases.map((item, index) => {
            const reverse = index % 2 === 1

            return (
              <article
                key={item.id}
                className="surface-panel overflow-hidden p-6 sm:p-8"
              >
                <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div>
                    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950`}>
                      <item.icon className="h-4 w-4" />
                      {item.subtitle}
                    </div>
                    <h3 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{item.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{item.description}</p>

                    <div className="mt-6 space-y-3">
                      {item.points.map((point) => (
                        <div key={point} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-foreground/85 dark:border-white/10 dark:bg-white/[0.04]">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-[90px]`} />
                    <div className="relative rounded-[2rem] border border-border/70 bg-background/75 p-3 dark:border-white/10 dark:bg-white/[0.04]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={300}
                        height={650}
                        className="h-auto w-full rounded-[1.5rem] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}
