"use client"

import { useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { HeroScene } from "./hero-scene"

/*
 * The hero visual alternates between the inbox collage and En Route, the live flight view. On most screens an iPhone
 * (the owner-approved procedural frame, no Apple bezel art) is tapped on the in-flight card (the app's dev Sydney to
 * London demo, QF 1) and turns to landscape, as the app does. On an iPhone Duo the Duo's own fold-and-tent video plays instead. Safari on the Duo reports itself as an
 * iPhone, so the Duo is told apart by its display shape: its cover is 466 x 678 pt, while every other iPhone is about
 * 1 : 2.17. Under reduced motion only the collage shows.
 */

const STAGE = { width: 600, height: 640 }
const INBOX_MS = 9600
const PHONE_MS = 9000
const DEVICE_H = 590
const DEVICE_W = Math.round((DEVICE_H * 1322) / 2720)
// The frame's screen opening, in frame pixels (1322 x 2720): 58, 49, 1206 x 2622, corner 166.
const SCREEN = { left: 58 / 1322, top: 49 / 2720, width: 1206 / 1322, height: 2622 / 2720, radius: 166 / 1322 }
// The Dynamic Island, in screen pixels (1206 x 2622); simulator captures leave it out.
const ISLAND = { left: 415 / 1206, top: 42 / 2622, width: 376 / 1206, height: 109 / 2622 }

function isIphoneDuo() {
  if (!/iPhone/.test(navigator.userAgent)) return false
  const short = Math.min(screen.width, screen.height)
  const long = Math.max(screen.width, screen.height)
  return short / long > 0.6
}

function useFit(width: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [width])
  return { ref, scale }
}

/** An iPhone on the trips screen: the flight card is tapped, the phone turns and En Route fills the screen. */
function TurningPhone() {
  const { ref, scale } = useFit(STAGE.width)
  const screenW = DEVICE_W * SCREEN.width
  const screenH = DEVICE_H * SCREEN.height

  return (
    <div ref={ref} className="relative w-full" style={{ height: STAGE.height * scale }}>
      <div
        className="absolute left-1/2 top-0 grid origin-top place-items-center"
        style={{ width: STAGE.width, height: STAGE.height, transform: `translateX(-50%) scale(${scale})` }}
      >
        <div className="tc-er-phone relative" style={{ width: DEVICE_W, height: DEVICE_H }}>
          <div
            className="absolute overflow-hidden bg-black"
            style={{
              left: `${SCREEN.left * 100}%`,
              top: `${SCREEN.top * 100}%`,
              width: screenW,
              height: screenH,
              borderRadius: DEVICE_W * SCREEN.radius,
            }}
          >
            <img src="/en-route/home-iphone.webp" alt="" className="tc-er-portrait absolute inset-0 size-full object-cover" />
            <img
              src="/en-route/en-route-iphone.webp"
              alt=""
              className="tc-er-landscape absolute left-1/2 top-1/2 max-w-none"
              style={{ width: screenH, height: screenW, transform: "translate(-50%, -50%) rotate(90deg)" }}
            />
            <span
              className="absolute rounded-full bg-black"
              style={{
                left: `${ISLAND.left * 100}%`,
                top: `${ISLAND.top * 100}%`,
                width: `${ISLAND.width * 100}%`,
                height: `${ISLAND.height * 100}%`,
              }}
            />
            {/* The tap on the in-flight card */}
            <span className="tc-er-tap absolute left-1/2 top-[25%] -ml-6 size-12 rounded-full bg-white/70 ring-4 ring-white/40" />
          </div>
          <img src="/en-route/iphone-frame.webp" alt="" className="pointer-events-none absolute inset-0 size-full" />
        </div>
      </div>
    </div>
  )
}

/** The iPhone Duo folding and standing up as a tent, its cover showing the flight. */
function DuoTent({ onEnded }: { onEnded: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    void ref.current?.play().catch(() => onEnded())
  }, [onEnded])
  return (
    <video ref={ref} muted playsInline preload="auto" onEnded={onEnded} width={1440} height={1264} className="block h-auto w-full">
      <source src="/duo/duo-tent-720.mp4" type="video/mp4" />
    </video>
  )
}

export function HeroJourney() {
  const reduce = useReducedMotion()
  // Only the flight beat depends on this, and it never renders on the server, so reading it on first render is safe.
  const [duo] = useState(() => typeof window !== "undefined" && isIphoneDuo())
  const [air, setAir] = useState(false)
  const [pass, setPass] = useState(0)

  // The collage runs two trips, then the flight view takes over; the phone loop is timed, the Duo video ends itself.
  useEffect(() => {
    if (reduce || (air && duo)) return
    const timer = window.setTimeout(() => {
      setAir((value) => !value)
      setPass((value) => value + 1)
    }, air ? PHONE_MS : INBOX_MS)
    return () => window.clearTimeout(timer)
  }, [air, duo, reduce])

  const back = useCallback(() => {
    setAir(false)
    setPass((value) => value + 1)
  }, [])

  return (
    <div className="grid">
      <div className={`[grid-area:1/1] transition-opacity duration-700 ${air ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <HeroScene />
      </div>
      {reduce ? null : (
        <div aria-hidden="true" className={`[grid-area:1/1] grid place-items-center transition-opacity duration-700 ${air ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          {air ? duo ? <DuoTent key={pass} onEnded={back} /> : <TurningPhone key={pass} /> : null}
        </div>
      )}
      <p className="sr-only">
        Then the live flight view: an iPhone opens the flight in progress and turns to landscape, showing the plane over
        the map, the time until landing and the distance to go.
      </p>
    </div>
  )
}
