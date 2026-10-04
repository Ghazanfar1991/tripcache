"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion"
import { Smartphone } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"
const EASE = [0.16, 1, 0.3, 1] as const
// The panels are the navigation's only animation, so their features load on demand (lib/motion-features.ts)
// and routes without other motion don't ship the full framer-motion bundle up front.
const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default)

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/features/cancellation-reminders", label: "Reminders" },
  { href: "/tools", label: "Travel tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
]

type Theme = "light" | "dark"

/** Reads `data-nav-theme` from whatever sits under the bar, so the pill inverts over dark sections. */
function useThemeUnderNav(headerRef: React.RefObject<HTMLElement | null>) {
  const [theme, setTheme] = useState<Theme>("light")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const stack = document.elementsFromPoint(window.innerWidth / 2, 40)
      let next: Theme = "light"
      for (const element of stack) {
        if (headerRef.current?.contains(element)) continue
        const host = element.closest<HTMLElement>("[data-nav-theme]")
        if (host?.dataset.navTheme === "dark") next = "dark"
        break
      }
      setTheme(next)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-nav-theme"] })

    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [headerRef])

  return { theme, scrolled }
}

function StoreBadgePair({ placement, onNavigate }: { placement: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <a
        href={IOS_STORE_URL}
        data-store-placement={placement}
        onClick={onNavigate}
        aria-label="Download TripCache on the App Store"
        className="tc-press block"
      >
        <Image src="/app-store-v3.svg" alt="" width={540} height={160} unoptimized className="h-12 w-auto" />
      </a>
      <a
        href={ANDROID_STORE_URL}
        data-store-placement={placement}
        onClick={onNavigate}
        aria-label="Get TripCache on Google Play"
        className="tc-press block"
      >
        <Image src="/play-store-v3.svg" alt="" width={540} height={160} unoptimized className="h-12 w-auto" />
      </a>
    </div>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const getButtonRef = useRef<HTMLAnchorElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { theme, scrolled } = useThemeUnderNav(headerRef)
  const [panel, setPanel] = useState<"none" | "get" | "menu">("none")
  const [panelPath, setPanelPath] = useState(pathname)
  const dark = theme === "dark"

  // Any route change closes open panels.
  if (panelPath !== pathname) {
    setPanelPath(pathname)
    setPanel("none")
  }

  const close = useCallback(
    (restoreFocus = false) => {
      if (restoreFocus) {
        const target = panel === "menu" ? menuButtonRef.current : getButtonRef.current
        window.requestAnimationFrame(() => target?.focus())
      }
      setPanel("none")
    },
    [panel],
  )

  useEffect(() => {
    if (panel === "none") return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true)
    }
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close()
    }
    const onScroll = () => close()
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    window.addEventListener("scroll", onScroll, { passive: true, once: true })
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [panel, close])

  const onGetApp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Phones go straight to their store through /download; desktops get both badges.
    if (/iphone|ipad|ipod|android/i.test(navigator.userAgent)) return
    event.preventDefault()
    setPanel((current) => (current === "get" ? "none" : "get"))
  }

  const compact = scrolled || panel !== "none"
  const panelMotion = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" },
    transition: { duration: 0.32, ease: EASE },
  }

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-3 font-tc sm:pt-4">
      <div className="relative">
        <div
          data-compact={compact}
          data-theme={theme}
          className={`tc-nav pointer-events-auto flex items-center justify-between gap-3 py-2 pl-2 pr-2 ${dark ? "text-white" : "text-tc-ink"}`}
        >
          <Link href="/" prefetch={false} aria-label="TripCache home" className="tc-press flex shrink-0 items-center gap-2.5 rounded-full pr-2">
            <Image
              src="/app-icon-violet-indigo.png"
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-[11px] shadow-[0_6px_14px_-6px_rgba(97,43,211,0.6)]"
            />
            <span className="font-tc-display text-[20px] font-semibold tracking-[-0.01em]">TripCache</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 min-[900px]:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/features" && pathname.startsWith(`${link.href}/`))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-200 ${
                    active
                      ? dark
                        ? "bg-white/12 text-white"
                        : "bg-tc-violet-soft text-tc-violet"
                      : dark
                        ? "text-white/72 hover:bg-white/8 hover:text-white"
                        : "text-tc-ink-2 hover:bg-tc-mist hover:text-tc-ink"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              ref={getButtonRef}
              href="/download"
              data-store-placement="navigation"
              onClick={onGetApp}
              aria-expanded={panel === "get"}
              aria-controls="get-app-panel"
              className={`tc-press inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full pl-3.5 pr-4 text-[14.5px] font-semibold transition-colors duration-500 ${
                dark
                  ? "bg-white text-tc-violet hover:bg-tc-violet-soft"
                  : "bg-tc-violet text-white shadow-[0_8px_18px_-8px_rgba(97,43,211,0.7)] hover:bg-[#5520cb]"
              }`}
            >
              <Smartphone className="size-4" strokeWidth={2.25} aria-hidden="true" />
              Get the app
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setPanel((current) => (current === "menu" ? "none" : "menu"))}
              aria-expanded={panel === "menu"}
              aria-controls="mobile-menu"
              aria-label={panel === "menu" ? "Close menu" : "Open menu"}
              className={`tc-press grid size-10 place-items-center rounded-full transition-colors min-[900px]:hidden ${
                dark ? "bg-white/10 hover:bg-white/16" : "bg-tc-mist hover:bg-tc-line"
              }`}
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ${
                    panel === "menu" ? "top-[5px] rotate-45" : "top-[2px]"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ${
                    panel === "menu" ? "top-[5px] -rotate-45" : "top-[8px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <LazyMotion features={loadMotionFeatures} strict>
          <AnimatePresence>
            {panel === "get" ? (
              <m.div
                id="get-app-panel"
                key="get"
                {...panelMotion}
                className="pointer-events-auto absolute right-2 top-[calc(100%+10px)] w-[288px] origin-top-right overflow-hidden rounded-[22px] border border-tc-line bg-white p-5 text-tc-ink shadow-[0_28px_60px_-28px_rgba(45,27,87,0.45)]"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-[#8b5cf6]/35 blur-[48px]" />
                <p className="relative font-tc-display text-[19px] font-semibold">Get TripCache</p>
                <p className="relative mt-1 text-[14px] leading-5 text-tc-mute">Free on iPhone and Android. Pro is available in the app.</p>
                <div className="relative mt-4">
                  <StoreBadgePair placement="navigation_panel" onNavigate={() => close()} />
                </div>
              </m.div>
            ) : null}

            {panel === "menu" ? (
              <m.div
                id="mobile-menu"
                key="menu"
                {...panelMotion}
                className="pointer-events-auto fixed inset-x-3 top-[76px] origin-top rounded-[24px] border border-tc-line bg-white p-3 text-tc-ink shadow-[0_30px_70px_-30px_rgba(45,27,87,0.5)] min-[900px]:hidden"
              >
                <nav aria-label="Mobile" className="flex flex-col">
                  {NAV_LINKS.map((link, index) => (
                    <m.span
                      key={link.href}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: 0.04 + index * 0.035 }}
                    >
                      <Link
                        href={link.href}
                        prefetch={false}
                        onClick={() => close()}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className="block rounded-[14px] px-4 py-3 font-tc-display text-[24px] font-semibold tracking-[-0.01em] transition-colors hover:bg-tc-mist"
                      >
                        {link.label}
                      </Link>
                    </m.span>
                  ))}
                </nav>
                <div className="mt-2 border-t border-tc-line px-4 pb-2 pt-5">
                  <StoreBadgePair placement="navigation_menu" onNavigate={() => close()} />
                </div>
              </m.div>
            ) : null}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </header>
  )
}
