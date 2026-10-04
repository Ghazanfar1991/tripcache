"use client"

import { CalendarPlus } from "lucide-react"

/** Downloads an .ics file with one event at the cancellation deadline and alarms at each reminder time. */
export function ReminderCalendarButton({ title, deadlineIso, reminderIsos }: { title: string; deadlineIso: string; reminderIsos: string[] }) {
  const download = () => {
    const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
    const deadline = new Date(deadlineIso)
    const alarms = [...reminderIsos, new Date(deadline.getTime() - 3 * 3600000).toISOString()].map((iso) => {
      const minutesBefore = Math.max(0, Math.round((deadline.getTime() - new Date(iso).getTime()) / 60000))
      return ["BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${title}`, `TRIGGER:-PT${minutesBefore}M`, "END:VALARM"].join("\r\n")
    })
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TripCache//Cancellation deadline calculator//EN",
      "BEGIN:VEVENT",
      `UID:${stamp(deadlineIso)}-cancel@trip-cache.com`,
      `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(deadlineIso)}`,
      `DTEND:${stamp(new Date(deadline.getTime() + 15 * 60000).toISOString())}`,
      `SUMMARY:${title}`,
      "DESCRIPTION:Calculated by TripCache from the details you entered. Confirm the final deadline with the hotel or booking provider.",
      ...alarms,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "free-cancellation-deadline.ics"
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <button
      type="button"
      onClick={download}
      className="tc-press inline-flex h-11 items-center gap-2 rounded-[12px] bg-white px-4 text-[14.5px] font-semibold text-tc-violet transition-colors hover:bg-tc-violet-soft"
    >
      <CalendarPlus className="size-4" aria-hidden="true" />
      Add deadline and reminders to my calendar
    </button>
  )
}
