/**
 * Jet lag planner maths. Pure; runs on server and client.
 *
 * Assumptions (stated on the page as an estimate, not medical advice):
 * - The time difference is the change in UTC offset between departure and arrival, DST-aware.
 *   Gaps over 12 hours are planned the shorter way round the clock.
 * - Rule of thumb: the body clock shifts about 1 hour a day after eastward trips and about
 *   1.5 hours a day after westward ones.
 * - Optional head start: sleep and wake move 1 hour a day toward the destination for up to 3 days.
 * - Light windows are placed around the body clock's low point, taken as 2 hours before the usual
 *   wake time on the body clock. Light in the hours after it tends to shift the clock earlier (eastward);
 *   light in the hours before it tends to shift it later (westward). Windows are clipped to waking hours.
 */
import { formatIn, offsetMinutes, zonedToUtc, type Place } from "@/lib/flight-time"

const MIN = 60000
const HOUR = 60 * MIN

export type BlockKind = "sleep" | "flightSleep" | "flight" | "seek" | "avoid" | "body"
export type Block = { kind: BlockKind; start: Date; end: Date }
export type Direction = "east" | "west" | "none"

export type PlanDay = {
  key: string
  phase: "before" | "after"
  title: string
  date: string
  tz: string
  city: string
  start: Date
  end: Date
  /** Clipped to the day, for the 24-hour track. */
  blocks: Block[]
  /** Whole blocks this day owns, for text, copy and calendar. */
  items: Block[]
  /** Remaining body-clock gap in hours (after landing) or the head-start shift so far (before flying). */
  hours: number
  note: string
}

export type FlightLeg = { start: Date; end: Date; sleep: Block | null; tips: string[] }

export type JetLagPlan = {
  departure: Date
  arrival: Date
  shiftMinutes: number
  rawShiftMinutes: number
  wrapped: boolean
  direction: Direction
  hours: number
  zones: number
  rate: number
  daysNoPrep: number
  preDays: number
  preShiftHours: number
  remainingHours: number
  daysWithPlan: number
  before: PlanDay[]
  flight: FlightLeg
  after: PlanDay[]
}

export type JetLagInput = {
  from: Place
  to: Place
  date: string
  time: string
  durationMinutes: number
  bedtime: string
  wake: string
  headStart: boolean
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function parseClock(value: string): number | null {
  const [h, m] = value.split(":").map(Number)
  if (!Number.isFinite(h) || !Number.isFinite(m) || h < 0 || h > 23 || m < 0 || m > 59) return null
  return h * 60 + m
}

const clock = (minutes: number) => `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`

export function addDays(date: string, days: number) {
  const [y, m, d] = date.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

export function localDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date)
}

const shifted = (block: Block, hours: number): Block => ({ ...block, start: new Date(block.start.getTime() + hours * HOUR), end: new Date(block.end.getTime() + hours * HOUR) })
const add = (date: Date, ms: number) => new Date(date.getTime() + ms)

/** The usual night that starts on the evening of `date` (a bedtime after midnight belongs to the evening before). */
function nightOf(date: string, tz: string, bed: number, wake: number, kind: BlockKind = "sleep"): Block {
  const bedDate = bed < 12 * 60 ? addDays(date, 1) : date
  const wakeDate = wake > bed ? bedDate : addDays(bedDate, 1)
  return { kind, start: zonedToUtc(bedDate, clock(bed), tz) as Date, end: zonedToUtc(wakeDate, clock(wake), tz) as Date }
}

function overlap(a: Block, start: Date, end: Date): Block | null {
  const s = Math.max(a.start.getTime(), start.getTime())
  const e = Math.min(a.end.getTime(), end.getTime())
  return e > s ? { ...a, start: new Date(s), end: new Date(e) } : null
}

/** `window` minus every busy interval, keeping pieces of at least `minMinutes`. */
function subtract(window: Block, busy: { start: Date; end: Date }[], minMinutes = 45): Block[] {
  let pieces: Block[] = [window]
  for (const b of busy) {
    const next: Block[] = []
    for (const p of pieces) {
      if (b.end <= p.start || b.start >= p.end) {
        next.push(p)
        continue
      }
      if (b.start > p.start) next.push({ ...p, end: b.start })
      if (b.end < p.end) next.push({ ...p, start: b.end })
    }
    pieces = next
  }
  return pieces.filter((p) => p.end.getTime() - p.start.getTime() >= minMinutes * MIN)
}

