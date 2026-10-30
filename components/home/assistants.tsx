"use client"

import { useReducedMotion } from "framer-motion"
import { ArrowUp, Check } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AgentLogo, type AgentId } from "./agent-logos"
import type { AgentVideo, AgentVideos } from "./agent-videos"
import { Bloom } from "./category"
import { useInViewPlaying } from "./use-in-view-playing"

/*
 * "Your AI assistant, connected." Real TripCache MCP Apps cards (supabase/functions/mcp/cards.ts and
 * flightCard.ts in trip-cache-app, rendered from their fixtures) in a neutral chat frame, answered in turn by Claude
 * and ChatGPT (the two assistants the cards are checked in). Beside it, the app's AI agents orbit with each agent's
 * own connector steps: seven ready, Muse coming. Connector facts: Pro only, number-matching approval in the app.
 */

type Exchange = {
  id: string
  agent: AgentId
  label: string
  prompt: string
  tool: string
  reply: string
  card: { src: string; width: number; height: number; alt: string; clip?: boolean }
}

const EXCHANGES: Exchange[] = [
  {
    id: "flight",
    agent: "claude",
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
    agent: "chatgpt",
    label: "Show a trip",
    prompt: "Show my Melbourne trip",
    tool: "get_trip",
    reply: "Here’s your Melbourne trip: two flights, a night at Collins Street Hotel and four plans.",
    card: {
      src: "/agents/card-trip.webp",
      width: 840,
      height: 1150,
      clip: true,
      alt: "TripCache trip card: Melbourne, 10 to 11 Nov 2026, 2 flights, 1 stay, A$1.2K spent, 3 documents, with a day-by-day itinerary.",
    },
  },
  {
    id: "spend",
    agent: "claude",
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
    agent: "chatgpt",
    label: "Add a booking",
    prompt: "Add a Hertz car to my Melbourne trip",
    tool: "add_plan_item",
    reply: "Done. The Hertz rental is on your Melbourne trip, picked up at the airport on Tuesday at 11:30 am.",
    card: {
      src: "/agents/card-plan-added.webp",
      width: 840,
      height: 413,
      alt: "TripCache confirmation card: Hertz rental car added to the Melbourne trip, pick-up Tue 10 Nov 11:30 AM, drop-off Wed 11 Nov 5:00 PM.",
    },
  },
]

/* The app's catalog (lib/connectedApps.ts, checked 2026-10-29): where each adds a custom connector. Muse has none yet. */
const AGENTS: { id: AgentId; name: string; steps: string[]; note?: string; soon?: boolean }[] = [
  { id: "claude", name: "Claude", steps: ["Customize → Connectors → Add", "Add custom connector, paste the link", "Approve on your phone"] },
  { id: "chatgpt", name: "ChatGPT", steps: ["Plugins → + → Add custom MCP server", "Paste the link, choose OAuth", "Approve on your phone"], note: "Some plans need Developer mode." },
  { id: "gemini", name: "Gemini", steps: ["Gemini web app → add a custom MCP server", "Paste the link", "Approve on your phone"], note: "Support is limited, so some answers show as text." },
  { id: "grok", name: "Grok", steps: ["grok.com/connectors", "Add a custom connector, paste the link", "Approve on your phone"], note: "Needs a paid Grok plan." },
  { id: "perplexity", name: "Perplexity", steps: ["Connectors → add a custom remote connector", "Paste the link", "Approve on your phone"], note: "Needs Perplexity Pro or Max." },
  { id: "hermes", name: "Hermes", steps: ["Add the link as a remote MCP server", "Sign in when it opens TripCache", "Approve on your phone"], note: "Self-hosted agent." },
  { id: "openclaw", name: "OpenClaw", steps: ["Add the link as a remote MCP server", "Sign in when it opens TripCache", "Approve on your phone"], note: "Self-hosted agent." },
  { id: "muse", name: "Muse", steps: [], note: "No third-party connectors yet. Coming as soon as Meta adds them.", soon: true },
]
const agentName = (id: AgentId) => AGENTS.find((agent) => agent.id === id)?.name ?? ""

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
          {agentName(exchange.agent)} connected to TripCache. Asked “{exchange.prompt}”, it answers “{exchange.reply}” and shows a TripCache card.
        </figcaption>

        <div className="flex items-center justify-between border-b border-tc-line px-5 py-3.5" aria-hidden="true">
          <p key={exchange.agent} className="tc-chat-in flex items-center gap-2.5 text-[14px] font-semibold text-tc-ink">
            <AgentLogo id={exchange.agent} size={26} />
            {agentName(exchange.agent)}
          </p>
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

