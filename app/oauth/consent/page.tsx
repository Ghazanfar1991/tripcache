import "../../secondary.css"

import type { Metadata } from "next"
import { Suspense } from "react"
import { Bloom } from "@/components/home/category"
import { SitePage } from "@/components/site/kit"
import { ConsentFlow, ConsentSkeleton } from "./consent-flow"

// Consent screen for Supabase Auth's OAuth 2.1 server: AI apps (ChatGPT, Claude, …)
// send people here to connect their TripCache account. Never indexed, never framed
// (next.config.mjs sends frame-ancestors 'none' and X-Robots-Tag for /oauth/).
export const metadata: Metadata = {
  title: "Connect an app to TripCache",
  description: "Review and approve an app's access to your TripCache trips.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
}

export default function OAuthConsentPage() {
  return (
    <SitePage className="relative isolate min-h-dvh overflow-hidden bg-[linear-gradient(to_bottom,#f7f5ff_0%,#f0f2f4_70%)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Bloom className="tc-drift -right-40 -top-24 size-[420px] opacity-30" color="#8b5cf6" />
        <Bloom className="tc-drift-slow -left-40 top-[40%] size-[360px] opacity-20" color="#ec4899" />
      </div>
      <div className="mx-auto flex min-h-svh w-full max-w-[460px] flex-col px-4 pb-10 pt-6 sm:justify-center sm:px-5 sm:py-16">
        <Suspense fallback={<ConsentSkeleton />}>
          <ConsentFlow />
        </Suspense>
      </div>
    </SitePage>
  )
}