function clipToDay(blocks: Block[], start: Date, end: Date) {
  return blocks.map((b) => overlap(b, start, end)).filter((b): b is Block => Boolean(b))
}

/** Light windows around the body clock's low point (2 h before the body's usual wake time). */
function lightWindows(direction: Direction, lowPoint: Date, lag: number): Block[] {
  // Settled (or no real gap): ordinary morning daylight after the usual wake time.
  if (direction === "none" || lag <= 0) return [{ kind: "seek", start: add(lowPoint, 2 * HOUR), end: add(lowPoint, 4 * HOUR) }]
  return direction === "east"
    ? [
        { kind: "avoid", start: add(lowPoint, -AVOID_HOURS * HOUR), end: lowPoint },
        { kind: "seek", start: lowPoint, end: add(lowPoint, SEEK_HOURS * HOUR) },
      ]
    : [
        { kind: "seek", start: add(lowPoint, -SEEK_HOURS * HOUR), end: lowPoint },
        { kind: "avoid", start: lowPoint, end: add(lowPoint, AVOID_HOURS * HOUR) },
      ]
}

/** Hours of light to seek / avoid either side of the body clock's low point. */
export const SEEK_HOURS = 8
export const AVOID_HOURS = 3

const sortBlocks = (blocks: Block[]) => [...blocks].sort((a, b) => a.start.getTime() - b.start.getTime())

/* ------------------------------------------------------------------ */
/* Plan                                                                */
/* ------------------------------------------------------------------ */

export const MAX_AFTER_DAYS = 7

export function sleepLengthMinutes(bedtime: string, wake: string) {
  const bed = parseClock(bedtime)
  const up = parseClock(wake)
  if (bed === null || up === null) return null
  return (up - bed + 1440) % 1440
}

