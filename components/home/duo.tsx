"use client"

import { useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { useInViewPlaying } from "./use-in-view-playing"

/*
 * "Made for iPhone Duo." The video is rendered frame by frame from the iphone-duo fold study
 * (github.com/chuspeeism/iphone-duo: Apple's iPhone Duo model and the reference blur-and-darken shader), with
 * TripCache's own inner-display captures from the iPhone Duo simulator loaded as the screen. One clip per
 * screen, joined into a single video; the tabs seek to a screen's chapter. It plays only on screen; under
 * reduced motion each tab shows that screen's open still instead.
 */

type Screen = { id: string; label: string; closed: string; open: string; alt: string }

const SCREENS: Screen[] = [
  {
    id: "trips",
    label: "Trips",
    closed: "Closed, your trips and the flight you’ve just taken.",
    open: "Open, every upcoming trip on a map. Pick one and its next flight appears.",
    alt: "TripCache on iPhone Duo folding closed and opening again: a map of Melbourne with the QF 9401 Sydney to Melbourne flight card on the left, the trips list on the right.",
  },
  {
    id: "trip",
    label: "Trip",
    closed: "Closed, the trip’s day-by-day itinerary.",
    open: "Open, the trip cover with flights, hotel, budget, map and documents beside it.",
    alt: "TripCache on iPhone Duo folding closed and opening again: the Trip to Melbourne cover on the left, the itinerary with flight QF 9401 and the hotel on the right.",
  },
  {
    id: "flight",
    label: "Flight",
    closed: "Closed, the flight card you need at the gate: boarding time, seat, class and check-in.",
    open: "Open, a departures board for your flight, with the countdown, seat and terminal.",
    alt: "TripCache on iPhone Duo folding closed and opening again: a departures board for QF 9401 to Melbourne on the left, the flight details and route map on the right.",
  },
  {
    id: "documents",
    label: "Documents",
    closed: "Closed, the PIN pad for your document vault.",
    open: "Open, your documents stay sealed until the PIN is entered, then open beside it.",
    alt: "TripCache on iPhone Duo folding closed and opening again: 2 documents protected on the left and the document PIN pad on the right.",
  },
]

/* Each chapter: open 1.4 s, close 2.6 s, closed 1.2 s, open 2.6 s, then a 0.4 s crossfade into the next screen. */
const CHAPTER_S = 8
const VIDEO_W = 1440
const VIDEO_H = 1264

const POINTS = [
  { title: "Nothing jumps", text: "The screen you were on stays exactly where it was as you open the phone. The next page appears beside it." },
  { title: "The cover screen at the gate", text: "Keep it closed for the flight card, the countdown and the check-in button, one-handed." },
  { title: "The big screen for planning", text: "Open it for every trip on a map, a departures board for your flight, and the budget, side by side." },
]

function DuoVideo({ index, onChapter, seek }: { index: number; onChapter: (index: number) => void; seek: { chapter: number } | null }) {
  const reduce = useReducedMotion()
  const { ref, playing } = useInViewPlaying<HTMLVideoElement>()
  useEffect(() => {
    const video = ref.current
    if (!video || reduce) return
    if (playing) void video.play().catch(() => {})
    else video.pause()
  }, [playing, reduce, ref])

  // Only a tab press seeks (not the chapter changes the video reports as it plays).
  useEffect(() => {
    const video = ref.current
    if (!video || !seek || reduce) return
    video.currentTime = seek.chapter * CHAPTER_S
  }, [seek, reduce, ref])

  if (reduce) {
    return (
      <img
        src={`/duo/${SCREENS[index].id}-open.webp`}
        alt=""
        width={VIDEO_W}
        height={VIDEO_H}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
      />
    )
  }

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster="/duo/trips-open.webp"
      width={VIDEO_W}
      height={VIDEO_H}
      onTimeUpdate={(event) => onChapter(Math.min(SCREENS.length - 1, Math.floor(event.currentTarget.currentTime / CHAPTER_S)))}
      className="h-auto w-full"
    >
      <source media="(max-width: 767px)" src="/duo/duo-fold-720.webm" type="video/webm" />
      <source media="(max-width: 767px)" src="/duo/duo-fold-720.mp4" type="video/mp4" />
      <source src="/duo/duo-fold-1200.webm" type="video/webm" />
      <source src="/duo/duo-fold-1200.mp4" type="video/mp4" />
    </video>
  )
}

export function Duo() {
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState<{ chapter: number } | null>(null)
  const screen = SCREENS[index]

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
            Closed, TripCache is the phone you know. Open it and the trip spreads across the big screen, with the page you
            were reading still in place.
          </p>
        </div>

        <div className="mt-10">
          <figure className="relative mx-auto max-w-[820px]">
            <div role="img" aria-label={screen.alt}>
              <DuoVideo
                index={index}
                seek={seek}
                onChapter={(chapter) => {
                  if (chapter !== index) setIndex(chapter)
                }}
              />
            </div>
            <figcaption className="mx-auto mt-4 grid max-w-[720px] gap-1 text-center text-[15.5px] leading-7 text-tc-mute">
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
                  setIndex(i)
                  setSeek({ chapter: i })
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
