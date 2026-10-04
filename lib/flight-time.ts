/** Time-zone maths for the flight arrival time calculator. Pure; runs on server and client. */

export type Place = { iata: string; city: string; name: string; tz: string; lat: number; lon: number }

function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date)
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute"), second: get("second") }
}

/** Minutes the zone is ahead of UTC at that instant (DST-aware). */
export function offsetMinutes(date: Date, timeZone: string) {
  const p = zonedParts(date, timeZone)
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second)
  return Math.round((asUtc - date.getTime()) / 60000)
}

/** A wall-clock date + time in a zone → the real instant. */
export function zonedToUtc(dateValue: string, timeValue: string, timeZone: string): Date | null {
  const [y, m, d] = dateValue.split("-").map(Number)
  const [hh, mm] = timeValue.split(":").map(Number)
  if (![y, m, d, hh, mm].every(Number.isFinite)) return null
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm))
  const first = new Date(guess.getTime() - offsetMinutes(guess, timeZone) * 60000)
  // Second pass settles DST edges.
  return new Date(guess.getTime() - offsetMinutes(first, timeZone) * 60000)
}

export function formatIn(date: Date, timeZone: string, options: Intl.DateTimeFormatOptions) {
  // Newer ICU puts a narrow no-break space before AM/PM, older ICU a plain space; normalise so the
  // server HTML and every browser render the same text.
  return new Intl.DateTimeFormat("en-US", { timeZone, ...options }).format(date).replace(/[  ]/g, " ")
}

/**
 * Short zone label: a letter abbreviation where en-US has one (EST, PDT, HST), otherwise GMT±h[:mm]
 * built from the offset. Node and browsers ship different ICU data and disagree on the fallback
 * ("GMT" vs "GMT+0" for London in winter), which broke hydration, so the offset form is computed here.
 */
export function zoneAbbreviation(date: Date, timeZone: string) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? ""
  if (/^[A-Z]{2,5}$/.test(name) && name !== "GMT" && name !== "UTC") return name
  const offset = offsetMinutes(date, timeZone)
  if (offset === 0) return "GMT"
  const abs = Math.abs(offset)
  return `GMT${offset > 0 ? "+" : "-"}${Math.floor(abs / 60)}${abs % 60 ? `:${String(abs % 60).padStart(2, "0")}` : ""}`
}

/** Calendar-day difference between the departure date and the arrival date, each in its own zone. */
function dayIndex(date: Date, timeZone: string) {
  const p = zonedParts(date, timeZone)
  return Math.floor(Date.UTC(p.year, p.month - 1, p.day) / 86400000)
}

export function greatCircleKm(a: Place, b: Place) {
  const rad = Math.PI / 180
  const dLat = (b.lat - a.lat) * rad
  const dLon = (b.lon - a.lon) * rad
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

/** Rough block time: ~870 km/h average plus 30 minutes for taxi, climb and descent. An estimate, not a schedule. */
export function estimateMinutes(km: number) {
  return Math.max(35, Math.round(((km / 870) * 60 + 30) / 5) * 5)
}

export type ArrivalResult = {
  departure: Date
  arrival: Date
  dayShift: number
  zoneDifferenceMinutes: number
  distanceKm: number
}

export function calculateArrival(from: Place, to: Place, date: string, time: string, durationMinutes: number): ArrivalResult | null {
  const departure = zonedToUtc(date, time, from.tz)
  if (!departure || !Number.isFinite(durationMinutes) || durationMinutes <= 0) return null
  const arrival = new Date(departure.getTime() + durationMinutes * 60000)
  return {
    departure,
    arrival,
    dayShift: dayIndex(arrival, to.tz) - dayIndex(departure, from.tz),
    zoneDifferenceMinutes: offsetMinutes(arrival, to.tz) - offsetMinutes(departure, from.tz),
    distanceKm: greatCircleKm(from, to),
  }
}

export function formatDuration(minutes: number) {
  const sign = minutes < 0 ? "-" : ""
  const abs = Math.abs(minutes)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return `${sign}${h}h${m ? ` ${m}m` : ""}`
}

/** Calendar file with the flight as one event (UTC times, so every calendar app shows it correctly). */
export function flightIcs(from: Place, to: Place, result: ArrivalResult, label: string) {
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TripCache//Flight arrival calculator//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(result.departure)}-${from.iata}-${to.iata}@trip-cache.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(result.departure)}`,
    `DTEND:${stamp(result.arrival)}`,
    `SUMMARY:${label}`,
    `LOCATION:${from.name} → ${to.name}`,
    "DESCRIPTION:Times calculated by TripCache from the departure time and duration you entered. Check your airline for the final schedule.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}
