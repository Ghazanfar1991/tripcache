import "../../secondary.css"
import "../tools.css"

import type { Metadata } from "next"
import { PlaneLanding } from "lucide-react"

import { Footer } from "@/components/footer"
import { FlightArrivalCalculator } from "@/components/seo/flight-arrival-calculator"
import { DarkSteps, ToolBody, ToolCta, ToolDarkBand, ToolFaqSection, ToolHero, ToolPage, ToolRelated, ToolSchema, type ToolFaq } from "@/components/seo/tool-page"
import { getAirport } from "@/lib/airports"
import { calculateArrival, formatDuration, formatIn, zoneAbbreviation, type Place } from "@/lib/flight-time"
import { createPageMetadata } from "@/lib/seo-metadata"

const PAGE_PATH = "/tools/flight-arrival-time-calculator"

/** The worked example: an overnight trans-Pacific flight that lands "before" it left. */
const EXAMPLE = { from: "SYD", to: "LAX", date: "2026-12-18", time: "21:30", hours: 13, minutes: 50 }

const faqs: ToolFaq[] = [
  {
    question: "How do I calculate my flight's arrival time?",
    answer:
      "Add the flight duration to the departure time, then convert the result into the arrival airport's time zone. The calculator does both steps for you, including any daylight-saving change on that date.",
  },
  {
    question: "How long is my flight? Can the calculator estimate flight time?",
    answer:
      "Yes. If you don't have the duration from your ticket, the calculator estimates flight time from the great-circle distance between the two airports, a typical jet cruising speed and time for taxi, climb and descent. Winds, routing and airline schedules change real durations, so use the scheduled duration on your ticket when you have it.",
  },
  {
    question: "Why does my flight land on a different day, or even the day before?",
    answer:
      "Flights that cross several time zones can land on the next calendar day. Flying east across the International Date Line, for example from Sydney to Los Angeles, can land on the same date or a date that looks earlier than departure, because the arrival city is many hours behind.",
  },
  {
    question: "Are the times on my ticket local time?",
    answer:
      "Yes. Airlines publish each departure and arrival time in the local time of that airport, which is why the arrival time can look shorter or longer than the actual flight.",
  },
  {
    question: "Does the calculator account for daylight saving time?",
    answer:
      "Yes. Each airport uses its own time zone from the airport database, and the offset is worked out for the specific departure date, so seasonal clock changes are included.",
  },
  {
    question: "Can TripCache keep track of this for me?",
    answer:
      "Yes. Add the flight to a trip in the free TripCache app and it keeps the local departure and arrival times in your itinerary. TripCache Pro can also import flights from forwarded booking confirmations and send live flight-status alerts where the data provider covers your flight. The airline remains the source of truth for the final schedule.",
  },
]

export const metadata: Metadata = createPageMetadata({
  title: "Flight Time Calculator: Local Arrival Time",
  description:
    "Free flight time calculator. Enter two airports, the departure time and duration, or use the estimate, to see your local arrival time, date and time zone.",
  keywords: [
    "flight time calculator",
    "flight time estimator",
    "flight arrival time calculator",
    "arrival time calculator",
    "flight time zone calculator",
    "what time will I land",
  ],
  path: PAGE_PATH,
  socialTitle: "Flight Time Calculator: When Will You Land? | TripCache",
  socialDescription: "See your flight's local arrival time, date change and time difference, with every airport's time zone built in.",
})

export default function FlightArrivalTimeCalculatorPage() {
  const from = getAirport(EXAMPLE.from) as Place
  const to = getAirport(EXAMPLE.to) as Place
  const duration = EXAMPLE.hours * 60 + EXAMPLE.minutes
  const example = calculateArrival(from, to, EXAMPLE.date, EXAMPLE.time, duration)

  const fmt = (date: Date, zone: string) =>
    `${formatIn(date, zone, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })} ${zoneAbbreviation(date, zone)}`

  return (
    <ToolPage>
      <ToolSchema
        path={PAGE_PATH}
        name="Flight time and arrival time calculator"
        description="Estimates flight time between two airports and converts the arrival into local time, with the date change and time difference."
        faqs={faqs}
      />

      <ToolHero
        eyebrow="Free flight time tool"
        icon={PlaneLanding}
        crumb="Flight time calculator"
        title="Flight time calculator: when will you land?"
        lede={
          <p>
            Find out exactly when you land, in local time. Enter the airports, your departure time and the flight duration, or use
            the built-in flight time estimate, to see the arrival date and time, the time difference, and whether you land a day
            later or earlier.
          </p>
        }
        placement="tools-flight-arrival"
        secondary={{ href: "/blog/flight-time-zones-arrival-date", label: "Read the time zone guide" }}
      />

      <ToolBody>
        <FlightArrivalCalculator
          defaults={{ from, to, date: EXAMPLE.date, time: EXAMPLE.time, hours: EXAMPLE.hours, minutes: EXAMPLE.minutes }}
        />
      </ToolBody>

      {example ? (
        <ToolDarkBand
          eyebrow="Worked example"
          title="The flight that lands before it leaves"
          intro={<p>Sydney to Los Angeles crosses the International Date Line heading east, so the arrival clock jumps back almost a full day.</p>}
        >
          <DarkSteps
            steps={[
              { text: `Departure from Sydney (SYD): ${fmt(example.departure, from.tz)}.` },
              { text: `Flight duration: ${formatDuration(duration)}, so the flight lands ${formatDuration(duration)} later in real time.` },
              { text: `Los Angeles is ${formatDuration(Math.abs(example.zoneDifferenceMinutes))} behind Sydney on that date.` },
              { text: `Local arrival in Los Angeles (LAX): ${fmt(example.arrival, to.tz)}, earlier on the clock than when you took off.` },
            ]}
          />
        </ToolDarkBand>
      ) : null}

      <ToolFaqSection flush title="Flight time zone questions" intro="Short answers about local times, date changes and flight time estimates." faqs={faqs} />

      <ToolRelated
        links={[
          { href: "/blog/flight-time-zones-arrival-date", title: "Guide: flight times across time zones", text: "The step-by-step method with overnight and +1 day examples." },
          { href: "/tools/jet-lag-calculator", title: "Jet lag calculator", text: "See how long jet lag will last and get a day-by-day sleep plan." },
          { href: "/tools/layover-calculator", title: "Layover calculator", text: "Check whether a connection leaves enough time at the airport." },
        ]}
      />

      <ToolCta
        placement="tools-flight-arrival-cta"
        title="Keep every local time in one trip."
        text="TripCache keeps departures and arrivals in local time inside your itinerary. Free on iPhone and Android; Pro adds email import and live flight-status alerts."
      />
      <Footer />
    </ToolPage>
  )
}
