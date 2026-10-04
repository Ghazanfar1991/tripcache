/**
 * Read mode for legal and account pages: calm Fraunces headings, Inter body at 17–18px on a 70ch measure,
 * hairline section dividers and a sticky in-page contents list on desktop.
 */
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"

import { Container, cx } from "@/components/site/kit"

export function legalAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function LegalLayout({
  label,
  contents,
  children,
}: {
  /** The document's name, shown above its contents list. */
  label: string
  contents: { id: string; title: string }[]
  children: ReactNode
}) {
  return (
    <section className="bg-white pb-20 pt-12 sm:pb-28 sm:pt-16">
      <Container className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label={`${label} contents`} className="rounded-[16px] border border-tc-line bg-tc-mist p-5 lg:rounded-none lg:border-0 lg:border-l lg:bg-transparent lg:p-0 lg:pl-5">
            <p className="font-tc-display text-[17px] font-semibold text-tc-ink">{label}</p>
            <ol className="mt-3 grid gap-0.5">
              {contents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-mx-2 block rounded-[10px] px-2 py-1.5 text-[14.5px] leading-6 text-tc-mute transition-colors hover:bg-tc-violet-soft hover:text-tc-violet"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href="/"
              className="tc-press mt-5 inline-flex items-center gap-2 rounded-[10px] text-[14px] font-semibold text-tc-violet hover:text-[#3f1a9a]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back home
            </Link>
          </nav>
        </aside>

        <article className="min-w-0 max-w-[70ch]">{children}</article>
      </Container>
    </section>
  )
}

export function LegalSection({ id, title, children, className }: { id: string; title: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cx("scroll-mt-28 border-t border-tc-line py-10 first:border-t-0 first:pt-0 sm:py-12", className)}>
      <h2 className="text-balance font-tc-display text-[26px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[30px]">{title}</h2>
      <div className="mt-4 space-y-4 text-[17px] leading-[1.75] text-tc-ink-2 sm:text-[18px]">{children}</div>
    </section>
  )
}

/** The quiet support line legal pages end on instead of a call to action. */
export function LegalNote({ children }: { children: ReactNode }) {
  return <p className="border-t border-tc-line pt-8 text-[15.5px] leading-7 text-tc-mute">{children}</p>
}

export const legalLinkClass = "font-semibold text-tc-violet underline decoration-tc-violet/30 underline-offset-4 transition-colors hover:decoration-tc-violet"
