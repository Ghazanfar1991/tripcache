/*
 * DESIGN CONTRACT (TripCache home, 2026-10 redesign, revision 2: TripCache's own world)
 * THESIS: The inbox becomes the trip. The page demonstrates TripCache's mechanism: booking emails are forwarded,
 *   reviewed and filed into one colour-coded itinerary. It refuses Flighty's grammar (phone orbited by notifications,
 *   bottom stage switcher, day-to-night flip, glow-bordered delay cards) and the generic hero + three cards + pricing
 *   stack. Split-flap tiles appear only on the cancellation countdown, at the owner's request.
 * OWN-WORLD: The mobile app's own system. Cool canvas #f0f2f4 and white cards with hairline borders and clipped
 *   "prismatic bloom" colour pools; violet #612bd3 actions with magenta #d82d7e; category colours flight indigo,
 *   hotel green, car amber, activity pink. Fraunces display, Inter text, Allura script for "Trip to".
 *   The app's black-and-neon-green Live Activity is quoted as-is.
 * STORY: Emails scattered across an inbox → forwarded → checked as drafts → one trip with deadlines, documents and
 *   receipts kept beside it → the visitor taps an official store badge.
 * FIRST VIEWPORT: Left, a three-line Fraunces H1, a short lede and the store badges. Right, a layered collage built
 *   from the app's own art: the landmarks postcard titled "Trip to ___" (destination cycles), forwarded emails dropping
 *   into it, a Dynamic Island pill, the 3D suitcase and boarding pass, and a cancellation-reminder toast, all moving
 *   with pointer parallax.
 * FORM: Inbox → Itinerary, the owner's choice from three directions on 2026-10-05 (roll f76ab53f was superseded
 *   by the owner's brief). Raised by the night-flight six-pack: damped, physical motion.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
 */
import { Footer } from "@/components/footer"
import { Faq } from "./faq"
import { FinalCta } from "./final-cta"
import { Hero } from "./hero"
import { InboxToTrip } from "./inbox-to-trip"
import { Kept } from "./kept"
import { Plans } from "./plans"
import { Reasons } from "./reasons"
import { Statement } from "./statement"
import { WhatIs } from "./what-is"

export function HomePage() {
  return (
    <>
      <main className="tc-home overflow-x-clip bg-white font-tc text-tc-ink">
        <Hero />
        <WhatIs />
        <InboxToTrip />
        <Kept />
        <Statement />
        <Reasons />
        <Plans />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
