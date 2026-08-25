"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GetStartedModalProps {
  triggerClassName?: string
  triggerLabel?: string
}

function trackConversion(eventName: string, details: Record<string, string>) {
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", name: string, parameters: Record<string, string>) => void
  }

  analyticsWindow.gtag?.("event", eventName, details)
}

export function GetStartedModal({ triggerClassName, triggerLabel = "Get Started" }: GetStartedModalProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) {
      trackConversion("download_modal_open", { trigger_label: triggerLabel })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
          className={cn(
            buttonVariants({ size: "sm" }),
            "rounded-full bg-[#602ad2] text-white shadow-[0_10px_24px_rgba(77,32,175,0.18)] hover:bg-[#4d20af] hover:shadow-[0_12px_28px_rgba(77,32,175,0.23)]",
            "px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm",
            triggerClassName,
          )}
        >
          {triggerLabel}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[2rem] border border-[#3f352a]/10 bg-[#f4f0e8]/96 p-8 text-center text-[#121212] shadow-[0_30px_90px_rgba(67,49,31,0.24)] backdrop-blur-xl sm:max-w-xl">
        <DialogHeader className="space-y-4 flex flex-col items-center text-center">
          <DialogTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Get TripCache on your phone
          </DialogTitle>
          <DialogDescription className="mx-auto max-w-md text-base text-[#666666] sm:text-lg">
            Download the official iPhone or Android app, start with the free plan, and upgrade to Pro in the app when
            you need automation and exports.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 mb-4">
          <a 
            href="https://apps.apple.com/app/id6758403056" 
            target="_blank" 
            rel="noopener noreferrer"
            data-store-event-handled="true"
            onClick={() => trackConversion("app_store_click", { platform: "ios", placement: "download_modal" })}
            className="relative transition-transform hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
          >
            <Image
              src="/app-store-v3.svg"
              alt="Download on App Store"
              width={200}
              height={66}
              className="w-[160px] sm:w-[200px] h-auto drop-shadow-xl"
              style={{ height: "auto" }}
            />
          </a>
          <a 
            href="https://play.google.com/store/apps/details?id=app.tripcache" 
            target="_blank" 
            rel="noopener noreferrer"
            data-store-event-handled="true"
            onClick={() => trackConversion("play_store_click", { platform: "android", placement: "download_modal" })}
            className="relative transition-transform hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
          >
            <Image
              src="/play-store-v3.svg"
              alt="Get it on Google Play"
              width={200}
              height={66}
              className="w-[160px] sm:w-[200px] h-auto drop-shadow-xl"
              style={{ height: "auto" }}
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
