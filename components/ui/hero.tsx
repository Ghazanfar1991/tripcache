import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Sparkles } from "lucide-react";
import {
  PHONE_SCREEN_IMAGE_HEIGHT,
  PHONE_SCREEN_IMAGE_WIDTH,
  PHONE_SCREEN_SIZES,
  PHONE_SCREEN_WIDTH,
} from "@/components/ui/phone-screen-size";

const slides = [
  {
    src: "/app-feature-add-everything.webp",
    alt: "TripCache add flights hotels cars activities and tickets screen",
    leftBadge: {
      label: "Trip items",
      title: "Add every booking",
      description: "Hotels, cars, tickets, notes, and more.",
    },
    rightBadge: {
      label: "One itinerary",
      title: "Everything stays together",
      description: "A complete trip view beyond flights.",
    },
  },
  {
    src: "/app-feature-cancellation-reminder.webp",
    alt: "TripCache cancellation reminder screen",
    leftBadge: {
      label: "Reminders",
      title: "Protect free cancellation",
      description: "Deadlines stay visible before they pass.",
    },
    rightBadge: {
      label: "Flexible bookings",
      title: "Cancel in time",
      description: "Get reminded before hotel or car windows close.",
    },
  },
  {
    src: "/app-feature-secure-documents.webp",
    alt: "TripCache secure travel document vault screen",
    leftBadge: {
      label: "Documents",
      title: "Secure travel vault",
      description: "Passports, tickets, and passes stay organized.",
    },
    rightBadge: {
      label: "PIN access",
      title: "Private by design",
      description: "Sensitive travel files stay easy to reach.",
    },
  },
  {
    src: "/app-screenshot-home.webp",
    alt: "TripCache home screen",
    leftBadge: {
      label: "Smart dashboard",
      title: "See active trips fast",
      description: "Flights and updates stay in one view.",
    },
    rightBadge: {
      label: "Mobile-first",
      title: "Built for travel clarity",
      description: "Important details stay visible instantly.",
    },
  },
  {
    src: "/app-screenshot-trip-detail.webp",
    alt: "TripCache trip detail screen",
    leftBadge: {
      label: "Trip timeline",
      title: "Every segment in order",
      description: "Key trip details stay structured.",
    },
    rightBadge: {
      label: "Cleaner workflow",
      title: "Less inbox searching",
      description: "Trip info is easier to scan on the move.",
    },
  },
  {
    src: "/app-screenshot-flight-detail.webp",
    alt: "TripCache flight detail screen",
    leftBadge: {
      label: "Flight updates",
      title: "Track changes live",
      description: "Gate and status stay attached to the trip.",
    },
    rightBadge: {
      label: "Travel ready",
      title: "Everything in one place",
      description: "Flight info stays ready when needed.",
    },
  },
  {
    src: "/app-screenshot-history.webp",
    alt: "TripCache history screen",
    leftBadge: {
      label: "Travel history",
      title: "Look back quickly",
      description: "Past travel stays organized for review.",
    },
    rightBadge: {
      label: "Reporting",
      title: "Better expense visibility",
      description: "A cleaner record helps with reimbursement.",
    },
  },
  {
    src: "/app-screen-trip-map.webp",
    alt: "TripCache trip map screen",
    leftBadge: {
      label: "Trip map",
      title: "See the journey visually",
      description: "Destinations and trip context stay easy to scan.",
    },
    rightBadge: {
      label: "Location aware",
      title: "Know what is nearby",
      description: "Map-based context helps on travel days.",
    },
  },
  {
    src: "/app-screen-expense-management.webp",
    alt: "TripCache expense management screen",
    leftBadge: {
      label: "Expenses",
      title: "Track trip spending",
      description: "Receipts and costs stay tied to each trip.",
    },
    rightBadge: {
      label: "Reports",
      title: "Cleaner reimbursements",
      description: "Expense records are easier to review.",
    },
  },
];

const points = [
  "Flights, hotels, cars, tickets",
  "Free-cancellation reminders",
  "Trip maps and expenses",
  "Secure document vault",
];

