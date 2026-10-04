/**
 * Page shell for the free travel tools, built from the site kit (components/site/kit.tsx, DESIGN.md):
 * the wash hero with a visible breadcrumb, the calculator on canvas, the dark studio band, hairline FAQ
 * disclosures, related-resource cards and the closing store-badge band. Pages keep their own copy, FAQs
 * and JSON-LD; only the surfaces live here.
 */
import Link from "next/link"
import { ArrowRight, CheckCircle2, Plus, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { Breadcrumbs, ButtonLink, Container, CtaBand, DarkPanel, PageHero, Section, SectionHeading, SitePage, cx } from "@/components/site/kit"

export type ToolFaq = { question: string; answer: string }
export type ToolLink = { href: string; title: string; text: string }
type Tone = "white" | "canvas"

const BASE_URL = "https://trip-cache.com"

/** WebApplication + FAQPage + BreadcrumbList, as one JSON-LD graph. */
export function ToolSchema({ path, name, description, alternateName, faqs }: { path: string; name: string; description: string; alternateName?: string; faqs: ToolFaq[] }) {
  const url = `${BASE_URL}${path}`
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#tool`,
        name,
        ...(alternateName ? { alternateName } : {}),
        description,
        url,
        applicationCategory: "TravelApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: name.charAt(0).toUpperCase() + name.slice(1), item: url },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
}

export function ToolPage({ children, className }: { children: ReactNode; className?: string }) {
  return <SitePage className={className}>{children}</SitePage>
}

/** Hero: breadcrumb, the page's only H1, a lede, the store CTA and a secondary link, then the free-tool note. */
export function ToolHero({
  eyebrow,
  icon: Icon = CheckCircle2,
  crumb,
  title,
  lede,
  placement,
  secondary,
}: {
  /** Short "free tool" note shown under the actions (DESIGN.md keeps headings free of eyebrows). */
  eyebrow: string
  icon?: LucideIcon
  /** Visible breadcrumb label for this page (Home / Tools / crumb). */
  crumb: string
  title: ReactNode
  lede: ReactNode
  /** data-store-placement for the store-click measurement. */
  placement: string
  secondary: { href: string; label: string }
}) {
  return (
    <PageHero
      breadcrumb={<Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Tools", href: "/tools" }, { name: crumb }]} />}
      title={title}
      lede={lede}
    >
      <ButtonLink href="/download" size="lg" data-store-placement={placement}>
        Get TripCache free
        <ArrowRight className="size-4" aria-hidden="true" />
      </ButtonLink>
      <ButtonLink href={secondary.href} variant="secondary" size="lg">
        {secondary.label}
      </ButtonLink>
      <p className="flex basis-full items-center gap-2 pt-1 text-[14px] font-medium text-tc-ink-2">
        <Icon className="size-4 text-tc-violet" aria-hidden="true" />
        {eyebrow}
      </p>
    </PageHero>
  )
}

/** The calculator itself, on the canvas ground under the hero. */
export function ToolBody({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <Section tone="canvas" id={id} className={cx("pt-6! sm:pt-8!", className)}>
      <Container size="wide" className="print:max-w-none print:px-0">
        {children}
      </Container>
    </Section>
  )
}

/** The dark studio band: a heading and intro on the left, the explanation on the right. */
export function ToolDarkBand({ title, intro, children, className }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cx("bg-white px-3 py-16 sm:px-5 sm:py-24", className)}>
      <DarkPanel className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16">
          <div>
            <h2 className="text-balance font-tc-display text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white">{title}</h2>
            {intro ? <div className="mt-4 max-w-[48ch] text-[16.5px] leading-8 text-white/75">{intro}</div> : null}
          </div>
          <div>{children}</div>
        </div>
      </DarkPanel>
    </section>
  )
}

/** Numbered step tiles for the dark band. */
export function DarkSteps({ steps }: { steps: { title?: string; text: ReactNode }[] }) {
  return (
    <ol className="flex flex-col gap-3 text-[15.5px] leading-7 text-white/85">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-4 rounded-[18px] bg-white/[0.06] px-4 py-3.5 ring-1 ring-white/10">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-tc-violet text-[13px] font-bold text-white">{index + 1}</span>
          <span>
            {step.title ? <span className="block font-semibold text-white">{step.title}</span> : null}
            <span>{step.text}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

/** A content section. `flush` drops the top padding when it follows the dark band on the same white ground. */
export function ToolSection({
  children,
  className,
  id,
  tone = "white",
  flush = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  tone?: Tone
  flush?: boolean
}) {
  return (
    <Section tone={tone} id={id} className={cx(flush && "pt-0!", className)}>
      <Container size="wide">{children}</Container>
    </Section>
  )
}

export function ToolHeading({ title, lede, as = "h2" }: { title: ReactNode; lede?: ReactNode; as?: "h2" | "h3" }) {
  return <SectionHeading title={title} lede={lede} as={as} />
}

export function ToolFaqSection({
  title,
  intro,
  faqs,
  tone = "white",
  flush = false,
  className,
}: {
  title: string
  intro: string
  faqs: ToolFaq[]
  tone?: Tone
  flush?: boolean
  className?: string
}) {
  return (
    <Section tone={tone} className={cx(flush && "pt-0!", className)}>
      <Container size="wide" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading title={title} lede={intro} />
        <div className="border-t border-tc-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="tc-faq group border-b border-tc-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 font-tc-display text-[19px] font-semibold text-tc-ink sm:text-[21px] [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-tc-violet-soft text-tc-violet transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-tc-violet group-open:text-white motion-reduce:transition-none">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 pr-12 text-[16px] leading-7 text-tc-mute">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function ToolRelated({ links, tone = "canvas", className }: { links: ToolLink[]; tone?: Tone; className?: string }) {
  return (
    <Section tone={tone} className={className}>
      <Container size="wide">
        <SectionHeading title="Related TripCache resources" />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {links.map((link) => (
            <li key={link.href} className="flex">
              <Link
                href={link.href}
                className="group flex w-full flex-col rounded-[24px] border border-tc-line bg-white p-6 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:transition-none"
              >
                <span className="flex items-start justify-between gap-3 font-tc-display text-[20px] font-semibold leading-snug text-tc-ink group-hover:text-tc-violet">
                  {link.title}
                  <ArrowRight className="mt-1.5 size-4 shrink-0 text-tc-mute transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-tc-violet" aria-hidden="true" />
                </span>
                <span className="mt-2 text-[15px] leading-7 text-tc-mute">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** Closing app pitch: the violet store-badge band every page ends on. */
export function ToolCta({ title, text, placement }: { title: string; text: string; placement: string }) {
  return <CtaBand title={title} text={text} placement={placement} />
}
