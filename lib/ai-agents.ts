import type { AgentId } from "@/components/home/agent-logos"

/*
 * The AI agent guides at /ai-agents/<id>. Profile → AI agents in the app opens these pages ("Full guide",
 * agentGuideUrl in trip-cache-app lib/connectedApps.ts), so the ids, names, makers, steps and notes are copied
 * word for word from that catalog (checked 2026-11-02). Change them there first, then here.
 */

export const MCP_SERVER_URL = "https://jvwnjqiypayicqfgvdyo.supabase.co/functions/v1/mcp"

export type AiAgentGuide = {
  id: AgentId
  name: string
  /** The app's maker line, without its "· Coming soon" suffix. */
  maker: string
  steps: string[]
  note?: string
  soon?: boolean
  /** Has a walkthrough in public/videos/agent-connect/ (see components/home/agent-videos.ts). */
  video?: { seconds: number; uploadDate: string }
  /** Where answers come back: as TripCache cards (checked in Claude and ChatGPT) or as text. */
  answers: "cards" | "text" | "mostly-text"
  metaTitle: string
  description: string
  intro: string
  /** One line of help under each catalog step, in the same order. */
  stepHelp: string[]
}

const APPROVE_HELP =
  "The TripCache sign-in page shows a number. Open the TripCache notification, or the app, on your phone and tap the same number. A password or email code works too."

