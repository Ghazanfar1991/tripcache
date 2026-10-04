import "../secondary.css"
import "./tools.css"

import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, CalendarClock, ListChecks, MoonStar, Plane, Timer, type LucideIcon } from "lucide-react"

import { Footer } from "@/components/footer"
import { Bloom } from "@/components/home/category"
import { Container, CtaBand, PageHero, Section, SectionHeading, SitePage } from "@/components/site/kit"
import { DepartureBoard } from "@/components/site/tools-departure-board"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Free Travel Tools",
  description:
    "Free TripCache travel tools: flight time, jet lag and layover calculators, a travel checklist generator and a hotel cancellation deadline calculator.",
  path: "/tools",
})

type Tool = {
  href: string
  icon: LucideIcon
  /** Category tint for the icon disc (soft background + ink text). */
  tile: string
  bloom: string
  title: string
  text: string
  action: string
  board: { meta: string; label: string; rows: { text: string; tone?: "gold" }[]; icon?: ReactNode }
}

const tools: Tool[] = [
  {
    href: "/tools/hotel-cancellation-deadline-calculator",
    icon: CalendarClock,
    tile: "bg-[#e8f8f0] text-[#067647]",
    bloom: "#12b76a",
    title: "Hotel cancellation deadline calculator",
    text: "Calculate the latest cancellation time from check-in date, policy window, cutoff time, and hotel time zone.",
    action: "Open calculator",
    board: { meta: "Hotel time zone", label: "Free cancellation", rows: [{ text: "CANCEL BY" }, { text: "6 PM LOCAL TIME", tone: "gold" }] },
  },
  {
    href: "/tools/flight-arrival-time-calculator",
    icon: Plane,
    tile: "bg-[#eef2ff] text-[#4f46e5]",
    bloom: "#6366f1",
    title: "Flight time calculator",
    text: "Estimate flight time and see your local arrival time, date change and time difference, with each airport's time zone built in.",
    action: "Open calculator",
    board: {
      meta: "SYD → LAX",
      label: "Local arrival",
      rows: [{ text: "LOS ANGELES" }, { text: "LANDS 4:20 PM", tone: "gold" }],
      icon: (
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#6366f1]/25 text-[#a5b4fc]">
          <Plane className="size-3.5" />
        </span>
      ),
    },
  },
  {
    href: "/tools/layover-calculator",
    icon: Timer,
    tile: "bg-[#fce7f2] text-[#c12570]",
    bloom: "#d82d7e",
    title: "Layover calculator",
    text: "Check whether your connection time is enough for terminal changes, passport control, bag re-checks and separate tickets.",
    action: "Open calculator",
    board: {
      meta: "LHR CONNECTION",
      label: "Verdict",
      rows: [{ text: "1H 25M" }, { text: "RISKY", tone: "gold" }],
      icon: (
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#d82d7e]/25 text-[#f9a8d4]">
          <Timer className="size-3.5" />
        </span>
      ),
    },
  },
  {
    href: "/tools/jet-lag-calculator",
    icon: MoonStar,
    tile: "bg-[#ebe8ff] text-[#612bd3]",
    bloom: "#8b5cf6",
    title: "Jet lag calculator",
    text: "See how long jet lag will last for your flight and get a day-by-day sleep and light plan.",
    action: "Open calculator",
    board: {
      meta: "JFK → LHR",
      label: "Recovery",
      rows: [{ text: "LONDON" }, { text: "5 DAYS TO ADJUST", tone: "gold" }],
      icon: (
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#8b5cf6]/25 text-[#c4b5fd]">
          <MoonStar className="size-3.5" />
        </span>
      ),
    },
  },
  {
    href: "/tools/travel-checklist",
    icon: ListChecks,
    tile: "bg-[#fff5d6] text-[#b54708]",
    bloom: "#f59e0b",
    title: "Travel checklist generator",
    text: "Build a documents and packing checklist for your trip, tick it off, then print or download it.",
    action: "Open checklist",
    board: {
      meta: "INTERNATIONAL",
      label: "Checklist",
      rows: [{ text: "YOUR CHECKLIST" }, { text: "33 ITEMS", tone: "gold" }],
      icon: (
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#f59e0b]/25 text-[#fcd34d]">
          <ListChecks className="size-3.5" />
        </span>
      ),
    },
  },
]

export default function ToolsIndexPage() {
  return (
    <SitePage>
      <PageHero
        title="Practical tools for the trips you book"
        lede={
          <p>
            Use focused tools to calculate deadlines, arrival times, connections and jet lag, and keep important travel
            details close to the booking.
          </p>
        }
      />

      <Section tone="canvas" className="pt-8 sm:pt-10">
        <Container>
          <SectionHeading title="Travel tools" />

          <ul className="mt-10 grid gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group relative grid overflow-hidden rounded-[26px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(14,14,14,0.04),0_36px_70px_-40px_rgba(45,27,87,0.55)] sm:rounded-[30px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]"
                  >
                    <Bloom className="-left-24 -top-28 size-72 opacity-30" color={tool.bloom} />
                    <div className="relative flex flex-col p-6 sm:p-10">
                      <span className={`grid size-11 place-items-center rounded-full ${tool.tile}`}>
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-7 text-balance font-tc-display text-[26px] font-semibold leading-[1.12] tracking-[-0.015em] text-tc-ink sm:text-[32px]">
                        {tool.title}
                      </h3>
                      <p className="mt-3 max-w-[46ch] text-[16px] leading-7 text-tc-mute">{tool.text}</p>
                      <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-tc-violet lg:mt-auto lg:pt-8">
                        {tool.action}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="relative p-3 pt-0 sm:p-5 sm:pt-0 lg:pl-0 lg:pt-5">
                      <div className="tct-surface flex h-full flex-col justify-center rounded-[22px] p-4 sm:p-6">
                        <DepartureBoard meta={tool.board.meta} label={tool.board.label} rows={tool.board.rows} icon={tool.board.icon} />
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand placement="tools-index" />
      <Footer />
    </SitePage>
  )
}
