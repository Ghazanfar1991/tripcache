/**
 * The TripCache page kit: the home page's design system (DESIGN.md) packaged for every other route.
 * Fraunces headings, Inter text, cool canvas + white cards with clipped colour blooms, violet actions.
 */
import Link from "next/link"
import { Fragment, type ComponentProps, type ReactNode } from "react"
import { Bloom } from "@/components/home/category"
import { StoreBadges } from "@/components/home/store-badges"

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ")
}

/* ------------------------------------------------------------------ */
/* Page frame                                                          */
/* ------------------------------------------------------------------ */

/** Wraps a route's content. Pages still render <Footer /> after it. */
export function SitePage({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cx("tc-site overflow-x-clip bg-white font-tc text-tc-ink", className)}>{children}</main>
}

export function Container({ children, className, size = "default" }: { children: ReactNode; className?: string; size?: "narrow" | "default" | "wide" }) {
  const width = size === "narrow" ? "max-w-[760px]" : size === "wide" ? "max-w-[1240px]" : "max-w-[1200px]"
  return <div className={cx("mx-auto w-full px-5 sm:px-8", width, className)}>{children}</div>
}

/**
 * The top of every page: cool canvas with prismatic blooms, a Fraunces H1 and an optional lede, actions and aside.
 * `script` sets the Allura "Trip to"-style signature above the title (use sparingly).
 */
