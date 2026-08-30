import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  CalendarClock,
  CheckCircle2,
  Download,
  FileCheck2,
  FileSpreadsheet,
  Mail,
  MapPinned,
  Plane,
  ReceiptText,
  Sparkles,
  Zap,
} from "lucide-react";

import { Reveal } from "@/components/design-one/reveal";
import {
  DesignOneHeroCarousel,
  DesignOneStoreButtons,
  DesignOneSupportLink,
} from "@/components/design-one/home-interactions";
import { Footer } from "@/components/footer";
import CursorTrailGate from "@/components/ui/CursorTrailGate";

const heroPoints = [
  "Import supported booking emails",
  "Track free-cancellation deadlines",
  "Keep travel documents and receipts",
  "Export business travel expenses",
];

const heroStories = [
  {
    image: "/app-screenshot-import.webp",
    alt: "",
    label: "Email Import",
    title: "Forward confirmations",
    description: "Turn supported booking emails into trip drafts.",
    secondLabel: "Review first",
    secondTitle: "Check every detail",
    secondDescription: "Review and correct each draft before saving it.",
  },
  {
    image: "/app-feature-cancellation-reminder.webp",
    alt: "",
    label: "Cancellation Reminders",
    title: "Keep deadlines visible",
    description: "Set reminders for refundable booking cutoffs.",
    secondLabel: "You stay in control",
    secondTitle: "Choose the deadline",
    secondDescription: "Use the date in your booking confirmation.",
  },
  {
    image: "/app-screen-expense-management.webp",
    alt: "",
    label: "Trip Expenses",
    title: "Track costs by trip",
    description: "Keep receipts and expenses together.",
    secondLabel: "CSV Export",
    secondTitle: "Prepare cleaner records",
    secondDescription: "Export paid-plan records for review or reimbursement.",
  },
  {
    image: "/app-feature-secure-documents.webp",
    alt: "",
    label: "Travel Documents",
    title: "Files beside the trip",
    description: "Keep tickets, passes, and confirmations close.",
    secondLabel: "Trip context",
    secondTitle: "Find what you need",
    secondDescription:
      "Look in the trip instead of across inboxes and screenshots.",
  },
];

const steps = [
  {
    icon: Mail,
    title: "Forward a supported booking",
    description:
      "With the paid plan, forward a flight, hotel, car, tour, or ticket confirmation to your TripCache address.",
    image: "/app-screenshot-import.webp",
  },
  {
    icon: Sparkles,
    title: "Review the trip draft",
    description:
      "TripCache extracts the booking details into a draft that you can check and correct before saving.",
    image: "/app-screenshot-drafts.webp",
  },
  {
    icon: Download,
    title: "Use the organized itinerary",
    description:
      "Keep the itinerary, supported flight-status updates, documents, receipts, and trip records together.",
    image: "/app-screenshot-home.webp",
  },
];

const features = [
  {
    icon: Mail,
    title: "Email Import",
    description:
      "Forward supported confirmations and review the extracted trip draft before you save it.",
    href: "/features/email-to-itinerary",
    linkLabel: "Explore email import",
    images: ["/app-screenshot-import.webp", "/app-screenshot-drafts.webp"],
    layout: "min-[980px]:col-span-7",
  },
  {
    icon: BellRing,
    title: "Cancellation Reminders",
    description:
      "Save the cutoff from your booking and choose when TripCache should remind you.",
    href: "/features/cancellation-reminders",
    linkLabel: "Explore cancellation reminders",
    images: ["/app-feature-cancellation-reminder.webp"],
    layout: "min-[980px]:col-span-5",
  },
  {
    icon: FileCheck2,
    title: "Travel Documents",
    description:
      "Keep tickets, boarding passes, confirmations, visas, and other files attached to the trip.",
    href: "/blog/best-travel-document-organizer-app-2026",
    linkLabel: "Read the document guide",
    images: ["/app-feature-secure-documents.webp"],
    layout: "min-[980px]:col-span-4",
  },
  {
    icon: Plane,
    title: "Flight Status Updates",
    description:
      "See supported flight-status updates alongside the itinerary while checking the provider for final details.",
    href: "/features",
    linkLabel: "See all features",
    images: ["/app-screenshot-flight-detail.webp"],
    layout: "min-[980px]:col-span-4",
  },
  {
    icon: MapPinned,
    title: "Trip Map",
    description:
      "See stays, activities, and other itinerary details together in their destination context.",
    href: "/blog/trip-map-itinerary-planner-app-2026",
    linkLabel: "Read the trip map guide",
    images: ["/app-screen-trip-map.webp"],
    layout: "min-[980px]:col-span-4",
  },
  {
    icon: FileSpreadsheet,
    title: "Trip Expenses and CSV Export",
    description:
      "Track costs, attach receipts, and use the paid plan to export CSV records for review or reimbursement.",
    href: "/features/business-travel-expenses",
    linkLabel: "Explore trip expenses",
    images: [
      "/app-screen-expense-management.webp",
      "/app-screenshot-export.webp",
    ],
    layout: "min-[980px]:col-span-12",
  },
];

