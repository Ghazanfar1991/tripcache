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
      href="mailto:"
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
  const [hasChanged, setHasChanged] = useState(false)
  const [paused, setPaused] = useState(false)
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
    if (paused || pageInactive || reducedMotion) return
    const timer = window.setInterval(() => {
      setHasChanged(true)
      setCurrentSlide((current) => (current + 1) % stories.length)
    }, 10000)
    return () => window.clearInterval(timer)
  }, [pageInactive, paused, reducedMotion, stories.length])

  const story = stories[currentSlide]

  return (
    <div
      className="relative mx-auto min-h-[520px] w-full max-w-[620px] sm:min-h-[590px] min-[940px]:min-h-[620px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-[8%] rounded-full bg-[#e5dac7]" />
      <div className="absolute inset-[14%] rounded-full border border-[#3b3329]/10" />

      <div className="absolute inset-0 z-20" aria-live="polite">
        <div
          key={story.image}
          className={`${hasChanged ? "design-one-story-screen-change " : ""}hero-story-screen absolute inset-x-0 top-1/2 mx-auto w-[210px] sm:w-[245px] min-[940px]:w-[258px]`}
          data-active="true"
        >
          <Image
            src={story.image}
            alt={story.alt}
            width={1250}
            height={2700}
            sizes="(min-width: 940px) 258px, (min-width: 640px) 245px, 210px"
            className="h-auto w-full drop-shadow-[0_55px_58px_rgba(66,49,31,0.25)]"
          />
        </div>
      </div>

      <div
        key={`primary-${story.title}`}
        className={`${hasChanged ? "design-one-story-change " : ""}hero-story-card hero-story-card-primary absolute z-30 hidden w-[210px] p-5 text-white sm:block`}
        data-active="true"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">{story.label}</p>
        <p className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{story.title}</p>
        <p className="mt-2 text-xs leading-5 text-white/80">{story.description}</p>
      </div>

      <div
        key={`secondary-${story.secondTitle}`}
        className={`design-one-glass ${hasChanged ? "design-one-story-change " : ""}hero-story-card hero-story-card-secondary absolute z-30 w-[190px] p-4 sm:w-[200px]`}
        data-active="true"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#602ad2]">{story.secondLabel}</p>
        <p className="mt-2 text-sm font-bold">{story.secondTitle}</p>
        <p className="mt-1 text-[11px] leading-4 text-[#766d62]">{story.secondDescription}</p>
      </div>

      <div className="absolute inset-x-0 bottom-[5%] z-40 flex items-center justify-center gap-2">
        {stories.map((story, index) => (
          <button
            key={story.title}
            type="button"
            onClick={() => {
              setHasChanged(true)
              setCurrentSlide(index)
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
            className="group grid h-11 w-11 touch-manipulation place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#602ad2]/45"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-8 origin-center rounded-full transition-[background-color,transform] duration-150 group-active:scale-[0.96] ${
                index === currentSlide ? "scale-x-100 bg-[#602ad2]" : "scale-x-25 bg-[#3f352a]/25 group-hover:bg-[#3f352a]/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
