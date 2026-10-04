import { NextResponse } from "next/server"
import { searchAirports } from "@/lib/airports"

/** Airport lookup for the flight arrival time calculator. */
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? ""
  const results = searchAirports(query.slice(0, 60))
  return NextResponse.json(
    { results },
    { headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" } },
  )
}