const deepDives = [
  {
    id: "cancellation-reminders",
    icon: CalendarClock,
    title: "Set the deadline before the deadline sets the price.",
    subtitle: "Cancellation Reminders",
    description:
      "Record the free-cancellation cutoff shown in your hotel, rental car, tour, or ticket confirmation, then choose when TripCache should remind you. Your booking provider and confirmation remain the authoritative source for cancellation terms.",
    image: "/app-feature-cancellation-reminder.webp",
    href: "/features/cancellation-reminders",
    linkLabel: "See the reminder workflow",
  },
  {
    id: "travel-documents",
    icon: FileCheck2,
    title: "Keep travel documents with the trip.",
    subtitle: "Travel Documents",
    description:
      "Attach boarding passes, tickets, confirmations, visas, passport copies, and other travel files to the trip where you expect to find them.",
    image: "/app-feature-secure-documents.webp",
    href: "/blog/best-travel-document-organizer-app-2026",
    linkLabel: "Read the travel document guide",
  },
  {
    id: "trip-expenses",
    icon: ReceiptText,
    title: "Close out a trip with cleaner records.",
    subtitle: "Trip Expenses and CSV Export",
    description:
      "Track travel costs, attach receipts, and keep the context beside each trip. The paid plan adds CSV exports for reimbursement review, client billing, or personal recordkeeping.",
    image: "/app-screen-expense-management.webp",
    href: "/features/business-travel-expenses",
    linkLabel: "See the expense workflow",
  },
];

const relatedGuides = [
  {
    href: "/blog/organize-travel-confirmation-emails-2026",
    title: "How to organize travel confirmation emails",
  },
  {
    href: "/blog/free-cancellation-reminder-travel-bookings-2026",
    title: "Free cancellation reminder workflow",
  },
  {
    href: "/blog/best-travel-document-organizer-app-2026",
    title: "Best travel document organizer app",
  },
  {
    href: "/blog/business-travel-expense-reporting-app-2026",
    title: "Business travel expense reporting app",
  },
];

const resourceHubs = [
  {
    href: "/features",
    title: "Features",
    description:
      "Compare the TripCache workflows for confirmations, reminders, documents, maps, and expenses.",
  },
  {
    href: "/alternatives",
    title: "Alternatives",
    description:
      "See focused comparisons for travelers moving from another itinerary organizer.",
  },
  {
    href: "/tools",
    title: "Travel Tools",
    description:
      "Use practical tools for planning around booking deadlines and trip details.",
  },
];

