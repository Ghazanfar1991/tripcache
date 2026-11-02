"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { cx } from "@/components/site/kit"

/** The MCP server link with a copy button. The link stays selectable when the clipboard isn't available. */
export function CopyLink({ url, className }: { url: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle")

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
    window.setTimeout(() => setStatus("idle"), 2400)
  }

  return (
    <div className={cx("flex flex-col gap-2 sm:flex-row sm:items-stretch", className)}>
      <code className="min-w-0 flex-1 select-all break-all rounded-[12px] border border-tc-line bg-tc-mist px-4 py-3 font-mono text-[13.5px] leading-6 text-tc-ink">
        {url}
      </code>
      <button
        type="button"
        onClick={copy}
        className="tc-press inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[12px] bg-tc-violet px-5 text-[14.5px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] transition-colors duration-200 hover:bg-[#5520cb]"
      >
        {status === "copied" ? <Check className="size-4" strokeWidth={2.6} aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {status === "copied" ? "Copied" : "Copy link"}
      </button>
      <span role="status" className="sr-only">
        {status === "copied" ? "Link copied" : status === "failed" ? "Couldn't copy. Select the link and copy it instead." : ""}
      </span>
    </div>
  )
}
