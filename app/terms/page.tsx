import Link from "next/link"
import { SectionContainer } from "@/components/section-container"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TripCache Terms of Service outlining acceptable use, payments, and legal responsibilities.",
}

const terms = [
  {
    title: "1. Acceptance",
    body: [
      "By creating an account or using TripCache you agree to these Terms and our Privacy Policy.",
      "If you are acting on behalf of a company, you represent that you are authorized to accept these Terms for that organization.",
    ],
  },
  {
    title: "2. Accounts & Usage",
    body: [
      "You are responsible for safeguarding login credentials and ensuring shared accounts follow principle of least privilege.",
      "Do not upload unlawful content, attempt to access another user’s data, or misuse our infrastructure.",
    ],
  },
  {
    title: "3. Subscription & Billing",
    body: [
      "Paid tiers renew monthly or annually depending on the plan you select. We accept all major cards through our payment processor.",
      "Invoices are due upon receipt. Late payments may result in suspension after reasonable notice.",
    ],
  },
  {
    title: "4. Service Commitments",
    body: [
      "We maintain >99.5% uptime, scheduled maintenance notices, and enterprise-grade security practices.",
      "TripCache may modify features to improve performance or compliance; material changes will be communicated in advance when possible.",
    ],
  },
  {
    title: "5. Termination",
    body: [
      "You may cancel at any time from the billing dashboard. Refunds are not provided for partially used billing periods unless required by law.",
      "We reserve the right to suspend or terminate accounts that violate these Terms or applicable regulations.",
    ],
  },
  {
    title: "6. Liability",
    body: [
      "TripCache is provided “as is”. To the fullest extent permitted by law, we disclaim implied warranties and limit aggregate liability to the fees you paid during the preceding 12 months.",
    ],
  },
]

export default function TermsPage() {
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
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Terms of Service</p>
          <h1 className="text-4xl sm:text-5xl font-bold">The rules that keep TripCache reliable for everyone.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Effective as of May 2025. These Terms govern your access to TripCache apps, APIs, and related services.
          </p>
        </header>

        <div className="space-y-8">
          {terms.map((term) => (
            <section key={term.title} className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">{term.title}</h2>
              <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
                {term.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="rounded-3xl border border-border/50 bg-card/60 p-6 text-sm text-muted-foreground text-center">
          Questions about these Terms? Contact{" "}
          <a className="font-semibold text-cyan-500" href="mailto:legal@tripcache.com">
            legal@tripcache.com
          </a>
          .
        </footer>
      </SectionContainer>
      <Footer />
    </main>
  )
}
