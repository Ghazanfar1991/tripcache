"use client"

import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { BedDouble, Check, Download, FileText, LockKeyhole, LockKeyholeOpen, Plane, Ticket } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LAND_DOTS, MAP_VIEWBOX } from "./map-dots"

const EASE = [0.16, 1, 0.3, 1] as const

/* ------------------------------------------------------------------ */
/* Free-cancellation countdown on a split-flap board                   */
/* ------------------------------------------------------------------ */

const COUNTDOWN_START = 1 * 86400 + 14 * 3600 + 22 * 60 + 5
const pad = (value: number) => value.toString().padStart(2, "0")
const FLAP_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

/** A flip-clock digit: the old top half falls away, then the new bottom half lands. */
function FlipDigit({ value, reduce }: { value: string; reduce: boolean }) {
  const [state, setState] = useState({ current: value, previous: value, turns: 0 })
  if (state.current !== value) setState({ current: value, previous: state.current, turns: state.turns + 1 })
  const { current, previous, turns } = state
  const flipping = turns > 0 && !reduce

  return (
    <span className="tc-flip" aria-hidden="true">
      <span className="tc-flip-half tc-flip-top">
        <span className="tc-flip-face">{current}</span>
      </span>
      <span className="tc-flip-half tc-flip-bottom">
        <span className="tc-flip-face">{flipping ? previous : current}</span>
      </span>
      {flipping ? (
        <>
          <span key={`t${turns}`} className="tc-flip-half tc-flip-top tc-flip-leaf-top">
            <span className="tc-flip-face">{previous}</span>
          </span>
          <span key={`b${turns}`} className="tc-flip-half tc-flip-bottom tc-flip-leaf-bottom">
            <span className="tc-flip-face">{current}</span>
          </span>
        </>
      ) : null}
    </span>
  )
}

/** A row of departure-board letters that shuffle before settling. */
function FlapText({ value, width, run, delay = 0, tone }: { value: string; width: number; run: boolean; delay?: number; tone: string }) {
  const target = value.padEnd(width, " ").slice(0, width)
  const [shown, setShown] = useState(target)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!run || reduce) return
    const settleAt = Array.from({ length: width }, (_, index) => (target[index] === " " ? 1 : 3 + index + Math.floor(Math.random() * 6)))
    let tick = 0
    let interval = 0
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        tick += 1
        setShown(
          Array.from({ length: width }, (_, index) =>
            tick >= settleAt[index] ? target[index] : FLAP_CHARSET[Math.floor(Math.random() * FLAP_CHARSET.length)],
          ).join(""),
        )
        if (settleAt.every((at) => tick >= at)) window.clearInterval(interval)
      }, 60)
    }, delay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [run, reduce, target, width, delay])

  return (
    <span className="flex gap-[2px]" style={{ color: tone }} aria-hidden="true">
      {Array.from(shown).map((char, index) => (
        <span key={index} className="tc-flap">
          <span key={char} className="tc-flap-char">
            {char === " " ? "\u00a0" : char}
          </span>
        </span>
      ))}
    </span>
  )
}

