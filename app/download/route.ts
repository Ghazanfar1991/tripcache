import { NextRequest, NextResponse } from "next/server"
import { pickDownloadDestination } from "@/lib/store-link-measurement.mjs"

export function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""
  const destination = pickDownloadDestination(userAgent)
  return NextResponse.redirect(destination, 302)
}
