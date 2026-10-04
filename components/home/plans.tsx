"use client"

import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check } from "lucide-react"
import { useState } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

/** Plan facts follow seo/research/app-feature-inventory.md: Pro gates only email import, live alerts and Live Activity/widgets. */
const BASIC = [
  "Manual trips, boarding-pass scanning and the document vault",
  "Cancellation-deadline and check-in reminders",
  "Expenses in 153 currencies, with budgets",
  "CSV and PDF export, CSV import, trip map and offline access",
]
const PRO = [
  "Everything in Basic",
  "Booking-email import with draft review (monthly allowance)",
  "Live flight-status alerts on supported flights",
  "Live Activity, Dynamic Island and widgets",
]

export function Plans() {
  const reduce = useReducedMotion()
  const [yearly, setYearly] = useState(true)
  const price = yearly ? "$49.99" : "$5.99"

  return (
    <section id="plans" className="relative overflow-hidden bg-tc-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-balance font-tc-display text-[clamp(36px,4.8vw,60px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink">
            Free to start. Pro when it helps.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[18px] leading-8 text-tc-ink-2 sm:text-[19px]">
            TripCache is free to download. Upgrade when you want your inbox to do the typing.
          </p>

          <div
            role="radiogroup"
            aria-label="Billing period"
            className="mx-auto mt-9 inline-flex rounded-[14px] border border-tc-line bg-white p-1 shadow-[0_1px_2px_rgba(14,14,14,0.05)]"
          >
            {[
              { value: false, label: "Monthly" },
              { value: true, label: "Yearly · save 30%" },
            ].map((option) => {
              const active = option.value === yearly
              return (
                <button
                  key={option.label}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setYearly(option.value)}
                  className="relative h-10 rounded-[10px] px-5 text-[14px] font-semibold"
                >
                  {active ? (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-[10px] bg-tc-violet"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  <span className={`relative ${active ? "text-white" : "text-tc-mute hover:text-tc-ink"}`}>{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          <article className="flex flex-col rounded-[30px] border border-tc-line bg-white p-8 shadow-[0_30px_60px_-44px_rgba(45,27,87,0.4)] sm:p-10">
            <h3 className="font-tc-display text-[24px] font-semibold text-tc-ink">Basic</h3>
            <p className="mt-1 text-[15px] text-tc-mute">Organize trips for free.</p>
            <p className="mt-8 flex items-baseline gap-2">
              <span className="font-tc-display text-[60px] font-semibold leading-none tracking-[-0.02em] text-tc-ink">$0</span>
              <span className="text-[16px] text-tc-mute">forever</span>
            </p>
            <ul className="mt-8 flex flex-col gap-3.5">
              {BASIC.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[15.5px] text-tc-ink-2">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-tc-hotel" strokeWidth={2.4} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#download"
              className="tc-press mt-10 inline-flex h-12 items-center justify-center rounded-[12px] border border-tc-line bg-tc-mist px-6 text-[15px] font-semibold text-tc-ink transition-colors hover:bg-tc-line lg:mt-auto"
            >
              Download free
            </a>
          </article>

          <div>
            <article className="relative flex h-full flex-col overflow-hidden rounded-[30px] bg-[linear-gradient(150deg,#612bd3_0%,#4a1eac_60%,#2f137c_100%)] p-8 text-white shadow-[0_40px_80px_-40px_rgba(97,43,211,0.8)] sm:p-10">
              <span aria-hidden="true" className="tc-bloom pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-[#d82d7e] opacity-55" />
              <div className="flex items-center justify-between gap-4">
                <h3 className="relative font-tc-display text-[24px] font-semibold">Pro</h3>
                <AnimatePresence initial={false}>
                  {yearly ? (
                    <motion.span
                      className="relative rounded-full bg-[#fec84b] px-2.5 py-1 text-[12px] font-bold text-tc-ink"
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      Save 30%
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
              <p className="relative mt-1 text-[15px] text-[#e4dcff]">Add email import and live flight alerts.</p>
              <div className="relative mt-8 flex items-baseline gap-2">
                <span className="relative inline-flex h-[62px] overflow-hidden font-tc-display text-[60px] font-semibold leading-none tracking-[-0.02em] tabular-nums">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      key={price}
                      initial={reduce ? false : { y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      {price}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-[16px] text-[#e4dcff]">{yearly ? "/ year" : "/ month"}</span>
              </div>
              <p className="relative mt-2 text-[14px] text-[#e4dcff]">
                {yearly
                  ? "$49.99 on Google Play, $50.00 on the App Store: about $4.17 a month, 30% less than monthly."
                  : "$71.88 over 12 months. Cancel anytime in your App Store or Google Play subscriptions."}
              </p>
              <ul className="relative mt-8 grid gap-3.5 sm:grid-cols-2">
                {PRO.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[15.5px] text-white/90">
                    <Check className="mt-0.5 size-[18px] shrink-0 text-[#fec84b]" strokeWidth={2.4} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#download"
                  className="tc-press inline-flex h-12 items-center justify-center rounded-[12px] bg-white px-6 text-[15px] font-semibold text-tc-violet transition-colors hover:bg-tc-violet-soft"
                >
                  Get the app
                </a>
                <Link
                  href="/pricing"
                  prefetch={false}
                  className="inline-flex items-center gap-1 text-[15px] font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Compare plans
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[70ch] text-center text-[13.5px] leading-6 text-tc-mute">
          US prices as of October 2026; your store may show local pricing. You upgrade to Pro inside the mobile app.
          Storage limits are the same on both plans.
        </p>
      </div>
    </section>
  )
}
