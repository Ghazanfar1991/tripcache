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
    <main className="min-h-screen bg-background text-foreground">
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

      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-120px] top-28 h-96 w-96 rounded-full bg-emerald-400/10 blur-[140px]" />

        <SectionContainer className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.84fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              {page.eyebrow}
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
                {page.hero}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{page.description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <GetStartedModal
                triggerLabel="Download TripCache"
                triggerClassName="h-10 rounded-full bg-cyan-500 px-6 text-white hover:bg-cyan-600 sm:h-11"
              />
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href={page.kind === "feature" ? "/blog" : "/features/email-to-itinerary"}>
                  {page.kind === "feature" ? "Read the guides" : "See email automation"}
                </Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {page.proofPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm font-medium">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-[2rem] bg-cyan-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/60 p-3 shadow-2xl">
              <Image
                src={page.image}
                alt={page.imageAlt}
                width={720}
                height={960}
                className="h-auto w-full rounded-[1.5rem] object-cover"
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-16">
        <SectionContainer className="grid gap-5 md:grid-cols-3">
          {page.benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-2xl border border-border/60 bg-card/50 p-6">
              <h2 className="text-xl font-bold">{benefit.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{benefit.copy}</p>
            </article>
          ))}
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-20">
        <SectionContainer className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{page.primaryKeyword}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{page.workflowTitle}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              TripCache is built for travelers who already have real bookings and need a calmer way to manage what
              happens after the confirmation arrives.
            </p>
          </div>
          <div className="grid gap-4">
            {page.workflow.map((step, index) => (
              <article key={step.title} className="grid gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 sm:grid-cols-[auto_1fr]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-16">
        <SectionContainer>
          <div className="rounded-[2rem] border border-border/60 bg-card/40 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Continue with the workflow that fits your trip</h2>
                <p className="mt-2 text-muted-foreground">
                  Explore the related feature, comparison, calculator, or guide without losing the post-booking context.
                </p>
              </div>
              <Button asChild className="rounded-full">
                <Link href="/tools/hotel-cancellation-deadline-calculator">Try the deadline calculator</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {page.internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-20">
        <SectionContainer className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Clear answers for travelers comparing tools and building better travel organization workflows.
            </p>
          </div>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-border/60 bg-card/50 p-5">
                <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-12 lg:py-16">
        <SectionContainer className="grid gap-4 md:grid-cols-3">
          {featureLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-5 w-5" />
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
