import type { AgentId } from "@/components/home/agent-logos"

/*
 * The AI agent guides at /ai-agents/<id>. Profile → AI agents in the app opens these pages ("Full guide",
 * agentGuideUrl in trip-cache-app lib/connectedApps.ts), so the ids, names, makers, steps and notes are copied
 * word for word from that catalog (checked 2026-11-02). Change them there first, then here.
 */

/** On our own domain: the Cloudflare Worker trip-cache-mcp-proxy (trip-cache-app cloudflare/mcp-proxy) forwards it to the
 * Supabase function. The old https://jvwnjqiypayicqfgvdyo.supabase.co/functions/v1/mcp link keeps working for existing connections. */
export const MCP_SERVER_URL = "https://trip-cache.com/mcp"

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
  /** H1, when it should differ from "Connect TripCache to <name>". */
  h1?: string
  description: string
  intro: string
  /** One line of help under each catalog step, in the same order. */
  stepHelp: string[]
  /** Search terms this page owns (seo/keywords.csv, research 2026-11-02 in seo/research/). */
  keywords: string[]
  faqs: { question: string; answer: string }[]
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
    metaTitle: "Claude Travel Connector: Add TripCache",
    description:
      "Add TripCache to Claude as a custom connector in 3 steps, then ask Claude about your flights, hotels and trip spending. Approve on your phone.",
    intro:
      "Add TripCache to Claude as a custom connector, then ask about your next flight, a trip or what you've spent. Claude answers with TripCache cards.",
    stepHelp: [
      "In Claude, open Customize, go to Connectors and choose Add.",
      "Pick Add custom connector and paste the TripCache link below. Claude then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
    keywords: ["claude travel connector", "claude mcp flights", "claude custom connector", "tripcache claude"],
    faqs: [
      { question: "Can I add a custom connector on Claude's free plan?", answer: "Yes. Anthropic allows one custom connector on Claude Free, and more on Pro, Max, Team and Enterprise. On Team and Enterprise, an owner adds it for the organization first. Connecting TripCache itself needs TripCache Pro." },
      { question: "How does Claude sign in to TripCache?", answer: "When you add the connector, Claude opens a TripCache sign-in page. It shows a number; tap the same number in the TripCache app on your phone, or sign in with your password or an email code. You also choose whether Claude may add bookings." },
      { question: "What can Claude see in TripCache?", answer: "Your trips, flights, bookings, expenses and the names of your documents. Booking notes, confirmation numbers and booking prices aren't shared, and documents themselves aren't opened." },
      { question: "How do I disconnect Claude?", answer: "In TripCache, open Profile → AI agents and tap Revoke next to Claude. Its next request is refused. You can also remove the connector in Claude." },
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
    metaTitle: "ChatGPT Travel App: Connect TripCache via MCP",
    description:
      "Connect TripCache to ChatGPT as a custom MCP server, then ask about your flights, gates and trip spending. 3 steps and a 39-second video.",
    intro:
      "Add TripCache to ChatGPT as a custom MCP server, then ask about your next flight, a trip or what you've spent. ChatGPT answers with TripCache cards.",
    stepHelp: [
      "In ChatGPT, open Plugins, press + and choose Add custom MCP server.",
      "Paste the TripCache link below and choose OAuth as the sign-in method. ChatGPT then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
    keywords: ["chatgpt travel app", "chatgpt mcp server setup", "chatgpt developer mode mcp", "tripcache chatgpt"],
    faqs: [
      { question: "Which ChatGPT plans can add a custom MCP server?", answer: "OpenAI lists custom MCP servers for Business and Enterprise, and some plans first need Developer mode under Settings → Apps → Advanced settings. In a Business or Enterprise workspace, an admin may need to allow custom connectors." },
      { question: "Is it called Plugins, Apps or Connectors?", answer: "OpenAI has used all three names for this area. Look for the option to add a custom MCP server, paste the TripCache link and choose OAuth." },
      { question: "How is TripCache different from travel apps that book trips in ChatGPT?", answer: "Booking apps help you search and buy. TripCache reads the trips you've already booked: your next flight, your hotel and car times, and what you've spent. It never books or pays for anything." },
      { question: "Do Dots work with TripCache?", answer: "Yes. Dots, ChatGPT's always-on agents, use the same connectors, so they can use TripCache once it's added." },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    maker: "Google",
    steps: ["Gemini web app → add a custom MCP server", "Paste the link", "Approve on your phone"],
    note: "Support is limited, so some answers show as text.",
    answers: "mostly-text",
    metaTitle: "Gemini Custom MCP: Connect TripCache",
    description:
      "Add TripCache to the Gemini web app as a custom MCP server, then ask Gemini about your flights and trips. Some answers show as text.",
    intro:
      "Add TripCache to the Gemini web app as a custom MCP server, then ask Gemini about your next flight, a trip or what you've spent.",
    stepHelp: [
      "Open the Gemini web app in a browser and add a custom MCP server.",
      "Paste the TripCache link below. Gemini then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
    keywords: ["gemini custom mcp connector", "gemini add custom mcp", "gemini connectors", "tripcache gemini"],
    faqs: [
      { question: "Can the Gemini app connect to a custom MCP server?", answer: "Google has started offering custom MCP connections in the Gemini web app, but not every account has the option yet. If yours does, the TripCache link works the same way it does in Claude or ChatGPT." },
      { question: "Why do some Gemini answers come back as text?", answer: "Gemini's support for connectors is still limited, so it doesn't show TripCache cards the way Claude and ChatGPT do. The facts are the same; they're written out as text." },
      { question: "Does this work with Gemini on Android?", answer: "This guide covers the Gemini web app. TripCache doesn't connect to Gemini on Android phones yet." },
    ],
  },
  {
    id: "grok",
    name: "Grok",
    maker: "xAI",
    steps: ["grok.com/connectors", "Add a custom connector, paste the link", "Approve on your phone"],
    note: "Needs a paid Grok plan.",
    answers: "text",
    metaTitle: "Grok Custom Connector for Your Trips",
    description:
      "Add TripCache at grok.com/connectors as a custom connector, then ask Grok about your flights, hotels and spending. Needs a paid Grok plan.",
    intro:
      "Add TripCache to Grok as a custom connector, then ask Grok about your next flight, a trip or what you've spent.",
    stepHelp: [
      "Sign in to Grok on the web and open grok.com/connectors.",
      "Add a custom connector and paste the TripCache link below. Grok then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
    keywords: ["grok custom connector", "grok add custom connector", "grok mcp connector", "tripcache grok"],
    faqs: [
      { question: "Which Grok plans support custom connectors?", answer: "Custom connectors need a paid Grok plan. xAI's connector docs cover the current plans." },
      { question: "Where do I add a custom connector in Grok?", answer: "Sign in at grok.com, open grok.com/connectors, choose New Connector, then Custom, and paste the TripCache link." },
      { question: "Does Grok show TripCache cards?", answer: "No. Grok answers in text, written from your TripCache trips. Cards show in Claude and ChatGPT." },
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    maker: "Perplexity",
    steps: ["Connectors → add a custom remote connector", "Paste the link", "Approve on your phone"],
    note: "Needs Perplexity Pro or Max.",
    answers: "text",
    metaTitle: "Perplexity Custom Connector for Your Trips",
    description:
      "Add TripCache to Perplexity as a custom remote connector (Pro or Max), then ask about your own flights, trips and spending. 3 steps.",
    intro:
      "Add TripCache to Perplexity as a custom remote connector, then ask Perplexity about your next flight, a trip or what you've spent.",
    stepHelp: [
      "In Perplexity, open Connectors and add a custom remote connector.",
      "Paste the TripCache link below. Perplexity then opens TripCache to sign in.",
      APPROVE_HELP,
    ],
    keywords: ["perplexity custom connector", "perplexity add custom connector", "perplexity custom mcp connector", "tripcache perplexity"],
    faqs: [
      { question: "Which Perplexity plans can add custom connectors?", answer: "Perplexity Pro or Max. Add it from Settings → Connectors." },
      { question: "Remote or local connector: which do I pick?", answer: "Remote. TripCache runs online, so you add its link as a custom remote connector and choose OAuth sign-in. Nothing needs to run on your computer." },
      { question: "Can't Perplexity already look up a flight?", answer: "Perplexity can look up public flight information. TripCache adds what only you have: which flights are yours, your hotel and car times, your plans and what you've spent." },
      { question: "The sign-in didn't finish. What now?", answer: "Sign-in requests expire after a few minutes. Remove the connector, add it again and approve on your phone straight away." },
    ],
  },
  {
    id: "hermes",
    name: "Hermes",
    maker: "Nous Research",
    steps: ["Add the link as a remote MCP server", "Sign in when it opens TripCache", "Approve on your phone"],
    note: "Self-hosted agent.",
    answers: "text",
    metaTitle: "Hermes Agent MCP Setup for Your Trips",
    description:
      "Add TripCache to your self-hosted Hermes agent as a remote MCP server with OAuth, then ask it about your flights, trips and spending.",
    intro:
      "Hermes from Nous Research runs on your own machine. Add TripCache to it as a remote MCP server, then ask about your next flight, a trip or what you've spent.",
    stepHelp: [
      "In your Hermes setup, add the TripCache link below as a remote MCP server.",
      "When Hermes opens the TripCache sign-in page in your browser, sign in with your TripCache account.",
      APPROVE_HELP,
    ],
    keywords: ["hermes agent mcp setup", "hermes agent mcp oauth", "hermes agent remote mcp", "hermes agent travel planner", "tripcache hermes agent"],
    faqs: [
      { question: "Does Hermes support remote MCP servers with OAuth?", answer: "Yes. When you add TripCache, Hermes shows the authorization link; it doesn't open the browser by itself. Open the link, sign in to TripCache and approve on your phone. Nous Research's MCP docs have the exact setup." },
      { question: "What if Hermes runs on a server without a browser?", answer: "Open the authorization link on another device. Over SSH, Hermes tells you how to reach its callback or paste the redirected URL back." },
      { question: "Can Hermes plan my trips with TripCache?", answer: "It works with trips you've already booked: it can answer about your flights, stays and spending, and add a booking or expense if you allow it. It doesn't search for or book travel." },
    ],
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    maker: "Open source",
    steps: ["Add the link as a remote MCP server", "Sign in when it opens TripCache", "Approve on your phone"],
    note: "Self-hosted agent.",
    answers: "text",
    metaTitle: "OpenClaw Travel Assistant: TripCache MCP",
    h1: "Make OpenClaw your travel assistant",
    description:
      "Make OpenClaw your travel assistant: add TripCache as a remote MCP server with OAuth, then ask about your flights, trips and spending.",
    intro:
      "OpenClaw is an open-source agent you run yourself. Add TripCache to it as a remote MCP server, then ask about your next flight, a trip or what you've spent.",
    stepHelp: [
      "In your OpenClaw setup, add the TripCache link below as a remote MCP server.",
      "When OpenClaw opens the TripCache sign-in page in your browser, sign in with your TripCache account.",
      APPROVE_HELP,
    ],
    keywords: ["openclaw travel assistant", "openclaw travel", "openclaw flight tracker", "openclaw remote mcp server", "tripcache openclaw"],
    faqs: [
      { question: "Can OpenClaw keep track of my flights and trips?", answer: "Yes, once TripCache is connected. OpenClaw can answer from your saved flights, stays, plans and expenses, and add a booking or expense if you allow it. It doesn't book or pay for travel." },
      { question: "Is TripCache an OpenClaw skill or an MCP server?", answer: "An MCP server. You add the TripCache link as a remote MCP server, and OpenClaw signs in with OAuth. OpenClaw's MCP docs cover the setup." },
      { question: "What if OpenClaw runs on a server without a browser?", answer: "Open the TripCache sign-in link on another device, sign in and approve on your phone." },
    ],
  },
  {
    id: "muse",
    name: "Muse",
    maker: "Meta",
    steps: [],
    // The app still says "No third-party connectors yet. Coming as soon as Meta adds them." Meta's help centre
    // ("How Muse works with Connectors", checked 2026-11-02) shows Muse has connectors, so the site says what's true.
    note: "Has connectors, but no way to add TripCache's link yet.",
    soon: true,
    answers: "text",
    metaTitle: "Meta Muse Connectors: TripCache Coming Soon",
    description:
      "Meta's Muse has connectors, but TripCache can't connect to it yet. Connect Claude, ChatGPT, Gemini, Grok or Perplexity to your trips today.",
    intro:
      "Muse has connectors, but Meta doesn't describe a way to add a remote MCP server link like TripCache's, the way Claude and ChatGPT do. So there's no way to connect it today. It's listed in the app so it can light up as soon as there is.",
    stepHelp: [],
    keywords: ["meta muse connectors", "muse ai connectors", "tripcache meta ai", "tripcache muse"],
    faqs: [
      { question: "Does Meta's Muse have connectors?", answer: "Yes. Muse connects to services from Meta's list, such as email and calendars, and it can create a custom connector from a service's API details. Meta doesn't review custom connectors." },
      { question: "Can I connect TripCache to Muse?", answer: "Not yet. TripCache connects through a remote MCP server link with sign-in and approval on your phone, the way Claude and ChatGPT add it. Meta's help pages don't describe adding a link like that to Muse, so TripCache stays listed as coming soon in the app." },
      { question: "What can I use instead today?", answer: "Claude and ChatGPT connect and show TripCache cards. Gemini, Grok, Perplexity, Hermes and OpenClaw connect too and answer in text." },
    ],
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

/* The index page's questions (research 2026-11-02: "travel mcp server" and its long tail). */
export const INDEX_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is a travel MCP server?",
    answer:
      "MCP (Model Context Protocol) is the open standard AI assistants use to connect to other apps. TripCache's MCP server lets an assistant read the trips you've saved in TripCache, so it can answer from your real flights, stays and spending instead of guessing.",
  },
  {
    question: "Which AI assistants can connect to TripCache?",
    answer:
      "Claude, ChatGPT, Gemini (web app, limited), Grok, Perplexity, and the self-hosted Hermes and OpenClaw agents. Claude and ChatGPT show answers as TripCache cards. Meta's Muse isn't supported yet.",
  },
  {
    question: "Is it for my own bookings or for searching flights?",
    answer:
      "Your own bookings. The assistant sees trips you've already saved in TripCache, so it can tell you when your next flight leaves or what you've spent. It doesn't search for, book or pay for travel.",
  },
  {
    question: "Is it safe to connect an assistant to my trips?",
    answer:
      "You approve each connection on your phone and choose whether the assistant can add bookings. Confirmation numbers, booking prices and notes aren't shared, and you can disconnect any assistant in Profile → AI agents.",
  },
  {
    question: "Do I need a paid plan?",
    answer:
      "Connecting an assistant needs TripCache Pro. Some assistants also need one of their own paid plans; each guide lists what it needs.",
  },
]
