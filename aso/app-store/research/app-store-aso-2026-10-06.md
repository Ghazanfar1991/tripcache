# TripCache App Store (iOS) ASO review

Reviewed 2026-10-06 from the signed-in App Store Connect account (app 6758403056), public App Store data and the app's source code. Nothing on the store was changed. Ready-to-paste copy: [`../listing/proposed-2026-10.md`](../listing/proposed-2026-10.md). Keyword map: [`../keywords.csv`](../keywords.csv). Raw keyword measurements: [`keyword-data-2026-10-06.csv`](keyword-data-2026-10-06.csv).

## Summary

TripCache gets found by very few people, not turned away by the people who find it. In the last 90 days, 1,126 search-result impressions became 103 product-page views and 41 downloads. About 40% of page views become a download, which is healthy. The problems are:

1. **No ratings at all**, in any storefront. Competitors in the top 10 typically have 5,000–60,000. That hurts both ranking and the tap from search results.
2. **Weak keyword coverage.** The word "travel" isn't in any indexed field, US users get Australian spelling, and the only localization is en-AU, so three extra keyword slots indexed in the US, AU and UK go unused.
3. **Screenshots** bury the two strongest features at positions 8 and 9. Several frames also show Android status bars or garbled AI-generated text.

The September 7 release (new name "TripCache: Itinerary Planner" and new keywords) is the one clear win so far. Impressions per day rose about 3.3× after it shipped, so keep the name and build on it.

## 1. Current performance (App Store Connect analytics)

90 days, 2026-07-04 to 2026-10-01:

| Metric | Value |
| --- | ---: |
| Impressions | 1,126 (865 unique devices) |
| Product page views | 103 (75 unique) |
| First-time downloads | 41 |
| Impression → page view | 9.1% |
| Page view → download | ~40% |

By source: App Store Search accounts for **1,085 of 1,126 impressions (96%)** and 24 of 41 downloads. App Referrer gives 10 downloads, the web 3, Browse 2. By storefront (impressions): US 629, China mainland 95, Canada 53, Australia 47, Indonesia 45, Philippines 37, UK 36, India 31. By device: iPhone 908, iPad 175, Mac 43.

Before vs after the 2026-09-07 release (v1.4.0, new name and keywords):

| Window | Days | Impressions | Per day | Page views | Downloads |
| --- | ---: | ---: | ---: | ---: | ---: |
| Aug 7 – Sep 6 | 31 | 263 | 8.5 | 26 | 11 |
| Sep 7 – Oct 1 | 25 | 709 | 28.4 | 54 | 18 |

Weekly impressions were 14–95 from June to August, then 111, 379, 123 and 192 in the four weeks from September 7. Tap-through slipped from 9.9% to 7.6%, as expected when an app starts showing for broader searches with no ratings. Treat this as directional: the sample is small and the release also changed the app.

Account facts: **0 ratings and 0 reviews** in the US, AU and UK. No custom product pages, in-app events, product page optimization tests or App Store tags. Two subscriptions (Premium Monthly and Yearly); App Store Connect returned no introductory offer, so check whether iOS has a free trial.

## 2. Where TripCache ranks

Public App Store search API, top 50 results per term, US and AU, measured 2026-10-06 (full table in `keyword-data-2026-10-06.csv`). The API approximates on-device results; it isn't identical.

