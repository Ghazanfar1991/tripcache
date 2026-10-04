"use client"

/**
 * A split-flap departure board for the free travel tools.
 * Split-flap letters shuffle before settling and flip-clock digits fall into place once the board
 * scrolls into view. Purely visual: the board is aria-hidden, so callers must render the same
 * facts as text. Styles live in app/tools/tools.css (imported by the tools routes).
 */
import { useInView, useReducedMotion } from "framer-motion"
import { BedDouble } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type React from "react"

const FLAP_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

export type BoardRow = { text: string; tone?: "white" | "gold" }
export type BoardTime = { hh: string; mm: string; period: string; zone: string }

const TONES = { white: "#ffffff", gold: "#fec84b" } as const

/** Fits a line to the board, breaking between words where it can rather than mid-word. */
function fitWords(text: string, width: number) {
  const clean = text.trim().replace(/\s+/g, " ")
  if (clean.length <= width) return clean
  const words = clean.split(" ")
  let line = ""
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > width) break
    line = next
  }
  return line || clean.slice(0, width)
}

function FlapText({ value, width, run, delay = 0, tone }: { value: string; width: number; run: boolean; delay?: number; tone: string }) {
  const target = value.toUpperCase().padEnd(width, " ").slice(0, width)
  const [shown, setShown] = useState(target)
  const [settled, setSettled] = useState(target)
  const reduce = useReducedMotion()

  // A new target (a recalculated deadline) shows at once; the shuffle below only plays on view.
  if (settled !== target) {
    setSettled(target)
    setShown(target)
  }

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
    <span className="flex gap-[2px]" style={{ color: tone }}>
      {Array.from(shown).map((char, index) => (
        <span key={index} className="tct-flap">
          <span key={char} className="tct-flap-char">
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </span>
  )
}

/** A flip-clock digit. At rest it shows its value; when `run` turns on, the previous digit falls away to reveal it. */
function FlipDigit({ value, run, delay = 0 }: { value: string; run: boolean; delay?: number }) {
  const numeric = /^\d$/.test(value)
  const previous = numeric ? String((Number(value) + 9) % 10) : value
  const flipping = run && numeric

  return (
    <span className="tct-flip">
      <span className="tct-flip-half tct-flip-top">
        <span className="tct-flip-face">{value}</span>
      </span>
      <span className="tct-flip-half tct-flip-bottom">
        <span className="tct-flip-face">{value}</span>
      </span>
      {flipping ? (
        <>
          <span className="tct-flip-half tct-flip-bottom tct-flip-under">
            <span className="tct-flip-face">{previous}</span>
          </span>
          <span className="tct-flip-half tct-flip-top tct-flip-leaf-top" style={{ animationDelay: `${delay}ms` }}>
            <span className="tct-flip-face">{previous}</span>
          </span>
          <span className="tct-flip-half tct-flip-bottom tct-flip-leaf-bottom" style={{ animationDelay: `${delay + 240}ms` }}>
            <span className="tct-flip-face">{value}</span>
          </span>
        </>
      ) : null}
    </span>
  )
}

export function DepartureBoard({
  meta,
  label,
  rows,
  time,
  width = 16,
  className = "",
  icon,
}: {
  /** Replaces the hotel glyph in the header. */
  icon?: React.ReactNode
  /** Left of the header, next to the hotel glyph. */
  meta: string
  /** Right of the header, in reminder gold. */
  label: string
  rows: BoardRow[]
  time?: BoardTime | null
  width?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: "0px 0px -12% 0px" })
  const reduce = useReducedMotion() ?? false
  const run = seen && !reduce

  return (
    <div ref={ref} aria-hidden="true" className={`tct-board rounded-[20px] px-3.5 pb-5 pt-3.5 text-white sm:px-5 sm:pt-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b-[1px] border-white/10 pb-3">
        <span className="flex min-w-0 items-center gap-2 text-[12px] font-semibold text-white/75">
          {icon ?? (
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#12b76a]/20 text-[#5ee4a5]">
              <BedDouble className="size-3.5" />
            </span>
          )}
          <span className="truncate">{meta}</span>
        </span>
        <span className="text-[10.5px] font-semibold uppercase tracking-[.14em] text-[#fec84b] sm:text-[11px]">{label}</span>
      </div>

      <div className="mt-3.5 flex flex-col gap-1.5 overflow-hidden">
        {rows.map((row, index) => (
          <FlapText key={index} value={fitWords(row.text, width)} width={width} run={seen} delay={index * 220} tone={TONES[row.tone ?? "white"]} />
        ))}
      </div>

      {time ? (
        <div className="mt-5 flex items-end gap-3 sm:gap-4">
          <span className="flex items-center gap-[3px]">
            <FlipDigit value={time.hh[0]} run={run} delay={0} />
            <FlipDigit value={time.hh[1]} run={run} delay={70} />
            <span className="px-1 text-[22px] font-bold leading-[100%] text-white/45 sm:text-[30px]">:</span>
            <FlipDigit value={time.mm[0]} run={run} delay={140} />
            <FlipDigit value={time.mm[1]} run={run} delay={210} />
          </span>
          <span className="flex flex-col gap-1.5 pb-0.5">
            <FlapText value={time.period} width={time.period.length || 2} run={seen} delay={380} tone={TONES.gold} />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/[0.6]">{time.zone}</span>
          </span>
        </div>
      ) : null}
    </div>
  )
}
