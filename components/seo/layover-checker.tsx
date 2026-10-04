"use client"

import { CalendarPlus, Check, Copy, DoorOpen, Info, MoonStar, Plane, PlaneLanding, PlaneTakeoff, TicketsPlane } from "lucide-react"
import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { DepartureBoard, type BoardTime } from "@/components/site/tools-departure-board"
import { cx } from "@/components/site/kit"
import { zoneAbbreviation, type Place } from "@/lib/flight-time"
import {
  addDays,
  calculateLayover,
  CONNECTION_TYPES,
  formatLocal,
  formatSpan,
  GUIDANCE,
  isLayoverError,
  layoverIcs,
  layoverSummary,
  suggestBagRecheck,
  suggestImmigration,
  VERDICTS,
  type ConnectionType,
  type LayoverInput,
  type TerminalChange,
  type Ticketing,
} from "@/lib/layover"

const FIELD =
  "h-12 w-full rounded-[12px] border border-tc-line bg-tc-mist px-3.5 text-[15.5px] text-tc-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-tc-mute focus:border-tc-violet focus:bg-white focus:shadow-[0_0_0_4px_rgba(97,43,211,0.14)]"
const LABEL = "mb-1.5 block text-[13.5px] font-semibold text-tc-ink"

/** Violet shades for the "time needed" segments, darkest first. */
const SEGMENT_COLORS = ["#2a1170", "#4a1eac", "#612bd3", "#7c4ee4", "#9b7bf0", "#b9a3f6"]

/* ------------------------------------------------------------------ */
/* Airport picker (same pattern as the flight arrival calculator)      */
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
        <Plane className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-tc-violet" aria-hidden="true" />
        <input
          id={id}
          role="combobox"
          aria-expanded={showing}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showing && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          className={cx(FIELD, "pl-10")}
          placeholder={`${value.iata} · ${value.city} (type to change)`}
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
        <ul id={listId} role="listbox" className="absolute inset-x-0 top-[78px] z-30 max-h-72 overflow-auto rounded-[16px] border border-tc-line bg-white p-1.5 shadow-[0_30px_60px_-30px_rgba(45,27,87,0.5)]">
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
/* Segmented radio group                                               */
/* ------------------------------------------------------------------ */

function Choice<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  hint,
  columns = "grid-cols-2",
}: {
  legend: ReactNode
  name: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  hint?: ReactNode
  columns?: string
}) {
  return (
    <fieldset className="min-w-0">
      <legend className={LABEL}>{legend}</legend>
      <div className={cx("grid gap-1 rounded-[14px] border border-tc-line bg-white p-1", columns)}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cx(
              "tc-press relative flex min-h-10 cursor-pointer items-center justify-center rounded-[10px] px-2.5 py-2 text-center text-[13.5px] font-semibold leading-tight transition-colors duration-200",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-tc-violet",
              value === option.value ? "bg-tc-violet text-white" : "text-tc-ink-2 hover:bg-tc-mist",
            )}
          >
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="sr-only" />
            {option.label}
          </label>
        ))}
      </div>
      {hint ? <p className="mt-1.5 text-[12.5px] leading-5 text-tc-mute">{hint}</p> : null}
    </fieldset>
  )
}

const YES_NO = [
  { value: "yes" as const, label: "Yes" },
  { value: "no" as const, label: "No" },
]

/* ------------------------------------------------------------------ */

export type LayoverDefaults = Omit<LayoverInput, "immigration" | "bags">

