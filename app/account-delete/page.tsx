import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Mail, Smartphone, Trash2 } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { SectionContainer } from "@/components/section-container"

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Learn how to delete your TripCache account directly from the app or contact support for account deletion help.",
}

const steps = [
  "Open the TripCache app and sign in to the account you want to remove.",
  "Go to your account or settings screen.",
  "Select the delete account option and confirm the request in the app.",
]

export default function AccountDeletePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      <SectionContainer className="space-y-14 pb-16 pt-24">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>

        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Account Deletion</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Delete your TripCache account from the app.</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            You can permanently delete your account directly inside the TripCache app. If you need help, contact our
            support team and we&apos;ll assist with the request.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-500">
                <Smartphone className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Delete it in the app</h2>
            </div>
            <ol className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border/60 text-xs font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-500">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Need support?</h2>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              If you cannot access the app or want help with account deletion, email our support team at{" "}
              <a className="font-semibold text-cyan-500" href="mailto:support@trip-cache.com">
                support@trip-cache.com
              </a>
              .
            </p>
            <div className="mt-6 rounded-2xl border border-border/50 bg-background/60 p-4 text-sm text-muted-foreground">
              We may ask you to verify account ownership before completing a manual deletion request.
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-border/50 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 text-center shadow-sm">
          <div className="mx-auto max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 py-2 text-sm font-medium">
              <Trash2 className="h-4 w-4 text-cyan-500" />
              Permanent account deletion
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Deleting your account removes access to your TripCache data and cannot be undone.
            </p>
          </div>
        </section>
      </SectionContainer>
      <Footer />
    </main>
  )
}
