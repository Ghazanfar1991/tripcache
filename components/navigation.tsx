"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import { GetStartedModal } from "./get-started-modal"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const featuresHref = isHomePage ? "#features" : "/#features"
  const testimonialsHref = isHomePage ? "#testimonials" : "/#testimonials"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu on route change to avoid stale open state
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <nav
        className={`relative w-full max-w-6xl transition-all duration-500 rounded-2xl ${scrolled
          ? "bg-background/90 backdrop-blur-xl border border-primary/10 shadow-xl shadow-primary/5"
          : "bg-background/70 backdrop-blur-lg border border-border/20"
          }`}
        style={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            <Link href="/" className="flex items-center gap-1 sm:gap-2.5 group">
              <div className="relative hidden sm:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src="/app-icon.webp"
                  alt="TripCache"
                  width={36}
                  height={36}
                  className="relative rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent bg-[length:200%_auto] group-hover:animate-gradient">
                TripCache
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link
                href={featuresHref}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-lg hover:bg-primary/5 group"
              >
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
              <Link
                href={testimonialsHref}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-lg hover:bg-primary/5 group"
              >
                <span className="relative z-10">Testimonials</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
              <Link
                href="/pricing"
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-lg hover:bg-primary/5 group"
              >
                <span className="relative z-10">Pricing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
              <Link
                href="/blog"
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-lg hover:bg-primary/5 group"
              >
                <span className="relative z-10">Blog</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="md:hidden inline-flex items-center justify-center rounded-xl bg-background/70 px-3 py-2 text-sm font-medium text-foreground hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <ThemeToggle />
              <GetStartedModal />
            </div>
          </div>
          {/* Mobile menu */}
          <div
            className={`md:hidden transition-all duration-200 origin-top ${mobileMenuOpen ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
              }`}
          >
            <div className="absolute left-3 right-3 mt-2 rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5">
              <div className="flex flex-col divide-y divide-border/60">
                {[{ href: featuresHref, label: "Features" }, { href: testimonialsHref, label: "Testimonials" }, { href: "/pricing", label: "Pricing" }, { href: "/blog", label: "Blog" }].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
