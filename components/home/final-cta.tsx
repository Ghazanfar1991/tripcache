"use client"

import Image from "next/image"
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Bloom } from "./category"
import { StoreBadges } from "./store-badges"
import { City } from "./city-name"

const DESTINATIONS = ["Lisbon", "Manila", "Kyoto", "Sydney", "Bangkok", "Melbourne"]

const PHONES = [
  {
    src: "/app-screenshot-documents.webp",
    alt: "TripCache Documents screen with a passport and flight ticket",
    className: "left-[4%] z-0 sm:left-[14%]",
    rotate: [-14, -7],
    y: [220, 70],
  },
  {
    src: "/app-screenshot-home.webp",
    alt: "TripCache home screen with the next flight and an upcoming trip to Sydney",
    className: "left-1/2 z-10 -ml-[clamp(105px,15vw,150px)]",
    rotate: [0, 0],
    y: [160, 0],
  },
  {
    src: "/app-screen-trip-map.webp",
    alt: "TripCache trip map with flight and hotel stops pinned across the Philippines",
    className: "right-[4%] z-0 sm:right-[14%]",
    rotate: [14, 7],
    y: [240, 70],
  },
]

function RisingPhone({ phone, progress, reduce }: { phone: (typeof PHONES)[number]; progress: MotionValue<number>; reduce: boolean }) {
  const y = useTransform(progress, [0, 1], phone.y)
  const rotate = useTransform(progress, [0, 1], phone.rotate)
  return (
    <motion.div
      className={`absolute top-0 w-[clamp(200px,28vw,290px)] ${phone.className}`}
      style={reduce ? { y: phone.y[1], rotate: phone.rotate[1] } : { y, rotate }}
    >
      <Image
        src={phone.src}
        alt={phone.alt}
        width={1250}
        height={2700}
        sizes="(min-width: 1024px) 290px, 30vw"
        className="h-auto w-full drop-shadow-[0_40px_50px_rgba(45,27,87,0.25)]"
      />
    </motion.div>
  )
}

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const phonesRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" })
  const [index, setIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: phonesRef, offset: ["start end", "end end"] })

  useEffect(() => {
    if (!inView || reduce) return
    const id = window.setInterval(() => setIndex((value) => (value + 1) % DESTINATIONS.length), 2200)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  return (
    <section ref={sectionRef} id="download" className="relative overflow-hidden bg-white pt-24 text-center sm:pt-32">
      <Bloom className="tc-drift-slow left-1/2 top-[8%] size-[620px] -translate-x-1/2 opacity-25" color="#8b5cf6" />
      <div className="relative px-5">
        <p aria-hidden="true" className="flex flex-wrap items-baseline justify-center gap-x-4 leading-none">
          <span className="font-tc-script text-[clamp(52px,7vw,96px)] text-tc-violet">Trip to</span>
          <span className="min-w-[4ch] text-left font-tc-display text-[clamp(52px,7.4vw,104px)] font-semibold tracking-[-0.02em] text-tc-ink">
            <City name={DESTINATIONS[index]} reduce={reduce} />
          </span>
        </p>
        <h2 className="mx-auto mt-6 max-w-[22ch] text-balance font-tc-display text-[clamp(26px,3vw,38px)] font-semibold leading-[1.15] tracking-[-0.01em] text-tc-ink">
          Your next trip starts in your inbox.
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-pretty text-[17px] leading-8 text-tc-ink-2 sm:text-[19px]">
          Start free on iPhone and Android with reminders, documents and exports. Add Pro when you want forwarded
          confirmations to do the typing.
        </p>
        <StoreBadges placement="homepage_final_cta" className="mt-9 justify-center" />
      </div>
      <div ref={phonesRef} className="relative mx-auto mt-16 h-[clamp(330px,48vw,540px)] max-w-[1080px] sm:mt-20">
        {PHONES.map((phone) => (
          <RisingPhone key={phone.src} phone={phone} progress={scrollYProgress} reduce={reduce} />
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>
    </section>
  )
}
