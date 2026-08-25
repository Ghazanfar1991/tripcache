import Link from "next/link"
import { ArrowLeft, Compass } from "lucide-react"

import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <main className="journal-paper min-h-screen text-[#29251f]">
      <section className="flex min-h-[78svh] items-center px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto w-full max-w-[900px] rounded-[36px] bg-white/50 p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_28px_75px_rgba(72,53,33,0.08)] sm:p-14">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f0d7ca] text-[#a44833]">
            <Compass className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a44833]">404 · Route not found</p>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
            This page is not part of the itinerary.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#71695f] sm:text-lg">
            The address may have changed, or the page may no longer be available. Head home to keep exploring TripCache.
          </p>
          <Link
            href="/"
            className="design-one-press mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#29251f] px-6 text-sm font-semibold text-[#f7f2e9] transition-colors hover:bg-[#3a342d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a44833]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f0e8]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to TripCache
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
