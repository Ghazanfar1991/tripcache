"use client"

import { ArrowLeftRight, CalendarPlus, Check, Compass, Copy, Info, MoonStar, Plane, PlaneLanding, Sparkles, TimerReset } from "lucide-react"
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
import { JetLagTimeline, Legend } from "@/components/seo/jet-lag-timeline"
import { DepartureBoard, type BoardRow, type BoardTime } from "@/components/site/tools-departure-board"
import { cx } from "@/components/site/kit"
import { estimateMinutes, formatDuration, formatIn, greatCircleKm, zoneAbbreviation, type Place } from "@/lib/flight-time"
import { formatShift, planIcs, planJetLag, planText, sleepLengthMinutes, summaryLine, type JetLagPlan } from "@/lib/jet-lag"

const FIELD =
  "tct-field h-12 w-full rounded-[12px] border border-tc-line bg-tc-mist px-3.5 text-[15.5px] text-tc-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-tc-mute focus:border-tc-violet focus:bg-white focus:shadow-[0_0_0_4px_rgba(97,43,211,0.14)]"
const LABEL = "mb-1.5 block text-[13.5px] font-semibold text-tc-ink"

/* ------------------------------------------------------------------ */
/* Airport picker (same pattern as the flight arrival calculator)      */
/* ------------------------------------------------------------------ */

