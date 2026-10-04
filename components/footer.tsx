import Image from "next/image"
import Link from "next/link"

const COPYRIGHT_YEAR = 2026

const DEFAULT_DESCRIPTION =
  "The post-booking travel organizer for booking emails, cancellation deadlines, receipts and trip documents."

const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/features/email-to-itinerary", label: "Email import" },
      { href: "/features/cancellation-reminders", label: "Cancellation reminders" },
      { href: "/features/business-travel-expenses", label: "Business expenses" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/alternatives/tripit", label: "TripIt alternative" },
      { href: "/alternatives/tripcase", label: "TripCase alternative" },
      { href: "/alternatives", label: "All alternatives" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/tools", label: "Travel tools" },
      { href: "/tools/flight-arrival-time-calculator", label: "Flight time calculator" },
      { href: "/tools/layover-calculator", label: "Layover calculator" },
      { href: "/tools/jet-lag-calculator", label: "Jet lag calculator" },
      { href: "/tools/travel-checklist", label: "Travel checklist" },
      { href: "/tools/hotel-cancellation-deadline-calculator", label: "Deadline calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "mailto:support@trip-cache.com", label: "Support" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
]

export function Footer({ description = DEFAULT_DESCRIPTION }: { description?: string }) {
  return (
    <footer className="relative border-t border-tc-line bg-tc-canvas font-tc text-tc-ink">
      <div className="mx-auto max-w-[1080px] px-5 pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-[320px]">
            <Link href="/" prefetch={false} className="tc-press inline-flex items-center gap-3 rounded-full" aria-label="TripCache home">
              <Image
                src="/app-icon-violet-indigo.png"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-[11px] shadow-[0_6px_14px_-6px_rgba(97,43,211,0.6)]"
              />
              <span className="font-tc-display text-[22px] font-semibold tracking-[-0.01em]">TripCache</span>
            </Link>
            <p className="mt-4 text-pretty text-[14.5px] leading-6 text-tc-mute">{description}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={IOS_STORE_URL} data-store-placement="footer" aria-label="Download TripCache on the App Store" className="tc-press block">
                <Image src="/app-store-v3.svg" alt="" width={540} height={160} unoptimized className="h-10 w-auto" />
              </a>
              <a href={ANDROID_STORE_URL} data-store-placement="footer" aria-label="Get TripCache on Google Play" className="tc-press block">
                <Image src="/play-store-v3.svg" alt="" width={540} height={160} unoptimized className="h-10 w-auto" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-tc-display text-[16px] font-semibold">{column.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("mailto:") ? (
                        <a href={link.href} className="text-[14px] text-tc-mute transition-colors hover:text-tc-ink">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} prefetch={false} className="text-[14px] text-tc-mute transition-colors hover:text-tc-ink">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-tc-line pt-6 text-[13px] text-tc-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {COPYRIGHT_YEAR} TripCache. All rights reserved.</p>
          <p>Made for the part of travel that happens after you book.</p>
        </div>
      </div>
    </footer>
  )
}
