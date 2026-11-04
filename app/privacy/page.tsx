import "../secondary.css"

import { Footer } from "@/components/footer"
import { LegalLayout, LegalNote, LegalSection, legalAnchor, legalLinkClass } from "@/components/site/company-legal"
import { PageHero, SitePage } from "@/components/site/kit"
import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How TripCache collects, uses, stores and shares your travel data, including with AI assistants you connect.",
  path: "/privacy",
})

const sections = [
  {
    heading: "Data We Collect",
    copy: [
      "Account details: your name, email address and sign-in method (email, Apple or Google).",
      "Travel content you add or send us: booking emails you forward, files and screenshots you upload, and the trips, flights, hotel stays, cars, activities, notes, checklists, reminders, documents and expenses saved from them or entered by you.",
      "Subscription status from the App Store or Google Play (through RevenueCat). We never see your card details.",
      "Diagnostic and usage data that keeps the service reliable: app version, device type, crash logs and in-app analytics events. We never sell personal information.",
    ],
  },
  {
    heading: "How We Use Your Data",
    copy: [
      "To parse itineraries, build your trips, track your flights, surface documents, send the travel alerts and reminders you turn on, and generate exports you request.",
      "To notify you about product updates or issues affecting your account. You can adjust notification preferences at any time.",
      "We don't use your travel content for advertising, we don't sell it, and we don't use it to train AI models.",
    ],
  },
  {
    heading: "AI Processing of Imports",
    copy: [
      "When you forward a booking email or upload a confirmation, its text and attachments are sent to an AI model provider (through OpenRouter) to extract the booking details. The result is saved to your account as a draft or trip.",
      "Flight numbers and dates are sent to our flight data provider (AeroDataBox) to fetch schedules and live status.",
    ],
  },
  {
    heading: "AI Assistant Connections",
    copy: [
      "With TripCache Pro you can connect an AI assistant, such as ChatGPT, Claude, Meta Muse or another app that supports the Model Context Protocol (MCP), to your account. A connection only starts after you sign in to TripCache and approve it. You choose whether the assistant may only read your trips, or may also add bookings and expenses.",
      "What a connected assistant can read when you ask it: trip names, dates and destinations; flight numbers, airlines, airports, scheduled and estimated times, gate, terminal, baggage belt, delay and aircraft position; the names, places and local times of hotel stays, cars, activities and other plans; expense titles, amounts, currencies, categories and budgets; the names and types of saved documents; checklist progress and upcoming reminder titles.",
      "What it never receives: confirmation and ticket numbers, booking notes, booking prices, document files or links, your password, or payment details.",
      "What it can change, only if you allowed it: add a plan item or an expense to a trip, or send a booking confirmation that becomes a draft you review in the app. Connected apps can't delete anything, share trips or change your account.",
      "What we keep: a record of each connection (the app's name, the permissions you gave and when it was last used) until you revoke it, and a security log of each request (the action, time, outcome, a fingerprint of its inputs and the requesting IP address) for 180 days to prevent abuse. We don't receive or store your conversations with the assistant; it only sends us the requests it makes.",
      "Information an assistant reads from TripCache is handled by that assistant's provider under its own privacy policy, for example OpenAI, Anthropic or Meta.",
      "To disconnect, open TripCache → Profile → AI agents and tap Revoke. Its next request is refused. You can also remove TripCache in the assistant's settings.",
    ],
  },
  {
    heading: "Security & Retention",
    copy: [
      "TripCache uses access controls and infrastructure safeguards intended to protect account and travel data, including row-level access rules so each account can only reach its own data. Platform-specific data collection and security disclosures are also available on the official App Store and Google Play listings.",
      "Your data is kept while your account is active. You can delete trips, documents, or your account from within the app. Backups roll off after 30 days.",
    ],
  },
  {
    heading: "Third-Party Processors",
    copy: [
      "We use service providers for infrastructure and storage (Supabase), website hosting and networking (Vercel, Cloudflare), email delivery and receiving (Mailjet, Resend, Cloudflare), AI booking extraction (OpenRouter), flight data (AeroDataBox), subscriptions (RevenueCat), app analytics and crash reporting (Google Firebase), website analytics (Google Analytics, Vercel Analytics), and app distribution and sign-in (Apple, Google).",
      "These providers process data only for the services they supply to TripCache, subject to their agreements and applicable law.",
    ],
  },
  {
    heading: "Children",
    copy: ["TripCache isn't directed to children under 13, and we don't knowingly collect their personal information."],
  },
  {
    heading: "Your Rights",
    copy: [
      "Request a copy of your data, update incorrect information, restrict processing, or ask us to delete your account entirely.",
      "Email privacy@trip-cache.com to submit a privacy request.",
    ],
  },
  {
    heading: "Changes",
    copy: ["We'll update the effective date above when this policy changes, and tell you in the app or by email about material changes."],
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
            Effective November 4, 2026. This page explains how TripCache handles data for travelers using the website,
            the mobile apps, and AI assistants connected to TripCache.
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
