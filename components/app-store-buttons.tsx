import Image from "next/image"

interface AppStoreButtonsProps {
  variant?: "dark" | "light"
  showQr?: boolean
}

export function AppStoreButtons({ variant = "dark", showQr = false }: AppStoreButtonsProps) {
  const buttonClass =
    "inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-transform duration-300 hover:-translate-y-0.5"

  const imageClass = "w-[230px] sm:w-[260px] lg:w-[300px] h-auto select-none"

  const buttons = [
    {
      key: "ios",
      badgeSrc: "/app-store.svg",
      badgeAlt: "Download on the App Store",
      href: "#",
    },
    {
      key: "android",
      badgeSrc: "/play-store.svg",
      badgeAlt: "Get it on Google Play",
      href: "#",
    },
  ]

  if (showQr) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {buttons.map((button) => (
          <div key={button.key} className="flex flex-col items-center gap-4">
            <a href={button.href} className={buttonClass}>
              <Image
                src={button.badgeSrc}
                alt={button.badgeAlt}
                width={320}
                height={100}
                className={imageClass}
                priority={button.key === "ios"}
              />
            </a>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted text-xs font-medium text-muted-foreground">
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
        <a key={button.key} href={button.href} className={buttonClass}>
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
