/**
 * Layover / connection time maths for the layover calculator. Pure; runs on server and client.
 *
 * Every minute value below is GENERAL GUIDANCE chosen by TripCache for a rough estimate. None of it
 * is an airport's or airline's official minimum connection time (MCT). The airline's published MCT
 * and its connection rules are authoritative.
 */
import { formatIn, zoneAbbreviation, zonedToUtc, type Place } from "@/lib/flight-time"

export type ConnectionType = "dom-dom" | "dom-intl" | "intl-dom" | "intl-intl"
export type Ticketing = "same" | "separate"
export type TerminalChange = "yes" | "no" | "unsure"
export type Verdict = "tight" | "risky" | "comfortable" | "long"

export const CONNECTION_TYPES: { value: ConnectionType; label: string; short: string }[] = [
  { value: "dom-dom", label: "Domestic to domestic", short: "Dom → Dom" },
  { value: "dom-intl", label: "Domestic to international", short: "Dom → Intl" },
  { value: "intl-dom", label: "International to domestic", short: "Intl → Dom" },
  { value: "intl-intl", label: "International to international", short: "Intl → Intl" },
]

/** The estimates the verdict is built from, in minutes. Shown on the page so the method is transparent. */
export const GUIDANCE = {
  deplaneDomestic: 10,
  deplaneInternational: 15,
  walkSameTerminal: 10,
  walkTerminalUnsure: 20,
  walkTerminalChange: 30,
  immigration: 30,
  bagRecheck: 25,
  security: 15,
  boardingClosesDomestic: 15,
  boardingClosesInternational: 20,
  bagDropClosesDomestic: 45,
  bagDropClosesInternational: 60,
  bufferSameTicket: 30,
  bufferSeparateTickets: 60,
  longLayover: 300,
  /** Leaving-the-airport check. */
  cityRoundTrip: 90,
  backBeforeInternational: 120,
  backBeforeDomestic: 90,
  minimumTimeOutside: 120,
} as const

export const VERDICTS: Record<Verdict, { label: string; board: string; text: string; ink: string; soft: string; solid: string }> = {
  tight: { label: "Tight", board: "TIGHT", text: "Less time than the estimate needs", ink: "#b42318", soft: "#fef3f2", solid: "#d92d20" },
  risky: { label: "Risky", board: "RISKY", text: "Enough only if everything runs on time", ink: "#b54708", soft: "#fff5d6", solid: "#f59e0b" },
  comfortable: { label: "Comfortable", board: "COMFORTABLE", text: "Room for a modest delay", ink: "#067647", soft: "#e8f8f0", solid: "#12b76a" },
  long: { label: "Long", board: "LONG LAYOVER", text: "Plenty of time to connect", ink: "#4a1eac", soft: "#ebe8ff", solid: "#612bd3" },
}

export function suggestImmigration(type: ConnectionType, ticketing: Ticketing) {
  if (type === "intl-dom") return true
  if (type === "intl-intl" && ticketing === "separate") return true
  return false
}

export function suggestBagRecheck(type: ConnectionType, ticketing: Ticketing) {
  return ticketing === "separate" || type === "intl-dom"
}

export type LayoverInput = {
  airport: Place
  arrivalDate: string
  arrivalTime: string
  departureDate: string
  departureTime: string
  type: ConnectionType
  ticketing: Ticketing
  terminal: TerminalChange
  bags: boolean
  immigration: boolean
}

export type Segment = { key: string; label: string; minutes: number; note: string }

export type LayoverResult = {
  arrival: Date
  departure: Date
  /** Minutes on the ground between the scheduled arrival and departure. */
  have: number
  /** Minutes the estimate needs to make the onward flight. */
  need: number
  buffer: number
  segments: Segment[]
  verdict: Verdict
  /** Only for long layovers: estimated free minutes outside the airport, if entry is allowed. */
  timeOutside: number | null
  overnight: boolean
}

export type LayoverError = { error: "invalid" | "before" }

