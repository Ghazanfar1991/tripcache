# SEO roadmap

Work top to bottom. `[x]` = done (with date), `[ ]` = to do. Each item that changes the site gets a changelog entry when it ships (`npm run seo:log -- add ...`); its result appears in `CHANGELOG.md` 28 days later. The weekly review ticks boxes, re-orders this list when the data says so, and adds what it learns.

Targets come from `keywords.csv` (one owner page per cluster) and the research in `research/semrush-2026-10/`. Volumes are US monthly searches; KD is Semrush keyword difficulty (0–100; under ~30 is realistic for a site our size).

## Phase 0 — Foundation

- [x] Retire the Codex growth engine; build the `seo/` system and the `aso/` store projects — 2026-10-05 ([PR #32](https://github.com/Ghazanfar1991/tripcache/pull/32))
- [x] Make `www.trip-cache.com` a permanent 308 to `trip-cache.com` (Vercel project domain; it was an expired-cert 307) — 2026-10-05
- [x] Semrush research wave 1: rankings, competitors, 332 keywords, backlinks — 2026-10-05
- [x] Keyword map `keywords.csv`: 61 clusters, one owner page each, 70 keywords marked SKIP — 2026-10-05
- [x] App feature inventory from the app's code: real Basic/Pro split, unmarketed features, claims to avoid (`research/app-feature-inventory.md`) — 2026-10-05
- [ ] Merge PR #32 (owner)
- [ ] Run the **Data feed** workflow once by hand: backfills ~16 months of Search Console history, scores the 15 logged past changes, confirms Google auth
- [ ] Click **Run now** once on both scheduled tasks to approve their tools
- [ ] Semrush research wave 2: SERP winnability, feature long tail, questions, seasonality, outreach targets (trial ends ~2026-10-12)

## Phase 1 — Ship what's built and stop the leaks (weeks 1–2)

- [ ] **Fix plan claims that contradict the app (R8). Owner decision first.**
  - The code gives Basic users cancellation reminders, CSV/PDF export, the same storage, calendar add and image sharing. The pricing, home and features pages sell these as Pro.
  - Either change the site to match (recommended: "free cancellation reminders" is a ranking and conversion advantage), or gate them in the app before claiming it.
  - Also fix "attach receipts to expenses": receipts are stored as documents, not on expenses.
- [ ] **Broken share link.** The app shares `trip-cache.com/shared/{token}`, which returns 404 on the live site. Add a `/shared/[token]` page (noindex) or remove the link option from the app. This is an app-owner decision.
- [ ] **Delete the retired blog source files** that still contain overclaims ("unlimited cloud storage", "secure encryption", "works with ALL airlines"). The URLs already redirect, but the files remain in `content/blog/`.
- [ ] **Ship the finished local work** sitting uncommitted in the owner's checkout, separately from the redesign, each piece logged:
  - [ ] `/tools/flight-arrival-time-calculator` (airport search API, time-zone and layover logic). Targets "flight time calculator" (3,600, KD 31) and "flight time estimator" (1,300, KD 24).
  - [ ] Guide: flight time zones / arrival date
  - [ ] Guide: save travel documents offline (target "digital copy of passport")
  - [ ] Travel checklist and reminder calendar button
  - [ ] `/support` → `/about#support` redirect, visible breadcrumbs, image sitemap, plan-claim corrections
- [ ] **TripCase: one page wins.**
  - Keep `/blog/tripcase-shutdown-what-now`; 308-redirect `/blog/tripcase-alternative-2025` into it.
  - Make `/alternatives/tripcase` a product comparison page that doesn't compete for "tripcase".
  - Rewrite the title and snippet for "tripcase" / "tripcase replacement" (1,300 + 590 "trip case"; UK 720; KD 4–22). Don't target "tripcase login" (R7).
- [ ] **"best travel apps for planning": fix the snippet.**
  - It sits at position ~6 with 493 impressions in 28 days and 0 clicks. 2,900 US and **4,400 AU** searches, KD 53, a SERP full of small blogs.
  - Rewrite the title/meta and refresh the list. Keep the URL (R4).
- [ ] **TripIt: one page wins.**
  - Owner: `/blog/best-tripit-alternatives-2026` (position ~12). Merge `/blog/tripit-alternative-cancellation-reminders-documents-2026` into it with a redirect.
  - Keep `/alternatives/tripit` as the product page.
- [ ] **"tripit pro"** (1,900, KD 33, plus "what is tripit pro", cost, free vs pro): re-aim `/blog/tripit-vs-tripcache-comparison-2025` at those questions.
- [ ] **Travel document app terms** (positions 14–18): strengthen `/blog/best-travel-document-organizer-app-2026`.
- [ ] **Indexing gate (R6).** For each page in the nightly "not indexed" list, decide: improve, merge into its cluster owner (with a redirect), or remove.
- [ ] **Stray URLs** with impressions (`/blog/best-travel-5d5d2b`, `/blog/best-travel-id-2025`): find the source; redirect if they resolve.

## Phase 2 — Win low-competition pages (weeks 3–8)

New pages only while the indexing gate is green. One or two per week, each logged.

- [ ] `/templates/travel-itinerary-google-docs`: "google docs itinerary template" variants, ~6,700 combined, KD 17–20. Needs a real, copyable Google Doc.
- [ ] `/templates/travel-itinerary-google-sheets`: ~2,000 combined, KD 10–14. Needs a real, copyable Google Sheet.
- [ ] Upgrade `/blog/travel-itinerary-template-2026` into the template hub linking both. "travel itinerary template" has 90,500 searches at KD 41; the year is in the URL, but keep it (R4).
- [ ] `/compare/wanderlog-vs-tripit`: 4,400, KD 22, a top 10 of forums and tiny blogs. A three-way comparison with TripCache.
- [ ] `/guides/hotel-cancellation-policies`: 1,000 plus variants, KD 17. Embed the existing deadline calculator.
- [ ] `/alternatives/wanderlog`: "wanderlog reviews" 12,100, "wanderlog pro cost" 6,600, KD 20–33.
- [ ] `/alternatives/app-in-the-air`: 590, KD 12; a shut-down app, same play as TripCase.
- [ ] **Market the features nobody else talks about** (volumes in `research/semrush-2026-10/wave2/feature-keywords.csv`): visa/immigration travel-history export, free cancellation-deadline reminders, boarding-pass scanning, free check-in reminders, multi-currency trip budgets, Android flight widget. Each gets a section on `/features` and, where the search volume justifies it, its own page.

## Phase 3 — Scale what works (month 3+)

Only after Phase 2 pages are indexed and the changelog shows what works.

- [ ] Brand cancellation-policy pages, `/guides/cancellation-policy/{brand}`: Airbnb 6,600, Booking.com 2,900, Vrbo 2,400, Enterprise 2,400, Marriott 1,600, Hertz 1,300, Hilton 1,000; KD 33–50. Each sells the reminder feature. Build them as a template, with sources checked per brand.
- [ ] `/tools/jet-lag-calculator`: 1,000, KD 22
- [ ] `/blog/what-is-a-travel-itinerary`: ~4,700 combined, KD 29–50
- [ ] `/blog/find-itinerary-without-confirmation-email`: 720 US + 480 UK, KD 35–44
- [ ] `/business-travel` and `/templates/travel-expense-report`: KD 17–24
- [ ] Airport tips (how early to arrive, missed flight, standby, power banks): P3, only if earlier informational pages produce store clicks

## Backlinks (ongoing)

TripCache's Authority Score is 8. The only real links are the App Store, Product Hunt and dataforseo; the rest are spam.

- [ ] Send the ready pitches in `backlinks.json` from the owner's email: Tom's Guide, The Points Guy, Travel + Leisure, Marie Claire, a business-travel guide.
- [ ] Directory and profile listings: AlternativeTo (submitted, pending), SaaSHub, JustUseApp, Crunchbase, Product Hunt refresh.
- [ ] Ask the small blogs ranking for "best travel apps for planning" and "tripit alternatives" to include TripCache (list in `research/semrush-2026-10/backlink-targets.csv`).

## Not doing (and why)

These are recorded so nobody re-proposes them without new evidence.

- **Navigational searches for other products** ("tripcase login", "tripit login", "wanderlog", "flighty"): they want that product, not us (R7).
- **Head terms** ("itinerary", "trip planner", "travel planner", KD 60–82): Wanderlog and TripIt own them. Revisit when the Authority Score is above ~25.
- **Wrong intent:**
  - "travel organizer" and "travel document organizer" (physical products)
  - immigration "travel document" forms
  - "free cancellation hotels" (booking intent)
  - flight-tracker apps
  - B2B expense software
  - event itinerary templates
- **"email to itinerary" phrases:** 0–30 searches a month. Keep them as conversion copy, not as SEO targets.