export function planJetLag(input: JetLagInput): JetLagPlan | null {
  const { from, to, date, time, durationMinutes, headStart } = input
  const bed = parseClock(input.bedtime)
  const wake = parseClock(input.wake)
  const sleepLength = sleepLengthMinutes(input.bedtime, input.wake)
  if (bed === null || wake === null || sleepLength === null || sleepLength < 180 || sleepLength > 840) return null
  const departure = zonedToUtc(date, time, from.tz)
  if (!departure || !Number.isFinite(durationMinutes) || durationMinutes <= 0 || durationMinutes > 24 * 60) return null
  const arrival = add(departure, durationMinutes * MIN)

  const raw = offsetMinutes(arrival, to.tz) - offsetMinutes(departure, from.tz)
  let shift = raw
  if (shift > 720) shift -= 1440
  if (shift < -720) shift += 1440
  const direction: Direction = Math.abs(shift) < 60 ? "none" : shift > 0 ? "east" : "west"
  const hours = Math.abs(shift) / 60
  const sign = direction === "east" ? 1 : direction === "west" ? -1 : 0
  const rate = direction === "west" ? 1.5 : 1
  const daysNoPrep = direction === "none" ? 0 : Math.ceil(hours / rate - 1e-9)
  const preDays = headStart && direction !== "none" ? Math.min(3, Math.ceil(hours - 1e-9)) : 0
  const preShiftHours = preDays ? Math.min(preDays, hours) : 0
  const remainingHours = direction === "none" ? 0 : hours - preShiftHours
  const daysWithPlan = Math.ceil(remainingHours / rate - 1e-9)

  /* Before you fly: home time zone, nights move 1 hour a day toward the destination. */
  const amountFor = (daysBefore: number) => (daysBefore > preDays ? 0 : Math.min(preDays - daysBefore + 1, hours))
  const lastSafeWake = add(departure, -2.5 * HOUR)
  const homeNight = (daysBefore: number) => {
    const night = shifted(nightOf(addDays(date, -daysBefore), from.tz, bed, wake), -sign * amountFor(daysBefore))
    if (daysBefore === 1 && night.end > lastSafeWake) night.end = lastSafeWake
    return night
  }

  const before: PlanDay[] = []
  for (let daysBefore = preDays; daysBefore >= 1; daysBefore -= 1) {
    const day = addDays(date, -daysBefore)
    const start = zonedToUtc(day, "00:00", from.tz) as Date
    const end = zonedToUtc(addDays(day, 1), "00:00", from.tz) as Date
    const previous = homeNight(daysBefore + 1)
    const tonight = homeNight(daysBefore)
    const amount = amountFor(daysBefore)
    const sleeps = [previous, tonight].filter((b) => b.end > b.start)
    const usual = [nightOf(addDays(day, -1), from.tz, bed, wake, "body"), nightOf(day, from.tz, bed, wake, "body")]
    const morning = previous.end
    const light: Block[] =
      direction === "east"
        ? [
            { kind: "seek", start: morning, end: add(morning, 2 * HOUR) },
            { kind: "avoid", start: add(tonight.start, -2 * HOUR), end: tonight.start },
          ]
        : [
            { kind: "avoid", start: morning, end: add(morning, 2 * HOUR) },
            { kind: "seek", start: add(tonight.start, -3 * HOUR), end: tonight.start },
          ]
    const owned = light.flatMap((w) => subtract(w, sleeps)).filter((w) => w.start >= start && w.start < end)
    const lit = clipToDay(owned, start, end)
    const verb = direction === "east" ? "earlier" : "later"
    before.push({
      key: `before-${daysBefore}`,
      phase: "before",
      title: daysBefore === 1 ? "Day before you fly" : `${daysBefore} days before`,
      date: day,
      tz: from.tz,
      city: from.city,
      start,
      end,
      blocks: sortBlocks([...clipToDay(usual, start, end), ...clipToDay(sleeps, start, end), ...lit]),
      items: sortBlocks([...owned, ...(tonight.end > tonight.start ? [tonight] : [])]),
      hours: amount,
      note: `Go to bed and get up ${formatShift(amount)} ${verb} than usual.`,
    })
  }

  /* In the air: sleep where the flight overlaps the destination's usual night. */
  const settledStart = add(departure, 45 * MIN)
  const settledEnd = add(arrival, -45 * MIN)
  let flightSleep: Block | null = null
  if (settledEnd > settledStart) {
    const firstNight = addDays(localDate(departure, to.tz), -1)
    const lastNight = localDate(arrival, to.tz)
    for (let night = firstNight; night <= lastNight; night = addDays(night, 1)) {
      const hit = overlap(nightOf(night, to.tz, bed, wake, "flightSleep"), settledStart, settledEnd)
      if (hit && hit.end.getTime() - hit.start.getTime() >= HOUR && (!flightSleep || hit.end.getTime() - hit.start.getTime() > flightSleep.end.getTime() - flightSleep.start.getTime())) {
        flightSleep = hit
      }
    }
  }
  const at = (d: Date) => formatIn(d, to.tz, { hour: "numeric", minute: "2-digit" })
  const tips = [`Set your watch and phone to ${to.city} time when you board.`]
  if (flightSleep) tips.push(`It is night in ${to.city} from ${at(flightSleep.start)} to ${at(flightSleep.end)} on this flight: try to sleep then. An eye mask and earplugs help.`)
  else tips.push(`It is daytime in ${to.city} for most of this flight, so try to stay awake. If you do nap, keep it short.`)
  tips.push("Drink water through the flight, and go easy on alcohol and caffeine.")

  /* After you land: local sleep from the first night, light timed to the body clock as it catches up. */
  const arrivalDay = localDate(arrival, to.tz)
  const count = direction === "none" ? 1 : Math.min(MAX_AFTER_DAYS, daysWithPlan + 1)
  const after: PlanDay[] = []
  const lightByDay: Block[][] = []
  for (let index = 0; index < count; index += 1) {
    const day = addDays(arrivalDay, index)
    const start = zonedToUtc(day, "00:00", to.tz) as Date
    const end = zonedToUtc(addDays(day, 1), "00:00", to.tz) as Date
    const lag = Math.max(0, remainingHours - rate * index)
    const flight: Block[] = index === 0 && arrival > start ? [{ kind: "flight", start: departure, end: arrival }] : []
    const sleeps: Block[] = []
    const morning = nightOf(addDays(day, -1), to.tz, bed, wake)
    if (index > 0) sleeps.push(morning)
    else if (morning.end.getTime() - add(arrival, 45 * MIN).getTime() >= HOUR) sleeps.push({ ...morning, start: new Date(Math.max(morning.start.getTime(), add(arrival, 45 * MIN).getTime())) })
    const tonight = nightOf(day, to.tz, bed, wake)
    const settled = add(arrival, 45 * MIN)
    const lateArrival = index === 0 && arrival >= add(tonight.start, -2 * HOUR)
    if (index === 0 && tonight.start < settled) tonight.start = settled
    sleeps.push(tonight)
    const body = lag > 0 ? [shifted(nightOf(addDays(day, -1), to.tz, bed, wake, "body"), sign * lag), shifted(nightOf(day, to.tz, bed, wake, "body"), sign * lag)] : []
    const lows = [day, addDays(day, 1)].map((d) => add(zonedToUtc(d, clock(wake), to.tz) as Date, (sign * lag - 2) * HOUR))
    const busy = [...sleeps, ...flight, ...(index === 0 ? [{ start: new Date(0), end: add(arrival, 45 * MIN) }] : [])]
    const owned = lows
      .flatMap((low) => lightWindows(direction, low, lag))
      .flatMap((w) => subtract(w, busy))
      .filter((w) => w.start >= start && w.start < end)
    lightByDay.push(owned)
    const daySleepItem = index === 0 && sleeps.length === 2 ? [sleeps[0]] : []
    after.push({
      key: `after-${index + 1}`,
      phase: "after",
      title: `Day ${index + 1} in ${to.city}`,
      date: day,
      tz: to.tz,
      city: to.city,
      start,
      end,
      blocks: sortBlocks([
        ...clipToDay(body, start, end),
        ...clipToDay(flight, start, end),
        ...(index === 0 && flightSleep ? clipToDay([flightSleep], start, end) : []),
        ...clipToDay(sleeps, start, end),
      ]),
      items: sortBlocks([...daySleepItem, ...owned, tonight]),
      hours: lag,
      note: lateArrival && lag > 0 ? `Body clock about ${formatShift(lag)} ${direction === "east" ? "behind" : "ahead of"} ${to.city}. You land close to bedtime: head to bed soon after you arrive and get up at your usual time.` : afterNote(index, lag, direction, to.city, input.bedtime),
    })
  }

  // Light windows can run past midnight, so each day's track takes its share of all of them.
  const allLight = lightByDay.flat()
  for (const day of after) day.blocks = sortBlocks([...day.blocks, ...clipToDay(allLight, day.start, day.end)])

  return {
    departure,
    arrival,
    shiftMinutes: shift,
    rawShiftMinutes: raw,
    wrapped: shift !== raw,
    direction,
    hours,
    zones: Math.round(hours),
    rate,
    daysNoPrep,
    preDays,
    preShiftHours,
    remainingHours,
    daysWithPlan,
    before,
    flight: { start: departure, end: arrival, sleep: flightSleep, tips },
    after,
  }
}

