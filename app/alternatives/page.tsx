import "../secondary.css"

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
    <main className="min-h-screen bg-[#f4f0e8] pt-28 text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <SectionContainer className="pb-20 pt-8 min-[900px]:pb-28 min-[900px]:pt-12">
        <div className="grid items-end gap-8 min-[880px]:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.65fr)] min-[880px]:gap-16">
          <div>
            <p className="inline-flex items-center rounded-full bg-[#e5dcff] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#602ad2]">Travel app alternatives</p>
            <h1 className="design-one-display-index mt-6 max-w-4xl">Compare TripCache with legacy itinerary tools</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[#626262] min-[880px]:pb-2">
            TripCache focuses on the post-booking work travelers care about: email confirmations, cancellation
            deadlines, documents, receipts, and expense records.
          </p>
        </div>

        <div className="mt-12 grid gap-5 min-[760px]:grid-cols-2 min-[900px]:mt-14">
          {alternativePages.map((page, index) => (
            <Link
              key={page.path}
              href={page.path}
              className={`group flex min-h-[24rem] flex-col justify-between rounded-[30px] p-7 shadow-[0_1px_0_rgba(255,255,255,0.7),0_18px_48px_rgba(72,53,33,0.06)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.8),0_26px_60px_rgba(72,53,33,0.1)] sm:p-10 ${index === 0 ? "bg-[#121212] text-[#f4f0e8]" : "bg-[#602ad2] text-white"}`}
            >
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-[#cbb9f5]" : "bg-white/60"}`} />
              <div className="mt-16">
                <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">{page.title}</h2>
                <p className={`mt-5 max-w-xl leading-7 ${index === 0 ? "text-[#d4cec4]" : "text-white/78"}`}>{page.description}</p>
              </div>
              <span className="mt-9 inline-flex items-center gap-2 text-sm font-semibold">
                Read comparison
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>
      <Footer />
    </main>
  )
}
