"use client"

import { useReducedMotion } from "framer-motion"
import { ArrowUp, Check } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { AgentVideo, AgentVideos } from "./agent-videos"
import { Bloom } from "./category"
import { useInViewPlaying } from "./use-in-view-playing"

/*
 * "Your AI assistant, connected." Real TripCache MCP Apps cards (supabase/functions/mcp/cards.ts and
 * flightCard.ts in trip-cache-app, rendered from their fixtures) in a neutral chat frame. The frame is a
 * generic assistant, not any one vendor's UI. Connector facts: Pro only, number-matching approval in the app.
 */

type Exchange = {
  id: string
  label: string
  prompt: string
  tool: string
  reply: string
  card: { src: string; width: number; height: number; alt: string; clip?: boolean }
}

const EXCHANGES: Exchange[] = [
  {
    id: "flight",
    label: "Next flight",
    prompt: "When’s my next flight?",
    tool: "next_flight",
    reply: "QF 9401 to Melbourne, Tuesday 10 November at 9:10 am. It’s on schedule.",
    card: {
      src: "/agents/card-next-flight.webp",
      width: 840,
      height: 480,
      alt: "TripCache flight card: QF 9401 Sydney 9:10 AM to Melbourne 10:45 AM, scheduled, 11 days until gate departure.",
    },
  },
  {
    id: "trip",
    label: "Show a trip",
    prompt: "Show my Melbourne trip",
    tool: "get_trip",
    reply: "Here’s your Melbourne weekend: two flights, one hotel night and four plans.",
    card: {
      src: "/agents/card-trip.webp",
      width: 840,
      height: 1150,
      clip: true,
      alt: "TripCache trip card: Melbourne weekend, 10 to 11 Nov 2026, 2 flights, 1 stay, A$1.2K spent, 3 documents, with a day-by-day itinerary.",
    },
  },
  {
    id: "spend",
    label: "Spending",
    prompt: "How much have I spent in Melbourne?",
    tool: "list_expenses",
    reply: "A$1,218 of your A$1,500 budget so far. Lodging is the biggest share.",
    card: {
      src: "/agents/card-expenses.webp",
      width: 840,
      height: 1000,
      clip: true,
      alt: "TripCache expenses card: A$1,218 of an A$1,500 budget, by category: lodging A$640, food A$268, car rental A$164, events A$70.",
    },
  },
  {
    id: "add",
    label: "Add a booking",
    prompt: "Add a Hertz car to my Melbourne trip",
    tool: "add_plan_item",
    reply: "Done. The Hertz rental is on your Melbourne weekend, picked up at the airport on Tuesday at 11:30 am.",
    card: {
      src: "/agents/card-plan-added.webp",
      width: 840,
      height: 413,
      alt: "TripCache confirmation card: Hertz rental car added to Melbourne weekend, pick-up Tue 10 Nov 11:30 AM, drop-off Wed 11 Nov 5:00 PM.",
    },
  },
]

const AGENTS = ["Claude", "ChatGPT", "Gemini", "Grok", "Perplexity", "Hermes", "OpenClaw"]

const CONNECT = [
  { title: "Copy your TripCache link", text: "One connector link, from the app." },
  { title: "Add it in your assistant", text: "Paste it where your assistant adds connectors." },
  { title: "Approve on your phone", text: "Tap the number you see on screen. Nothing connects without you." },
]

/* Typing, sending, the tool call, the reply, the card, then a pause before the next question. */
type Phase = "typing" | "sent" | "tool" | "reply" | "card"
const TYPE_MS = 38
const AFTER = { sent: 450, tool: 900, reply: 650, card: 4200 } as const

/** One question and its answer, each part mounting (and easing in) as the conversation reaches it. */
function Messages({ exchange, step }: { exchange: Exchange; step: number }) {
  return (
    <>
      {step >= 1 ? (
        <div className="tc-chat-in flex justify-end pt-6">
          <p className="max-w-[85%] rounded-[20px] rounded-br-[6px] bg-tc-canvas px-4 py-2.5 text-[15px] leading-6 text-tc-ink">{exchange.prompt}</p>
        </div>
      ) : null}
      {step >= 2 ? (
        <div className="tc-chat-in flex items-center gap-2 text-[13px] text-tc-mute">
          <span className={`grid size-5 place-items-center rounded-full ${step >= 3 ? "bg-tc-violet-soft text-tc-violet" : "tc-chat-pulse bg-tc-canvas"}`}>
            {step >= 3 ? <Check className="size-3" strokeWidth={3} /> : null}
          </span>
          <span>
            TripCache <span className="font-mono text-[12px] text-tc-ink-2">{exchange.tool}</span>
          </span>
        </div>
      ) : null}
      {step >= 3 ? <p className="tc-chat-in max-w-[46ch] text-[15px] leading-6 text-tc-ink">{exchange.reply}</p> : null}
      {step >= 4 ? (
        <div className={`tc-chat-card relative w-full max-w-[420px] ${exchange.card.clip ? "tc-chat-clip h-[300px] overflow-hidden sm:h-[330px]" : ""}`}>
          <img
            src={exchange.card.src}
            alt=""
            width={exchange.card.width}
            height={exchange.card.height}
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      ) : null}
    </>
  )
}

