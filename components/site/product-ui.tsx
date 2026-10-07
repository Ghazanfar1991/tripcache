/**
 * Product-page pieces (pricing, features, alternatives) built on the shared kit.
 * Kept local so the kit itself stays untouched; everything here follows DESIGN.md.
 */
import Image from "next/image"
import { BellRing, Check, CheckCircle2, FileText, Mail, Plus, Route, WalletCards, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Bloom } from "@/components/home/category"
import { Container, cx } from "@/components/site/kit"
import type { SeoFaq, SeoLandingPage } from "@/lib/seo-page-data"

/* ------------------------------------------------------------------ */
/* Visual identity per product page                                     */
/* ------------------------------------------------------------------ */

export type ProductTone = {
  icon: LucideIcon
  /** Literal Tailwind classes for the icon tile. */
  tile: string
  /** Bloom colour for the card. */
  bloom: string
}

const VIOLET_TILE = "bg-tc-violet-soft text-tc-violet"
/** Reminder chips use the car-soft / car-ink pair (DESIGN.md, Chips). */
const REMINDER_TILE = "bg-[#fff5d6] text-[#b54708]"

const TONES: Record<string, ProductTone> = {
  "email-to-itinerary": { icon: Mail, tile: VIOLET_TILE, bloom: "#8b5cf6" },
  "cancellation-reminders": { icon: BellRing, tile: REMINDER_TILE, bloom: "#f59e0b" },
  "business-travel-expenses": { icon: WalletCards, tile: VIOLET_TILE, bloom: "#12b76a" },
  tripit: { icon: FileText, tile: VIOLET_TILE, bloom: "#6366f1" },
  tripcase: { icon: Route, tile: VIOLET_TILE, bloom: "#ec4899" },
}

const DEFAULT_TONE: ProductTone = { icon: CheckCircle2, tile: VIOLET_TILE, bloom: "#8b5cf6" }

export function productTone(slug: string): ProductTone {
  return TONES[slug] ?? DEFAULT_TONE
}

/**
 * The real app screen shown for a page. Feature pages carry an app screenshot in their data;
 * comparison pages carry an article cover, so they show a real app screen instead
 * (the cover is still shown beside the related article link).
 */
const SCREEN_FALLBACK: Record<string, { src: string; alt: string }> = {
  tripit: { src: "/app-ui-docs-pin.webp", alt: "TripCache document vault asking for a 4-digit PIN" },
  tripcase: { src: "/app-ui-trip-detail.webp", alt: "TripCache Trip to Melbourne itinerary with flight, hotel and activity counts" },
}

export function isAppScreen(src: string) {
  return src.startsWith("/app-")
}

export function productScreen(page: Pick<SeoLandingPage, "slug" | "image" | "imageAlt">) {
  if (isAppScreen(page.image)) return { src: page.image, alt: page.imageAlt }
  return SCREEN_FALLBACK[page.slug] ?? { src: "/app-ui-trip-detail.webp", alt: "TripCache Trip to Melbourne itinerary with flight, hotel and activity counts" }
}

/* ------------------------------------------------------------------ */
/* Small parts                                                         */
/* ------------------------------------------------------------------ */

export function IconTile({ icon: Icon, tone, className }: { icon: LucideIcon; tone: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cx("grid size-11 shrink-0 place-items-center rounded-[12px]", tone, className)}>
      <Icon className="size-5" strokeWidth={2.2} />
    </span>
  )
}

/** An app screenshot in its transparent phone frame, lit with the violet phone shadow. */
export function PhoneShot({
  src,
  alt,
  sizes,
  className,
  preload = false,
}: {
  src: string
  alt: string
  sizes: string
  className?: string
  preload?: boolean
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1322}
      height={2720}
      sizes={sizes}
      preload={preload}
      className={cx(
        "h-auto w-full [filter:drop-shadow(0_34px_40px_rgba(45,27,87,0.22))_drop-shadow(0_6px_12px_rgba(45,27,87,0.12))]",
        className,
      )}
    />
  )
}

