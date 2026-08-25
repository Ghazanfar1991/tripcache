import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Mail, Smartphone, Trash2 } from "lucide-react"
import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/section-container"

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Learn how to delete your TripCache account directly from the app or contact support for account deletion help.",
  alternates: {
    canonical: "/account-delete",
  },
}

const steps = [
  "Open the TripCache app and sign in to the account you want to remove.",
  "Go to your account or settings screen.",
  "Select the delete account option and confirm the request in the app.",
]

export default function AccountDeletePage() {
  return (
    <main className="journal-paper min-h-screen text-[#29251f]">
      <SectionContainer className="space-y-14 pb-20 pt-32 sm:pt-36">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="design-one-press inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#625b52] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)] transition-colors hover:text-[#a44833]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>

        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a44833]">Account Deletion</p>
          <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">Delete your TripCache account from the app.</h1>
          <p className="text-lg leading-8 text-[#6f675d]">
            You can permanently delete your account directly inside the TripCache app. If you need help, contact our
            support team and we&apos;ll assist with the request.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[28px] bg-white/48 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f0d7ca] p-3 text-[#b9543a]">
                <Smartphone className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Delete it in the app</h2>
            </div>
            <ol className="mt-5 space-y-4 text-sm leading-relaxed text-[#71695f]">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eadfce] text-xs font-semibold text-[#29251f]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-[28px] bg-white/48 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f0d7ca] p-3 text-[#b9543a]">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Need support?</h2>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#71695f]">
              If you cannot access the app or want help with account deletion, email our support team at{" "}
              <a className="font-semibold text-[#a44833]" href="mailto:support@trip-cache.com">
                support@trip-cache.com
              </a>
              .
            </p>
            <div className="mt-6 rounded-2xl bg-[#eee7dc] p-4 text-sm text-[#71695f]">
              We may ask you to verify account ownership before completing a manual deletion request.
            </div>
          </article>
        </section>

        <section className="rounded-[28px] bg-[#f0d7ca] p-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
          <div className="mx-auto max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold">
              <Trash2 className="h-4 w-4 text-[#b9543a]" />
              Permanent account deletion
            </div>
            <p className="text-sm leading-relaxed text-[#71695f]">
              Deleting your account removes access to your TripCache data and cannot be undone.
            </p>
          </div>
        </section>
      </SectionContainer>
      <Footer />
    </main>
  )
}
