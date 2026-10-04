import "../../secondary.css"
import "../tools.css"

import type { Metadata } from "next"
import { Check, Clock, TicketsPlane } from "lucide-react"

import { Footer } from "@/components/footer"
import { LayoverChecker, type LayoverDefaults } from "@/components/seo/layover-checker"
import { ToolBody, ToolCta, ToolDarkBand, ToolFaqSection, ToolHeading, ToolHero, ToolPage, ToolRelated, ToolSchema, ToolSection, type ToolFaq } from "@/components/seo/tool-page"
import { getAirport } from "@/lib/airports"
import type { Place } from "@/lib/flight-time"
import {
  calculateLayover,
  CONNECTION_TYPES,
  formatSpan,
  GUIDANCE,
  isLayoverError,
  suggestBagRecheck,
  suggestImmigration,
  VERDICTS,
  type ConnectionType,
  type Verdict,
} from "@/lib/layover"
import { createPageMetadata } from "@/lib/seo-metadata"

const PAGE_PATH = "/tools/layover-calculator"

const faqs: ToolFaq[] = [
  {
    question: "Is a 1 hour layover enough?",
    answer:
      "Often yes for a domestic connection on one ticket in the same terminal, and sometimes for an international transfer that stays airside. It is usually too short if you have to clear immigration, collect and re-check bags, change terminals or are travelling on separate tickets. If the airline sold the connection on one ticket, it generally meets the airline's minimum connection time.",
  },
  {
    question: "Is 45 minutes enough for a layover?",
    answer:
      "45 minutes can work for a domestic connection on one ticket at an airport where both gates are close together, but it leaves little room for a late arrival. For international connections, terminal changes, bag re-checks or separate tickets, 45 minutes is usually tight.",
  },
  {
    question: "How long should a layover be?",
    answer:
      "As general guidance, allow roughly 45 to 60 minutes or more for a domestic connection and 90 minutes to 2 hours or more for an international one. Add time when you change terminals, clear passport control, re-check bags or book separate tickets, where 3 hours or more is a common rule of thumb.",
  },
  {
    question: "What is a minimum connection time?",
    answer:
      "A minimum connection time (MCT) is the shortest connection an airline or airport will accept for a given transfer, for example international to domestic at a particular terminal. Airlines use it when selling connecting itineraries on one ticket. This calculator does not have official MCT data; check with your airline.",
  },
  {
    question: "How much time do I need for an international layover?",
    answer:
      "Plan for at least 90 minutes to 2 hours when you stay airside, and more if you must pass through immigration and customs, re-check bags or change terminals. Arriving internationally into a country and connecting onward often means clearing immigration at that first airport.",
  },
  {
    question: "What happens if I miss a connection on one ticket versus separate tickets?",
    answer:
      "On one ticket, the airline generally rebooks you onto a later flight if the first flight's delay makes you miss the connection, subject to its conditions of carriage. On separate tickets, the second airline usually treats you as a no-show, so you may need to buy a new ticket. Check each airline's own rules.",
  },
  {
    question: "Do I need to re-check my bags during a layover?",
    answer:
      "On one ticket, bags are usually checked through to your final destination. Common exceptions are separate tickets and arriving internationally into a country such as the United States, where you collect bags for customs and drop them again. Your bag tag and the check-in agent can confirm it.",
  },
  {
    question: "Does the calculator handle overnight connections and time zones?",
    answer:
      "Yes. Enter the landing date and time and the onward departure date and time, both in local time at the connecting airport. The calculator uses that airport's time zone, including clock changes, and flags overnight connections.",
  },
]

export const metadata: Metadata = createPageMetadata({
  title: "Layover Calculator: Is Your Connection Enough?",
  description:
    "Is your layover long enough? Enter the connecting airport and both flight times to get your connection time, a verdict and a time-needed breakdown.",
  keywords: [
    "layover calculator",
    "minimum connection time",
    "layover time",
    "connection time calculator",
    "is a 1 hour layover enough",
    "how long should a layover be",
    "international layover time",
  ],
  path: PAGE_PATH,
  socialTitle: "Layover Calculator: Is My Connection Time Enough? | TripCache",
  socialDescription: "Check your layover time against transparent general guidance for terminal changes, immigration, bag re-checks and separate tickets.",
})

/** Example connection pre-filled on first paint: a terminal change at Heathrow, 1h 25m on one ticket. */
const EXAMPLE = {
  airport: "LHR",
  arrivalDate: "2026-11-14",
  arrivalTime: "07:10",
  departureDate: "2026-11-14",
  departureTime: "08:35",
  type: "intl-intl" as const,
  ticketing: "same" as const,
  terminal: "yes" as const,
}

/** The "how long should a layover be" table, computed with the same model the tool uses. */
function guidanceFor(type: ConnectionType, airport: Place) {
  const result = calculateLayover({
    airport,
    arrivalDate: "2026-11-14",
    arrivalTime: "08:00",
    departureDate: "2026-11-14",
    departureTime: "20:00",
    type,
    ticketing: "same",
    terminal: "no",
    bags: suggestBagRecheck(type, "same"),
    immigration: suggestImmigration(type, "same"),
  })
  if (isLayoverError(result)) return null
  return { need: result.need, comfortable: result.need + result.buffer }
}

