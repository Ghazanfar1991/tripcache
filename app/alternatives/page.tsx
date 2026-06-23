import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/section-container"
import { alternativePages } from "@/lib/seo-page-data"

export const metadata: Metadata = {
  title: "TripCache Alternatives to TripIt and TripCase",
  description:
    "Compare TripCache with TripIt and TripCase for travel email organization, cancellation reminders, documents, receipts, and business travel workflows.",
  alternates: {
    canonical: "/alternatives",
  },
}

export default function AlternativesIndexPage() {
  return (
    <main className="min-h-screen bg-background pt-28">
      <SectionContainer className="pb-16 lg:pb-24">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Travel app alternatives</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Compare TripCache with legacy itinerary tools</h1>
          <p className="text-lg leading-8 text-muted-foreground">
            TripCache focuses on the post-booking work travelers care about: email confirmations, cancellation
            deadlines, documents, receipts, and expense records.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {alternativePages.map((page) => (
            <Link key={page.path} href={page.path} className="rounded-2xl border border-border/60 bg-card/50 p-6 transition hover:border-primary/40 hover:text-primary">
              <h2 className="text-xl font-bold">{page.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{page.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold">
                Read comparison
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
