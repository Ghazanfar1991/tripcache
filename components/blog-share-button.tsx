"use client"

import { useState } from "react"
import { Share2, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlogShareButtonProps {
  url: string
  title: string
}

export function BlogShareButton({ url, title }: BlogShareButtonProps) {
  type ShareStatus = "idle" | "success" | "error"
  const [status, setStatus] = useState<ShareStatus>("idle")

  const resetStatus = () => {
    window.setTimeout(() => setStatus("idle"), 2400)
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        })
        setStatus("success")
        return resetStatus()
      }

      if ("clipboard" in navigator && typeof navigator.clipboard?.writeText === "function") {
        await navigator.clipboard.writeText(url)
        setStatus("success")
        return resetStatus()
      }

      throw new Error("Clipboard API unavailable")
    } catch (error) {
      setStatus("error")
      alert(`Unable to share automatically. Copy this link instead:\n${url}`)
      console.error("Unable to share or copy link", error)
    }
  }

  const iconClass = cn(
    "me-2 h-4 w-4 transition-colors duration-150",
    status === "success" ? "text-emerald-600" : status === "error" ? "text-rose-600" : "text-[#444444]",
  )

  const icon =
    status === "success" ? (
      <Check className={iconClass} />
    ) : status === "error" ? (
      <AlertCircle className={iconClass} />
    ) : (
      <Share2 className={iconClass} />
    )

  const label = status === "success" ? "Link copied" : status === "error" ? "Try again" : "Share"

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className={cn(
        "min-w-[160px] justify-center rounded-full bg-white/55 text-sm font-semibold text-[#444444] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.09),0_8px_24px_rgba(72,53,33,0.06)] transition-[transform,background-color] duration-150 hover:bg-white/85 active:scale-[0.965]",
        status === "success"
          ? "text-emerald-700 shadow-[inset_0_0_0_1px_rgba(4,120,87,0.35)]"
          : status === "error"
            ? "text-rose-700 shadow-[inset_0_0_0_1px_rgba(190,18,60,0.35)]"
            : "",
      )}
      aria-label={
        status === "success" ? "Link copied to clipboard" : status === "error" ? "Sharing failed, try again" : "Share this article"
      }
    >
      {icon}
      {label}
    </Button>
  )
}
