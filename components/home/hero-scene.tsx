"use client"

import Image from "next/image"
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion"
import { BellRing, CalendarDays, Mail, Plane } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { City } from "./city-name"
import { CATEGORY, HERO_TRIPS, type Category } from "./data"

const EASE = [0.16, 1, 0.3, 1] as const
const STAGE = { width: 600, height: 640 }
const CYCLE_MS = 4800
const ORDER: Category[] = ["flight", "hotel", "car", "activity"]
const SUBJECTS: Record<Category, string> = {
  flight: "E-ticket receipt",
  hotel: "Reservation confirmed",
  car: "Rental voucher",
  activity: "Your tour tickets",
}

/** One layer of the collage. Deeper layers travel further with the pointer. */
function Layer({
  depth,
  pointer,
  className,
  style,
  children,
}: {
  depth: number
  pointer: { x: MotionValue<number>; y: MotionValue<number> }
  className: string
  style?: React.CSSProperties
  children: ReactNode
}) {
  const x = useTransform(pointer.x, (value) => value * depth)
  const y = useTransform(pointer.y, (value) => value * depth)
  return (
    <motion.div className={`absolute ${className}`} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  )
}

export function HeroScene() {
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { margin: "-5% 0px -5% 0px" })
  const reduce = useReducedMotion() ?? false
  const [scale, setScale] = useState(1)
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState(0)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointer = {
    x: useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.8 }),
    y: useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.8 }),
  }

  // Fit the fixed-size collage to its column.
  useEffect(() => {
    const element = frameRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / STAGE.width)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Pointer parallax across the whole hero.
  useEffect(() => {
    if (reduce) return
    const host = frameRef.current?.closest("section")
    if (!host) return
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      const box = host.getBoundingClientRect()
      rawX.set(((event.clientX - box.left) / box.width - 0.5) * 2)
      rawY.set(((event.clientY - box.top) / box.height - 0.5) * 2)
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)
    return () => {
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [rawX, rawY, reduce])

  // Emails drop into the postcard, then the trip changes destination.
  useEffect(() => {
    if (!inView || reduce) return
    const timers = [
      window.setTimeout(() => setActive(0), 0),
      window.setTimeout(() => setActive(1), 1300),
      window.setTimeout(() => setActive(2), 2600),
      window.setTimeout(() => setActive(3), 3900),
      window.setTimeout(() => setIndex((value) => (value + 1) % HERO_TRIPS.length), CYCLE_MS),
    ]
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [index, inView, reduce])

  const trip = HERO_TRIPS[index]
  const next = HERO_TRIPS[(index + 1) % HERO_TRIPS.length]
  const bookings = ORDER.reduce((sum, category) => sum + trip.counts[category], 0)
  const envelopes = ORDER.filter((category) => next.counts[category] > 0).slice(0, 3)

  return (
    <div ref={frameRef} className="relative w-full" style={{ height: STAGE.height * scale }}>
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{ width: STAGE.width, height: STAGE.height, transform: `translateX(-50%) scale(${scale})` }}
      >
        {/* Dynamic Island, as the app shows it during a flight */}
        <Layer depth={10} pointer={pointer} className="left-[86px] top-[14px] z-20">
          <div className="tc-float-a flex h-[38px] w-[226px] items-center justify-between rounded-full bg-black pl-2 pr-1.5 shadow-[0_16px_30px_-14px_rgba(0,0,0,0.7)]">
            <span className="flex items-center gap-2">
              <span className="grid size-[22px] place-items-center rounded-full bg-tc-live text-black">
                <Plane className="size-3 rotate-45 fill-black" aria-hidden="true" />
              </span>
              <span className="text-[14px] font-bold tabular-nums text-tc-live">1h 24m</span>
            </span>
            <span className="rounded-full bg-tc-live-gate px-2 py-[3px] text-[12px] font-bold text-black">B7</span>
          </div>
        </Layer>

        {/* The trip postcard: the app's own landmarks artwork */}
        <Layer depth={6} pointer={pointer} className="left-[40px] top-[66px] z-10">
          <div className="relative h-[396px] w-[520px] -rotate-2 overflow-hidden rounded-[34px] shadow-[0_50px_90px_-40px_rgba(45,27,87,0.65),0_1px_0_rgba(255,255,255,0.6)_inset] ring-1 ring-black/5">
            <Image
              src="/brand-landmarks.webp"
              alt=""
              fill
              preload
              sizes="(min-width: 1024px) 520px, 90vw"
              className="tc-kenburns object-cover object-[50%_38%]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(14,10,40,0.35)_0%,transparent_26%,transparent_48%,rgba(20,10,60,0.78)_100%)]" />

            <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-[16px] bg-[#14112b]/55 py-2 pl-2 pr-3.5 text-white ring-1 ring-white/15 backdrop-blur-md">
              <span className="grid size-9 place-items-center rounded-[10px] bg-white text-tc-violet">
                <Plane className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold leading-5">{trip.next.title}</span>
                <span className="block text-[12px] leading-4 text-white/75">{trip.next.meta}</span>
              </span>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#14112b]/55 px-3 py-2 text-[13px] font-semibold text-[#fec84b] ring-1 ring-white/15 backdrop-blur-md">
              <BellRing className="size-4" aria-hidden="true" />
              Boarding soon
            </div>

            <div className="absolute inset-x-6 bottom-5 text-white">
              <p className="font-tc-script text-[46px] leading-[0.85] [text-shadow:0_2px_18px_rgba(20,10,60,0.6)]">Trip to</p>
              <div className="font-tc-display text-[60px] font-semibold leading-[1.02] tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(20,10,60,0.55)]">
                <City name={trip.city} reduce={reduce} />
              </div>
              <div className="mt-2 flex gap-2 text-[13px] font-medium">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/16 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-md">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {trip.dates}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/16 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-md">
                  {bookings} bookings
                </span>
              </div>
            </div>
          </div>
        </Layer>

        {/* Confirmations arrive one at a time and drop into the trip */}
        <Layer depth={12} pointer={pointer} className="right-0 top-[14px] z-30 h-[80px] w-[262px]">
          <AnimatePresence>
            {envelopes.map((category, slot) =>
              slot === active ? (
                <motion.div
                  key={`${index}-${category}`}
                  className="absolute inset-x-0 top-0 flex items-center gap-2.5 rounded-[16px] border border-tc-line bg-white px-3 py-2.5 shadow-[0_18px_34px_-18px_rgba(45,27,87,0.55)]"
                  style={{ rotate: [2.5, -1.5, 1.5][slot] }}
                  initial={reduce ? false : { opacity: 0, y: -26, x: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.6, ease: EASE } }}
                  exit={{ opacity: 0, y: 190, x: -90, scale: 0.62, transition: { duration: 0.65, ease: [0.55, 0, 0.75, 0.2] } }}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full" style={{ backgroundColor: CATEGORY[category].soft, color: CATEGORY[category].text }}>
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-tc-ink">
                      {SUBJECTS[category]} · {next.city}
                    </span>
                    <span className="block truncate text-[11.5px] text-tc-mute">Forwarded to TripCache</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-tc-mist px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums text-tc-mute">
                    {slot + 1}/{envelopes.length}
                  </span>
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </Layer>

        {/* The app's 3D suitcase and boarding pass */}
        <Layer depth={22} pointer={pointer} className="left-[318px] top-[336px] z-20 w-[290px]">
          <div className="tc-float-b">
            <Image
              src="/brand-suitcase-pass.webp"
              alt=""
              width={900}
              height={750}
              sizes="300px"
              className="h-auto w-full drop-shadow-[0_30px_30px_rgba(45,27,87,0.3)]"
            />
          </div>
        </Layer>

        {/* A reminder, in the app's toast style */}
        <Layer depth={16} pointer={pointer} className="left-[-8px] top-[486px] z-20 w-[316px]">
          <div className="tc-float-c flex -rotate-[1.5deg] items-center gap-3 rounded-[18px] border border-tc-line bg-white px-3.5 py-3 shadow-[0_24px_44px_-22px_rgba(45,27,87,0.55)]">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fff5d6] text-[#b54708]">
              <BellRing className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13.5px] font-semibold leading-5 text-tc-ink">Free cancellation ends in 2 days</span>
              <span className="block text-[12px] leading-4 text-tc-mute">Belmont Hotel · reminder you set</span>
            </span>
          </div>
        </Layer>
      </div>
      <p className="sr-only">
        Illustration: confirmation emails are forwarded to TripCache and filed into a trip, shown as a postcard with the
        destination, dates and number of bookings, a cancellation reminder and a live flight countdown.
      </p>
    </div>
  )
}
