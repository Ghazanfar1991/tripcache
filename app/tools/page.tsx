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
    <main className="min-h-screen bg-background pt-28">
      <SectionContainer className="pb-16 lg:pb-24">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Travel tools</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Practical tools for refundable bookings</h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Use focused tools to calculate deadlines, plan reminders, and keep important travel details close to the
            booking.
          </p>
        </div>

        <div className="mt-10 max-w-xl">
          <Link
            href="/tools/hotel-cancellation-deadline-calculator"
            className="block rounded-2xl border border-border/60 bg-card/50 p-6 transition hover:border-primary/40 hover:text-primary"
          >
            <CalendarClock className="h-8 w-8 text-primary" />
            <h2 className="mt-5 text-xl font-bold">Hotel cancellation deadline calculator</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Calculate the latest cancellation time from check-in date, policy window, cutoff time, and hotel time zone.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold">
              Open calculator
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
