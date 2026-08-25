import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { CheckCircle2, Mail, ShieldCheck, WalletCards } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionContainer } from "@/components/section-container"
import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import type { SeoLandingPage } from "@/lib/seo-page-data"

const BASE_URL = "https://trip-cache.com"

const featureLinks = [
  { href: "/features/email-to-itinerary", label: "Email-to-itinerary", icon: Mail },
  { href: "/features/cancellation-reminders", label: "Cancellation reminders", icon: ShieldCheck },
  { href: "/features/business-travel-expenses", label: "Business expenses", icon: WalletCards },
]

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

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <Script
        id={`${page.slug}-faq-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`${page.slug}-breadcrumb-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden pb-14 pt-28 min-[940px]:flex min-[940px]:min-h-[100svh] min-[940px]:items-center min-[940px]:pb-8 min-[940px]:pt-24">
        <div className="pointer-events-none absolute inset-inline-end-[-10rem] top-20 h-[32rem] w-[32rem] rounded-full bg-[#e5dac7] min-[940px]:h-[40rem] min-[940px]:w-[40rem]" />
        <div className="pointer-events-none absolute inset-inline-end-[-6rem] top-32 h-[24rem] w-[24rem] rounded-full border border-[#3b3329]/10 min-[940px]:h-[31rem] min-[940px]:w-[31rem]" />

        <SectionContainer className="relative grid items-center gap-12 min-[940px]:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.62fr)] min-[940px]:gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e5dcff] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#602ad2]">
              <CheckCircle2 className="h-4 w-4" />
              {page.eyebrow}
            </div>

            <div>
              <h1 className="design-one-display-feature mt-6 max-w-4xl">
                {page.hero}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#626262] sm:text-lg">{page.description}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row">
              <GetStartedModal
                triggerLabel="Download TripCache"
                triggerClassName="min-h-12 rounded-full bg-[#602ad2] px-7 font-semibold text-white shadow-[0_12px_28px_rgba(96,42,210,0.2)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#5121b3] hover:shadow-[0_15px_34px_rgba(96,42,210,0.27)] active:scale-[0.96]"
              />
              <Button asChild size="lg" variant="outline" className="min-h-12 rounded-full border-[#121212]/15 bg-white/40 px-7 text-[#121212] shadow-none hover:bg-white/70 hover:text-[#121212]">
                <Link href={page.kind === "feature" ? "/blog" : "/features/email-to-itinerary"}>
                  {page.kind === "feature" ? "Read the guides" : "See email automation"}
                </Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-2.5 min-[620px]:grid-cols-3">
              {page.proofPoints.map((point) => (
                <div key={point} className="rounded-[16px] bg-white/48 px-3.5 py-3 text-[13px] font-medium leading-5 text-[#5f584f] shadow-[0_1px_0_rgba(255,255,255,0.72),0_12px_32px_rgba(72,53,33,0.045)]">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[19.5rem] items-center justify-center">
            <div aria-hidden="true" className="absolute inset-inline-start-[-2.5rem] top-[13%] hidden h-40 w-40 -rotate-3 rounded-[20px] bg-[#602ad2] shadow-[0_22px_45px_rgba(96,42,210,0.2)] min-[1120px]:block" />
            <Image
              src={page.image}
              alt={page.imageAlt}
              width={720}
              height={960}
              sizes="(max-width: 939px) min(78vw, 19.5rem), 19.5rem"
              className="relative mx-auto h-auto max-h-[calc(100svh-10rem)] w-auto max-w-full object-contain drop-shadow-[0_34px_40px_rgba(66,49,31,0.22)]"
              loading="eager"
            />
          </div>
        </SectionContainer>
      </section>

      <section className="bg-[#121212] py-20 text-[#f4f0e8] min-[900px]:py-28">
        <SectionContainer className="grid gap-5 min-[760px]:grid-cols-3">
          {page.benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-[26px] bg-white/[0.055] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-8">
              <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full bg-[#602ad2]" />
              <h2 className="mt-14 text-2xl font-semibold tracking-[-0.035em]">{benefit.title}</h2>
              <p className="mt-4 leading-7 text-[#c9c2b8]">{benefit.copy}</p>
            </article>
          ))}
        </SectionContainer>
      </section>

      <section className="py-20 min-[900px]:py-32">
        <SectionContainer className="grid gap-12 min-[940px]:grid-cols-[minmax(18rem,0.58fr)_minmax(0,1fr)] min-[940px]:gap-20">
          <div className="min-[940px]:sticky min-[940px]:top-32 min-[940px]:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#602ad2]">{page.primaryKeyword}</p>
            <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#121212] sm:text-5xl">{page.workflowTitle}</h2>
            <p className="mt-6 max-w-lg leading-7 text-[#666666]">
              TripCache is built for travelers who already have real bookings and need a calmer way to manage what
              happens after the confirmation arrives.
            </p>
          </div>
          <div className="grid gap-5">
            {page.workflow.map((step, index) => (
              <article key={step.title} className="grid gap-5 rounded-[26px] bg-white/52 p-6 shadow-[0_1px_0_rgba(255,255,255,0.75),0_16px_42px_rgba(72,53,33,0.05)] sm:grid-cols-[auto_1fr] sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#602ad2] text-sm font-bold text-white shadow-[0_8px_20px_rgba(96,42,210,0.2)]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">{step.title}</h3>
                  <p className="mt-3 leading-7 text-[#666666]">{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-20 min-[900px]:pb-32">
        <SectionContainer>
          <div className="rounded-[32px] bg-[#602ad2] p-7 text-white shadow-[0_24px_60px_rgba(96,42,210,0.16)] sm:p-10 min-[900px]:p-14">
            <div className="flex flex-col gap-7 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between">
              <div>
                <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Continue with the workflow that fits your trip</h2>
                <p className="mt-3 max-w-2xl leading-7 text-white/76">
                  Explore the related feature, comparison, calculator, or guide without losing the post-booking context.
                </p>
              </div>
              <Button asChild className="min-h-12 shrink-0 rounded-full bg-white px-7 text-[#121212] shadow-[0_10px_25px_rgba(58,24,135,0.16)] hover:bg-[#f4f0e8] hover:text-[#121212]">
                <Link href="/tools/hotel-cancellation-deadline-calculator">Try the deadline calculator</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 min-[760px]:grid-cols-3">
              {page.internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[18px] bg-white/10 p-5 text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-[background-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:bg-white/16"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="py-20 min-[900px]:py-28">
        <SectionContainer className="grid gap-12 min-[900px]:grid-cols-[minmax(17rem,0.62fr)_minmax(0,1fr)] min-[900px]:gap-20">
          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-[#121212] sm:text-5xl">Frequently asked questions</h2>
            <p className="mt-5 max-w-md leading-7 text-[#666666]">
              Clear answers for travelers comparing tools and building better travel organization workflows.
            </p>
          </div>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[22px] bg-white/48 px-6 shadow-[0_1px_0_rgba(255,255,255,0.7),0_14px_36px_rgba(72,53,33,0.04)] sm:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold marker:content-none">
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e5dcff] text-xl font-normal text-[#602ad2] transition-transform duration-150 ease-out group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-7 leading-7 text-[#666666]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-20 min-[900px]:pb-28">
        <SectionContainer className="grid gap-4 min-[760px]:grid-cols-3">
          {featureLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-24 items-center gap-4 rounded-[22px] bg-[#121212] p-6 text-[#f4f0e8] shadow-[0_16px_38px_rgba(52,43,33,0.12)] transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#242424]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#602ad2]"><Icon className="h-5 w-5" /></span>
                <span className="font-semibold">{link.label}</span>
              </Link>
            )
          })}
        </SectionContainer>
      </section>

      <Footer />
    </main>
  )
}