/* Tile centres on a ring around TripCache (share of the square stage), clockwise from the top. */
const RING = AGENTS.map((_, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / AGENTS.length
  return { x: 50 + 36 * Math.cos(angle), y: 50 + 36 * Math.sin(angle) }
})
const READY = AGENTS.filter((agent) => !agent.soon)
const CYCLE_MS = 3200

/**
 * The app's AI agents orbit (Profile → AI agents): every agent circles TripCache in a dark aurora panel. While it's on
 * screen it steps through the agents that connect today; the selected one lights up, a beam links it to the centre and
 * its own steps show below. Picking one stops the tour.
 */
function AgentOrbit() {
  const reduce = useReducedMotion()
  const { ref, playing } = useInViewPlaying<HTMLDivElement>()
  const [selected, setSelected] = useState<AgentId>("claude")
  const [touring, setTouring] = useState(true)
  const index = AGENTS.findIndex((agent) => agent.id === selected)

  useEffect(() => {
    if (reduce || !playing || !touring) return
    const id = window.setTimeout(() => {
      const next = READY[(READY.findIndex((item) => item.id === selected) + 1) % READY.length]
      setSelected(next.id)
    }, CYCLE_MS)
    return () => window.clearTimeout(id)
  }, [playing, reduce, selected, touring])

  const beam = { x: 50 + (RING[index].x - 50) * 0.78, y: 50 + (RING[index].y - 50) * 0.78 }
  const core = { x: 50 + (RING[index].x - 50) * 0.36, y: 50 + (RING[index].y - 50) * 0.36 }

  return (
    <div ref={ref} data-paused={!playing || undefined} className="tc-hub">
      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#1D1240_0%,#0F0A24_55%,#07060F_100%)] shadow-[0_30px_60px_-36px_rgba(45,27,87,0.7)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_12%_0%,rgba(124,77,255,0.45),transparent_70%),radial-gradient(60%_60%_at_95%_100%,rgba(224,70,155,0.28),transparent_70%)]" />
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <radialGradient id="tc-orbit-core">
                <stop offset="0" stopColor="#8B5CFF" stopOpacity="0.55" />
                <stop offset="1" stopColor="#8B5CFF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="26" fill="url(#tc-orbit-core)" />
            <g className="tc-orbit-spin">
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.3" strokeDasharray="0.9 2.1" />
            </g>
            <circle cx="50" cy="50" r="23.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
            {AGENTS[index].soon ? null : (
              <line
                key={selected}
                x1={beam.x}
                y1={beam.y}
                x2={core.x}
                y2={core.y}
                pathLength={1}
                strokeLinecap="round"
                className="tc-orbit-beam"
              />
            )}
          </svg>

          {/* The centre: the selected agent's tile on TripCache's violet disc. */}
          <div className="absolute left-1/2 top-1/2 grid size-[27%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#5B35D2] shadow-[0_0_60px_-6px_rgba(139,92,255,0.8)]">
            <span className="tc-hub-ring absolute inset-0 rounded-full bg-[#8B5CFF]/30" aria-hidden="true" />
            <span key={selected} className="tc-orbit-pop relative">
              <AgentLogo id={selected} size={64} className="scale-[0.8] sm:scale-100" />
            </span>
          </div>

          <ul className="absolute inset-0" aria-label="AI assistants">
            {AGENTS.map((item, i) => {
              const on = item.id === selected
              return (
                <li key={item.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${RING[i].x}%`, top: `${RING[i].y}%` }}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setSelected(item.id)
                      setTouring(false)
                    }}
                    className="tc-press group flex flex-col items-center gap-1.5 rounded-[16px] p-1 outline-offset-2"
                  >
                    <span
                      className={`relative rounded-[14px] transition-[opacity,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on ? "scale-110 opacity-100 shadow-[0_0_26px_2px_rgba(183,155,255,0.55)]" : "opacity-55 group-hover:opacity-90"
                      }`}
                    >
                      <AgentLogo id={item.id} size={48} className="scale-[0.82] sm:scale-100" />
                    </span>
                    <span className={`whitespace-nowrap text-[11.5px] sm:text-[12.5px] ${on ? "font-semibold text-white" : "font-medium text-white/55"}`}>
                      {item.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* That agent's steps, as in the app's "Connect Claude" card. Every agent's card sits in the same grid cell, so the
          card is always as tall as the longest one and switching never moves the page. */}
      <div className="relative mt-3 grid overflow-hidden rounded-[22px] border border-[rgba(183,155,255,0.22)] bg-[linear-gradient(180deg,#17112E,#0C0A18)] px-5 py-4">
        {AGENTS.map((item) => {
          const on = item.id === selected
          return (
            <div
              key={item.id}
              aria-hidden={!on}
              className={`[grid-area:1/1] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1.5 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <AgentLogo id={item.id} size={30} />
                <p className="flex-1 text-[16px] font-bold text-white">{item.soon ? `${item.name} is coming` : `Connect ${item.name}`}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-2.5 py-1 text-[11.5px] font-semibold text-white/75">
                  <span className={`size-1.5 rounded-full ${item.soon ? "bg-white/40" : "bg-[#12b76a]"}`} />
                  {item.soon ? "Soon" : `${item.steps.length} steps`}
                </span>
              </div>
              {item.steps.length ? (
                <ol className="mt-3">
                  {item.steps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex flex-col items-center">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-[rgba(183,155,255,0.5)] bg-[#5B35D2] text-[12px] font-bold text-white">
                          {i + 1}
                        </span>
                        {i < item.steps.length - 1 ? <span className="my-[3px] w-0.5 flex-1 rounded-full bg-[rgba(183,155,255,0.35)]" /> : null}
                      </span>
                      <span className="pb-3 pt-0.5 text-[14.5px] font-medium leading-5 text-white">{step}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              {item.note ? <p className={`text-[13px] leading-5 text-white/55 ${item.steps.length ? "mt-1" : "mt-3"}`}>{item.note}</p> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** "Watch how to connect": one walkthrough per assistant, loaded only when someone presses play. */
function Walkthrough({ videos }: { videos: { key: AgentId; label: string; video: AgentVideo }[] }) {
  const [active, setActive] = useState(videos[0].key)
  const current = videos.find((item) => item.key === active) ?? videos[0]

  return (
    <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
      <div className="lg:col-span-5">
        <h3 className="font-tc-display text-[25px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[28px]">
          Watch how to connect
        </h3>
        <p className="mt-3 max-w-[42ch] text-[15.5px] leading-7 text-tc-mute">
          Every step in {current.label}, from copying the link to approving on your phone.
        </p>
        {videos.length > 1 ? (
          <div className="mt-5 inline-flex gap-1 rounded-[14px] border border-tc-line bg-white p-1" role="group" aria-label="Walkthrough for">
            {videos.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={item.key === current.key}
                onClick={() => setActive(item.key)}
                className={`tc-press inline-flex min-h-10 items-center gap-2 rounded-[10px] pl-2 pr-3.5 text-[14px] font-medium transition-colors duration-200 ${
                  item.key === current.key ? "bg-tc-violet text-white" : "text-tc-ink-2 hover:bg-tc-mist"
                }`}
              >
                <AgentLogo id={item.key} size={24} />
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
        className="aspect-video w-full rounded-[22px] border border-tc-line bg-tc-mist object-cover lg:col-span-7"
      >
        {current.video.webm ? <source src={current.video.webm} type="video/webm" /> : null}
        {current.video.mp4 ? <source src={current.video.mp4} type="video/mp4" /> : null}
        {current.video.captions ? <track kind="captions" src={current.video.captions} srcLang="en" label="English" default /> : null}
      </video>
    </div>
  )
}

export function Assistants({ videos = {} }: { videos?: AgentVideos }) {
  const all: { key: AgentId; label: string; video?: AgentVideo }[] = [
    { key: "claude", label: "Claude", video: videos.claude },
    { key: "chatgpt", label: "ChatGPT", video: videos.chatgpt },
  ]
  const walkthroughs = all.filter((item): item is { key: AgentId; label: string; video: AgentVideo } => Boolean(item.video))
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
            Connect TripCache to the assistants you already use. They can answer from your trips, flights and spending, and add
            a booking when you ask. In Claude and ChatGPT, answers come back as TripCache cards.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ChatDemo />
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <h3 className="font-tc-display text-[25px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[28px]">
                Connect in a minute
              </h3>
              <span className="rounded-full bg-[#fff5d6] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#b54708]">Pro</span>
            </div>
            <p className="mt-2 text-pretty text-[15.5px] leading-7 text-tc-mute">
              Copy your TripCache link in the app, add it to any of these, then tap the matching number on your phone. Connect
              as many as you like.
            </p>
            <div className="mt-6">
              <AgentOrbit />
            </div>
            <p className="mt-5 max-w-[46ch] text-[14.5px] leading-7 text-tc-mute">
              Connecting an assistant is part of TripCache Pro. You choose whether it can add bookings, and you can disconnect it
              any time in the app.
            </p>
          </div>
        </div>
        {walkthroughs.length ? <Walkthrough videos={walkthroughs} /> : null}
      </div>
    </section>
  )
}
