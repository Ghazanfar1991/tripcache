import "../secondary.css"

import Link from "next/link"
import { ArrowRight, Bot, Check, MailCheck, Plane, ShieldCheck, Smartphone } from "lucide-react"

import { Footer } from "@/components/footer"
import { GetStartedModal } from "@/components/get-started-modal"
import { Bloom } from "@/components/home/category"
import { Breadcrumbs, Card, Container, CtaBand, PageHero, Section, SitePage, buttonClass, cx } from "@/components/site/kit"
import { FaqList, IconTile, PlanTable, type PlanRow } from "@/components/site/product-ui"

const basicFeatures = [
  "Unlimited trips and bookings",
  "Cancellation-deadline reminders",
  "Check-in reminders and a check-in shortcut",
  "Manual trips: flights, stays, cars, trains, events, and more",
  "Boarding-pass barcode scanning",
  "Document vault with a PIN, Face ID, or fingerprint lock",
  "Expenses in 153 currencies, with category budgets",
  "CSV and PDF export, including travel history and a Visa / Immigration Summary",
  "Trip map, travel history, CSV import, and offline access",
  "Live calendar feed for your calendar app, and trip-card image sharing",
  "Siri, Shortcuts and Spotlight on iPhone",
]

const proFeatures = [
  "Everything in Basic",
  "Connect Claude, ChatGPT or another AI assistant: it reads your trips and adds plans, with your OK",
  "Booking-email import with a monthly allowance: forward supported confirmations and review each draft",
  "PDF, ticket and screenshot import in the app",
  "Free-cancellation deadlines read from imported confirmations",
  "Flight-number autofill for airports and times",
  "Live flight tracking and alerts on supported flights: gate, terminal, delay, take-off, landing and baggage belt",
  "Live Activity and Dynamic Island on iPhone; flight progress in notifications and widgets on Android",
]

const plans = [
  {
    name: "Basic",
    price: "$0",
    cadence: "forever",
    description: "For travelers who add bookings themselves and want reminders, documents, and records in one place.",
    label: "Free plan",
    badge: null,
    highlight: false,
    features: basicFeatures,
    meta: "No credit card needed. Storage limits are the same on every plan.",
    cta: "Download free",
  },
  {
    name: "Pro Monthly",
    price: "$5.99",
    cadence: "/month",
    description: "For travelers who want booking emails turned into trips, live flight alerts and an AI assistant that knows their plans.",
    label: "Flexible billing",
    badge: null,
    highlight: false,
    features: proFeatures,
    meta: "$71.88 over 12 months. Cancel anytime in your App Store or Google Play subscriptions.",
    cta: "Choose monthly",
  },
  {
    name: "Pro Yearly",
    price: "$49.99",
    cadence: "/year",
    description: "Every Pro feature at the lowest price. Try it free for 14 days before you pay anything.",
    label: "14-day free trial",
    badge: "Save 30%",
    highlight: true,
    features: proFeatures,
    meta: "14 days free, then $49.99 a year on Google Play or $50.00 on the App Store: about $4.17 a month. Cancel before the trial ends and you won't be charged.",
    cta: "Start 14-day free trial",
  },
]

const reasons = [
  {
    title: "Ask your AI assistant",
    copy: "Connect Claude, ChatGPT or another assistant to TripCache. Ask what's next on your trip or have it add a plan; you choose its access and approve the connection in the app.",
    icon: Bot,
    tile: "bg-[#fce7f2] text-[#c12570]",
    bloom: "#d82d7e",
  },
  {
    title: "Skip the retyping",
    copy: "Forward supported confirmations, or add a PDF, ticket or screenshot in the app, and review a structured draft. The importer also picks up free-cancellation deadlines.",
    icon: MailCheck,
    tile: "bg-tc-violet-soft text-tc-violet",
    bloom: "#8b5cf6",
  },
  {
    title: "Know when a flight changes",
    copy: "Get alerts for take-off, landing, delays, and gate, terminal, and baggage-belt changes on supported flights, and type a flight number to fill in airports and times. The airline remains the final source.",
    icon: Plane,
    tile: "bg-[#eef2ff] text-[#4f46e5]",
    bloom: "#6366f1",
  },
  {
    title: "See the flight at a glance",
    copy: "Follow flight progress in a Live Activity and the Dynamic Island on iPhone, or in your notifications and a home-screen widget on Android.",
    icon: Smartphone,
    tile: "bg-tc-violet-soft text-tc-violet",
    bloom: "#12b76a",
  },
]

const PRICE_SUMMARY =
  "TripCache Basic is free. TripCache Pro costs $5.99 a month, or $49.99 a year on Google Play and $50.00 on the App Store, and the yearly plan starts with a 14-day free trial (US prices, November 2026)."

