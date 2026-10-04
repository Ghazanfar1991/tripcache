# SEO strategy

_Last revised 2026-10-05. Revisit quarterly, or when the weekly review finds the data contradicting it._

## What we're optimizing for

Search visitors who are likely to **install TripCache**: people who have already booked trips and are juggling confirmations, deadlines and documents. Traffic that can't become an install (people looking for another company's login page, or trip *inspiration* rather than organization) is noise, however many impressions it brings (R7).

Funnel and how we measure it:

| Stage | Measure | Source |
| --- | --- | --- |
| Seen in Google | impressions, position | Search Console |
| Visit | clicks, CTR | Search Console |
| Wants the app | store-click rate per page | GA4 web (`app_store_click`, `play_store_click`) |
| Installs | downloads / installs | App Store Connect, Play Console (`aso/`) |

## Positioning in search

TripCache is **the trip organizer for after you book**:
- Forward a confirmation and get a reviewable itinerary.
- Keep cancellation deadlines, documents, receipts and expenses with the trip.

Not a booking engine, not an inspiration planner, not primarily a flight tracker. Pages should win on that angle, not by imitating Wanderlog-style planning content.

Facts and claims come from [`research/app-feature-inventory.md`](research/app-feature-inventory.md), which was verified against the app's code on 2026-10-05.
- Basic (free) includes cancellation-deadline reminders, check-in reminders, boarding-pass scanning, the document vault, multi-currency expenses and budgets, CSV/PDF export (including a visa travel-history summary), the trip map and travel history.
- Pro ($5.99/month or $49.99/year per the stores) adds forwarded-email import, live flight-status alerts, and Live Activity/widgets.

**Truthful "free" angles** (free cancellation reminder app, free check-in reminders, free travel-history export for visas) are an advantage: competitors charge for similar features.

## Markets

US (largest search volume), Australia (home market), UK, Canada. English only for now.

## Where we stand (Sep 4 – Oct 1, 2026)

- 56 clicks, 8,172 impressions, 0.7% CTR, average position 10.6. Clicks were down 13% and impressions down 22% on the previous 28 days.
- About 14% of website visitors click through to a store.
- Most impressions come from two pages: the TripCase shutdown guide (position ~7.5) and best travel apps (fallen to ~15.7).
- 16 of 39 pages weren't indexed as of September.

## Where a small site can win

From the October 2026 Semrush research (`research/semrush-2026-10/SUMMARY.md`). TripCache has an Authority Score of 8, so we go where the results page is held by forums, small blogs and tool sites rather than by Wanderlog, TripIt or big publishers.

| Play | Clusters (owner page) | Why it's winnable |
| --- | --- | --- |
| **Dead and pricey competitors** | TripCase (`/blog/tripcase-shutdown-what-now`), TripIt alternatives (`/blog/best-tripit-alternatives-2026`), TripIt Pro (`/blog/tripit-vs-tripcache-comparison-2025`), App in the Air (new), Wanderlog vs TripIt (new) | KD 3–33 with 5–8 weak slots; searchers are actively switching. Highest install intent we have. TripCase demand is falling, so act first. |
| **Free tools** | Flight arrival time calculator, jet lag calculator, layover calculator (all built locally, unshipped); hotel cancellation deadline calculator (live) | Small tool sites hold the top 10 (KD 22–31). Tools earn links. |
| **Things only our app does** | Travel history for visas / I-94 (new guide), free cancellation reminders | "i-94 travel history" 4,400 at KD 34, with no app competing. The free Visa / Immigration Summary export answers it. |
| **Cancellation policies** | Hotel cancellation policies hub (new; brand sections inside), car-rental hub later | KD 17 for the hub; forums fill the results. Per-brand pages mostly lose to the brands themselves. |
| **Free templates** | Google Sheets / Docs itinerary templates (new), template hub with .xlsx (`/blog/travel-itinerary-template-2026`), expense report template (new) | KD 14–25; another small app blog (tripstone.app, Authority Score 11) ranks #2 with exactly this. Real copyable files win. Peak is July. |
| **App lists** | best travel apps for planning (`/blog/best-travel-apps-2025`) | Small blogs (Authority Score 12–22) hold #1–4; we already sit at ~6. |

Timing matters. Searches for hotel cancellation peak in December; templates, flight tools and app lists peak in June–August. The roadmap's dates are set so pages are indexed before the peak.

**Not now:** head terms (KD 60–82), navigational searches for other brands, and wrong-intent searches (physical organizers, immigration documents, booking-intent "free cancellation hotels", B2B expense software). The full list with reasons is at the bottom of `backlog.md`.

The full keyword map is `keywords.csv`: 358 keywords, 74 clusters, one owner page per cluster, each with a winnability verdict and peak months. `owner` is a live path, `NEW:/path` for pages still to build, or `SKIP`.
