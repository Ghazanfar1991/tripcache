# SEO roadmap

Work top to bottom. `[x]` = done (with date), `[ ]` = to do (with a target date). Each item that changes the site gets a changelog entry when it ships (`npm run seo:log -- add ...`); its result appears in `CHANGELOG.md` 28 days later. The weekly review ticks boxes, re-orders this list when the data says so, and adds what it learns.

Targets come from `keywords.csv` (one owner page per cluster, with a `winnability` verdict and `peak_months`) and the research in `research/`. Volumes are US monthly searches; KD is Semrush keyword difficulty (0–100; under ~30 is realistic for a site our size). Dates are the latest sensible publish dates: pages need a few weeks to be indexed and climb before the seasonal peak.

## Phase 0 — Foundation (done 2026-10-05, except owner steps)

- [x] Retire the Codex growth engine; build the `seo/` system and the `aso/` store projects ([PR #32](https://github.com/Ghazanfar1991/tripcache/pull/32)) — 2026-10-05
- [x] Make `www.trip-cache.com` a permanent 308 to `trip-cache.com` (Vercel project domain; it was an expired-cert 307) — 2026-10-05
- [x] Semrush research wave 1: rankings, competitors, 332 keywords, backlinks — 2026-10-05
- [x] App feature inventory from the app's code: real Basic/Pro split, unmarketed features, claims to avoid (`research/app-feature-inventory.md`) — 2026-10-05
- [x] Semrush research wave 2: results-page winnability for 52 keywords, feature long tail, seasonality, small-site peers, outreach targets — 2026-10-05. **The trial's API units ran out (balance zero), so Semrush research is closed.** Everything is saved in `research/semrush-2026-10/`; ongoing tracking uses Search Console.
- [x] Keyword map `keywords.csv`: 358 keywords, 74 clusters, one owner page each, 82 marked SKIP with reasons — 2026-10-05
- [x] Merge PR #32 (owner) — **done 2026-10-05** (merged after CI)
- [x] Run the **Data feed** workflow once by hand: backfills ~16 months of Search Console history, scores the 15 logged past changes, confirms Google auth — **done 2026-10-05** (history backfilled from 2025-11-19; 15 changes scored; lessons written)
- [ ] Click **Run now** once on both scheduled tasks to approve their tools

## Phase 1 — Ship what's built and stop the leaks (by 2026-10-19)

- [x] **Fix plan claims that contradict the app (R8). Owner decision first.** — **done 2026-10-05** (PR #34 matched site to the app; #40 fixed /about, manifest and the homepage)
  - The code gives Basic users cancellation reminders, CSV/PDF export, the same storage, calendar add and image sharing. The pricing, home and features pages sell these as Pro.
  - Either change the site to match (recommended: "free cancellation reminders" is a ranking and conversion advantage), or gate them in the app before claiming it.
  - Also fix "attach receipts to expenses": receipts are stored as documents, not on expenses.
- [x] **Ship the finished local work** sitting uncommitted in the owner's checkout, separately from the redesign. Each piece gets logged and registered. — **done 2026-10-05** (PR #41 shipped the tools and guides on the live design; the redesign itself followed in its own PR)
  - [x] `/tools/flight-arrival-time-calculator`: "flight time calculator" 3,600 (KD 31), "flight time estimator" 1,300 (KD 24), "arrival time calculator" 170. Small tool sites hold the top 10. Searches peak Jun–Jul. — **done 2026-10-05** (PR #41)
  - [x] `/tools/jet-lag-calculator`: 1,000 (KD 22); a site with Authority Score 2 sits at #10. — **done 2026-10-05** (PR #41)
  - [x] `/tools/layover-calculator`, travel checklist, reminder calendar button — **done 2026-10-05** (PR #41)
  - [x] Guide: flight time zones / arrival date — **done 2026-10-05** (PR #41)
  - [x] Guide: save travel documents offline (target "digital copy of passport", 170) — **done 2026-10-05** (PR #41)
  - [x] `/support` → `/about#support` redirect, visible breadcrumbs, image sitemap — **done 2026-10-05** (redirect in #41; breadcrumbs and image sitemap came with the redesign)
- [x] **TripCase: one page wins.** — **done 2026-10-05** (PR #36)
  - Keep `/blog/tripcase-shutdown-what-now`; 308-redirect `/blog/tripcase-alternative-2025` into it.
  - Make `/alternatives/tripcase` a product comparison page that doesn't compete for "tripcase".
  - Rewrite the title and snippet for "tripcase" (1,300, KD 16, now position 7.5) and "tripcase alternative" (170, KD 4, five weak slots). Don't target "tripcase login" (R7).
  - Demand is falling (about 600/month by May 2026), so do this first.
- [x] **"best travel apps for planning": fix the snippet.** Position ~6, 0 clicks in 28 days; 2,900 US and 4,400 AU searches; small blogs (Authority Score 12–22) hold #1–4. Rewrite the title/meta and refresh the list before the Jun–Aug peak. Keep the URL (R4). — **done 2026-10-05** (PR #36 retitled to 8 picks; #40 added concrete prices and sources)
- [x] **TripIt: one page wins.** — **done 2026-10-05** (PR #36)
  - Owner: `/blog/best-tripit-alternatives-2026` ("tripit alternative" KD 3, five weak slots).
  - Merge `/blog/tripit-alternative-cancellation-reminders-documents-2026` into it with a redirect. Keep `/alternatives/tripit` as the product page.
- [x] **"tripit pro"** (1,900, KD 33; "tripit pro cost" 170, KD 27 with an Authority Score 18 site at #3): re-aim `/blog/tripit-vs-tripcache-comparison-2025` at those questions. Interest peaks Jun–Sep. — **done 2026-10-05** (PR #36)
- [x] **Travel document app terms** (positions 14–18): strengthen `/blog/best-travel-document-organizer-app-2026`. — **done 2026-10-05** (PR #36)
- [ ] **Broken share link.** The app shares `trip-cache.com/shared/{token}`, which returns 404. Add a `/shared/[token]` page (noindex) or remove the link option from the app. This is an app-owner decision.
- [x] **Delete the retired blog source files** that still contain overclaims ("unlimited cloud storage", "secure encryption", "works with ALL airlines"). The URLs already redirect, but the files remain in `content/blog/`. — **done 2026-10-05** (PR #34 deleted six)
- [x] **Search Console:** requested indexing for `/tools`, the hotel calculator and the three new guides, and resubmitted the sitemap (46 URLs) — **done 2026-10-05**. The daily quota ran out after 5 requests.
- [ ] **Search Console, next days (about 5 a day):** `/tools/flight-arrival-time-calculator`, `/blog/travel-itinerary-template-2026`, `/tools/jet-lag-calculator`, `/tools/layover-calculator`, `/tools/travel-checklist`, `/blog/flight-time-zones-arrival-date`, `/blog/save-travel-documents-offline`, `/` and `/pricing` (both redesigned).
- [x] **Cloudflare** — **done 2026-10-05**:
  - The AI bot policy's Training category moved from Disallow to Allow, so GPTBot, ClaudeBot, Claude-User, CCBot, Meta and Amazonbot get 200 instead of 403.
  - Email Address Obfuscation is off.
  - The managed ruleset still blocks attack probes.
- [ ] **Store price parity:** the App Store yearly price is $50.00, Google Play's is $49.99. Align them in App Store Connect, or keep stating both.
- [x] **Instagram confirmed by the owner** and linked in the footer, on /about and in llms.txt — **done 2026-10-05**.
- [ ] Add any real X, LinkedIn or YouTube profiles to the footer and `sameAs` when they exist.
- [ ] **Re-check Tripsy's price** in older posts: "$39.99/yr in the US App Store" vs $59/yr on tripsy.app.
- [x] **Homepage meta description** still implies email import is free; make it say Pro or lead with the free features. — **done 2026-10-06** (weekly PR; now leads with the free features and says email forwarding is Pro)
- [ ] **Indexing gate (R6).** For each page in the nightly "not indexed" list, decide: improve, merge into its cluster owner (with a redirect), or remove.
- [x] **Stray URLs** with impressions (`/blog/best-travel-5d5d2b`, `/blog/best-travel-id-2025`): find the source; redirect if they resolve. — **checked 2026-10-06, no action:** neither was ever published (not in the registry, no source in the repo or its history), each had 1 impression on one day in September, and both correctly return 404. Re-open only if they gain impressions.

## Phase 2 — Win low-competition pages (2026-10-19 → 2026-11-30)

New pages only while the indexing gate is green. One or two a week, each logged.

_2026-10-06 review: the gate is red (12 of 39 sitemap URLs not indexed, 31%), and every page is inside a 28-day window from the 2026-10-05 changes until about 2026-11-02. Hold new pages and page edits until then; the next useful work is indexing requests and the R6 decisions above._

- [x] **By 2026-11-07: `/guides/hotel-cancellation-policies`.** — **done 2026-10-05** (published early as /blog/hotel-cancellation-policies, PR #39)
  - "hotel cancellation policy" 1,000 (KD 17), plus "cancelation policy hotel" 480, "hotel cancellation fee" 260, "can you cancel hotel reservations" 210 (five Reddit/Quora slots).
  - Embed the deadline calculator, and add short sections for the brands where small sites can rank: Holiday Inn/IHG, Disney, Choice, Drury, Vrbo, Hilton.
  - Searches peak in **December**.
- [x] **By 2026-11-21: `/guides/how-to-find-your-travel-history`.** — **done 2026-10-05** (published as /blog/how-to-find-your-travel-history, PR #39)
  - "i-94 travel history" 4,400 (KD 34), "the us document that shows your travel history" 320, "how to check my passport travel history" 210, "travel history google maps" 110.
  - Sell the app's free Visa / Immigration Summary export. No other app targets this.
- [x] **By 2026-11-30: `/compare/wanderlog-vs-tripit`.** — **done 2026-10-05** (published as /blog/wanderlog-vs-tripit, PR #39)
  - 4,400 average (realistically 500–2,400), KD 22, eight weak slots.
  - A three-way comparison with TripCache. Include Wanderlog pricing and reviews as sections; those searches are one-month spikes and don't justify their own page.
- [ ] `/alternatives/app-in-the-air`: 590, KD 12, five weak slots; a shut-down app, same play as TripCase.
- [ ] `/business-travel`: "business travel app" 260 (KD 17; an Authority Score 18 site at #4), "corporate travel app" 140, "best business travel apps" 110.

## Phase 3 — Templates and scale (2026-12 → 2027-03; templates live before the summer peak)

- [ ] **By 2027-02-28: `/templates/travel-itinerary-google-sheets`** (1,300, KD 14; tripstone.app, Authority Score 11, ranks #2) **and `/templates/travel-itinerary-google-docs`** (~3,800, KD 18–20). Each needs a real, copyable file. Peak: July.
- [ ] **By 2027-03-15:** upgrade `/blog/travel-itinerary-template-2026` into the template hub.
  - Add an Excel (.xlsx) version: "travel itinerary template excel" 1,300, KD 25, and an Authority Score 26 blog is #1.
  - Link the Docs and Sheets pages. "travel itinerary template" has 90,500 searches and is rising; keep the year-stamped URL (R4).
- [ ] `/templates/travel-expense-report` and "travel expense report" on `/features/business-travel-expenses` (320, KD 17; template 260, KD 24)
- [ ] `/blog/what-is-a-travel-itinerary`: 1,600 (KD 36; an Authority Score 11 site at #5), rising
- [ ] `/blog/find-itinerary-without-confirmation-email`: 720 US + 480 UK, KD 44
- [ ] `/guides/car-rental-cancellation-policies` (Enterprise 2,400, Hertz 1,300): only if the hotel hub ranks
- [x] Market the smaller unmarketed features on `/features`: boarding-pass scanning, free check-in reminders, multi-currency trip budgets ("trip budget app" 140), trip countdown (110), Android flight widget. These searches are too small for their own pages. — **done 2026-10-05** (PR #40 put all 13 features, labelled Free or Pro, on /features)

## Answer engines and agents (ongoing)

- [x] `llms.txt` / `llms-full.txt` complete, declarative, with platforms and limits — **done 2026-10-05**
- [x] Entity JSON-LD (Organization `sameAs`, editorial team, tier-tagged app offers), /pricing table + FAQ, /features list, homepage definition — **done 2026-10-05** (PR #40)
- [x] `robots.txt` allows `/api/airports` for the calculators — **done 2026-10-05** (PR #38)
- [ ] A 60–90 second screen recording of real flows (free reminder, Pro draft review, visa summary export) on YouTube, embedded on `/` and `/features/cancellation-reminders` with VideoObject. Video mentions correlate strongly with AI citations.
- [ ] A named human author or reviewer for guides, but only a real person (founder), with a profile page.
- [ ] `lib/plans.ts` single source for plans and prices, feeding pricing, JSON-LD, manifest and llms files, so claims can't drift again (R8).
- [ ] Optional: Markdown versions of blog posts for agents (`Accept: text/markdown`). No agent is confirmed to use it yet.

## Backlinks (ongoing)

TripCache's Authority Score is 8; the only real links are the App Store, Product Hunt and dataforseo.

- [ ] Send the ready pitches in `backlinks.json` from the owner's email: Tom's Guide, The Points Guy, Travel + Leisure, Marie Claire, a business-travel guide.
- [ ] Ask the small blogs ranking for our target lists to include TripCache. From `research/semrush-2026-10/wave2/outreach-targets.csv`:
  - suewherewhywhat.com (AS 37), directiveadventure.com (22, top 10 on 6 of our results pages), wanderingkenzie.com (12), apurplelife.com (30), effectiveretailleader.com (30)
  - wanderfullyrylie.com (15), wanderingnomada.com (14), thatanxioustraveller.com (32), whistleout.com (51), worldtraveller73.com (21)
- [ ] Directory and profile listings: AlternativeTo (submitted, pending), SaaSHub, JustUseApp, Crunchbase, Product Hunt refresh.
- [ ] The free tools and templates are the most linkable assets; pitch them to travel newsletters once they're live.

## Not doing (and why)

These are recorded so nobody re-proposes them without new evidence.

- **Navigational searches for other products** ("tripcase login", "tripit login", "wanderlog", "flighty"): they want that product, not us (R7).
- **Head terms** ("itinerary", "trip planner", "travel planner", KD 60–82): Wanderlog and TripIt own them. Revisit when the Authority Score is above ~25.
- **Per-brand cancellation pages for Airbnb, Booking.com, Expedia, Marriott:** the brands hold their own results pages (wave 2: NOT_YET, 0–2 weak slots). They're covered as hub sections where possible.
- **Per diem and travel-expense tax queries:** government and tax results pages with no weak slots.
- **A standalone Wanderlog pricing page:** that volume is one-month spikes.
- **"best organization apps" / "best road trip apps":** general productivity or partly off-topic, and spiky (they explain the GSC positions 3–4).
- **Wrong intent:**
  - "travel organizer" and "travel document organizer" (physical products)
  - immigration "travel document" forms
  - "free cancellation hotels" (booking intent)
  - flight-tracker apps
  - B2B expense software
  - event itinerary templates
- **Feature phrasings with no search volume** ("forward confirmation email", "cancellation deadline reminder", "scan boarding pass", "check-in reminder app"): keep them as conversion copy, not SEO targets.