export function PageHero({
  title,
  lede,
  script,
  breadcrumb,
  children,
  aside,
  align = "left",
  className,
}: {
  title: ReactNode
  lede?: ReactNode
  script?: string
  /** Optional visible trail (use <Breadcrumbs />), shown above the title. */
  breadcrumb?: ReactNode
  children?: ReactNode
  aside?: ReactNode
  align?: "left" | "center"
  className?: string
}) {
  return (
    <section className={cx("relative overflow-hidden bg-[linear-gradient(to_bottom,#f7f5ff_0%,#f0f2f4_80%)]", className)}>
      {/* Blooms fade out before the hero's bottom edge, so no section seam shows. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
        <Bloom className="tc-drift -right-40 -top-24 size-[480px] opacity-30" color="#8b5cf6" />
        <Bloom className="tc-drift-slow -left-40 top-[18%] size-[400px] opacity-20" color="#ec4899" />
      </div>
      <Container
        className={cx(
          "relative pb-16 pt-[clamp(120px,16svh,164px)] sm:pb-20",
          aside ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : "",
        )}
      >
        <div className={cx(align === "center" && !aside ? "mx-auto max-w-[820px] text-center" : "max-w-[760px]")}>
          {breadcrumb}
          {script ? <p className="font-tc-script text-[clamp(36px,4vw,52px)] leading-[0.9] text-tc-violet">{script}</p> : null}
          <h1 className="text-balance font-tc-display text-[clamp(40px,5.2vw,72px)] font-semibold leading-[1.03] tracking-[-0.02em] text-tc-ink">
            {title}
          </h1>
          {lede ? (
            <div className={cx("mt-6 text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[19px]", align === "center" && !aside ? "mx-auto max-w-[60ch]" : "max-w-[60ch]")}>
              {lede}
            </div>
          ) : null}
          {children ? <div className={cx("mt-8 flex flex-wrap items-center gap-3", align === "center" && !aside ? "justify-center" : "")}>{children}</div> : null}
        </div>
        {aside ? <div className="relative">{aside}</div> : null}
      </Container>
    </section>
  )
}

/** A visible breadcrumb trail; the last item is the current page. Pair it with BreadcrumbList JSON-LD. */
export function Breadcrumbs({
  items,
  align = "left",
  className,
}: {
  items: { name: string; href?: string }[]
  align?: "left" | "center"
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cx("mb-6 text-[13.5px] leading-6 text-tc-mute", className)}>
      <ol className={cx("flex flex-wrap items-center gap-x-2 gap-y-1", align === "center" && "justify-center")}>
        {items.map((item, index) => (
          <Fragment key={item.name}>
            {index > 0 ? (
              <li aria-hidden="true" className="text-[#c4c8cc]">
                /
              </li>
            ) : null}
            {item.href && index < items.length - 1 ? (
              <li>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="rounded-[6px] underline-offset-4 transition-colors hover:text-tc-ink hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ) : (
              <li aria-current="page" className="text-tc-ink-2">
                {item.name}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

const SECTION_TONES = {
  white: "bg-white text-tc-ink",
  canvas: "bg-tc-canvas text-tc-ink",
  dark: "tc-dark-panel text-white",
} as const

export function Section({
  children,
  tone = "white",
  className,
  id,
  ...rest
}: { children: ReactNode; tone?: keyof typeof SECTION_TONES; className?: string; id?: string } & Omit<ComponentProps<"section">, "children" | "className">) {
  return (
    <section id={id} data-nav-theme={tone === "dark" ? "dark" : undefined} className={cx("relative py-20 sm:py-28", SECTION_TONES[tone], className)} {...rest}>
      {children}
    </section>
  )
}

export function SectionHeading({
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  className,
  dark = false,
}: {
  title: ReactNode
  lede?: ReactNode
  align?: "left" | "center"
  as?: "h2" | "h3"
  className?: string
  dark?: boolean
}) {
  return (
    <div className={cx(align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]", className)}>
      <Tag className="text-balance font-tc-display text-[clamp(30px,3.8vw,50px)] font-semibold leading-[1.06] tracking-[-0.02em]">{title}</Tag>
      {lede ? <p className={cx("mt-4 text-pretty text-[17px] leading-8", dark ? "text-white/70" : "text-tc-ink-2", align === "center" ? "mx-auto max-w-[60ch]" : "max-w-[60ch]")}>{lede}</p> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Surfaces                                                            */
/* ------------------------------------------------------------------ */

/** The app's card: white, hairline border, soft violet-tinted lift, optional clipped bloom. */
export function Card({
  children,
  className,
  bloom,
  as: Tag = "div",
  interactive = false,
}: {
  children: ReactNode
  className?: string
  bloom?: string
  as?: "div" | "article" | "li" | "section"
  interactive?: boolean
}) {
  return (
    <Tag
      className={cx(
        "relative overflow-hidden rounded-[26px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)]",
        interactive && "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(14,14,14,0.04),0_36px_70px_-40px_rgba(45,27,87,0.55)]",
        className,
      )}
    >
      {bloom ? <Bloom className="-right-20 -top-24 size-64 opacity-35" color={bloom} /> : null}
      <div className="relative">{children}</div>
    </Tag>
  )
}

/** A dark studio panel, as used by the home page's "How it works" stage. */
export function DarkPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-nav-theme="dark" className={cx("tc-dark-panel relative overflow-hidden rounded-[30px] text-white sm:rounded-[34px]", className)}>
      <Bloom className="tc-drift-slow -right-24 -top-32 size-[460px] opacity-40" color="#7c3aed" />
      <Bloom className="tc-drift -bottom-40 -left-24 size-[400px] opacity-25" color="#d82d7e" />
      <div className="relative">{children}</div>
    </div>
  )
}

export function Pill({ children, tone = "violet", className }: { children: ReactNode; tone?: "violet" | "amber" | "green" | "neutral" | "pro"; className?: string }) {
  const tones = {
    violet: "bg-tc-violet-soft text-tc-violet",
    amber: "bg-[#fff5d6] text-[#b54708]",
    green: "bg-[#e8f8f0] text-[#067647]",
    neutral: "bg-tc-mist text-tc-mute",
    pro: "bg-[#fff5d6] text-[#b54708] uppercase tracking-[0.06em] text-[10.5px] font-bold",
  }
  return <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold", tones[tone], className)}>{children}</span>
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

const BUTTONS = {
  primary: "bg-tc-violet text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] hover:bg-[#5520cb]",
  secondary: "border border-tc-line bg-white text-tc-ink hover:bg-tc-mist",
  ghost: "text-tc-violet hover:bg-tc-violet-soft",
  light: "bg-white text-tc-violet hover:bg-tc-violet-soft",
} as const

export function buttonClass(variant: keyof typeof BUTTONS = "primary", size: "md" | "lg" = "md") {
  return cx(
    "tc-press inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold transition-colors duration-200",
    size === "lg" ? "h-12 px-6 text-[15.5px]" : "h-11 px-5 text-[14.5px]",
    BUTTONS[variant],
  )
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: { href: string; children: ReactNode; variant?: keyof typeof BUTTONS; size?: "md" | "lg"; className?: string } & Omit<ComponentProps<"a">, "href" | "children" | "className">) {
  const classes = cx(buttonClass(variant, size), className)
  if (href.startsWith("/") && !href.startsWith("/download")) {
    return (
      <Link href={href} prefetch={false} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  )
}

/** The closing band every page ends on: violet field, Fraunces line, official store badges. */
export function CtaBand({
  title = "Put the next trip in one organized place.",
  text = "Free on iPhone and Android, with reminders, documents and exports. Add Pro for email import and live flight alerts.",
  placement,
}: {
  title?: ReactNode
  text?: ReactNode
  placement: string
}) {
  return (
    <section className="bg-white px-3 pb-16 pt-6 sm:px-5 sm:pb-24">
      <div
        data-nav-theme="dark"
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[30px] bg-[linear-gradient(150deg,#612bd3_0%,#4a1eac_60%,#2f137c_100%)] px-6 py-14 text-center text-white sm:rounded-[36px] sm:py-20"
      >
        <Bloom className="tc-drift -right-28 -top-32 size-[460px] opacity-50" color="#d82d7e" />
        <Bloom className="tc-drift-slow -bottom-40 -left-24 size-[420px] opacity-40" color="#6366f1" />
        <div className="relative mx-auto max-w-[720px]">
          <p className="font-tc-script text-[clamp(34px,4vw,48px)] leading-none text-[#e4dcff]">Trip to</p>
          <h2 className="mt-2 text-balance font-tc-display text-[clamp(30px,4vw,50px)] font-semibold leading-[1.08] tracking-[-0.02em]">{title}</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-[17px] leading-8 text-[#e4dcff]">{text}</p>
          <StoreBadges placement={placement} className="mt-8 justify-center" />
        </div>
      </div>
    </section>
  )
}
