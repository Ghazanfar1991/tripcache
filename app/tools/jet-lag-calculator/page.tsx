import "../../secondary.css"
import "../tools.css"

import type { Metadata } from "next"
import { MoonStar } from "lucide-react"

import { Footer } from "@/components/footer"
import { JetLagPlanner } from "@/components/seo/jet-lag-planner"
import { DarkSteps, ToolBody, ToolCta, ToolDarkBand, ToolFaqSection, ToolHero, ToolPage, ToolRelated, ToolSchema, type ToolFaq } from "@/components/seo/tool-page"
import { getAirport } from "@/lib/airports"
import { formatIn, zoneAbbreviation, type Place } from "@/lib/flight-time"
import { AVOID_HOURS, SEEK_HOURS, formatShift, planJetLag } from "@/lib/jet-lag"
import { createPageMetadata } from "@/lib/seo-metadata"

const PAGE_PATH = "/tools/jet-lag-calculator"

/** The worked example: the classic overnight transatlantic flight, five time zones east. */
const EXAMPLE = { from: "JFK", to: "LHR", date: "2026-11-12", time: "19:30", hours: 6, minutes: 55, bedtime: "23:00", wake: "07:00" }

const faqs: ToolFaq[] = [
  {
    question: "How long does jet lag last?",
    answer:
      "A widely used rule of thumb is about one day for each time zone you cross. The body clock tends to shift about 1 hour a day after flying east and about 1.5 hours a day after flying west, so a 6-hour eastward trip takes roughly 6 days and a 6-hour westward trip roughly 4. People vary, and shifting your sleep before you fly can shorten it.",
  },
  {
    question: "How long does jet lag last from the USA to the UK?",
    answer:
      "New York to London is usually 5 hours ahead (4 hours for a few weeks in spring and autumn, when the clocks change on different dates). By the one-hour-a-day rule that is about 4 to 5 days to fully adjust without preparation. From the West Coast it is 8 hours, so about 8 days. Moving your bedtime earlier for a few days before the flight can cut that down.",
  },
  {
    question: "How long does it take to recover from jet lag after flying west?",
    answer:
      "Usually less time than flying east. Using the common estimate of about 1.5 hours of adjustment a day, London to New York (5 hours west) takes roughly 3 to 4 days. Getting daylight in the late afternoon and evening, and staying up until local bedtime, helps.",
  },
  {
    question: "How do you beat jet lag?",
    answer:
      "Start shifting your sleep toward the destination a few days before you go, switch your watch to destination time when you board, sleep on the plane only if it is night at your destination, then get daylight at the right times and go to bed at local bedtime from the first night. Keep naps short and drink water. The calculator turns these steps into times for your trip.",
  },
  {
    question: "What jet lag sleep schedule should I follow?",
    answer:
      "Before an eastward trip, go to bed and get up about an hour earlier each day; before a westward trip, an hour later. After landing, sleep at your usual bedtime in local time, even if you do not feel tired, and get up at your usual local wake time. The day-by-day plan above shows the exact times.",
  },
  {
    question: "Why is jet lag worse flying east?",
    answer:
      "Flying east means your day starts earlier, so your body clock has to move earlier. Most people find it easier to stay up later than to fall asleep earlier, which is why westward trips usually feel easier to adjust to.",
  },
  {
    question: "Should I take melatonin for jet lag?",
    answer:
      "Some travelers use melatonin, but whether it suits you, and when and how much to take, is a question for a doctor or pharmacist. This calculator gives general guidance about sleep and light timing only. It is not medical advice.",
  },
  {
    question: "Does TripCache make jet lag plans?",
    answer:
      "No. This calculator is a free tool on our site. The TripCache app organizes the trip itself: flights, hotels and bookings in one itinerary with local departure and arrival times, so you always know what time it is where you are going next. Live flight-status alerts are part of TripCache Pro.",
  },
]

export const metadata: Metadata = createPageMetadata({
  title: "Jet Lag Calculator: Recovery Time & Sleep Plan",
  description:
    "Free jet lag calculator. Enter your flight to see how long jet lag will last, then get a day-by-day sleep and light plan for before, during and after it.",
  keywords: ["jet lag calculator", "jet lag recovery calculator", "jetlag calculator", "jet lag planner", "how long does jet lag last", "jet lag sleep schedule"],
  path: PAGE_PATH,
  socialTitle: "Jet Lag Calculator and Sleep Plan | TripCache",
  socialDescription: "See how long jet lag will last for your flight and get a day-by-day sleep and light plan.",
})