export default function Hero() {
  const activeSlide = slides[0];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      <svg className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="hero-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
          </filter>
        </defs>
      </svg>

      <div className="tripcache-hero-sky tripcache-hero-sky-light dark:hidden" />
      <div className="tripcache-hero-sky tripcache-hero-sky-dark hidden dark:block" />
      <div className="tripcache-hero-aurora" />
      <div className="tripcache-hero-routes" />
      <div className="tripcache-hero-grid" />
      <div className="tripcache-hero-grain" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/42 via-white/18 to-white/60 dark:from-black/28 dark:via-black/18 dark:to-black/58" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background dark:to-slate-950" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <main className="grid w-full grid-cols-1 items-start gap-8 pb-6 md:grid-cols-[1.12fr_0.88fr] md:items-center md:gap-6 lg:gap-8 xl:gap-10">
          <div className="mx-auto max-w-[680px] text-center md:mx-0 md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-semibold">
                The Future of Trip Management
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight leading-tight text-foreground sm:text-4xl sm:leading-[1.1] lg:text-[2.75rem] xl:text-5xl">
              <span className="block lg:whitespace-nowrap">
                Smart Travel Management
              </span>
              <span className="block lg:whitespace-nowrap animate-gradient bg-gradient-to-r from-primary via-purple-500 to-accent bg-[length:200%_auto] bg-clip-text text-transparent">
                Your Trips, Supercharged.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg px-2 text-base leading-relaxed text-muted-foreground dark:text-gray-200 sm:px-0 sm:text-lg md:mx-0">
              Organize flights, hotels, rental cars, tickets, documents, and
              free-cancellation reminders in one travel itinerary app.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap md:justify-start">
              <Link
                href="https://apps.apple.com/app/id6758403056"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[220px] shrink-0 transition duration-300 hover:-translate-y-0.5 sm:w-[214px] lg:w-[226px] xl:w-[236px]"
              >
                <img
                  src="/app-store-v3.svg"
                  alt="Download on the App Store"
                  className="block h-auto w-full drop-shadow-lg"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=app.tripcache"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-[220px] shrink-0 transition duration-300 hover:-translate-y-0.5 sm:w-[214px] lg:w-[226px] xl:w-[236px]"
              >
                <img
                  src="/play-store-v3.svg"
                  alt="Get it on Google Play"
                  className="block h-auto w-full drop-shadow-lg"
                />
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground md:justify-start">
              {points.map((point) => (
                <span key={point} className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center overflow-visible py-2 md:justify-end">
            <div className="relative w-full" style={{ maxWidth: "420px" }}>
              <div className="tripcache-phone-backlight" />

              <div className="pointer-events-none absolute left-2 top-8 z-30 hidden w-[132px] rounded-xl border border-border/70 bg-background/80 px-2.5 py-2 text-left shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-black/38 xl:block">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {activeSlide.leftBadge.label}
                </div>
                <div className="mt-1 text-[11px] font-semibold leading-tight text-foreground">
                  {activeSlide.leftBadge.title}
                </div>
                <div className="mt-1 text-[10px] leading-tight text-muted-foreground">
                  {activeSlide.leftBadge.description}
                </div>
              </div>

              <div className="pointer-events-none absolute right-2 top-[56%] z-30 hidden w-[132px] rounded-xl border border-border/70 bg-background/80 px-2.5 py-2 text-left shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-black/38 xl:block">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {activeSlide.rightBadge.label}
                </div>
                <div className="mt-1 text-[11px] font-semibold leading-tight text-foreground">
                  {activeSlide.rightBadge.title}
                </div>
                <div className="mt-1 text-[10px] leading-tight text-muted-foreground">
                  {activeSlide.rightBadge.description}
                </div>
              </div>

              <div className="relative z-20">
                <div
                  className="relative mx-auto"
                  style={{ width: PHONE_SCREEN_WIDTH }}
                >
                  <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-br from-cyan-300/25 via-transparent to-orange-300/20 blur-2xl" />
                  <Image
                    key={activeSlide.src}
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    width={PHONE_SCREEN_IMAGE_WIDTH}
                    height={PHONE_SCREEN_IMAGE_HEIGHT}
                    sizes={PHONE_SCREEN_SIZES}
                    className="relative z-10 h-auto w-full object-contain drop-shadow-[0_24px_66px_rgba(2,6,23,0.65)] transition-opacity duration-700 ease-in-out"
                    priority
                  />

                  <div className="mt-3 flex h-4 items-center justify-center gap-2">
                    {slides.slice(0, 5).map((slide, idx) => (
                      <span
                        key={slide.src}
                        className={`h-1.5 rounded-full ${idx === 0 ? "w-8 bg-primary" : "w-2 bg-border"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