const faqs = [
  {
    question: "Is TripCache free?",
    answer:
      "Yes. Basic includes manual trip entry, itinerary viewing, and core trip organization. The paid plan adds email import, reminders, supported flight-status updates, expanded document storage, and CSV exports. Subscriptions are managed in the mobile app.",
  },
  {
    question: "How does booking-email import work?",
    answer:
      "The paid plan gives you a TripCache forwarding address. Send a supported booking confirmation to that address and TripCache extracts the details into a draft. You review and correct the draft before adding it to your itinerary.",
  },
  {
    question: "How do free-cancellation reminders work?",
    answer:
      "You enter the cutoff from your refundable booking and choose when TripCache should remind you. Always confirm the final deadline and cancellation terms with the hotel, airline, rental company, tour operator, or other booking provider.",
  },
  {
    question: "Can I keep travel documents with an itinerary?",
    answer:
      "Yes. You can attach boarding passes, tickets, confirmations, visas, passport copies, and other travel files to the relevant trip so they are easier to find in context.",
  },
  {
    question: "Can I track expenses and export a CSV?",
    answer:
      "You can track costs and attach receipts to a trip. The paid plan includes CSV exports for reimbursement review, client billing, or personal recordkeeping.",
  },
  {
    question: "Does TripCache replace airline or booking-provider updates?",
    answer:
      "No. TripCache can show supported flight-status updates, but airline, airport, and booking-provider information remains authoritative and can change or arrive late.",
  },
  {
    question: "Does TripCache work on iPhone and Android?",
    answer:
      "Yes. TripCache is available from the Apple App Store and Google Play, and this page links directly to both official listings.",
  },
];

const searchSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://trip-cache.com/#faq",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "ItemList",
      name: "TripCache travel organization guides",
      itemListElement: relatedGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://trip-cache.com${guide.href}`,
        name: guide.title,
      })),
    },
  ],
};

function Eyebrow({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <div
      className={`journal-eyebrow ${inverse ? "journal-eyebrow-inverse" : ""}`}
    >
      {children}
    </div>
  );
}

