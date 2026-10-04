"use client"

import { ArrowLeftRight, CalendarPlus, Check, Clock, Copy, Globe2, MoonStar, Plane, Ruler, Sparkles } from "lucide-react"
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
import { DepartureBoard, type BoardTime } from "@/components/seo/tools-departure-board"
import { cx } from "@/components/seo/tool-ui"
import {
  calculateArrival,
  estimateMinutes,
  flightIcs,
  formatDuration,
  formatIn,
  greatCircleKm,
  zoneAbbreviation,
  type Place,
} from "@/lib/flight-time"

const FIELD =
  "h-12 w-full rounded-[12px] border border-tc-line bg-tc-mist px-3.5 text-[15.5px] text-tc-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-tc-mute focus:border-tc-violet focus:bg-white focus:shadow-[0_0_0_4px_rgba(97,43,211,0.14)]"
const LABEL = "mb-1.5 block text-[13.5px] font-semibold text-tc-ink"

/* ------------------------------------------------------------------ */
/* Airport picker                                                      */
/* ------------------------------------------------------------------ */

function AirportField({ label, value, onChange }: { label: string; value: Place; onChange: (place: Place) => void }) {
  const id = useId()
  const listId = `${id}-list`
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<Place[]>([])
  const [active, setActive] = useState(0)
  const timer = useRef<number>(0)

  useEffect(() => {
    if (!open || query.trim().length < 2) return
    window.clearTimeout(timer.current)
    const controller = new AbortController()
    timer.current = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/airports?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        const json = (await response.json()) as { results: Place[] }
        setResults(json.results)
        setActive(0)
      } catch {
        /* aborted or offline: keep the last list */
      }
    }, 140)
    return () => {
      window.clearTimeout(timer.current)
      controller.abort()
    }
  }, [query, open])

  const choose = (place: Place) => {
    onChange(place)
    setQuery("")
    setOpen(false)
  }

  const showing = open && query.trim().length >= 2

  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        <Plane className={cx("pointer-events-none absolute left-3.5 top-[50%] size-4 -translate-y-1/2 text-tc-violet", label.startsWith("To") && "rotate-90")} aria-hidden="true" />
        <input
          id={id}
          role="combobox"
          aria-expanded={showing}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showing && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          className={cx(FIELD, "pl-10")}
          placeholder={`${value.iata} · ${value.city}`}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={(event) => {
            if (!showing || !results.length) return
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setActive((index) => Math.min(results.length - 1, index + 1))
            } else if (event.key === "ArrowUp") {
              event.preventDefault()
              setActive((index) => Math.max(0, index - 1))
            } else if (event.key === "Enter") {
              event.preventDefault()
              choose(results[active])
            } else if (event.key === "Escape") {
              setOpen(false)
            }
          }}
        />
      </div>
      <p className="mt-1.5 truncate text-[12.5px] text-tc-mute">
        <span className="font-semibold text-tc-ink-2">{value.iata}</span> · {value.name}
      </p>
      {showing ? (
        <ul id={listId} role="listbox" className="absolute inset-x-0 top-[78px] z-[30] max-h-72 overflow-auto rounded-[16px] border border-tc-line bg-white p-1.5 shadow-[0_30px_60px_-30px_rgba(45,27,87,0.5)]">
          {results.length ? (
            results.map((place, index) => (
              <li
                key={place.iata}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                onMouseDown={(event) => {
                  event.preventDefault()
                  choose(place)
                }}
                onMouseEnter={() => setActive(index)}
                className={cx("flex cursor-pointer items-center gap-3 rounded-[12px] px-3 py-2.5", index === active && "bg-tc-violet-soft")}
              >
                <span className="w-10 shrink-0 font-tc-display text-[17px] font-semibold text-tc-violet">{place.iata}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-tc-ink">{place.city}</span>
                  <span className="block truncate text-[12.5px] text-tc-mute">{place.name}</span>
                </span>
              </li>
            ))
          ) : (
            <li className="px-3 py-2.5 text-[14px] text-tc-mute">Searching airports…</li>
          )}
        </ul>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */

export type FlightCalculatorDefaults = { from: Place; to: Place; date: string; time: string; hours: number; minutes: number }

export function FlightArrivalCalculator({ defaults }: { defaults: FlightCalculatorDefaults }) {
  const [from, setFrom] = useState(defaults.from)
  const [to, setTo] = useState(defaults.to)
  const [date, setDate] = useState(defaults.date)
  const [time, setTime] = useState(defaults.time)
  const [hours, setHours] = useState(String(defaults.hours))
  const [minutes, setMinutes] = useState(String(defaults.minutes))
  const [copied, setCopied] = useState(false)

  const duration = (Number(hours) || 0) * 60 + (Number(minutes) || 0)
  const result = useMemo(() => calculateArrival(from, to, date, time, duration), [from, to, date, time, duration])
  const estimate = useMemo(() => estimateMinutes(greatCircleKm(from, to)), [from, to])

  const board = useMemo(() => {
    if (!result) return null
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: to.tz, hour: "2-digit", minute: "2-digit", hour12: true }).formatToParts(result.arrival)
    const part = (type: string) => parts.find((item) => item.type === type)?.value ?? ""
    const time: BoardTime = { hh: part("hour").padStart(2, "0"), mm: part("minute"), period: part("dayPeriod").toUpperCase(), zone: zoneAbbreviation(result.arrival, to.tz) }
    const day = formatIn(result.arrival, to.tz, { weekday: "short", day: "numeric", month: "short" }).toUpperCase().replace(",", "")
    return { time, rows: [{ text: to.city.toUpperCase() }, { text: `${day}`, tone: "gold" as const }] }
  }, [result, to])

  const summary = result
    ? `${from.iata} → ${to.iata}: departs ${formatIn(result.departure, from.tz, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} ${zoneAbbreviation(result.departure, from.tz)}, arrives ${formatIn(result.arrival, to.tz, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} ${zoneAbbreviation(result.arrival, to.tz)} local time.`
    : ""

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const download = useCallback(() => {
    if (!result) return
    const blob = new Blob([flightIcs(from, to, result, `Flight ${from.iata} → ${to.iata}`)], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `flight-${from.iata}-${to.iata}.ics`.toLowerCase()
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, [from, to, result])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const shiftLabel = !result ? "" : result.dayShift === 0 ? "Same day" : result.dayShift > 0 ? `+${result.dayShift} day${result.dayShift > 1 ? "s" : ""}` : `${result.dayShift} day`
  const zoneDiff = result?.zoneDifferenceMinutes ?? 0

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      {/* Inputs */}
      <form
        className="relative rounded-[26px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:p-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Flight details"
      >
        <div className="relative grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-start">
          <AirportField label="From (departure airport)" value={from} onChange={setFrom} />
          <button
            type="button"
            onClick={swap}
            aria-label="Swap departure and arrival airports"
            className="tc-press mx-auto grid size-10 place-items-center rounded-full border border-tc-line bg-white text-tc-violet transition-colors hover:bg-tc-violet-soft sm:mt-[30px]"
          >
            <ArrowLeftRight className="size-4" aria-hidden="true" />
          </button>
          <AirportField label="To (arrival airport)" value={to} onChange={setTo} />
        </div>

        <div className="mt-5 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-4">
          <div>
            <label htmlFor="flight-date" className={LABEL}>
              Departure date
            </label>
            <input id="flight-date" type="date" className={FIELD} value={date} onChange={(event) => setDate(event.target.value)} required />
          </div>
          <div>
            <label htmlFor="flight-time" className={LABEL}>
              Departure time (local)
            </label>
            <input id="flight-time" type="time" className={FIELD} value={time} onChange={(event) => setTime(event.target.value)} required />
          </div>
        </div>

        <fieldset className="mt-5">
          <legend className={LABEL}>Flight duration</legend>
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-4">
            <div className="relative">
              <input
                aria-label="Hours"
                inputMode="numeric"
                type="number"
                min={0}
                max={23}
                className={cx(FIELD, "pr-14")}
                value={hours}
                onChange={(event) => setHours(event.target.value)}
              />
              <span className="pointer-events-none absolute right-3.5 top-[50%] -translate-y-1/2 text-[13.5px] text-tc-mute">hours</span>
            </div>
            <div className="relative">
              <input
                aria-label="Minutes"
                inputMode="numeric"
                type="number"
                min={0}
                max={59}
                step={5}
                className={cx(FIELD, "pr-16")}
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
              />
              <span className="pointer-events-none absolute right-3.5 top-[50%] -translate-y-1/2 text-[13.5px] text-tc-mute">minutes</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setHours(String(Math.floor(estimate / 60)))
              setMinutes(String(estimate % 60))
            }}
            className="tc-press mt-3 inline-flex min-h-10 items-center gap-2 rounded-[0.625rem] px-2 text-[14px] font-semibold text-tc-violet hover:bg-tc-violet-soft"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            Don’t know it? Use an estimate: {formatDuration(estimate)}
          </button>
          <p className="mt-1 px-2 text-[12.5px] leading-5 text-tc-mute">
            The estimate uses the great-circle distance and a typical jet speed. Your ticket’s scheduled duration is always more accurate.
          </p>
        </fieldset>
      </form>

      {/* Result */}
      <section aria-live="polite" aria-label="Arrival time" className="flex flex-col gap-4">
        <div className="tct-surface rounded-[26px] p-4 sm:p-6">
          <DepartureBoard
            meta={`${from.iata} → ${to.iata}`}
            label="Local arrival"
            icon={
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#6366f1]/25 text-[#a5b4fc]">
                <Plane className="size-3.5" />
              </span>
            }
            rows={board?.rows ?? [{ text: "ENTER FLIGHT" }]}
            time={board?.time ?? null}
          />
        </div>

        {result ? (
          <div className="rounded-[26px] border border-tc-line bg-white p-5 sm:p-6">
            <p className="font-tc-display text-[22px] font-semibold leading-snug text-tc-ink sm:text-[25px]">
              Lands{" "}
              {formatIn(result.arrival, to.tz, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}{" "}
              <span className="text-tc-violet">{zoneAbbreviation(result.arrival, to.tz)}</span>
            </p>
            <p className="mt-1.5 text-[14.5px] text-tc-mute">Local time in {to.city}. {summary.split(":")[0]}.</p>

            <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-tc-line pt-5 sm:grid-cols-2">
              <Fact icon={<Clock className="size-4" />} label="Calendar date">
                <span className={cx("rounded-full px-2 py-0.5 text-[12.5px] font-bold", result.dayShift === 0 ? "bg-[#e8f8f0] text-[#067647]" : "bg-[#fff5d6] text-[#b54708]")}>{shiftLabel}</span>{" "}
                compared with departure
              </Fact>
              <Fact icon={<Globe2 className="size-4" />} label="Time difference">
                {zoneDiff === 0 ? "Same time zone" : `${to.city} is ${formatDuration(Math.abs(zoneDiff))} ${zoneDiff > 0 ? "ahead of" : "behind"} ${from.city}`}
              </Fact>
              <Fact icon={<MoonStar className="size-4" />} label={`Your body clock (${from.city} time)`}>
                {formatIn(result.arrival, from.tz, { weekday: "short", hour: "numeric", minute: "2-digit" })} {zoneAbbreviation(result.arrival, from.tz)}
              </Fact>
              <Fact icon={<Ruler className="size-4" />} label="Distance">
                {Math.round(result.distanceKm).toLocaleString("en-US")} km · {Math.round(result.distanceKm * 0.621371).toLocaleString("en-US")} mi
              </Fact>
            </dl>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={download}
                className="tc-press inline-flex h-11 items-center gap-2 rounded-[12px] bg-tc-violet px-4 text-[14.5px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] hover:bg-[#5520cb]"
              >
                <CalendarPlus className="size-4" aria-hidden="true" />
                Add to calendar
              </button>
              <button
                type="button"
                onClick={copy}
                className="tc-press inline-flex h-11 items-center gap-2 rounded-[12px] border border-tc-line bg-white px-4 text-[14.5px] font-semibold text-tc-ink hover:bg-tc-mist"
              >
                {copied ? <Check className="size-4 text-tc-hotel" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copied ? "Copied" : "Copy summary"}
              </button>
            </div>
          </div>
        ) : (
          <p className="rounded-[20px] border border-dashed border-tc-line bg-white px-5 py-4 text-[0.9375rem] text-tc-mute">
            Add a departure date, time and duration to see the local arrival time.
          </p>
        )}
      </section>
    </div>
  )
}

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-tc-violet-soft text-tc-violet" aria-hidden="true">
        {icon}
      </span>
      <div>
        <dt className="text-[12.5px] font-semibold text-tc-mute">{label}</dt>
        <dd className="mt-0.5 text-[0.9375rem] leading-6 text-tc-ink">{children}</dd>
      </div>
    </div>
  )
}
