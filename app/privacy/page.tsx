import "../secondary.css"

import { Footer } from "@/components/footer"
import { LegalLayout, LegalNote, LegalSection, legalAnchor, legalLinkClass } from "@/components/site/company-legal"
import { PageHero, SitePage } from "@/components/site/kit"
import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Understand how TripCache collects, uses, stores, and handles your travel data.",
  path: "/privacy",
})

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
  const contents = sections.map((section) => ({ id: legalAnchor(section.heading), title: section.heading }))

  return (
    <SitePage>
      <PageHero
        title="Your travel data stays yours."
        lede={
          <p>
            Effective July 16, 2026. This page explains how TripCache handles data for travelers using the website and
            mobile apps.
          </p>
        }
      />

      <LegalLayout label="Privacy Policy" contents={contents}>
        {sections.map((section) => (
          <LegalSection key={section.heading} id={legalAnchor(section.heading)} title={section.heading}>
            {section.copy.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </LegalSection>
        ))}

        <LegalNote>
          Questions? Email{" "}
          <a className={legalLinkClass} href="mailto:privacy@trip-cache.com">
            privacy@trip-cache.com
          </a>{" "}
          or mail TripCache, 440 N Barranca Ave #9933, Covina, CA 91723.
        </LegalNote>
      </LegalLayout>
      <Footer />
    </SitePage>
  )
}
