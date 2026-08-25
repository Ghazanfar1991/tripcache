import Link from "next/link"
import { SectionContainer } from "@/components/section-container"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TripCache Terms of Service outlining acceptable use, payments, and legal responsibilities.",
  alternates: {
    canonical: "/terms",
  },
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
      "Paid subscriptions renew according to the billing period shown when you purchase in the mobile app.",
      "Apple App Store or Google Play billing terms, cancellation controls, and refund policies apply to purchases made through those platforms.",
    ],
  },
  {
    title: "4. Service Commitments",
    body: [
      "We work to keep TripCache reliable, but travel data and third-party flight information can be delayed, incomplete, or unavailable.",
      "TripCache may modify features to improve performance or compliance; material changes will be communicated in advance when possible.",
    ],
  },
  {
    title: "5. Termination",
    body: [
      "You may cancel a subscription through the store account used to purchase it. Refund eligibility is determined by the applicable store policy and law.",
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
    <main className="journal-paper min-h-screen text-[#121212]">
      <SectionContainer className="space-y-14 pb-20 pt-32 sm:pt-36">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="design-one-press inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#5f5f5f] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)] transition-colors hover:text-[#4d20af]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4d20af]">Terms of Service</p>
          <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">The rules that keep TripCache reliable for everyone.</h1>
          <p className="text-lg leading-8 text-[#666666]">
            Effective July 16, 2026. These Terms govern your access to TripCache apps, the website, and related services.
          </p>
        </header>

        <div className="space-y-8">
          {terms.map((term) => (
            <section key={term.title} className="rounded-[28px] bg-white/48 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)] sm:p-8">
              <h2 className="text-2xl font-semibold">{term.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#666666]">
                {term.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="rounded-[28px] bg-[#eee7dc] p-7 text-center text-sm text-[#666666]">
          Questions about these Terms? Contact{" "}
          <a className="font-semibold text-[#4d20af]" href="mailto:legal@trip-cache.com">
            legal@trip-cache.com
          </a>
          .
        </footer>
      </SectionContainer>
      <Footer />
    </main>
  )
}
