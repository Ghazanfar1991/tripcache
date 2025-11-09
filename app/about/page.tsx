import Link from "next/link"
import { SectionContainer } from "@/components/section-container"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About TripCache",
  description:
    "Learn why we built TripCache, the team behind it, and how we help frequent travelers stay organized and compliant.",
}

const pillars = [
  {
    title: "Travel-First Design",
    description:
      "Every screen is crafted with actual traveler feedback so you can manage itineraries, travelers, and documents without digging through inboxes.",
  },
  {
    title: "Automation + Control",
    description:
      "Email parsing, document storage, and CSV exports are automated, while admin controls ensure travel programs stay compliant and auditable.",
  },
  {
    title: "Security As a Default",
    description:
      "End-to-end encryption, granular permissions, and SOC 2–ready processes keep sensitive travel and expense data private.",
  },
]

const milestones = [
  {
    year: "2023",
    headline: "Research & Prototyping",
    copy: "Interviewed hundreds of EA teams, consultants, and digital nomads who needed a modern TripCase replacement.",
  },
  {
    year: "2024",
    headline: "Private Beta",
    copy: "Rolled out automated email ingest, collaborative trips, and export-ready reporting to our first 2,000 travelers.",
  },
  {
    year: "2025",
    headline: "Public Launch",
    copy: "Introduced TripCache mobile, live flight updates, and enterprise privacy controls for larger travel programs.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      <SectionContainer className="space-y-20 pb-16 pt-24">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            About TripCache
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-balance">
            Built for teams that live between inboxes, airports, and spreadsheets.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TripCache started as an internal tool to keep global project teams aligned on travel plans. Today we help
            thousands of consultants, founders, and executive assistants organize every flight, hotel, and document in
            one trustworthy system.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur"
            >
              <h2 className="text-xl font-semibold">{pillar.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
            </article>
          ))}
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold text-cyan-500 uppercase tracking-wide">Milestones</p>
            <h2 className="text-3xl font-bold">Our journey so far</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {milestones.map((milestone) => (
              <article key={milestone.year} className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm">
                <span className="text-sm font-semibold text-muted-foreground">{milestone.year}</span>
                <h3 className="mt-2 text-xl font-semibold">{milestone.headline}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{milestone.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border/50 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-8 shadow-xl">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-cyan-500 uppercase tracking-wide">What&apos;s next</p>
              <h2 className="text-3xl font-bold">Join the waitlist to shape the roadmap.</h2>
              <p className="text-muted-foreground">
                We ship major improvements every two weeks and rely on our community for feedback. Sign up from the home
                page to get early feature access and invite-only beta builds.
              </p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-background/80 p-6 text-sm text-muted-foreground">
              <p>
                Have partnership ideas or want to bring TripCache to your organization? Reach out at{" "}
                <a className="font-semibold text-cyan-500" href="mailto:hello@tripcache.com">
                  hello@tripcache.com
                </a>{" "}
                and we&apos;ll reply within one business day.
              </p>
            </div>
          </div>
        </section>
      </SectionContainer>
      <Footer />
    </main>
  )
}
