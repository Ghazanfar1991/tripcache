"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, ListOrdered } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

/** Full-bleed cover whose photo eases in from a slight zoom as the reader scrolls past it. */
export function ArticleCover({ src, alt, children }: { src: string; alt: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  return (
    <div ref={ref} className="tc-cover relative h-full w-full overflow-hidden bg-[#1b1240]">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale, y }}>
        <Image src={src} alt={alt} fill preload sizes="(max-width: 1279px) 100vw, 1240px" className="object-cover" />
      </motion.div>
      <span aria-hidden="true" className="tc-cover-grade absolute inset-0" />
      {children}
    </div>
  )
}

type Heading = { id: string; text: string }

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64)
}

/** "In this guide": built from the article's h2s, highlighting the section being read. */
export function ArticleToc({ containerId }: { containerId: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return
    const nodes = Array.from(container.querySelectorAll("h2"))
    const used = new Set<string>()
    const found = nodes.map((node) => {
      let id = node.id || slugify(node.textContent ?? "")
      while (used.has(id)) id = `${id}-x`
      used.add(id)
      node.id = id
      node.classList.add("scroll-mt-28")
      return { id, text: node.textContent ?? "" }
    })
    const frame = window.requestAnimationFrame(() => setHeadings(found))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-90px 0px -65% 0px" },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [containerId])

  if (headings.length < 2) return null

  const list = (
    <ol className="flex flex-col">
      {headings.map((heading, index) => {
        const isActive = heading.id === active
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`group flex gap-3 rounded-[10px] py-2 pl-3 pr-2 text-[14px] leading-5 transition-colors duration-200 ${
                isActive ? "bg-tc-violet-soft font-semibold text-tc-violet" : "text-tc-mute hover:text-tc-ink"
              }`}
            >
              <span className={`w-5 shrink-0 tabular-nums ${isActive ? "text-tc-violet" : "text-tc-mute/70"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className="line-clamp-2">{heading.text.replace(/^\d+\.\s*/, "")}</span>
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <>
      {/* Desktop: sticky rail */}
      <nav aria-label="In this guide" className="sticky top-[104px] hidden max-h-[calc(100svh-140px)] overflow-y-auto pr-2 lg:block">
        <p className="mb-3 flex items-center gap-2 font-tc-display text-[17px] font-semibold text-tc-ink">
          <ListOrdered className="size-4 text-tc-violet" aria-hidden="true" />
          In this guide
        </p>
        {list}
      </nav>
      {/* Mobile and tablet: collapsible card */}
      <details className="tc-faq group mb-10 rounded-[20px] border border-tc-line bg-tc-mist lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-tc-display text-[17px] font-semibold text-tc-ink [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <ListOrdered className="size-4 text-tc-violet" aria-hidden="true" />
            In this guide
          </span>
          <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="px-2 pb-3">{list}</div>
      </details>
    </>
  )
}
