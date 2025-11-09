"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import { GetStartedModal } from "./get-started-modal"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const featuresHref = isHomePage ? "#features" : "/#features"
  const howItWorksHref = isHomePage ? "#how-it-works" : "/#how-it-works"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav
        className={`w-full max-w-6xl transition-all duration-300 rounded-2xl ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/10"
            : "bg-background/60 backdrop-blur-md border border-border/30"
        }`}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 opacity-100">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/app-icon.png"
                alt="TripCache"
                width={32}
                height={32}
                className="rounded-lg transition-transform group-hover:scale-110"
              />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                TripCache
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                href={featuresHref}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href={howItWorksHref}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />

              <GetStartedModal />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
