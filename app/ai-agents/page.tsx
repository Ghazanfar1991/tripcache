import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { AgentGrid, ServerLinkCard } from "@/components/ai-agents/guide-parts"
import { Footer } from "@/components/footer"
import { StoreBadges } from "@/components/home/store-badges"
import { Breadcrumbs, Card, Container, CtaBand, PageHero, Section, SitePage, buttonClass } from "@/components/site/kit"
import { FaqList } from "@/components/site/product-ui"
import { AI_AGENT_GUIDES, EXAMPLE_QUESTIONS, INDEX_FAQS, agentGuidePath } from "@/lib/ai-agents"
import { SITE_URL, createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Travel MCP Server for Claude, ChatGPT & More",
  description:
    "Connect your TripCache trips to Claude, ChatGPT, Gemini, Grok, Perplexity, Hermes or OpenClaw with one MCP link. Approve on your phone. Needs Pro.",
  path: "/ai-agents",
  keywords: ["travel MCP server", "trip MCP server", "travel itinerary MCP", "MCP travel app", "TripCache AI agents", "TripCache MCP"],
})

const HOW = [
  { title: "Copy the link", copy: "Use the TripCache link on this page, or copy it in the app under Profile → AI agents." },
  { title: "Add it to your assistant", copy: "Each assistant calls it something different: a custom connector, an MCP server or a remote connector." },
  { title: "Approve on your phone", copy: "The TripCache sign-in page shows a number. Tap the same number in TripCache on your phone." },
]

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/ai-agents#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "AI agents", item: `${SITE_URL}/ai-agents` },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/ai-agents#agents`,
      name: "AI agents that connect to TripCache",
      itemListElement: AI_AGENT_GUIDES.map((agent, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${agent.name}${agent.soon ? " (coming soon)" : ""}`,
        url: `${SITE_URL}${agentGuidePath(agent.id)}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/ai-agents#faq`,
      mainEntity: INDEX_FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
  ],
}

export default function AiAgentsIndexPage() {
  return (
    <>
      <SitePage>
        <script
          id="ai-agents-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
        <PageHero
          breadcrumb={<Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "AI agents" }]} />}
          title="Connect TripCache to your AI assistant"
          lede={
            <p>
              TripCache&apos;s travel MCP server puts your booked trips in Claude, ChatGPT, Gemini, Grok, Perplexity, Hermes or
              OpenClaw. Add one link, then ask about your next flight, a trip or what you&apos;ve spent. Pick your assistant for
              its own steps.
            </p>
          }
          aside={<ServerLinkCard />}
        >
          <StoreBadges placement="ai_agents_index_hero" />
        </PageHero>

        <Section tone="white">
          <Container>
            <h2 className="font-tc-display text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
              Choose your assistant
            </h2>
            <p className="mt-3 max-w-[60ch] text-[16.5px] leading-7 text-tc-ink-2">
              Seven assistants connect today. Claude and ChatGPT have a walkthrough video and answer with TripCache cards.
            </p>
            <div className="mt-8">
              <AgentGrid agents={AI_AGENT_GUIDES} headingLevel="h3" />
            </div>
          </Container>
        </Section>

        <Section tone="canvas">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
              <div>
                <h2 className="text-balance font-tc-display text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
                  How connecting works
                </h2>
                <p className="mt-4 max-w-[46ch] text-[16.5px] leading-7 text-tc-ink-2">
                  The same three steps in every assistant. Connecting needs TripCache Pro, and you can disconnect any assistant in
                  the app.
                </p>
              </div>
              <Card>
                <ol className="px-6 py-8 sm:px-8">
                  {HOW.map((step, index) => (
                    <li key={step.title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-5 py-4 first:pt-0 last:pb-0">
                      <span className="grid size-11 place-items-center rounded-full bg-tc-violet text-[15px] font-semibold tabular-nums text-white">
                        {index + 1}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="font-tc-display text-[20px] font-semibold leading-snug text-tc-ink sm:text-[22px]">{step.title}</h3>
                        <p className="mt-1.5 text-[15.5px] leading-7 text-tc-mute">{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </Container>
        </Section>

        <Section tone="white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
              <div>
                <h2 className="text-balance font-tc-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-tc-ink">
                  What you can ask
                </h2>
                <ul className="mt-6 grid gap-3">
                  {EXAMPLE_QUESTIONS.map((item) => (
                    <li key={item.prompt} className="rounded-[18px] border border-tc-line bg-white px-5 py-4">
                      <span className="block text-[16px] font-semibold text-tc-ink">“{item.prompt}”</span>
                      <span className="mt-0.5 block text-[14.5px] leading-6 text-tc-mute">{item.answer}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="self-start">
                <h2 className="font-tc-display text-[24px] font-semibold tracking-[-0.015em] text-tc-ink">Guides</h2>
                <ul className="mt-4 border-t border-tc-line">
                  {[
                    { href: "/blog/connect-chatgpt-claude-to-travel-app", label: "Connect ChatGPT or Claude to your trips" },
                    { href: "/blog/ai-travel-assistant-for-your-bookings", label: "Which AI assistants can read your bookings" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-4 border-b border-tc-line py-5 font-tc-display text-[18px] font-semibold text-tc-ink transition-colors hover:text-tc-violet sm:text-[20px]"
                      >
                        {link.label}
                        <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/#ai-assistants" className={`${buttonClass("secondary", "lg")} mt-8`}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  See it on the home page
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="canvas" aria-labelledby="ai-agents-faq-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <h2
                id="ai-agents-faq-heading"
                className="text-balance font-tc-display text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink"
              >
                Questions about connecting AI assistants
              </h2>
              <FaqList faqs={INDEX_FAQS} />
            </div>
          </Container>
        </Section>

        <CtaBand
          placement="ai_agents_index_cta_band"
          title="Ask your AI assistant about your trip."
          text="Free on iPhone and Android. Add Pro to connect AI assistants, import booking emails and get live flight alerts."
        />
      </SitePage>
      <Footer />
    </>
  )
}
