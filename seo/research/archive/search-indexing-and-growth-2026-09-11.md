# TripCache search and acquisition audit — 11 September 2026

Observed directly in the signed-in Chrome profile: Google Search Console for trip-cache.com, Google Play Console for app.tripcache, and Vercel Analytics/Speed Insights. Public site/store checks and local production-build checks are separate evidence sources.

## Conclusion

The website is partially indexed and the Play listing is live. There is no verified site-wide crawling block or Play policy block. The largest observed gaps are Google's deferred crawling of 16 known URLs, low Google Search click-through, and very small Play listing reach. Google does not disclose the precise reason it has deferred each page; weak crawl priority or content differentiation remain hypotheses, not confirmed diagnoses.

Changes in this checkout are prepared and tested locally. They have not been committed, pushed, deployed, or published to Google Play. One existing live page was submitted for indexing and Google confirmed it entered the priority crawl queue.

## Google Search: current evidence

Search performance, Web, **12 August–8 September 2026**:

| Metric | Value shown |
| --- | ---: |
| Clicks | 69 |
| Impressions | 11.4K (rounded in Console) |
| CTR | 0.6% |
| Average position | 10.4 |

The three-month view (9 June–8 September) showed 175 clicks, 23.4K impressions, 0.7% CTR and average position 10.8. These windows overlap; do not treat their totals as a growth comparison.

| Page | Clicks | Impressions | Calculated CTR |
| --- | ---: | ---: | ---: |
| Home | 19 | 687 | 2.77% |
| TripCase shutdown guide | 16 | 2,433 | 0.66% |
| Best travel apps (stable 2025 URL) | 15 | 5,106 | 0.29% |
| TripCase alternative | 6 | 1,158 | 0.52% |
| AI travel organizer | 3 | 312 | 0.96% |
| Best TripIt alternatives | 2 | 332 | 0.60% |
| Hotel cancellation reminder guide | 2 | 256 | 0.78% |
| Cancellation-reminder feature | 2 | 39 | 5.13% |
| Organize confirmation emails | 1 | 404 | 0.25% |
| TripIt comparison | 1 | 317 | 0.32% |

Top-query examples: “tripcache” 10 clicks/23 impressions; “tripcase” 5/1,032; “wanderlog reviews” 0/703; “best travel apps for planning” 0/368. This suggests some visibility comes from broad or competitor intent. Query totals are incomplete because Search Console omits some queries; do not sum them to reconstruct site totals.

### Indexing report (last updated 4 September)

| State | URLs | Interpretation |
| --- | ---: | --- |
| Indexed | 23 | Already eligible to appear in Search |
| Discovered, currently not indexed | 16 | Main crawl coverage gap; report shows no recorded crawl |
| Crawled, currently not indexed | 4 | Old article URLs now permanently redirected |
| Page with redirect | 6 | Usually expected; canonical destinations matter |
| Not found (404) | 2 | One useful legacy support URL and one Cloudflare utility URL |
| Alternate with proper canonical | 1 | Usually expected duplicate handling |

The four crawled-but-not-indexed examples are:
- /blog/how-to-automatically-track-flights-2025 — last crawl 22 July.
- /blog/travel-document-organization-guide-2025 — 9 July.
- /blog/travel-expense-tracking — 20 June.
- /blog/digital-nomad-organization — 19 May.

These now return 308 redirects to current guides. The failed validation ran 16–25 July, predating current fixes. Do not recreate or request indexing for the retired aliases merely to reduce the excluded total.

The 16 discovered URLs are /account-delete, /alternatives, /features/email-to-itinerary, /tools, /tools/hotel-cancellation-deadline-calculator and these blog slugs:
- ai-trip-planner-2026
- business-travel-management-guide-2026
- email-to-trip-automation
- flighty-vs-tripcache-2026
- free-cancellation-reminder-travel-bookings-2026
- google-travel-alternative-2026
- rental-car-cancellation-reminder-app-2026
- travel-booking-organizer-app-2026
- travel-itinerary-template-2026
- trip-map-itinerary-planner-app-2026
- tripit-alternative-cancellation-reminders-documents-2026

The sitemap was submitted 17 August, last read 2 September, status **Success**, 39 discovered pages. It is already known to Google; repeated resubmission is not a substitute for useful content or crawl eligibility.

### Actual Google live test and action

