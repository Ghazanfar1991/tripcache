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
    <main className="journal-paper min-h-screen text-[#29251f]">
      <SectionContainer className="space-y-16 pb-20 pt-32 sm:pt-36">
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            className="design-one-press inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-[#625b52] shadow-[inset_0_0_0_1px_rgba(58,48,38,0.08),0_8px_28px_rgba(72,53,33,0.05)] transition-colors hover:text-[#a44833]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a44833]">Privacy Policy</p>
          <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">Your travel data stays yours.</h1>
          <p className="text-lg leading-8 text-[#6f675d]">
            Effective July 16, 2026. This page explains how TripCache handles data for travelers using the website and
            mobile apps.
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-[28px] bg-white/48 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_55px_rgba(72,53,33,0.06)] sm:p-8"
            >
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#71695f]">
                {section.copy.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="rounded-[28px] bg-[#f0d7ca] p-7 text-center text-sm text-[#71695f]">
          Questions? Email{" "}
          <a className="font-semibold text-[#a44833]" href="mailto:privacy@trip-cache.com">
            privacy@trip-cache.com
          </a>{" "}
          or mail TripCache, 440 N Barranca Ave #9933, Covina, CA 91723.
        </footer>
      </SectionContainer>
      <Footer />
    </main>
  )
}
