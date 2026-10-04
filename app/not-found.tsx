import "./secondary.css"

import Image from "next/image"
import { ArrowLeft, Compass } from "lucide-react"

import { Footer } from "@/components/footer"
import { ButtonLink, PageHero, SitePage } from "@/components/site/kit"

export default function NotFound() {
  return (
    <SitePage>
      <PageHero
        className="min-h-[78svh]"
        title="This page is not part of the itinerary."
        lede={<p>The address may have changed, or the page may no longer be available. Head home to keep exploring TripCache.</p>}
        aside={
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[380px] -rotate-2 overflow-hidden rounded-[30px] shadow-[0_50px_90px_-40px_rgba(45,27,87,0.65),inset_0_1px_0_rgba(255,255,255,0.4)] sm:rounded-[34px] lg:max-w-[400px]">
            <Image src="/brand-landmarks.webp" alt="" fill priority sizes="(min-width: 1024px) 400px, 80vw" className="object-cover object-[50%_60%]" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,10,50,0)_35%,rgba(20,10,50,0.82)_100%)]" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1.5 text-[12.5px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
              <Compass className="size-3.5" aria-hidden="true" />
              Route not found
            </span>
            <figcaption className="absolute inset-x-6 bottom-6 text-white">
              <span className="block font-tc-script text-[44px] leading-[0.9] sm:text-[52px]">Trip to</span>
              <span className="mt-1 block font-tc-display text-[64px] font-semibold leading-none tracking-[-0.02em] [font-variant-numeric:tabular-nums] sm:text-[76px]">
                404
              </span>
            </figcaption>
          </figure>
        }
      >
        <ButtonLink href="/" size="lg">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to TripCache
        </ButtonLink>
      </PageHero>
      <Footer />
    </SitePage>
  )
}
