"use client"

import { useState } from "react"
import Script from "next/script"
import { Minus, Plus } from "lucide-react"
import { SectionContainer } from "./section-container"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Is TripCache free?",
    answer:
      "TripCache includes a free option for organizing trips manually and reviewing itineraries. Pro unlocks email-to-trip automation, automatic flight updates, CSV exports, and expanded document storage.",
  },
  {
    question: "What is included in Pro?",
    answer:
      "TripCache Pro adds email forwarding into trip drafts, automatic flight updates, CSV export for expenses, document storage, and a faster workflow for frequent travelers who do not want to manage trips manually.",
  },
  {
    question: "How does email forwarding work?",
    answer:
      "You receive a unique TripCache email address. Forward booking and flight confirmation emails there, then TripCache extracts the details into a draft trip for review before you save it.",
  },
  {
    question: "What happened to TripCase?",
    answer:
      "TripCase shut down on April 1, 2025. TripCache is positioned as a modern alternative for travelers who still want a dedicated trip manager with cleaner mobile workflows.",
  },
  {
    question: "Can I export my travel data?",
    answer:
      "Yes. TripCache supports CSV exports so you can keep expense records, reimbursement reports, or a structured history of your trips.",
  },
  {
    question: "Is my travel data private?",
    answer:
      "TripCache is designed to keep your travel details in one focused app instead of scattered email threads. If privacy specifics are important for your team, review the Privacy page for the exact policy terms.",
  },
  {
    question: "Does TripCache work on iPhone and Android?",
    answer:
      "Yes. The landing page now reflects the live app-store availability more clearly, with direct links for both the Apple App Store and Google Play.",
  },
  {
    question: "What types of bookings are supported?",
    answer:
      "TripCache is designed around travel-confirmation workflows and can help organize flights and related trip information that usually arrives through booking emails and travel documents.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden py-12 sm:py-20">
        <SectionContainer className="relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="section-kicker">FAQ</div>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                Questions people ask before
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  they download.
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Clear answers help visitors understand pricing, app availability, and how TripCache fits into a real travel workflow.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {faqs.map((faq, index) => {
                const open = openIndex === index

                return (
                  <div key={faq.question} className="surface-panel overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={open}
                    >
                      <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]">
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    <div className={`overflow-hidden px-6 transition-all duration-300 ${open ? "max-h-72 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="surface-panel mt-10 px-6 py-8 text-center">
              <h3 className="text-2xl font-bold text-foreground">Still need a hand?</h3>
              <p className="mt-3 text-muted-foreground">Reach out to the team directly and we’ll help with setup, pricing, or migration questions.</p>
              <a
                href="mailto:support@trip-cache.com"
                className="mt-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/15"
              >
                Contact support
              </a>
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  )
}