export function formatShift(hours: number) {
  const whole = Math.floor(hours + 1e-9)
  const minutes = Math.round((hours - whole) * 60)
  if (!whole) return `${minutes} minutes`
  return `${whole} hour${whole === 1 ? "" : "s"}${minutes ? ` ${minutes} minutes` : ""}`
}

export function hourAdjective(hours: number) {
  return `${Number.isInteger(hours) ? hours : Number(hours.toFixed(2))}-hour`
}

function afterNote(index: number, lag: number, direction: Direction, city: string, bedtime: string) {
  const bed = parseClock(bedtime) ?? 23 * 60
  const bedLabel = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(Date.UTC(2000, 0, 1, Math.floor(bed / 60), bed % 60))).replace(/[\u202f\u00a0]/g, " ")
  if (direction === "none" || lag <= 0) {
    return index === 0 ? `No real body-clock gap. Keep your usual routine on ${city} time.` : `Your body clock should be close to ${city} time now. Keep a regular routine and morning daylight.`
  }
  const gap = `Body clock about ${formatShift(lag)} ${direction === "east" ? "behind" : "ahead of"} ${city}.`
  if (index === 0) return `${gap} Stay up until about ${bedLabel} local time. If you must nap, keep it short and early in the afternoon.`
  return `${gap} Keep to local meal and sleep times.`
}

/* ------------------------------------------------------------------ */
/* Text and calendar                                                   */
/* ------------------------------------------------------------------ */

