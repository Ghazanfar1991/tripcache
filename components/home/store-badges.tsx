import Image from "next/image"
import { ANDROID_STORE_URL, IOS_STORE_URL } from "./data"

/**
 * Official store badges. Clicks are measured by the global StoreLinkAnalytics listener,
 * which reads `data-store-placement`.
 */
export function StoreBadges({
  placement,
  className = "",
  badgeClassName = "h-12",
}: {
  placement: string
  className?: string
  badgeClassName?: string
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={IOS_STORE_URL}
        data-store-placement={placement}
        aria-label="Download TripCache on the App Store"
        className="tc-press block rounded-[12px]"
      >
        <Image src="/app-store-v3.svg" alt="" width={540} height={160} unoptimized className={`w-auto ${badgeClassName}`} />
      </a>
      <a
        href={ANDROID_STORE_URL}
        data-store-placement={placement}
        aria-label="Get TripCache on Google Play"
        className="tc-press block rounded-[12px]"
      >
        <Image src="/play-store-v3.svg" alt="" width={540} height={160} unoptimized className={`w-auto ${badgeClassName}`} />
      </a>
    </div>
  )
}
