import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"

import { AgentLogo } from "@/components/home/agent-logos"
import { Card, Pill, cx } from "@/components/site/kit"
import { CopyLink } from "@/components/ai-agents/copy-link"
import { MCP_SERVER_URL, agentGuidePath, type AiAgentGuide } from "@/lib/ai-agents"

/** The link people paste into their assistant, and the plan it needs. */
export function ServerLinkCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-tc-display text-[22px] font-semibold leading-snug tracking-[-0.01em] text-tc-ink sm:text-[24px]">
            Your TripCache link
          </h2>
          <Pill tone="pro">Pro</Pill>
        </div>
        <p className="mt-2 text-[15px] leading-7 text-tc-mute">
          Paste this into your assistant as the server URL. It&apos;s also in the app under Profile → AI agents.
        </p>
        <CopyLink url={MCP_SERVER_URL} className="mt-5" />
        <p className="mt-5 flex gap-2.5 text-[14px] leading-6 text-tc-ink-2">
          <Lock className="mt-1 size-4 shrink-0 text-tc-violet" aria-hidden="true" />
          <span>
            Connecting an assistant needs TripCache Pro. You choose whether it can add bookings, and you can disconnect it any
            time in Profile → AI agents.
          </span>
        </p>
      </div>
    </Card>
  )
}

/** The app's numbered connector steps, each with a line of help underneath. */
export function StepList({ agent, className }: { agent: AiAgentGuide; className?: string }) {
  return (
    <ol className={className}>
      {agent.steps.map((step, index) => (
        <li key={step} className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-5 py-4 first:pt-0 last:pb-0">
          {index < agent.steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={cx(
                "absolute bottom-[-12px] left-[21px] w-0.5 rounded-full bg-[linear-gradient(to_bottom,#612bd3,#d82d7e)] opacity-50",
                index === 0 ? "top-[50px]" : "top-[66px]",
              )}
            />
          ) : null}
          <span className="relative grid size-11 place-items-center rounded-full bg-tc-violet text-[15px] font-semibold tabular-nums text-white shadow-[0_8px_18px_-8px_rgba(97,43,211,0.7)]">
            {index + 1}
          </span>
          <div className="pt-1.5">
            <h3 className="font-tc-display text-[20px] font-semibold leading-snug text-tc-ink sm:text-[22px]">{step}</h3>
            {agent.stepHelp[index] ? <p className="mt-1.5 max-w-[52ch] text-[15.5px] leading-7 text-tc-mute">{agent.stepHelp[index]}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** A grid of agent tiles linking to their guides. */
export function AgentGrid({ agents, currentId, headingLevel = "h3" }: { agents: AiAgentGuide[]; currentId?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {agents.map((agent) => (
        <li key={agent.id} className="flex">
          <Link
            href={agentGuidePath(agent.id)}
            aria-current={agent.id === currentId ? "page" : undefined}
            className="group flex w-full flex-col rounded-[22px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_24px_44px_-36px_rgba(45,27,87,0.45)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            <span className="flex items-center gap-3">
              <AgentLogo id={agent.id} size={44} />
              <span className="min-w-0 flex-1">
                <Heading className="font-tc-display text-[19px] font-semibold leading-tight text-tc-ink">{agent.name}</Heading>
                <span className="block truncate text-[13.5px] text-tc-mute">{agent.maker}</span>
              </span>
            </span>
            <span className="mt-4 flex flex-wrap gap-1.5">
              {agent.soon ? (
                <Pill tone="neutral">Coming soon</Pill>
              ) : (
                <>
                  <Pill tone="green">{agent.steps.length} steps</Pill>
                  {agent.video ? <Pill>{agent.video.seconds}-second video</Pill> : null}
                </>
              )}
            </span>
            {agent.note ? <span className="mt-3 text-[14px] leading-6 text-tc-mute">{agent.note}</span> : null}
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-tc-violet">
              {agent.soon ? "Why it's not ready" : "Open the guide"}
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
