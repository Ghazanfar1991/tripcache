import Link from "next/link"
import { SectionContainer } from "@/components/section-container"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Understand how TripCache collects, stores, and protects your travel data.",
  alternates: {
    canonical: "/privacy",
  },
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
      "TripCache uses access controls and infrastructure safeguards intended to protect account and travel data. Platform-specific data collection and security disclosures are also available on the official App Store and Google Play listings.",
      "You can delete trips, documents, or your account from within the app. Backups roll off after 30 days.",
    ],
  },
  {
    heading: "Third-Party Processors",
    copy: [
      "We use service providers for infrastructure, email delivery, analytics, and app distribution. These providers process data only for the services they supply to TripCache, subject to their agreements and applicable law.",
    ],
  },
  {
    heading: "Your Rights",
    copy: [
      "Request a copy of your data, update incorrect information, restrict processing, or ask us to delete your account entirely.",
      "Email privacy@trip-cache.com to submit a privacy request.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
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
            Effective July 16, 2026. This page explains how TripCache handles data for travelers using the website and
            mobile apps.
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
          <a className="font-semibold text-cyan-500" href="mailto:privacy@trip-cache.com">
            privacy@trip-cache.com
          </a>{" "}
          or mail TripCache, 440 N Barranca Ave #9933, Covina, CA 91723.
        </footer>
      </SectionContainer>
      <Footer />
    </main>
  )
}
