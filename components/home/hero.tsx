import { Bloom } from "./category"
import { StoreBadges } from "./store-badges"
import { HeroScene } from "./hero-scene"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#f7f5ff_0%,#f0f2f4_72%,#f0f2f4_100%)]">
      <Bloom className="tc-drift -right-40 top-10 size-[560px] opacity-35" color="#8b5cf6" />
      <Bloom className="tc-drift-slow right-[22%] top-[52%] size-[380px] opacity-25" color="#ec4899" />
      <Bloom className="tc-drift -left-48 bottom-[-120px] size-[480px] opacity-25" color="#6366f1" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-16 pt-[clamp(112px,14svh,150px)] sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)] lg:gap-8 lg:pb-24">
        <div className="max-w-[620px]">
          {/* The H1 and lede are the mobile LCP candidates, so they paint in place with no entrance animation. */}
          <h1 className="text-balance font-tc-display text-[clamp(44px,5.6vw,78px)] font-semibold leading-[1.02] tracking-[-0.02em] text-tc-ink">
            Turn booking emails into one organized trip.
          </h1>
          <p className="mt-6 max-w-[54ch] text-pretty text-[17px] leading-7 text-tc-ink-2 sm:text-[19px] sm:leading-8">
            With Pro, forward flight, hotel, car, tour and ticket confirmations and TripCache builds the itinerary for you
            to review. Free on every plan: reminders before free cancellation ends, and documents, receipts and expenses
            kept with the trip.
          </p>
          <div className="tc-rise mt-8" style={{ animationDelay: "180ms" }}>
            <StoreBadges placement="homepage_hero" badgeClassName="h-12" />
            <p className="mt-4 text-[13.5px] text-tc-mute">
              Free to download. Basic includes cancellation reminders, documents, and CSV or PDF export; Pro adds
              booking-email import and live flight alerts.
            </p>
          </div>
        </div>

        <div className="tc-rise" style={{ animationDelay: "120ms" }}>
          <HeroScene />
        </div>
      </div>
    </section>
  )
}
