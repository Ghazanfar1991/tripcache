"use client"

import { useState } from "react"
import { Share2, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const icon =
    status === "success" ? (
      <Check className="h-4 w-4 mr-2" />
    ) : status === "error" ? (
      <AlertCircle className="h-4 w-4 mr-2" />
    ) : (
      <Share2 className="h-4 w-4 mr-2" />
    )

  const label = status === "success" ? "Link copied" : status === "error" ? "Try again" : "Share"

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="min-w-[140px] justify-center"
      aria-label={
        status === "success" ? "Link copied to clipboard" : status === "error" ? "Sharing failed, try again" : "Share this article"
      }
    >
      {icon}
      {label}
    </Button>
  )
}
