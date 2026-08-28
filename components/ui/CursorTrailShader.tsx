"use client"

import { useEffect, useRef } from "react"

type TrailPoint = { x: number; y: number }

const DOT_SPACING = 18
const TRAIL_RADIUS = 126
const TRAIL_LENGTH = 3

export default function CursorTrailShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const region = canvas?.closest<HTMLElement>(".cursor-trail-region")
    const context = canvas?.getContext("2d", { alpha: true })
    if (!canvas || !region || !context) return

    let width = 1
    let height = 1
    let animationFrame = 0
    let pointerInside = false
    let visibility = 0
    const target: TrailPoint = { x: 0, y: 0 }
    const trail: TrailPoint[] = Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      if (target.x === 0 && target.y === 0) {
        target.x = width / 2
        target.y = height / 2
        trail.forEach((point) => {
          point.x = target.x
          point.y = target.y
        })
      }
    }

    const drawHalftoneField = (point: TrailPoint, index: number) => {
      const trailStrength = 1 - index * 0.27
      const radius = TRAIL_RADIUS * trailStrength
      const startX = Math.floor((point.x - radius) / DOT_SPACING) * DOT_SPACING
      const endX = point.x + radius
      const startY = Math.floor((point.y - radius) / DOT_SPACING) * DOT_SPACING
      const endY = point.y + radius

      for (let x = startX; x <= endX; x += DOT_SPACING) {
        for (let y = startY; y <= endY; y += DOT_SPACING) {
          const distance = Math.hypot(x - point.x, y - point.y)
          if (distance > radius) continue

          const falloff = 1 - distance / radius
          const strength = falloff * falloff * visibility * trailStrength
          const dotRadius = 0.35 + strength * 2.2
          const hue = 218 + (x / Math.max(width, 1)) * 82

          context.beginPath()
          context.fillStyle = `hsla(${hue}, 82%, 60%, ${strength * 0.34})`
          context.arc(x, y, dotRadius, 0, Math.PI * 2)
          context.fill()
        }
      }
    }

    const render = () => {
      animationFrame = 0
      visibility += ((pointerInside ? 1 : 0) - visibility) * (pointerInside ? 0.14 : 0.08)

      trail[0].x += (target.x - trail[0].x) * 0.2
      trail[0].y += (target.y - trail[0].y) * 0.2
      for (let index = 1; index < trail.length; index += 1) {
        trail[index].x += (trail[index - 1].x - trail[index].x) * 0.12
        trail[index].y += (trail[index - 1].y - trail[index].y) * 0.12
      }

      context.clearRect(0, 0, width, height)
      for (let index = trail.length - 1; index >= 0; index -= 1) {
        drawHalftoneField(trail[index], index)
      }

      if (pointerInside || visibility > 0.002) {
        animationFrame = window.requestAnimationFrame(render)
      }
    }

    const startRendering = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = event.clientX - rect.left
      target.y = event.clientY - rect.top
      pointerInside = true
      startRendering()
    }

    const handlePointerLeave = () => {
      pointerInside = false
      startRendering()
    }

    const resizeObserver = new ResizeObserver(resize)
    resize()
    resizeObserver.observe(canvas)
    region.addEventListener("pointermove", handlePointerMove, { passive: true })
    region.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      resizeObserver.disconnect()
      region.removeEventListener("pointermove", handlePointerMove)
      region.removeEventListener("pointerleave", handlePointerLeave)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail-shader" aria-hidden="true" />
}
