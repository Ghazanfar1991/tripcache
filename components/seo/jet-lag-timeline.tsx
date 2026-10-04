"use client"

/**
 * The day-by-day jet lag plan. Each day is a card: a simple 24-hour strip (sleep + light only) and a
 * time-ordered schedule underneath that reads like an agenda. The strip is decorative; the schedule
 * carries the information.
 */
import { motion, useReducedMotion } from "framer-motion"
import { Glasses, MoonStar, Plane, PlaneLanding, PlaneTakeoff, Sun } from "lucide-react"
import { useState, type ReactNode } from "react"
import { cx } from "@/components/site/kit"
import { formatDuration, formatIn, zoneAbbreviation, type Place } from "@/lib/flight-time"
import { formatShift, type Block, type BlockKind, type JetLagPlan, type PlanDay } from "@/lib/jet-lag"

const EASE = [0.16, 1, 0.3, 1] as const

type Kind = "sleep" | "seek" | "avoid"

const STYLE: Record<Kind, { label: string; hint: string; bar: string; icon: typeof Sun; chip: string }> = {
  sleep: {
    label: "Sleep",
    hint: "Lights out, phone away",
    bar: "bg-tc-violet",
    icon: MoonStar,
    chip: "bg-tc-violet-soft text-tc-violet",
  },
  seek: {
    label: "Get bright light",
    hint: "Go outside or sit by a bright window",
    bar: "bg-[#fdb022]",
    icon: Sun,
    chip: "bg-[#fff5d6] text-[#b54708]",
  },
  avoid: {
    label: "Avoid bright light",
    hint: "Dim screens; sunglasses if you’re outside",
    bar: "bg-[#475467]",
    icon: Glasses,
    chip: "bg-[#eef0f3] text-[#344054]",
  },
}

const asKind = (kind: BlockKind): Kind | null => (kind === "sleep" || kind === "flightSleep" ? "sleep" : kind === "seek" || kind === "avoid" ? kind : null)

