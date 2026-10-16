import "../../secondary.css"

import type { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import { BedDouble, CarFront, Plane, Ticket, TrainFront, UtensilsCrossed, type LucideIcon } from "lucide-react"

import { Footer } from "@/components/footer"
import { SitePage } from "@/components/site/kit"
import { getAirlineLogoUrl } from "@/lib/airline-logos"
import { getSharedTrip, type SharedFlight, type SharedPlan } from "@/lib/shared-trip"

// Private, view-only itineraries: never indexed (robots.txt also disallows /shared/).
export const metadata: Metadata = {
  title: "Shared trip",
  description: "A view-only trip itinerary shared from the TripCache app.",
  robots: { index: false, follow: false, nocache: true },
}

// Each token is a different private trip, so there is no useful static shell
// to prerender; the root layout's navigation reads the pathname, which a
// dynamic segment can only provide at request time.
export const instant = false

const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"

// ---------- date helpers (dates are source-local calendar days) ----------

const DAY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})/
const LITERAL_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/

function dayFromLiteral(value?: string | null) {
  const match = value ? DAY_PATTERN.exec(value) : null
  return match ? new Date(Date.UTC(+match[1], +match[2] - 1, +match[3])) : null
}

function formatDay(value: string | null | undefined, options: Intl.DateTimeFormatOptions) {
  const day = dayFromLiteral(value)
  return day ? day.toLocaleDateString("en-US", { ...options, timeZone: "UTC" }) : ""
}

function daysBetween(start?: string | null, end?: string | null) {
  const a = dayFromLiteral(start)
  const b = dayFromLiteral(end)
  if (!a || !b) return null
  const days = Math.round((b.getTime() - a.getTime()) / 86_400_000)
  return days > 0 ? days : null
}

function formatRange(start?: string | null, end?: string | null) {
  const s = formatDay(start, { month: "short", day: "numeric" })
  const e = formatDay(end, { month: "short", day: "numeric" })
  if (!s && !e) return ""
  if (!s || !e || s === e) return s || e
  return `${s} – ${e}`
}

function formatDuration(value: SharedFlight["duration"]) {
  if (typeof value === "number" && value > 0) {
    const h = Math.floor(value / 60)
    const m = Math.round(value % 60)
    return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`
  }
  return typeof value === "string" ? value.trim() : ""
}

// Booking wall clock, in the booking's own zone: the captured local literal
// first, then the stored instant read in the recorded zone. Without either we
// show the date only rather than guess a clock time.
function planMoment(plan: SharedPlan, boundary: "start" | "end") {
  const local = boundary === "start" ? plan.schedule.start_local : plan.schedule.end_local
  const zone = boundary === "start" ? plan.schedule.start_timezone : plan.schedule.end_timezone
  const precision = (boundary === "start" ? plan.schedule.start_precision : plan.schedule.end_precision)?.toLowerCase()
  const stored = boundary === "start" ? plan.start_at : plan.end_at
  const dateOnly = precision === "date" || precision === "date_only"

  const literal = local ? LITERAL_PATTERN.exec(local) : null
  if (literal) {
    const date = `${literal[1]}-${literal[2]}-${literal[3]}`
    return { date, time: !dateOnly && literal[4] ? `${literal[4]}:${literal[5]}` : null }
  }
  if (!stored) return null
  const when = new Date(stored)
  if (Number.isNaN(when.getTime())) return null
  if (zone && !dateOnly) {
    try {
      const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
        }).formatToParts(when).map((p) => [p.type, p.value]),
      )
      return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` }
    } catch {
      // unknown zone: fall through to the date only
    }
  }
  return { date: when.toISOString().slice(0, 10), time: null }
}

const PLAN_KIND: Record<string, { label: string; icon: LucideIcon; tone: string }> = {
  lodging: { label: "Stay", icon: BedDouble, tone: "#F2B56B" },
  rental_car: { label: "Car rental", icon: CarFront, tone: "#5FD4C4" },
  transport: { label: "Transport", icon: TrainFront, tone: "#5FD4C4" },
  parking: { label: "Parking", icon: CarFront, tone: "#5FD4C4" },
  restaurant: { label: "Dining", icon: UtensilsCrossed, tone: "#FF8FB1" },
}
const planKind = (type: string) =>
  PLAN_KIND[type] ?? { label: type && type !== "activity" ? type.replace(/_/g, " ") : "Activity", icon: Ticket, tone: "#FF8FB1" }

