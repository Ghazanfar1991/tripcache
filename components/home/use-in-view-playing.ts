"use client"

import { useEffect, useRef, useState } from "react"

/** True while the element is on screen and the tab is visible, so demos never animate unseen. */
export function useInViewPlaying<T extends Element>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // A batch can hold several changes for the node (e.g. after a fast scroll); the last one is current.
    const observer = new IntersectionObserver((entries) => setInView(entries[entries.length - 1].isIntersecting), { rootMargin })
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible")
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])

  return { ref, playing: inView && visible }
}
