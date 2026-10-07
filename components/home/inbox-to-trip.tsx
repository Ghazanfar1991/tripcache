"use client"

import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Armchair, BellRing, Check, FileText, Mail, Paperclip, Plane, Receipt, Send, Sparkles, Ticket } from "lucide-react"
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react"
import { Bloom, CategoryGlyph } from "./category"
import { CATEGORY, EMAILS, STEPS } from "./data"

const EASE = [0.16, 1, 0.3, 1] as const
const SHARE = 1 / STEPS.length
/** Scroll length of each step, in viewports. Review gets the most so the draft card fills slowly enough to read. */
const STEP_SCROLL = [1, 3.5, 1, 1]
const SCROLL_TOTAL = STEP_SCROLL.reduce((sum, value) => sum + value, 0)
/** Cumulative raw-scroll position at which each step starts (0 … 1). */
const BREAKS = STEP_SCROLL.reduce<number[]>((acc, value, index) => [...acc, acc[index] + value / SCROLL_TOTAL], [0])
const ADDRESS = "you@in.trip-cache.com"

type Point = { x: number; y: number }
type Register = (id: string, element: HTMLElement | null) => void
type Box = { x: number; y: number; w: number; h: number }
type Layout = { W: number; H: number; compact: boolean; left: Box; right: Box }

const DESKTOP: Layout = {
  W: 1120,
  H: 540,
  compact: false,
  left: { x: 0, y: 0, w: 470, h: 540 },
  right: { x: 560, y: 0, w: 560, h: 540 },
}
const MOBILE: Layout = {
  W: 340,
  H: 640,
  compact: true,
  left: { x: 0, y: 0, w: 340, h: 300 },
  right: { x: 0, y: 318, w: 340, h: 322 },
}

/** What the scanner lifts out of the email, and where each value lands on the draft. */
const TOKENS = [
  { id: "flight", text: "PR 731", label: "Flight", value: "PR 731" },
  { id: "from", text: "Bangkok (BKK)", label: "From", value: "BKK" },
  { id: "to", text: "Manila (MNL)", label: "To", value: "MNL" },
  { id: "date", text: "13 May 2026", label: "Date", value: "13 May" },
  { id: "dep", text: "13:25", label: "Departs", value: "13:25" },
  { id: "arr", text: "18:05", label: "Arrives", value: "18:05" },
  { id: "ref", text: "DB4YDR", label: "Booking ref.", value: "DB4YDR" },
  { id: "seat", text: "14C", label: "Seat", value: "14C" },
] as const

const MOBILE_QUERY = "(max-width: 767px)"
function useIsMobile() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(MOBILE_QUERY)
      query.addEventListener("change", onChange)
      return () => query.removeEventListener("change", onChange)
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
}

function useFitScale(ref: RefObject<HTMLDivElement | null>, width: number, height: number) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      setScale(Math.max(0.4, Math.min(box.width / width, box.height / height, 1.1)))
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, width, height])
  return scale
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))
/** Local 0–1 progress inside one step. */
const local = (value: number, step: number) => clamp((value - step * SHARE) / SHARE)
/** When token `index` is scanned, inside the Review step. */
const scanAt = (index: number) => 0.06 + index * 0.075

/* ------------------------------------------------------------------ */
/* Left column: the email itself                                      */
/* ------------------------------------------------------------------ */

function Token({
  id,
  children,
  active,
  register,
}: {
  id: string
  children: string
  active: MotionValue<number>
  register: Register
}) {
  const glow = useTransform(active, [0, 1], ["rgba(99,102,241,0)", "rgba(99,102,241,0.16)"])
  const ring = useTransform(active, [0, 1], ["0 0 0 0 rgba(99,102,241,0)", "0 0 0 1.5px rgba(99,102,241,0.55)"])
  return (
    <motion.span
      ref={(element) => register(id, element)}
      className="rounded-[6px] px-[3px] font-semibold text-tc-ink"
      style={{ backgroundColor: glow, boxShadow: ring }}
    >
      {children}
    </motion.span>
  )
}

function useTokenActivity(progress: MotionValue<number>, index: number) {
  return useTransform(progress, (value) => clamp((local(value, 1) - scanAt(index)) / 0.06))
}

