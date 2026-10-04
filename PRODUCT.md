# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Travelers who already booked: frequent and business travelers juggling flights, hotels, cars, tours and tickets across many confirmation emails. They arrive on the marketing site from search (TripIt / TripCase alternative, cancellation reminders, travel document organizer queries) deciding whether to install the iOS or Android app.

## Product Purpose

TripCache is a post-booking travel organizer. It keeps one organized itinerary per trip (with Pro, built from forwarded booking confirmation emails), keeps free-cancellation deadlines visible with reminders, and keeps documents, receipts and expenses beside the trip. Success for the marketing site: the visitor understands that in seconds and taps through to the App Store or Google Play.

## Positioning

The trip organizer for after you book: forward a confirmation, review the extracted draft, and keep deadlines, documents and expenses in trip context. Not a booking engine and not a pure flight tracker.

## Operating Context

- Workflow (Pro): forward a supported confirmation to a personal TripCache address → TripCache extracts a trip draft → traveler reviews and corrects it → the itinerary lives with its documents, receipts (stored as trip documents), expenses and, on supported flights, live flight-status alerts. On Basic the traveler adds bookings by hand, scans a boarding pass or imports past flights from CSV.
- Cancellation reminders (Basic, free): the traveler enters the cutoff from a refundable booking (with Pro, the importer also reads it from the confirmation for the traveler to check) and chooses a reminder 7 days, 2 days or 1 day before, or on the day. The provider stays authoritative.
- Apps: iPhone (App Store id6758403056) and Android (Play `app.tripcache`). `/download` redirects by user agent.

## Capabilities and Constraints

**Source of truth:** [`seo/research/app-feature-inventory.md`](seo/research/app-feature-inventory.md), checked against the app's code. Every plan or feature claim on the site must match it, including its "Claims to avoid" list (seo/RULES.md R8). If this summary and the inventory ever disagree, the inventory wins; update this file.

- Basic (free): manual trips (flights, stays, cars, trains, buses, ferries, parking, events, restaurants, tours, meetings), cancellation-deadline reminders (7 days, 2 days, 1 day or day-of), check-in reminders (48 h and 24 h) with a check-in shortcut that opens the airline's site, boarding-pass barcode scanning, the document vault with an optional PIN and Face ID or fingerprint unlock, expenses in 153 currencies with locked exchange rates and category budgets, CSV and PDF export (travel history, Visa / Immigration Summary, expense report, complete archive), CSV import of past flights, trip map, travel history, offline access, add to the phone's calendar, and trip or flight image-card sharing.
- Pro ($5.99/month; $49.99/year on Google Play, $50.00/year on the App Store; US prices, October 2026): booking-email import from forwarded confirmations, including attached PDFs and screenshots, with draft review and a monthly import allowance; live flight-status alerts on supported flights; Live Activity, Dynamic Island and home-screen widgets.
- Storage limits are the same on every plan. Platforms: iOS 16.4+ and Android 7.0+; the app is English only.
- Never claim: support for "all" or any named airline, hotel or OTA; inbox or Gmail scanning; free or unlimited email import; real-time status for every flight; automatic check-in; encryption or "bank-level" security; unlimited storage; shareable trip links, collaboration, or calendar/ICS sync; receipt scanning, receipts attached to individual expenses, or expense splitting; ratings, download counts, testimonials or a guaranteed free trial; or anything else the inventory does not list (for example priority support).
- Copy must stay careful: "supported" emails and flights; airline, airport and booking-provider information remains authoritative; reminder delivery depends on device notification permissions.
- Store clicks are tracked by `components/store-link-analytics.tsx` (any App Store / Play / `/download` link, labelled by `data-store-placement`).

## Brand Commitments

- Name: TripCache (one word, capital T and C).
- App icon: violet-to-indigo gradient pin with airplane and suitcase (`/public/app-icon-violet-indigo.*`).
- Voice: plain, precise, non-hype; never overclaims automation.
- Visual identity comes from the mobile app itself (trip-cache-app/lib/theme.tsx): Fraunces display, Inter text, Allura script for "Trip to"; violet #612BD3 and magenta #D82D7E; category colours flight indigo, hotel green, car amber, activity pink; the black and neon-green Live Activity; the app's landmarks and 3D suitcase artwork.
- flighty.com was the owner's initial quality reference only. On 2026-10-05 the owner asked that the site must not look like a copy of Flighty (copyright concern) and chose the "Inbox → Itinerary" direction. Do not reintroduce Flighty's signature devices. The previous "design-one" journal/paper look is also retired.

## Evidence on Hand

- 18 real app screenshots with transparent iPhone frames, 1250×2700 (`/public/app-screen*.webp`, `/public/app-screenshot*.webp`, `/public/app-feature*.webp`).
- App artwork: `/public/brand-landmarks.webp` and `/public/brand-suitcase-pass.webp` (from trip-cache-app/assets). More art lives in trip-cache-app/assets (onboarding scenes, city landmarks).
- Pricing and plan facts above (from the feature inventory); support email support@trip-cache.com.
- Absent: testimonials, ratings, user counts, press mentions, awards. Do not fabricate any of these; demonstrate the product instead.

## Product Principles

1. Show the trip, not the claim: demonstrate the itinerary, deadlines and documents working.
2. Reviewable automation: the traveler always checks the draft; say so.
3. Providers stay authoritative: TripCache organizes, it does not replace airline or hotel truth.
4. Free to start, Pro when automation helps. Most of the app is free; Pro gates only email import, live flight alerts and Live Activity/widgets.

## Accessibility & Inclusion

WCAG 2.1 AA; respect `prefers-reduced-motion` and reduced transparency (existing site already honors both).
