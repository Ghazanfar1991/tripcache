import { SectionContainer } from "./section-container";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is TripCache free?",
    answer:
      "TripCache offers a generous Free plan that includes manual trip entry, viewing itineraries, and basic organization. Our Pro plan ($9.99/month) unlocks premium features like email-to-trip automation, automatic flight status updates, CSV expense exports, and unlimited document storage. Start free and upgrade anytime!",
  },
  {
    question: "What's included in the Free plan vs Pro plan?",
    answer:
      "Free plan includes: manual trip creation, view itineraries, and basic trip organization. Pro plan ($9.99/month) adds: email-to-trip automation, automatic flight updates, CSV export, unlimited document storage, calendar integration, and priority support. It's 80% cheaper than TripIt Pro!",
  },
  {
    question: "How does the email forwarding work?",
    answer:
      "With TripCache Pro ($9.99/month), you receive your own unique email address (e.g., trips-abc123@tripcache.app). Simply forward any booking or flight confirmation email to this address. Our AI automatically reads the email, extracts your flight details and creates a flight draft. You'll receive a notification to review and accept the draft. Once accepted, the trip and its related flights are added to your Trips section. You can also view or manage all pending drafts anytime in the Drafts section of the app.",
  },

  {
    question: "What happened to TripCase?",
    answer:
      "TripCase officially shut down on April 1, 2025, as part of Sabre Corporation's strategic restructuring. Millions of users were left searching for alternatives. TripCache was built specifically to fill this gap, offering all the features TripCase users loved, plus modern improvements at an affordable price.",
  },
  {
    question: "Can I export my travel data?",
    answer:
      "Yes! TripCache Pro includes comprehensive CSV export functionality. You can generate detailed reports of your travel history, perfect for expense reimbursement, tax documentation, or personal recordkeeping. Export filters let you select specific date ranges or trip types.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Yes. We take data security and privacy very seriously. All your information is stored in a private, secure database that only you can access through your account. We never share or sell your data to any third party. If you choose to delete your account, all your data is permanently removed from our database. Your travel information always remains fully under your control.",
  },

  {
    question: "Does TripCache work on mobile devices?",
    answer:
      "Yes. TripCache is designed as a mobile-first app. We're currently offering early access for users, and the full Android and iOS apps will be available soon on the app stores. You can register now to secure early access and be among the first to try the app when it launches.",
  },

  {
    question: "What airlines and booking sites are supported?",
    answer:
      "TripCache's AI can automatically extract flight details from almost all airline confirmation emails and PDF tickets. Even if a booking format is unusual or some information is missing, you can review and manually add or edit the details before accepting the draft. This ensures every flight itinerary can be captured accurately.",
  },
];

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
  };

  return (
    <>
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <SectionContainer className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <span>Got Questions?</span>
              </div>

              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Frequently Asked
                <br />
                <span className="text-gradient-primary">Questions</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                Everything you need to know about TripCache
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 open:border-primary/30 hover:border-primary/30 hover:shadow-lg dark:border-white/5 dark:bg-white/5"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-left transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="pr-8 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {faq.question}
                    </span>
                    <span className="relative h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary">
                      <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current" />
                      <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 rounded-full bg-current transition-transform group-open:rotate-90" />
                    </span>
                  </summary>

                  <div className="px-6 pb-6 leading-relaxed text-muted-foreground dark:text-gray-400">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 text-center">
              <h3 className="mb-2 text-xl font-bold">Still have questions?</h3>
              <p className="mb-4 text-muted-foreground">
                We're here to help! Reach out to our support team anytime.
              </p>
              <a
                href="mailto:support@trip-cache.com"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:scale-105"
              >
                Contact Support
              </a>
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
