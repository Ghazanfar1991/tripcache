"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { GetStartedModal } from "./get-started-modal"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/features/email-to-itinerary", label: "Email Automation" },
  { href: "/features/cancellation-reminders", label: "Reminders" },
  { href: "/tools/hotel-cancellation-deadline-calculator", label: "Calculator" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
]

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [compact, setCompact] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let animationFrame = 0

    const updateNavigation = () => {
      const nextScrollY = window.scrollY
      const delta = nextScrollY - lastScrollY

      setScrolled(nextScrollY > 16)

      if (nextScrollY <= 16) {
        setCompact(false)
      } else if (delta > 5) {
        setCompact(true)
        setMobileMenuOpen(false)
      } else if (delta < -5) {
        setCompact(false)
      }

      lastScrollY = nextScrollY
      animationFrame = 0
    }

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateNavigation)
      }
    }

    updateNavigation()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <header
      className="floating-nav-shell"
      data-compact={compact}
      data-scrolled={scrolled}
    >
      <div className="floating-nav-surface">
        <div className="design-one-glass floating-nav-backdrop" aria-hidden="true" />
        <div className="floating-nav-content">
          <Link href="/" prefetch={false} className="design-one-press floating-nav-brand group flex shrink-0 items-center gap-2.5" aria-label="TripCache home">
            <Image
              src="/app-icon-violet-indigo.png"
              alt=""
              width={34}
              height={34}
              className="rounded-[10px] shadow-sm transition-transform duration-150 group-hover:scale-[1.04]"
            />
            <span className="text-[15px] font-bold tracking-[-0.025em] text-[#121212]">TripCache</span>
          </Link>

          <nav className="floating-nav-tabs hidden items-center gap-1 min-[920px]:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  aria-current={active ? "page" : undefined}
                  className={`design-one-press rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-150 ${
                    active ? "bg-[#e5dcff] text-[#4d20af]" : "text-[#5f5f5f] hover:bg-black/[0.045] hover:text-[#121212]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="floating-nav-actions flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="design-one-press grid h-10 w-10 place-items-center rounded-full bg-black/[0.045] text-[#121212] transition-colors hover:bg-black/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#602ad2]/45 min-[920px]:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <GetStartedModal
              triggerLabel="Download"
              triggerClassName="h-10 rounded-full bg-[#602ad2] px-5 text-sm text-white shadow-[0_10px_24px_rgba(77,32,175,0.18)] hover:bg-[#4d20af]"
            />
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`design-one-glass pointer-events-auto absolute inset-x-4 top-[68px] origin-top rounded-[24px] border border-white/60 bg-[#f8f4ec]/88 p-2 shadow-[0_24px_65px_rgba(68,50,30,0.16)] backdrop-blur-2xl transition-[opacity,transform] duration-200 min-[920px]:hidden ${
          mobileMenuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-[0.97] opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  active ? "bg-[#e5dcff] text-[#4d20af]" : "text-[#5f5f5f] hover:bg-black/[0.045] hover:text-[#121212]"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
