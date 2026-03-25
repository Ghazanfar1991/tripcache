"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {ArrowRight, Sparkles} from "lucide-react"
import { SectionContainer } from "./section-container"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  const screenshots = [
    "/app-screenshot-home.webp", // 1: Home
    "/app-screenshot-trip-detail.webp", // 2: Trip details
    "/app-screenshot-flight-detail.webp", // 3: Flight details
    "/app-screenshot-history.webp", // 4: History
    "/app-screenshot-documents.webp", // 5: Documents
    "/app-screenshot-drafts.webp", // 6: Drafts
  ]

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [screenshots.length, paused])

  return (
    // OPTIMIZED: Adjusted pt-20 to pt-24 for better mobile clearing of navbars
    // Added overflow-x-hidden to strictly prevent horizontal scroll
    <section className="relative flex items-center pt-16 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden">

      {/* Enhanced Background Effects - Reduced blur for performance */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/15 rounded-full blur-[80px] opacity-40" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent/8 rounded-full blur-[60px] opacity-25" />
      </div>

      <SectionContainer className="relative z-10 w-full flex flex-col items-center px-4 sm:px-6 -mt-16">
        {/* OPTIMIZED: Changed gap-10 to gap-12 for better vertical breathing room on mobile */}
        <div className="w-full max-w-6xl grid items-center justify-items-center lg:justify-items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Content - Simplified animation for better LCP */}
          <div
            className="w-full max-w-xl mx-auto text-center lg:text-left space-y-5 sm:space-y-6"
          >
            {/* Badge - Static for LCP */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-xs sm:text-sm font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="font-semibold">The Future of Trip Management</span>
            </div>

            {/* Headline */}
            {/* OPTIMIZED: Adjusted leading and font sizes for mobile readability */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight sm:leading-[1.1] text-foreground">
              Smart Travel Management<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient bg-[length:200%_auto]">
                Your Trips, Supercharged.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed dark:text-gray-200 px-2 sm:px-0">
              The best TripCase alternative. Forward booking emails, automatically organize flight itineraries, and export travel expenses.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-nowrap justify-center lg:justify-start gap-4 sm:gap-3 w-full max-w-md mx-auto lg:mx-0 pt-4">
              <Link
                href="https://apps.apple.com/app/id6758403056"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image
                  src="/app-store.svg"
                  alt="Download on the App Store"
                  width={160}
                  height={48}
                  className="w-48 sm:w-54 md:w-[250px] h-auto"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=app.tripcache"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image
                  src="/play-store.svg"
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                  className="w-48 sm:w-54 md:w-[250px] h-auto"
                />
              </Link>
            </div>
          </div>

          {/* Right Visual - Enhanced with Smooth Transitions */}
          <div className="relative perspective-1000 w-full flex flex-col items-center justify-center gap-4 -mt-16">
            <motion.div
              className="relative z-20"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* OPTIMIZED: Keep mobile widths original; desktop preview scaled down ~16% from original (with +5% vs prior change) */}
              <div className="relative mx-auto w-[220px] xs:w-[240px] sm:w-[236px] aspect-[9/19] group shadow-2xl">
                {/* Smooth Screenshot Transitions */}
                <div className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={screenshots[currentSlide] || "/placeholder.svg"}
                        alt="App Screenshot"
                        fill
                        className="object-cover"
                        priority
                        loading="eager"
                        fetchPriority="high"
                        sizes="(max-width: 480px) 220px, (max-width: 768px) 240px, 236px"
                        quality={80}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Reduced Glow Behind Phone for performance */}
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-purple-500/15 to-accent/20 blur-[40px] -z-10 pointer-events-none" />
              </div>
            </motion.div>
            {/* Slide Dots: clickable and pause on hover */}
            <div className="flex items-center justify-center gap-2 relative z-30">
              {screenshots.map((_, idx) => {
                const isActive = idx === currentSlide
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${isActive ? "bg-primary scale-110" : "bg-muted-foreground/40 hover:bg-primary/70"
                      }`}
                    aria-label={`View app screenshot ${idx + 1}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
