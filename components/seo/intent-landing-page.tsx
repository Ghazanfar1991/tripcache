import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Mail, ShieldCheck, WalletCards } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { Card, Container, CtaBand, Section, SitePage, buttonClass, cx } from "@/components/site/kit"
import {
  FaqList,
  IconTile,
  PhoneShot,
  PlanTable,
  ProductHero,
  isAppScreen,
  productScreen,
  productTone,
  type PlanRow,
} from "@/components/site/product-ui"
import { Bloom } from "@/components/home/category"
import type { SeoLandingPage } from "@/lib/seo-page-data"

const BASE_URL = "https://trip-cache.com"

const featureLinks = [
  { href: "/features/email-to-itinerary", label: "Email-to-itinerary", icon: Mail },
  { href: "/features/cancellation-reminders", label: "Cancellation reminders", icon: ShieldCheck },
  { href: "/features/business-travel-expenses", label: "Business expenses", icon: WalletCards },
]

/** Plan facts from seo/research/app-feature-inventory.md: Pro gates only email import, live alerts and Live Activity/widgets. */
const PLAN_ROWS: PlanRow[] = [
  { label: "Price", basic: "$0 forever", pro: "$5.99/month, or $49.99–$50.00/year" },
  { label: "Manual trips, boarding-pass scanning and the document vault", basic: true, pro: true },
  { label: "Cancellation-deadline and check-in reminders", basic: true, pro: true },
  { label: "Expenses, CSV and PDF export, and CSV import", basic: true, pro: true },
  { label: "Booking-email import (monthly allowance)", basic: false, pro: true },
  { label: "Live flight-status alerts on supported flights", basic: false, pro: true },
  { label: "Live Activity, Dynamic Island and widgets", basic: false, pro: true },
]

const BENEFIT_BLOOMS = ["#8b5cf6", "#ec4899", "#6366f1"]

interface IntentLandingPageProps {
  page: SeoLandingPage
}

