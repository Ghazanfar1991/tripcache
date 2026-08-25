import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarClock } from "lucide-react"

import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/section-container"

export const metadata: Metadata = {
  title: "TripCache Travel Tools",
  description:
    "Free TripCache tools for travelers, starting with a hotel cancellation deadline calculator for refundable bookings.",
  alternates: {
    canonical: "/tools",
  },
}

export default function ToolsIndexPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f0e8] pt-28 text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <div className="pointer-events-none absolute -inset-inline-end-44 top-20 h-[32rem] w-[32rem] rounded-full border border-[#41382e]/10" aria-hidden="true" />
      <SectionContainer className="relative pb-20 pt-8 lg:pb-28 lg:pt-12">
        <div className="grid items-end gap-8 min-[850px]:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.65fr)] min-[850px]:gap-16">
          <div><p className="inline-flex w-fit rounded-full bg-white/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4d20af] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)]">Travel tools</p>
          <h1 className="design-one-display-index mt-6">Practical tools for refundable bookings</h1></div>
          <p className="max-w-3xl text-lg leading-8 text-[#626262]">
            Use focused tools to calculate deadlines, plan reminders, and keep important travel details close to the
            booking.
          </p>
        </div>

        <div className="mt-12 max-w-3xl min-[850px]:ms-auto min-[850px]:mt-14">
          <Link
            href="/tools/hotel-cancellation-deadline-calculator"
            className="group block rounded-[2rem] bg-[#121212] p-7 text-[#f7f2e9] shadow-[0_30px_70px_rgba(42,20,82,0.18)] transition-transform duration-150 hover:-translate-y-1 sm:p-10"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#602ad2] text-white"><CalendarClock className="h-5 w-5" /></div>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Hotel cancellation deadline calculator</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#b9b0a3]">
              Calculate the latest cancellation time from check-in date, policy window, cutoff time, and hotel time zone.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#a98af0]">
              Open calculator
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
