"use client"

import { useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { useInViewPlaying } from "./use-in-view-playing"

/*
 * "Made for iPhone Duo." One sequence rendered frame by frame from the iphone-duo fold study
 * (github.com/chuspeeism/iphone-duo: Apple's iPhone Duo model and the reference blur-and-darken shader) with
 * TripCache's own captures from the iPhone Duo simulator: open on Trips, fold closed, turn and stand it up as a tent
 * while the cover screen switches to the tent's flight progress, then back. The pills under it swap in a still of
 * each screen open (same framing, stacked in the same box, so nothing moves). The video plays only on screen; under
 * reduced motion the tent still shows instead.
 */

type View = { id: string; label: string; caption: string; alt: string }

const VIEWS: View[] = [
  {
    id: "tent",
    label: "Fold and tent",
    caption: "Fold it, stand it up as a tent, and the cover screen follows your flight: time to landing, distance to go, the route.",
    alt: "TripCache on iPhone Duo: open on the trips map, folded closed, then stood up as a tent with the cover screen showing a Sydney to London flight’s progress over southern China, 11 h 34 m until landing and 8,818 km to go.",
  },
  {
    id: "trips",
    label: "Trips",
    caption: "Every upcoming trip on a map. Pick one and its next flight appears.",
    alt: "TripCache open on iPhone Duo: a map of Melbourne with the QF 9401 Sydney to Melbourne flight card on the left, the trips list on the right.",
  },
  {
    id: "trip",
    label: "Trip",
    caption: "The trip cover with flights, hotel, budget, map and documents beside it.",
    alt: "TripCache open on iPhone Duo: the Trip to Melbourne cover on the left, the itinerary with flight QF 9401 and the hotel on the right.",
  },
  {
    id: "flight",
    label: "Flight",
    caption: "A departures board for your flight, with the countdown, seat and terminal.",
    alt: "TripCache open on iPhone Duo: a departures board for QF 9401 to Melbourne on the left, the flight details and route map on the right.",
  },
  {
    id: "documents",
    label: "Documents",
    caption: "Your documents stay sealed until the PIN is entered, then open beside it.",
    alt: "TripCache open on iPhone Duo: 2 documents protected on the left and the document PIN pad on the right.",
  },
]

const VIDEO_W = 1440
const VIDEO_H = 1264

const POINTS = [
  { title: "Nothing jumps", text: "The screen you were on stays exactly where it was as you open the phone. The next page appears beside it." },
  { title: "Stand it up in flight", text: "Fold it into a tent on the tray table and the cover screen shows how far you’ve come and how long is left." },
  { title: "The big screen for planning", text: "Open it for every trip on a map, a departures board for your flight, and the budget, side by side." },
]

function Sequence({ active }: { active: boolean }) {
  const reduce = useReducedMotion()
  const { ref, playing } = useInViewPlaying<HTMLVideoElement>()

  useEffect(() => {
    const video = ref.current
    if (!video || reduce) return
    if (playing && active) void video.play().catch(() => {})
    else video.pause()
  }, [active, playing, reduce, ref])

  if (reduce) {
    return <img src="/duo/tent.webp" alt="" width={VIDEO_W} height={VIDEO_H} loading="lazy" decoding="async" className="h-auto w-full" />
  }
  return (
    <video ref={ref} muted loop playsInline preload="none" poster="/duo/trips-open.webp" width={VIDEO_W} height={VIDEO_H} className="block h-auto w-full">
      <source media="(max-width: 767px)" src="/duo/duo-tent-720.webm" type="video/webm" />
      <source media="(max-width: 767px)" src="/duo/duo-tent-720.mp4" type="video/mp4" />
      <source src="/duo/duo-tent-1200.webm" type="video/webm" />
      <source src="/duo/duo-tent-1200.mp4" type="video/mp4" />
    </video>
  )
}

export function Duo() {
  const [index, setIndex] = useState(0)
  const view = VIEWS[index]

  return (
    <section id="iphone-duo" aria-labelledby="iphone-duo-heading" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2
            id="iphone-duo-heading"
            className="text-balance font-tc-display text-[clamp(36px,4.8vw,62px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink"
          >
            Made for iPhone Duo.
          </h2>
          <p className="max-w-[50ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[18px]">
            Open, the trip spreads across the big screen. Closed, it’s the phone you know. Stand it up as a tent and the cover
            screen tracks your flight.
          </p>
        </div>

        <figure className="mx-auto mt-10 max-w-[820px]">
          {/* Video and stills share one box; only opacity changes between them. */}
          <div className="grid" role="img" aria-label={view.alt}>
            <div className={`[grid-area:1/1] transition-opacity duration-500 ${index === 0 ? "opacity-100" : "opacity-0"}`}>
              <Sequence active={index === 0} />
            </div>
            {VIEWS.slice(1).map((item, i) => (
              <img
                key={item.id}
                src={`/duo/${item.id}-open.webp`}
                alt=""
                width={VIDEO_W}
                height={VIDEO_H}
                loading="lazy"
                decoding="async"
                className={`h-auto w-full transition-opacity duration-500 [grid-area:1/1] ${index === i + 1 ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <figcaption className="mx-auto mt-4 grid max-w-[640px] text-center text-[15.5px] leading-7 text-tc-ink-2">
            {/* Every caption in one cell, so the longest sets the height. */}
            {VIEWS.map((item, i) => (
              <span key={item.id} aria-hidden={i !== index} className={`[grid-area:1/1] transition-opacity duration-300 ${i === index ? "opacity-100" : "opacity-0"}`}>
                {item.caption}
              </span>
            ))}
          </figcaption>
        </figure>

        <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="iPhone Duo views">
          {VIEWS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={`tc-press min-h-10 rounded-full border px-4 text-[14px] font-medium transition-colors duration-200 ${
                i === index ? "border-tc-violet bg-tc-violet-soft text-tc-violet" : "border-tc-line bg-white text-tc-ink-2 hover:bg-tc-mist"
              }`}
            >
              {item.label}
            </button>
          ))}
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
