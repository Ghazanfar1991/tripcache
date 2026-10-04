import { BellRing, CalendarClock, ChevronDown } from "lucide-react"

import { buttonClass, cx } from "@/components/site/kit"
import { ReminderCalendarButton } from "@/components/seo/reminder-calendar-button"
import { DepartureBoard, type BoardTime } from "@/components/site/tools-departure-board"

const timeZones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
]

const policyOptions = [
  { label: "24 hours before check-in", hours: 24 },
  { label: "48 hours before check-in", hours: 48 },
  { label: "72 hours before check-in", hours: 72 },
  { label: "7 days before check-in", hours: 168 },
  { label: "14 days before check-in", hours: 336 },
]

interface CalculatorParams {
  hotelName?: string
  checkInDate?: string
  cutoffTime?: string
  policyHours?: string
  timeZone?: string
}

interface HotelCancellationCalculatorProps {
  values?: CalculatorParams
}

function getZonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour === "24" ? "0" : values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  }
}

function zonedDateTimeToUtc(dateValue: string, timeValue: string, timeZone: string) {
  const [year, month, day] = dateValue.split("-").map(Number)
  const [hour, minute] = timeValue.split(":").map(Number)
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0))
  const zonedParts = getZonedParts(utcGuess, timeZone)
  const zonedAsUtc = Date.UTC(
    zonedParts.year,
    zonedParts.month - 1,
    zonedParts.day,
    zonedParts.hour,
    zonedParts.minute,
    zonedParts.second,
  )
  const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0)
  const offset = zonedAsUtc - targetAsUtc

  return new Date(utcGuess.getTime() - offset)
}

function formatInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date)
}

function calculateDeadline(values?: CalculatorParams) {
  const checkInDate = values?.checkInDate ?? ""
  const cutoffTime = values?.cutoffTime || "18:00"
  const policyHours = values?.policyHours || "24"
  const timeZone = values?.timeZone || "America/New_York"

  if (!checkInDate || !cutoffTime) {
    return null
  }

  const policy = policyOptions.find((option) => option.hours === Number(policyHours)) ?? policyOptions[0]
  const checkInCutoff = zonedDateTimeToUtc(checkInDate, cutoffTime, timeZone)
  const deadline = new Date(checkInCutoff.getTime() - policy.hours * 60 * 60 * 1000)
  const twoDaysBefore = new Date(deadline.getTime() - 48 * 60 * 60 * 1000)
  const oneDayBefore = new Date(deadline.getTime() - 24 * 60 * 60 * 1000)
  const hotelName = values?.hotelName?.trim()
  const summary = `${hotelName ? `${hotelName}: ` : ""}Cancel by ${formatInZone(deadline, timeZone)}. Policy: ${policy.label}. Check-in cutoff: ${formatInZone(checkInCutoff, timeZone)}.`

  return {
    deadline,
    twoDaysBefore,
    oneDayBefore,
    summary,
    timeZone,
  }
}

/** Presentation only: the calculated deadline split into the pieces the departure board shows. */
function boardParts(date: Date, timeZone: string): { dateLine: string; time: BoardTime } {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  )

  return {
    dateLine: `${parts.weekday} ${parts.month} ${parts.day} ${parts.year}`,
    time: {
      hh: (parts.hour ?? "").padStart(2, "0"),
      mm: (parts.minute ?? "").padStart(2, "0"),
      period: (parts.dayPeriod ?? "").toUpperCase(),
      zone: parts.timeZoneName ?? "",
    },
  }
}

const fieldClass =
  "tct-field h-12 w-full rounded-[12px] border border-tc-line bg-tc-mist px-4 text-[16px] font-normal text-tc-ink outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-tc-mute hover:border-[#d5d8dc] focus:border-tc-violet focus:bg-white focus:shadow-[0_0_0_4px_rgba(97,43,211,0.14)]"

const labelClass = "grid gap-2 text-[14.5px] font-semibold text-tc-ink"

