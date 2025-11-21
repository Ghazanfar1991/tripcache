"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { useMailchimpWaitlist } from "@/hooks/use-mailchimp-waitlist"
import { SectionContainer } from "./section-container"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { email, setEmail, status, message, handleSubmit, reset } = useMailchimpWaitlist()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])

  const screenshots = [
    "/app-screenshot-home.jpg",
    "/app-screenshot-trip-detail.jpg",
    "/app-screenshot-history.jpg",
    "/app-screenshot-flight-detail.jpg",
    "/app-screenshot-documents.jpg",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [screenshots.length])

  return (
    <section className="relative flex items-center pt-25 pb-12 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 animate-glow" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[100px] opacity-30" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <SectionContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-5"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">The Future of Trip Management</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-foreground">
              Travel Management App<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient bg-[length:200%_auto]">
                Manage Trips Like a Pro.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed dark:text-gray-200">
              The best TripCase alternative. Forward booking emails, automatically organize flight itineraries, and export travel expenses.
            </p>

            {/* Waitlist Form */}
            <form onSubmit={handleSubmit} className="relative group max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-background rounded-full p-1.5 pr-2 border border-border">
                <input
                  type="email"
                  name="EMAIL"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== "idle") reset()
                  }}
                  placeholder="Enter your email..."
                  className="flex-1 bg-transparent border-none px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === "loading" ? "Joining..." : "Join Waitlist"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center justify-center lg:justify-start gap-2 text-sm font-medium ${status === "success" ? "text-emerald-500" : "text-red-500"}`}
              >
                {status === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message}
              </motion.div>
            )}

            {/* Coming Soon App Store Buttons */}
            <div className="flex items-center justify-center lg:justify-start -mt-15 gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="relative opacity-40 hover:opacity-50 transition-opacity cursor-not-allowed">
                  <Image src="/app-store.svg" alt="App Store" width={235} height={145} className="select-none" />
                </div>
                <span className="text-[11px] font-medium -mt-15 text-muted-foreground">Coming Soon</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="relative opacity-40 hover:opacity-50 transition-opacity cursor-not-allowed">
                  <Image src="/play-store.svg" alt="Google Play" width={235} height={145} className="select-none" />
                </div>
                <span className="text-[11px] font-medium -mt-15 text-muted-foreground">Coming Soon</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual - Enhanced with Smooth Transitions */}
          <div className="relative perspective-1000">
            <motion.div style={{ y: y1 }} className="relative z-20">
              <div className="relative mx-auto w-[240px] sm:w-[280px] aspect-[9/19] group">
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] border-[6px] border-gray-900 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
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
                        <Image src={screenshots[currentSlide] || "/placeholder.svg"} alt="App Screenshot" fill className="object-cover" priority />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Screen Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
                {/* Enhanced Glow Behind Phone */}
                <div className="absolute -inset-10 bg-gradient-to-br from-primary/30 via-purple-500/20 to-accent/30 blur-[60px] -z-10 group-hover:blur-[80px] transition-all duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
