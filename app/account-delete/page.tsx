import "../secondary.css"

import type { Metadata } from "next"
import { Mail, Smartphone, Trash2 } from "lucide-react"
import { Footer } from "@/components/footer"
import { LegalLayout, LegalSection, legalLinkClass } from "@/components/site/company-legal"
import { PageHero, SitePage } from "@/components/site/kit"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Delete Your Account",
  description:
    "Learn how to delete your TripCache account directly from the app or contact support for account deletion help.",
  path: "/account-delete",
})

const steps = [
  "Open the TripCache app and sign in to the account you want to remove.",
  "Go to your account or settings screen.",
  "Select the delete account option and confirm the request in the app.",
]

const contents = [
  { id: "delete-in-the-app", title: "Delete it in the app" },
  { id: "need-support", title: "Need support?" },
]

export default function AccountDeletePage() {
  return (
    <SitePage>
      <PageHero
        title="Delete your TripCache account from the app."
        lede={
          <p>
            You can permanently delete your account directly inside the TripCache app. If you need help, contact our
            support team and we&apos;ll assist with the request.
          </p>
        }
      />

      <LegalLayout label="Account Deletion" contents={contents}>
        <LegalSection
          id="delete-in-the-app"
          title={
            <span className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-tc-violet-soft text-tc-violet">
                <Smartphone className="size-5" aria-hidden="true" />
              </span>
              Delete it in the app
            </span>
          }
        >
          <ol className="grid gap-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-tc-violet-soft text-[14px] font-semibold text-tc-violet [font-variant-numeric:tabular-nums]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </LegalSection>

        <LegalSection
          id="need-support"
          title={
            <span className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-tc-violet-soft text-tc-violet">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              Need support?
            </span>
          }
        >
          <p>
            If you cannot access the app or want help with account deletion, email our support team at{" "}
            <a className={legalLinkClass} href="mailto:support@trip-cache.com">
              support@trip-cache.com
            </a>
            .
          </p>
          <p className="rounded-[16px] border border-tc-line bg-tc-mist px-5 py-4 text-[16px] leading-7 text-tc-ink-2">
            We may ask you to verify account ownership before completing a manual deletion request.
          </p>
        </LegalSection>

        <div className="mt-2 flex gap-4 rounded-[16px] border border-tc-line bg-tc-mist p-5 sm:p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-tc-line bg-white text-tc-ink">
            <Trash2 className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-tc-display text-[19px] font-semibold text-tc-ink">Permanent account deletion</p>
            <p className="mt-1 text-[16px] leading-7 text-tc-ink-2">
              Deleting your account removes access to your TripCache data and cannot be undone.
            </p>
          </div>
        </div>
      </LegalLayout>
      <Footer />
    </SitePage>
  )
}
