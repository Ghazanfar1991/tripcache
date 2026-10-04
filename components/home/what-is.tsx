import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { WHAT_IS_TRIPCACHE } from "./data"

/** The self-contained definition answer engines can quote, right under the hero. */
export function WhatIs() {
  return (
    <section id="what-is-tripcache" aria-labelledby="what-is-tripcache-heading" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2
          id="what-is-tripcache-heading"
          className="text-balance font-tc-display text-[clamp(32px,3.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink"
        >
          What is TripCache?
        </h2>
        <div>
          <p className="max-w-[62ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[18px]">{WHAT_IS_TRIPCACHE}</p>
          <Link
            href="/features"
            prefetch={false}
            className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-tc-violet"
          >
            See every feature, free or Pro
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
