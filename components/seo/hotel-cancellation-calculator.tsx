import { CalendarClock } from "lucide-react"

import { Button } from "@/components/ui/button"

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

export function HotelCancellationCalculator({ values }: HotelCancellationCalculatorProps) {
  const result = calculateDeadline(values)
  const policyHours = values?.policyHours || "24"
  const timeZone = values?.timeZone || "America/New_York"

  return (
    <div className="grid gap-5 min-[960px]:grid-cols-[0.88fr_1.12fr] min-[960px]:items-start">
      <form method="get" className="rounded-[2rem] bg-white/50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_55px_rgba(72,53,33,0.065)] sm:p-9">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8e0ff] text-[#602ad2]">
            <CalendarClock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">Calculate your deadline</h2>
            <p className="text-sm text-[#666666]">Use the policy wording from your hotel confirmation.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-medium">
            Hotel or provider name
            <input
              name="hotelName"
              defaultValue={values?.hotelName ?? ""}
              placeholder="Hilton Sydney"
              className="min-h-12 rounded-xl border border-[#41382e]/15 bg-[#fbf8f2] px-4 py-3 text-base text-[#121212] outline-none transition-colors duration-150 placeholder:text-[#858585] focus:border-[#602ad2] focus:ring-2 focus:ring-[#602ad2]/15"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Check-in date
            <input
              name="checkInDate"
              type="date"
              defaultValue={values?.checkInDate ?? ""}
              className="min-h-12 rounded-xl border border-[#41382e]/15 bg-[#fbf8f2] px-4 py-3 text-base text-[#121212] outline-none transition-colors duration-150 focus:border-[#602ad2] focus:ring-2 focus:ring-[#602ad2]/15"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Cancellation policy window
            <select
              name="policyHours"
              defaultValue={policyHours}
              className="min-h-12 rounded-xl border border-[#41382e]/15 bg-[#fbf8f2] px-4 py-3 text-base text-[#121212] outline-none transition-colors duration-150 focus:border-[#602ad2] focus:ring-2 focus:ring-[#602ad2]/15"
            >
              {policyOptions.map((option) => (
                <option key={option.hours} value={option.hours}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Hotel cutoff time
            <input
              name="cutoffTime"
              type="time"
              defaultValue={values?.cutoffTime ?? "18:00"}
              className="min-h-12 rounded-xl border border-[#41382e]/15 bg-[#fbf8f2] px-4 py-3 text-base text-[#121212] outline-none transition-colors duration-150 focus:border-[#602ad2] focus:ring-2 focus:ring-[#602ad2]/15"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Hotel time zone
            <select
              name="timeZone"
              defaultValue={timeZone}
              className="min-h-12 rounded-xl border border-[#41382e]/15 bg-[#fbf8f2] px-4 py-3 text-base text-[#121212] outline-none transition-colors duration-150 focus:border-[#602ad2] focus:ring-2 focus:ring-[#602ad2]/15"
            >
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <Button type="submit" className="min-h-12 rounded-full bg-[#121212] text-[#f7f2e9] hover:bg-[#242424]">
            Calculate deadline
          </Button>
        </div>
      </form>

      <section className="rounded-[2rem] bg-[#121212] p-6 text-[#f7f2e9] shadow-[0_30px_70px_rgba(42,20,82,0.18)] sm:p-9 min-[960px]:translate-y-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#a98af0]">Your cancellation deadline</p>
        {result ? (
          <div className="mt-5 space-y-6">
            <div>
              <div className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">{formatInZone(result.deadline, result.timeZone)}</div>
              <p className="mt-4 leading-7 text-[#b9b0a3]">
                This is the latest calculated cancellation time based on the check-in date, hotel cutoff time, policy
                window, and hotel time zone you entered.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="text-sm font-semibold">Reminder suggestion 1</div>
                <div className="mt-1 text-[#b9b0a3]">{formatInZone(result.twoDaysBefore, result.timeZone)}</div>
              </div>
              <div className="rounded-2xl bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="text-sm font-semibold">Reminder suggestion 2</div>
                <div className="mt-1 text-[#b9b0a3]">{formatInZone(result.oneDayBefore, result.timeZone)}</div>
              </div>
              <div className="rounded-2xl bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="text-sm font-semibold">Day-of backup</div>
                <div className="mt-1 text-[#b9b0a3]">Set one final reminder a few hours before the deadline.</div>
              </div>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Copyable reminder summary
              <textarea
                readOnly
                value={result.summary}
                className="min-h-28 rounded-2xl border border-white/10 bg-white/[0.06] p-4 leading-7 text-[#b9b0a3] outline-none focus:border-[#a98af0] focus:ring-2 focus:ring-[#a98af0]/15"
              />
            </label>
          </div>
        ) : (
          <p className="mt-5 leading-7 text-[#b9b0a3]">Add the booking details to calculate the deadline.</p>
        )}
      </section>
    </div>
  )
}