export function LayoverChecker({ defaults }: { defaults: LayoverDefaults }) {
  const [airport, setAirport] = useState(defaults.airport)
  const [arrivalDate, setArrivalDate] = useState(defaults.arrivalDate)
  const [arrivalTime, setArrivalTime] = useState(defaults.arrivalTime)
  const [departureDate, setDepartureDate] = useState(defaults.departureDate)
  const [departureTime, setDepartureTime] = useState(defaults.departureTime)
  const [type, setType] = useState<ConnectionType>(defaults.type)
  const [ticketing, setTicketing] = useState<Ticketing>(defaults.ticketing)
  const [terminal, setTerminal] = useState<TerminalChange>(defaults.terminal)
  const [bags, setBags] = useState(suggestBagRecheck(defaults.type, defaults.ticketing))
  const [immigration, setImmigration] = useState(suggestImmigration(defaults.type, defaults.ticketing))
  const [copied, setCopied] = useState(false)

  // Changing the connection type or ticketing re-applies the suggestions; the traveller can still edit them.
  const applySuggestions = (nextType: ConnectionType, nextTicketing: Ticketing) => {
    setImmigration(suggestImmigration(nextType, nextTicketing))
    setBags(suggestBagRecheck(nextType, nextTicketing))
  }

  const input: LayoverInput = { airport, arrivalDate, arrivalTime, departureDate, departureTime, type, ticketing, terminal, bags, immigration }
  const outcome = calculateLayover(input)
  const result = isLayoverError(outcome) ? null : outcome
  const error = isLayoverError(outcome) ? outcome.error : null

  const board = (() => {
    if (!result) return null
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: airport.tz, hour: "2-digit", minute: "2-digit", hour12: true }).formatToParts(result.departure)
    const part = (name: string) => parts.find((item) => item.type === name)?.value ?? ""
    const time: BoardTime = { hh: part("hour").padStart(2, "0"), mm: part("minute"), period: part("dayPeriod").toUpperCase(), zone: zoneAbbreviation(result.departure, airport.tz) }
    return {
      time,
      rows: [{ text: `${airport.iata} · ${formatSpan(result.have).toUpperCase()}` }, { text: VERDICTS[result.verdict].board, tone: "gold" as const }],
    }
  })()

  const summary = result ? layoverSummary(input, result) : ""

  const download = () => {
    if (!result) return
    const blob = new Blob([layoverIcs(input, result)], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `layover-${airport.iata}-${arrivalDate}.ics`.toLowerCase()
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const suggestedImmigration = suggestImmigration(type, ticketing)
  const suggestedBags = suggestBagRecheck(type, ticketing)
  const nextDay = addDays(arrivalDate, 1)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      {/* Inputs */}
      <form
        className="relative self-start rounded-[26px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:p-7"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Connection details"
      >
        <AirportField label="Connecting airport" value={airport} onChange={setAirport} />

        <div className="mt-5 grid gap-4">
          <fieldset className="min-w-0">
            <legend className={cx(LABEL, "flex items-center gap-1.5")}>
              <PlaneLanding className="size-4 text-tc-violet" aria-hidden="true" />
              First flight lands (local)
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <input aria-label="Landing date" type="date" className={cx(FIELD, "tct-field")} value={arrivalDate} onChange={(event) => setArrivalDate(event.target.value)} required />
              <input aria-label="Landing time" type="time" className={cx(FIELD, "tct-field")} value={arrivalTime} onChange={(event) => setArrivalTime(event.target.value)} required />
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className={cx(LABEL, "flex items-center gap-1.5")}>
              <PlaneTakeoff className="size-4 text-tc-violet" aria-hidden="true" />
              Next flight departs (local)
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <input aria-label="Departure date" type="date" className={cx(FIELD, "tct-field")} value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} required />
              <input aria-label="Departure time" type="time" className={cx(FIELD, "tct-field")} value={departureTime} onChange={(event) => setDepartureTime(event.target.value)} required />
            </div>
          </fieldset>
        </div>
        <p className="mt-2 text-[12.5px] leading-5 text-tc-mute">
          Use the times printed on your tickets. Both are local time in {airport.city}, so the time zone and any clock change are handled for you.
        </p>
        {error === "before" ? (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[14px] bg-[#fff5d6] px-4 py-3 text-[14px] text-[#7a2e0e]">
            <span>The next flight departs before the first one lands. Overnight connection?</span>
            <button
              type="button"
              onClick={() => setDepartureDate(nextDay)}
              className="tc-press inline-flex min-h-9 items-center gap-1.5 rounded-[10px] bg-white px-3 text-[13.5px] font-semibold text-tc-violet ring-1 ring-[#f5d58a] hover:bg-tc-violet-soft"
            >
              <MoonStar className="size-4" aria-hidden="true" />
              Depart the next day
            </button>
          </div>
        ) : null}

        <div className="mt-6 grid gap-5 border-t border-tc-line pt-6">
          <Choice
            legend="Connection type"
            name="connection-type"
            value={type}
            columns="grid-cols-2 sm:grid-cols-4"
            options={CONNECTION_TYPES.map((item) => ({ value: item.value, label: item.short }))}
            onChange={(next) => {
              setType(next)
              applySuggestions(next, ticketing)
            }}
            hint={CONNECTION_TYPES.find((item) => item.value === type)?.label}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Choice
              legend="Tickets"
              name="ticketing"
              value={ticketing}
              options={[
                { value: "same", label: "One ticket" },
                { value: "separate", label: "Separate tickets" },
              ]}
              onChange={(next) => {
                setTicketing(next)
                applySuggestions(type, next)
              }}
            />
            <Choice
              legend="Terminal change?"
              name="terminal"
              value={terminal}
              columns="grid-cols-3"
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
                { value: "unsure", label: "Not sure" },
              ]}
              onChange={setTerminal}
            />
            <Choice
              legend="Collect and re-check bags?"
              name="bags"
              value={bags ? "yes" : "no"}
              options={YES_NO}
              onChange={(next) => setBags(next === "yes")}
              hint={bags === suggestedBags ? "Suggested for this connection" : `Usually ${suggestedBags ? "yes" : "no"} for this connection`}
            />
            <Choice
              legend="Clear immigration / customs?"
              name="immigration"
              value={immigration ? "yes" : "no"}
              options={YES_NO}
              onChange={(next) => setImmigration(next === "yes")}
              hint={immigration === suggestedImmigration ? "Suggested for this connection" : `Usually ${suggestedImmigration ? "yes" : "no"} for this connection`}
            />
          </div>
        </div>
      </form>

      {/* Result */}
      <section aria-live="polite" aria-label="Layover result" className="flex min-w-0 flex-col gap-4">
        <div className="tct-surface rounded-[26px] p-4 sm:p-6">
          <DepartureBoard
            meta={`${airport.iata} connection`}
            label="Next flight departs"
            icon={
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#6366f1]/25 text-[#a5b4fc]">
                <Plane className="size-3.5" />
              </span>
            }
            rows={board?.rows ?? [{ text: "CHECK TIMES" }]}
            time={board?.time ?? null}
          />
        </div>

        {result ? (
          <div className="rounded-[26px] border border-tc-line bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-tc-display text-[24px] font-semibold leading-snug text-tc-ink sm:text-[28px]">
                <span className="tabular-nums">{formatSpan(result.have)}</span> layover
              </p>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[13px] font-bold"
                style={{ backgroundColor: VERDICTS[result.verdict].soft, color: VERDICTS[result.verdict].ink }}
              >
                {VERDICTS[result.verdict].label}
              </span>
              {result.overnight ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-tc-mist px-2.5 py-1 text-[12.5px] font-semibold text-tc-ink-2">
                  <MoonStar className="size-3.5" aria-hidden="true" />
                  Overnight
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 text-[15px] leading-6 text-tc-ink-2">
              {VERDICTS[result.verdict].text}.{" "}
              {result.have >= result.need
                ? `About ${formatSpan(result.have - result.need)} to spare over the estimated ${formatSpan(result.need)} needed.`
                : `About ${formatSpan(result.need - result.have)} short of the estimated ${formatSpan(result.need)} needed.`}
            </p>
            <p className="mt-1 text-[13.5px] text-tc-mute">
              Lands {formatLocal(result.arrival, airport)} · departs {formatLocal(result.departure, airport)}
            </p>

            <Breakdown have={result.have} need={result.need} buffer={result.buffer} segments={result.segments} solid={VERDICTS[result.verdict].solid} />

            {result.verdict === "long" && result.timeOutside !== null ? (
              <div className="mt-5 flex gap-3 rounded-[16px] bg-tc-violet-soft/60 p-4">
                <DoorOpen className="mt-0.5 size-5 shrink-0 text-tc-violet" aria-hidden="true" />
                <p className="text-[14.5px] leading-6 text-tc-ink-2">
                  {result.timeOutside >= GUIDANCE.minimumTimeOutside ? (
                    <>
                      <strong className="text-tc-ink">Leaving the airport may be realistic:</strong> roughly {formatSpan(result.timeOutside)} outside after
                      allowing time to get through arrivals, travel to and from the city (~{formatSpan(GUIDANCE.cityRoundTrip)}) and be back{" "}
                      {formatSpan(type === "dom-intl" || type === "intl-intl" ? GUIDANCE.backBeforeInternational : GUIDANCE.backBeforeDomestic)} before departure.
                      Only if your passport or visa lets you enter the country and your bags are checked through to your destination.
                    </>
                  ) : (
                    <>
                      <strong className="text-tc-ink">Probably better to stay in the airport.</strong> After arrivals, a city round trip and getting back in time,
                      there would be little time left outside.
                    </>
                  )}
                </p>
              </div>
            ) : null}

            {ticketing === "separate" ? (
              <div className="mt-5 flex gap-3 rounded-[16px] bg-[#fff5d6] p-4">
                <TicketsPlane className="mt-0.5 size-5 shrink-0 text-[#b54708]" aria-hidden="true" />
                <p className="text-[14.5px] leading-6 text-[#7a2e0e]">
                  On separate tickets the second airline usually has no obligation to wait or rebook you if the first flight is late, so the
                  verdict asks for a bigger buffer ({formatSpan(GUIDANCE.bufferSeparateTickets)} instead of {GUIDANCE.bufferSameTicket}m).
                </p>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={download}
                className="tc-press inline-flex h-11 items-center gap-2 rounded-[12px] bg-tc-violet px-4 text-[14.5px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] hover:bg-[#5520cb]"
              >
                <CalendarPlus className="size-4" aria-hidden="true" />
                Add connection to calendar
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

            <p className="mt-5 flex gap-2 border-t border-tc-line pt-4 text-[12.5px] leading-5 text-tc-mute">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              General guidance only, not {airport.iata}’s official minimum connection time. Your airline’s published minimum connection time, boarding
              times and transit rules are authoritative.
            </p>
          </div>
        ) : (
          <p className="rounded-[20px] border border-dashed border-tc-line bg-white px-5 py-4 text-[15px] text-tc-mute">
            {error === "before"
              ? "The next flight’s departure is earlier than the landing time. Check the dates: overnight connections depart the next day."
              : "Add both flights’ dates and local times to check the connection."}
          </p>
        )}
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Time needed vs time you have                                         */
/* ------------------------------------------------------------------ */

function Breakdown({
  have,
  need,
  buffer,
  segments,
  solid,
}: {
  have: number
  need: number
  buffer: number
  segments: { key: string; label: string; minutes: number; note: string }[]
  solid: string
}) {
  const scale = Math.max(have, need + buffer) * 1.04
  const pct = (minutes: number) => `${(minutes / scale) * 100}%`
  const bar = "h-4 overflow-hidden rounded-full bg-tc-mist"
  const grow = "transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"

  return (
    <div className="mt-5 border-t border-tc-line pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-[13.5px]">
        <span className="font-semibold text-tc-ink">Time needed (estimate)</span>
        <span className="whitespace-nowrap tabular-nums text-tc-ink-2">
          {formatSpan(need)} <span className="text-tc-mute">+ {formatSpan(buffer)} delay buffer</span>
        </span>
      </div>
      <div className={cx(bar, "mt-2 flex")} aria-hidden="true">
        {segments.map((segment, index) => (
          <span
            key={segment.key}
            className={cx("h-full border-r border-white/70 last:border-r-0", grow)}
            style={{ width: pct(segment.minutes), backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }}
          />
        ))}
        <span
          className={cx("h-full", grow)}
          style={{
            width: pct(buffer),
            backgroundImage: "repeating-linear-gradient(135deg, #cfc3f7 0 4px, #ebe8ff 4px 8px)",
          }}
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3 text-[13.5px]">
        <span className="font-semibold text-tc-ink">Time you have</span>
        <span className="tabular-nums text-tc-ink-2">{formatSpan(have)}</span>
      </div>
      <div className={cx(bar, "mt-2")} aria-hidden="true">
        <span className={cx("block h-full rounded-full", grow)} style={{ width: pct(have), backgroundColor: solid }} />
      </div>

      <ol className="mt-5 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
        {segments.map((segment, index) => (
          <li key={segment.key} className="flex gap-2.5 text-[13.5px] leading-5">
            <span className="mt-1 size-2.5 shrink-0 rounded-full" style={{ backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }} aria-hidden="true" />
            <span className="min-w-0">
              <span className="font-semibold text-tc-ink">{segment.label}</span>{" "}
              <span className="tabular-nums text-tc-ink-2">~{segment.minutes} min</span>
              <span className="block text-[12.5px] text-tc-mute">{segment.note}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[12.5px] leading-5 text-tc-mute">All durations are rough estimates for a typical connection, not measured times for this airport.</p>
    </div>
  )
}

