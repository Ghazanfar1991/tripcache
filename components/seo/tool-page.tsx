/**
 * Page shell for the free travel tools, built from the live design's own pieces (the same hero, dark
 * band, FAQ and related-links patterns as the hotel cancellation deadline calculator page), so the new
 * tool pages sit inside the current site design without any new shared styles.
 */
import Link from "next/link"
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { SectionContainer } from "@/components/section-container"
import { Button } from "@/components/ui/button"

export type ToolFaq = { question: string; answer: string }
export type ToolLink = { href: string; title: string; text: string }

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

export function ToolPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className={`min-h-screen bg-[#f4f0e8] text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] ${className}`}>
      {children}
    </main>
  )
}

/** Hero: eyebrow, the page's only H1, a lede and two actions, in the live calculator-hero grid. */
export function ToolHero({
  eyebrow,
  icon: Icon = CheckCircle2,
  title,
  lede,
  placement,
  secondary,
}: {
  eyebrow: string
  icon?: LucideIcon
  title: ReactNode
  lede: ReactNode
  /** data-store-placement for the store-click measurement. */
  placement: string
  secondary: { href: string; label: string }
}) {
  return (
    <section className="relative overflow-hidden pb-9 pt-28 lg:pb-10 lg:pt-28">
      <div className="pointer-events-none absolute -inset-inline-start-24 top-28 hidden h-60 w-60 rounded-full border border-[#41382e]/10 sm:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-inline-end-[5%] top-24 hidden h-28 w-28 rounded-full border border-[#602ad2]/10 sm:block" aria-hidden="true" />
      <SectionContainer className="relative">
        <div className="design-one-calculator-hero">
          <div className="design-one-calculator-eyebrow inline-flex w-fit items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4d20af] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)]">
            <Icon className="h-4 w-4" aria-hidden="true" />
            {eyebrow}
          </div>
          <div className="design-one-calculator-title">
            <h1 className="design-one-display-feature">{title}</h1>
          </div>
          <div className="design-one-calculator-copy max-w-3xl text-base leading-7 text-[#626262] min-[1100px]:text-lg">{lede}</div>
          <div className="design-one-calculator-actions flex flex-col gap-3 sm:flex-row min-[900px]:items-start">
            <Button asChild size="lg" className="rounded-full bg-[#121212] px-6 text-[#f7f2e9] hover:bg-[#242424]">
              <a href="/download" data-store-placement={placement}>
                Get TripCache free
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-[#41382e]/15 bg-white/50 px-6 text-[#121212] hover:bg-white/80">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

/** The calculator itself, on the page background. */
export function ToolBody({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`pb-24 pt-2 lg:pb-32 lg:pt-4 ${className}`}>
      <SectionContainer>{children}</SectionContainer>
    </section>
  )
}

/** The dark band: a heading on the left, the explanation on the right. */
export function ToolDarkBand({ eyebrow, title, intro, children, className = "" }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`bg-[#121212] py-24 text-[#f7f2e9] lg:py-32 ${className}`}>
      <SectionContainer className="grid gap-12 min-[900px]:grid-cols-[0.8fr_1.2fr] min-[900px]:gap-20">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#a98af0]">{eyebrow}</p>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">{title}</h2>
          {intro ? <div className="mt-6 max-w-xl leading-7 text-[#b9b0a3]">{intro}</div> : null}
        </div>
        <div>{children}</div>
      </SectionContainer>
    </section>
  )
}

/** A numbered step tile for the dark band. */
export function DarkSteps({ steps }: { steps: { title?: string; text: ReactNode }[] }) {
  return (
    <ol className="grid gap-4">
      {steps.map((step, index) => (
        <li key={index} className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-[1.5rem] bg-white/[0.055] p-5 leading-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6">
          <span className="grid h-7 w-[1.75rem] place-items-center rounded-full bg-[#602ad2] text-[13px] font-bold text-white">{index + 1}</span>
          <span>
            {step.title ? <span className="block font-semibold text-[#f7f2e9]">{step.title}</span> : null}
            <span className="text-[#d9d2c6]">{step.text}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

/** Light content section with the live heading scale. */
export function ToolSection({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <SectionContainer>{children}</SectionContainer>
    </section>
  )
}

export function ToolHeading({ title, lede, as: Tag = "h2" }: { title: ReactNode; lede?: ReactNode; as?: "h2" | "h3" }) {
  return (
    <div className="max-w-3xl">
      <Tag className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">{title}</Tag>
      {lede ? <p className="mt-5 leading-7 text-[#666666]">{lede}</p> : null}
    </div>
  )
}

export function ToolFaqSection({ title, intro, faqs }: { title: string; intro: string; faqs: ToolFaq[] }) {
  return (
    <section className="py-24 lg:py-32">
      <SectionContainer className="grid gap-12 min-[900px]:grid-cols-[0.72fr_1.28fr] min-[900px]:gap-20">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{title}</h2>
          <p className="mt-5 leading-7 text-[#666666]">{intro}</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-[1.5rem] bg-white/46 px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_16px_44px_rgba(72,53,33,0.055)] sm:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold marker:content-none">
                <span>{faq.question}</span>
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e5dcff] text-xl font-normal text-[#602ad2] transition-transform duration-150 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-7 leading-7 text-[#666666]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}

export function ToolRelated({ links }: { links: ToolLink[] }) {
  return (
    <section className="pb-[3rem] lg:pb-16">
      <SectionContainer>
        <div className="rounded-[2rem] bg-[#602ad2] p-7 text-white shadow-[0_28px_65px_rgba(58,24,135,0.16)] sm:p-10">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">Related TripCache resources</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {links.map((link) => (
              <Link key={link.href} className="group rounded-2xl bg-white/[0.12] p-5 leading-6 transition-colors duration-150 hover:bg-white/[0.18]" href={link.href}>
                <span className="flex items-center justify-between gap-3 font-semibold">
                  {link.title}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-2 block text-sm leading-6 text-white/75">{link.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

/** Closing app pitch, in the live About page's dark card style. */
export function ToolCta({ title, text, placement }: { title: string; text: string; placement: string }) {
  return (
    <section className="pb-24 lg:pb-32">
      <SectionContainer>
        <div className="rounded-[32px] bg-[#121212] p-8 text-[#f7f2e9] shadow-[0_28px_70px_rgba(64,47,30,0.16)] sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="mt-3 max-w-2xl text-[#b9b0a3]">{text}</p>
            </div>
            <Button asChild size="lg" className="h-11 rounded-full bg-[#f7f2e9] px-6 text-[#121212] hover:bg-white">
              <a href="/download" data-store-placement={placement}>
                Download TripCache
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
