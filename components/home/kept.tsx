import type { ReactNode } from "react"
import { Bloom } from "./category"
import { CsvPreview, DeadlineCountdown, LiveActivityCard, PinVault, RouteMap, SpendBars } from "./kept-visuals"

function BloomCard({
  className = "",
  bloom,
  title,
  text,
  dark = false,
  children,
}: {
  className?: string
  bloom: string
  title: string
  text: string
  dark?: boolean
  children: ReactNode
}) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-[30px] border ${
        dark ? "border-white/10 bg-[#0b0b10] text-white" : "border-tc-line bg-white text-tc-ink"
      } shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-40px_rgba(45,27,87,0.4)] ${className}`}
    >
      <Bloom className="-right-24 -top-28 size-80 opacity-45" color={bloom} />
      <div className="relative px-6 pt-7 sm:px-8 sm:pt-8">
        <h3 className="font-tc-display text-[25px] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[28px]">{title}</h3>
        <p className={`mt-2.5 max-w-[46ch] text-[15.5px] leading-7 ${dark ? "text-white/65" : "text-tc-mute"}`}>{text}</p>
      </div>
      <div className="relative mt-auto px-4 pb-5 pt-8 sm:px-8 sm:pb-8">{children}</div>
    </article>
  )
}

export function Kept() {
  return (
    <section className="relative bg-tc-canvas pb-24 pt-24 sm:pb-32 sm:pt-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="text-balance font-tc-display text-[clamp(36px,4.8vw,62px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink">
            Kept with the trip, not lost in the inbox.
          </h2>
          <p className="max-w-[50ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[18px]">
            Once the bookings are in, TripCache holds on to the details that usually scatter: the cancellation cutoff,
            the boarding pass, the receipts, the plan for each day.
          </p>
        </div>

        <div className="tc-reveal mt-14 grid gap-5 lg:grid-cols-12">
          <BloomCard
            className="lg:col-span-7"
            bloom="#f59e0b"
            title="Free cancellation, before it’s gone."
            text="Save the cutoff from a refundable booking and choose when to hear about it. Your provider’s terms stay the final word."
          >
            <DeadlineCountdown />
          </BloomCard>

          <BloomCard
            className="lg:col-span-5"
            bloom="#8b5cf6"
            title="Documents behind a PIN."
            text="Boarding passes, tickets, visas and passport copies attached to the trip they belong to, behind an optional PIN."
          >
            <PinVault />
          </BloomCard>

          <BloomCard
            className="lg:col-span-5"
            bloom="#00ff9e"
            dark
            title="Live on your lock screen."
            text="With Pro, supported flights show progress as a Live Activity. Airlines and airports remain the source of truth."
          >
            <LiveActivityCard />
          </BloomCard>

          <BloomCard
            className="lg:col-span-7"
            bloom="#6366f1"
            title="Every stop on one map."
            text="Flights, stays and activities plotted in destination context, so the shape of each day makes sense at a glance."
          >
            <RouteMap />
          </BloomCard>

          <BloomCard
            className="lg:col-span-6"
            bloom="#12b76a"
            title="A budget for every trip."
            text="Track costs as you go in any of 153 currencies, and keep receipts as trip documents."
          >
            <div className="mb-8">
              <p className="text-[14px] font-semibold text-tc-ink-2">Trip to Manila · 7 days</p>
              <p className="mt-1 font-tc-display text-[clamp(56px,6.4vw,80px)] font-light leading-none tracking-[-0.03em] tabular-nums text-tc-ink">
                A$1,500
              </p>
              <p className="mt-2 text-[17px] text-tc-ink-2">
                <span className="font-semibold text-tc-ink">A$623</span> spent · A$877 left
              </p>
            </div>
            <SpendBars />
          </BloomCard>

          <BloomCard
            className="lg:col-span-6"
            bloom="#ec4899"
            title="CSV and PDF export, ready for review."
            text="Free on every plan: export expenses or travel history for reimbursement, client billing, a visa application or your own records."
          >
            <CsvPreview />
          </BloomCard>
        </div>
      </div>
    </section>
  )
}
