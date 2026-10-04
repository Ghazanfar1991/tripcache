"use client"

import { useState } from "react"
import { Share2, Check, AlertCircle } from "lucide-react"
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
    "size-4 shrink-0 transition-colors duration-200",
    status === "success" ? "text-[#067647]" : status === "error" ? "text-[#b42318]" : "text-tc-violet",
  )

  const icon =
    status === "success" ? (
      <Check className={iconClass} aria-hidden="true" />
    ) : status === "error" ? (
      <AlertCircle className={iconClass} aria-hidden="true" />
    ) : (
      <Share2 className={iconClass} aria-hidden="true" />
    )

  const label = status === "success" ? "Link copied" : status === "error" ? "Try again" : "Share"

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "tc-press inline-flex h-10 min-w-[132px] items-center justify-center gap-2 rounded-[12px] border px-4 text-[14px] font-semibold transition-colors duration-200",
        status === "success"
          ? "border-[#b7e8cf] bg-[#e8f8f0] text-[#067647]"
          : status === "error"
            ? "border-[#fecdca] bg-[#fef3f2] text-[#b42318]"
            : "border-tc-line bg-white text-tc-ink-2 hover:border-[#d9d2fb] hover:bg-tc-violet-soft hover:text-tc-violet",
      )}
      aria-label={
        status === "success" ? "Link copied to clipboard" : status === "error" ? "Sharing failed, try again" : "Share this article"
      }
    >
      {icon}
      {label}
    </button>
  )
}
