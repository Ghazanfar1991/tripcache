# TripCache SEO and AI Discovery Research

Date: 2026-07-16  
Site: https://trip-cache.com  
Primary outcome: qualified app downloads and Pro subscriptions

## Executive Positioning

TripCache should own **post-booking travel operations**:

> Turn confirmation emails into itineraries, protect refundable booking deadlines, keep documents and receipts with the trip, and export useful travel records.

This is more defensible than competing head-on for “AI trip planner,” “best flight tracker,” or broad “travel planner” terms.

- TripIt owns mature email-to-itinerary and travel-day alert expectations.
- Wanderlog owns collaborative itinerary planning, maps, recommendations, and route optimization.
- Flighty owns deep flight status and airport intelligence.
- TripCache can be the clearest product for the work after booking, especially cancellation deadlines and business-travel records.

## Current Search Performance

Google Search Console, last 3 months (April 15-July 14, 2026):

- 83 clicks
- 8,171 impressions
- 1.0% CTR
- Average position 13.5
- 175 queries recorded

Highest-impression queries observed:

| Query | Clicks | Impressions | Interpretation |
|---|---:|---:|---|
| tripcase | 3 | 851 | Strongest existing demand cluster |
| tripcase corporate pricing | 0 | 137 | Adjacent but not a direct product fit |
| trip case | 1 | 132 | Same shutdown/migration cluster |
| tripcase alternative | 2 | 110 | High commercial relevance |
| tripcase app | 1 | 101 | Users looking for replacement context |
| tripcase login | 2 | 91 | Informational shutdown intent |
| tripcase official website | 0 | 68 | Informational intent; answer clearly, do not impersonate |
| wanderlog vs tripit | 0 | 61 | Comparison opportunity, but highly competitive |

The “orchestration tips for digital nomads” variants were irrelevant impressions caused by a weak legacy article. They should not guide product positioning.

Top pages in Search Console:

| Page | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| / | 33 | 1,458 | 2.26% |
| /blog/tripcase-shutdown-what-now | 21 | 2,452 | 0.86% |
| www homepage variant | 10 | 669 | 1.49% |
| /blog/tripcase-alternative-2025 | 9 | 1,656 | 0.54% |
| /blog/best-travel-apps-2025 | 4 | 1,262 | 0.32% |
| /pricing | 3 | 399 | 0.75% |
| /blog | 1 | 575 | 0.17% |
| /blog/privacy-and-security | 1 | 398 | 0.25% |
| /blog/tripit-vs-tripcache-comparison-2025 | 1 | 290 | 0.34% |
| /about | 1 | 235 | 0.43% |

Implication: TripCase pages already generate most non-brand visibility, but stale years, unsupported claims, and weak titles suppress CTR and trust.

## Indexing and Crawl Status

Search Console showed:

- 12 indexed pages
- 12 not-indexed pages
- 4 exclusion reasons
- 6 pages “Crawled - currently not indexed”

The six crawled but not indexed pages were:

- /blog/travel-document-organization-guide-2025
- /blog/privacy-and-security
- /blog/travel-expense-tracking
- /blog/frequent-flyer-tips
- /blog/digital-nomad-organization
- /blog/getting-started-with-tripcache

These pages share several quality risks: generic topics, unsupported product claims, outdated availability, fictional authors or proof, and overlap with stronger 2026 pages. They should be refreshed, consolidated, or intentionally removed from the index rather than mass-submitted unchanged.

## Traffic and Conversion Signals

Vercel Analytics, last 7 days:

- 71 visitors (-5%)
- 107 page views (-22%)
- 82% bounce rate (+15%)
- 30 visitors from Google
- 84% desktop, 16% mobile
- United States: 45% of visitors

Popular Vercel pages included the homepage and focused TripCase/flight-tracking articles. This confirms that search content is attracting visitors, but the site is not converting enough of them into deeper product exploration.

