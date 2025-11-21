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
  const testimonialsHref = isHomePage ? "#testimonials" : "/#testimonials"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <nav
        className={`w-full max-w-6xl transition-all duration-500 rounded-2xl ${scrolled
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
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src="/app-icon.png"
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

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <GetStartedModal />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
