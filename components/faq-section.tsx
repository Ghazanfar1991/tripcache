import Link from "next/link"

import { SectionContainer } from "./section-container"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Is TripCache free?",
    answer:
      "Yes. TripCache Basic includes manual trip entry, itinerary viewing, and core trip organization. TripCache Pro costs $9.99 per month and adds the automation and reporting tools listed on the pricing page.",
  },
  {
    question: "What is included in TripCache Pro?",
    answer:
      "Pro adds email-to-trip automation, automatic flight updates, CSV expense exports, expanded document storage, calendar integration, trip sharing, and priority support. Subscriptions are activated and managed in the mobile app.",
  },
  {
    question: "How does email forwarding work?",
    answer:
      "TripCache Pro gives you a unique forwarding address. Send a booking confirmation to that address and TripCache extracts the travel details into a draft. You review the draft before adding it to your itinerary.",
  },
  {
    question: "What happened to TripCase?",
    answer:
      "The TripCase app and web experience were sunset on April 1, 2025. TripCache is one option for former TripCase users who want email-based itinerary organization, cancellation reminders, documents, and expense records.",
  },
  {
    question: "Can I track free-cancellation deadlines?",
    answer:
      "Yes. You can save cancellation cutoffs for refundable hotels, rental cars, tours, tickets, and other bookings, then choose when TripCache should remind you before the deadline.",
  },
  {
    question: "Can I export my travel data?",
    answer:
      "Yes. TripCache Pro includes CSV exports for travel history and expense records, useful for reimbursement, client billing, tax preparation, or personal recordkeeping.",
  },
  {
    question: "Does TripCache work on iPhone and Android?",
    answer:
      "Yes. TripCache is available now from the Apple App Store and Google Play. The website links directly to both official listings.",
  },
  {
    question: "What types of bookings can I organize?",
    answer:
      "TripCache is designed for flights, hotels, rental cars, transport, activities, tickets, restaurants, meetings, parking, notes, documents, and custom trip items. Unusual email formats can still be reviewed and corrected before saving.",
  },
]

export function FAQSection() {
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
    <section className="content-auto-section relative overflow-hidden py-12 lg:py-16">
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Frequently asked <span className="text-gradient-primary">questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Straight answers about pricing, availability, email import, and the post-booking workflow.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition hover:border-primary/30 dark:border-white/5 dark:bg-white/5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 text-left text-lg font-semibold text-foreground marker:content-none">
                  {faq.question}
                  <span aria-hidden="true" className="text-2xl font-normal text-primary group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-muted-foreground dark:text-gray-300">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 text-center">
            <h3 className="mb-2 text-xl font-bold">Still have questions?</h3>
            <p className="mb-4 text-muted-foreground">Contact the TripCache support team for setup or billing help.</p>
            <Link
              href="mailto:support@trip-cache.com"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:scale-[1.02]"
            >
              Contact support
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
