"use client"

import { AnimatePresence, motion } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

/** A destination name whose letters settle in one by one, like ink drying. */
export function City({ name, reduce }: { name: string; reduce: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={name} className="block whitespace-nowrap" initial="hidden" animate="shown" exit="gone">
        {/* Screen readers get the whole word; the animated letters are hidden from them. */}
        <span className="sr-only">{name}</span>
        {Array.from(name).map((letter, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.35em", filter: "blur(8px)" },
              shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE, delay: index * 0.035 } },
              gone: reduce ? { opacity: 0 } : { opacity: 0, y: "-0.2em", filter: "blur(6px)", transition: { duration: 0.25, ease: EASE } },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  )
}
