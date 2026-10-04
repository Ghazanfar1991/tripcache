/**
 * Journal pieces for the blog: topic colours, the postmark, the perforated stamp and the ticket card.
 * Server-safe (no hooks) so cards render in static HTML for search engines.
 */
import Image from "next/image"
import Link from "next/link"
import { useId } from "react"
import { ArrowUpRight, BriefcaseBusiness, CalendarClock, FileText, Map as MapIcon, Plane, Scale } from "lucide-react"
import type { BlogSummary } from "@/types/blog"
import { blogTopics } from "@/lib/blog-topics"
import { cx } from "@/components/site/kit"

/** Each guide topic wears one of the app's category colours. */
export const TOPIC_TONES: Record<string, { color: string; soft: string; text: string; icon: typeof Plane }> = {
  itineraries: { color: "#6366f1", soft: "#eef2ff", text: "#4f46e5", icon: MapIcon },
  "cancellation-deadlines": { color: "#f59e0b", soft: "#fff5d6", text: "#b54708", icon: CalendarClock },
  "travel-documents": { color: "#8b5cf6", soft: "#ebe8ff", text: "#612bd3", icon: FileText },
  "business-travel": { color: "#12b76a", soft: "#e8f8f0", text: "#067647", icon: BriefcaseBusiness },
  "compare-travel-apps": { color: "#d82d7e", soft: "#fce7f2", text: "#c12570", icon: Scale },
}
const FALLBACK_TONE = { color: "#612bd3", soft: "#ebe8ff", text: "#612bd3", icon: Plane }

export function topicIdForSlug(slug: string): string | null {
  return blogTopics.find((topic) => topic.slugs.includes(slug))?.id ?? null
}

export function toneForSlug(slug: string) {
  const id = topicIdForSlug(slug)
  return (id && TOPIC_TONES[id]) || FALLBACK_TONE
}

export function formatPostDate(date: string, style: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("en-US", style === "short" ? { month: "short", year: "numeric" } : { month: "long", day: "numeric", year: "numeric" })
}

/** A circular cancellation postmark: "TRIPCACHE GUIDES" around a date. Decorative. */
export function Postmark({ label, className, light = false }: { label: string; className?: string; light?: boolean }) {
  const ink = light ? "rgba(255,255,255,0.85)" : "rgba(97,43,211,0.75)"
  const ringId = `tc-postmark-${useId().replace(/:/g, "")}`
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={cx("pointer-events-none", className)}>
      <defs>
        <path id={ringId} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={ink} strokeWidth="2" />
      <circle cx="60" cy="60" r="33" fill="none" stroke={ink} strokeWidth="1.5" />
      <text fill={ink} fontSize="10.5" fontWeight="700" letterSpacing="3.2" style={{ fontFamily: "var(--font-inter)" }}>
        <textPath href={`#${ringId}`}>TRIPCACHE · GUIDES · TRIPCACHE · GUIDES ·</textPath>
      </text>
      <text x="60" y="57" textAnchor="middle" fill={ink} fontSize="11" fontWeight="700" style={{ fontFamily: "var(--font-inter)" }}>
        {label.split(" ")[0]?.toUpperCase()}
      </text>
      <text x="60" y="71" textAnchor="middle" fill={ink} fontSize="11" fontWeight="700" style={{ fontFamily: "var(--font-inter)" }}>
        {label.split(" ")[1]}
      </text>
      {[0, 1, 2].map((wave) => (
        <path
          key={wave}
          d={`M-6 ${86 + wave * 7} q 10 -5 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0`}
          fill="none"
          stroke={ink}
          strokeWidth="1.4"
          opacity={0.7}
        />
      ))}
    </svg>
  )
}