export const BLOCK_LABEL: Record<BlockKind, string> = {
  sleep: "Sleep",
  flightSleep: "Sleep on the plane",
  flight: "In flight",
  seek: "Seek bright light",
  avoid: "Avoid bright light",
  body: "Body-clock night",
}

export function timeRange(block: Block, tz: string) {
  const fmt = (d: Date) => formatIn(d, tz, { hour: "numeric", minute: "2-digit" })
  return `${fmt(block.start)} – ${fmt(block.end)}`
}

const dayLabel = (date: Date, tz: string) => formatIn(date, tz, { weekday: "short", day: "numeric", month: "short" })

export function planText(plan: JetLagPlan, from: Place, to: Place) {
  const lines: string[] = [`Jet lag plan: ${from.city} (${from.iata}) to ${to.city} (${to.iata})`]
  lines.push(summaryLine(plan, to))
  if (plan.before.length) {
    lines.push("", `BEFORE YOU FLY (${from.city} time)`)
    for (const day of plan.before) lines.push(`${dayLabel(day.start, day.tz)}: ${day.items.map((b) => `${BLOCK_LABEL[b.kind]} ${timeRange(b, day.tz)}`).join("; ")}`)
  }
  lines.push("", `IN THE AIR (${to.city} time)`)
  if (plan.flight.sleep) lines.push(`${BLOCK_LABEL.flightSleep} ${timeRange(plan.flight.sleep, to.tz)}`)
  for (const tip of plan.flight.tips) lines.push(`- ${tip}`)
  lines.push("", `AFTER YOU LAND (${to.city} time)`)
  for (const day of plan.after) lines.push(`${dayLabel(day.start, day.tz)}: ${day.items.map((b) => `${BLOCK_LABEL[b.kind]} ${timeRange(b, day.tz)}`).join("; ")}`)
  lines.push("", "General guidance, not medical advice. Made with the TripCache jet lag calculator: https://trip-cache.com/tools/jet-lag-calculator")
  return lines.join("\n")
}

export function summaryLine(plan: JetLagPlan, to: Place) {
  if (plan.direction === "none") return `Less than an hour of time difference with ${to.city}: no real jet lag to plan for.`
  const zones = plan.wrapped
    ? `${formatShift(Math.abs(plan.rawShiftMinutes) / 60)} ${plan.rawShiftMinutes > 0 ? "ahead" : "behind"} on the clock, which your body handles like a ${hourAdjective(plan.hours)} ${plan.direction}ward shift`
    : `${formatShift(plan.hours)} ${plan.direction === "east" ? "ahead" : "behind"} (${plan.direction}ward)`
  const withPlan = plan.preDays ? ` About ${plan.daysWithPlan} day${plan.daysWithPlan === 1 ? "" : "s"} with a ${plan.preDays}-day head start.` : ""
  return `${to.city} is ${zones}. Estimated recovery: about ${plan.daysNoPrep} day${plan.daysNoPrep === 1 ? "" : "s"} without preparation.${withPlan}`
}

export function planIcs(plan: JetLagPlan, from: Place, to: Place) {
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  const now = stamp(new Date())
  const seen = new Set<string>()
  const events: string[] = []
  const push = (block: Block, note: string) => {
    const uid = `${stamp(block.start)}-${block.kind}-${from.iata}-${to.iata}@trip-cache.com`
    if (seen.has(uid)) return
    seen.add(uid)
    events.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART:${stamp(block.start)}`,
      `DTEND:${stamp(block.end)}`,
      `SUMMARY:${BLOCK_LABEL[block.kind]} (jet lag plan)`,
      `DESCRIPTION:${note} General guidance from the TripCache jet lag calculator\\, not medical advice.`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    )
  }
  const notes: Partial<Record<BlockKind, string>> = {
    sleep: "Planned sleep window.",
    flightSleep: `Night-time in ${to.city}: try to sleep on the plane.`,
    seek: "Get daylight or bright light now.",
    avoid: "Keep light low now: sunglasses outdoors\\, dim screens indoors.",
  }
  for (const day of [...plan.before, ...plan.after]) for (const block of day.items) push(block, notes[block.kind] ?? "")
  if (plan.flight.sleep) push(plan.flight.sleep, notes.flightSleep ?? "")
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TripCache//Jet lag calculator//EN", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR"].join("\r\n")
}
