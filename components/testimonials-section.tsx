import { BriefcaseBusiness, CalendarClock, FileCheck2, MailCheck } from "lucide-react"

import { SectionContainer } from "./section-container"

const useCases = [
  {
    icon: MailCheck,
    title: "A confirmation inbox that becomes an itinerary",
    description:
      "Forward bookings, review the extracted details, and keep flights, stays, cars, tickets, and activities in one trip.",
  },
  {
    icon: CalendarClock,
    title: "A safety net for refundable bookings",
    description:
      "Record hotel, rental car, tour, and ticket cancellation cutoffs so flexible bookings do not quietly become expensive ones.",
  },
  {
    icon: BriefcaseBusiness,
    title: "A cleaner closeout for business travel",
    description:
      "Keep receipts and costs with the trip, then export structured CSV records for reimbursement, client billing, or tax preparation.",
  },
  {
    icon: FileCheck2,
    title: "Travel documents in the right context",
    description:
      "Keep tickets, boarding passes, confirmations, visas, and other files attached to the trip where you will look for them.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="content-auto-section relative overflow-hidden bg-background py-12 dark:bg-slate-950 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[15%] top-0 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[110px]" />
        <div className="absolute bottom-0 left-[10%] h-[380px] w-[520px] rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Built for the work that starts
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              after you book.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground dark:text-slate-300">
            TripCache is not another destination-inspiration feed. It is a practical organizer for confirmed travel,
            deadlines, documents, and records.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {useCases.map((useCase) => {
            const Icon = useCase.icon
            return (
              <article
                key={useCase.title}
                className="rounded-3xl border border-border/70 bg-card/70 p-7 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{useCase.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground dark:text-slate-300">{useCase.description}</p>
              </article>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}
