import Image from "next/image"
import { cn } from "@/lib/utils"

interface AppStoreButtonsProps {
  variant?: "dark" | "light"
  showQr?: boolean
}

export function AppStoreButtons({ variant = "dark", showQr = false }: AppStoreButtonsProps) {
  const buttonClass = cn(
    "inline-flex items-center justify-center transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
    variant === "light" ? "text-foreground" : "text-foreground",
  )

  const imageClass = "w-[230px] sm:w-[260px] lg:w-[300px] h-auto select-none"

  const buttons = [
    {
      key: "ios",
      badgeSrc: "/app-store.svg",
      badgeAlt: "Download on the App Store",
      href: "https://www.apple.com/app-store/",
    },
    {
      key: "android",
      badgeSrc: "/play-store.svg",
      badgeAlt: "Get it on Google Play",
      href: "https://play.google.com/store/apps",
    },
  ]

  if (showQr) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {buttons.map((button) => (
          <div key={button.key} className="flex flex-col items-center gap-4">
            <a
              href={button.href}
              className={buttonClass}
              target="_blank"
              rel="noreferrer"
              aria-label={button.badgeAlt}
            >
              <Image
                src={button.badgeSrc}
                alt={button.badgeAlt}
                width={320}
                height={100}
                className={imageClass}
                priority={button.key === "ios"}
              />
            </a>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/60 text-xs font-medium text-muted-foreground">
                QR Code
              </div>
              <p className="text-xs text-muted-foreground">Scan to download</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      {buttons.map((button) => (
        <a
          key={button.key}
          href={button.href}
          className={buttonClass}
          target="_blank"
          rel="noreferrer"
          aria-label={button.badgeAlt}
        >
          <Image
            src={button.badgeSrc}
            alt={button.badgeAlt}
            width={320}
            height={100}
            className={imageClass}
            priority={button.key === "ios"}
          />
        </a>
      ))}
    </div>
  )
}
