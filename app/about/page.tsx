import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarClock, FileSpreadsheet, MailCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { SectionContainer } from "@/components/section-container"

export const metadata: Metadata = {
  title: "About TripCache",
  description:
    "Learn why TripCache focuses on confirmation emails, cancellation deadlines, travel documents, receipts, and post-trip records.",
  alternates: {
    canonical: "/about",
  },
}

const principles = [
  {
    icon: MailCheck,
    title: "Start with confirmed travel",
    description:
      "TripCache is designed for the moment booking emails and PDFs begin arriving—not for selling flights, hotels, or destination inspiration.",
  },
  {
    icon: CalendarClock,
    title: "Make expensive details visible",
    description:
      "Cancellation cutoffs, flight changes, documents, and receipts should stay attached to the trip instead of disappearing into an inbox.",
  },
  {
    icon: FileSpreadsheet,
    title: "Keep useful records after the trip",
    description:
      "Business and frequent travelers can keep costs and receipts in context, then export structured records when the journey is over.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <SectionContainer className="space-y-16 pb-16 pt-24">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>

        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="text-balance text-4xl font-bold sm:text-5xl">
            Built for the details that arrive after you book.
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Travel information rarely lives in one place. Confirmations sit in email, cancellation policies hide in
            fine print, receipts land in photo libraries, and trip changes arrive through notifications. TripCache
            brings those post-booking details into one itinerary.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <article key={principle.title} className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{principle.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{principle.description}</p>
              </article>
            )
          })}
        </section>

        <section className="rounded-3xl border border-border/50 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-8 shadow-xl">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold">TripCache is available now on iPhone and Android.</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Start with the free plan. Upgrade in the app if email automation, cancellation reminders, flight
                updates, document storage, and CSV exports fit your travel routine.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Questions? Email{" "}
                <a className="font-semibold text-primary" href="mailto:support@trip-cache.com">
                  support@trip-cache.com
                </a>
                .
              </p>
            </div>
            <GetStartedModal triggerLabel="Download TripCache" triggerClassName="h-11 rounded-full px-6" />
          </div>
        </section>
      </SectionContainer>
      <Footer />
    </main>
  )
}
