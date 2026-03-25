import { NextRequest, NextResponse } from "next/server"

const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"
const FALLBACK_URL = "https://trip-cache.com"

function pickDownloadUrl(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (/(iphone|ipad|ipod)/.test(ua)) {
    return IOS_STORE_URL
  }

  if (/android/.test(ua)) {
    return ANDROID_STORE_URL
  }

  return FALLBACK_URL
}

export function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""
  const destination = pickDownloadUrl(userAgent)
  return NextResponse.redirect(destination, 302)
}

