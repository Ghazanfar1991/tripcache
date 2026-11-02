"use client"

import { useReducedMotion } from "framer-motion"
import { Mic, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Bloom } from "./category"
import { useInViewPlaying } from "./use-in-view-playing"

/*
 * "Ask Siri." The answer is the app's own words (plugins/app-intents in trip-cache-app) and the card is the
 * medium flight-progress widget that the Siri snippet renders (targets/widget/_shared). Free on every plan.
 */

const QUESTION = "When’s my next flight in TripCache?"
const ANSWER = "Your flight QF 9401 to Melbourne leaves on Tuesday 10 November at 9:10 am, on time."
const QUESTION_WORDS = QUESTION.split(" ")

const PHRASES = [
  "When’s my next flight in TripCache?",
  "What’s my gate in TripCache?",
  "Where are my bags in TripCache?",
  "When’s my flight to Sydney in TripCache?",
  "Where am I staying in TripCache?",
  "Where do I pick up my car in TripCache?",
]

/* listening → hearing each word → the answer sheet → hold → reset */
type Phase = "idle" | "listening" | "answer"
const WORD_MS = 210

function SiriPhone() {
  const reduce = useReducedMotion()
  const { ref, playing } = useInViewPlaying<HTMLDivElement>()
  const [phase, setPhase] = useState<Phase>("idle")
  const [words, setWords] = useState(0)
  const still = Boolean(reduce)

  useEffect(() => {
    if (still || !playing) return
    let id = 0
    if (phase === "idle") id = window.setTimeout(() => setPhase("listening"), 900)
    else if (phase === "listening") {
      id = window.setTimeout(() => {
        if (words < QUESTION_WORDS.length) setWords(words + 1)
        else setPhase("answer")
      }, words === 0 ? 700 : words === QUESTION_WORDS.length ? 650 : WORD_MS)
    } else {
      id = window.setTimeout(() => {
        setWords(0)
        setPhase("idle")
      }, 6200)
    }
    return () => window.clearTimeout(id)
  }, [still, playing, phase, words])

  const shown = still ? "answer" : phase

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[290px] sm:max-w-[330px]">
      <figure className="relative aspect-[393/852] overflow-hidden rounded-[52px] border-[10px] border-[#101014] bg-[#101014] shadow-[0_50px_90px_-40px_rgba(45,27,87,0.65)]">
        <figcaption className="sr-only">
          On iPhone, someone asks Siri “{QUESTION}”. Siri answers “{ANSWER}” and shows the TripCache flight card: QF 9401, Sydney 9:10 AM to Melbourne
          10:45 AM, 11 days until gate departure.
        </figcaption>
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[42px]">
          <img src="/agents/siri-wallpaper.webp" alt="" width={560} height={1217} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(20_14_40/0.15),rgb(20_14_40/0.55))]" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-7 pt-3.5 font-[system-ui] text-[14px] font-semibold text-white">
            <span className="tabular-nums">8:12</span>
            <span className="h-[26px] w-[92px] rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="h-[10px] w-[18px] rounded-[3px] border border-white/80 p-px">
                <span className="block h-full w-3/4 rounded-[1.5px] bg-white" />
              </span>
            </span>
          </div>

          <div className={`tc-siri-glow absolute inset-0 rounded-[42px] ${shown === "listening" ? "opacity-100" : "opacity-0"}`} />

          <p
            className={`absolute inset-x-6 bottom-16 text-center font-[system-ui] text-[19px] font-semibold leading-7 text-white transition-opacity duration-500 ${
              shown === "listening" ? "opacity-100" : "opacity-0"
            }`}
          >
            {QUESTION_WORDS.map((word, i) => (
              <span key={i} className={`transition-opacity duration-300 ${i < words ? "opacity-100" : "opacity-0"}`}>
                {word}{" "}
              </span>
            ))}
          </p>

          <div className={`tc-siri-sheet absolute inset-x-2 top-12 rounded-[30px] bg-white/95 p-2.5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)] ${shown === "answer" ? "" : "tc-siri-sheet-hidden"}`}>
            <p className="px-2.5 pb-3 pt-2 font-[system-ui] text-[15px] leading-[21px] text-[#111]">{ANSWER}</p>
            <img src="/agents/siri-flight-card.webp" alt="" width={840} height={394} loading="lazy" decoding="async" className="block h-auto w-full" />
            <p className="mt-2.5 rounded-full bg-[#0a84ff] py-2.5 text-center font-[system-ui] text-[15px] font-semibold text-white">Done</p>
          </div>

          <span className="absolute bottom-2 left-1/2 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-white/70" />
        </div>
      </figure>
    </div>
  )
}

