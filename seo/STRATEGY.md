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
| **Dead and pricey competitors** | TripCase (`/blog/tripcase-shutdown-what-now`), App in the Air (new), TripIt Pro (`/blog/tripit-vs-tripcache-comparison-2025`), Wanderlog reviews/cost (new) | KD 4–33; searchers are actively switching. Highest install intent we have. |
| **Free templates** | Google Docs/Sheets itinerary templates (new), itinerary template hub (`/blog/travel-itinerary-template-2026`), travel expense report template (new) | KD 10–20 on the Docs/Sheets variants; huge head volume (90.5K) behind them. Real downloadable files beat thin listicles. |
| **Free tools** | Flight arrival time calculator (built locally, unshipped), hotel cancellation deadline calculator (live), jet lag calculator (new) | Results held by small tool sites (KD 22–31); tools earn links. |
| **Cancellation policies** | Hotel cancellation policies hub (new), then per-brand pages | KD 17 for the hub; each page sells the deadline-reminder feature directly. |
| **Comparison and app lists** | Wanderlog vs TripIt (new), best travel apps for planning (`/blog/best-travel-apps-2025`), TripIt alternatives (`/blog/best-tripit-alternatives-2026`) | Forums and tiny blogs in the top 10; we already sit at positions 6–12 on some. |

**Not now:** head terms (KD 60–82), navigational searches for other brands, and wrong-intent searches (physical organizers, immigration documents, booking-intent "free cancellation hotels", B2B expense software). The full list with reasons is at the bottom of `backlog.md`.

The full keyword map is `keywords.csv`: 332 keywords, 61 clusters, one owner page per cluster. `owner` is a live path, `NEW:/path` for pages still to build, or `SKIP`.
