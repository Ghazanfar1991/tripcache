"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SiteMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reducedMotion) {
      gsap.set("main h1, main section:first-of-type img", { clearProps: "all" })
      return
    }

    const lenis = new Lenis({
      anchors: { offset: -72 },
      allowNestedScroll: true,
      duration: 0.9,
      gestureOrientation: "vertical",
      respectReducedMotion: true,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
    })

    const updateScrollTrigger = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)

    lenis.on("scroll", updateScrollTrigger)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const context = gsap.context(() => {
      const heroHeading = document.querySelector("main h1")
      const heroMedia = document.querySelector("main section:first-of-type img")
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })

      if (heroHeading) {
        timeline.fromTo(
          heroHeading,
          { autoAlpha: 0.78, y: 18 },
          { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.72, y: 0 },
        )
      }

      if (heroMedia) {
        timeline.fromTo(
          heroMedia,
          { autoAlpha: 0.82, scale: 0.985, y: 12 },
          { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.78, scale: 1, y: 0 },
          heroHeading ? "<0.1" : 0,
        )
      }
    }, document.body)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh, { once: true })

    return () => {
      window.removeEventListener("load", refresh)
      context.revert()
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [pathname])

  return null
}