/** Basic vs Pro. `true` renders a check ("Included"), `false` a dash ("Not included"); strings show as written. */
const comparisonRows: PlanRow[] = [
  { label: "Price", basic: "Free", pro: "$5.99 a month, or $49.99 a year (Google Play) / $50.00 a year (App Store)" },
  { label: "Free trial", basic: "Not needed", pro: "14 days on Pro Yearly" },
  { label: "Unlimited trips and bookings", basic: true, pro: true },
  { label: "Trips with flights, stays, rental cars, trains, buses, parking, events, restaurants, tours and meetings", basic: true, pro: true },
  { label: "Cancellation-deadline reminders (7 days, 2 days, 1 day or on the day)", basic: true, pro: true },
  { label: "Check-in reminders (48 and 24 hours before departure) and check-in shortcut", basic: true, pro: true },
  { label: "Boarding-pass barcode scanning", basic: true, pro: true },
  { label: "Document vault with an optional PIN and Face ID or fingerprint unlock", basic: true, pro: true },
  { label: "Document storage limits", basic: "Same on every plan", pro: "Same on every plan" },
  { label: "Expenses in 153 currencies, with locked exchange rates and category budgets", basic: true, pro: true },
  { label: "CSV and PDF export, including Travel History and a Visa / Immigration Summary", basic: true, pro: true },
  { label: "CSV import of past flights", basic: true, pro: true },
  { label: "Trip map, travel history and offline access", basic: true, pro: true },
  { label: "Live calendar feed, add to calendar and trip-card image sharing", basic: true, pro: true },
  { label: "Siri, Shortcuts and Spotlight (iPhone)", basic: true, pro: true },
  { label: "AI assistant connection (Claude, ChatGPT and others)", basic: false, pro: true },
  { label: "Booking-email import (forwarded confirmations, PDFs and screenshots)", basic: false, pro: "Included, with a monthly allowance" },
  { label: "PDF, ticket and screenshot import in the app", basic: false, pro: true },
  { label: "Free-cancellation deadlines read from imported confirmations", basic: false, pro: true },
  { label: "Flight-number autofill", basic: false, pro: true },
  { label: "Live flight tracking and alerts on supported flights", basic: false, pro: true },
  { label: "Live Activity, Dynamic Island, Android flight-progress notifications and widgets", basic: false, pro: true },
]