function ChatDemo() {
  const reduce = useReducedMotion()
  const { ref, playing } = useInViewPlaying<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")
  const [typed, setTyped] = useState(0)
  const [manual, setManual] = useState(false)
  const [history, setHistory] = useState<number[]>([])
  const [conversation, setConversation] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const columnRef = useRef<HTMLDivElement>(null)
  const exchange = EXCHANGES[index]
  const still = Boolean(reduce)

  // One timer at a time; it only runs while the frame is on screen.
  useEffect(() => {
    if (still || !playing) return
    let id = 0
    if (phase === "typing") {
      id = window.setTimeout(() => {
        if (typed < exchange.prompt.length) setTyped(typed + 1)
        else setPhase("sent")
      }, typed === 0 ? 500 : TYPE_MS)
    } else if (phase === "sent") id = window.setTimeout(() => setPhase("tool"), AFTER.sent)
    else if (phase === "tool") id = window.setTimeout(() => setPhase("reply"), AFTER.tool)
    else if (phase === "reply") id = window.setTimeout(() => setPhase("card"), AFTER.reply)
    else if (!manual) {
      id = window.setTimeout(() => advance((index + 1) % EXCHANGES.length), AFTER.card)
    }
    return () => window.clearTimeout(id)
  })

  // The conversation grows until the loop wraps; then (or when a question is picked) a fresh one starts.
  function advance(next: number, fresh = next === 0) {
    if (fresh) {
      setHistory([])
      setConversation((value) => value + 1)
    } else setHistory((value) => [...value, index])
    setIndex(next)
    setTyped(0)
    setPhase("typing")
  }

  const choose = (next: number) => {
    setManual(true)
    advance(next, true)
  }

  const shown = still ? "card" : phase
  const sent = shown !== "typing"
  const step = ["typing", "sent", "tool", "reply", "card"].indexOf(shown)

  // Messages never move in layout (no CLS): the column only scrolls by transform to keep the newest in view.
  useLayoutEffect(() => {
    const stage = stageRef.current
    const column = columnRef.current
    if (!stage || !column) return
    const offset = Math.max(0, column.offsetHeight - (stage.clientHeight - 16))
    column.style.transition = still || column.dataset.conversation !== String(conversation) ? "none" : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)"
    column.dataset.conversation = String(conversation)
    column.style.transform = offset ? `translateY(${-offset}px)` : ""
  }, [step, history.length, conversation, still])

  return (
    <div ref={ref}>
      <figure className="relative overflow-hidden rounded-[26px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-40px_rgba(45,27,87,0.4)]">
        <figcaption className="sr-only">
          An AI assistant connected to TripCache. Asked “{exchange.prompt}”, it answers “{exchange.reply}” and shows a TripCache card.
        </figcaption>

        <div className="flex items-center justify-between border-b border-tc-line px-5 py-3.5" aria-hidden="true">
          <p className="text-[14px] font-semibold text-tc-ink">Your assistant</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-tc-mist py-1 pl-1 pr-3 text-[12.5px] font-medium text-tc-ink-2">
            <img src="/app-icon-violet-indigo.webp" alt="" width={22} height={22} loading="lazy" decoding="async" className="size-[22px] rounded-[7px]" />
            TripCache connected
          </span>
        </div>

        {/* Fixed-height stage. New messages land below the last one and the column glides up to show them. */}
        <div ref={stageRef} className="relative h-[520px] overflow-hidden px-4 pb-4 sm:h-[560px] sm:px-6" aria-hidden="true">
          <div key={conversation} ref={columnRef} className="flex flex-col gap-4 will-change-transform">
            {history.map((item) => (
              <Messages key={item} exchange={EXCHANGES[item]} step={4} />
            ))}
            <Messages key={index} exchange={exchange} step={step} />
          </div>
        </div>

        <div className="border-t border-tc-line px-4 py-3 sm:px-6" aria-hidden="true">
          <div className="flex items-center gap-3 rounded-[16px] border border-tc-line bg-tc-mist py-2 pl-4 pr-2">
            <p className="min-h-6 flex-1 truncate text-[15px] leading-6 text-tc-ink">
              {sent ? <span className="text-tc-mute">Reply…</span> : exchange.prompt.slice(0, still ? 0 : typed)}
              {!sent && !still ? <span className="tc-caret ml-px inline-block h-[18px] w-[1.5px] translate-y-[3px] bg-tc-ink" /> : null}
              {!sent && still ? <span className="text-tc-mute">Ask anything</span> : null}
            </p>
            <span className={`grid size-8 place-items-center rounded-full transition-colors duration-300 ${!sent && typed > 0 ? "bg-tc-ink text-white" : "bg-tc-line text-tc-mute"}`}>
              <ArrowUp className="size-4" strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </figure>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Example questions">
        {EXCHANGES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => choose(i)}
            aria-pressed={i === index}
            className={`tc-press min-h-10 rounded-full border px-4 text-[14px] font-medium transition-colors duration-200 ${
              i === index ? "border-tc-violet bg-tc-violet-soft text-tc-violet" : "border-tc-line bg-white text-tc-ink-2 hover:bg-tc-mist"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/** The 8–12 s "connect your agent" loop: muted, plays only on screen, the poster under reduced motion. */
function HeroLoop({ video }: { video: AgentVideo }) {
  const reduce = useReducedMotion()
  const { ref, playing } = useInViewPlaying<HTMLVideoElement>()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (playing && !reduce) void node.play().catch(() => {})
    else node.pause()
  }, [playing, reduce, ref])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={video.poster}
      aria-hidden="true"
      className="mb-8 aspect-video w-full rounded-[22px] border border-tc-line bg-tc-mist object-cover"
    >
      {video.webm ? <source src={video.webm} type="video/webm" /> : null}
      {video.mp4 ? <source src={video.mp4} type="video/mp4" /> : null}
    </video>
  )
}

/** "Watch how to connect": one walkthrough per assistant, loaded only when someone presses play. */
function Walkthrough({ videos }: { videos: { key: string; label: string; video: AgentVideo }[] }) {
  const [active, setActive] = useState(videos[0].key)
  const current = videos.find((item) => item.key === active) ?? videos[0]

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-tc-ink">Watch how to connect</h3>
        {videos.length > 1 ? (
          <div className="flex gap-1 rounded-[14px] border border-tc-line bg-white p-1" role="group" aria-label="Walkthrough for">
            {videos.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={item.key === current.key}
                onClick={() => setActive(item.key)}
                className={`tc-press min-h-9 rounded-[10px] px-3.5 text-[14px] font-medium transition-colors duration-200 ${
                  item.key === current.key ? "bg-tc-violet text-white" : "text-tc-ink-2 hover:bg-tc-mist"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <video
        key={current.key}
        controls
        playsInline
        preload="none"
        poster={current.video.poster}
        aria-label={`How to connect TripCache to ${current.label}`}
        className="mt-3 aspect-video w-full rounded-[18px] border border-tc-line bg-tc-mist object-cover"
      >
        {current.video.webm ? <source src={current.video.webm} type="video/webm" /> : null}
        {current.video.mp4 ? <source src={current.video.mp4} type="video/mp4" /> : null}
        {current.video.captions ? <track kind="captions" src={current.video.captions} srcLang="en" label="English" default /> : null}
      </video>
    </div>
  )
}

export function Assistants({ videos = {} }: { videos?: AgentVideos }) {
  const walkthroughs = [
    { key: "claude", label: "Claude", video: videos.claude },
    { key: "chatgpt", label: "ChatGPT", video: videos.chatgpt },
  ].filter((item): item is { key: string; label: string; video: AgentVideo } => Boolean(item.video))
  return (
    <section id="ai-assistants" aria-labelledby="ai-assistants-heading" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32">
      <Bloom className="tc-drift -left-40 top-24 size-[460px] opacity-20" color="#8b5cf6" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2
            id="ai-assistants-heading"
            className="text-balance font-tc-display text-[clamp(36px,4.8vw,62px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink"
          >
            Ask your AI assistant about your trip.
          </h2>
          <p className="max-w-[50ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[18px]">
            Connect TripCache to the assistant you already use. It can answer from your trips, flights and spending, and add a
            booking when you ask. Answers come back as TripCache cards.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ChatDemo />
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            {videos.hero ? <HeroLoop video={videos.hero} /> : null}
            <div className="flex items-center gap-3">
              <h3 className="font-tc-display text-[25px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[28px]">
                Connect in a minute
              </h3>
              <span className="rounded-full bg-[#fff5d6] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#b54708]">Pro</span>
            </div>
            <ol className="mt-6 grid gap-3">
              {CONNECT.map((item, i) => (
                <li key={item.title} className="flex gap-4 rounded-[16px] border border-tc-line bg-white px-4 py-3.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-tc-violet-soft text-[14px] font-semibold tabular-nums text-tc-violet">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-tc-ink">{item.title}</span>
                    <span className="mt-0.5 block text-[14.5px] leading-6 text-tc-mute">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            {walkthroughs.length ? <Walkthrough videos={walkthroughs} /> : null}

            <h3 className="mt-10 text-[15px] font-semibold text-tc-ink">Works with</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {AGENTS.map((agent) => (
                <li key={agent} className="rounded-full border border-tc-line bg-tc-mist px-3.5 py-1.5 text-[14px] font-medium text-tc-ink-2">
                  {agent}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[46ch] text-[14.5px] leading-7 text-tc-mute">
              Connecting an assistant is part of TripCache Pro. You choose whether it can add bookings, and you can disconnect it
              any time in the app.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