/** A perforated postage stamp in the post's topic colour. */
export function Stamp({ slug, label, className }: { slug: string; label: string; className?: string }) {
  const tone = toneForSlug(slug)
  const Icon = tone.icon
  return (
    <span aria-hidden="true" className={cx("tc-stamp grid w-[62px] place-items-center bg-white p-[5px] shadow-[0_8px_18px_-8px_rgba(14,10,40,0.6)]", className)}>
      <span className="flex h-[70px] w-full flex-col items-center justify-center gap-1 rounded-[3px] text-white" style={{ backgroundColor: tone.color }}>
        <Icon className="size-5" strokeWidth={2} />
        <span className="max-w-[48px] text-center text-[7.5px] font-bold uppercase leading-[1.15] tracking-[0.06em]">{label}</span>
      </span>
    </span>
  )
}

/**
 * The guide card, drawn as a ticket: a matted photo with a stamp, the title, a perforated tear line,
 * and a stub with date and read time.
 */
export function PostTicket({ post, size = "default", sizes }: { post: BlogSummary; size?: "default" | "large"; sizes?: string }) {
  const tone = toneForSlug(post.slug)
  const large = size === "large"
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-[26px] focus-visible:outline-offset-4"
      aria-label={post.seoTitle ?? post.title}
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(14,14,14,0.04),0_40px_70px_-38px_rgba(45,27,87,0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <div className="p-2">
          <div className={cx("tc-cover relative overflow-hidden rounded-[19px] bg-[#1b1240]", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.imageAlt ?? ""}
              fill
              sizes={sizes ?? (large ? "(max-width: 767px) 100vw, 600px" : "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 380px")}
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span aria-hidden="true" className="tc-cover-grade absolute inset-0" />
            <Stamp slug={post.slug} label={post.category} className="absolute right-3 top-3 rotate-[4deg] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-2deg] group-hover:scale-105" />
          </div>
        </div>
        <div className={cx("flex flex-1 flex-col", large ? "px-6 pb-2 pt-4 sm:px-7" : "px-5 pb-2 pt-3 sm:px-6")}>
          <p className="flex items-center gap-2 text-[12.5px] font-semibold" style={{ color: tone.text }}>
            <span className="size-1.5 rounded-full" style={{ backgroundColor: tone.color }} />
            {post.category}
          </p>
          <h3
            className={cx(
              "mt-2 text-balance font-tc-display font-semibold leading-[1.18] tracking-[-0.015em] text-tc-ink transition-colors duration-200 group-hover:text-tc-violet",
              large ? "text-[clamp(22px,2.2vw,28px)]" : "line-clamp-3 text-[20px]",
            )}
          >
            {post.title}
          </h3>
          <p className={cx("mt-2.5 text-[15px] leading-[1.7] text-tc-mute", large ? "line-clamp-3" : "line-clamp-2")}>{post.excerpt}</p>
        </div>
        {/* Tear line */}
        <div aria-hidden="true" className="relative mx-0 mt-4 h-5">
          <span className="absolute -left-2.5 top-0 size-5 rounded-full border border-tc-line bg-tc-canvas" />
          <span className="absolute -right-2.5 top-0 size-5 rounded-full border border-tc-line bg-tc-canvas" />
          <span className="absolute inset-x-5 top-1/2 border-t-2 border-dotted border-tc-line" />
        </div>
        <div className={cx("flex items-center justify-between gap-3 pb-5 pt-2 text-[13px] tabular-nums text-tc-mute", large ? "px-6 sm:px-7" : "px-5 sm:px-6")}>
          <span className="flex items-center gap-3">
            <span>{formatPostDate(post.updatedAt ?? post.date)}</span>
            <span className="size-1 rounded-full bg-tc-line" />
            <span>{post.readTime}</span>
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-tc-violet">
            Read guide
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  )
}

/** Used by topic headers. */
export function TopicGlyph({ id, className = "size-10" }: { id: string; className?: string }) {
  const tone = TOPIC_TONES[id] ?? FALLBACK_TONE
  const Icon = tone.icon
  return (
    <span aria-hidden="true" className={cx("grid shrink-0 place-items-center rounded-full", className)} style={{ backgroundColor: tone.soft, color: tone.text }}>
      <Icon className="size-[46%]" strokeWidth={2.2} />
    </span>
  )
}

