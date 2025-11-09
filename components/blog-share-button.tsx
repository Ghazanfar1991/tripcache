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
    "h-4 w-4 mr-2 transition-colors",
    status === "success" ? "text-emerald-500" : status === "error" ? "text-rose-500" : "text-foreground",
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
        "min-w-[160px] justify-center rounded-full border border-border/60 bg-background/80 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-foreground/5 dark:bg-muted/40 dark:text-foreground dark:hover:bg-muted/60",
        status === "success"
          ? "border-emerald-500/60 text-emerald-600 dark:text-emerald-400"
          : status === "error"
            ? "border-rose-500/60 text-rose-600 dark:text-rose-400"
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
