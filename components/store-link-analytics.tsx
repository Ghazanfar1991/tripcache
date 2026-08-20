"use client"

import { useEffect } from "react"

type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: string, parameters: Record<string, string>) => void
}

function storeEvent(url: URL) {
  if (url.hostname === "apps.apple.com") {
    return { name: "app_store_click", platform: "ios" }
  }
  if (url.hostname === "play.google.com" && url.pathname.startsWith("/store/apps/")) {
    return { name: "play_store_click", platform: "android" }
  }
  return null
}

export function StoreLinkAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>("a[href]")
      if (!anchor || anchor.dataset.storeEventHandled === "true") return

      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      const store = storeEvent(url)
      if (!store) return

      const analyticsWindow = window as AnalyticsWindow
      analyticsWindow.gtag?.("event", store.name, {
        platform: store.platform,
        placement: anchor.dataset.storePlacement || window.location.pathname,
        link_url: url.toString(),
      })
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => document.removeEventListener("click", handleClick, { capture: true })
  }, [])

  return null
}