function EmailCard({
  layout,
  progress,
  register,
  sendRef,
}: {
  layout: Layout
  progress: MotionValue<number>
  register: Register
  sendRef: RefObject<HTMLSpanElement | null>
}) {
  const typed = useTransform(progress, (value) => ADDRESS.slice(0, Math.round(clamp(local(value, 0) / 0.55) * ADDRESS.length)))
  const caret = useTransform(progress, (value) => (local(value, 0) < 0.6 ? 1 : 0))
  const sendGlow = useTransform(progress, (value) => {
    const t = local(value, 0)
    return t > 0.58 && t < 0.8 ? "0 0 0 6px rgba(97,43,211,0.25), 0 10px 24px -8px rgba(97,43,211,0.8)" : "0 0 0 0 rgba(97,43,211,0)"
  })
  const beamY = useTransform(progress, (value) => `${clamp(local(value, 1) / 0.7) * 100}%`)
  const beamOpacity = useTransform(progress, (value) => {
    const t = local(value, 1)
    return value >= SHARE && t > 0 && t < 0.72 ? 1 : 0
  })
  const activity = [
    useTokenActivity(progress, 0),
    useTokenActivity(progress, 1),
    useTokenActivity(progress, 2),
    useTokenActivity(progress, 3),
    useTokenActivity(progress, 4),
    useTokenActivity(progress, 5),
    useTokenActivity(progress, 6),
    useTokenActivity(progress, 7),
  ]
  const tok = (index: number) => (
    <Token id={TOKENS[index].id} active={activity[index]} register={register}>
      {TOKENS[index].text}
    </Token>
  )

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white text-tc-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)]">
      <div className={`flex items-center gap-3 border-b border-tc-line ${layout.compact ? "px-4 py-3" : "px-6 py-4"}`}>
        <span
          className={`grid shrink-0 place-items-center rounded-full bg-tc-flight font-semibold text-white ${layout.compact ? "size-8 text-[12px]" : "size-10 text-[14px]"}`}
        >
          F
        </span>
        <div className="min-w-0 flex-1">
          <p className={`truncate font-semibold ${layout.compact ? "text-[13px]" : "text-[14.5px]"}`}>Flight booking</p>
          <p className="truncate text-[12px] text-tc-mute">to me · 9:41</p>
        </div>
        <Paperclip className="size-4 shrink-0 text-tc-mute" aria-hidden="true" />
      </div>

      <div className={`relative flex-1 ${layout.compact ? "px-4 pt-3" : "px-6 pt-5"}`}>
        <p className={`font-tc-display font-semibold leading-tight ${layout.compact ? "text-[17px]" : "text-[22px]"}`}>
          Your e-ticket receipt · PR 731
        </p>
        <p className={`mt-3 text-tc-ink-2 ${layout.compact ? "text-[12.5px] leading-[1.75]" : "text-[15px] leading-[1.95]"}`}>
          Thank you for booking. Your flight {tok(0)} from {tok(1)} to {tok(2)} departs on {tok(3)} at {tok(4)} and lands at{" "}
          {tok(5)}. Booking reference {tok(6)}. Seat: {tok(7)}.
        </p>
        {layout.compact ? null : (
          <div aria-hidden="true" className="mt-5 flex flex-col gap-2">
            {[88, 72, 80, 54].map((width, index) => (
              <span key={index} className="h-2 rounded-full bg-tc-mist" style={{ width: `${width}%` }} />
            ))}
          </div>
        )}
        {/* Scanner beam */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 h-14 -translate-y-1/2 rounded-full bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.22),transparent)]"
          style={{ top: beamY, opacity: beamOpacity }}
        >
          <span className="absolute inset-x-4 top-1/2 h-px bg-tc-flight/70 shadow-[0_0_12px_rgba(99,102,241,0.9)]" />
        </motion.span>
      </div>

      <div className={`flex items-center gap-2 border-t border-tc-line bg-tc-mist/70 ${layout.compact ? "px-3 py-2.5" : "px-5 py-3.5"}`}>
        <span className="shrink-0 text-[12.5px] font-semibold text-tc-mute">Fwd to</span>
        <span
          className={`flex min-w-0 flex-1 items-center rounded-[10px] border border-tc-line bg-white px-2.5 font-medium text-tc-ink ${layout.compact ? "h-8 text-[12px]" : "h-9 text-[13.5px]"}`}
        >
          <motion.span className="truncate">{typed}</motion.span>
          <motion.span className="ml-px h-4 w-[1.5px] bg-tc-violet" style={{ opacity: caret }} />
        </span>
        <motion.span
          ref={sendRef}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-[10px] bg-tc-violet font-semibold text-white ${layout.compact ? "h-8 px-2.5 text-[12px]" : "h-9 px-3.5 text-[13.5px]"}`}
          style={{ boxShadow: sendGlow }}
        >
          <Send className="size-3.5" aria-hidden="true" />
          Send
        </motion.span>
      </div>
    </div>
  )
}

/** Four confirmations, now filed. Shown in the left column once the draft is approved. */
function FiledStack({ compact }: { compact: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className={`font-tc-display font-semibold text-white ${compact ? "text-[18px]" : "text-[26px]"}`}>4 confirmations filed</p>
      <p className="mt-1 text-[13px] text-white/60">Flight, hotel, car and tour, each reviewed once.</p>
      <ul className={`relative mt-5 ${compact ? "h-[170px]" : "h-[300px]"}`}>
        {EMAILS.map((email, index) => (
          <motion.li
            key={email.subject}
            className={`absolute inset-x-0 flex items-center gap-3 rounded-[16px] bg-white ${compact ? "px-3 py-2" : "px-4 py-3.5"}`}
            style={{ top: index * (compact ? 40 : 66), zIndex: 10 - index }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, rotate: [-1.5, 1, -0.6, 0.8][index] }}
            transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
          >
            <CategoryGlyph category={email.category} className={compact ? "size-7" : "size-9"} />
            <span className="min-w-0 flex-1">
              <span className={`block truncate font-semibold text-tc-ink ${compact ? "text-[12px]" : "text-[14px]"}`}>{email.subject}</span>
              {compact ? null : <span className="block truncate text-[12.5px] text-tc-mute">{email.detail}</span>}
            </span>
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e8f8f0] text-[#067647]">
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Right column                                                        */
/* ------------------------------------------------------------------ */

/** A miniature of the app's Smart Inbox: waiting, then the first draft lands. */
function Receiver({ progress, compact, iconRef }: { progress: MotionValue<number>; compact: boolean; iconRef: RefObject<HTMLDivElement | null> }) {
  const [received, setReceived] = useState(false)
  const update = useCallback((value: number) => setReceived(value >= 0 && local(value, 0) > 0.93), [])
  useMotionValueEvent(progress, "change", update)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => update(progress.get()))
    return () => window.cancelAnimationFrame(frame)
  }, [progress, update])

  return (
    <div className="flex h-full items-center justify-center">
      <div className={`relative w-full overflow-hidden rounded-[26px] border border-white/12 bg-white/[0.06] backdrop-blur-md ${compact ? "max-w-[340px] p-4" : "max-w-[420px] p-6"}`}>
        <div className="flex items-center gap-3">
          <div className="relative grid place-items-center">
            {[0, 1].map((ring) => (
              <span
                key={ring}
                aria-hidden="true"
                className="tc-ring absolute rounded-full border border-[#a78bfa]/50"
                style={{ width: (compact ? 60 : 72) + ring * 26, height: (compact ? 60 : 72) + ring * 26, animationDelay: `${ring * 0.7}s` }}
              />
            ))}
            <div ref={iconRef} className={`relative overflow-hidden rounded-[14px] shadow-[0_16px_36px_-12px_rgba(139,92,246,0.9)] ${compact ? "size-11" : "size-14"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny static icon; must render even mid-animation. WebP (12 KB), not the 1 MB PNG. */}
              <img src="/app-icon-violet-indigo.webp" alt="" width={56} height={56} decoding="async" className="size-full object-cover" />
            </div>
          </div>
          <div className="min-w-0">
            <p className={`font-tc-display font-semibold text-white ${compact ? "text-[17px]" : "text-[21px]"}`}>Smart Inbox</p>
            <p className="truncate text-[12.5px] text-white/60">{ADDRESS}</p>
          </div>
        </div>

        <p className={`flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45 ${compact ? "mt-4" : "mt-6"}`}>
          Drafts
          <span className={`rounded-full px-2 py-0.5 text-[10.5px] tracking-normal normal-case transition-colors duration-500 ${received ? "bg-tc-violet text-white" : "bg-white/10 text-white/60"}`}>
            {received ? "1 to review" : "0"}
          </span>
        </p>
        <ul className={`mt-2.5 flex flex-col ${compact ? "gap-2" : "gap-2.5"}`}>
          <AnimatePresence initial={false}>
            {received ? (
              <motion.li
                key="draft"
                className="flex items-center gap-3 rounded-[16px] bg-white px-3.5 py-3 shadow-[0_18px_36px_-18px_rgba(0,0,0,0.9)]"
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <CategoryGlyph category="flight" className="size-9" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-tc-ink">PR 731 · BKK → MNL</span>
                  <span className="block truncate text-[12px] text-tc-mute">From “Your e-ticket receipt” · just now</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-tc-violet-soft px-2 py-1 text-[11px] font-semibold text-tc-violet">
                  <Sparkles className="size-3" aria-hidden="true" />
                  Draft
                </span>
              </motion.li>
            ) : (
              <motion.li
                key="waiting"
                className="flex items-center gap-3 rounded-[16px] border border-dashed border-white/20 px-3.5 py-3 text-[13px] text-white/60"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <span className="grid size-9 place-items-center rounded-full bg-white/8">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                Waiting for your first confirmation…
              </motion.li>
            )}
          </AnimatePresence>
          {[0, 1].map((row) => (
            <li key={row} aria-hidden="true" className="flex items-center gap-3 rounded-[16px] bg-white/[0.04] px-3.5 py-3">
              <span className="size-9 rounded-full bg-white/8" />
              <span className="flex flex-1 flex-col gap-1.5">
                <span className="tc-shimmer h-2.5 w-3/5 rounded-full" />
                <span className="tc-shimmer h-2 w-2/5 rounded-full" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function DraftPass({
  progress,
  compact,
  register,
  reduce,
}: {
  progress: MotionValue<number>
  compact: boolean
  register: Register
  reduce: boolean
}) {
  const [filled, setFilled] = useState(reduce ? TOKENS.length : 0)
  const [saved, setSaved] = useState(reduce)
  const update = useCallback(
    (value: number) => {
      if (reduce) return
      const t = local(value, 1)
      setFilled(TOKENS.filter((_, index) => t >= scanAt(index) + 0.22).length)
      setSaved(t > 0.9)
    },
    [reduce],
  )
  useMotionValueEvent(progress, "change", update)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => update(progress.get()))
    return () => window.cancelAnimationFrame(frame)
  }, [progress, update])

  const has = (id: (typeof TOKENS)[number]["id"]) => TOKENS.findIndex((token) => token.id === id) < filled
  /** A value slot: a grey placeholder until the scanned value lands, then the value itself. */
  const slot = (id: (typeof TOKENS)[number]["id"], value: string, className: string, empty: string) => (
    <span ref={(element) => register(`field-${id}`, element)} className={`inline-block transition-colors duration-300 ${className}`}>
      {has(id) ? value : <span className={`inline-block rounded-md bg-[#e6e8f0] align-middle ${empty}`} />}
    </span>
  )
  const code = compact ? "text-[30px]" : "text-[40px]"
  const time = compact ? "text-[13px]" : "text-[15px]"

  return (
    <div className="flex h-full items-center">
      <div className="relative w-full">
        {/* The app's Drafts-tab card: airline, extraction confidence, route, times, seat and booking reference. */}
        <div
          className={`relative overflow-hidden rounded-[28px] border border-[#e6e8f0] bg-[linear-gradient(135deg,#ffffff_45%,#eeeefe)] shadow-[0_40px_80px_-36px_rgba(0,0,0,0.9)] ${compact ? "p-4" : "p-6"}`}
        >
          <div className="flex items-center gap-3">
            <span className={`grid shrink-0 place-items-center rounded-[16px] border-2 border-tc-violet bg-white text-tc-violet ${compact ? "size-11" : "size-14"}`}>
              <Plane className={compact ? "size-5" : "size-6"} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate font-bold text-tc-ink ${compact ? "text-[15px]" : "text-[19px]"}`}>Philippine Airlines</p>
              <p className="truncate text-[12.5px] text-tc-mute">
                {slot("flight", "PR 731", "", "h-3 w-12")} · 1 flight
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[linear-gradient(135deg,#6f72f5,#4f46e5)] px-3 py-1.5 text-[12px] font-semibold text-white">
              {filled >= TOKENS.length ? "94% extracted" : "Extracting…"}
            </span>
          </div>

          <div className={`flex items-start justify-between ${compact ? "mt-4" : "mt-6"}`}>
            <div>
              <p className={`font-bold leading-none text-tc-ink ${code}`}>{slot("from", "BKK", "", compact ? "h-7 w-16" : "h-9 w-20")}</p>
              <p className={`mt-1.5 font-medium text-tc-mute ${time}`}>{slot("dep", "13:25", "", "h-3.5 w-10")}</p>
              <p className={`text-tc-mute ${time}`}>{slot("date", "Wed, 13 May", "", "h-3.5 w-20")}</p>
            </div>
            <div className="flex flex-1 flex-col items-center px-3 pt-3">
              <div className="flex w-full items-center gap-2">
                <span className="h-px flex-1 bg-tc-line" />
                <Plane className={`shrink-0 text-tc-ink ${compact ? "size-5" : "size-6"}`} fill="currentColor" aria-hidden="true" />
                <span className="h-px flex-1 bg-tc-line" />
              </div>
              <p className="mt-1.5 text-[12px] text-tc-mute">Nonstop</p>
            </div>
            <div className="text-right">
              <p className={`font-bold leading-none text-tc-ink ${code}`}>{slot("to", "MNL", "", compact ? "h-7 w-16" : "h-9 w-20")}</p>
              <p className={`mt-1.5 font-medium text-tc-mute ${time}`}>{slot("arr", "18:05", "", "h-3.5 w-10")}</p>
              <p className={`text-tc-mute ${time}`}>{has("date") ? "Wed, 13 May" : <span className="inline-block h-3.5 w-20 rounded-md bg-[#e6e8f0] align-middle" />}</p>
            </div>
          </div>

          <div className={`flex flex-wrap items-center gap-2 ${compact ? "mt-4" : "mt-5"}`}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e8f0] bg-white px-3 py-1.5 text-[13px] font-semibold text-tc-ink">
              <Ticket className="size-3.5 text-tc-mute" aria-hidden="true" />
              PNR {slot("ref", "DB4YDR", "", "h-3 w-14")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e8f0] bg-white px-3 py-1.5 text-[13px] font-semibold text-tc-ink">
              <Armchair className="size-3.5 text-tc-mute" aria-hidden="true" />
              Seat {slot("seat", "14C", "", "h-3 w-6")}
            </span>
          </div>
          <p className="mt-3 truncate text-[12.5px] text-tc-mute">Fwd: Your e-ticket receipt · PR 731</p>

          <div
            className={`flex h-11 items-center justify-center gap-2 rounded-[14px] text-[14px] font-semibold text-white transition-colors duration-500 ${compact ? "mt-3" : "mt-4"} ${
              saved ? "bg-tc-hotel" : "bg-tc-violet"
            }`}
          >
            {saved ? <Check className="size-4" strokeWidth={3} aria-hidden="true" /> : null}
            {saved ? "Saved to Trip to Manila" : `Review draft · ${filled}/${TOKENS.length} fields`}
          </div>
        </div>
        <AnimatePresence>
          {saved ? (
            <motion.span
              aria-hidden="true"
              className="absolute -right-3 -top-5 rotate-[-12deg] rounded-[10px] border-[3px] border-tc-hotel bg-white/95 px-3 py-1 font-tc-display text-[22px] font-bold uppercase tracking-[0.06em] text-tc-hotel"
              initial={reduce ? false : { scale: 2.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 22 }}
            >
              Approved
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ItineraryRail({ compact, reduce }: { compact: boolean; reduce: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className={`font-tc-script leading-[0.85] text-[#c4b5fd] ${compact ? "text-[28px]" : "text-[44px]"}`}>Trip to</p>
      <p className={`font-tc-display font-semibold leading-none text-white ${compact ? "text-[28px]" : "text-[44px]"}`}>Manila</p>
      <p className="mt-1.5 text-[13px] text-white/60">13 – 19 May 2026 · 4 bookings</p>
      <ol className={`relative ${compact ? "mt-3 pl-6" : "mt-6 pl-9"}`}>
        <motion.span
          aria-hidden="true"
          className={`absolute top-2 w-[2px] origin-top rounded-full bg-[linear-gradient(to_bottom,#6366f1,#12b76a,#f59e0b,#d82d7e)] ${
            compact ? "bottom-3 left-[9px]" : "bottom-4 left-[15px]"
          }`}
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        />
        {EMAILS.map((email, index) => {
          const tone = CATEGORY[email.category]
          return (
            <motion.li
              key={email.chip}
              className={compact ? "relative py-1" : "relative py-1.5"}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.15 + index * 0.12 }}
            >
              <span
                aria-hidden="true"
                className={`absolute top-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#140f2a] ${compact ? "-left-[22px] size-3.5" : "-left-[30px] size-4"}`}
                style={{ backgroundColor: tone.color, boxShadow: `0 0 12px ${tone.color}` }}
              />
              <div className={`flex items-center gap-3 rounded-[14px] bg-white ${compact ? "px-2.5 py-1.5" : "px-3.5 py-3"}`}>
                <span className={`shrink-0 font-semibold tabular-nums text-tc-mute ${compact ? "w-11 text-[10.5px]" : "w-14 text-[12px]"}`}>
                  {email.date}
                  <span className="block text-tc-ink">{email.when}</span>
                </span>
                <span className={`min-w-0 flex-1 truncate font-semibold text-tc-ink ${compact ? "text-[12px]" : "text-[14.5px]"}`}>{email.chip}</span>
                <span className="shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold" style={{ backgroundColor: tone.soft, color: tone.text }}>
                  {tone.label}
                </span>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

const ATTACHMENTS = [
  { icon: BellRing, color: "#f59e0b", soft: "#fff5d6", text: "#b54708", title: "Cancel by 11 May", meta: "Belmont Hotel · in 2 days" },
  { icon: FileText, color: "#6366f1", soft: "#eef2ff", text: "#4f46e5", title: "Boarding pass", meta: "PR 731 · attached" },
  { icon: Receipt, color: "#12b76a", soft: "#e8f8f0", text: "#067647", title: "12 receipts", meta: "A$623 spent · CSV ready" },
]

function KeptWithTrip({ compact, reduce }: { compact: boolean; reduce: boolean }) {
  const width = compact ? 340 : 560
  const height = compact ? 322 : 540
  const phoneW = compact ? 140 : 238
  const phoneH = phoneW / 0.486
  const chipW = compact ? 172 : 250
  const phoneX = width - phoneW
  const phoneY = (height - phoneH) / 2
  const rowY = (index: number) => (compact ? 48 + index * 86 : 108 + index * 124)
  return (
    <div className="relative h-full">
      <svg aria-hidden="true" className="absolute inset-0" width={width} height={height}>
        {ATTACHMENTS.map((item, index) => {
          const from = { x: chipW + 4, y: rowY(index) + (compact ? 22 : 31) }
          const to = { x: phoneX + phoneW * 0.22, y: phoneY + phoneH * (0.3 + index * 0.17) }
          return (
            <motion.path
              key={item.title}
              d={`M${from.x} ${from.y} C ${from.x + 50} ${from.y}, ${to.x - 60} ${to.y}, ${to.x} ${to.y}`}
              fill="none"
              stroke={item.color}
              strokeWidth={2}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${item.color})` }}
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: reduce ? 0 : 0.45 + index * 0.15 }}
            />
          )
        })}
      </svg>
      <motion.div
        className="tc-phone-shadow absolute"
        style={{ left: phoneX, top: phoneY, width: phoneW, height: phoneH }}
        initial={reduce ? false : { opacity: 0, x: 60, rotate: 6 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Image src="/app-ui-trip-detail.webp" alt="TripCache Trip to Melbourne itinerary with flight, hotel and activity counts" fill sizes="260px" className="object-contain" />
      </motion.div>
      {ATTACHMENTS.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            className={`absolute left-0 flex items-center gap-3 rounded-[16px] bg-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.9)] ${compact ? "px-2.5 py-2" : "px-3.5 py-3"}`}
            style={{ top: rowY(index), width: chipW }}
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.2 + index * 0.15 }}
          >
            <span
              className={`grid shrink-0 place-items-center rounded-full ${compact ? "size-7" : "size-10"}`}
              style={{ backgroundColor: item.soft, color: item.text }}
            >
              <Icon className={compact ? "size-3.5" : "size-[18px]"} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className={`block truncate font-semibold text-tc-ink ${compact ? "text-[12px]" : "text-[14.5px]"}`}>{item.title}</span>
              <span className={`block truncate text-tc-mute ${compact ? "text-[10.5px]" : "text-[12.5px]"}`}>{item.meta}</span>
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pieces in flight                                                    */
/* ------------------------------------------------------------------ */

function arc(t: number, a: Point, b: Point) {
  const c1 = { x: a.x + (b.x - a.x) * 0.35, y: Math.min(a.y, b.y) - 70 }
  const c2 = { x: b.x - (b.x - a.x) * 0.25, y: b.y - 60 }
  const u = 1 - t
  return {
    x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
    y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
  }
}

function FlyingToken({ index, from, to, progress }: { index: number; from: Point; to: Point; progress: MotionValue<number> }) {
  const t = useTransform(progress, (value) => clamp((local(value, 1) - scanAt(index) - 0.02) / 0.2))
  const x = useTransform(t, (value) => arc(value, from, to).x)
  const y = useTransform(t, (value) => arc(value, from, to).y)
  const opacity = useTransform(t, [0, 0.04, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(t, [0, 0.5, 1], [1, 1.08, 0.8])
  return (
    <motion.span className="absolute left-0 top-0 z-40" style={{ x, y, opacity, scale }}>
      <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-tc-flight px-2.5 py-1 text-[12.5px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.9)]">
        {TOKENS[index].value}
      </span>
    </motion.span>
  )
}

function SentEnvelope({ from, to, progress }: { from: Point; to: Point; progress: MotionValue<number> }) {
  const t = useTransform(progress, (value) => clamp((local(value, 0) - 0.66) / 0.26))
  const x = useTransform(t, (value) => arc(value, from, to).x)
  const y = useTransform(t, (value) => arc(value, from, to).y)
  const opacity = useTransform(t, [0, 0.05, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(t, [0, 1], [1, 0.5])
  const rotate = useTransform(t, [0, 1], [-8, 12])
  return (
    <motion.span className="absolute left-0 top-0 z-40" style={{ x, y, opacity, scale, rotate }}>
      <span className="grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[12px] bg-white text-tc-violet shadow-[0_14px_30px_-10px_rgba(139,92,246,0.9)]">
        <Mail className="size-5" aria-hidden="true" />
      </span>
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */

type Geometry = { tokens: Point[]; fields: Point[]; send: Point | null; icon: Point | null }

export function InboxToTrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const fitRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const registry = useRef<Record<string, HTMLElement | null>>({})
  const register = useCallback<Register>((id, element) => {
    registry.current[id] = element
  }, [])
  const sendRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const mobile = useIsMobile()
  const layout = mobile ? MOBILE : DESKTOP
  const scale = useFitScale(fitRef, layout.W, layout.H)
  const [stage, setStage] = useState(0)
  const [geo, setGeo] = useState<Geometry>({ tokens: [], fields: [], send: null, icon: null })

  const { scrollYProgress: rawScroll } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  // Remap raw scroll so every step still owns a quarter of the animation, but not a quarter of the scrolling.
  const scrollYProgress = useTransform(rawScroll, BREAKS, STEPS.map((_, index) => index * SHARE).concat(1))
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.5 })
  const progress = reduce ? scrollYProgress : smooth
  const railFill = useTransform(scrollYProgress, [0, 1], [0, 1])

  const sync = useCallback((value: number) => {
    setStage(Math.min(STEPS.length - 1, Math.max(0, Math.floor(value * STEPS.length))))
  }, [])
  useMotionValueEvent(scrollYProgress, "change", sync)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => sync(scrollYProgress.get()))
    return () => window.cancelAnimationFrame(frame)
  }, [scrollYProgress, sync])

  // Where the tokens, fields, send button and app icon sit, in unscaled stage coordinates.
  useLayoutEffect(() => {
    // Measure now and again once AnimatePresence has mounted the incoming step.
    const measure = () => {
        const stageBox = stageRef.current?.getBoundingClientRect()
        if (!stageBox) return
        const centre = (element: Element | null | undefined): Point | null => {
          if (!element) return null
          const box = element.getBoundingClientRect()
          return { x: (box.left + box.width / 2 - stageBox.left) / scale, y: (box.top + box.height / 2 - stageBox.top) / scale }
        }
        setGeo({
          tokens: TOKENS.map((token) => centre(registry.current[token.id]) ?? { x: 0, y: 0 }),
          fields: TOKENS.map((token) => centre(registry.current[`field-${token.id}`]) ?? { x: 0, y: 0 }),
          send: centre(sendRef.current),
          icon: centre(iconRef.current),
        })
    }
    const frame = window.requestAnimationFrame(measure)
    const timers = [450, 900].map((delay) => window.setTimeout(measure, delay))
    return () => {
      window.cancelAnimationFrame(frame)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [scale, stage, mobile])

  const goTo = useCallback(
    (index: number) => {
      const section = sectionRef.current
      if (!section) return
      const top = section.getBoundingClientRect().top + window.scrollY
      const distance = section.offsetHeight - window.innerHeight
      window.scrollTo({ top: top + distance * (BREAKS[index] + (BREAKS[index + 1] - BREAKS[index]) * 0.95), behavior: reduce ? "auto" : "smooth" })
    },
    [reduce],
  )

  const step = STEPS[stage]
  const fieldsReady = geo.fields.length === TOKENS.length && geo.fields.every((point) => point.x > 0)

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative bg-tc-canvas"
      style={{ height: `calc(100svh + ${SCROLL_TOTAL} * 100svh)` }}
    >
      <h2 id="how-title" className="sr-only">
        How TripCache turns booking emails into one trip
      </h2>
      <ol className="sr-only">
        {STEPS.map((item) => (
          <li key={item.id}>
            {item.title} {item.text}
          </li>
        ))}
      </ol>

      <div className="sticky top-0 flex h-svh flex-col px-3 pb-3 pt-[76px] sm:px-5 sm:pb-5 sm:pt-[88px]">
        <div data-nav-theme="dark" className="tc-stage relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col overflow-hidden rounded-[30px] sm:rounded-[36px]">
          <Bloom className="tc-drift-slow -right-24 -top-32 size-[520px] opacity-45" color="#7c3aed" />
          <Bloom className="tc-drift -bottom-40 -left-24 size-[460px] opacity-30" color="#d82d7e" />

          {/* Caption + stepper */}
          <div className="relative z-10 flex flex-col gap-4 px-5 pt-5 sm:px-9 sm:pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-h-[84px] lg:max-w-[560px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.id}
                  initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="font-tc-display text-[24px] font-semibold leading-[1.1] tracking-[-0.015em] text-white sm:text-[34px]">{step.title}</p>
                  <p className="mt-2 max-w-[52ch] text-[14px] leading-6 text-white/65 sm:text-[16px] sm:leading-7">{step.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <nav aria-label="How it works" className="relative shrink-0 lg:w-[440px]">
              <div aria-hidden="true" className="absolute inset-x-[12.5%] top-[13px] h-[2px] rounded-full bg-white/12">
                <motion.span className="absolute inset-0 origin-left rounded-full bg-[linear-gradient(to_right,#8b5cf6,#d82d7e)]" style={{ scaleX: railFill }} />
              </div>
              <ol className="relative grid grid-cols-4">
                {STEPS.map((item, index) => {
                  const reached = index <= stage
                  return (
                    <li key={item.id} className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => goTo(index)}
                        aria-current={index === stage ? "step" : undefined}
                        className="group flex flex-col items-center gap-1.5 rounded-[12px] px-1.5 pb-1"
                      >
                        <span
                          className={`grid size-7 place-items-center rounded-full border transition-all duration-500 ${
                            index === stage
                              ? "border-transparent bg-white text-tc-violet shadow-[0_0_0_5px_rgba(139,92,246,0.3)]"
                              : reached
                                ? "border-transparent bg-tc-violet text-white"
                                : "border-white/20 bg-[#140f2a] text-white/50"
                          }`}
                        >
                          {index < stage ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : <span className="text-[11px] font-bold">{index + 1}</span>}
                        </span>
                        <span
                          className={`text-[12.5px] font-semibold transition-colors sm:text-[13.5px] ${
                            index === stage ? "text-white" : "text-white/55 group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>

          {/* Stage */}
          <div ref={fitRef} className="relative z-10 flex min-h-0 flex-1 justify-center px-4 pb-5 pt-4 sm:px-9 sm:pb-8 sm:pt-6">
            <div className="relative shrink-0" style={{ width: layout.W * scale, height: layout.H * scale }}>
              <div ref={stageRef} className="absolute left-0 top-0 origin-top-left" style={{ width: layout.W, height: layout.H, transform: `scale(${scale})` }}>
                <div className="absolute" style={{ left: layout.left.x, top: layout.left.y, width: layout.left.w, height: layout.left.h }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {stage <= 1 ? (
                      <motion.div key="email" className="h-full" exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)", transition: { duration: 0.3 } }}>
                        <EmailCard layout={layout} progress={progress} register={register} sendRef={sendRef} />
                      </motion.div>
                    ) : stage === 2 ? (
                      <motion.div key="filed" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                        <FiledStack compact={layout.compact} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="rail"
                        className="h-full"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <ItineraryRail compact={layout.compact} reduce={reduce} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute" style={{ left: layout.right.x, top: layout.right.y, width: layout.right.w, height: layout.right.h }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {stage === 0 ? (
                      <motion.div key="receiver" className="h-full" exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}>
                        <Receiver progress={progress} compact={layout.compact} iconRef={iconRef} />
                      </motion.div>
                    ) : stage === 1 ? (
                      <motion.div
                        key="pass"
                        className="h-full"
                        initial={reduce ? false : { opacity: 0, y: 30, rotate: 2 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: -40, scale: 0.9, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <DraftPass progress={progress} compact={layout.compact} register={register} reduce={reduce} />
                      </motion.div>
                    ) : stage === 2 ? (
                      <motion.div key="rail" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -60, transition: { duration: 0.35 } }}>
                        <ItineraryRail compact={layout.compact} reduce={reduce} />
                      </motion.div>
                    ) : (
                      <motion.div key="kept" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <KeptWithTrip compact={layout.compact} reduce={reduce} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!reduce && stage === 0 && geo.send && geo.icon ? <SentEnvelope from={geo.send} to={geo.icon} progress={progress} /> : null}
                {!reduce && stage === 1 && fieldsReady
                  ? TOKENS.map((token, index) => <FlyingToken key={token.id} index={index} from={geo.tokens[index]} to={geo.fields[index]} progress={progress} />)
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
