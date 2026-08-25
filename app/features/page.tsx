import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/section-container"
import { featurePages } from "@/lib/seo-page-data"

export const metadata: Metadata = {
  title: "TripCache Features for Email Itineraries, Reminders, and Expenses",
  description:
    "Explore TripCache features for travel email organization, cancellation deadline reminders, business travel receipts, documents, and expenses.",
  alternates: {
    canonical: "/features",
  },
}

export default function FeaturesIndexPage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8] pt-28 text-[#29251f] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <SectionContainer className="pb-20 pt-8 min-[900px]:pb-28 min-[900px]:pt-12">
        <div className="grid items-end gap-8 min-[880px]:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.65fr)] min-[880px]:gap-16">
          <div>
            <p className="inline-flex items-center rounded-full bg-[#eadfce] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b9543a]">TripCache features</p>
            <h1 className="design-one-display-index mt-6 max-w-4xl">Travel organization built from your inbox</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[#696158] min-[880px]:pb-2">
            Start with confirmed bookings, then keep cancellation deadlines, receipts, documents, and trip records in
            one organized place.
          </p>
        </div>

        <div className="mt-12 grid gap-5 min-[760px]:grid-cols-2 min-[1080px]:grid-cols-3 min-[900px]:mt-14">
          {featurePages.map((page, index) => (
            <Link
              key={page.path}
              href={page.path}
              className={`group flex min-h-[22rem] flex-col justify-between rounded-[30px] p-7 shadow-[0_1px_0_rgba(255,255,255,0.7),0_18px_48px_rgba(72,53,33,0.06)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.8),0_26px_60px_rgba(72,53,33,0.1)] sm:p-8 ${index === 0 ? "bg-[#db6947] text-white min-[760px]:col-span-2 min-[1080px]:col-span-1" : "bg-white/55 text-[#29251f]"}`}
            >
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-white/60" : "bg-[#db6947]"}`} />
              <div className="mt-16">
                <h2 className="max-w-sm text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">{page.title}</h2>
                <p className={`mt-4 max-w-md leading-7 ${index === 0 ? "text-white/78" : "text-[#71695f]"}`}>{page.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Explore feature
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
