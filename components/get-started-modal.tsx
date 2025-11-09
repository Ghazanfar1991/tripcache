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
import { AppStoreButtons } from "./app-store-buttons"
import { useMailchimpWaitlist } from "@/hooks/use-mailchimp-waitlist"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface GetStartedModalProps {
  triggerClassName?: string
  triggerLabel?: string
}

export function GetStartedModal({ triggerClassName, triggerLabel = "Get Started" }: GetStartedModalProps) {
  const [open, setOpen] = useState(false)
  const { email, setEmail, status, message, handleSubmit, reset } = useMailchimpWaitlist()

  const handleOpenChange = (value: boolean) => {
    setOpen(value)
    if (!value) {
      setEmail("")
      reset()
    }
  }

  const isLoading = status === "loading"

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn(
            "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full text-sm font-medium shadow-lg shadow-cyan-500/25",
            triggerClassName,
          )}
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border border-border/60 bg-background/95 p-6 shadow-2xl backdrop-blur-sm sm:max-w-xl lg:max-w-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl sm:text-3xl font-semibold">Join the TripCache waitlist</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Get launch updates, early access to the mobile apps, and priority invites to new features.
          </DialogDescription>
        </DialogHeader>

        {message && (
          <div
            className={cn(
              "flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium",
              status === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300",
            )}
            role="status"
            aria-live="polite"
          >
            {status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor="modal-email" className="sr-only">
                Email address
              </label>
              <input
                id="modal-email"
                name="EMAIL"
                type="email"
                placeholder="Enter your email to join the waitlist"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (status !== "idle") {
                    reset()
                  }
                }}
                className="w-full rounded-full border border-border/80 bg-background px-5 py-3 text-sm sm:text-base shadow-sm transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 dark:bg-background/80 dark:border-white/20 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-6 text-sm sm:text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-600 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Submitting..." : "Join Waitlist"}
            </Button>
          </div>

          <input type="hidden" name="f_id" value="008583e5f0" />
          <div className="hidden" aria-hidden="true">
            <input type="text" name="b_1cef3766ef227139e3c699e85_536a3e4923" tabIndex={-1} defaultValue="" />
          </div>
        </form>

        <div className="space-y-3 rounded-2xl border border-dashed border-border/60 bg-muted/20 p-4">
          <div>
            <h3 className="text-base font-semibold">Mobile apps are coming soon</h3>
            <p className="text-sm text-muted-foreground">
              Prefer the native experience? Be the first to download TripCache on iOS and Android when the beta drops.
            </p>
          </div>
          <AppStoreButtons variant="light" showQr />
        </div>
      </DialogContent>
    </Dialog>
  )
}