export function DeadlineCountdown() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" })
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion() ?? false
  const [left, setLeft] = useState(COUNTDOWN_START)

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => setLeft((value) => (value <= 1 ? COUNTDOWN_START : value - 1)), 1000)
    return () => window.clearInterval(id)
  }, [inView])

  const parts: [string, number][] = [
    ["Days", Math.floor(left / 86400)],
    ["Hours", Math.floor((left % 86400) / 3600)],
    ["Min", Math.floor((left % 3600) / 60)],
    ["Sec", left % 60],
  ]

  return (
    <div ref={ref}>
      <div className="tc-board rounded-[22px] px-4 pb-5 pt-4 text-white sm:px-5">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-white/80">
            <span className="grid size-6 place-items-center rounded-full bg-[#12b76a]/20 text-[#5ee4a5]">
              <BedDouble className="size-3.5" aria-hidden="true" />
            </span>
            <span className="sm:hidden">Example</span>
            <span className="hidden sm:inline">Example booking</span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fec84b]">Free cancellation</span>
        </div>
        <div className="mt-3.5 flex flex-col gap-1.5">
          <FlapText value="BELMONT HOTEL" width={16} run={seen} tone="#ffffff" />
          <FlapText value="CANCEL BY 11 MAY" width={16} run={seen} delay={220} tone="#fec84b" />
        </div>
        <p className="sr-only">Belmont Hotel. Free cancellation until 11 May. Time left: {Math.floor(left / 86400)} days {Math.floor((left % 86400) / 3600)} hours.</p>
        <div className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-4">
          {parts.map(([label, value]) => {
            const digits = pad(value)
            return (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span className="flex gap-[3px]">
                  <FlipDigit value={digits[0]} reduce={reduce} />
                  <FlipDigit value={digits[1]} reduce={reduce} />
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/55">{label}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-[12.5px]">
        {["7 days before", "2 days before"].map((chip) => (
          <span key={chip} className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5d6] px-3 py-1.5 font-semibold text-[#b54708]">
            <Check className="size-3.5" strokeWidth={2.8} aria-hidden="true" />
            {chip}
          </span>
        ))}
        <span className="inline-flex items-center rounded-full border border-tc-line px-3 py-1.5 font-medium text-tc-mute">Day of</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* PIN-protected documents                                             */
/* ------------------------------------------------------------------ */

const DOCUMENTS = [
  { icon: FileText, title: "Passport", meta: "Standard document · PIN protected" },
  { icon: Ticket, title: "Flight ticket", meta: "SYD → BKK · Trip to Bangkok" },
  { icon: BedDouble, title: "Hotel voucher", meta: "Belmont Hotel · Trip to Manila" },
]

export function PinVault() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const id = window.setInterval(() => setStep((value) => (value >= 11 ? 0 : value + 1)), 480)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  const shown = reduce ? 5 : step
  const filled = Math.min(shown, 4)
  const unlocked = shown >= 5

  return (
    <div ref={ref}>
      <div className="flex items-center gap-4 rounded-[20px] bg-tc-mist px-4 py-3.5">
        <motion.span
          className={`grid size-11 shrink-0 place-items-center rounded-full text-white transition-colors duration-500 ${unlocked ? "bg-tc-hotel" : "bg-tc-violet"}`}
          animate={unlocked && !reduce ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {unlocked ? <LockKeyholeOpen className="size-5" aria-hidden="true" /> : <LockKeyhole className="size-5" aria-hidden="true" />}
        </motion.span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-tc-ink">{unlocked ? "Documents unlocked" : "Enter document PIN"}</p>
          <div className="mt-1.5 flex gap-2.5" aria-hidden="true">
            {[0, 1, 2, 3].map((dot) => (
              <motion.span
                key={dot}
                className="size-2.5 rounded-full border border-tc-violet/40"
                animate={{
                  backgroundColor: dot < filled ? (unlocked ? "#12b76a" : "#612bd3") : "rgba(97,43,211,0)",
                  scale: dot === filled - 1 && !unlocked && !reduce ? [1, 1.4, 1] : 1,
                }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {DOCUMENTS.map((doc, index) => {
          const Icon = doc.icon
          return (
            <motion.li
              key={doc.title}
              className="flex items-center gap-3 rounded-[16px] border border-tc-line bg-white px-3.5 py-3"
              animate={{ opacity: unlocked ? 1 : 0.4, filter: unlocked ? "blur(0px)" : "blur(2.5px)" }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: unlocked ? index * 0.08 : 0 }}
            >
              <span className="grid size-9 place-items-center rounded-[10px] bg-tc-violet-soft text-tc-violet">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold text-tc-ink">{doc.title}</span>
                <span className="block truncate text-[12.5px] text-tc-mute">{doc.meta}</span>
              </span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Live Activity, rebuilt from the app's widget (WidgetLiveActivity.swift) */
/* ------------------------------------------------------------------ */

const LINE = { start: 104, end: 288, y: 9 }

function formatRemaining(minutes: number) {
  const whole = Math.max(0, Math.round(minutes))
  return `${Math.floor(whole / 60)}h ${pad(whole % 60)}m`
}

export function LiveActivityCard() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const eased = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.6 })
  const planeX = useTransform(eased, [0.1, 0.9], [LINE.start + 8, LINE.end - 30], { clamp: true })
  const activePath = useTransform(planeX, (x) => `M0 22 L34 22 C 60 22, 70 ${LINE.y}, 98 ${LINE.y} L ${x} ${LINE.y}`)
  const restPath = useTransform(planeX, (x) => `M ${x} ${LINE.y} L 300 ${LINE.y}`)
  const remaining = useTransform(planeX, [LINE.start + 8, LINE.end - 30], [124, 31])
  const remainingText = useTransform(remaining, formatRemaining)
  // The lock-screen clock is always arrival (7:55 PM, Sydney) minus the countdown, so the two agree.
  const clockText = useTransform(remaining, (minutes) => {
    const at = 19 * 60 + 55 - Math.round(minutes)
    return `${((Math.floor(at / 60) + 11) % 12) + 1}:${pad(at % 60)}`
  })

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {/* Lock-screen clock, so the widget sits where it lives */}
      <div aria-hidden="true" className="text-center text-white">
        <p className="text-[14px] font-medium text-white/70">Tuesday 19 May</p>
        <motion.p className="text-[64px] font-light leading-none tracking-[-0.03em] tabular-nums sm:text-[76px]">{reduce ? "6:31" : clockText}</motion.p>
      </div>
      {/* Dynamic Island, compact */}
      <div className="mx-auto flex h-[40px] w-[236px] items-center justify-between rounded-full bg-black pl-2 pr-1.5 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
        <span className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-tc-live text-black">
            <Plane className="size-3.5 rotate-45 fill-black" aria-hidden="true" />
          </span>
          <motion.span className="text-[14px] font-bold tabular-nums text-tc-live">{reduce ? "1h 24m" : remainingText}</motion.span>
        </span>
        <span className="rounded-full bg-tc-live-gate px-2.5 py-[3px] text-[12.5px] font-bold text-black">B7</span>
      </div>

      {/* Lock-screen Live Activity */}
      <div className="rounded-[28px] bg-[linear-gradient(to_bottom,#151517,#0d0d0f)] px-[18px] pb-3.5 pt-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
        <div className="flex items-center justify-between text-[12px] font-medium text-[#8f8f94]">
          <span className="flex items-center gap-1.5">
            <span className="grid h-[18px] w-[22px] place-items-center rounded-[5px] bg-[#0f3d2a] text-[8.5px] font-bold text-tc-live">PR</span>
            PR 211
          </span>
          <span>On Time</span>
        </div>
        <div className="mt-1.5 flex items-start justify-between">
          <div>
            <p className="text-[19px] font-bold leading-6 text-white">MNL</p>
            <p className="text-[17px] font-bold leading-6 text-tc-live tabular-nums">8:30 AM</p>
          </div>
          <div className="text-right">
            <p className="text-[19px] font-bold leading-6 text-white">SYD</p>
            <p className="text-[17px] font-bold leading-6 text-tc-live tabular-nums">7:55 PM</p>
          </div>
        </div>
        <div className="flex justify-between text-[11px] font-medium text-tc-live">
          <span>On Time</span>
          <span>On Time</span>
        </div>
        <svg viewBox="0 0 300 30" className="mt-1 h-[30px] w-full overflow-visible" aria-hidden="true">
          {reduce ? (
            <>
              <path d={`M0 22 L34 22 C 60 22, 70 ${LINE.y}, 98 ${LINE.y} L 150 ${LINE.y}`} fill="none" stroke="#00ff9e" strokeWidth="2.5" strokeLinecap="round" />
              <path d={`M150 ${LINE.y} L 300 ${LINE.y}`} fill="none" stroke="#2b2b2e" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <motion.path d={restPath} fill="none" stroke="#2b2b2e" strokeWidth="2.5" strokeLinecap="round" />
              <motion.path d={activePath} fill="none" stroke="#00ff9e" strokeWidth="2.5" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 4px rgba(0,255,158,0.6))" }} />
              <motion.g style={{ x: planeX }}>
                <path
                  transform={`translate(-9 ${LINE.y - 9})`}
                  d="M17.6 8.1 11.2 7.3 7.3 1.4C7.1 1.1 6.8 1 6.5 1H5.6l2.1 6.2-4.4-.5L2 4.9H1.2l.8 4.1-.8 4.1H2l1.3-1.8 4.4-.5L5.6 17h.9c.3 0 .6-.1.8-.4l3.9-5.9 6.4-.8c.5-.1.9-.5.9-1s-.4-.9-.9-.8Z"
                  fill="#ffffff"
                  fillOpacity="0.85"
                />
              </motion.g>
            </>
          )}
        </svg>
        <div className="relative mt-1 text-center">
          <motion.p className="text-[20px] font-bold leading-6 tabular-nums text-tc-live">{reduce ? "1h 24m" : remainingText}</motion.p>
          <p className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#8f8f94]">Until gate arrival</p>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-tc-live-gate px-2.5 py-1 text-[12.5px] font-bold text-black">
            B7
          </span>
        </div>
      </div>
      <p className="sr-only">Example Live Activity: flight PR 211 from Manila 8:30 AM to Sydney 7:55 PM, on time, counting down to gate arrival at gate B7.</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Trip map on a dot-matrix land map                                   */
/* ------------------------------------------------------------------ */

const STOPS = [
  { x: 71.3, y: 138.5, label: "Bangkok", note: "Fly out · 13 May", dx: 14, dy: 22, anchor: "start", color: "#6366f1" },
  { x: 375.3, y: 124.8, label: "Manila", note: "Belmont Hotel · 2 nights", dx: -16, dy: 26, anchor: "end", color: "#12b76a" },
  { x: 419.7, y: 194.8, label: "Cebu", note: "Island tour · 16 May", dx: -14, dy: 2, anchor: "end", color: "#d82d7e" },
  { x: 444.8, y: 247.8, label: "Davao", note: "Rental car · 18 May", dx: -14, dy: 8, anchor: "end", color: "#f59e0b" },
] as const

const FLIGHT_ARC = "M71.3 138.5 Q 223 18 375.3 124.8"
const ONWARD = "M375.3 124.8 Q 418 140 419.7 194.8 Q 432 226 444.8 247.8"

export function RouteMap() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const draw = reduce || inView

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Example trip map: fly from Bangkok to Manila, then on to Cebu and Davao"
    >
      <defs>
        <radialGradient id="tc-map-feather" cx="50%" cy="50%" r="62%">
          <stop offset="0.55" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id="tc-map-edges">
          <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="url(#tc-map-feather)" />
        </mask>
        <mask id="tc-map-reveal">
          <motion.circle
            cx={71.3}
            cy={138.5}
            fill="white"
            initial={{ r: reduce ? 620 : 0 }}
            animate={{ r: draw ? 620 : 0 }}
            transition={{ duration: 1.8, ease: EASE }}
          />
        </mask>
      </defs>
      <g mask="url(#tc-map-edges)">
        <path
          d={LAND_DOTS}
          fill="none"
          stroke="#612bd3"
          strokeOpacity="0.24"
          strokeWidth="2.7"
          strokeLinecap="round"
          mask="url(#tc-map-reveal)"
        />
      </g>
      <motion.path
        d={FLIGHT_ARC}
        fill="none"
        stroke="#6366f1"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: draw ? 1 : 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: reduce ? 0 : 0.6 }}
      />
      <motion.path
        d={ONWARD}
        fill="none"
        stroke="#612bd3"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.1 6"
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: draw ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: reduce ? 0 : 1.7 }}
      />
      {draw && !reduce ? (
        <g>
          <path
            d="M7.6 3.5 4.8 3.2 3.2.6C3.1.5 3 .4 2.8.4h-.4l.9 2.7-1.9-.2L.8 2.1H.5l.4 1.8-.4 1.8h.3l.6-.8 1.9-.2-.9 2.7h.4c.1 0 .3-.1.4-.2l1.6-2.6 2.8-.3c.2 0 .4-.2.4-.4s-.2-.4-.4-.4Z"
            transform="scale(1.6) translate(-4 -4)"
            fill="#4f46e5"
          >
            <animateMotion dur="5.5s" begin="1.9s" repeatCount="indefinite" rotate="auto" path={FLIGHT_ARC} />
          </path>
        </g>
      ) : null}
      {STOPS.map((stop, index) => (
        <motion.g
          key={stop.label}
          initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
          animate={{ opacity: draw ? 1 : 0, scale: draw ? 1 : 0.4 }}
          transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.5 + index * 0.35 }}
          style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
        >
          <circle cx={stop.x} cy={stop.y} r="13" fill={stop.color} fillOpacity="0.16">
            {reduce ? null : <animate attributeName="r" values="9;16;9" dur="3s" begin={`${index * 0.4}s`} repeatCount="indefinite" />}
          </circle>
          <circle cx={stop.x} cy={stop.y} r="6" fill="#ffffff" stroke={stop.color} strokeWidth="3" />
          <text
            x={stop.x + stop.dx}
            y={stop.y + stop.dy}
            textAnchor={stop.anchor}
            className="fill-tc-ink font-tc text-[13px] font-semibold"
            stroke="#ffffff"
            strokeWidth="4"
            paintOrder="stroke"
          >
            {stop.label}
          </text>
          <text
            x={stop.x + stop.dx}
            y={stop.y + stop.dy + 15}
            textAnchor={stop.anchor}
            className="fill-tc-mute font-tc text-[11px]"
            stroke="#ffffff"
            strokeWidth="4"
            paintOrder="stroke"
          >
            {stop.note}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Budget and CSV export                                               */
/* ------------------------------------------------------------------ */

type Spend = { color: string; amount: number }
const DAYS: { day: string; spend: Spend[] }[] = [
  { day: "13", spend: [{ color: "#6366f1", amount: 412 }, { color: "#12b76a", amount: 96 }] },
  { day: "14", spend: [{ color: "#f59e0b", amount: 58 }] },
  { day: "15", spend: [{ color: "#d82d7e", amount: 22 }, { color: "#9ca0a4", amount: 35 }] },
  { day: "16", spend: [] },
  { day: "17", spend: [] },
  { day: "18", spend: [] },
  { day: "19", spend: [] },
]
const MAX = 520
const CHART = 140
const AVERAGE = 89
const LEGEND = [
  ["Flight", "#6366f1"],
  ["Hotel", "#12b76a"],
  ["Car", "#f59e0b"],
  ["Activity", "#d82d7e"],
  ["Other", "#9ca0a4"],
] as const

export function SpendBars() {
  const reduce = useReducedMotion()
  return (
    <div role="img" aria-label="Daily spending for the sample trip: A$508 on 13 May (flight and hotel), A$58 on 14 May (car), A$57 on 15 May (tour and food); 16 to 19 May are still ahead.">
      <div className="relative flex h-[150px] items-end gap-2.5 sm:gap-3">
        <span aria-hidden="true" className="absolute inset-x-0 border-t border-dashed border-tc-violet/40" style={{ bottom: `${(AVERAGE / MAX) * CHART}px` }}>
          <span className="absolute -top-5 right-0 text-[11px] font-medium text-tc-violet">avg A$89/day</span>
        </span>
        {DAYS.map((entry, index) =>
          entry.spend.length ? (
            <motion.span
              key={entry.day}
              className="flex flex-1 flex-col-reverse overflow-hidden rounded-[8px]"
              style={{ transformOrigin: "bottom" }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: index * 0.07 }}
            >
              {entry.spend.map((part, partIndex) => (
                <span
                  key={partIndex}
                  className="block w-full"
                  style={{ backgroundColor: part.color, height: Math.max(10, (part.amount / MAX) * CHART) }}
                />
              ))}
            </motion.span>
          ) : (
            <span key={entry.day} className="h-6 flex-1 rounded-[8px] border border-dashed border-tc-line" />
          ),
        )}
      </div>
      <div aria-hidden="true" className="mt-2 flex gap-2.5 text-[11px] text-tc-mute sm:gap-3">
        {DAYS.map((entry) => (
          <span key={entry.day} className="flex-1 text-center tabular-nums">
            {entry.day}
          </span>
        ))}
      </div>
      <div aria-hidden="true" className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-tc-mute">
        {LEGEND.map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

const CSV_ROWS = [
  ["13 May", "Flight", "PR 731", "412.00"],
  ["13 May", "Hotel", "Belmont Hotel", "96.00"],
  ["14 May", "Car", "Rental · 1 day", "58.00"],
  ["15 May", "Activity", "Walking tour", "22.00"],
  ["15 May", "Food", "Receipt 12", "35.00"],
]

export function CsvPreview() {
  const reduce = useReducedMotion()
  return (
    <div className="overflow-hidden rounded-[20px] border border-tc-line bg-white shadow-[0_20px_40px_-30px_rgba(45,27,87,0.5)]">
      <div className="flex items-center justify-between border-b border-tc-line bg-tc-mist px-4 py-3">
        <span className="text-[13px] font-semibold text-tc-ink">trip-to-manila.csv</span>
        <span className="rounded-full bg-tc-violet-soft px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-tc-violet">Free</span>
      </div>
      <table className="w-full text-[12.5px] tabular-nums sm:text-[13px]">
        <caption className="sr-only">Sample CSV export of trip expenses</caption>
        <thead>
          <tr className="text-left text-tc-mute">
            <th scope="col" className="px-4 pb-1.5 pt-3 font-medium">Date</th>
            <th scope="col" className="px-2 pb-1.5 pt-3 font-medium">Category</th>
            <th scope="col" className="hidden px-2 pb-1.5 pt-3 font-medium sm:table-cell">Item</th>
            <th scope="col" className="px-4 pb-1.5 pt-3 text-right font-medium">A$</th>
          </tr>
        </thead>
        <tbody>
          {CSV_ROWS.map((row, index) => (
            <motion.tr
              key={row.join()}
              className="text-tc-ink-2"
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.15 + index * 0.1 }}
            >
              <td className="px-4 py-1.5">{row[0]}</td>
              <td className="px-2 py-1.5">{row[1]}</td>
              <td className="hidden px-2 py-1.5 sm:table-cell">{row[2]}</td>
              <td className="px-4 py-1.5 text-right">{row[3]}</td>
            </motion.tr>
          ))}
          <tr className="border-t border-tc-line text-tc-ink">
            <td className="px-4 pb-3 pt-2.5 font-semibold" colSpan={2}>
              Total
            </td>
            <td className="hidden sm:table-cell" />
            <td className="px-4 pb-3 pt-2.5 text-right font-semibold">623.00</td>
          </tr>
        </tbody>
      </table>
      <div className="px-4 pb-4">
        <span className="flex h-11 items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#3f6cff] to-[#22c3c9] text-[14px] font-semibold text-white">
          <Download className="size-4" aria-hidden="true" />
          Export CSV
        </span>
      </div>
    </div>
  )
}