const TYPE_NOTES: Record<ConnectionType, string> = {
  "dom-dom": "Usually the quickest: no passport control, bags checked through on one ticket.",
  "dom-intl": "Some countries add an exit passport check before international departures; switch it on in the tool if yours does.",
  "intl-dom": "Often the slowest: you usually clear immigration and customs at the first airport and re-check bags.",
  "intl-intl": "Quick when you can stay airside; transfer security is common at large hubs.",
}

const VERDICT_RULES: { verdict: Verdict; rule: string }[] = [
  { verdict: "tight", rule: "Less time than the estimated time needed." },
  { verdict: "risky", rule: `Covers the estimate, but with less than ${GUIDANCE.bufferSameTicket} minutes to spare (${GUIDANCE.bufferSeparateTickets} on separate tickets).` },
  { verdict: "comfortable", rule: "Covers the estimate plus the delay buffer." },
  { verdict: "long", rule: `${GUIDANCE.longLayover / 60} hours or more. We also check whether leaving the airport could be realistic.` },
]

const CARD = "rounded-[1.5rem] bg-white/46 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_16px_44px_rgba(72,53,33,0.055)] sm:p-7"

export default function LayoverCalculatorPage() {
  const airport = getAirport(EXAMPLE.airport) as Place
  const defaults: LayoverDefaults = { ...EXAMPLE, airport }

  const estimates = [
    { label: "Get off the plane", value: `${GUIDANCE.deplaneDomestic} min after a domestic flight, ${GUIDANCE.deplaneInternational} min after an international one` },
    { label: "Walk to the gate", value: `${GUIDANCE.walkSameTerminal} min in the same terminal, ${GUIDANCE.walkTerminalChange} min with a terminal change (${GUIDANCE.walkTerminalUnsure} if unsure)` },
    { label: "Passport control", value: `${GUIDANCE.immigration} min when you clear immigration or customs` },
    { label: "Collect and re-check bags", value: `${GUIDANCE.bagRecheck} min` },
    { label: "Transfer security", value: `${GUIDANCE.security} min after an international arrival, or whenever you leave the secure area` },
    { label: "Boarding closes", value: `${GUIDANCE.boardingClosesDomestic} min before a domestic departure, ${GUIDANCE.boardingClosesInternational} min before an international one` },
    { label: "Separate tickets with bags", value: `bag drop closes ${GUIDANCE.bagDropClosesDomestic} to ${GUIDANCE.bagDropClosesInternational} min before departure` },
  ]

  return (
    <ToolPage>
      <ToolSchema
        path={PAGE_PATH}
        name="Layover calculator"
        alternateName="Connection time calculator"
        description="Checks whether a layover leaves enough connection time, using general guidance for terminal changes, immigration, bag re-checks and separate tickets."
        faqs={faqs}
      />

      <ToolHero
        eyebrow="Free connection time tool"
        icon={TicketsPlane}
        title="Layover calculator: is your connection time enough?"
        lede={
          <p>
            Enter the connecting airport and both flight times to see your layover time and whether it looks tight, risky, comfortable or
            long. The time-needed breakdown adds up deplaning, terminal changes, immigration, bag re-checks and boarding, all as clearly
            labelled estimates.
          </p>
        }
        placement="tools-layover"
        secondary={{ href: "/tools/flight-arrival-time-calculator", label: "Check the first flight's arrival" }}
      />

      <ToolBody>
        <LayoverChecker defaults={defaults} />
      </ToolBody>

      <ToolDarkBand
        eyebrow="How it works"
        title="How the layover verdict is calculated"
        intro={
          <>
            <p>
              The calculator adds up general estimates for each step of a connection, then compares that with the layover time you have.
              These are TripCache’s rough guidance figures, not any airport’s official minimum connection time. Your airline’s published
              minimum connection time and transit rules always win.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {VERDICT_RULES.map((item) => (
                <li key={item.verdict} className="flex gap-3 text-[0.9375rem] leading-6 text-[#f7f2e9]">
                  <span
                    className="mt-0.5 inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-[12.5px] font-bold"
                    style={{ backgroundColor: VERDICTS[item.verdict].soft, color: VERDICTS[item.verdict].ink }}
                  >
                    {VERDICTS[item.verdict].label}
                  </span>
                  <span>{item.rule}</span>
                </li>
              ))}
            </ul>
          </>
        }
      >
        <h3 className="text-xl font-semibold text-[#f7f2e9]">Estimates used (minutes)</h3>
        <dl className="mt-4 grid gap-3">
          {estimates.map((item) => (
            <div key={item.label} className="rounded-[1.25rem] bg-white/[0.055] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <dt className="font-semibold text-[#f7f2e9]">{item.label}</dt>
              <dd className="mt-0.5 text-sm leading-6 text-[#d9d2c6]">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm leading-6 text-[#b9b0a3]">
          Delay buffer: {GUIDANCE.bufferSameTicket} minutes on one ticket, {GUIDANCE.bufferSeparateTickets} on separate tickets, because a missed
          connection on separate tickets usually is not the second airline’s problem. Real queues vary by airport, time of day and season.
        </p>
      </ToolDarkBand>

      <ToolSection>
        <ToolHeading
          title="How long should a layover be?"
          lede="Rough layover time guidance by connection type, on one ticket without a terminal change, using the same estimates as the calculator. Add time for terminal changes and separate tickets."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {CONNECTION_TYPES.map((item) => {
            const guide = guidanceFor(item.value, airport)
            return (
              <div key={item.value} className={CARD}>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.label}</h3>
                {guide ? (
                  <p className="mt-3">
                    <span className="block text-sm text-[#666666]">Comfortable from</span>
                    <span className="mt-1 block whitespace-nowrap text-4xl font-semibold tabular-nums tracking-[-0.04em]">{formatSpan(guide.comfortable)}</span>
                  </p>
                ) : null}
                {guide ? <p className="mt-2 text-sm text-[#444444]">Estimated minimum: about {formatSpan(guide.need)}</p> : null}
                <p className="mt-3 leading-7 text-[#666666]">{TYPE_NOTES[item.value]}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Is a 1 hour layover enough?</h3>
            <p className="mt-3 max-w-[62ch] leading-8 text-[#444444]">
              For a domestic connection on one ticket, an hour is usually workable, and an airline generally sells a connection on one
              ticket only if it meets its own minimum connection time. An hour gets tight for international connections that involve
              passport control, collecting bags or changing terminals, and it is risky on separate tickets, where a late first flight is
              not the second airline’s responsibility.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Is 45 minutes enough for a layover?</h3>
            <p className="mt-3 max-w-[62ch] leading-8 text-[#444444]">
              Sometimes, for a domestic connection with gates close together and bags checked through. It leaves almost no room for a
              late arrival or a slow deplaning, so sit near the front if you can, check the onward gate before landing and tell the crew
              about a tight connection. For most international connections 45 minutes is tight.
            </p>
          </div>
        </div>
      </ToolSection>

      <ToolSection className="pt-0 lg:pt-0">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <article>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Can you leave the airport during a layover?</h2>
            <p className="mt-4 leading-8 text-[#444444]">
              Often yes, if you have enough time and you are allowed to enter the country. Leaving the airport means going through
              passport control into that country, so you need whatever entry permission your nationality requires there, such as a visa,
              an electronic travel authorisation or visa-free entry. You then need to get back in time to clear security again and, for an
              international departure, possibly an exit passport check.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Check the country’s official entry and transit rules for your passport before you plan to go out.",
                "Make sure your bags are checked through to your final destination, or you will need to collect and store them.",
                "Count the time to clear arrivals, travel to the city and back, and be at the airport about 2 hours before an international departure.",
                "On a long layover, the calculator estimates how much time you would actually have outside.",
              ].map((point) => (
                <li key={point} className="flex gap-3 leading-7 text-[#444444]">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e5dcff] text-[#602ad2]" aria-hidden="true">
                    <Check className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Do you have to go through customs on a layover?</h2>
            <p className="mt-4 leading-8 text-[#444444]">
              It depends on where you connect and how you are ticketed. As a general rule, you clear immigration and customs at the first
              airport where you enter a country. If you arrive internationally and connect onward within that country, you usually go
              through passport control and customs at the connecting airport, often collecting and re-checking your bags.
            </p>
            <p className="mt-4 leading-8 text-[#444444]">
              On an international-to-international connection on one ticket, many large hubs let you stay airside in a transit area,
              usually with a transfer security check but no customs. Some countries do not offer airside transit at all; the United States,
              for example, requires international arrivals to clear immigration and customs even when they are only connecting. Some
              nationalities also need a transit visa to change planes in certain countries.
            </p>
            <p className={`mt-6 leading-7 text-[#444444] ${CARD}`}>
              <Clock className="mr-1.5 inline h-4 w-4 -translate-y-px text-[#602ad2]" aria-hidden="true" />
              Confirm with your airline and the connecting country’s official transit rules. On separate tickets, expect to go landside,
              collect bags and check in again.
            </p>
          </article>
        </div>
      </ToolSection>

      <ToolFaqSection title="Layover time questions" intro="Short answers about connection times, customs, bags and separate tickets." faqs={faqs} />

      <ToolRelated
        links={[
          { href: "/tools/flight-arrival-time-calculator", title: "Flight time calculator", text: "Find the local landing time of the first flight, with time zones and date changes." },
          { href: "/blog/flight-time-zones-arrival-date", title: "Guide: flight times across time zones", text: "Why arrival dates shift, with overnight and +1 day examples." },
          { href: "/tools/jet-lag-calculator", title: "Jet lag calculator", text: "Plan sleep and light around a long trip with a connection." },
        ]}
      />

      <ToolCta
        placement="tools-layover-cta"
        title="Keep both flights of a connection in one trip."
        text="TripCache keeps each flight in your itinerary with its local departure and arrival times, so the connection is easy to check at a glance. Free on iPhone and Android."
      />
      <Footer />
    </ToolPage>
  )
}