// ---------- page ----------

export default function SharedTripPage({ params }: { params: Promise<{ token: string }> }) {
  return (
    <SitePage>
      <section className="relative isolate overflow-hidden bg-[#08071A] px-4 pb-16 pt-28 text-[#F5F3FF] sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(620px 420px at 85% -5%, rgba(106,43,217,0.55), transparent 70%), radial-gradient(520px 420px at -10% 25%, rgba(57,73,214,0.45), transparent 70%), radial-gradient(700px 360px at 50% 105%, rgba(106,43,217,0.45), transparent 72%)",
          }}
        />
        <div className="mx-auto w-full max-w-[760px]">
          <Suspense fallback={<LoadingState />}>
            <SharedTripContent params={params} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </SitePage>
  )
}

async function SharedTripContent({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const data = await getSharedTrip(token).catch(() => undefined)
  if (data === undefined) return <MessageState title="We couldn't load this trip." body="Please try again in a moment." />
  if (!data) {
    return (
      <MessageState
        title="This trip link is no longer available."
        body="The owner may have stopped sharing it, or the link may be incomplete. Ask them to share the trip again from the TripCache app."
      />
    )
  }

  const { trip, flights, plans } = data
  const nights = daysBetween(trip.start_date, trip.end_date)
  const destination = flights[0]?.arrival_city || flights[0]?.arrival_airport || ""
  const when = formatDay(trip.start_date || flights[0]?.departure_date, { month: "long", year: "numeric" })
  const eyebrow = [destination, when].filter(Boolean).join(" · ") || "Trip itinerary"
  const range = formatRange(trip.start_date, trip.end_date)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/app-icon-violet-indigo.webp"
            alt="TripCache"
            width={46}
            height={46}
            className="rounded-[13px] shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_10px_28px_-6px_rgba(106,43,217,0.75)]"
          />
          <div>
            <div className="text-[17px] font-bold tracking-[-0.01em]">TripCache</div>
            <div className="text-[11px] font-medium text-white/40">View-only itinerary</div>
          </div>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-white/60">
          Shared trip
        </span>
      </div>

      <header className="flex flex-col gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A99BFF]">{eyebrow}</p>
        <h1 className="font-tc-display text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[60px]">
          {trip.name.split(/(&)/).map((part, i) =>
            part === "&" ? <span key={i} className="font-normal text-[#A99BFF]">&amp;</span> : part,
          )}
        </h1>
        <dl className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.045] sm:grid-cols-4">
          {[
            range ? { label: "Dates", value: range } : null,
            nights ? { label: "Duration", value: `${nights} ${nights === 1 ? "night" : "nights"}` } : null,
            { label: "Flights", value: String(flights.length) },
            { label: "Plans", value: String(plans.length) },
          ]
            .filter((s): s is { label: string; value: string } => !!s)
            .map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 border-white/10 px-4 py-3.5 [&:not(:first-child)]:border-l">
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/40">{stat.label}</dt>
                <dd className="text-[17px] font-bold tracking-[-0.01em]">{stat.value}</dd>
              </div>
            ))}
        </dl>
      </header>

      {flights.length > 0 ? (
        <section className="flex flex-col gap-3.5">
          <SectionHead title="Flights" count={flights.length} />
          {flights.map((flight, i) => (
            <BoardingPass key={i} flight={flight} />
          ))}
        </section>
      ) : null}

      {plans.length > 0 ? (
        <section className="flex flex-col gap-3.5">
          <SectionHead title="Trip plans" count={plans.length} />
          <ol className="relative flex flex-col gap-2.5">
            <span aria-hidden="true" className="absolute bottom-6 left-[21.5px] top-6 w-px bg-gradient-to-b from-white/15 via-white/10 to-transparent" />
            {plans.map((plan, i) => (
              <PlanRow key={i} plan={plan} />
            ))}
          </ol>
        </section>
      ) : null}

      {flights.length === 0 && plans.length === 0 ? (
        <p className="rounded-[20px] border border-white/10 bg-white/[0.045] px-5 py-6 text-center text-[14px] text-white/60">
          Nothing has been added to this trip yet.
        </p>
      ) : null}

      <GetTheApp />
      <p className="-mt-3 text-center text-[11px] font-medium tracking-[0.02em] text-white/40">
        Shared with TripCache · booking references, notes and documents stay private
      </p>
    </div>
  )
}