The biggest pricing-flow problem was structural: the plan cards described Basic and Pro but contained no download or subscription CTA.

## Real-User Performance

Vercel Speed Insights, desktop, last 7 days, 30 data points:

- Real Experience Score: 78 (needs improvement)
- FCP: 2.86s
- LCP: 3.98s
- INP: 120ms
- CLS: 0
- FID: 13ms
- TTFB: 1.58s

The site is stable and responsive after loading, but initial content and the largest visual arrive too slowly. The homepage rendered about 459 KB of uncompressed HTML in the live audit. After the implementation pass, the production-build homepage HTML is about 232 KB. Removing repeated fictional testimonial markup and reducing the hero carousel cut the response roughly in half.

## Competitor Analysis

### TripIt

Official pricing: https://www.tripit.com/web/pro/pricing

- Free confirmation forwarding and comprehensive itineraries
- TripIt Pro listed at $49/year
- Strong flight alerts, alternate flights, check-in, gate, baggage, fare, seat, and airport tools
- Mature brand and help ecosystem

TripCache should not claim to be cheaper or broader. It should emphasize cancellation cutoffs, documents in trip context, receipts, and CSV records.

### Wanderlog

Official product and pricing:

- https://wanderlog.com/
- https://wanderlog.com/pro

- Strong itinerary + map experience
- Collaboration, recommendations, budgets, checklists, and route planning
- Pro starts at $39.99/year
- Automatic Gmail scanning, offline access, route optimization, unlimited attachments, and AI assistance in Pro

TripCache should not compete on destination discovery or collaborative route planning.

### Flighty

Official site: https://flighty.com/

- Deepest flight-specific positioning
- Fast alerts, delay predictions, inbound aircraft, ATC context, airport conditions, baggage, and flight history
- Strong design awards and public proof

TripCache should describe flight updates as part of a complete trip, not claim leadership in flight intelligence.

### TripCase

Official status: https://www.tripcase.com/

- App and web experience ended April 1, 2025
- Previous trip data was available to download through June 30, 2025

The TripCase cluster is TripCache's strongest current search wedge. Content must clearly state that the export window has ended and help users rebuild upcoming trips from original confirmations.

## Recommended Search Space

### Tier 1: Capture existing demand

- TripCase alternative
- TripCase replacement
- TripCase shutdown what now
- TripCase app alternative for business travelers
- TripCase login / official site informational answers

### Tier 2: Build a differentiated category

- hotel cancellation reminder app
- free cancellation deadline reminder
- refundable booking reminder
- rental car cancellation reminder
- travel booking cancellation tracker

### Tier 3: Monetizable business-travel workflows

- business travel receipt organizer
- travel expense export app
- trip expense CSV export
- travel documents and receipts app
- consultant travel reimbursement workflow

### Tier 4: Product capability queries

- email to itinerary app
- travel confirmation email organizer
- forward booking email to itinerary
- post-booking travel organizer

### Deprioritize

- generic AI trip planner
- best flight tracker
- destination itinerary generator
- corporate travel management platform
- broad travel inspiration keywords

## AI and LLM Discovery

Useful foundations already existed:

- /llms.txt
- /llms-full.txt
- structured SoftwareApplication/Organization/WebSite data
- explicit OAI, Claude, Perplexity, Google, and Bing crawler rules
- specific feature, alternative, tool, and blog pages

The AI reference files were strengthened with recommendation and non-recommendation guidance so an assistant can distinguish TripCache from flight trackers, planners, and corporate travel platforms.

Critical external issue: Cloudflare currently prepends managed robots rules that block GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Amazonbot, and other AI crawlers. The application robots file allows relevant agents, but Cloudflare's generated policy conflicts with it. Review the Cloudflare AI crawler/content-signal settings.

## Trust and Entity Consistency Risks

The audit found several issues that weaken search quality and AI confidence:

