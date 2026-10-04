"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"

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
  // Several download buttons can share a page, so each dialog needs its own ids.
  const id = useId()
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`
  // The dialog is only rendered while open: closed copies would repeat its heading
  // (before the page's H1) and duplicate content in the server HTML.
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen && dialog && !dialog.open) dialog.showModal()
  }, [isOpen])

  const openDialog = () => {
    setIsOpen(true)
    trackConversion("download_modal_open", { trigger_label: triggerLabel })
  }

  const closeDialog = () => dialogRef.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        className={cn(
          "tc-press inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[12px] bg-tc-violet px-5 text-[14.5px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] transition-colors duration-200 hover:bg-[#5520cb] disabled:pointer-events-none disabled:opacity-50",
          triggerClassName,
        )}
      >
        {triggerLabel}
      </button>

      {isOpen ? (
        <dialog
          ref={dialogRef}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClose={() => setIsOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog()
          }}
          className="m-auto max-h-[90vh] w-[min(34rem,calc(100%_-_2rem))] translate-y-3 scale-[0.98] overflow-hidden rounded-[30px] border border-[#e7e9eb] bg-white p-0 font-tc text-tc-ink opacity-0 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_50px_100px_-40px_rgba(45,27,87,0.6)] transition-[opacity,translate,scale,display,overlay] transition-discrete duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop:bg-[#140f2a]/55 backdrop:backdrop-blur-sm open:translate-y-0 open:scale-100 open:opacity-100 motion-reduce:transition-none starting:open:translate-y-3 starting:open:scale-[0.98] starting:open:opacity-0"
        >
          <div className="relative max-h-[90vh] overflow-y-auto">
            <span
              aria-hidden="true"
              className="tc-bloom pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#8b5cf6] opacity-35"
            />
            <span
              aria-hidden="true"
              className="tc-bloom pointer-events-none absolute -bottom-32 -left-24 size-64 rounded-full bg-[#ec4899] opacity-20"
            />

            <div className="relative px-6 pb-8 pt-8 text-center sm:px-10 sm:pb-10 sm:pt-10">
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close download dialog"
                className="tc-press absolute right-4 top-4 grid size-10 place-items-center rounded-[12px] border border-[#e7e9eb] bg-[#f5f7f9] text-[#3a3d42] transition-colors hover:bg-[#e7e9eb] hover:text-tc-ink"
              >
                <X className="size-[18px]" strokeWidth={2.2} aria-hidden="true" />
              </button>

              <Image
                src="/app-icon-violet-indigo.png"
                alt=""
                width={72}
                height={72}
                loading="eager"
                className="mx-auto size-[72px] rounded-[18px] shadow-[0_18px_34px_-18px_rgba(45,27,87,0.55)]"
              />

              <h2
                id={titleId}
                className="mx-auto mt-6 max-w-[18ch] text-balance font-tc-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-tc-ink sm:text-[36px]"
              >
                Get TripCache on your phone
              </h2>
              <p id={descriptionId} className="mx-auto mt-4 max-w-[44ch] text-pretty text-[16px] leading-7 text-[#3a3d42] sm:text-[17px]">
                Download the official iPhone or Android app and start with the free plan, which includes cancellation
                reminders and exports. Upgrade to Pro in the app when you want email import and live flight alerts.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://apps.apple.com/app/id6758403056"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-store-event-handled="true"
                  data-store-placement="download_modal"
                  onClick={() => trackConversion("app_store_click", { platform: "ios", placement: "download_modal" })}
                  className="tc-press block rounded-[12px]"
                >
                  <Image src="/app-store-v3.svg" alt="Download on the App Store" width={540} height={160} unoptimized className="h-12 w-auto" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=app.tripcache"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-store-event-handled="true"
                  data-store-placement="download_modal"
                  onClick={() => trackConversion("play_store_click", { platform: "android", placement: "download_modal" })}
                  className="tc-press block rounded-[12px]"
                >
                  <Image src="/play-store-v3.svg" alt="Get it on Google Play" width={540} height={160} unoptimized className="h-12 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  )
}
