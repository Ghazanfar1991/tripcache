import Link from "next/link"
import { BellRing, FileLock2, MailCheck, MapPinned, Plane, ReceiptText } from "lucide-react"

import { SectionContainer } from "./section-container"

const answers = [
  {
    icon: MailCheck,
    question: "How do I organize travel confirmation emails in one place?",
    answer:
      "Forward flight, hotel, rental car, tour, and ticket confirmations to TripCache. The app reads the booking details, creates a trip draft, and lets you review the itinerary before saving it.",
  },
  {
    icon: BellRing,
    question: "How do I avoid missing free cancellation deadlines?",
    answer:
      "Add the cancellation deadline for refundable hotels, cars, tours, or tickets, then choose when TripCache should remind you before the booking becomes non-refundable.",
  },
  {
    icon: FileLock2,
    question: "Where should I keep passports, boarding passes, visas, and tickets?",
    answer:
      "TripCache keeps travel documents connected to the right trip, so boarding passes, PDFs, passport copies, visa files, and tickets are easier to find when you are at the airport or hotel desk.",
  },
  {
    icon: ReceiptText,
    question: "What travel app helps with expense reports after a trip?",
    answer:
      "Track trip costs, attach receipts, and export a CSV report for reimbursement, taxes, client billing, or personal travel budgets.",
  },
]

const useCases = [
  "Business travelers who need flight updates, receipt records, and cleaner reimbursement exports.",
  "Families planning flights, hotels, rental cars, activities, restaurant bookings, and tickets in one shared itinerary.",
  "Digital nomads who need past trip history, secure documents, maps, and flexible booking reminders.",
  "TripCase and TripIt users who want a modern itinerary app with cancellation reminders and document storage.",
]

const relatedGuides = [
  {
    href: "/blog/organize-travel-confirmation-emails-2026",
    title: "How to organize travel confirmation emails",
  },
  {
    href: "/blog/free-cancellation-reminder-travel-bookings-2026",
    title: "Free cancellation reminder workflow",
  },
  {
    href: "/blog/best-travel-document-organizer-app-2026",
    title: "Best travel document organizer app",
  },
  {
    href: "/blog/business-travel-expense-reporting-app-2026",
    title: "Business travel expense reporting app",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "TripCache",
      applicationCategory: "TravelApplication",
      operatingSystem: "iOS, Android",
      url: "https://trip-cache.com",
      description:
        "TripCache organizes travel confirmation emails, trip itineraries, free-cancellation reminders, secure travel documents, flight updates, maps, expenses, and CSV exports.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Email-to-trip booking import",
        "Free-cancellation deadline reminders",
        "Secure travel document storage",
        "Live flight tracking",
        "Trip map view",
        "Expense tracking and CSV export",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: answers.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "ItemList",
      name: "TripCache travel organization guides",
      itemListElement: relatedGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://trip-cache.com${guide.href}`,
        name: guide.title,
      })),
    },
  ],
}

export function AISearchAnswerSection() {
  return (
    <section id="travel-organizer-guide" className="content-auto-section relative overflow-hidden bg-background py-12 dark:bg-slate-950 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SectionContainer>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/70 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <Plane className="h-4 w-4" />
            Travel Organizer Guide
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-5xl">
            Answers for the trip details travelers search for most
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground dark:text-slate-400">
            TripCache is built for the practical parts of travel planning: confirmations, cancellation windows,
            documents, maps, flight changes, and the records you need after the trip.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {answers.map((item) => (
            <article
              key={item.question}
              className="rounded-lg border border-border/70 bg-card/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-snug text-foreground dark:text-white">{item.question}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground dark:text-slate-400">{item.answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
              Who TripCache is useful for
            </h3>
            <ul className="mt-5 space-y-3 text-muted-foreground dark:text-slate-400">
              {useCases.map((useCase) => (
                <li key={useCase} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-card/60 p-6 dark:border-white/10 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <MapPinned className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
                Explore detailed travel workflows
              </h3>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  prefetch={false}
                  className="rounded-lg border border-border/60 bg-background/70 p-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-950/50"
                >
                  {guide.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
