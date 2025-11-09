import Link from "next/link"
import { SectionContainer } from "@/components/section-container"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Understand how TripCache collects, stores, and protects your travel data.",
}

const sections = [
  {
    heading: "Data We Collect",
    copy: [
      "Booking emails you forward to TripCache, account details you provide (name, email, role), and optional metadata like traveler tags or project codes.",
      "Diagnostic data that helps us keep the service reliable (app version, device type, crash logs). We never sell personal information.",
    ],
  },
  {
    heading: "How We Use Your Data",
    copy: [
      "To parse itineraries, surface documents, send proactive travel alerts, and generate CSV exports you explicitly request.",
      "To notify you about product updates or issues affecting your account. You can adjust notification preferences at any time.",
    ],
  },
  {
    heading: "Security & Retention",
    copy: [
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is limited to vetted team members with strict logging.",
      "You can delete trips, documents, or your account from within the app. Backups roll off after 30 days.",
    ],
  },
  {
    heading: "Third-Party Processors",
    copy: [
      "We rely on SOC 2 Type II partners for infrastructure, email, and analytics. Each processor is bound by data processing agreements and cannot use your data beyond the contracted service.",
    ],
  },
  {
    heading: "Your Rights",
    copy: [
      "Request a copy of your data, update incorrect information, restrict processing, or ask us to delete your account entirely.",
      "Email privacy@tripcache.com and we’ll confirm the request within 5 business days.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      <SectionContainer className="space-y-16 pb-16 pt-24">
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
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Privacy Policy</p>
          <h1 className="text-4xl sm:text-5xl font-bold">Your travel data stays yours.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Effective as of May 2025. We designed TripCache to be transparent, compliant, and secure for every traveler
            and enterprise team.
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur"
            >
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-muted-foreground text-sm leading-relaxed">
                {section.copy.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="rounded-3xl border border-border/50 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 text-center text-sm text-muted-foreground">
          Questions? Email{" "}
          <a className="font-semibold text-cyan-500" href="mailto:privacy@tripcache.com">
            privacy@tripcache.com
          </a>{" "}
          or mail TripCache, 440 N Barranca Ave #9933, Covina, CA 91723.
        </footer>
      </SectionContainer>
      <Footer />
    </main>
  )
}
