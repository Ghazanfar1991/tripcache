import "../../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, MessageSquareText } from "lucide-react"

import { AgentGrid, ServerLinkCard, StepList } from "@/components/ai-agents/guide-parts"
import { Footer } from "@/components/footer"
import { AgentLogo } from "@/components/home/agent-logos"
import { getAgentVideos } from "@/components/home/agent-videos"
import { StoreBadges } from "@/components/home/store-badges"
import { Breadcrumbs, Card, Container, CtaBand, PageHero, Pill, Section, SitePage, buttonClass } from "@/components/site/kit"
import { FaqList } from "@/components/site/product-ui"
import { AI_AGENT_GUIDES, EXAMPLE_QUESTIONS, READY_AGENT_GUIDES, getAiAgentGuide, type AiAgentGuide } from "@/lib/ai-agents"
import { SITE_URL, createPageMetadata } from "@/lib/seo-metadata"

export function generateStaticParams() {
  return AI_AGENT_GUIDES.map((agent) => ({ id: agent.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const agent = getAiAgentGuide(id)
  if (!agent) return { title: "AI Agent Not Found" }
  return createPageMetadata({
    title: agent.metaTitle,
    description: agent.description,
    keywords: [...agent.keywords, "TripCache AI agents"],
    path: `/ai-agents/${agent.id}`,
  })
}

const ANSWERS: Record<AiAgentGuide["answers"], string> = {
  cards: "Answers come back as TripCache cards: the flight, the trip or the spending, laid out as they are in the app.",
  "mostly-text": "Answers come back as text. Gemini's connector support is limited, so some answers show as text only.",
  text: "Answers come back as text, written from your TripCache trips.",
}

function schemaFor(agent: AiAgentGuide, video?: { poster?: string; mp4?: string; webm?: string }) {
  const url = `${SITE_URL}/ai-agents/${agent.id}`
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "AI agents", item: `${SITE_URL}/ai-agents` },
        { "@type": "ListItem", position: 3, name: agent.name, item: url },
      ],
    },
  ]
  if (!agent.soon) {
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: `Connect TripCache to ${agent.name}`,
      description: agent.description,
      supply: [{ "@type": "HowToSupply", name: "TripCache Pro" }],
      step: agent.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step,
        text: agent.stepHelp[index] ?? step,
      })),
    })
  }
  if (agent.video && video) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${url}#video`,
      name: `How to connect TripCache to ${agent.name}`,
      description: `Every step in ${agent.name}, from copying the TripCache link to approving on your phone.`,
      uploadDate: agent.video.uploadDate,
      duration: `PT${agent.video.seconds}S`,
      thumbnailUrl: video.poster ? `${SITE_URL}${video.poster}` : undefined,
      contentUrl: `${SITE_URL}${video.mp4 ?? video.webm}`,
      embedUrl: url,
    })
  }
  graph.push({
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: agent.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  })
  return { "@context": "https://schema.org", "@graph": graph }
}

