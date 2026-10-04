"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function ReadingProgress() {
    const [isVisible, setIsVisible] = useState(false)
    const reducedMotion = useReducedMotion()
    const { scrollYProgress } = useScroll()
    const smoothed = useSpring(scrollYProgress, {
        stiffness: 160,
        damping: 40,
        restDelta: 0.001,
    })
    const scaleX = reducedMotion ? scrollYProgress : smoothed

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            {/* Reading Progress Bar: a thin violet rule along the top edge, beneath the floating nav. */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[49] h-[3px] bg-tc-violet/10">
                <motion.div
                    className="h-full origin-left rounded-e-full bg-tc-violet shadow-[0_0_10px_rgba(97,43,211,0.45)]"
                    style={{ scaleX }}
                />
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        type="button"
                        initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
                        transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
                        className="tc-press fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] end-[max(1.5rem,env(safe-area-inset-right))] z-40 grid size-12 place-items-center rounded-[14px] border border-tc-line bg-white text-tc-violet shadow-[0_18px_34px_-18px_rgba(45,27,87,0.55)] transition-colors duration-200 hover:bg-tc-violet-soft"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="size-5" strokeWidth={2.2} aria-hidden="true" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    )
}
