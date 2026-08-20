"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { BadgeCheck, Sparkles } from "lucide-react"
import {
  PHONE_SCREEN_IMAGE_HEIGHT,
  PHONE_SCREEN_IMAGE_WIDTH,
  PHONE_SCREEN_SIZES,
  PHONE_SCREEN_WIDTH,
} from "@/components/ui/phone-screen-size"

const slides = [
  {
    src: "/app-screenshot-import.webp",
    alt: "TripCache booking confirmation email import screen",
    leftBadge: {
      label: "Travel inbox",
      title: "Forward confirmations",
      description: "Turn booking emails into trip drafts.",
    },
    rightBadge: {
      label: "Review first",
      title: "Keep the details accurate",
      description: "Check each draft before saving it.",
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
    src: "/app-screen-expense-management.webp",
    alt: "TripCache business travel expense management screen",
    leftBadge: {
      label: "Business travel",
      title: "Track costs by trip",
      description: "Keep receipts and expenses together.",
    },
    rightBadge: {
      label: "Reports",
      title: "Export cleaner records",
      description: "Prepare CSVs for reimbursement or review.",
    },
  },
  {
    src: "/app-feature-secure-documents.webp",
    alt: "TripCache travel document organization screen",
    leftBadge: {
      label: "Documents",
      title: "Files beside the trip",
      description: "Keep tickets, passes, and confirmations close.",
    },
    rightBadge: {
      label: "Trip context",
      title: "Find what you need faster",
      description: "Avoid digging through inboxes and screenshots.",
    },
  },
]

const points = [
  "Forward booking emails",
  "Free-cancellation reminders",
  "Trip documents and receipts",
  "Business travel expense records",
]

function trackStoreClick(platform: "ios" | "android") {
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", name: string, parameters: Record<string, string>) => void
  }

  analyticsWindow.gtag?.("event", platform === "ios" ? "app_store_click" : "play_store_click", {
    platform,
    placement: "homepage_hero",
  })
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const activeSlide = slides[currentSlide]

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (!container) return

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (isActive) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3800)

    return () => clearInterval(timer)
  }, [isActive])

  return (
    <section ref={containerRef} className="relative min-h-[100svh] overflow-hidden bg-background">
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
      <div className="absolute inset-0 bg-gradient-to-b from-white/42 via-white/18 to-white/60 dark:from-slate-950/88 dark:via-slate-950/76 dark:to-slate-950/94" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_76%_38%,rgba(14,165,233,0.16),transparent_26%),radial-gradient(circle_at_24%_42%,rgba(124,58,237,0.12),transparent_30%),linear-gradient(90deg,rgba(2,6,23,0.9),rgba(2,6,23,0.68)_48%,rgba(2,6,23,0.86))] dark:block" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <main className="grid w-full grid-cols-1 items-start gap-8 pb-6 md:grid-cols-[1.12fr_0.88fr] md:items-center md:gap-6 lg:gap-8 xl:gap-10">
          <div className="mx-auto max-w-[680px] text-center md:mx-0 md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-semibold">Post-booking travel organizer</span>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight leading-tight text-foreground sm:text-4xl sm:leading-[1.1] lg:text-[2.75rem] xl:text-5xl">
              <span className="block lg:whitespace-nowrap">Forward travel emails.</span>
              <span className="block lg:whitespace-nowrap animate-gradient bg-gradient-to-r from-primary via-purple-500 to-accent bg-[length:200%_auto] bg-clip-text text-transparent">
                Never miss deadlines.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg px-2 text-base leading-relaxed text-muted-foreground dark:text-gray-200 sm:px-0 sm:text-lg md:mx-0">
              TripCache turns booking confirmations into organized itineraries, protects free-cancellation deadlines,
              and keeps travel documents, receipts, flights, stays, and expenses together.
            </p>
<div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap md:justify-start">
  <Link
    href="https://apps.apple.com/app/id6758403056"
    target="_blank"
    rel="noopener noreferrer"
    data-store-event-handled="true"
    onClick={() => trackStoreClick("ios")}
    className="block w-[220px] shrink-0 transition duration-300 hover:-translate-y-0.5 sm:w-[214px] lg:w-[226px] xl:w-[236px]"
  >
    <img
      src="/app-store-v3.svg"
      alt="Download on the App Store"
      className="block h-auto w-full"
    />
  </Link>

  <Link
    href="https://play.google.com/store/apps/details?id=app.tripcache"
    target="_blank"
    rel="noopener noreferrer"
    data-store-event-handled="true"
    onClick={() => trackStoreClick("android")}
    className="block w-[220px] shrink-0 transition duration-300 hover:-translate-y-0.5 sm:w-[214px] lg:w-[226px] xl:w-[236px]"
  >
    <img
      src="/play-store-v3.svg"
      alt="Get it on Google Play"
      className="block h-auto w-full"
    />
  </Link>
</div>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground dark:text-slate-200/80 md:justify-start">
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

              <div className="pointer-events-none absolute left-2 top-8 z-30 hidden w-[132px] rounded-xl border border-border/70 bg-background/80 px-2.5 py-2 text-left shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-slate-950/78 dark:shadow-cyan-950/30 xl:block">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">{activeSlide.leftBadge.label}</div>
                <div className="mt-1 text-[11px] font-semibold leading-tight text-foreground">{activeSlide.leftBadge.title}</div>
                <div className="mt-1 text-[10px] leading-tight text-muted-foreground dark:text-slate-200/80">{activeSlide.leftBadge.description}</div>
              </div>

              <div className="pointer-events-none absolute right-2 top-[56%] z-30 hidden w-[132px] rounded-xl border border-border/70 bg-background/80 px-2.5 py-2 text-left shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-slate-950/78 dark:shadow-cyan-950/30 xl:block">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">{activeSlide.rightBadge.label}</div>
                <div className="mt-1 text-[11px] font-semibold leading-tight text-foreground">{activeSlide.rightBadge.title}</div>
                <div className="mt-1 text-[10px] leading-tight text-muted-foreground dark:text-slate-200/80">{activeSlide.rightBadge.description}</div>
              </div>

              <div className="relative z-20">
                <div
                  className="relative mx-auto"
                  style={{
                    width: PHONE_SCREEN_WIDTH,
                    aspectRatio: `${PHONE_SCREEN_IMAGE_WIDTH} / ${PHONE_SCREEN_IMAGE_HEIGHT}`,
                  }}
                >
                  <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-br from-cyan-300/25 via-transparent to-orange-300/20 blur-2xl" />
                  <Image
                    key={activeSlide.src}
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    fill
                    sizes={PHONE_SCREEN_SIZES}
                    className="relative z-10 object-contain drop-shadow-[0_24px_66px_rgba(2,6,23,0.65)] transition-opacity duration-700 ease-in-out"
                    priority
                  />
                </div>

                <div className="mt-3 flex h-4 items-center justify-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/70 dark:bg-white/30 dark:hover:bg-white/55"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

       </section>
  )
}
