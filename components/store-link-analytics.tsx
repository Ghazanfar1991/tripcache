"use client"

import { useEffect } from "react"
import { classifyStoreIntentLink } from "@/lib/store-link-measurement.mjs"

type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: string, parameters: Record<string, string>) => void
}

export function StoreLinkAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>("a[href]")
      if (!anchor || anchor.dataset.storeEventHandled === "true") return

      const store = classifyStoreIntentLink({
        href: anchor.href,
        pageUrl: window.location.href,
        userAgent: window.navigator.userAgent,
        alreadyHandled: anchor.dataset.storeEventHandled === "true",
      })
      if (!store) return

      const analyticsWindow = window as AnalyticsWindow
      analyticsWindow.gtag?.("event", store.name, {
        platform: store.platform,
        placement: anchor.dataset.storePlacement || window.location.pathname,
        link_url: store.linkUrl,
        transport_type: "beacon",
      })
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => document.removeEventListener("click", handleClick, { capture: true })
  }, [])

  return null
}