export default function JetLagCalculatorPage() {
  const from = getAirport(EXAMPLE.from) as Place
  const to = getAirport(EXAMPLE.to) as Place
  const example = planJetLag({
    from,
    to,
    date: EXAMPLE.date,
    time: EXAMPLE.time,
    durationMinutes: EXAMPLE.hours * 60 + EXAMPLE.minutes,
    bedtime: EXAMPLE.bedtime,
    wake: EXAMPLE.wake,
    headStart: true,
  })

  const at = (date: Date, zone: string) => `${formatIn(date, zone, { weekday: "short", hour: "numeric", minute: "2-digit" })} ${zoneAbbreviation(date, zone)}`

  const steps = example
    ? [
        {
          title: "Time difference",
          text: `Each airport's UTC offset is read for your travel dates, so daylight saving is included. ${to.city} is ${formatShift(example.hours)} ahead of ${from.city} on ${formatIn(example.arrival, to.tz, { month: "long", day: "numeric" })}. A gap of more than 12 hours is planned the shorter way round the clock.`,
        },
        {
          title: "Recovery estimate",
          text: `Rule of thumb: the body clock moves about 1 hour a day after flying east and about 1.5 hours a day after flying west. ${formatShift(example.hours)} ÷ 1 hour a day = about ${example.daysNoPrep} days to adjust with no preparation.`,
        },
        {
          title: "Head start",
          text: `Bedtime and wake time move 1 hour a day toward the destination for up to 3 days before the flight. That covers ${formatShift(example.preShiftHours)}, leaving ${formatShift(example.remainingHours)}: about ${example.daysWithPlan} days after landing.`,
        },
        {
          title: "Sleep on the plane",
          text: example.flight.sleep
            ? `The flight leaves at ${at(example.departure, from.tz)} and lands at ${at(example.arrival, to.tz)}. The plan suggests sleep where the flight overlaps your usual night in ${to.city} time, leaving 45 minutes after take-off and before landing: ${formatIn(example.flight.sleep.start, to.tz, { hour: "numeric", minute: "2-digit" })} to ${formatIn(example.flight.sleep.end, to.tz, { hour: "numeric", minute: "2-digit" })}.`
            : "The plan suggests sleep only where the flight overlaps your usual night in destination time, leaving 45 minutes after take-off and before landing.",
        },
        {
          title: "Light windows",
          text: `The body clock's low point is taken as 2 hours before your usual wake time, on the body clock. After an eastward flight, light in the ${SEEK_HOURS} hours after that point tends to move the clock earlier, so the plan says seek it, and avoid light in the ${AVOID_HOURS} hours before. Westward, it is the reverse. Windows are trimmed to the hours you are awake.`,
        },
      ]
    : []

  return (
    <ToolPage>
      <ToolSchema
        path={PAGE_PATH}
        name="Jet lag calculator"
        description="Estimates jet lag recovery time for a flight and builds a day-by-day sleep and light plan."
        faqs={faqs}
      />

      <ToolHero
        eyebrow="Free jet lag tool"
        icon={MoonStar}
        crumb="Jet lag calculator"
        title="Jet lag calculator and sleep plan"
        lede={
          <p>
            See how long jet lag will last for your flight, then get a day-by-day plan: when to shift your sleep before you go, when
            to sleep on the plane, and when to seek or avoid light after you land.
          </p>
        }
        placement="tools-jet-lag"
        secondary={{ href: "/tools/flight-arrival-time-calculator", label: "Check your arrival time" }}
      />

      <ToolBody>
        <JetLagPlanner
          defaults={{ from, to, date: EXAMPLE.date, time: EXAMPLE.time, hours: EXAMPLE.hours, minutes: EXAMPLE.minutes, bedtime: EXAMPLE.bedtime, wake: EXAMPLE.wake }}
        />
      </ToolBody>

      {example ? (
        <ToolDarkBand
          eyebrow="How it works"
          title="How the jet lag plan is worked out"
          intro={
            <>
              <p>
                No black box. Here is every step, using the example above: New York (JFK) to London (LHR) on an overnight flight,
                sleeping 11 PM to 7 AM at home.
              </p>
              <p className="mt-5 rounded-[18px] bg-white/[0.06] px-4 py-3.5 text-[14px] leading-6 text-white/75 ring-1 ring-white/10">
                These are widely used rules of thumb, not a medical model. People adjust at different speeds. If you have a sleep
                condition, are pregnant or take regular medication, ask a doctor before changing your sleep.
              </p>
            </>
          }
        >
          <DarkSteps steps={steps} />
        </ToolDarkBand>
      ) : null}

      <ToolFaqSection flush title="How long does jet lag last?" intro="Short answers on recovery time, sleep schedules and beating jet lag." faqs={faqs} />

      <ToolRelated
        links={[
          { href: "/tools/flight-arrival-time-calculator", title: "Flight time calculator", text: "Find your local landing time, the time difference and any +1 day change." },
          { href: "/blog/flight-time-zones-arrival-date", title: "Guide: flight times across time zones", text: "Why arrival dates shift, with overnight and date-line examples." },
          { href: "/tools/travel-checklist", title: "Travel checklist generator", text: "Build a documents and packing checklist for the trip." },
        ]}
      />

      <ToolCta
        placement="tools-jet-lag-cta"
        title="Know what time it is at every stop."
        text="TripCache keeps your flights, hotels and bookings in one itinerary with local departure and arrival times. Free on iPhone and Android."
      />
      <Footer />
    </ToolPage>
  )
}