export function calculateLayover(input: LayoverInput): LayoverResult | LayoverError {
  const arrival = zonedToUtc(input.arrivalDate, input.arrivalTime, input.airport.tz)
  const departure = zonedToUtc(input.departureDate, input.departureTime, input.airport.tz)
  if (!arrival || !departure || Number.isNaN(arrival.getTime()) || Number.isNaN(departure.getTime())) return { error: "invalid" }
  const have = Math.round((departure.getTime() - arrival.getTime()) / 60000)
  if (have <= 0) return { error: "before" }

  const G = GUIDANCE
  const arrivesInternational = input.type === "intl-dom" || input.type === "intl-intl"
  const departsInternational = input.type === "dom-intl" || input.type === "intl-intl"
  const separate = input.ticketing === "separate"
  // Transfer screening is common after an international arrival and whenever you leave the secure area.
  const security = arrivesInternational || input.immigration || input.bags || separate

  const head: Segment[] = [
    {
      key: "deplane",
      label: "Get off the plane",
      minutes: arrivesInternational ? G.deplaneInternational : G.deplaneDomestic,
      note: arrivesInternational ? "Larger aircraft, longer to deplane" : "Taxi to the gate and deplane",
    },
  ]
  if (input.immigration) head.push({ key: "immigration", label: "Passport control", minutes: G.immigration, note: "Can be far longer at busy times" })
  if (input.bags) head.push({ key: "bags", label: separate ? "Collect bags and check in again" : "Collect and re-check bags", minutes: G.bagRecheck, note: "Baggage reclaim, customs, bag drop" })

  const walk = input.terminal === "yes" ? G.walkTerminalChange : input.terminal === "unsure" ? G.walkTerminalUnsure : G.walkSameTerminal
  const tail: Segment[] = []
  if (security) tail.push({ key: "security", label: "Transfer security", minutes: G.security, note: "Re-screening before the next gate" })
  tail.push({
    key: "walk",
    label: input.terminal === "yes" ? "Change terminal" : "Walk to the gate",
    minutes: walk,
    note: input.terminal === "yes" ? "Train, bus or long walk" : input.terminal === "unsure" ? "Allowing for a possible terminal change" : "Same terminal",
  })
  tail.push({
    key: "boarding",
    label: "Boarding closes",
    minutes: departsInternational ? G.boardingClosesInternational : G.boardingClosesDomestic,
    note: "Gates usually close before departure",
  })

  // On separate tickets with bags, the onward airline's bag-drop cut-off is usually the real deadline.
  const tailMinutes = tail.reduce((sum, item) => sum + item.minutes, 0)
  const cutoff = separate && input.bags ? (departsInternational ? G.bagDropClosesInternational : G.bagDropClosesDomestic) : 0
  const segments =
    cutoff > tailMinutes
      ? [...head, { key: "cutoff", label: "Bag drop closes", minutes: cutoff, note: "Security, the walk and boarding fit inside it" }]
      : [...head, ...tail]

  const need = segments.reduce((sum, item) => sum + item.minutes, 0)
  const buffer = separate ? G.bufferSeparateTickets : G.bufferSameTicket

  let verdict: Verdict
  if (have < need) verdict = "tight"
  else if (have < need + buffer) verdict = "risky"
  else if (have >= G.longLayover) verdict = "long"
  else verdict = "comfortable"

  let timeOutside: number | null = null
  if (verdict === "long") {
    const out =
      (arrivesInternational ? G.deplaneInternational + G.immigration : G.deplaneDomestic) +
      G.cityRoundTrip +
      (departsInternational ? G.backBeforeInternational : G.backBeforeDomestic)
    timeOutside = Math.max(0, have - out)
  }

  return {
    arrival,
    departure,
    have,
    need,
    buffer,
    segments,
    verdict,
    timeOutside,
    overnight: input.arrivalDate !== input.departureDate,
  }
}

export function isLayoverError(value: LayoverResult | LayoverError): value is LayoverError {
  return "error" in value
}

/** "1h 25m", "45m", "6h". */
export function formatSpan(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (!h) return `${m}m`
  return `${h}h${m ? ` ${m}m` : ""}`
}

export function formatLocal(date: Date, place: Place) {
  return `${formatIn(date, place.tz, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} ${zoneAbbreviation(date, place.tz)}`
}

export function addDays(dateValue: string, days: number) {
  const [y, m, d] = dateValue.split("-").map(Number)
  const next = new Date(Date.UTC(y, m - 1, d + days))
  return next.toISOString().slice(0, 10)
}

export function layoverSummary(input: LayoverInput, result: LayoverResult) {
  const type = CONNECTION_TYPES.find((item) => item.value === input.type)?.label.toLowerCase() ?? ""
  return [
    `Layover at ${input.airport.iata} (${input.airport.city}): ${formatSpan(result.have)}, ${VERDICTS[result.verdict].label.toLowerCase()}.`,
    `Arrive ${formatLocal(result.arrival, input.airport)}, next flight ${formatLocal(result.departure, input.airport)}.`,
    `Estimated time needed: about ${formatSpan(result.need)} (${type}, ${input.ticketing === "same" ? "one ticket" : "separate tickets"}).`,
    "General guidance from TripCache's layover calculator, not an official minimum connection time. Check your airline.",
  ].join("\n")
}

function icsText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n")
}

/** One calendar event spanning the connection, from landing to the onward departure (UTC times). */
export function layoverIcs(input: LayoverInput, result: LayoverResult) {
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  const steps = result.segments.map((item) => `${item.label}: ~${item.minutes} min`).join("\n")
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TripCache//Layover calculator//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(result.arrival)}-${input.airport.iata}-layover@trip-cache.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(result.arrival)}`,
    `DTEND:${stamp(result.departure)}`,
    `SUMMARY:${icsText(`Layover at ${input.airport.iata} · ${formatSpan(result.have)}`)}`,
    `LOCATION:${icsText(input.airport.name)}`,
    `DESCRIPTION:${icsText(
      `Land ${formatLocal(result.arrival, input.airport)}. Next flight departs ${formatLocal(result.departure, input.airport)}.\n` +
        `Estimated time needed: about ${formatSpan(result.need)} (${VERDICTS[result.verdict].label}).\n${steps}\n` +
        "General guidance only. Your airline's minimum connection time and boarding times are authoritative.",
    )}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Connection: head to your next gate",
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}
