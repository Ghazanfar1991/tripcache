"use client"

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"
import { Bloom } from "./category"

const HEADING = "Organized, never overconfident."
const BODY =
  "You review every draft before it becomes part of a trip. You confirm every deadline against your own confirmation. And the airline, airport and booking provider always stay the source of truth."

const HEADING_WORDS = HEADING.split(" ")
const BODY_WORDS = BODY.split(" ")
const TOTAL = HEADING_WORDS.length + BODY_WORDS.length

function Word({ word, index, progress }: { word: string; index: number; progress: MotionValue<number> }) {
  const start = index / TOTAL
  const opacity = useTransform(progress, [start, start + 1.6 / TOTAL], [0.45, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  )
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] })

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[linear-gradient(160deg,#612bd3_0%,#4a1eac_55%,#2a1170_100%)] py-28 text-white sm:py-40"
    >
      <Bloom className="tc-drift -right-32 -top-40 size-[560px] opacity-50" color="#d82d7e" />
      <Bloom className="tc-drift-slow -bottom-48 -left-24 size-[520px] opacity-40" color="#6366f1" />
      <div ref={ref} className="relative mx-auto max-w-[1080px] px-5 sm:px-8">
        <div className="font-tc-display text-[clamp(30px,4.3vw,58px)] font-semibold leading-[1.14] tracking-[-0.015em]">
          <h2 className="inline">
            {reduce
              ? `${HEADING} `
              : HEADING_WORDS.map((word, index) => <Word key={index} word={word} index={index} progress={scrollYProgress} />)}
          </h2>
          <p className="inline text-[#e4dcff]">
            {reduce
              ? BODY
              : BODY_WORDS.map((word, index) => (
                  <Word key={index} word={word} index={HEADING_WORDS.length + index} progress={scrollYProgress} />
                ))}
          </p>
        </div>
      </div>
    </section>
  )
}