const pricingFaqs = [
  {
    question: "Is TripCache free?",
    answer:
      "Yes. TripCache Basic is free and includes unlimited trips, cancellation-deadline and check-in reminders, boarding-pass scanning, the document vault, expenses in 153 currencies, CSV and PDF export, CSV import of past flights, the trip map, travel history and offline access. Download it free for iPhone (iOS 16.4 or later) or Android (7.0 or later).",
  },
  {
    question: "What does TripCache Pro add?",
    answer:
      "Pro connects TripCache to AI assistants such as Claude and ChatGPT, turns forwarded booking emails, PDFs, tickets and screenshots into trips (with a monthly allowance), fills in flights from the flight number, and adds live flight tracking and alerts on supported flights with Live Activity, Dynamic Island, notifications and widgets. It costs $5.99 a month, or $49.99 a year on Google Play and $50.00 on the App Store, and the yearly plan starts with a 14-day free trial (US prices, November 2026).",
  },
  {
    question: "Is there a free trial of TripCache Pro?",
    answer:
      "Yes. Pro Yearly starts with a 14-day free trial, so you can use every Pro feature before you pay. If you cancel in your App Store or Google Play subscriptions before the trial ends, you aren't charged; otherwise the yearly price is billed when it ends. Trial eligibility follows Apple and Google rules, usually once per account. Pro Monthly has no trial.",
  },
  {
    question: "Can I use TripCache with ChatGPT or Claude?",
    answer:
      "Yes, with Pro. Add TripCache as a connector in Claude, ChatGPT or another assistant that supports connectors, then approve the connection in the TripCache app and choose what it can do. The assistant can read your trips and add plans; you can disconnect it at any time in the app.",
  },
  {
    question: "Is email import free?",
    answer:
      "No. Booking-email import is part of Pro and includes a monthly import allowance. You forward supported confirmations, including attached PDFs and screenshots, to your TripCache address and review each draft before saving it. On Basic, you add bookings by hand, scan a boarding pass, or import past flights from a CSV file.",
  },
  {
    question: "Do storage limits differ between Basic and Pro?",
    answer:
      "No. Document storage limits are the same on every plan: up to 10 PDF, JPEG or PNG files per document, 15 MB per file and 50 MB per document.",
  },
  {
    question: "How do I cancel TripCache Pro?",
    answer:
      "Cancel it where you subscribed. On iPhone, open Settings, tap your name, then Subscriptions. On Android, open Google Play, tap your profile icon, then Payments & subscriptions, then Subscriptions. Pro stays active until the end of the period you paid for, and Basic features keep working after that.",
  },
]

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://trip-cache.com/pricing#webpage",
        name: "TripCache Pricing",
        url: "https://trip-cache.com/pricing",
        description: `${PRICE_SUMMARY} Basic includes unlimited trips, cancellation-deadline and check-in reminders, the document vault, expenses, and CSV and PDF export. Pro adds AI assistant access (Claude, ChatGPT), booking-email and screenshot import, flight-number autofill, and live flight alerts with Live Activity and widgets.`,
        mainEntity: { "@id": "https://trip-cache.com/#app" },
        isPartOf: { "@id": "https://trip-cache.com/#website" },
        breadcrumb: { "@id": "https://trip-cache.com/pricing#breadcrumb" },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://trip-cache.com/pricing#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://trip-cache.com" },
          { "@type": "ListItem", position: 2, name: "Pricing", item: "https://trip-cache.com/pricing" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://trip-cache.com/pricing#faq",
        mainEntity: pricingFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }

  return (
    <>
      <SitePage>
        <script
          id="pricing-page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema).replace(/</g, "\\u003c") }}
        />

        <PageHero
          align="center"
          breadcrumb={<Breadcrumbs align="center" items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />}
          title="Start free. Pay for the post-booking work you want automated."
          lede={
            <p>
              {PRICE_SUMMARY} Basic includes unlimited trips, cancellation-deadline and check-in reminders, the
              document vault, expenses, and CSV or PDF export. Pro adds AI assistant access, booking-email and
              screenshot import, and live flight alerts with Live Activity and widgets.
            </p>
          }
        >
          <ul className="flex flex-wrap justify-center gap-2.5">
            {["Basic is free forever", "14-day free trial on Pro Yearly", "Cancel Pro anytime"].map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-tc-line bg-white/80 py-1.5 pl-2 pr-3.5 text-[13.5px] font-medium text-tc-ink-2"
              >
                <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-tc-violet-soft text-tc-violet">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </PageHero>

        <section className="relative bg-tc-canvas pb-24 pt-2 sm:pb-32">
          <Container size="wide">
            <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={cx(
                    "relative flex flex-col overflow-hidden rounded-[30px] p-7 sm:p-9",
                    plan.highlight
                      ? "bg-[linear-gradient(150deg,#612bd3_0%,#4a1eac_60%,#2f137c_100%)] text-white shadow-[0_40px_80px_-40px_rgba(97,43,211,0.8)]"
                      : "border border-tc-line bg-white text-tc-ink shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-40px_rgba(45,27,87,0.4)]",
                  )}
                >
                  {plan.highlight ? (
                    <>
                      <Bloom className="tc-drift -right-24 -top-28 size-80 opacity-55" color="#d82d7e" />
                      <Bloom className="tc-drift-slow -bottom-32 -left-20 size-72 opacity-30" color="#6366f1" />
                    </>
                  ) : null}

                  <div className="relative flex min-h-8 flex-wrap items-center justify-between gap-2">
                    <h2 className="font-tc-display text-[24px] font-semibold tracking-[-0.01em]">{plan.name}</h2>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={cx(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold",
                          plan.highlight ? "bg-white/15 text-white ring-1 ring-white/20" : "bg-tc-mist text-tc-ink-2",
                        )}
                      >
                        {plan.label}
                      </span>
                      {plan.badge ? (
                        <span className="inline-flex items-center rounded-full bg-[#fec84b] px-2.5 py-1 text-[12px] font-bold text-tc-ink">
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className={cx("relative mt-3 text-[15px] leading-6", plan.highlight ? "text-[#e4dcff]" : "text-tc-mute")}>
                    {plan.description}
                  </p>

                  <p className="relative mt-8 flex items-baseline gap-2">
                    <span className="font-tc-display text-[56px] font-semibold leading-none tracking-[-0.02em] tabular-nums sm:text-[60px]">
                      {plan.price}
                    </span>
                    <span className={cx("text-[16px]", plan.highlight ? "text-[#e4dcff]" : "text-tc-mute")}>{plan.cadence}</span>
                  </p>
                  <p className={cx("relative mt-3 text-[14px] leading-6 tabular-nums", plan.highlight ? "text-[#e4dcff]" : "text-tc-mute")}>
                    {plan.meta}
                  </p>

                  <ul
                    className={cx(
                      "relative mt-8 flex flex-col gap-3.5 border-t pt-7",
                      plan.highlight ? "border-white/15" : "border-tc-line",
                    )}
                  >
                    {plan.features.map((feature) => (
                      <li key={feature} className={cx("flex items-start gap-3 text-[15px] leading-6", plan.highlight ? "text-white/90" : "text-tc-ink-2")}>
                        <Check
                          className={cx("mt-0.5 size-[18px] shrink-0", plan.highlight ? "text-[#fec84b]" : "text-tc-violet")}
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-auto pt-9">
                    <GetStartedModal
                      triggerLabel={plan.cta}
                      triggerClassName={cx(
                        buttonClass(plan.highlight ? "light" : plan.name === "Basic" ? "secondary" : "primary", "lg"),
                        "w-full",
                        plan.highlight && "shadow-none",
                        plan.name === "Basic" && "bg-tc-mist shadow-none hover:bg-tc-line",
                      )}
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-9 max-w-[70ch] space-y-2 text-center text-[13.5px] leading-6 text-tc-mute">
              <p className="tabular-nums">
                Yearly savings: 12 months at $5.99 is $71.88. Pro Yearly is $49.99 on Google Play and $50.00 on the App
                Store, about 30% less, after a 14-day free trial. Trial eligibility follows App Store and Google Play
                rules. US store prices as of November 2026.
              </p>
              <p>Reminder delivery depends on your device&apos;s notification permissions and settings.</p>
            </div>
          </Container>
        </section>

        <Section tone="white">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <h2 className="text-balance font-tc-display text-[clamp(34px,4.4vw,56px)] font-semibold leading-[1.04] tracking-[-0.02em] text-tc-ink">
                Pro imports your bookings, watches your flights and connects your AI.
              </h2>
              <p className="max-w-[50ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[18px]">
                Trips, reminders, documents, expenses, and exports are already free. Pro adds the parts that save the most
                time: turning bookings into trips, following flights on the day, and letting your AI assistant help.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {reasons.map((reason) => (
                <Card key={reason.title} as="article" bloom={reason.bloom} className="h-full">
                  <div className="p-6 sm:p-8">
                    <IconTile icon={reason.icon} tone={reason.tile} />
                    <h3 className="mt-10 font-tc-display text-[24px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[26px]">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-7 text-tc-mute">{reason.copy}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="compare" aria-labelledby="compare-heading" tone="canvas" className="scroll-mt-24">
          <Container size="narrow">
            <h2
              id="compare-heading"
              className="text-center font-tc-display text-[clamp(32px,4vw,50px)] font-semibold leading-[1.05] tracking-[-0.02em] text-tc-ink"
            >
              TripCache Basic vs Pro
            </h2>
            <p className="mx-auto mt-4 max-w-[60ch] text-pretty text-center text-[17px] leading-8 text-tc-ink-2">
              Pro adds AI assistant access, booking import from emails, PDFs and screenshots, flight-number autofill, and
              live flight alerts with Live Activity and widgets. Everything else is in Basic, and storage limits are the
              same on both plans.
            </p>
            <PlanTable
              rows={comparisonRows}
              caption="Features included in TripCache Basic (free) and TripCache Pro, with US prices as of November 2026"
              basicLabel="Basic (free)"
              className="mt-10"
            />
          </Container>
        </Section>

        <Section id="faq" aria-labelledby="pricing-faq-heading" tone="white" className="scroll-mt-24">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <h2
                  id="pricing-faq-heading"
                  className="text-balance font-tc-display text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink"
                >
                  TripCache pricing questions
                </h2>
                <p className="mt-5 max-w-[46ch] text-pretty text-[17px] leading-8 text-tc-ink-2">
                  Not sure whether Pro fits your travel workflow? Start the 14-day trial on Pro Yearly, or ask us about
                  email import, live flight alerts, or connecting your AI assistant.
                </p>
                <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
                  <Link href="mailto:support@trip-cache.com?subject=TripCache%20pricing%20question" className={buttonClass("secondary", "lg")}>
                    Contact support
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <GetStartedModal triggerLabel="Download" triggerClassName={buttonClass("primary", "lg")} />
                </div>
                <div className="mt-10 flex items-start gap-3 rounded-[16px] bg-tc-mist p-5 text-[14px] leading-6 text-tc-ink-2">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-tc-violet" aria-hidden="true" />
                  <p>Review the Privacy Policy and the current App Store or Google Play disclosures before uploading sensitive travel documents.</p>
                </div>
              </div>
              <FaqList faqs={pricingFaqs} />
            </div>
          </Container>
        </Section>

        <CtaBand placement="pricing_cta_band" />
      </SitePage>
      <Footer />
    </>
  )
}
