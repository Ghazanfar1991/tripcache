import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Footer } from "@/components/footer"
import { Card, Container, CtaBand, PageHero, SitePage } from "@/components/site/kit"
import { IconTile, PhoneShot, productScreen, productTone } from "@/components/site/product-ui"
import { alternativePages } from "@/lib/seo-page-data"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Alternatives to TripIt and TripCase",
  description:
    "Compare TripCache with TripIt and TripCase for travel email organization, cancellation reminders, documents, receipts, and business travel workflows.",
  path: "/alternatives",
})

export default function AlternativesIndexPage() {
  return (
    <>
      <SitePage>
        <PageHero
          align="center"
          className="[&>span:nth-of-type(1)]:-top-32 [&>span:nth-of-type(1)]:size-[400px] [&>span:nth-of-type(2)]:bottom-auto [&>span:nth-of-type(2)]:top-[6%] [&>span:nth-of-type(2)]:size-[320px]"
          title="Compare TripCache with legacy itinerary tools"
          lede="TripCache focuses on the post-booking work travelers care about: email confirmations, cancellation deadlines, documents, receipts, and expense records."
        />

        <section className="bg-tc-canvas pb-24 pt-2 sm:pb-32">
          <Container>
            <ul className="grid gap-5 lg:grid-cols-2">
              {alternativePages.map((page) => {
                const tone = productTone(page.slug)
                const screen = productScreen(page)
                return (
                  <li key={page.path} className="flex">
                    <Link href={page.path} className="group flex w-full rounded-[26px]">
                      <Card interactive bloom={tone.bloom} className="flex w-full flex-col [&>div:last-child]:flex [&>div:last-child]:flex-1 [&>div:last-child]:flex-col">
                        <div className="px-6 pt-7 sm:px-9 sm:pt-9">
                          <IconTile icon={tone.icon} tone={tone.tile} />
                          <h2 className="mt-8 max-w-[22ch] text-balance font-tc-display text-[26px] font-semibold leading-[1.12] tracking-[-0.015em] text-tc-ink sm:text-[30px]">
                            {page.title}
                          </h2>
                          <p className="mt-3 max-w-[56ch] text-[15.5px] leading-7 text-tc-mute">{page.description}</p>
                          <ul className="mt-6 flex flex-wrap gap-2">
                            {page.proofPoints.map((point) => (
                              <li
                                key={point}
                                className="inline-flex items-center gap-1.5 rounded-full bg-tc-mist px-2.5 py-1 text-[12.5px] font-semibold text-tc-ink-2"
                              >
                                <Check className="size-3.5 text-tc-violet" strokeWidth={2.8} aria-hidden="true" />
                                {point}
                              </li>
                            ))}
                          </ul>
                          <span className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-tc-violet">
                            Read comparison
                            <ArrowRight
                              className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div aria-hidden="true" className="relative mt-auto h-[260px] overflow-hidden pt-10">
                          <div className="mx-auto w-[220px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 motion-reduce:transition-none">
                            <PhoneShot src={screen.src} alt="" sizes="220px" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Container>
        </section>

        <CtaBand placement="alternatives_index_cta_band" />
      </SitePage>
      <Footer />
    </>
  )
}
