"use client"

/**
 * One list of guides, filtered by topic. Every card is rendered on the server; filtering only hides cards.
 * Old topic anchors (/blog#cancellation-deadlines) select that topic on arrival.
 */
import Link from "next/link"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useCallback, useEffect, useState, type ReactNode } from "react"
import type { BlogTopic } from "@/lib/blog-topics"
import { TOPIC_TONES } from "@/components/site/blog-cards"

const EASE = [0.16, 1, 0.3, 1] as const

export function BlogBrowser({
  topics,
  cards,
  totalCount,
}: {
  topics: (BlogTopic & { count: number })[]
  /** Pre-rendered cards with the topic they belong to. */
  cards: { slug: string; topicId: string | null; node: ReactNode }[]
  totalCount: number
}) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string>("all")

  const select = useCallback((id: string) => {
    setActive(id)
    const url = id === "all" ? window.location.pathname : `${window.location.pathname}#${id}`
    window.history.replaceState(window.history.state, "", url)
  }, [])

  // Arriving with #topic in the URL selects it (keeps old topic links working).
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.slice(1)
      if (hash && topics.some((topic) => topic.id === hash)) {
        setActive(hash)
        document.getElementById("guides")?.scrollIntoView({ block: "start" })
      }
    }
    const frame = window.requestAnimationFrame(apply)
    window.addEventListener("hashchange", apply)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", apply)
    }
  }, [topics])

  const topic = topics.find((item) => item.id === active)
  const visible = cards.filter((card) => active === "all" || topics.find((item) => item.id === active)?.slugs.includes(card.slug))

  return (
    <div id="guides" className="scroll-mt-24">
      {/* Anchor targets for legacy topic links */}
      {topics.map((item) => (
        <span key={item.id} id={item.id} aria-hidden="true" className="block scroll-mt-28" />
      ))}

      <div className="sticky top-[76px] z-30 -mx-5 px-5 py-3 sm:top-[84px] sm:-mx-8 sm:px-8">
        <div className="tc-filter-bar flex gap-2 overflow-x-auto rounded-[18px] border border-tc-line bg-white/85 p-1.5 shadow-[0_18px_40px_-28px_rgba(45,27,87,0.5)] backdrop-blur-xl [scrollbar-width:none]">
          <LayoutGroup id="blog-topics">
            {[{ id: "all", title: "All guides", count: totalCount }, ...topics].map((item) => {
              const isActive = item.id === active
              const tone = TOPIC_TONES[item.id]
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => select(item.id)}
                  aria-pressed={isActive}
                  className="relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-[12px] px-3.5 text-[14px] font-semibold"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="blog-topic-pill"
                      className="absolute inset-0 rounded-[12px] bg-tc-violet shadow-[0_8px_18px_-10px_rgba(97,43,211,0.8)]"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  {tone ? <span className="relative size-2 rounded-full" style={{ backgroundColor: isActive ? "#ffffff" : tone.color }} /> : null}
                  <span className={`relative whitespace-nowrap ${isActive ? "text-white" : "text-tc-ink-2 hover:text-tc-ink"}`}>{item.title}</span>
                  <span className={`relative rounded-full px-1.5 text-[11.5px] tabular-nums ${isActive ? "bg-white/20 text-white" : "bg-tc-mist text-tc-mute"}`}>{item.count}</span>
                </button>
              )
            })}
          </LayoutGroup>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {topic ? (
          <motion.div
            key={topic.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-6 flex flex-col gap-4 rounded-[22px] border border-tc-line bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <div>
              <h2 className="font-tc-display text-[24px] font-semibold leading-tight text-tc-ink">{topic.title}</h2>
              <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-7 text-tc-mute">{topic.description}</p>
            </div>
            <Link
              href={topic.resource.href}
              prefetch={false}
              className="tc-press inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-[12px] bg-tc-violet-soft px-4 text-[14px] font-semibold text-tc-violet transition-colors hover:bg-[#ddd6fe] sm:self-center"
            >
              {topic.resource.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        ) : (
          <motion.h2
            key="all"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-6 font-tc-display text-[clamp(28px,3.2vw,40px)] font-semibold leading-tight tracking-[-0.02em] text-tc-ink"
          >
            Every guide
          </motion.h2>
        )}
      </AnimatePresence>

      <motion.ul layout={!reduce} className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((card) => (
            <motion.li
              key={card.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="h-full"
            >
              {card.node}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}