export function DesignOneHome() {
  return (
    <main className="journal-paper min-h-screen overflow-hidden text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <section className="design-one-hero cursor-trail-region relative min-h-screen min-[940px]:min-h-[100svh]">
        <div className="design-one-hero-atmosphere" aria-hidden="true" />
        <div className="cursor-trail-layer" aria-hidden="true">
          <CursorTrailGate />
        </div>
        <div className="cursor-trail-content mx-auto grid min-h-screen max-w-[1380px] items-center gap-5 px-5 pb-12 pt-28 sm:px-8 sm:pt-28 min-[940px]:min-h-[100svh] min-[940px]:grid-cols-[minmax(0,1.02fr)_minmax(27rem,0.98fr)] min-[940px]:gap-10 min-[940px]:px-12 min-[940px]:pb-10 min-[940px]:pt-24">
          <div className="design-one-hero-copy relative mx-auto max-w-[650px] py-3 text-center min-[940px]:mx-0 min-[940px]:py-8 min-[940px]:text-start">
            <Reveal
              delay={70}
              className="design-one-critical-reveal design-one-hero-reveal"
            >
              <h1 className="design-one-display-home">
                Turn booking emails into one organized travel itinerary.
              </h1>
            </Reveal>
            <Reveal delay={150} className="design-one-hero-reveal">
              <p className="design-one-hero-lede mx-auto mt-6 max-w-[590px] text-base leading-7 sm:text-lg sm:leading-8 min-[940px]:mx-0">
                Forward flight, hotel, car, tour, and ticket confirmations to
                TripCache. Review your itinerary, track free-cancellation
                deadlines, and keep documents, receipts, and expenses together.
              </p>
            </Reveal>
            <Reveal
              delay={220}
              className="design-one-hero-reveal mt-7 flex justify-center min-[940px]:justify-start"
            >
              <DesignOneStoreButtons />
            </Reveal>
            <Reveal
              delay={280}
              className="design-one-hero-points design-one-hero-reveal mx-auto mt-5 grid max-w-[35rem] gap-x-7 gap-y-2.5 text-start text-[13px] font-medium min-[520px]:grid-cols-2 min-[940px]:mx-0"
            >
              {heroPoints.map((point) => (
                <span key={point} className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-[#602ad2]" />
                  {point}
                </span>
              ))}
            </Reveal>
            <Reveal delay={330} className="design-one-hero-reveal">
              <p className="mx-auto mt-5 max-w-[34rem] text-xs leading-5 text-[#746c61] min-[940px]:mx-0">
                Free to download. Basic supports manual trip entry; the paid
                plan adds booking-email import and CSV exports.
              </p>
            </Reveal>
          </div>
          <DesignOneHeroCarousel stories={heroStories} />
        </div>
      </section>

      <div className="design-one-hero-blend" aria-hidden="true">
        <div />
        <div />
        <div />
        <div />
      </div>

      <section
        id="how-it-works"
        className="bg-[#121212] px-5 py-24 text-[#f7f2e9] sm:px-8 min-[940px]:py-32"
      >
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="grid gap-8 min-[900px]:grid-cols-[0.82fr_1.18fr] min-[900px]:items-end min-[900px]:gap-20">
            <div>
              <Eyebrow inverse>How It Works</Eyebrow>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
                Turn booking confirmation emails into an itinerary.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#b9b0a3] min-[900px]:justify-self-end">
              Forward a supported confirmation, review the extracted draft, and
              keep the details with the trip.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-5 min-[860px]:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal
                  key={step.title}
                  delay={index * 80}
                  as="article"
                  className="rounded-[28px] bg-white/[0.055] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-7"
                >
                  <div className="relative flex h-[310px] items-start justify-center overflow-hidden rounded-[22px] bg-[#2b175b] pt-7">
                    <Image
                      src={step.image}
                      alt=""
                      width={1250}
                      height={2700}
                      sizes="164px"
                      className="relative w-[164px] drop-shadow-[0_24px_32px_rgba(0,0,0,0.34)]"
                    />
                  </div>
                  <div className="mt-7 flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#602ad2] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-white/60">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#b2b2b2]">
                    {step.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-24 sm:px-8 min-[940px]:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mx-auto max-w-4xl text-center">
            <Eyebrow>
              <Zap className="h-3.5 w-3.5" /> Feature Overview
            </Eyebrow>
            <h2 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl">
              The post-booking details, organized around one trip.
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#666666]">
              Move from confirmation emails to a usable itinerary, then keep
              deadlines, documents, flight information, maps, and expense
              records close.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-5 min-[680px]:grid-cols-2 min-[980px]:grid-cols-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal
                  key={feature.title}
                  delay={(index % 3) * 70}
                  as="article"
                  className={`journal-feature-card ${feature.layout}`}
                >
                  <div className="relative hidden h-[255px] items-start justify-center overflow-hidden rounded-[24px] bg-[#e7ddcd] pt-7 min-[680px]:flex">
                    {feature.images.length === 2 ? (
                      <>
                        <Image
                          src={feature.images[0]}
                          alt=""
                          width={1250}
                          height={2700}
                          sizes="(min-width: 980px) 165px, (min-width: 680px) 135px, 145px"
                          className="journal-feature-phone journal-feature-phone-import"
                        />
                        <Image
                          src={feature.images[1]}
                          alt=""
                          width={1250}
                          height={2700}
                          sizes="(min-width: 980px) 165px, (min-width: 680px) 135px, 145px"
                          className="journal-feature-phone journal-feature-phone-draft"
                        />
                      </>
                    ) : (
                      <Image
                        src={feature.images[0]}
                        alt=""
                        width={1250}
                        height={2700}
                        sizes="165px"
                        className="w-[165px] drop-shadow-[0_22px_28px_rgba(68,50,32,0.2)]"
                      />
                    )}
                  </div>
                  <div className="px-1 pt-7">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#e8e0ff] text-[#602ad2]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-7 text-[#666666]">
                      {feature.description}
                    </p>
                    <Link
                      href={feature.href}
                      prefetch={false}
                      className="design-one-press group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#e8e0ff] px-5 text-sm font-semibold text-[#4d20af] transition-colors hover:bg-[#ddd0ff]"
                    >
                      {feature.linkLabel}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eee7dc] px-5 py-24 sm:px-8 min-[940px]:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mx-auto mb-20 max-w-3xl text-center min-[940px]:mb-28">
            <Eyebrow>Three details worth a closer look</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl">
              Deadlines, documents, and trip expenses in context.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#665f56]">
              These are the details most likely to become scattered after a
              booking is confirmed.
            </p>
          </Reveal>
          <div className="space-y-20 min-[940px]:space-y-28">
            {deepDives.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="grid items-center gap-12 min-[860px]:grid-cols-2 min-[860px]:gap-16"
                >
                  <Reveal className={index % 2 ? "min-[860px]:order-2" : ""}>
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#602ad2]">
                      <Icon className="h-4.5 w-4.5" />
                      {item.subtitle}
                    </div>
                    <h3 className="mt-6 text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl">
                      {item.title}
                    </h3>
                    <p className="mt-7 max-w-xl text-lg leading-8 text-[#666666]">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="design-one-press group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#121212] px-5 text-sm font-semibold text-[#f7f2e9] transition-colors hover:bg-[#292929]"
                    >
                      {item.linkLabel}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </Reveal>
                  <Reveal
                    delay={110}
                    className={`relative mx-auto flex min-h-[460px] w-full max-w-[540px] items-center justify-center rounded-[34px] bg-[#e3d6c3] px-8 ${index % 2 ? "min-[860px]:order-1" : ""}`}
                  >
                    <div className="absolute inset-[12%] rounded-full border border-[#3f352a]/10" />
                    <Image
                      src={item.image}
                      alt=""
                      width={1250}
                      height={2700}
                      sizes="(min-width: 640px) 250px, 220px"
                      className="relative z-10 h-auto w-[220px] drop-shadow-[0_38px_42px_rgba(61,44,28,0.24)] sm:w-[250px]"
                    />
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="plans"
        className="scroll-mt-24 bg-[#121212] px-5 py-24 text-[#f7f2e9] sm:px-8 min-[940px]:scroll-mt-28 min-[940px]:py-28"
      >
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="grid gap-8 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:items-end min-[900px]:gap-20">
            <div>
              <Eyebrow inverse>Plans and Trust</Eyebrow>
              <h2 className="mt-6 text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl">
                Start manually. Add automation when it helps.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#b9b0a3] min-[900px]:justify-self-end">
              TripCache is free to download. Choose the workflow that matches
              how much post-booking work you want the app to handle.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 min-[760px]:grid-cols-2">
            <Reveal
              as="article"
              className="rounded-[28px] bg-white/[0.055] p-7 sm:p-9"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#a98af0]">
                Basic
              </p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                Organize trips manually
              </h3>
              <ul className="mt-7 space-y-4 text-[#c3baae]">
                {[
                  "Manual trip entry",
                  "Itinerary viewing",
                  "Core trip organization",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#a98af0]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              as="article"
              delay={80}
              className="rounded-[28px] bg-[#602ad2] p-7 text-white sm:p-9"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-white/70">
                Paid plan
              </p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                Add automation and exports
              </h3>
              <ul className="mt-7 space-y-4 text-white/80">
                {[
                  "Booking-email import",
                  "Cancellation reminders and supported flight-status updates",
                  "CSV expense exports and expanded document storage",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-8 grid gap-3 rounded-[26px] bg-white/[0.045] p-6 text-sm text-[#c3baae] min-[720px]:grid-cols-3 sm:p-8">
            <p className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#a98af0]" />{" "}
              Review imported drafts before saving.
            </p>
            <p className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#a98af0]" />{" "}
              You choose the cancellation deadline.
            </p>
            <p className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#a98af0]" />{" "}
              Travel providers remain authoritative.
            </p>
          </Reveal>

          <Reveal className="mt-5 max-w-3xl text-sm leading-6 text-[#a59b8e]">
            Before adding sensitive travel files, review our{" "}
            <Link href="/privacy" prefetch={false} className="font-semibold text-[#d8c9ff] underline decoration-white/25 underline-offset-4 hover:text-white">
              Privacy Policy
            </Link>{" "}
            and the current{" "}
            <Link href="https://apps.apple.com/app/id6758403056" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#d8c9ff] underline decoration-white/25 underline-offset-4 hover:text-white">
              App Store
            </Link>{" "}
            or{" "}
            <Link href="https://play.google.com/store/apps/details?id=app.tripcache" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#d8c9ff] underline decoration-white/25 underline-offset-4 hover:text-white">
              Google Play
            </Link>{" "}
            disclosures.
          </Reveal>

          <Reveal className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/pricing"
              prefetch={false}
              className="design-one-press group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#121212] transition-colors hover:bg-[#eee7dc]"
            >
              Compare plans
              <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <p className="text-sm text-[#a59b8e]">
              Available for iPhone and Android.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 min-[940px]:py-28">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="grid gap-8 min-[900px]:grid-cols-[0.85fr_1.15fr] min-[900px]:items-end min-[900px]:gap-20">
            <div>
              <Eyebrow>
                <MapPinned className="h-3.5 w-3.5" /> Explore
              </Eyebrow>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
                Find the next useful detail.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#666666] min-[900px]:justify-self-end">
              Browse product workflows, comparisons, travel tools, or a focused
              guide for the task in front of you.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 min-[760px]:grid-cols-3">
            {resourceHubs.map((hub, index) => (
              <Reveal key={hub.href} delay={index * 60} as="article">
                <Link
                  href={hub.href}
                  prefetch={false}
                  className="design-one-press group flex h-full min-h-52 flex-col justify-between rounded-[26px] bg-white/50 p-7 shadow-[0_1px_0_rgba(255,255,255,0.7),0_18px_48px_rgba(72,53,33,0.06)] transition-colors hover:bg-white/75"
                >
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.035em]">
                      {hub.title}
                    </h3>
                    <p className="mt-3 leading-7 text-[#666666]">
                      {hub.description}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-6 h-5 w-5 text-[#602ad2] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-[30px] bg-[#121212] p-7 text-[#f7f2e9] sm:p-10">
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-5 w-5 text-[#9673e7]" />
              <h3 className="text-2xl font-semibold tracking-[-0.035em]">
                Practical travel organization guides
              </h3>
            </div>
            <div className="mt-8 grid gap-3 min-[520px]:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  prefetch={false}
                  className="design-one-press group flex min-h-28 flex-col justify-between rounded-2xl bg-white/[0.065] p-5 text-sm font-semibold leading-6 transition-colors duration-150 hover:bg-white/[0.1]"
                >
                  {guide.title}
                  <ArrowUpRight className="mt-4 h-4 w-4 text-[#9673e7] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="faq"
        className="journal-faq px-5 py-20 sm:px-8 min-[940px]:py-28"
      >
        <script
          id="homepage-search-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchSchema).replace(/</g, "\\u003c"),
          }}
        />
        <div className="mx-auto max-w-[1080px]">
          <Reveal className="max-w-[820px]">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Frequently asked questions
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#666666]">
              Straight answers about pricing, availability, email import,
              deadlines, and travel records.
            </p>
          </Reveal>
          <div className="mt-14 space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={(index % 3) * 45}>
                <details
                  open={index === 0}
                  className="group rounded-[22px] bg-white/46 px-6 shadow-[0_1px_0_rgba(255,255,255,0.7),0_16px_44px_rgba(72,53,33,0.055)] sm:px-8"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold marker:content-none sm:text-xl">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e5dcff] text-xl font-normal text-[#602ad2] transition-transform duration-150 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-7 leading-7 text-[#666666]">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 rounded-[30px] bg-[#602ad2] p-8 text-center text-white sm:p-12">
            <h3 className="text-2xl font-semibold">Still have questions?</h3>
            <p className="mt-2 text-white/76">
              Contact the TripCache support team for setup or billing help.
            </p>
            <DesignOneSupportLink className="design-one-press mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 font-semibold text-[#121212] shadow-[0_12px_28px_rgba(58,24,135,0.2)]">
              Contact support
            </DesignOneSupportLink>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 pt-8 sm:px-8 min-[940px]:pb-32">
        <Reveal className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[36px] bg-[#121212] px-6 py-16 text-center text-[#f7f2e9] sm:px-10 sm:py-20">
          <div
            className="pointer-events-none absolute inset-x-[15%] -top-32 h-64 rounded-full bg-[#602ad2]/35 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a98af0]">
              Available now
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl">
              Put the next trip in one organized place.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#b9b0a3]">
              Download TripCache for iPhone or Android. Start with manual trip
              entry, then add paid automation and exports if they fit your
              workflow.
            </p>
            <div className="mt-8 flex justify-center">
              <DesignOneStoreButtons placement="homepage_final_cta" />
            </div>
          </div>
        </Reveal>
      </section>

      <Footer description="Post-booking travel organizer for booking emails, cancellation deadlines, receipts, and trip documents." />
    </main>
  );
}
