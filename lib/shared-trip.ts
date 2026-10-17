// View-only trip links minted by the app (trip-cache.com/shared/<token>).
// The data comes from the get_shared_trip RPC, which only returns a trip for an
// exact, active token and leaves out booking references, prices, notes,
// documents and owner details. The publishable key is public by design (the
// app ships it); row access is enforced in Postgres.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jvwnjqiypayicqfgvdyo.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_OToVgslOngmAoZyKnAY2Yw_r9PWXmC4"

export type SharedFlight = {
  flight_number: string | null
  airline: string | null
  airline_iata: string | null
  departure_airport: string | null
  arrival_airport: string | null
  departure_city: string | null
  arrival_city: string | null
  departure_date: string | null
  arrival_date: string | null
  departure_time: string | null
  arrival_time: string | null
  duration: number | string | null
  aircraft: string | null
}

export type SharedPlan = {
  type: string
  title: string
  location_name: string | null
  location_city: string | null
  provider: string | null
  start_at: string | null
  end_at: string | null
  schedule: {
    start_local?: string
    end_local?: string
    start_timezone?: string
    end_timezone?: string
    start_precision?: string
    end_precision?: string
  }
}

export type SharedTrip = {
  /** 'flight' links show one flight only (no trip name, dates or plans). Absent on older responses. */
  scope?: "trip" | "flight"
  trip: { name: string; start_date: string | null; end_date: string | null }
  flights: SharedFlight[]
  plans: SharedPlan[]
}

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,128}$/

export async function getSharedTrip(token: string): Promise<SharedTrip | null> {
  if (!TOKEN_PATTERN.test(token)) return null
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_shared_trip`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_token: token }),
    cache: "no-store",
  })
  if (!response.ok) {
    throw new Error(`Shared trip lookup failed (${response.status})`)
  }
  const data = (await response.json()) as SharedTrip | null
  return data && data.trip ? data : null
}