function SectionHead({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">{title}</h2>
      <span className="text-[11px] font-semibold text-white/40">{count}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  )
}

// Same carrier-code rule as the app: the stored IATA, else the flight number's prefix.
function carrierCode(flight: SharedFlight) {
  if (flight.airline_iata && flight.airline_iata.length >= 2) return flight.airline_iata.slice(0, 2).toUpperCase()
  return flight.flight_number?.match(/^[A-Za-z0-9]{2}/)?.[0].toUpperCase() ?? null
}

async function BoardingPass({ flight }: { flight: SharedFlight }) {
  const duration = formatDuration(flight.duration)
  const date = formatDay(flight.departure_date, { weekday: "short", month: "short", day: "numeric" })
  const code = carrierCode(flight)
  const logoUrl = await getAirlineLogoUrl(code)

  return (
    <article className="relative grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] sm:grid-cols-[1fr_132px]">
      <div className="flex flex-col gap-4 px-5 pb-5 pt-[18px] sm:px-[22px]">
        <div className="flex items-center gap-3">
          <span className="grid size-[34px] shrink-0 place-items-center overflow-hidden rounded-[10px] bg-white text-[12px] font-bold text-[#3949D6]">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- remote catalog logo (jsDelivr), already a small optimized PNG.
              <img src={logoUrl} alt={flight.airline ? `${flight.airline} logo` : ""} width={26} height={26} loading="lazy" decoding="async" className="size-[26px] object-contain" />
            ) : (
              code || "✈"
            )}
          </span>
          <div className="min-w-0">
            <div className="truncate text-[14.5px] font-semibold">{flight.airline || "Flight"}</div>
            {flight.aircraft ? <div className="truncate text-[11.5px] font-medium text-white/40">{flight.aircraft}</div> : null}
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] items-end gap-3 sm:gap-4">
          <Endpoint code={flight.departure_airport} city={flight.departure_city} time={flight.departure_time} />
          <div className="relative h-16 self-center">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 52 Q100 -6 196 52" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
            </svg>
            <span aria-hidden="true" className="absolute bottom-[9px] left-0 size-1.5 rounded-full bg-[#A99BFF]" />
            <span aria-hidden="true" className="absolute bottom-[9px] right-0 size-1.5 rounded-full border border-[#A99BFF]" />
            <Plane className="absolute left-1/2 top-3 size-[22px] -translate-x-1/2 rotate-45 fill-[#A99BFF] text-[#A99BFF]" aria-hidden="true" />
            {duration ? (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10.5px] font-semibold tracking-[0.03em] text-white/40">
                {duration}
              </span>
            ) : null}
          </div>
          <Endpoint code={flight.arrival_airport} city={flight.arrival_city} time={flight.arrival_time} alignEnd />
        </div>
      </div>
      <div className="relative flex items-center justify-between gap-4 border-t border-dashed border-white/15 px-5 py-4 sm:flex-col sm:items-start sm:justify-between sm:border-t-0 sm:px-4 sm:py-[18px]">
        <span aria-hidden="true" className="absolute bottom-4 left-0 top-4 hidden border-l-[1.5px] border-dashed border-white/15 sm:block" />
        <Stub label="Flight" value={flight.flight_number || "—"} />
        {date ? <Stub label="Date" value={date} accent /> : null}
      </div>
      <span aria-hidden="true" className="absolute -top-[11px] right-[121px] hidden size-[22px] rounded-full bg-[#08071A] sm:block" />
      <span aria-hidden="true" className="absolute -bottom-[11px] right-[121px] hidden size-[22px] rounded-full bg-[#08071A] sm:block" />
    </article>
  )
}

function Endpoint({ code, city, time, alignEnd }: { code: string | null; city: string | null; time: string | null; alignEnd?: boolean }) {
  return (
    <div className={alignEnd ? "text-right" : undefined}>
      <div className="text-[34px] font-bold leading-none tracking-[-0.04em] sm:text-[44px]">{(code || "--").toUpperCase()}</div>
      {city ? <div className="mt-1.5 max-w-[120px] truncate text-[12px] font-medium text-white/60">{city}</div> : null}
      {time ? <div className="mt-0.5 text-[15px] font-semibold tabular-nums">{time}</div> : null}
    </div>
  )
}

