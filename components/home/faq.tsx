import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"
import { FAQS, GUIDES } from "./data"

const SITE_URL = "https://trip-cache.com"

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "ItemList",
      name: "TripCache travel organization guides",
      itemListElement: GUIDES.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${guide.href}`,
        name: guide.label,
      })),
    },
  ],
}

export function Faq() {
  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <script
        id="homepage-search-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="text-balance font-tc-display text-[clamp(36px,4.4vw,54px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink">
            Questions, answered.
          </h2>
          <p className="mt-5 max-w-[40ch] text-[17px] leading-7 text-tc-ink-2">
            Straight answers about pricing, email import, deadlines and travel records. Still stuck?{" "}
            <a href="mailto:support@trip-cache.com" className="font-semibold text-tc-violet underline decoration-tc-violet/30 underline-offset-4 hover:decoration-tc-violet">
              Email support
            </a>
            .
          </p>
          <nav aria-label="Travel organization guides" className="mt-12">
            <p className="font-tc-display text-[17px] font-semibold text-tc-ink">Guides</p>
            <ul className="mt-3 flex flex-col">
              {GUIDES.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    prefetch={false}
                    className="group flex items-center justify-between gap-4 border-b border-tc-line py-3.5 text-[15px] text-tc-ink-2 transition-colors hover:text-tc-ink"
                  >
                    {guide.label}
                    <ArrowRight className="size-4 shrink-0 text-tc-mute transition-transform duration-300 group-hover:translate-x-1 group-hover:text-tc-ink" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-tc-line">
          {FAQS.map((faq) => (
            <details key={faq.question} className="tc-faq group border-b border-tc-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-tc-display text-[19px] font-semibold text-tc-ink sm:text-[21px] [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-tc-violet-soft text-tc-violet transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45 group-open:bg-tc-violet group-open:text-white">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-7 pr-12 text-[16px] leading-7 text-tc-mute">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
