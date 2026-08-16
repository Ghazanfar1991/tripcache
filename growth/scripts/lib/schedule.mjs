const formatterCache = new Map()

function formatter(timezone) {
  if (!formatterCache.has(timezone)) {
    formatterCache.set(timezone, new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }))
  }
  return formatterCache.get(timezone)
}

function localParts(date, timezone) {
  const values = Object.fromEntries(
    formatter(timezone).formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  )
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
  }
}

function wallTimeToUtc(parts, timezone) {
  const desired = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, 0)
  let candidate = new Date(desired)
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const actual = localParts(candidate, timezone)
    const actualAsUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute, 0)
    const correction = desired - actualAsUtc
    if (!correction) return candidate
    candidate = new Date(candidate.getTime() + correction)
  }
  return candidate
}

export function nextScheduledAt(schedule, timezone, after = new Date()) {
  const local = localParts(after, timezone)
  const day = new Date(Date.UTC(local.year, local.month - 1, local.day))

  for (let offset = 0; offset <= 370; offset += 1) {
    const cursor = new Date(day)
    cursor.setUTCDate(cursor.getUTCDate() + offset)
    const matches = schedule.frequency === "weekly"
      ? cursor.getUTCDay() === schedule.weekday
      : schedule.frequency === "monthly" && cursor.getUTCDate() === schedule.day
    if (!matches) continue

    const candidate = wallTimeToUtc({
      year: cursor.getUTCFullYear(),
      month: cursor.getUTCMonth() + 1,
      day: cursor.getUTCDate(),
      hour: schedule.hour,
      minute: schedule.minute,
    }, timezone)
    if (candidate > after) return candidate.toISOString()
  }

  throw new Error(`No ${schedule.frequency} occurrence found within 370 days`)
}