export function Legend({ className }: { className?: string }) {
  return (
    <ul className={cx("flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-tc-ink-2", className)}>
      {(Object.keys(STYLE) as Kind[]).map((kind) => (
        <li key={kind} className="flex items-center gap-2">
          <span aria-hidden="true" className={cx("inline-block h-2.5 w-6 rounded-full", STYLE[kind].bar)} />
          {STYLE[kind].label}
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* 24-hour strip                                                       */
/* ------------------------------------------------------------------ */

function DayStrip({ day }: { day: PlanDay }) {
  const reduce = useReducedMotion()
  const span = day.end.getTime() - day.start.getTime()
  const pct = (date: Date) => Math.min(100, Math.max(0, ((date.getTime() - day.start.getTime()) / span) * 100))
  const bars = day.blocks
    .map((block) => ({ block, kind: asKind(block.kind) }))
    .filter((item): item is { block: Block; kind: Kind } => item.kind !== null)

  return (
    <div aria-hidden="true">
      <div className="relative h-[46px] rounded-[12px] bg-[linear-gradient(to_right,#eef0f8_0%,#f8f9fb_25%,#fffaf0_50%,#f8f9fb_75%,#eef0f8_100%)] ring-1 ring-inset ring-tc-line">
        {[25, 50, 75].map((tick) => (
          <span key={tick} className="absolute inset-y-2 w-px bg-tc-line" style={{ left: `${tick}%` }} />
        ))}
        {bars.map(({ block, kind }) => {
          const left = pct(block.start)
          const width = Math.max(1, pct(block.end) - left)
          return (
            <motion.span
              key={`${block.kind}-${block.start.getTime()}`}
              initial={false}
              animate={{ left: `${left}%`, width: `${width}%` }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
              className={cx(
                "absolute rounded-full",
                STYLE[kind].bar,
                kind === "sleep" ? "top-[21px] h-[16px]" : "top-[8px] h-[8px]",
              )}
              style={{ left: `${left}%`, width: `${width}%` }}
            />
          )
        })}
      </div>
      <div className="relative mt-1.5 h-4 text-[11px] font-medium tabular-nums text-tc-mute">
        {[
          ["0%", "12 am", "translate-x-0"],
          ["25%", "6 am", "-translate-x-1/2"],
          ["50%", "Noon", "-translate-x-1/2"],
          ["75%", "6 pm", "-translate-x-1/2"],
          ["100%", "12 am", "-translate-x-full"],
        ].map(([left, label, shift]) => (
          <span key={left} className={cx("absolute top-0 whitespace-nowrap", shift)} style={{ left }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Agenda                                                              */
/* ------------------------------------------------------------------ */

function Agenda({ items, tz }: { items: Block[]; tz: string }) {
  const time = (date: Date) => formatIn(date, tz, { hour: "numeric", minute: "2-digit" })
  return (
    <ol className="flex flex-col">
      {items.map((block) => {
        const kind = asKind(block.kind)
        if (!kind) return null
        const style = STYLE[kind]
        const Icon = block.kind === "flightSleep" ? Plane : style.icon
        return (
          <li key={`${block.kind}-${block.start.getTime()}`} className="flex items-start gap-2.5 border-t border-tc-line py-3 first:border-t-0 sm:gap-4">
            <span className="w-[80px] shrink-0 pt-1 text-[13.5px] font-semibold leading-5 tabular-nums text-tc-ink sm:w-[150px] sm:pt-1.5 sm:text-[14px]">
              {time(block.start)}
              <span className="font-normal text-tc-mute">
                <span className="hidden sm:inline"> – </span>
                <span className="block whitespace-nowrap sm:inline">
                  <span className="sm:hidden">to </span>
                  {time(block.end)}
                </span>
              </span>
            </span>
            <span aria-hidden="true" className={cx("grid size-8 shrink-0 place-items-center rounded-full", style.chip)}>
              <Icon className="size-4" strokeWidth={2.2} />
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="block text-[15px] font-semibold leading-6 text-tc-ink">{block.kind === "flightSleep" ? "Sleep on the plane" : style.label}</span>
              <span className="block text-[13px] leading-5 text-tc-mute sm:text-[13.5px]">{style.hint}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

function Badge({ children, tone }: { children: ReactNode; tone: "violet" | "green" | "amber" }) {
  const tones = { violet: "bg-tc-violet-soft text-tc-violet", green: "bg-[#e8f8f0] text-[#067647]", amber: "bg-[#fff5d6] text-[#b54708]" }
  return <span className={cx("inline-flex shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold", tones[tone])}>{children}</span>
}

function DayCard({ day, badge, step }: { day: PlanDay; badge: ReactNode; step: number }) {
  return (
    <li className="relative sm:pl-14">
      {/* Rail dot */}
      <span aria-hidden="true" className="absolute left-0 top-5 hidden size-9 place-items-center rounded-full border-2 border-white bg-tc-violet text-[12px] font-bold text-white shadow-[0_0_0_1px_#e7e9eb] sm:grid">
        {step}
      </span>
      <article className="rounded-[20px] border border-tc-line bg-white p-4 sm:rounded-[22px] sm:p-6">
        <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div>
            <h4 className="font-tc-display text-[19px] font-semibold leading-tight text-tc-ink sm:text-[21px]">
              <span className="mr-2 inline-grid size-6 place-items-center rounded-full bg-tc-violet align-[3px] font-tc text-[11px] font-bold text-white sm:hidden">{step}</span>
              {day.title}
            </h4>
            <p className="mt-0.5 text-[13.5px] text-tc-mute">{formatIn(day.start, day.tz, { weekday: "long", day: "numeric", month: "long" })}</p>
          </div>
          {badge}
        </header>
        <p className="mt-3 text-[15px] leading-6 text-tc-ink-2">{day.note}</p>
        <div className="mt-4">
          <DayStrip day={day} />
        </div>
        <div className="mt-3">
          <Agenda items={day.items} tz={day.tz} />
        </div>
      </article>
    </li>
  )
}

function FlightCard({ plan, from, to, step }: { plan: JetLagPlan; from: Place; to: Place; step: number }) {
  const reduce = useReducedMotion()
  const { start, end, sleep, tips } = plan.flight
  const span = end.getTime() - start.getTime()
  const at = (date: Date, tz: string) => `${formatIn(date, tz, { weekday: "short", hour: "numeric", minute: "2-digit" })} ${zoneAbbreviation(date, tz)}`
  const left = sleep ? ((sleep.start.getTime() - start.getTime()) / span) * 100 : 0
  const width = sleep ? ((sleep.end.getTime() - sleep.start.getTime()) / span) * 100 : 0

  return (
    <li className="relative sm:pl-14">
      <span aria-hidden="true" className="absolute left-0 top-5 hidden size-9 place-items-center rounded-full border-2 border-white bg-[#4f46e5] text-white shadow-[0_0_0_1px_#e7e9eb] sm:grid">
        <Plane className="size-4" />
        <span className="sr-only">{step}</span>
      </span>
      <article className="rounded-[22px] border border-[#c7d2fe] bg-[#f5f7ff] p-4 sm:p-6">
        <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div>
            <h4 className="font-tc-display text-[19px] font-semibold leading-tight text-tc-ink sm:text-[21px]">
              Flight {from.iata} → {to.iata}
            </h4>
            <p className="mt-0.5 text-[13.5px] text-tc-mute">{formatIn(start, from.tz, { weekday: "long", day: "numeric", month: "long" })}</p>
          </div>
          <Badge tone="violet">Switch to {to.city} time</Badge>
        </header>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[14px] bg-white p-3 ring-1 ring-inset ring-[#e0e7ff]">
            <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#4f46e5]">
              <PlaneTakeoff className="size-3.5" aria-hidden="true" /> Takes off
            </p>
            <p className="mt-1 text-[15px] font-semibold tabular-nums text-tc-ink">{at(start, from.tz)}</p>
            <p className="text-[12.5px] tabular-nums text-tc-mute">{at(start, to.tz)} in {to.city}</p>
          </div>
          <div className="rounded-[14px] bg-white p-3 ring-1 ring-inset ring-[#e0e7ff]">
            <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#4f46e5]">
              <PlaneLanding className="size-3.5" aria-hidden="true" /> Lands
            </p>
            <p className="mt-1 text-[15px] font-semibold tabular-nums text-tc-ink">{at(end, to.tz)}</p>
            <p className="text-[12.5px] tabular-nums text-tc-mute">{at(end, from.tz)} on your body clock</p>
          </div>
        </div>

        <div aria-hidden="true" className="mt-4">
          <div className="relative h-[34px] rounded-full bg-white ring-1 ring-inset ring-[#c7d2fe]">
            {sleep ? (
              <motion.span
                initial={false}
                animate={{ left: `${left}%`, width: `${width}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
                className="absolute inset-y-[7px] flex items-center justify-center gap-1.5 rounded-full bg-tc-violet text-[11px] font-semibold text-white"
                style={{ left: `${left}%`, width: `${width}%` }}
              >
                <MoonStar className="size-3" /> <span className="hidden sm:inline">Sleep</span>
              </motion.span>
            ) : null}
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] font-medium text-tc-mute">
            <span>Take-off</span>
            <span>{formatDuration(Math.round(span / 60000))} in the air</span>
            <span>Landing</span>
          </div>
        </div>

        {sleep ? (
          <div className="mt-3">
            <Agenda items={[sleep]} tz={to.tz} />
          </div>
        ) : null}

        <ul className="mt-3 flex flex-col gap-2 border-t border-[#e0e7ff] pt-4 text-[14.5px] leading-6 text-tc-ink-2">
          {tips.map((tip) => (
            <li key={tip} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#4f46e5]" />
              {tip}
            </li>
          ))}
        </ul>
      </article>
    </li>
  )
}

function Phase({ title, zone, children }: { title: string; zone: string; children: ReactNode }) {
  return (
    <section aria-label={title}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-tc-display text-[22px] font-semibold tracking-[-0.01em] text-tc-ink sm:text-[25px]">{title}</h3>
        <p className="text-[13px] text-tc-mute">{zone}</p>
      </div>
      <ol className="relative flex flex-col gap-4 sm:before:absolute sm:before:bottom-6 sm:before:left-[17px] sm:before:top-6 sm:before:w-[2px] sm:before:bg-[linear-gradient(to_bottom,#ddd6fe,#e7e9eb)]">
        {children}
      </ol>
    </section>
  )
}

type PhaseKey = "before" | "flight" | "after"

export function JetLagTimeline({ plan, from, to }: { plan: JetLagPlan; from: Place; to: Place }) {
  const reduce = useReducedMotion()
  const direction = plan.direction
  const phases: { key: PhaseKey; label: string; count: number }[] = [
    ...(plan.before.length ? [{ key: "before" as const, label: "Before you fly", count: plan.before.length }] : []),
    { key: "flight", label: "In the air", count: 1 },
    { key: "after", label: "After you land", count: plan.after.length },
  ]
  const [active, setActive] = useState<PhaseKey | "all">("all")
  const show = (key: PhaseKey) => active === "all" || active === key
  // Step numbers stay fixed whichever phase is shown.
  const flightStep = plan.before.length + 1

  return (
    <div>
      {/* Phase filter */}
      <div role="group" aria-label="Show part of the plan" className="mb-8 flex gap-1.5 overflow-x-auto rounded-[16px] bg-tc-mist p-1.5 [scrollbar-width:none]">
        {[{ key: "all" as const, label: "Whole plan", count: plan.before.length + 1 + plan.after.length }, ...phases].map((phase) => {
          const isActive = active === phase.key
          return (
            <button
              key={phase.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(phase.key)}
              className="relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-[12px] px-3.5 text-[14px] font-semibold"
            >
              {isActive ? (
                <motion.span
                  layoutId="jetlag-phase"
                  className="absolute inset-0 rounded-[12px] bg-white shadow-[0_6px_16px_-10px_rgba(45,27,87,0.6)] ring-1 ring-tc-line"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className={cx("relative whitespace-nowrap", isActive ? "text-tc-ink" : "text-tc-mute hover:text-tc-ink")}>{phase.label}</span>
              <span className={cx("relative rounded-full px-1.5 text-[11.5px] tabular-nums", isActive ? "bg-tc-violet-soft text-tc-violet" : "bg-white text-tc-mute")}>{phase.count}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-12">
        {plan.before.length && show("before") ? (
          <Phase title="Before you fly" zone={`Times in ${from.city} time`}>
            {plan.before.map((day, index) => {
              return (
                <DayCard
                  key={day.key}
                  step={index + 1}
                  day={day}
                  badge={<Badge tone="violet">{formatShift(day.hours)} {direction === "east" ? "earlier" : "later"}</Badge>}
                />
              )
            })}
          </Phase>
        ) : null}

        {show("flight") ? (
          <Phase title="In the air" zone={`Sleep times in ${to.city} time`}>
            <FlightCard plan={plan} from={from} to={to} step={flightStep} />
          </Phase>
        ) : null}

        {show("after") ? (
          <Phase title="After you land" zone={`Times in ${to.city} time`}>
            {plan.after.map((day, index) => {
              return (
                <DayCard
                  key={day.key}
                  step={flightStep + 1 + index}
                  day={day}
                  badge={
                    day.hours > 0 ? (
                      <Badge tone="amber">
                        Body clock {Number.isInteger(day.hours) ? formatShift(day.hours) : formatDuration(Math.round(day.hours * 60))} {direction === "east" ? "behind" : "ahead"}
                      </Badge>
                    ) : (
                      <Badge tone="green">On {to.city} time</Badge>
                    )
                  }
                />
              )
            })}
          </Phase>
        ) : null}
      </div>
    </div>
  )
}
