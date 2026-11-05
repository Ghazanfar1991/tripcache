import "../secondary.css"

import { Footer } from "@/components/footer"
import { LegalLayout, LegalNote, LegalSection, legalAnchor, legalLinkClass } from "@/components/site/company-legal"
import { PageHero, SitePage } from "@/components/site/kit"
import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "TripCache Terms of Service outlining acceptable use, payments, and legal responsibilities.",
  path: "/terms",
})

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
    title: "6. AI Assistant Connections",
    body: [
      "With TripCache Pro you can connect third-party AI assistants, such as ChatGPT, Claude or Meta Muse, to your account through TripCache's MCP server. You decide whether a connection may only read your trips or may also add plan items, expenses and booking drafts, and you can revoke it at any time in Profile → AI agents.",
      "You are responsible for the requests you ask an assistant to make. Assistants can misread or misstate travel information, so check important details such as times, gates and amounts in TripCache or with your airline or provider.",
      "The assistant is provided by its own company under its own terms and privacy policy. TripCache is not responsible for how an assistant uses information after it receives it.",
      "Use of the MCP server is limited to your own account and is rate limited. Don't use it to scrape, overload or probe TripCache, or to access anyone else's data. We may suspend a connection that does.",
    ],
  },
  {
    title: "7. Liability",
    body: [
      "TripCache is provided “as is”. To the fullest extent permitted by law, we disclaim implied warranties and limit aggregate liability to the fees you paid during the preceding 12 months.",
    ],
  },
]

export default function TermsPage() {
  const contents = terms.map((term) => ({ id: legalAnchor(term.title), title: term.title }))

  return (
    <SitePage>
      <PageHero
        title="The rules that keep TripCache reliable for everyone."
        lede={<p>Effective November 4, 2026. These Terms govern your access to TripCache apps, the website, the MCP server for AI assistants, and related services.</p>}
      />

      <LegalLayout label="Terms of Service" contents={contents}>
        {terms.map((term) => (
          <LegalSection key={term.title} id={legalAnchor(term.title)} title={term.title}>
            {term.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </LegalSection>
        ))}

        <LegalNote>
          Questions about these Terms? Contact{" "}
          <a className={legalLinkClass} href="mailto:legal@trip-cache.com">
            legal@trip-cache.com
          </a>
          .
        </LegalNote>
      </LegalLayout>
      <Footer />
    </SitePage>
  )
}