export function HotelCancellationCalculator({ values }: HotelCancellationCalculatorProps) {
  const result = calculateDeadline(values)
  const policyHours = values?.policyHours || "24"
  const timeZone = values?.timeZone || "America/New_York"
  const board = result ? boardParts(result.deadline, result.timeZone) : null
  const hotelName = values?.hotelName?.trim()

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-6">
      <form
        method="get"
        className="relative overflow-hidden rounded-[26px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:rounded-[30px] sm:p-8"
      >
        <div className="flex items-start gap-3.5">
          <div className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-tc-violet-soft text-tc-violet">
            <CalendarClock className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-tc-display text-[24px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[26px]">Calculate your deadline</h2>
            <p className="mt-1 text-[15px] leading-6 text-tc-mute">Use the policy wording from your hotel confirmation.</p>
          </div>
        </div>

        <div className="mt-7 grid gap-5">
          <label className={labelClass}>
            Hotel or provider name
            <input name="hotelName" defaultValue={values?.hotelName ?? ""} placeholder="Hilton Sydney" className={fieldClass} />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Check-in date
              <input name="checkInDate" type="date" defaultValue={values?.checkInDate ?? ""} className={fieldClass} />
            </label>

            <label className={labelClass}>
              Hotel cutoff time
              <input name="cutoffTime" type="time" defaultValue={values?.cutoffTime ?? "18:00"} className={fieldClass} />
            </label>
          </div>

          <label className={labelClass}>
            Cancellation policy window
            <span className="relative block">
              <select name="policyHours" defaultValue={policyHours} className={cx(fieldClass, "cursor-pointer appearance-none pr-11")}>
                {policyOptions.map((option) => (
                  <option key={option.hours} value={option.hours}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-tc-mute" aria-hidden="true" />
            </span>
          </label>

          <label className={labelClass}>
            Hotel time zone
            <span className="relative block">
              <select name="timeZone" defaultValue={timeZone} className={cx(fieldClass, "cursor-pointer appearance-none pr-11")}>
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replace("_", " ")}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-tc-mute" aria-hidden="true" />
            </span>
          </label>

          <button type="submit" className={cx(buttonClass("primary", "lg"), "mt-1 w-full")}>
            Calculate deadline
          </button>
        </div>
      </form>

      <section
        data-nav-theme="dark"
        aria-labelledby="cancellation-deadline-heading"
        className="tct-surface relative overflow-hidden rounded-[26px] p-4 text-white sm:rounded-[30px] sm:p-8"
      >
        <h2 id="cancellation-deadline-heading" className="sr-only">
          Your cancellation deadline
        </h2>
        {result && board ? (
          <div className="space-y-6">
            <DepartureBoard
              meta={timeZone.replace("_", " ")}
              label="Your cancellation deadline"
              rows={[...(hotelName ? [{ text: hotelName }] : []), { text: board.dateLine }]}
              time={board.time}
            />

            <div className="px-1 sm:px-0">
              <div className="font-tc-display text-[26px] font-semibold leading-[1.15] tracking-[-0.015em] [font-variant-numeric:tabular-nums] sm:text-[34px]">
                {formatInZone(result.deadline, result.timeZone)}
              </div>
              <p className="mt-3 max-w-[56ch] text-[15.5px] leading-7 text-white/70">
                This is the latest calculated cancellation time based on the check-in date, hotel cutoff time, policy
                window, and hotel time zone you entered.
              </p>
            </div>

            <ReminderCalendarButton
              title={`${hotelName ? `${hotelName}: ` : ""}free cancellation ends`}
              deadlineIso={result.deadline.toISOString()}
              reminderIsos={[result.twoDaysBefore.toISOString(), result.oneDayBefore.toISOString()]}
            />

            <ul className="grid gap-2.5">
              {[
                { title: "Reminder suggestion 1", text: formatInZone(result.twoDaysBefore, result.timeZone) },
                { title: "Reminder suggestion 2", text: formatInZone(result.oneDayBefore, result.timeZone) },
                { title: "Day-of backup", text: "Set one final reminder a few hours before the deadline." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3.5 rounded-[16px] border border-white/10 bg-white/[0.05] px-4 py-3.5">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#fff5d6] text-[#b54708]">
                    <BellRing className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-semibold text-white">{item.title}</span>
                    <span className="mt-0.5 block text-[14.5px] leading-6 text-white/70 [font-variant-numeric:tabular-nums]">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <label className="grid gap-2 text-[14.5px] font-semibold text-white">
              Copyable reminder summary
              <textarea
                readOnly
                value={result.summary}
                className="min-h-28 rounded-[16px] border border-white/15 bg-black/25 p-4 text-[15px] font-normal leading-7 text-white/80 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#a5b4fc] focus:shadow-[0_0_0_4px_rgba(165,180,252,0.18)]"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <DepartureBoard meta={timeZone.replace("_", " ")} label="Your cancellation deadline" rows={[{ text: "" }, { text: "" }]} />
            <p className="max-w-[46ch] px-1 text-[16px] leading-7 text-white/75 sm:px-0">Add the booking details to calculate the deadline.</p>
          </div>
        )}
      </section>
    </div>
  )
}
