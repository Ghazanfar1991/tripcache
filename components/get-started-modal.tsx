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
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GetStartedModalProps {
  triggerClassName?: string
  triggerLabel?: string
}

export function GetStartedModal({ triggerClassName, triggerLabel = "Get Started" }: GetStartedModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn(
            "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full shadow-lg shadow-cyan-500/25",
            "px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm",
            triggerClassName,
          )}
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[2rem] border border-border/60 bg-background/95 p-8 shadow-2xl backdrop-blur-sm sm:max-w-xl text-center">
        <DialogHeader className="space-y-4 flex flex-col items-center text-center">
          <DialogTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready for a Better Way to Travel?
          </DialogTitle>
          <DialogDescription className="text-base sm:text-lg mx-auto max-w-md">
            Join thousands of travelers who have elevated their journey with TripCache. Download the app today.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 mb-4">
          <a 
            href="https://apps.apple.com/app/idYOUR_APP_ID" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative transition-transform hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
          >
            <Image
              src="/app-store.svg"
              alt="Download on App Store"
              width={200}
              height={66}
              className="w-[160px] sm:w-[200px] h-auto drop-shadow-xl"
            />
          </a>
          <a 
            href="https://play.google.com/store/apps/details?id=app.tripcache" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative transition-transform hover:-translate-y-1 hover:brightness-110 active:translate-y-0"
          >
            <Image
              src="/play-store.svg"
              alt="Get it on Google Play"
              width={200}
              height={66}
              className="w-[160px] sm:w-[200px] h-auto drop-shadow-xl"
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
