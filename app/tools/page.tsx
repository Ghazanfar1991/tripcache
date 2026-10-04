import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarClock, ListChecks, MoonStar, PlaneLanding, TicketsPlane, type LucideIcon } from "lucide-react"

import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/section-container"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Free Travel Tools",
  description:
    "Free TripCache travel tools: flight time, jet lag and layover calculators, a travel checklist generator and a hotel cancellation deadline calculator.",
  path: "/tools",
})

const tools: { href: string; icon: LucideIcon; title: string; text: string; action: string }[] = [
  {
    href: "/tools/hotel-cancellation-deadline-calculator",
    icon: CalendarClock,
    title: "Hotel cancellation deadline calculator",
    text: "Calculate the latest cancellation time from check-in date, policy window, cutoff time, and hotel time zone.",
    action: "Open calculator",
  },
  {
    href: "/tools/flight-arrival-time-calculator",
    icon: PlaneLanding,
    title: "Flight time calculator",
    text: "Estimate flight time and see your local arrival time, date change and time difference, with each airport's time zone built in.",
    action: "Open calculator",
  },
  {
    href: "/tools/jet-lag-calculator",
    icon: MoonStar,
    title: "Jet lag calculator",
    text: "See how long jet lag will last for your flight and get a day-by-day sleep and light plan.",
    action: "Open calculator",
  },
  {
    href: "/tools/layover-calculator",
    icon: TicketsPlane,
    title: "Layover calculator",
    text: "Check whether your connection time is enough for terminal changes, passport control, bag re-checks and separate tickets.",
    action: "Open calculator",
  },
  {
    href: "/tools/travel-checklist",
    icon: ListChecks,
    title: "Travel checklist generator",
    text: "Build a documents and packing checklist for your trip, tick it off, then print or download it.",
    action: "Open checklist",
  },
]

export default function ToolsIndexPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f0e8] pt-28 text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <div className="pointer-events-none absolute -inset-inline-end-44 top-20 h-[32rem] w-[32rem] rounded-full border border-[#41382e]/10" aria-hidden="true" />
      <SectionContainer className="relative pb-20 pt-8 lg:pb-28 lg:pt-12">
        <div className="grid items-end gap-8 min-[850px]:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.65fr)] min-[850px]:gap-16">
          <div><p className="inline-flex w-fit rounded-full bg-white/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4d20af] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)]">Travel tools</p>
          <h1 className="design-one-display-index mt-6">Practical tools for the trips you book</h1></div>
          <p className="max-w-3xl text-lg leading-8 text-[#626262]">
            Use focused tools to calculate deadlines, arrival times, connections and jet lag, and keep important travel details close
            to the booking.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 min-[850px]:mt-14">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block rounded-[2rem] bg-[#121212] p-7 text-[#f7f2e9] shadow-[0_30px_70px_rgba(42,20,82,0.18)] transition-transform duration-150 hover:-translate-y-1 sm:p-10"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#602ad2] text-white"><Icon className="h-5 w-5" /></div>
                <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{tool.title}</h2>
                <p className="mt-4 max-w-2xl leading-7 text-[#b9b0a3]">{tool.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#a98af0]">
                  {tool.action}
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