export const AI_AGENT_GUIDES: AiAgentGuide[] = [
  {
    id: "claude",
    name: "Claude",
    maker: "Anthropic",
    steps: ["Customize → Connectors → Add", "Add custom connector, paste the link", "Approve on your phone"],
    video: { seconds: 39, uploadDate: "2026-10-30" },
    answers: "cards",
    metaTitle: "Connect Claude to TripCache: Setup Guide",
    description:
      "Add TripCache to Claude as a custom connector in three steps, with a 39-second walkthrough. Ask Claude about your flights, trips and spending.",
    intro:
      "Add TripCache to Claude as a custom connector, then ask about your next flight, a trip or what you've spent. Claude answers with TripCache cards.",
    stepHelp: [
      "In Claude, open Customize, go to Connectors and choose Add.",
      "Pick Add custom connector and paste the TripCache link below. Claude then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    maker: "OpenAI · and Dots",
    steps: ["Plugins → + → Add custom MCP server", "Paste the link, choose OAuth", "Approve on your phone"],
    note: "Listed for Business and Enterprise; some plans need Developer mode. Dots use the same connectors.",
    video: { seconds: 39, uploadDate: "2026-10-30" },
    answers: "cards",
    metaTitle: "Connect ChatGPT to TripCache: Setup Guide",
    description:
      "Add TripCache to ChatGPT as a custom MCP server in three steps, with a 39-second walkthrough. Ask ChatGPT about your flights, trips and spending.",
    intro:
      "Add TripCache to ChatGPT as a custom MCP server, then ask about your next flight, a trip or what you've spent. ChatGPT answers with TripCache cards.",
    stepHelp: [
      "In ChatGPT, open Plugins, press + and choose Add custom MCP server.",
      "Paste the TripCache link below and choose OAuth as the sign-in method. ChatGPT then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    maker: "Google",
    steps: ["Gemini web app → add a custom MCP server", "Paste the link", "Approve on your phone"],
    note: "Support is limited, so some answers show as text.",
    answers: "mostly-text",
    metaTitle: "Connect Gemini to TripCache: Setup Guide",
    description:
      "Add TripCache to the Gemini web app as a custom MCP server in three steps, then ask Gemini about your flights, trips and spending.",
    intro:
      "Add TripCache to the Gemini web app as a custom MCP server, then ask Gemini about your next flight, a trip or what you've spent.",
    stepHelp: [
      "Open the Gemini web app in a browser and add a custom MCP server.",
      "Paste the TripCache link below. Gemini then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
  },
  {
    id: "grok",
    name: "Grok",
    maker: "xAI",
    steps: ["grok.com/connectors", "Add a custom connector, paste the link", "Approve on your phone"],
    note: "Needs a paid Grok plan.",
    answers: "text",
    metaTitle: "Connect Grok to TripCache: Setup Guide",
    description:
      "Add TripCache to Grok as a custom connector at grok.com/connectors in three steps, then ask Grok about your flights, trips and spending.",
    intro:
      "Add TripCache to Grok as a custom connector, then ask Grok about your next flight, a trip or what you've spent.",
    stepHelp: [
      "Sign in to Grok on the web and open grok.com/connectors.",
      "Add a custom connector and paste the TripCache link below. Grok then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    maker: "Perplexity",
    steps: ["Connectors → add a custom remote connector", "Paste the link", "Approve on your phone"],
    note: "Needs Perplexity Pro or Max.",
    answers: "text",
    metaTitle: "Connect Perplexity to TripCache: Setup Guide",
    description:
      "Add TripCache to Perplexity as a custom remote connector in three steps, then ask Perplexity about your flights, trips and spending.",
    intro:
      "Add TripCache to Perplexity as a custom remote connector, then ask Perplexity about your next flight, a trip or what you've spent.",
    stepHelp: [
      "In Perplexity, open Connectors and add a custom remote connector.",
      "Paste the TripCache link below. Perplexity then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
  },
  {
    id: "hermes",
    name: "Hermes",
    maker: "Nous Research",
    steps: ["Add the link as a remote MCP server", "Sign in when it opens TripCache", "Approve on your phone"],
    note: "Self-hosted agent.",
    answers: "text",
    metaTitle: "Connect Hermes Agent to TripCache: Setup Guide",
    description:
      "Add TripCache to your self-hosted Hermes agent from Nous Research as a remote MCP server, then ask it about your flights, trips and spending.",
    intro:
      "Hermes from Nous Research runs on your own machine. Add TripCache to it as a remote MCP server, then ask about your next flight, a trip or what you've spent.",
    stepHelp: [
      "In your Hermes setup, add the TripCache link below as a remote MCP server.",
      "When Hermes opens the TripCache sign-in page in your browser, sign in with your TripCache account.",
      APPROVE_HELP,
    ],
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    maker: "Open source",
    steps: ["Add the link as a remote MCP server", "Sign in when it opens TripCache", "Approve on your phone"],
    note: "Self-hosted agent.",
    answers: "text",
    metaTitle: "Connect OpenClaw to TripCache: Setup Guide",
    description:
      "Add TripCache to your self-hosted OpenClaw agent as a remote MCP server, then ask it about your flights, trips and spending.",
    intro:
      "OpenClaw is an open-source agent you run yourself. Add TripCache to it as a remote MCP server, then ask about your next flight, a trip or what you've spent.",
    stepHelp: [
      "In your OpenClaw setup, add the TripCache link below as a remote MCP server.",
      "When OpenClaw opens the TripCache sign-in page in your browser, sign in with your TripCache account.",
      APPROVE_HELP,
    ],
  },
  {
    id: "muse",
    name: "Muse",
    maker: "Meta",
    steps: [],
    note: "No third-party connectors yet. Coming as soon as Meta adds them.",
    soon: true,
    answers: "text",
    metaTitle: "Meta's Muse and TripCache: Coming Soon",
    description:
      "Meta's Muse doesn't support third-party connectors yet, so TripCache can't connect to it. Claude, ChatGPT, Gemini, Grok and Perplexity work today.",
    intro:
      "Meta's Muse doesn't let you add third-party connectors yet, so there's no way to connect TripCache to it today. It's listed in the app so it can light up as soon as Meta adds them.",
    stepHelp: [],
  },
]

export const READY_AGENT_GUIDES = AI_AGENT_GUIDES.filter((agent) => !agent.soon)

export function getAiAgentGuide(id: string) {
  return AI_AGENT_GUIDES.find((agent) => agent.id === id)
}

export const agentGuidePath = (id: AgentId) => `/ai-agents/${id}`

/* What the TripCache tools answer (supabase/functions/mcp in trip-cache-app). Adding needs the optional bookings scope. */
export const EXAMPLE_QUESTIONS: { prompt: string; answer: string }[] = [
  { prompt: "When's my next flight?", answer: "The flight, its times and its current status." },
  { prompt: "Show my Melbourne trip", answer: "The trip's flights, stays and plans, in order." },
  { prompt: "How much have I spent in Melbourne?", answer: "Spending so far against your budget, by category." },
  { prompt: "Which documents do I have for this trip?", answer: "The names of the files saved to the trip, not their contents." },
  { prompt: "Add a Hertz car to my Melbourne trip", answer: "A new booking on the trip, if you allowed adding bookings when you connected." },
]
