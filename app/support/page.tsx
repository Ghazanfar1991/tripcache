import "../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { LegalLayout, LegalNote, LegalSection, legalAnchor, legalLinkClass } from "@/components/site/company-legal"
import { PageHero, SitePage } from "@/components/site/kit"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Support",
  description: "Get help with TripCache: contact support, connect or disconnect AI assistants, manage your subscription and delete your data.",
  path: "/support",
})

const sections = ["Contact us", "AI assistants", "Subscriptions", "Your account and data"]

export default function SupportPage() {
  const contents = sections.map((title) => ({ id: legalAnchor(title), title }))

  return (
    <SitePage>
      <PageHero title="How can we help?" lede={<p>Email us, or find the answer for the most common questions below.</p>} />

      <LegalLayout label="Support" contents={contents}>
        <LegalSection id={legalAnchor("Contact us")} title="Contact us">
          <p>
            Email{" "}
            <a className={legalLinkClass} href="mailto:support@trip-cache.com">
              support@trip-cache.com
            </a>{" "}
            from the address you use for TripCache, so we can find your account. You can also write to us from the app in
            Profile → Help &amp; Feedback.
          </p>
          <p>
            Privacy requests go to{" "}
            <a className={legalLinkClass} href="mailto:privacy@trip-cache.com">
              privacy@trip-cache.com
            </a>
            . To report a security issue, email support@trip-cache.com with “Security” in the subject.
          </p>
        </LegalSection>

        <LegalSection id={legalAnchor("AI assistants")} title="AI assistants">
          <p>
            Connect TripCache to Claude, ChatGPT and other assistants with the steps on the{" "}
            <Link className={legalLinkClass} href="/ai-agents">
              AI agents page
            </Link>
            . The{" "}
            <Link className={legalLinkClass} href="/ai-agents/mcp#troubleshooting">
              MCP server documentation
            </Link>{" "}
            covers sign-in, permissions, errors and troubleshooting.
          </p>
          <p>To disconnect an assistant, open TripCache → Profile → AI agents and tap Revoke.</p>
        </LegalSection>

        <LegalSection id={legalAnchor("Subscriptions")} title="Subscriptions">
          <p>
            TripCache Pro is bought in the iPhone or Android app and billed by the App Store or Google Play. Manage or cancel it in
            your Apple or Google account settings; refunds follow the store&apos;s policy. Plans are described on the{" "}
            <Link className={legalLinkClass} href="/pricing">
              pricing page
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection id={legalAnchor("Your account and data")} title="Your account and data">
          <p>
            Delete trips and documents in the app, or delete your whole account in Profile. See{" "}
            <Link className={legalLinkClass} href="/account-delete">
              deleting your account
            </Link>{" "}
            and the{" "}
            <Link className={legalLinkClass} href="/privacy">
              privacy policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalNote>TripCache, 440 N Barranca Ave #9933, Covina, CA 91723.</LegalNote>
      </LegalLayout>
      <Footer />
    </SitePage>
  )
}
