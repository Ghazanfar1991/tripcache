"use client"

import Image from "next/image"
import { useRef } from "react"

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
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openDialog = () => {
    dialogRef.current?.showModal()
    trackConversion("download_modal_open", { trigger_label: triggerLabel })
  }

  const closeDialog = () => dialogRef.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={cn(
          "inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#602ad2] px-3 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(77,32,175,0.18)] transition-[background-color,box-shadow,transform] hover:bg-[#4d20af] hover:shadow-[0_12px_28px_rgba(77,32,175,0.23)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d20af] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 sm:px-4 sm:text-sm",
          triggerClassName,
        )}
      >
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="download-dialog-title"
        aria-describedby="download-dialog-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
        className="m-auto max-h-[90vh] w-[min(36rem,calc(100%_-_2rem))] overflow-y-auto rounded-[2rem] border border-[#3f352a]/10 bg-[#f4f0e8]/96 p-0 text-[#121212] shadow-[0_30px_90px_rgba(67,49,31,0.24)] backdrop:bg-[#121212]/55 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-8 text-center sm:p-10">
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close download dialog"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-black/[0.055] text-2xl leading-none text-[#444444] transition-colors hover:bg-black/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d20af]"
          >
            <span aria-hidden="true">×</span>
          </button>

          <h2 id="download-dialog-title" className="pr-8 text-3xl font-extrabold tracking-tight sm:px-8 sm:text-4xl">
            Get TripCache on your phone
          </h2>
          <p id="download-dialog-description" className="mx-auto mt-4 max-w-md text-base text-[#666666] sm:text-lg">
            Download the official iPhone or Android app, start with the free plan, and upgrade to Pro in the app when
            you need automation and exports.
          </p>

          <div className="mb-4 mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="https://apps.apple.com/app/id6758403056"
              target="_blank"
              rel="noopener noreferrer"
              data-store-event-handled="true"
              onClick={() => trackConversion("app_store_click", { platform: "ios", placement: "download_modal" })}
              className="relative rounded-xl transition-transform hover:-translate-y-1 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d20af] active:translate-y-0"
            >
              <Image
                src="/app-store-v3.svg"
                alt="Download on the App Store"
                width={200}
                height={66}
                sizes="(min-width: 640px) 200px, 160px"
                className="h-auto w-[160px] drop-shadow-xl sm:w-[200px]"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=app.tripcache"
              target="_blank"
              rel="noopener noreferrer"
              data-store-event-handled="true"
              onClick={() => trackConversion("play_store_click", { platform: "android", placement: "download_modal" })}
              className="relative rounded-xl transition-transform hover:-translate-y-1 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d20af] active:translate-y-0"
            >
              <Image
                src="/play-store-v3.svg"
                alt="Get it on Google Play"
                width={200}
                height={66}
                sizes="(min-width: 640px) 200px, 160px"
                className="h-auto w-[160px] drop-shadow-xl sm:w-[200px]"
              />
            </a>
          </div>
        </div>
      </dialog>
    </>
  )
}