/** Violet check / muted dash for comparison tables. */
export function Included({ value, onViolet = false }: { value: boolean | string; onViolet?: boolean }) {
  if (typeof value === "string") {
    return <span className="block text-[13px] font-semibold leading-5 tabular-nums text-tc-ink sm:text-[14.5px]">{value}</span>
  }
  if (value) {
    return (
      <span className={cx("mx-auto grid size-7 place-items-center rounded-full", onViolet ? "bg-tc-violet text-white" : "bg-tc-violet-soft text-tc-violet")}>
        <Check className="size-4" strokeWidth={2.6} aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    )
  }
  return (
    <span className="mx-auto block w-4 text-center text-[18px] leading-none text-[#9aa0a6]">
      <span aria-hidden="true">–</span>
      <span className="sr-only">Not included</span>
    </span>
  )
}

export type PlanRow = { label: string; basic: boolean | string; pro: boolean | string }

/** Hairline Basic / Pro table: tabular figures, violet checks, muted dashes, Pro column lightly tinted. */
export function PlanTable({
  rows,
  caption,
  className,
  basicLabel = "Basic",
  proLabel = "Pro",
}: {
  rows: PlanRow[]
  caption: string
  className?: string
  basicLabel?: string
  proLabel?: string
}) {
  return (
    <div className={cx("overflow-hidden rounded-[26px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)]", className)}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-tc-line">
            <th scope="col" className="py-4 pl-5 pr-2 text-[13.5px] font-semibold text-tc-mute sm:px-8">
              Feature
            </th>
            <th scope="col" className="w-[72px] px-1.5 py-4 text-center font-tc-display text-[17px] font-semibold text-tc-ink sm:w-[22%] sm:px-2 sm:text-[19px]">
              {basicLabel}
            </th>
            <th scope="col" className="w-[96px] bg-tc-violet-soft/45 px-1.5 py-4 text-center font-tc-display text-[17px] font-semibold text-tc-violet sm:w-[26%] sm:px-2 sm:text-[19px]">
              {proLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-tc-line last:border-b-0">
              <th scope="row" className="py-4 pl-5 pr-2 text-[14.5px] font-medium leading-6 text-tc-ink-2 sm:px-8 sm:text-[15.5px]">
                {row.label}
              </th>
              <td className="px-1.5 py-4 text-center sm:px-2">
                <Included value={row.basic} />
              </td>
              <td className="bg-tc-violet-soft/45 px-1.5 py-4 text-center sm:px-2">
                <Included value={row.pro} onViolet />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The home page's FAQ disclosure: hairline rows, Fraunces question, violet-soft toggle. */
export function FaqList({ faqs, className }: { faqs: SeoFaq[]; className?: string }) {
  return (
    <div className={cx("border-t border-tc-line", className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="tc-faq group border-b border-tc-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-tc-display text-[19px] font-semibold leading-snug text-tc-ink sm:text-[21px] [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-tc-violet-soft text-tc-violet transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45 group-open:bg-tc-violet group-open:text-white motion-reduce:transition-none">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-7 pr-12 text-[16px] leading-7 text-tc-mute">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero with a breadcrumb slot                                         */
/* ------------------------------------------------------------------ */

/** PageHero's surface (wash, blooms, Fraunces H1) with room for a breadcrumb and a long-form H1. */
export function ProductHero({
  breadcrumb,
  title,
  lede,
  actions,
  footnote,
  aside,
}: {
  breadcrumb?: ReactNode
  title: ReactNode
  lede?: ReactNode
  actions?: ReactNode
  footnote?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#f7f5ff_0%,#f0f2f4_80%)]">
      <Bloom className="tc-drift -right-40 -top-10 size-[520px] opacity-30" color="#8b5cf6" />
      <Bloom className="tc-drift-slow -left-48 top-[38%] size-[420px] opacity-20" color="#ec4899" />
      <Container className="relative grid items-center gap-14 pb-16 pt-[clamp(112px,15svh,152px)] sm:pb-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div className="max-w-[720px]">
          {breadcrumb}
          <h1 className="text-balance font-tc-display text-[clamp(34px,3.7vw,54px)] font-semibold leading-[1.07] tracking-[-0.02em] text-tc-ink">
            {title}
          </h1>
          {lede ? <p className="mt-6 max-w-[58ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[19px]">{lede}</p> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center">{actions}</div> : null}
          {footnote}
        </div>
        {aside ? <div className="relative">{aside}</div> : null}
      </Container>
    </section>
  )
}