export function IntentLandingPage({ page }: IntentLandingPageProps) {
  const pageUrl = `${BASE_URL}${page.path}`
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.kind === "feature" ? "Features" : "Alternatives",
        item: `${BASE_URL}/${page.kind === "feature" ? "features" : "alternatives"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: pageUrl,
      },
    ],
  }

  const tone = productTone(page.slug)
  const screen = productScreen(page)
  const showCover = !isAppScreen(page.image)
  const isAlternative = page.kind === "alternative"

  return (
    <>
      <SitePage>
        <script
          id={`${page.slug}-faq-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />
        <script
          id={`${page.slug}-breadcrumb-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        />

        <ProductHero
          breadcrumb={
            <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] leading-6 text-tc-mute">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link href="/" className="rounded-[6px] underline-offset-4 transition-colors hover:text-tc-ink hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[#c4c8cc]">
                  /
                </li>
                <li>
                  <Link
                    href={page.kind === "feature" ? "/features" : "/alternatives"}
                    className="rounded-[6px] underline-offset-4 transition-colors hover:text-tc-ink hover:underline"
                  >
                    {page.kind === "feature" ? "Features" : "Alternatives"}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[#c4c8cc]">
                  /
                </li>
                <li aria-current="page" className="text-tc-ink-2">
                  {page.title}
                </li>
              </ol>
            </nav>
          }
          title={page.hero}
          lede={page.description}
          actions={
            <>
              <GetStartedModal triggerLabel="Download TripCache" triggerClassName={buttonClass("primary", "lg")} />
              <Link
                href={page.kind === "feature" ? "/blog" : "/features/email-to-itinerary"}
                className={buttonClass("secondary", "lg")}
              >
                {page.kind === "feature" ? "Read the guides" : "See email automation"}
              </Link>
            </>
          }
          footnote={
            <>
              <ul className="mt-8 flex flex-wrap gap-2">
                {page.proofPoints.map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full border border-tc-line bg-white/80 py-1.5 pl-2 pr-3.5 text-[13.5px] font-medium text-tc-ink-2"
                  >
                    <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-tc-violet-soft text-tc-violet">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-[62ch] text-[13.5px] leading-6 text-tc-mute">{page.planNote}</p>
            </>
          }
          aside={
            <div className="relative mx-auto w-[min(68vw,300px)] lg:w-[min(100%,312px)]">
              <Bloom className="tc-drift left-1/2 top-1/3 size-[360px] -translate-x-1/2 opacity-40" color={tone.bloom} />
              <PhoneShot
                src={screen.src}
                alt={screen.alt}
                preload
                sizes="(min-width: 1024px) 312px, 68vw"
                className="relative"
              />
              <div className="absolute -left-6 bottom-[16%] flex max-w-[240px] -rotate-2 items-center gap-3 rounded-[16px] border border-tc-line bg-white px-3.5 py-3 shadow-[0_24px_44px_-22px_rgba(45,27,87,0.55)] sm:-left-14">
                <IconTile icon={tone.icon} tone={tone.tile} className="size-9 rounded-full" />
                <span className="text-[13.5px] font-semibold leading-5 text-tc-ink">{page.eyebrow}</span>
              </div>
            </div>
          }
        />

        <section className="bg-tc-canvas pb-20 pt-2 sm:pb-28">
          <Container>
            <div className="grid gap-5 md:grid-cols-3">
              {page.benefits.map((benefit, index) => (
                <Card key={benefit.title} as="article" bloom={BENEFIT_BLOOMS[index % BENEFIT_BLOOMS.length]} className="h-full">
                  <div className="flex h-full flex-col p-6 sm:p-8">
                    <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-tc-violet-soft text-tc-violet">
                      <CheckCircle2 className="size-[18px]" strokeWidth={2.2} />
                    </span>
                    <h2 className="mt-10 font-tc-display text-[24px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[26px]">
                      {benefit.title}
                    </h2>
                    <p className="mt-3 text-[15.5px] leading-7 text-tc-mute">{benefit.copy}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <Section tone="white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h2 className="text-balance font-tc-display text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-tc-ink">
                  {page.workflowTitle}
                </h2>
                <p className="mt-5 max-w-[46ch] text-pretty text-[17px] leading-8 text-tc-ink-2">
                  TripCache is built for travelers who already have real bookings and need a calmer way to manage what
                  happens after the confirmation arrives.
                </p>
                <p className="mt-6">
                  <span className="inline-flex items-center rounded-full bg-tc-violet-soft px-3 py-1 text-[12.5px] font-semibold text-tc-violet">
                    {page.primaryKeyword}
                  </span>
                </p>
              </div>

              {isAlternative ? (
                <div>
                  <ol className="overflow-hidden rounded-[26px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)]">
                    {page.workflow.map((step, index) => (
                      <li
                        key={step.title}
                        className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b border-tc-line px-5 py-6 last:border-b-0 sm:grid-cols-[40px_minmax(0,0.85fr)_minmax(0,1.15fr)_auto] sm:gap-x-6 sm:px-8"
                      >
                        <span className="pt-1 font-tc-display text-[17px] font-semibold tabular-nums text-tc-mute">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-tc-display text-[19px] font-semibold leading-snug text-tc-ink sm:text-[20px]">{step.title}</h3>
                        <span aria-hidden="true" className="row-span-2 grid size-7 place-items-center self-start rounded-full bg-tc-violet-soft text-tc-violet sm:order-last sm:row-span-1">
                          <Check className="size-4" strokeWidth={2.6} />
                        </span>
                        <p className="col-start-2 text-[15.5px] leading-7 text-tc-mute sm:col-start-3 sm:row-start-1">{step.copy}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-10">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <h3 className="font-tc-display text-[24px] font-semibold tracking-[-0.015em] text-tc-ink">Compare plans</h3>
                      <Link
                        href="/pricing"
                        className="inline-flex items-center gap-1 rounded-[8px] text-[14.5px] font-semibold text-tc-violet underline-offset-4 hover:underline"
                      >
                        Pricing
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                    <PlanTable rows={PLAN_ROWS} caption="TripCache Basic and Pro plans" className="mt-5" />
                  </div>
                </div>
              ) : (
                <Card as="div" className="h-fit">
                  <ol className="px-6 py-8 sm:px-10 sm:py-10">
                    {page.workflow.map((step, index) => (
                      <li key={step.title} className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-5 py-5 first:pt-0 last:pb-0">
                        {index < page.workflow.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className={cx(
                              "absolute bottom-[-14px] left-[21px] w-0.5 rounded-full bg-[linear-gradient(to_bottom,#612bd3,#d82d7e)] opacity-50",
                              index === 0 ? "top-[50px]" : "top-[70px]",
                            )}
                          />
                        ) : null}
                        <span className="relative grid size-11 place-items-center rounded-full bg-tc-violet text-[15px] font-semibold tabular-nums text-white shadow-[0_8px_18px_-8px_rgba(97,43,211,0.7)]">
                          {index + 1}
                        </span>
                        <div className="pt-1.5">
                          <h3 className="font-tc-display text-[21px] font-semibold leading-snug text-tc-ink sm:text-[23px]">{step.title}</h3>
                          <p className="mt-2 max-w-[52ch] text-[15.5px] leading-7 text-tc-mute">{step.copy}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Card>
              )}
            </div>
          </Container>
        </Section>

        <Section tone="canvas">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
              <div>
                <h2 className="text-balance font-tc-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
                  Continue with the workflow that fits your trip
                </h2>
                <p className="mt-4 max-w-[52ch] text-pretty text-[17px] leading-8 text-tc-ink-2">
                  Explore the related feature, comparison, calculator, or guide without losing the post-booking context.
                </p>
                {showCover ? null : (
                  <Link href={page.resourceCta.href} className={cx(buttonClass("primary", "lg"), "mt-8")}>
                    {page.resourceCta.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>

              <div className="self-start">
                {showCover ? (
                  <Link href={page.resourceCta.href} className="group mb-8 block rounded-[26px]">
                    <Card interactive>
                      <Image
                        src={page.image}
                        alt={page.imageAlt}
                        width={1200}
                        height={630}
                        sizes="(min-width: 1024px) 540px, 100vw"
                        className="aspect-[1200/630] w-full object-cover"
                      />
                      <span className="flex items-center justify-between gap-4 px-6 py-5 text-[15.5px] font-semibold text-tc-ink">
                        {page.resourceCta.label}
                        <ArrowRight
                          className="size-4 shrink-0 text-tc-violet transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Card>
                  </Link>
                ) : null}

                <ul className="border-t border-tc-line">
                  {page.internalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-4 border-b border-tc-line py-5 font-tc-display text-[19px] font-semibold text-tc-ink transition-colors hover:text-tc-violet sm:text-[21px]"
                      >
                        {link.label}
                        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white text-tc-ink-2 transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:bg-tc-violet-soft group-hover:text-tc-violet motion-reduce:transition-none">
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <h2 className="text-balance font-tc-display text-[clamp(32px,4vw,50px)] font-semibold leading-[1.05] tracking-[-0.02em] text-tc-ink">
                  Frequently asked questions
                </h2>
                <p className="mt-5 max-w-[40ch] text-pretty text-[17px] leading-7 text-tc-ink-2">
                  Clear answers for travelers comparing tools and building better travel organization workflows.
                </p>
              </div>
              <FaqList faqs={page.faqs} />
            </div>

            <nav aria-label="TripCache features" className="mt-16 grid gap-3 sm:mt-20 md:grid-cols-3">
              {featureLinks.map((link) => {
                const Icon = link.icon
                const current = link.href === page.path
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className="group flex min-h-20 items-center gap-4 rounded-[20px] border border-tc-line bg-white px-5 py-4 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_24px_44px_-36px_rgba(45,27,87,0.45)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:transition-none"
                  >
                    <IconTile icon={Icon} tone="bg-tc-violet-soft text-tc-violet" className="size-10 rounded-full" />
                    <span className="flex-1 text-[15.5px] font-semibold text-tc-ink">{link.label}</span>
                    <ArrowRight
                      className="size-4 shrink-0 text-tc-mute transition-transform duration-300 group-hover:translate-x-1 group-hover:text-tc-violet"
                      aria-hidden="true"
                    />
                  </Link>
                )
              })}
            </nav>
          </Container>
        </Section>

        <CtaBand placement={`${page.kind}_${page.slug}_cta_band`} />
      </SitePage>
      <Footer />
    </>
  )
}