function Stub({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">{label}</span>
      <span className={`text-[15px] font-bold tracking-[-0.01em] ${accent ? "text-[#A99BFF]" : ""}`}>{value}</span>
    </div>
  )
}

function PlanRow({ plan }: { plan: SharedPlan }) {
  const kind = planKind(plan.type)
  const Icon = kind.icon
  const start = planMoment(plan, "start")
  const end = planMoment(plan, "end")
  const span = daysBetween(start?.date, end?.date)

  const meta: string[] = []
  const place = plan.location_name || plan.location_city || plan.provider
  if (place) meta.push(place)
  if (plan.type === "lodging") {
    if (start?.time) meta.push(`In ${start.time}`)
    if (end?.time) meta.push(`Out ${end.time}`)
  } else if (plan.type === "rental_car") {
    if (start?.time) meta.push(`Pick ${start.time}`)
    if (end?.time) meta.push(`Drop ${end.time}`)
  } else if (start?.time) {
    meta.push(start.time)
  }
  const subDate = span
    ? `${span} ${plan.type === "lodging" ? (span === 1 ? "night" : "nights") : span === 1 ? "day" : "days"}`
    : formatDay(start?.date, { weekday: "short" })

  return (
    <li className="relative grid grid-cols-[44px_1fr] gap-3.5">
      <span
        className="z-10 grid size-11 place-items-center rounded-[14px] border border-white/15 bg-[#08071A] shadow-[0_0_0_4px_#08071A]"
        style={{ color: kind.tone }}
      >
        <Icon className="size-[19px]" aria-hidden="true" />
      </span>
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.045] px-4 py-[13px]">
        <div className="min-w-0">
          <div className="text-[9.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: kind.tone }}>{kind.label}</div>
          <div className="mt-0.5 truncate text-[15px] font-semibold">{plan.title}</div>
          {meta.length ? <div className="mt-0.5 truncate text-[12px] font-medium text-white/60">{meta.join("  ·  ")}</div> : null}
        </div>
        {start?.date ? (
          <div className="text-right">
            <div className="text-[13px] font-bold">{formatDay(start.date, { month: "short", day: "numeric" })}</div>
            {subDate ? <div className="mt-px text-[11px] font-medium text-white/40">{subDate}</div> : null}
          </div>
        ) : null}
      </div>
    </li>
  )
}

function GetTheApp() {
  return (
    <aside className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#6A2BD9_0%,#4B3AD8_50%,#3949D6_100%)] p-6 text-white shadow-[0_20px_50px_-20px_rgba(106,43,217,0.7)] ring-1 ring-inset ring-white/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(260px 160px at 100% 0%, rgba(255,255,255,0.22), transparent 70%)" }}
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">Get the app</span>
          <p className="font-tc-display text-[24px] font-semibold leading-[1.1] tracking-[-0.02em]">Every trip, beautifully in one place.</p>
          <span className="text-[13px] font-semibold text-white/85">Plan your own trip in TripCache, free on iPhone and Android.</span>
        </div>
        <div className="flex shrink-0 gap-2.5">
          <a href={IOS_STORE_URL} aria-label="Download on the App Store">
            <Image src="/app-store-v3.svg" alt="Download on the App Store" width={135} height={40} className="h-10 w-auto" />
          </a>
          <a href={ANDROID_STORE_URL} aria-label="Get it on Google Play">
            <Image src="/play-store-v3.svg" alt="Get it on Google Play" width={135} height={40} className="h-10 w-auto" />
          </a>
        </div>
      </div>
    </aside>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading shared trip">
      <div className="h-12 w-48 animate-pulse rounded-xl bg-white/5" />
      <div className="h-16 w-3/4 animate-pulse rounded-xl bg-white/5" />
      <div className="h-20 animate-pulse rounded-[20px] bg-white/5" />
      <div className="h-40 animate-pulse rounded-[24px] bg-white/5" />
    </div>
  )
}

function MessageState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-16 text-center">
      <Image src="/app-icon-violet-indigo.webp" alt="TripCache" width={64} height={64} className="rounded-[18px]" />
      <h1 className="max-w-[520px] font-tc-display text-[34px] font-semibold leading-[1.1] tracking-[-0.02em]">{title}</h1>
      <p className="max-w-[460px] text-[15px] leading-relaxed text-white/60">{body}</p>
      <GetTheApp />
    </div>
  )
}
