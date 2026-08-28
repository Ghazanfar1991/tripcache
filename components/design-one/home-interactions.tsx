"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

type HeroStory = {
  image: string
  alt: string
  label: string
  title: string
  description: string
  secondLabel: string
  secondTitle: string
  secondDescription: string
}

const HERO_STORY_INTERVAL_MS = 6000

const storeLinks = {
  ios: "https://apps.apple.com/app/id6758403056",
  android: "https://play.google.com/store/apps/details?id=app.tripcache",
}

function trackStoreClick(platform: "ios" | "android") {
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", name: string, parameters: Record<string, string>) => void
  }

  analyticsWindow.gtag?.("event", platform === "ios" ? "app_store_click" : "play_store_click", {
    platform,
    placement: "homepage_hero",
  })
}

export function DesignOneStoreButtons() {
  return (
    <div className="flex w-full max-w-[17.5rem] flex-col gap-3 min-[430px]:max-w-none min-[430px]:flex-row">
      <Link
        href={storeLinks.ios}
        target="_blank"
        rel="noopener noreferrer"
        data-store-event-handled="true"
        onClick={() => trackStoreClick("ios")}
        className="design-one-press block w-full min-[430px]:w-[13.5rem]"
      >
        <Image src="/app-store-v3.svg" alt="Download on the App Store" width={540} height={160} className="block h-auto w-full" />
      </Link>
      <Link
        href={storeLinks.android}
        target="_blank"
        rel="noopener noreferrer"
        data-store-event-handled="true"
        onClick={() => trackStoreClick("android")}
        className="design-one-press block w-full min-[430px]:w-[13.5rem]"
      >
        <Image src="/play-store-v3.svg" alt="Get it on Google Play" width={540} height={160} className="block h-auto w-full" />
      </Link>
    </div>
  )
}

export function DesignOneSupportLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="#faq"
      className={className}
      onClick={(event) => {
        event.preventDefault()
        window.location.href = ["mailto:support", "trip-cache.com"].join("@")
      }}
    >
      {children}
    </a>
  )
}

export function DesignOneHeroCarousel({ stories }: { stories: HeroStory[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [pageInactive, setPageInactive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setReducedMotion(media.matches)
    const updateVisibility = () => setPageInactive(document.hidden)
    const markInactive = () => setPageInactive(true)
    const markActive = () => setPageInactive(document.hidden)

    updateMotionPreference()
    updateVisibility()
    media.addEventListener("change", updateMotionPreference)
    document.addEventListener("visibilitychange", updateVisibility)
    window.addEventListener("blur", markInactive)
    window.addEventListener("focus", markActive)

    return () => {
      media.removeEventListener("change", updateMotionPreference)
      document.removeEventListener("visibilitychange", updateVisibility)
      window.removeEventListener("blur", markInactive)
      window.removeEventListener("focus", markActive)
    }
  }, [])

  useEffect(() => {
    if (pageInactive || reducedMotion || stories.length < 2) return
    const timer = window.setTimeout(() => {
      const lastSlide = stories.length - 1
      const nextSlide = currentSlide + direction

      if (nextSlide >= lastSlide) {
        setDirection(-1)
        setCurrentSlide(lastSlide)
      } else if (nextSlide <= 0) {
        setDirection(1)
        setCurrentSlide(0)
      } else {
        setCurrentSlide(nextSlide)
      }
    }, HERO_STORY_INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [currentSlide, direction, pageInactive, reducedMotion, stories.length])

  const story = stories[currentSlide]

  const selectSlide = (index: number) => {
    const lastSlide = stories.length - 1
    const nextDirection = index === 0 ? 1 : index === lastSlide ? -1 : index >= currentSlide ? 1 : -1
    setDirection(nextDirection)
    setCurrentSlide(index)
  }

  return (
    <div className="relative mx-auto min-h-[560px] w-full max-w-[620px] sm:min-h-[640px] min-[940px]:min-h-[670px]">
      <div className="absolute inset-0 z-20">
        {stories.map((slide, index) => (
          <div
            key={slide.image}
            className="hero-story-screen absolute inset-x-0 top-1/2 mx-auto w-[210px] sm:w-[245px] min-[940px]:w-[258px]"
            data-active={index === currentSlide ? "true" : "false"}
            aria-hidden={index !== currentSlide}
          >
            <Image
              src={`${slide.image}?surface=hero`}
              alt={slide.alt}
              width={1250}
              height={2700}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(min-width: 940px) 258px, (min-width: 640px) 245px, 210px"
              className="h-auto w-full drop-shadow-[0_55px_58px_rgba(66,49,31,0.25)]"
            />
          </div>
        ))}
      </div>

      {stories.map((slide, index) => (
        <div
          key={`primary-${slide.title}`}
          className="hero-story-card hero-story-card-primary absolute z-30 hidden w-[210px] p-5 text-white sm:block"
          data-active={index === currentSlide ? "true" : "false"}
          aria-hidden={index !== currentSlide}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">{slide.label}</p>
          <p className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{slide.title}</p>
          <p className="mt-2 text-xs leading-5 text-white/80">{slide.description}</p>
        </div>
      ))}

      {stories.map((slide, index) => (
        <div
          key={`secondary-${slide.secondTitle}`}
          className="design-one-glass hero-story-card hero-story-card-secondary absolute z-30 w-[190px] p-4 sm:w-[200px]"
          data-active={index === currentSlide ? "true" : "false"}
          aria-hidden={index !== currentSlide}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#602ad2]">{slide.secondLabel}</p>
          <p className="mt-2 text-sm font-bold">{slide.secondTitle}</p>
          <p className="mt-1 text-[11px] leading-4 text-[#766d62]">{slide.secondDescription}</p>
        </div>
      ))}

      <p className="sr-only" aria-live="polite">Showing screen {currentSlide + 1} of {stories.length}: {story.title}</p>

      <div className="absolute inset-x-0 top-[calc(50%+215px)] z-40 flex items-center justify-center sm:top-[calc(50%+250px)] min-[940px]:top-[calc(50%+264px)]">
        <div className="inline-flex items-center" role="group" aria-label="Featured TripCache screens">
        {stories.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => selectSlide(index)}
            aria-label={`Show screen ${index + 1}: ${slide.title}`}
            aria-pressed={index === currentSlide}
            aria-current={index === currentSlide ? "true" : undefined}
            data-active={index === currentSlide ? "true" : "false"}
            data-direction={direction === 1 ? "next" : "previous"}
            className="hero-story-dot-button group relative h-8 w-7 touch-manipulation rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#602ad2]/45 focus-visible:ring-offset-2"
          >
            <span
              aria-hidden="true"
              className="hero-story-dot"
            />
          </button>
        ))}
        </div>
      </div>
    </div>
  )
}
