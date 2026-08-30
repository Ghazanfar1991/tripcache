import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CalendarClock, FileSpreadsheet, MailCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { SectionContainer } from "@/components/section-container"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "About the Post-Booking Travel Organizer",
  description:
    "Learn why TripCache focuses on confirmation emails, cancellation deadlines, travel documents, receipts, and post-trip records.",
  path: "/about",
})

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
    <main className="journal-paper min-h-screen text-[#121212]">
      <SectionContainer className="space-y-16 pb-20 pt-32 sm:pt-36">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="design-one-press inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#5f5f5f] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)] transition-colors hover:text-[#4d20af]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>

        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
            Built for the details that arrive after you book.
          </h1>
          <p className="text-lg leading-8 text-[#666666]">
            Travel information rarely lives in one place. Confirmations sit in email, cancellation policies hide in
            fine print, receipts land in photo libraries, and trip changes arrive through notifications. TripCache
            brings those post-booking details into one itinerary.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <article key={principle.title} className="rounded-[28px] bg-white/48 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8e0ff] text-[#602ad2]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{principle.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#666666]">{principle.description}</p>
              </article>
            )
          })}
        </section>

        <section id="editorial-standards" className="scroll-mt-28 rounded-[32px] bg-white/48 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)] sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4d20af]">Editorial standards</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">How TripCache guides are researched and updated</h2>
            <p className="mt-5 leading-7 text-[#666666]">
              The TripCache Editorial Team publishes practical guidance about post-booking travel organization. We
              check changeable prices, product features, shutdown dates, and policies against official product pages,
              store listings, help centers, or government sources before relying on them.
            </p>
            <ul className="mt-6 list-disc space-y-3 ps-5 leading-7 text-[#666666]">
              <li>Material claims link to a source that lets readers verify the detail.</li>
              <li>Comparison pages explain where TripCache is not the best fit and avoid unsupported superiority claims.</li>
              <li>Publication and update dates stay visible, and substantive corrections receive a new review date.</li>
              <li>Product screenshots and descriptions reflect features available in the current app.</li>
              <li>Questions or correction requests can be sent to support@trip-cache.com.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-[32px] bg-[#121212] p-8 text-[#f7f2e9] shadow-[0_28px_70px_rgba(64,47,30,0.16)] sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold">TripCache is available now on iPhone and Android.</h2>
              <p className="mt-3 max-w-2xl text-[#b9b0a3]">
                Start with the free plan. Upgrade in the app if email automation, cancellation reminders, flight
                updates, document storage, and CSV exports fit your travel routine.
              </p>
              <p className="mt-4 text-sm text-[#b9b0a3]">
                Questions? Email{" "}
                <a className="font-semibold text-[#a98af0]" href="mailto:support@trip-cache.com">
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