function SpotlightCard() {
  return (
    <figure className="rounded-[22px] border border-tc-line bg-white p-4 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-40px_rgba(45,27,87,0.4)]">
      <figcaption className="sr-only">Searching Spotlight for Melbourne shows the TripCache trip “Melbourne, 10 to 14 Nov 2026”.</figcaption>
      <div aria-hidden="true">
        <div className="flex items-center gap-2 rounded-full bg-tc-mist px-3.5 py-2 text-[14.5px] text-tc-ink">
          <Search className="size-4 text-tc-mute" strokeWidth={2.2} />
          Melbourne
        </div>
        <p className="mt-4 px-1 text-[12px] font-semibold text-tc-mute">TripCache</p>
        <div className="mt-2 flex items-center gap-3 rounded-[14px] bg-tc-mist px-3 py-2.5">
          <img src="/app-icon-violet-indigo.webp" alt="" width={36} height={36} loading="lazy" decoding="async" className="size-9 rounded-[10px]" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-tc-ink">Melbourne</p>
            <p className="text-[13px] tabular-nums text-tc-mute">SYD → SYD · 10 – 14 Nov 2026</p>
          </div>
        </div>
      </div>
    </figure>
  )
}

export function Siri() {
  return (
    <section id="siri" aria-labelledby="siri-heading" className="relative scroll-mt-24 overflow-hidden bg-tc-canvas py-24 sm:py-32">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 id="siri-heading" className="text-balance font-tc-display text-[clamp(36px,4.8vw,62px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink">
            Ask Siri. TripCache answers.
          </h2>
          <p className="max-w-[50ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[18px]">
            Free on every plan. Ask about your flight, gate, bags, hotel or rental car, and Siri reads out the answer with a
            TripCache card. Your trips show up in Spotlight too.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-5">
            <Bloom className="tc-drift left-1/2 top-1/3 size-[420px] -translate-x-1/2 opacity-30" color="#6366f1" />
            <SiriPhone />
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-tc-display text-[25px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[28px]">Just say it</h3>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {PHRASES.map((phrase) => (
                <li key={phrase} className="flex items-center gap-3 rounded-[16px] border border-tc-line bg-white px-4 py-3 text-[15px] text-tc-ink">
                  <Mic className="size-4 shrink-0 text-tc-violet" strokeWidth={2.2} aria-hidden="true" />
                  <span>“{phrase}”</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-6 sm:grid-cols-[1fr_1fr] sm:items-center">
              <div>
                <h3 className="font-tc-display text-[21px] font-semibold leading-[1.3] text-tc-ink">Find a trip from Spotlight</h3>
                <p className="mt-2 max-w-[40ch] text-[15.5px] leading-7 text-tc-mute">
                  Search for a destination and the trip is there. Tap it to open it in TripCache. Shortcuts gets the same actions.
                </p>
              </div>
              <SpotlightCard />
            </div>

            <p className="mt-10 border-t border-tc-line pt-5 text-[14.5px] leading-7 text-tc-mute">
              <span className="font-semibold text-tc-ink-2">On Android,</span> touch and hold the TripCache icon for shortcuts to your next flight, current trip or a new expense. Gemini support is coming.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