export default async function AiAgentGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const agent = getAiAgentGuide(id)
  if (!agent) notFound()

  const videos = getAgentVideos()
  const video = agent.id === "claude" || agent.id === "chatgpt" ? videos[agent.id] : undefined
  const others = READY_AGENT_GUIDES.filter((item) => item.id !== agent.id)

  return (
    <>
      <SitePage>
        <script
          id={`ai-agent-${agent.id}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(agent, video)).replace(/</g, "\\u003c") }}
        />
        <PageHero
          breadcrumb={<Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "AI agents", href: "/ai-agents" }, { name: agent.name }]} />}
          title={agent.h1 ?? (agent.soon ? `${agent.name} is coming to TripCache` : `Connect TripCache to ${agent.name}`)}
          lede={
            <>
              <p className="mb-6 flex items-center gap-3 text-[15px] font-medium text-tc-ink-2">
                <AgentLogo id={agent.id} size={44} />
                <span>
                  <span className="block font-semibold text-tc-ink">{agent.name}</span>
                  <span className="block text-[13.5px] text-tc-mute">by {agent.maker}</span>
                </span>
              </p>
              <p>{agent.intro}</p>
              <span className="mt-6 flex flex-wrap gap-2">
                {agent.soon ? <Pill tone="neutral">Coming soon</Pill> : <Pill tone="pro">Needs TripCache Pro</Pill>}
                {agent.note && !agent.soon ? <Pill tone="amber">{agent.note}</Pill> : null}
              </span>
            </>
          }
          aside={agent.soon ? undefined : <ServerLinkCard />}
        >
          <StoreBadges placement={`ai_agent_${agent.id}_hero`} />
        </PageHero>

        {agent.soon ? (
          <Section tone="white">
            <Container>
              <Card className="max-w-[760px]">
                <div className="p-6 sm:p-10">
                  <h2 className="font-tc-display text-[26px] font-semibold leading-snug tracking-[-0.015em] text-tc-ink sm:text-[30px]">
                    Why {agent.name} can&apos;t connect yet
                  </h2>
                  <p className="mt-4 text-[16px] leading-7 text-tc-ink-2">
                    TripCache connects to assistants through a remote MCP server: a link you paste into the assistant, then sign in
                    and approve on your phone. {agent.name} has connectors for services on Meta&apos;s list, and it can build a custom
                    connector from a service&apos;s API details, but Meta doesn&apos;t describe a way to add a link like TripCache&apos;s.
                  </p>
                  <p className="mt-4 text-[16px] leading-7 text-tc-mute">
                    When it can, this page will have the steps, and {agent.name} will show as ready in the app under Profile → AI agents.
                  </p>
                </div>
              </Card>
              <h2 className="mt-16 font-tc-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-tc-ink">
                Connect one of these today
              </h2>
              <p className="mt-3 max-w-[60ch] text-[16.5px] leading-7 text-tc-ink-2">
                Each takes three steps and works with the same TripCache link. Connect as many as you like.
              </p>
              <div className="mt-8">
                <AgentGrid agents={others} />
              </div>
            </Container>
          </Section>
        ) : (
          <Section tone="white">
            <Container>
              <div className={video ? "grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16" : "max-w-[820px]"}>
                {video ? (
                  <div>
                    <h2 className="font-tc-display text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
                      Watch it in {agent.video?.seconds} seconds
                    </h2>
                    <p className="mt-3 max-w-[54ch] text-[16px] leading-7 text-tc-mute">
                      Every step in {agent.name}, from copying the link to approving on your phone.
                    </p>
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={video.poster}
                      aria-label={`How to connect TripCache to ${agent.name}`}
                      className="mt-6 aspect-video w-full rounded-[22px] border border-tc-line bg-tc-mist object-cover"
                    >
                      {video.webm ? <source src={video.webm} type="video/webm" /> : null}
                      {video.mp4 ? <source src={video.mp4} type="video/mp4" /> : null}
                      {video.captions ? <track kind="captions" src={video.captions} srcLang="en" label="English" default /> : null}
                    </video>
                  </div>
                ) : null}
                <div>
                  <h2 className="font-tc-display text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
                    Set up {agent.name} in {agent.steps.length} steps
                  </h2>
                  <Card className="mt-6">
                    <div className="px-6 py-8 sm:px-8">
                      <StepList agent={agent} />
                      {agent.note ? (
                        <p className="mt-6 rounded-[14px] bg-[#fff5d6] px-4 py-3 text-[14.5px] leading-6 text-[#7a3306]">
                          <span className="font-semibold">Plan note: </span>
                          {agent.note}
                        </p>
                      ) : null}
                    </div>
                  </Card>
                </div>
              </div>
            </Container>
          </Section>
        )}

        {agent.soon ? null : (
          <Section tone="canvas">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                <div>
                  <h2 className="text-balance font-tc-display text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
                    What you can ask {agent.name}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[16.5px] leading-7 text-tc-ink-2">{ANSWERS[agent.answers]}</p>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-7 text-tc-mute">
                    {agent.name} reads only what&apos;s in your TripCache account. Confirmation numbers, booking references and
                    document contents aren&apos;t shared.
                  </p>
                </div>
                <ul className="grid gap-3">
                  {EXAMPLE_QUESTIONS.map((item) => (
                    <li key={item.prompt} className="flex gap-4 rounded-[20px] border border-tc-line bg-white px-5 py-4">
                      <MessageSquareText className="mt-1 size-5 shrink-0 text-tc-violet" aria-hidden="true" />
                      <span>
                        <span className="block text-[16px] font-semibold text-tc-ink">“{item.prompt}”</span>
                        <span className="mt-0.5 block text-[14.5px] leading-6 text-tc-mute">{item.answer}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </Section>
        )}

        <Section tone="white" aria-labelledby="ai-agent-faq-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <h2
                id="ai-agent-faq-heading"
                className="text-balance font-tc-display text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink"
              >
                {agent.name} and TripCache: questions
              </h2>
              <FaqList faqs={agent.faqs} />
            </div>
          </Container>
        </Section>

        <Section tone="canvas">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
              <div>
                <h2 className="text-balance font-tc-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-tc-ink">
                  More about TripCache and AI assistants
                </h2>
                <p className="mt-4 max-w-[52ch] text-[16.5px] leading-7 text-tc-ink-2">
                  See TripCache answering in Claude and ChatGPT, or read the step-by-step guides.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/#ai-assistants" className={buttonClass("secondary", "lg")}>
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    AI assistants on the home page
                  </Link>
                </div>
              </div>
              <ul className="self-start border-t border-tc-line">
                {[
                  { href: "/ai-agents", label: "Every AI agent TripCache connects to" },
                  { href: "/blog/connect-chatgpt-claude-to-travel-app", label: "Guide: connect ChatGPT or Claude to your trips" },
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
            </div>
            {agent.soon ? null : (
              <>
                <h2 className="mt-20 font-tc-display text-[24px] font-semibold tracking-[-0.015em] text-tc-ink">Other assistants</h2>
                <div className="mt-6">
                  <AgentGrid agents={AI_AGENT_GUIDES.filter((item) => item.id !== agent.id)} />
                </div>
              </>
            )}
          </Container>
        </Section>

        <CtaBand
          placement={`ai_agent_${agent.id}_cta_band`}
          title={agent.soon ? "Get TripCache ready for when it lands." : `Ask ${agent.name} about your next trip.`}
          text="Free on iPhone and Android. Add Pro to connect AI assistants, import booking emails and get live flight alerts."
        />
      </SitePage>
      <Footer />
    </>
  )
}
