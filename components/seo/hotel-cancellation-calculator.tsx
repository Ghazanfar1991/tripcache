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
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form method="get" className="rounded-[2rem] border border-border/60 bg-card/60 p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarClock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Calculate your deadline</h2>
            <p className="text-sm text-muted-foreground">Use the policy wording from your hotel confirmation.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-medium">
            Hotel or provider name
            <input
              name="hotelName"
              defaultValue={values?.hotelName ?? ""}
              placeholder="Hilton Sydney"
              className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Check-in date
            <input
              name="checkInDate"
              type="date"
              defaultValue={values?.checkInDate ?? ""}
              className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Cancellation policy window
            <select
              name="policyHours"
              defaultValue={policyHours}
              className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary"
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
              className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Hotel time zone
            <select
              name="timeZone"
              defaultValue={timeZone}
              className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary"
            >
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <Button type="submit" className="rounded-full">
            Calculate deadline
          </Button>
        </div>
      </form>

      <section className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-cyan-500/10 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Your cancellation deadline</p>
        {result ? (
          <div className="mt-5 space-y-6">
            <div>
              <div className="text-3xl font-bold leading-tight sm:text-4xl">{formatInZone(result.deadline, result.timeZone)}</div>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is the latest calculated cancellation time based on the check-in date, hotel cutoff time, policy
                window, and hotel time zone you entered.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <div className="text-sm font-semibold">Reminder suggestion 1</div>
                <div className="mt-1 text-muted-foreground">{formatInZone(result.twoDaysBefore, result.timeZone)}</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <div className="text-sm font-semibold">Reminder suggestion 2</div>
                <div className="mt-1 text-muted-foreground">{formatInZone(result.oneDayBefore, result.timeZone)}</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <div className="text-sm font-semibold">Day-of backup</div>
                <div className="mt-1 text-muted-foreground">Set one final reminder a few hours before the deadline.</div>
              </div>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Copyable reminder summary
              <textarea
                readOnly
                value={result.summary}
                className="min-h-28 rounded-2xl border border-border/60 bg-background/70 p-4 leading-7 text-muted-foreground"
              />
            </label>
          </div>
        ) : (
          <p className="mt-5 leading-7 text-muted-foreground">Add the booking details to calculate the deadline.</p>
        )}
      </section>
    </div>
  )
}