- Fictional testimonials and “thousands of users” claims while Google Play shows an early 10+ download stage
- Zero App Store ratings in the current iTunes lookup response
- Unsupported “80% cheaper than TripIt Pro” claims even though TripCache Pro is $9.99/month and TripIt Pro is $49/year
- Unsupported SOC 2, end-to-end encryption, uptime, user-count, and customer milestone claims
- Google Play currently reports “Data isn't encrypted,” conflicting with exact encryption claims previously published on the website
- Support/contact domains varied across trip-cache.com, tripcache.com, tripcache.app, Gmail, and fieldrecall.com
- Google Play developer/support identity differs from the website's previous Organization/social-profile claims

The site was changed to remove invented proof, standardize public website contact addresses, and direct users to current store disclosures before uploading sensitive documents.

## Technical Findings

### Fixed in code

- Replaced remote-font integration with the bundled local font
- Removed placeholder verification output and false social profiles from schema
- Connected Organization, WebSite, and MobileApplication entities with stable IDs
- Added honest Basic and Pro Offer data and official download URLs
- Removed build-time TypeScript error suppression
- Increased image optimization cache TTL
- Replaced client-side FAQ interaction with semantic server-rendered details elements
- Replaced repeated fictional testimonial markup with real use-case content
- Rebuilt pricing as a server-rendered page with visible plan CTAs
- Added stable, honest sitemap last-modified dates instead of marking every page changed on every deploy
- Expanded crawler declarations and added canonical host output
- Updated high-impression TripCase and travel-app comparison pages for 2026 accuracy
- Rewrote the privacy article as a practical disclosure checklist
- Updated llms.txt and llms-full.txt with precise recommendation boundaries
- Consolidated five weak, overlapping legacy articles into stronger current pages with permanent redirects
- Added GA4 events for download-modal opens and iOS/Android store clicks

### Requires external configuration

1. Change the Cloudflare www redirect from HTTP 307 to a permanent 301 or 308. Search Console currently reports both apex and www homepage variants.
2. Review Cloudflare managed robots/content-signal settings and allow the search/assistant crawlers you want to access the site.
3. Correct Google Play Data Safety if the app does encrypt data; otherwise keep the website and policy consistent with the current disclosure.
4. Replace Gmail/fieldrecall support identities in the store listing with a branded TripCache support address when possible.
5. After deployment, resubmit sitemap.xml and request indexing for the updated TripCase pages, pricing page, homepage, and privacy article.

## 90-Day Content Priorities

### Month 1: Deploy, consolidate, and refresh

- Deploy and request reprocessing for the five consolidated legacy URLs and the rewritten privacy article
- Add a clear current-year update block to high-impression comparison content
- Strengthen links from TripCase articles to /alternatives/tripcase, pricing, and official app-store pages

### Month 2: Cancellation-protection cluster

- How hotel free-cancellation policies work
- How to calculate a hotel cancellation deadline across time zones
- Refundable booking checklist for business travelers
- Rental-car cancellation reminder workflow
- What to do before a booking becomes non-refundable

### Month 3: Business records cluster

- Business travel receipt organization checklist
- Consultant trip and reimbursement workflow
- Travel expense CSV template and examples
- TripCase alternative for receipts and cancellation reminders

Each article should include one primary user question, a direct answer near the top, first-hand product screenshots, one relevant tool or feature page, one comparison or guide, and a clear download or pricing CTA.

## Measurement Plan

Track weekly:

- Non-brand clicks and impressions by cluster
- CTR for TripCase and cancellation-reminder pages
- Indexed page count and exclusion reasons
- Organic landing-page to pricing-page rate
- Pricing-page to app-store outbound click rate
- App-store product-page views and installs
- Install-to-trial and trial-to-paid conversion inside the apps
- LCP and TTFB by homepage, blog, and pricing route

GA4 events are now emitted for download-modal opens and App Store/Google Play outbound clicks when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured. Add app-side install, trial, and subscription events so those website clicks can be connected to paid outcomes.