- TripCache ranks in the top 50 for only three of 69 terms checked: **trip itinerary (#12 US)**, **trip organiser (#34 US)** and **vacation planner (#34 US)**.
- It's outside the top 50 even for "itinerary planner", its own name, in both the US and AU. With zero ratings, Apple ranks every established app above it. More metadata alone won't fix that; ratings come first (section 4).
- The impressions come from long-tail and partial matches, where TripCache appears lower down the list.
- **Another developer's app outranks TripCache for its own brand.** A search for "tripcache" in the US and AU App Store returns **"TripCache for Travel Expenses"** (app 6758454461, subtitle "Track spending, stay on budget", 2–3 ratings) at #1 and TripCache at #2; "trip cache" puts TripCache at #1. Its app ID is next to ours, so it launched about the same time. Rated apps win close calls: once TripCache has ratings it should retake #1. If you hold rights to the TripCache name, Apple's [App Store content dispute form](https://www.apple.com/legal/internet-services/itunes/appstorenotices/) is the route; that's a legal decision, not an ASO one.
- Long-tail spot checks (US, top 200): cancellation deadline #13 (AU #26), itinerary planner trip organiser #19, itinerary organizer #53, trip organiser flight alerts #56, trip organizer app #95. In AU, none of the longer phrases put TripCache in the top 200.

### Demand (App Store autocomplete)

Apple's autocomplete was the popularity signal: the fewer letters someone types before a term is suggested, the more it's searched. Results are reliable for head terms in all four markets. Long-tail checks hit Apple's rate limit (HTTP 429), so long-tail popularity is still unmeasured. Apple Ads popularity scores would fill that gap (section 7).

| Term | US | AU | UK | CA |
| --- | --- | --- | --- | --- |
| itinerary planner | 3 letters, #2 | 2 letters, #6 | 3, #3 | 4, #1 |
| itinerary | 3, #9 | not suggested | 3, #10 | 3, #10 |
| trip planner | 5, #3 | 6, #2 | 4, #7 | 4, #7 |
| trip organizer | 6, #1 | not suggested | not suggested | 6, #1 |
| trip itinerary | 6, #3 | 6, #2 | 6, #2 | 6, #2 |
| travel planner | 7, #4 | 7, #2 | 7, #5 | 8, #1 |
| itinerary maker | 4, #6 | not suggested | — | — |
| travel itinerary | 8, #9 | 8, #2 | 8, #1 | 8, #2 |
| travel organizer | 8, #4 | not suggested | — | — |

AU autocomplete also suggests "holiday itinerary" and "checkmytrip – travel itinerary" for "itin".

### Competition

Top 10 median rating counts (US): trip planner 35.7k, travel planner 61.5k, itinerary planner 14.3k, travel itinerary 5.2k, trip organizer 5.6k. AU is far softer: itinerary planner 713, trip organizer 709, travel organizer 994, itinerary maker 627. That makes AU, TripCache's home market, the most winnable storefront once ratings exist.

Lower-competition feature terms with a real search match: travel budget (US median 919, 7 of the top 10 have it in the title), travel document wallet (2.9k; the #1 result has 0 ratings), boarding pass wallet (287 US / 44 AU) and booking manager (231 US, mostly salon apps). Flight tracking is out of reach for now: "flight tracker" has a 93k median, and 9 of the top 10 have it in the title.

### Competitor names and subtitles (US)

| App | Ratings | Name | Subtitle |
| --- | ---: | --- | --- |
| TripIt | 311k | TripIt: Travel Planner | Trip Itinerary & Alerts |
| Wanderlog | 35.7k | Wanderlog - Travel Planner | Itinerary & Road Trip Guide |
| Tripsy | 5.6k | Tripsy: Travel Planner | Trip Plan Itinerary Organizer |
| Rhyme | 5.2k | Rhyme - Itinerary Planner | Build Trips From Travel Reels |
| CheckMyTrip | 5.0k | CheckMyTrip – Travel Itinerary | The World's Leading Travel App |
| Flighty | 155k | Flighty – Live Flight Tracker | World's Fastest Delay Alerts |
| Trip Way | 95 | Travel Planner – Trip Way | Itinerary, docs & packing list |
| Wanderjoy | 117 | Wanderjoy - Itinerary Planner | Holiday Trip & Travel Map |
| Navio | 2 | Navio: Trip Planner+Organizer | Plan w/ AI, organize your way |

Everyone uses the same "travel planner / itinerary / organizer" words. TripCache's angle is managing trips already booked: deadlines, documents, check-in. That belongs in the subtitle and the first screenshots, since no leading competitor claims it.

## 3. Metadata findings and proposed changes

Current en-AU: name **TripCache: Itinerary Planner**, subtitle **Trip Organiser & Flight Alerts**, keywords `booking,email,import,tracker,cancellation,reminder,expense,hotel,document,deadline,business,budget`.

| Issue | Why it matters | Fix |
| --- | --- | --- |
| "travel" isn't in the name, subtitle or keywords | Can't match travel planner / travel itinerary / travel organizer / travel documents, the biggest terms in the category | Put "Travel" in the subtitle |
| Only en-AU exists, so the US store (56% of impressions) shows and indexes "Organiser" | US users search "organizer"; Apple doesn't reliably merge the spellings | Add en-US, en-CA (US spelling) |
| en-GB and es-MX slots are empty | AU and UK each index en-AU + en-GB, and the US indexes en-US + es-MX, so roughly 160 indexed characters per market go unused | Add en-GB now; es-MX later (below) |
| Keyword field spends 30 of its 98 bytes on email, import, hotel, deadline and business | "email import" returns mail clients and "hotel" returns booking sites. Neither matches what people search for in this app's job | Swap them for vacation/holiday, wallet, documents, maker, manager, passport, visa |
| Earlier fields used spaces, repeated words and a competitor name ("tripcase") | Wasted bytes; competitor names break guideline 2.3.7 | Don't reintroduce them |

**Proposed** (full text and counts in `listing/proposed-2026-10.md`):

- **Name (all locales):** keep `TripCache: Itinerary Planner`.
- **en-US / en-CA subtitle:** `Travel Organizer & Trip Alerts`. With the name, this covers itinerary planner, travel planner, trip planner, travel itinerary, trip itinerary, travel organizer and trip organizer, all in the name or subtitle where Apple weights words most.
- **en-AU subtitle:** `Holiday & Travel Organiser`. Adds holiday planner and holiday itinerary, the AU wording.
- **en-GB subtitle:** `Trip Organiser, Flights & Docs`. Shown in the UK and also indexed in Australia, so AU gets trip, flights and docs without repeating en-AU words.
- **Keyword fields:** one per locale, no word repeated across fields indexed in the same store, all within 100 bytes.
- **Description:** rewritten to lead with what TripCache does that others don't (free cancellation reminders, check-in reminders, boarding-pass scan, visa travel-history export, offline), with Basic vs Pro stated per the code. Apple doesn't use it for ranking; it's for conversion and Google.
- **Promotional text:** can be updated at any time without review. Rotate it seasonally.

**Later, optional, es-MX (indexed in the US).** This adds a full extra name, subtitle and keyword set to US search. Apple shows the es-MX text to US and Mexico users whose device language is Spanish, and the app UI is English-only. If used, write an honest Spanish subtitle (for example "Organizador de viajes") and say in the description that the app is in English. Decide after the English locales have run for 28 days.

## 4. Ratings: the biggest single lever

The app does ask for ratings (`trip-cache-app/lib/appReview.ts`, `lib/appReviewPolicy.ts`), but only after **5 milestone actions and at least 7 days** since the first one. With ~14 downloads a month and weak retention, almost no one reaches that bar, which explains the 0 ratings after 8 months.

Recommended changes (app release; follows Apple's rules on `SKStoreReviewController`):

1. Lower the gate to **2 milestones and 2 days**. Add a high-satisfaction trigger: the first approved email-import draft, or a tracked flight landing.
2. Add a **"Rate TripCache"** row in Me/Settings that opens `https://apps.apple.com/app/id6758403056?action=write-review`. This is allowed and isn't limited to three prompts a year.
3. Ask people who already use TripCache (current subscribers, friends, beta testers) for an honest rating by email. No incentives, and don't filter for happy users (guideline 5.6.1 / 3.2.2).
4. Answer every review in App Store Connect.

Even 10–20 ratings averaging 4.5+ change how the listing looks in search results and make the AU terms (median ~700 ratings) reachable.

## 5. Screenshots

Apple has read the text in screenshot captions since mid-2025. It counts for less than the title, but it helps long-tail terms, so captions should use real search wording. Only the first three frames show in search results.

**Issues in the current 9 iPhone frames**

- Frame 3 (flight tracking) has garbled AI-generated text on the map card ("H Ebais Cocrbnir hcir bnti605"). The route says SYD → MEB on the card but MEL on the map.
- Frames 3, 4, 5, 6 and 8 show **Android status bars** inside an iPhone frame. Retake them on iOS.
- Frame 1 says "The ultimate smart travel itinerary manager". Superlatives with nothing behind them are weak and can attract review pushback. The sample trip shows Toronto as "YKZ" (a small regional airport); use YYZ.
- The two features competitors don't lead with are last: **free cancellation reminders (frame 8)** and **Live Activity / widgets (frame 9)**. Shown features that exist in the app: boarding-pass scan, check-in reminders, visa travel-history export, offline.
- Frame 4 shows the PIN pad rather than the document wallet itself.
- Current size is 1290×2796 (6.7"). Apple now leads with 6.9" (1320×2868); 6.7" assets are still accepted and scaled.

**Built 2026-10-06** (`../screenshots/`, uploaded to the 1.4.1 draft). Real iOS captures of the latest UI from the promo-video session, framed and captioned in code. Revised the same day with blue-hour destination backgrounds generated in ChatGPT (category research: Tripsy leads with full-bleed destination photography, Flighty with dark cinematic frames, Wanderlog/TripIt with bleeding phones). Final order: itinerary (Sydney), free cancellation (New York), email import (Pro), Live Activity flight tracker (Pro), trip timeline, documents, budget, map, visa export, history. Boarding-pass scan and check-in reminders weren't captured yet; add them on the next capture pass.

**Original proposal** (order and captions):

| # | Caption | Screen |
| --- | --- | --- |
| 1 | Your Trip Itinerary, Organized | Trip timeline: flight, hotel, car, tour |
| 2 | Never Miss a Free Cancellation | Hotel with cancellation deadline and reminder picker (free) |
| 3 | Forward Booking Emails, Get a Trip | Smart Inbox to draft review (Pro badge) |
| 4 | Live Flight Tracker on Your Lock Screen | Live Activity, Dynamic Island, widget (Pro badge) |
| 5 | Travel Documents in One Wallet | Document list: passport, visa, insurance, Face ID lock |
| 6 | Scan a Boarding Pass to Add a Flight | Barcode scan to flight |
| 7 | Flights, Hotels, Cars, Trains & More | Add-plan sheet |
| 8 | Check-in Reminders Before You Fly | Check-in alert and booking reference copy |
| 9 | Travel Budget in 150+ Currencies | Budget and expenses |
| 10 | Export Travel History for Visas | Export: visa/immigration summary (CSV/PDF) |

For en-AU and en-GB, use "Organised" in frame 1 and "Holiday" where it reads naturally. Redo the iPad set with the same story. No app preview video exists. Add a 15–20-second one later; it autoplays in search results.

## 6. Other App Store features to use

| Feature | Use | When |
| --- | --- | --- |
| **In-App Events** | Events appear in search results and on the product page, which brings extra search impressions. Ideas: "Holiday travel check: cancellation deadlines" (Nov–Dec) and "Summer trip prep" (AU Dec–Jan, US Jun). Up to 5 can be live. | After the metadata update |
| **Custom product pages** | Up to 70. They can now be assigned to organic search keywords. Build one for flight-tracking searches that leads with Live Activity, and one for travel-documents searches that leads with the wallet. | Once screenshots are redone |
| **Product page optimization (A/B)** | Needs more traffic than ~35 page views a month to read a result. | Later |
| **App Store tags** | Apple-generated tags that developers can review in App Store Connect. None are assigned yet; check the app information page each release. | Ongoing |
| **Introductory offer** | A free trial of Pro usually lifts page-view → download and download → subscription. Check whether iOS has one. | Next pricing review |
| **Categories** | Travel primary, Productivity secondary is right. | No change |

## 7. Data gaps and access

- **Apple Ads keyword popularity (free):** this account has no Apple Ads account. Opening one is a signup I can't do for you; it needs the account holder to accept the terms. Once it exists, its keyword recommendations give Apple's own popularity score (5–100) for every term in `keywords.csv`. That's the best free source, and no ads have to run.
- **A paid ASO tool (Appfigures, AppTweak, Astro):** useful for daily rank tracking. Each needs an account you create; I can work in one once you're signed in.
- **Search terms report:** App Store Connect doesn't show search queries; Apple Ads does.
- **Google Play:** see [`../../google-play/research/google-play-aso-2026-09-11.md`](../../google-play/research/google-play-aso-2026-09-11.md). Once iOS copy is settled, align the Play title (currently "TripCache: Trip Planner") with the iOS name, for one brand across stores.

## 8. Order of work and how to judge it

| Step | Change | Ships via | Judge after 28 days on |
| --- | --- | --- | --- |
| 1 | en-US, en-CA, en-GB localizations; new en-AU subtitle and keywords; new promotional text | Next app version (name, subtitle and keywords need a version submission) | Search impressions per day vs Sep 7–Oct 1 (28.4/day); US and AU split |
| 2 | Rating-prompt changes and a "Rate TripCache" row | Same or next app release | Rating count; tap-through (impression → page view, now 7.6%) |
| 3 | New screenshots | App Store Connect (with a version) | Page view → download (now ~33–40%) |
| 4 | In-app event | App Store Connect | Event impressions |
| 5 | Custom product pages for flight-tracking and documents searches | App Store Connect | CPP conversion |

Change one group at a time where you can, and log each one with its date so before/after windows stay clean. Baseline for step 1: Sep 7–Oct 1, 709 impressions (687 from search), 54 page views, 18 downloads.
