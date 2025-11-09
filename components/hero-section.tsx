"use client"
import Image from "next/image"
import { AppStoreButtons } from "./app-store-buttons"
import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { SectionContainer } from "./section-container"
import { useMailchimpWaitlist } from "@/hooks/use-mailchimp-waitlist"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { email, setEmail, status, message, handleSubmit, reset } = useMailchimpWaitlist()
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
    }, 3000)
    return () => clearInterval(timer)
  }, [screenshots.length])

  return (
    <section className="relative pt-20 pb-2 lg:pt-24 lg:pb-6 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-[#d8e7ff] dark:via-background/70 dark:to-slate-900">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#d8e7ff]/70 to-[#cfe2ff] dark:via-slate-800/80 dark:to-slate-900" />
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left space-y-5 lg:space-y-6">
            <div className="inline-block px-4 py-1.5 bg-muted rounded-full text-sm font-medium text-muted-foreground">
              The Best Trip Management App
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Manage Your Trips
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
                Anytime, Anywhere.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              TripCache helps you organize itineraries, track flights, manage documents, and generate travel reports—all
              in one simple app.
            </p>

            {message && (
              <div
                className={`mx-auto lg:mx-0 flex w-full max-w-md items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
                  status === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                    : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1"
            >
              <div className="relative flex-1 min-w-[220px] sm:min-w-[260px]">
                <label htmlFor="hero-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="hero-email"
                  name="EMAIL"
                  type="email"
                  placeholder="Enter your email to join the waitlist"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (status !== "idle") {
                      reset()
                    }
                  }}
                  className="w-full rounded-full border border-border/80 bg-background px-5 py-3 text-sm sm:text-base shadow-sm transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 dark:bg-background/80 dark:border-white/20 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                />
              </div>
              <input type="hidden" name="f_id" value="008583e5f0" />
              <div className="hidden" aria-hidden="true">
                <input type="text" name="b_1cef3766ef227139e3c699e85_536a3e4923" tabIndex={-1} defaultValue="" />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-600 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Submitting..." : "Join Waitlist"}
              </button>
            </form>

            <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start -mt-2">
              <AppStoreButtons />
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] lg:max-w-md">
              {/* Main phone mockup */}
              <div className="relative z-10 mx-auto w-48 sm:w-56 lg:w-[17rem]">
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-3xl z-10" />
                  <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                    <Image
                      src={screenshots[currentSlide] || "/placeholder.svg"}
                      alt="TripCache App"
                      fill
                      className="object-cover object-top transition-opacity duration-500"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Slide indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-cyan-500 w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
