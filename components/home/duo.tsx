"use client"

import { useReducedMotion } from "framer-motion"
import { useState } from "react"
import { Bloom } from "./category"
import { useInViewPlaying } from "./use-in-view-playing"

/*
 * "Made for iPhone Duo." Frames are the app's own Duo simulator captures (inner display, landscape flat;
 * trip-cache-app/design-assets/duo-implementation-2026-10-27). The fold follows the app's fold study: the
 * right page is the closed screen and never moves, the left page swings in under a blur-and-darken veil.
 * Transform and opacity only; the loop pauses off screen and is a still, open device under reduced motion.
 */

type Screen = { id: string; label: string; closed: string; open: string; alt: string }

const SCREENS: Screen[] = [
  {
    id: "trips",
    label: "Trips",
    closed: "Closed, your trips and the flight you’ve just taken.",
    open: "Open, every upcoming trip on a map. Pick one and its next flight appears.",
    alt: "TripCache on iPhone Duo, open: a map of Melbourne with the QF 9401 Sydney to Melbourne flight card on the left, the trips list on the right.",
  },
  {
    id: "trip",
    label: "Trip",
    closed: "Closed, the trip’s day-by-day itinerary.",
    open: "Open, the trip cover with flights, hotel, budget, map and documents beside it.",
    alt: "TripCache on iPhone Duo, open: the Trip to Melbourne cover with 3 flights and 1 hotel on the left, the itinerary with flight QF 9401 and the hotel on the right.",
  },
  {
    id: "flight",
    label: "Flight",
    closed: "Closed, the flight card you need at the gate: boarding time, seat, class and check-in.",
    open: "Open, a departures board for your flight, with the countdown, seat and terminal.",
    alt: "TripCache on iPhone Duo, open: a departures board for QF 9401 to Melbourne at 09:10, on time, on the left, the flight details and route map on the right.",
  },
  {
    id: "documents",
    label: "Documents",
    closed: "Closed, the PIN pad for your document vault.",
    open: "Open, your documents stay sealed until the PIN is entered, then open beside it.",
    alt: "TripCache on iPhone Duo, open: 2 documents protected on the left and the document PIN pad on the right.",
  },
]

/* Inner display 951 × 669 pt; the continuity page plus the rail is the trailing 466 pt (49%). */
const LEFT_W = 764
const RIGHT_W = 734
const H = 1054

function DuoDevice({ screen, still, playing, onCycle }: { screen: Screen; still: boolean; playing: boolean; onCycle: () => void }) {
  return (
    <div
      className={`tc-duo ${still ? "tc-duo-still" : ""}`}
      data-playing={playing ? "true" : "false"}
      onAnimationIteration={(event) => {
        if (event.animationName === "tc-duo-shift") onCycle()
      }}
    >
      <div className="tc-duo-body">
        <span className="tc-duo-frame" />
        <div className="tc-duo-page tc-duo-left">
          {SCREENS.map((item) => (
            <div key={item.id} className={`tc-duo-layer ${item.id === screen.id ? "" : "tc-duo-layer-off"}`}>
              <img src={`/duo/${item.id}-left.webp`} alt="" width={LEFT_W} height={H} loading="lazy" decoding="async" className="tc-duo-img" />
              <img src={`/duo/${item.id}-left-blur.webp`} alt="" width={160} height={221} loading="lazy" decoding="async" className="tc-duo-img tc-duo-blur" />
            </div>
          ))}
          <span className="tc-duo-shade" />
        </div>
        <div className="tc-duo-page tc-duo-right">
          {SCREENS.map((item) => (
            <div key={item.id} className={`tc-duo-layer ${item.id === screen.id ? "" : "tc-duo-layer-off"}`}>
              <img src={`/duo/${item.id}-right.webp`} alt="" width={RIGHT_W} height={H} loading="lazy" decoding="async" className="tc-duo-img" />
            </div>
          ))}
          <span className="tc-duo-outer-veil" />
        </div>
      </div>
    </div>
  )
}

const POINTS = [
  { title: "Nothing jumps", text: "The screen you were on stays exactly where it was as you open the phone. The next page appears beside it." },
  { title: "The cover screen at the gate", text: "Keep it closed for the flight card, the countdown and the check-in button, one-handed." },
  { title: "The big screen for planning", text: "Open it for every trip on a map, a departures board for your flight, and the budget, side by side." },
]

export function Duo() {
  const reduce = useReducedMotion()
  const still = Boolean(reduce)
  const { ref, playing } = useInViewPlaying<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [manual, setManual] = useState(false)
  const screen = SCREENS[index]

  return (
    <section id="iphone-duo" aria-labelledby="iphone-duo-heading" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32">
      <Bloom className="tc-drift-slow -right-40 top-40 size-[520px] opacity-25" color="#ec4899" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2
            id="iphone-duo-heading"
            className="text-balance font-tc-display text-[clamp(36px,4.8vw,62px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink"
          >
            Made for iPhone Duo.
          </h2>
          <p className="max-w-[50ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[18px]">
            Closed, TripCache is the phone you know. Open it and the trip spreads across the big screen, with the page you
            were reading still in place.
          </p>
        </div>

        <div ref={ref} className="mt-14">
          <figure className="relative mx-auto max-w-[860px]">
            <div role="img" aria-label={screen.alt}>
              <DuoDevice
                key={cycle}
                screen={screen}
                still={still}
                playing={playing}
                onCycle={() => {
                  if (!manual) setIndex((value) => (value + 1) % SCREENS.length)
                }}
              />
            </div>
            <figcaption className="mx-auto mt-8 grid max-w-[720px] gap-1 text-center text-[15.5px] leading-7 text-tc-mute" aria-live="polite">
              <span className="text-tc-ink-2">{screen.closed}</span>
              <span>{screen.open}</span>
            </figcaption>
          </figure>

          <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="iPhone Duo screens">
            {SCREENS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={i === index}
                onClick={() => {
                  setManual(true)
                  setIndex(i)
                  setCycle((value) => value + 1)
                }}
                className={`tc-press min-h-10 rounded-full border px-4 text-[14px] font-medium transition-colors duration-200 ${
                  i === index ? "border-tc-violet bg-tc-violet-soft text-tc-violet" : "border-tc-line bg-white text-tc-ink-2 hover:bg-tc-mist"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point.title} className="rounded-[22px] border border-tc-line bg-tc-mist px-6 py-6">
              <h3 className="font-tc-display text-[21px] font-semibold leading-[1.3] text-tc-ink">{point.title}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-tc-mute">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
