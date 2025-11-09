import type { BlogFrontmatter } from "@/types/blog"

export const metadata: BlogFrontmatter = {
  slug: "privacy-and-security",
  title: "How We Keep Your Travel Data Secure",
  excerpt: "Your privacy matters. Learn about the security measures and encryption protocols we use to protect your sensitive travel information.",
  description: "Your privacy matters. Learn about the security measures and encryption protocols we use to protect your sensitive travel information.",
  date: "2024-12-20",
  author: "David Park",
  readTime: "5 min read",
  category: "Security",
  image: "/data-security-encryption.jpg",
  keywords: [
    "travel data security",
    "TripCache privacy",
    "secure travel app",
    "GDPR compliant travel app",
    "encrypted itinerary manager"
  ],
}

export const body = String.raw`# How TripCache Keeps Your Travel Data Secure

Trust is the foundation of every great travel app. When you forward booking confirmations, you're sharing passport numbers, loyalty IDs, flight plans, and credit card details. TripCache was engineered with enterprise-grade security so you can stay organized without compromising privacy.

## Security Principles We Live By

We follow three core commitments:

- **Privacy by design** – data minimization and user control sit at the heart of every feature.
- **Defense in depth** – multiple layers of protection guard against external and internal threats.
- **Transparency** – no dark patterns, no hidden data sales, and no surprise partner access.

## Encryption at Every Layer

- **In transit:** Every connection uses TLS 1.3 with modern cipher suites.
- **At rest:** All databases and object storage are encrypted using AES-256.
- **Document vault:** Uploaded passports, visas, and PDFs live in a hardened storage bucket with rotating keys.
- **Secrets management:** Credentials are stored in dedicated secret managers with strict rotation policies.

## Strict Access Controls

- Production systems run in isolated VPCs with zero-trust networking.
- Only vetted engineers with a business need can access infrastructure.
- Administrative actions are logged and reviewed regularly.
- Multi-factor authentication is enforced across internal tools.

## Compliance and Data Residency

- TripCache complies with GDPR and CCPA, giving you the right to access, correct, or delete your data at any time.
- Data is hosted in SOC 2-certified data centers with redundant backups.
- EU user data can be confined to EU regions upon request.

## Keeping Attackers Out

We invest in proactive security:

- Continuous vulnerability scanning and penetration testing.
- Bug bounty partnerships to surface real-world exploits.
- Automated anomaly detection that flags suspicious login patterns.
- Rate limiting and bot protection on all public endpoints.

## You Control Your Data

- Download your entire travel history in CSV format whenever you like.
- Delete trips, documents, or your whole account from within settings.
- Request API access logs for peace of mind.
- Turn off email notifications if you prefer minimal data exposure.

## Building a Culture of Security

Security is not a feature—it's a culture:

- Every employee completes mandatory security and privacy training.
- Incident response drills keep the team ready for unlikely events.
- We publish transparency updates whenever policies change.

## Partnering With You

Have a privacy question or need a custom data agreement? Reach us at security@tripcache.app. We're happy to complete vendor assessments, share penetration test summaries, or accommodate enterprise requirements.

## Travel Confidently with TripCache

Your itinerary is more than a calendar—it's a roadmap to your life. TripCache safeguards that roadmap with encryption, compliance, and a relentless focus on privacy. Organize your journeys knowing your data stays protected from booking to boarding.
`