function AirportField({ label, value, onChange, arriving = false }: { label: string; value: Place; onChange: (place: Place) => void; arriving?: boolean }) {
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
        <Plane className={cx("pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-tc-violet", arriving && "rotate-90")} aria-hidden="true" />
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

export type JetLagDefaults = { from: Place; to: Place; date: string; time: string; hours: number; minutes: number; bedtime: string; wake: string }

function boardFor(plan: JetLagPlan | null, to: Place): { rows: BoardRow[]; time: BoardTime | null } {
  if (!plan) return { rows: [{ text: "ENTER FLIGHT" }], time: null }
  if (plan.direction === "none") return { rows: [{ text: to.city.toUpperCase() }, { text: "NO JET LAG", tone: "gold" }], time: null }
  const days = plan.daysNoPrep
  const line = days === 1 ? "1 DAY TO ADJUST" : days < 10 ? `${days} DAYS TO ADJUST` : `${days} DAYS TO ADAPT`
  const whole = Math.floor(plan.hours + 1e-9)
  const minutes = Math.round((plan.hours - whole) * 60)
  return {
    rows: [{ text: to.city.toUpperCase() }, { text: line, tone: "gold" }],
    time: { hh: String(whole).padStart(2, "0"), mm: String(minutes).padStart(2, "0"), period: plan.direction === "east" ? "EAST" : "WEST", zone: "Body-clock shift" },
  }
}

export function JetLagPlanner({ defaults }: { defaults: JetLagDefaults }) {
  const [from, setFrom] = useState(defaults.from)
  const [to, setTo] = useState(defaults.to)
  const [date, setDate] = useState(defaults.date)
  const [time, setTime] = useState(defaults.time)
  const [hours, setHours] = useState(String(defaults.hours))
  const [minutes, setMinutes] = useState(String(defaults.minutes))
  const [bedtime, setBedtime] = useState(defaults.bedtime)
  const [wake, setWake] = useState(defaults.wake)
  const [headStart, setHeadStart] = useState(true)
  const [copied, setCopied] = useState(false)

  const duration = (Number(hours) || 0) * 60 + (Number(minutes) || 0)
  const plan = useMemo(
    () => planJetLag({ from, to, date, time, durationMinutes: duration, bedtime, wake, headStart }),
    [from, to, date, time, duration, bedtime, wake, headStart],
  )
  const estimate = useMemo(() => estimateMinutes(greatCircleKm(from, to)), [from, to])
  const board = useMemo(() => boardFor(plan, to), [plan, to])
  const sleepLength = sleepLengthMinutes(bedtime, wake)
  const sleepInvalid = sleepLength !== null && (sleepLength < 180 || sleepLength > 840)

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const download = useCallback(() => {
    if (!plan) return
    const blob = new Blob([planIcs(plan, from, to)], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `jet-lag-plan-${from.iata}-${to.iata}.ics`.toLowerCase()
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, [plan, from, to])

  const copy = async () => {
    if (!plan) return
    try {
      await navigator.clipboard.writeText(planText(plan, from, to))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const stamp = (value: Date, tz: string) => `${formatIn(value, tz, { weekday: "short", hour: "numeric", minute: "2-digit" })} ${zoneAbbreviation(value, tz)}`

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {/* Inputs */}
        <form
          className="relative rounded-[26px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:p-7"
          onSubmit={(event) => event.preventDefault()}
          aria-label="Trip details"
        >
          <div className="relative grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-start">
            <AirportField label="From (home airport)" value={from} onChange={setFrom} />
            <button
              type="button"
              onClick={swap}
              aria-label="Swap departure and arrival airports"
              className="tc-press mx-auto grid size-10 place-items-center rounded-full border border-tc-line bg-white text-tc-violet transition-colors hover:bg-tc-violet-soft sm:mt-[30px]"
            >
              <ArrowLeftRight className="size-4" aria-hidden="true" />
            </button>
            <AirportField label="To (destination airport)" value={to} onChange={setTo} arriving />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="jetlag-date" className={LABEL}>
                Departure date
              </label>
              <input id="jetlag-date" type="date" className={FIELD} value={date} onChange={(event) => setDate(event.target.value)} required />
            </div>
            <div>
              <label htmlFor="jetlag-time" className={LABEL}>
                Departure time (local)
              </label>
              <input id="jetlag-time" type="time" className={FIELD} value={time} onChange={(event) => setTime(event.target.value)} required />
            </div>
          </div>

          <fieldset className="mt-5">
            <legend className={LABEL}>Flight duration</legend>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  aria-label="Flight duration hours"
                  inputMode="numeric"
                  type="number"
                  min={0}
                  max={23}
                  className={cx(FIELD, "pr-14")}
                  value={hours}
                  onChange={(event) => setHours(event.target.value)}
                />
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[13.5px] text-tc-mute">hours</span>
              </div>
              <div className="relative">
                <input
                  aria-label="Flight duration minutes"
                  inputMode="numeric"
                  type="number"
                  min={0}
                  max={59}
                  step={5}
                  className={cx(FIELD, "pr-16")}
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                />
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[13.5px] text-tc-mute">minutes</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setHours(String(Math.floor(estimate / 60)))
                setMinutes(String(estimate % 60))
              }}
              className="tc-press mt-3 inline-flex min-h-10 items-center gap-2 rounded-[10px] px-2 text-[14px] font-semibold text-tc-violet hover:bg-tc-violet-soft"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              Don’t know it? Use an estimate: {formatDuration(estimate)}
            </button>
          </fieldset>

          <fieldset className="mt-5 border-t border-tc-line pt-5">
            <legend className="sr-only">Your usual sleep at home</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="jetlag-bed" className={LABEL}>
                  Usual bedtime
                </label>
                <input id="jetlag-bed" type="time" className={FIELD} value={bedtime} onChange={(event) => setBedtime(event.target.value)} aria-describedby="jetlag-sleep-help" />
              </div>
              <div>
                <label htmlFor="jetlag-wake" className={LABEL}>
                  Usual wake time
                </label>
                <input id="jetlag-wake" type="time" className={FIELD} value={wake} onChange={(event) => setWake(event.target.value)} aria-describedby="jetlag-sleep-help" />
              </div>
            </div>
            <p id="jetlag-sleep-help" className={cx("mt-2 text-[12.5px] leading-5", sleepInvalid ? "font-semibold text-[#b42318]" : "text-tc-mute")}>
              {sleepInvalid ? "Enter a usual night of 3 to 14 hours." : "Optional. The plan keeps the same sleep length and moves it to the new clock."}
            </p>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[14px] bg-tc-mist px-4 py-3.5 ring-1 ring-inset ring-tc-line">
              <input type="checkbox" checked={headStart} onChange={(event) => setHeadStart(event.target.checked)} className="mt-0.5 size-[18px] shrink-0 accent-[#612bd3]" />
              <span>
                <span className="block text-[14.5px] font-semibold text-tc-ink">Start shifting my sleep before I fly</span>
                <span className="mt-0.5 block text-[13px] leading-5 text-tc-mute">Move bedtime and wake time 1 hour a day toward the destination for up to 3 days.</span>
              </span>
            </label>
          </fieldset>
        </form>

        {/* Result */}
        <section aria-live="polite" aria-label="Jet lag estimate" className="flex flex-col gap-4">
          <div className="tct-surface rounded-[26px] p-4 sm:p-6">
            <DepartureBoard
              meta={`${from.iata} → ${to.iata}`}
              label="Jet lag plan"
              icon={
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#8b5cf6]/25 text-[#c4b5fd]">
                  <MoonStar className="size-3.5" />
                </span>
              }
              rows={board.rows}
              time={board.time}
            />
          </div>

          {plan ? (
            <div className="rounded-[26px] border border-tc-line bg-white p-5 sm:p-6">
              <p className="font-tc-display text-[22px] font-semibold leading-snug text-tc-ink sm:text-[25px]">
                {plan.direction === "none" ? (
                  <>No real jet lag on this trip</>
                ) : (
                  <>
                    About {plan.daysNoPrep} day{plan.daysNoPrep === 1 ? "" : "s"} to adjust to <span className="text-tc-violet">{to.city}</span> time
                  </>
                )}
              </p>
              <p className="mt-1.5 text-[14.5px] leading-6 text-tc-mute">{summaryLine(plan, to)}</p>

              <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-tc-line pt-5 sm:grid-cols-2">
                <Fact icon={<Compass className="size-4" />} label="Time zones crossed">
                  {plan.direction === "none" ? "None that matter" : `${plan.zones} ${plan.direction}ward`}
                  {plan.direction !== "none" ? (
                    <span className="block text-[13px] text-tc-mute">{plan.direction === "east" ? "Eastward trips are usually harder." : "Westward trips are usually easier."}</span>
                  ) : null}
                </Fact>
                <Fact icon={<TimerReset className="size-4" />} label="With this plan">
                  {plan.direction === "none"
                    ? "Keep your usual routine"
                    : plan.preDays
                      ? `About ${plan.daysWithPlan} day${plan.daysWithPlan === 1 ? "" : "s"} after landing`
                      : `About ${plan.daysWithPlan} day${plan.daysWithPlan === 1 ? "" : "s"}, no head start`}
                  {plan.preDays ? <span className="block text-[13px] text-tc-mute">After shifting {formatShift(plan.preShiftHours)} before you fly.</span> : null}
                </Fact>
                <Fact icon={<PlaneLanding className="size-4" />} label={`You land (${to.city} time)`}>
                  {stamp(plan.arrival, to.tz)}
                </Fact>
                <Fact icon={<MoonStar className="size-4" />} label={`Your body clock (${from.city} time)`}>
                  {stamp(plan.arrival, from.tz)}
                </Fact>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={download}
                  className="tc-press inline-flex h-11 items-center gap-2 rounded-[12px] bg-tc-violet px-4 text-[14.5px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] hover:bg-[#5520cb]"
                >
                  <CalendarPlus className="size-4" aria-hidden="true" />
                  Add plan to calendar
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="tc-press inline-flex h-11 items-center gap-2 rounded-[12px] border border-tc-line bg-white px-4 text-[14.5px] font-semibold text-tc-ink hover:bg-tc-mist"
                >
                  {copied ? <Check className="size-4 text-[#067647]" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy plan"}
                </button>
              </div>
              <p className="mt-4 flex gap-2 text-[12.5px] leading-5 text-tc-mute">
                <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                General guidance, not medical advice. Recovery times are estimates and vary from person to person.
              </p>
            </div>
          ) : (
            <p className="rounded-[20px] border border-dashed border-tc-line bg-white px-5 py-4 text-[15px] text-tc-mute">
              {sleepInvalid ? "Check your usual bedtime and wake time to build the plan." : "Add a departure date, time and flight duration to build your jet lag plan."}
            </p>
          )}
        </section>
      </div>

      {plan ? (
        <section aria-labelledby="jetlag-plan-heading" className="rounded-[26px] border border-tc-line bg-tc-mist/60 p-3 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:bg-white sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 border-b border-tc-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="jetlag-plan-heading" className="text-balance font-tc-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
                Your day-by-day jet lag plan
              </h2>
              <p className="mt-2 max-w-[58ch] text-[15.5px] leading-7 text-tc-ink-2">
                A sleep and light schedule for {from.city} to {to.city}, one day at a time. Times are local to where you are that day.
              </p>
            </div>
            <Legend className="lg:max-w-[420px] lg:justify-end" />
          </div>
          <div className="mt-8">
            <JetLagTimeline plan={plan} from={from} to={to} />
          </div>
        </section>
      ) : null}
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
        <dd className="mt-0.5 text-[15px] leading-6 text-tc-ink">{children}</dd>
      </div>
    </div>
  )
}