Inspected https://trip-cache.com/features/email-to-itinerary:
- Stored status: discovered, currently not indexed; referring pages /blog and /sitemap.xml.
- Live test: **11 September, 14:26:07 Australia/Sydney**.
- Google Inspection Tool smartphone: crawl allowed **Yes**, fetch **Successful**, indexing allowed **Yes**.
- Declared canonical matches the page; one valid breadcrumb item.
- Google said “URL is available to Google.”
- Clicked Request indexing; Google confirmed “Indexing requested” and priority crawl queue.

This verifies this live page's accessibility to Google's actual inspection tool. It neither guarantees indexing nor proves every historical crawl succeeded. Google states that recrawling can take days to weeks and repeated requests do not accelerate it. [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

### 404 findings

/support was reported last crawled 26 May. Prepared a 308 redirect to /about#support, which contains the real support email. Verified query preservation and the contact anchor.

/cdn-cgi/l/email-protection was reported last crawled 21 August. This is a Cloudflare utility path, not a content page or sitemap URL. It should not be turned into a thin content page or redirected to the homepage to clear a report. Check obfuscated-email crawl links if this grows. Google's guidance prioritizes broken URLs in your own links/sitemap and moved pages with a genuine replacement. [Page indexing guidance](https://support.google.com/webmasters/answer/7440203)

## Live website technical audit

All 39 existing sitemap URLs returned HTTP 200 with readable server-rendered content, unique titles/descriptions, self-canonicals and indexable metadata. No orphan sitemap pages or broken internal article URLs were found in that crawl. Unknown routes correctly return 404.

https://www.trip-cache.com/blog returns **307** to the apex despite the repository's intended 308. This is an upstream edge/domain setting. Vercel's visible domain list showed the apex domain with “Proxy Detected”; the responsible www rule was not located or changed. Inspect the Cloudflare/Vercel domain redirect configuration and set a permanent 308 while preserving paths and queries. This is a canonical-consistency improvement, not the proven cause of all deferred indexing.

A Python default user agent received 403 while ordinary curl and tested crawler strings returned 200. The actual Google live test succeeded. Do not disable security protections or conclude Googlebot is blocked from the Python response alone.

## Visitors and speed

Vercel production Analytics, displayed window **4 September 14:00–11 September 14:59**:
- 73 visitors, 119 page views, 75% bounce rate.
- Dashboard comparisons: visitors −33%, page views −30%, bounce +3%.
- Google referrer: 20 visitors; DuckDuckGo: 6.
- Desktop 75%, mobile 25%; Android 14%, iOS 11%.
- Main page 31 visitors; shutdown guide 8; document-organizer guide 6.
- Vercel custom-event reporting unavailable on the current plan. Existing GA4 code measures download/store clicks; no paid upgrade is needed for this audit.

Vercel Speed Insights for the same selected 7-day range:

| Device | RES | LCP | INP | CLS | Event count shown |
| --- | ---: | ---: | ---: | ---: | ---: |
| Desktop | 100 | 1.37s | 48ms | 0.01 | 70 |
| Mobile | 99 | 1.85s | 80ms | 0 | 30 |

Small samples, and event counts are not unique visitors or Search Console Core Web Vitals validation. They provide no evidence that a site-wide speed problem is currently the primary acquisition constraint. The desktop calculator route showed RES 55 with only 3 events, so investigate if poor experiences persist with more evidence. Do not infer app installs from page visits or bounce rate.

## Play Store findings and next actions

The public app listing is live, updated 5 September, showing 50+ downloads. Authenticated Console reports no policy issues. The Grow users device view displayed 288 impressions, 11 acquisitions and 7 first opens for its selected last 28 days. Current crash/ANR/slow-start rates are **unavailable**, not zero; old crash snapshots are not current evidence.

The detailed listing report explicitly covered **8 August–4 September**, before the latest listing update: 19 visitors, 9 unique install-button clicks, 47% CTR. The default listing row showed 17 visitors/52.9%. These are click metrics, not completed installs. At this volume, another immediate rewrite or many simultaneous experiments would be difficult to evaluate.

Current Play says cancellation reminders are included in Basic; the website said they were paid-only. Local corrections remove that unsupported paid-only claim and refer travelers to current in-app plan availability. Prices and actual product entitlements are unchanged. Some older article plan tables still need reconciliation with a verified released-app entitlement matrix before a broader content refresh.

The public Data safety label says “Data isn't encrypted.” Treat this as a disclosure/implementation question for the app owner to verify against all transmitted data and SDKs; do not claim a security defect from the label alone, or change a declaration just for conversion.

See [the detailed ASO report](google-play-aso-2026-09-11.md) for primary Play sources, exact proposed copy, competitor positioning, six-screenshot narrative and experiment design. Lead with the booking-email-to-itinerary workflow, use real app screens, and measure listing visits → install-button clicks → acquisitions → first opens → useful trip creation as separate stages.

## Implemented locally

- Two sourced practical guides: flight time zones/arrival dates and offline document preparation.
- Two generated editorial hero images, optimized as WebP; no fake app screenshots. Final prompts and asset details in [image provenance](blog-images-2026-09-11.json).
- Five task-based guide collections and direct contextual links in /blog.
- Visible breadcrumb navigation on feature/comparison pages, matching existing structured data.
- Image sitemap entries; 41 canonical pages and 30 image entries after additions.
- More accurate plan language on home, pricing, About, reminder and comparison landing pages.
- Permanent /support redirect to the real contact section.
- Accurate modification dates for changed pages.
- Excluded generated, Git-ignored growth review artifacts from ESLint scanning; no application checks were disabled.

Pre-existing edits in the article template, markdown renderer, secondary CSS and orchestrator state were preserved. Active experiment article bodies/titles were not rewritten. Their recorded decision gate is 12 September; historical mixed-treatment windows must not be declared winners.

## Verification and content review

- Production build and TypeScript passed.
- Existing 22 tests and growth-memory validation passed.
- Full ESLint passed with 0 errors and 7 existing warnings in unrelated components/hooks.
- All 41 local production sitemap pages passed the technical health checks; 163 JSON-LD blocks parsed.
- New guide links and 8 primary sources checked, with GET fallback where support sites reject HEAD.
- Actual site visually reviewed in Chrome at 375/768/1280 widths; mobile tables/cards readable, no observed horizontal overflow or visible broken images.
- Independent editorial reviews: 95/100 for each guide, no P0/P1 findings. These are internal readiness scores, not ranking predictions.
- Source, HTML, PDF, images, reviews and screenshots saved under .growth-runtime/blog-review-2026-09-11/.
- The installed blog helper has a reviewer-path discovery defect and Python renderer dependency mismatch. Its unmodified full strict run did not pass; artifact-completeness and independent-review gates passed, with equivalent bundled rendering/CUA checks documented separately. No verification result was silently bypassed.

## Prioritized rollout and measurement

The existing growth dispatcher is waking, but its weekly, midweek and monthly jobs all report **WAITING_FOR_CLEAN_WORKTREE**. Their most recent recorded attempts were 10 September. The checkout already had uncommitted article-rendering/CSS edits before this audit, and these were preserved. This explains why the scheduled content work is not progressing; it is separate from Google's indexing decisions. Latest saved collector evidence is dated 29 August and must not be presented as current. Resolve and publish reviewed working changes before resuming the existing jobs; do not remove the clean-checkout safeguard or discard the owner's edits. No schedules or dispatcher state were changed by this task.

1. Deploy the reviewed website changes, then verify production pages, new images, canonical URLs, /support and sitemap. The local package has not been deployed by this task.
2. Fix the upstream www 307 rule to permanent 308 at its actual owner. Preserve apex, path and query behavior.
3. Once deployed, request indexing only for a small set of important eligible canonical pages: new guides, the calculator, itinerary template and another distinctive guide. The email feature request is already submitted. Track actual index state weekly instead of chasing zero exclusions.
4. Reconcile released Basic/Pro availability and the Data safety declaration against app implementation. Update older comparisons accurately; do not alter legal/security declarations or entitlements on assumption.
5. After the recorded experiment gate, refresh the highest-impression existing pages first. On best-travel-apps, examine the query→page breakdown for planning vs review vs itinerary intent; improve the opening answer, comparison criteria and relevant title without renaming the stable URL solely to change its year.
6. Build contextual links from established relevant guides to these practical guides when those pages are eligible for edits. Add a next article only when a distinct reader problem and primary-source evidence justify it; favor practical examples or a useful template over another near-identical app list.
7. Keep one measurable Play listing change at a time. At 19 visitors per displayed window, retain a stable baseline long enough for evidence; do not call small fluctuations a ranking win. Improve qualified traffic and first useful-trip activation alongside listing presentation.
8. Recheck GSC coverage, page/query CTR and GA4 store-intent by page after a meaningful post-deployment window. Keep GSC clicks, Vercel visitors, Play clicks and completed acquisitions distinct and label their dates.

No fixed ranking or user-growth outcome is guaranteed. These changes improve eligibility, discoverability, usefulness and consistency; Google and Play ultimately decide visibility based on broader signals.
