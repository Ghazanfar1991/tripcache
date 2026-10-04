# TripCache app feature inventory (evidence-based)

Reviewed 2026-10-05, read-only. Source: `trip-cache-app` working tree, v1.4.0 (`app.json`). No source file is newer than the 2026-09-07 `.ipa` build. Paths below are relative to `trip-cache-app/`. Entitlement evidence: the client gate is `useSubscription().isPro` (`lib/subscription.tsx`, entitlement "Trip Cache Pro"). The server gate is `pro_only` in `supabase/functions/notification-dispatcher/index.ts:42-55` and `has_active_pro_subscription` in `supabase/functions/_shared/flight-tracking.ts:805`.

## 1. Feature table

| Feature | What it does (proof) | Tier | Maturity | Problem solved |
|---|---|---|---|---|
| Booking-email import ("Smart Inbox") | Gives each user a personal forwarding address (`lib/inbound.ts`, domain `in.trip-cache.com`). One LLM call reads the email body, up to 10 PDFs and up to 8 JPEG/PNG/WebP images (`email-ingest-v2/index.ts:60-64`). It extracts flights (including codeshares) plus lodging, rental car, rail, bus, ferry, shuttle, parking, event, activity, ticket, restaurant and meeting items, and records whether a booking was confirmed, changed or cancelled (`email-ingest-v2/schema.ts:6-16, 205-209`). | **Pro**: gated in `components/ImportModal.tsx:68-120`, with a monthly AI-token quota (`migrations/20260512020000_pro_only_ai_quota_entitlement.sql`) | Shipped | Retyping confirmations that are scattered across an inbox |
| Draft review + auto-accept | The Drafts tab shows confidence scores, missing fields and the source of each value (`app/(tabs)/drafts.tsx`, `DraftReviewModal.tsx`). An optional setting auto-saves drafts at 95% confidence (`app/(tabs)/profile.tsx:1939-1950`). | Pro | Shipped | Trusting automated extraction |
| Cancellation-deadline capture from email | The importer extracts `free_cancellation_deadline` separately from `cancellation_deadline`, along with refundability and penalties (`schema.ts:15, 86-91`). | Pro (import) | Shipped | Missing a hotel or car "cancel by" date |
| Cancellation reminders | For any plan item with a deadline, you pick reminders at 7 days, 2 days, 1 day or day-of (`components/ReminderModal.tsx:20-23`, `lib/tripTools.ts:928`). The server scheduler is `functions/trip-reminder-scheduler`. | **Basic** (`cancellation_deadline: pro_only:false`) | Shipped | Paying for a refundable booking you meant to cancel |
| Manual trips & plan items | Multi-segment flights (`AddFlightModal.tsx`). Stays, rental cars, transport (train/bus), parking, events/tickets, restaurants, tours, meetings, notes (`AddPlanItemModal.tsx:166-349`). Timeline view (`lib/tripTimeline.ts`). There is no flight-number auto-lookup. | Basic | Shipped | One itinerary for every kind of booking |
| Check-in reminders + check-in shortcut | Sends a hint 48 hours before departure and an "open" alert at 24 hours (`functions/flight-checkin-scheduler/index.ts:16-17`). The shortcut copies your booking reference and opens the airline's website in an in-app browser, falling back to a Google search (`FlightDetailPage.tsx:404-408, 2307`). | Basic | Shipped | Forgetting to check in |
| Live flight status alerts | Departed, arrived, delay, gate, terminal and baggage-belt changes via AeroDataBox (`_shared/flight-tracking.ts:23`, `NotificationSettingsModal.tsx:77-92`) | **Pro** | Shipped; coverage depends on the provider | Gate changes and delays |
| Live Activity, Dynamic Island, widgets | iOS: Live Activity and Dynamic Island (`targets/widget/WidgetLiveActivity.swift`), home-screen widgets in small, medium and large sizes (`widgets.swift:886-895`). Android: ongoing notification and home-screen widget (`TripCacheFlightWidgetProvider.kt`). Entitlement is checked before every write (`lib/flightProgressLocalScheduler.ts:2519-2527`). | **Pro** | Shipped | Flight progress at a glance |
| Document vault | Categories: tickets, boarding passes, passport, visa, insurance, hotel (`app/(tabs)/documents.tsx:77-84`). Camera document scanner. PDF/JPEG/PNG files: 10 per document, 15 MB each, 50 MB per document (`lib/documentUploadPolicy.ts:8-10`). Optional PIN with Face ID or fingerprint unlock (`lib/documentPin.ts`). | Basic (no tier limits in code) | Shipped | Passport and visa copies scattered on the phone |
| Boarding-pass barcode scan | Scans QR, PDF417 and Aztec IATA boarding-pass barcodes (`BarcodeScannerSheet.tsx:123`, `lib/bcbp.ts`) and creates or updates a trip and flight (`BoardingPassReviewModal.tsx:530-591`) | Basic | Shipped | Adding a flight in seconds |
| Trip expenses & budgets | Manual expenses in 20 categories with keyword auto-categorizing (`lib/expenseCategories.ts`). 153 currencies, with the exchange rate locked per expense (`migrations/20260817020000_lock_trip_expense_exchange_rates.sql`). Per-category budget targets (`BudgetModal.tsx`). No receipt OCR, no receipt attached to an individual expense, no splitting. | Basic | Shipped | Seeing what a trip actually cost in your home currency |
| Export: CSV + PDF | Four purposes: Travel history, **Visa / Immigration Summary**, Expense report, Complete archive. Filters by date and personal/business, with a column picker (`lib/export.ts:7-8, 94-99`; `ExportModal.tsx:41-50`). | **Basic** (no gate) | Shipped | Reimbursement; listing past travel for a visa application |
| CSV bulk import | Imports past flights from a CSV file, with a sample template (`ImportModal.tsx:217-252`, `lib/csv-import.ts`) | Basic | Shipped | Migrating from another app |
| Trip map | Apple Maps (iOS) or Google Maps (Android) modal of flights, stays and activities (`ModernTripDetailView.tsx:1756-1917`). Stops without coordinates open in the Maps app (`lib/tripTools.ts:561-621`). | Basic | Partial (needs coordinates) | Seeing the trip geographically |
| Calendar | Adds a flight with both time zones, or a whole trip, to the device calendar (`FlightDetailPage.tsx:1590-1630`, `tripTools.ts:413`) | Basic | Shipped. ICS feed (`createCalendarFeed`) has no UI and the URL is not served → **not found** | Itinerary in your calendar |
| Sharing | Shares an image of the trip or flight card (`ShareableTripCard`, `ShareableFlightCard`). A "view-only link" to `trip-cache.com/shared/{token}` is generated (`tripTools.ts:307-352`), **but it returns HTTP 404**. The collaborator invite has no UI. | Basic | Image: shipped. Link: broken. Collaboration: not found | Sending plans to family |
| Travel history | Past trips filtered by personal/business and date, with stats and countries visited (`app/(tabs)/HistoryPage.tsx`, `profile.tsx`) | Basic | Shipped | A record of past trips |
| Offline access | Local-first cache, offline mutation queue and cached document files (`lib/syncEngine.ts`, `lib/documentCache.ts`) | Basic | Shipped | No signal abroad or on a plane |

## 2. Supported inputs

- **Booking providers.** The importer is provider-agnostic: it uses a model, not templates, and no provider names are hard-coded (`email-ingest-v2/README.md`). It does not guarantee success for any named airline, hotel or OTA. Fixtures cover only generic hotel, parking, activity and event samples (`fixtures/import-parser/`). Limits: 25 MB email maximum, 24 MB of attachments in total. PDFs and screenshots attached to a forwarded email are read.
- **Reference data.** 6,160 airline records (1,014 active with an IATA code), 1,091 airline logos and 29,293 airports bundled (`assets/*.iata.min.json`). The remote catalog has websites for 198 airlines but no deep check-in URLs.
- **Platforms.** iOS 16.4+ (`expo-build-properties deploymentTarget`), Android 7.0+ (minSdk 24). Sign-in with email, Google or Apple.
- **Languages.** The UI is English only: no i18n library and no localized resources. The importer prompt is not language-restricted, but no non-English import is tested.
- **Offline.** Yes for trips, flights, plan items and cached documents. Edits made offline are queued and synced later.

## 3. Search angles

**D** = angle is distinctive to TripCache; **G** = generic.

- **Email import:** app that reads flight confirmation emails (G) · forward booking confirmation to an app to make an itinerary (G) · turn a hotel confirmation PDF into an itinerary (D) · organize travel confirmation emails in one place (G) · itinerary from booking screenshot (D) · import train/ferry booking into a trip planner (D) · TripCase replacement that forwards emails (G)
- **Cancellation deadlines/reminders:** reminder before free cancellation ends (D) · how to remember a hotel cancellation deadline (D) · free cancellation deadline tracker app (D) · get notified before a non-refundable date (D) · rental car free cancellation reminder (D) · Booking.com free cancellation reminder (D; phrase as "from your confirmation") · track refundable hotel bookings (D)
- **Check-in reminders (plus a 24-hour trip-start alert, `trip-starting-soon-scheduler`):** reminder when airline check-in opens (G) · when does online check-in open 24 hours (G) · app that reminds me to check in for my flight free (D: free tier) · forgot to check in for my flight (G) · where to find the booking reference to check in (G)
- **Live status/Live Activity:** flight Live Activity app Android and iPhone (D: both platforms) · Dynamic Island flight tracker (G) · gate change alert app (G) · baggage belt notification app (D) · flight tracker home screen widget Android (D)
- **Document vault:** where to keep a passport copy on my phone (G) · travel document app with Face ID lock (D) · store visa and insurance documents offline (G) · keep boarding passes offline (G) · scan passport to phone securely (G)
- **Boarding-pass scan:** scan boarding pass barcode to add flight (D) · read boarding pass QR code app (G) · add flight from boarding pass (D) · what does the barcode on a boarding pass contain (G) · save a boarding pass screenshot with the trip (G)
- **Expenses/budget:** travel expense tracker multiple currencies (G) · trip budget by category app (G) · expense report for a business trip CSV (G) · convert travel expenses to home currency at the historical rate (D) · how much did my trip actually cost (G)
- **Visa/history export:** how to list past travel history for a visa application (D) · UK visa travel history last 10 years (D) · export travel history to PDF (D) · record of countries visited for immigration (D) · Schengen visa travel history list (D)
- **CSV import:** import flights from a spreadsheet into a travel app (D) · move TripIt trips to another app (G) · export TripCase trips before shutdown (G) · log all my past flights (G) · flight history spreadsheet template (D)
- **Trip map / calendar / offline:** see the hotel and activities on one map (G) · add a flight to the calendar with correct time zones (D) · flight shows the wrong time in my calendar (D) · trip itinerary app that works offline (G) · access booking details without internet abroad (G)

## 4. Differentiators (TripCache side only, from the code)

- **TripIt.** Free cancellation-deadline reminders with chosen offsets. The importer reads PDFs and images and keeps free-cancellation terms separate from other cancellation terms. Visa/immigration PDF export, multi-currency budgets and a PIN/biometric document lock. TripIt's free email import beats TripCache's Pro-only import, so do not claim a free-import advantage.
- **TripCase (shut down).** Forwarding-address import, a vault, check-in reminders and CSV import of past flights.
- **Wanderlog.** Built for after you book: live status, Live Activity and widgets, boarding-pass scan and a vault. There is no collaboration or discovery.
- **Tripsy.** Android support, including an ongoing notification and widget equivalent to Live Activity.
- **Flighty.** Covers hotels, cars, rail, events, deadlines, documents and expenses. Never claim deeper flight data.
- **App in the Air.** Reportedly discontinued in 2024; verify. Covers check-in reminders, live status and a history export.

## 5. Mismatches

**The website or PRODUCT.md claims something the code does not support**

1. Pricing, home and features pages put **cancellation reminders** in the paid plan. In code they are Basic (`notification-dispatcher:53`), which matches the Play listing.
2. "**CSV expense export** is paid." In code export is ungated, and **PDF** export also exists.
3. "**Expanded document storage**" for Pro. The code has the same limits for every tier.
4. "**Calendar integration and trip sharing**" for Pro. Neither is gated.
5. "**Attach receipts**" to expenses. Expenses have no attachment. Receipts can only be stored as trip or flight documents.
6. The trip **share link** returns 404 (`/shared/{token}` is missing on the site).
7. The in-app Pro card says "offline trips and sharing are switched on" (`profile.tsx:2087`). Neither is gated.
8. PRODUCT.md says "the traveler enters the cutoff". The importer also extracts it automatically.
9. Blog overclaims:
   - "Unlimited cloud storage", "Secure encryption" (`travel-document-organization-guide-2025.ts`)
   - "Works with ALL airlines", "syncs with airline databases", "Q2 2025" launch (`how-to-automatically-track-flights-2025.ts`)
   - CSV includes "Traveler name and email / TripCache ID" (`travel-expense-tracking.ts`). Those columns do not exist (`lib/export.ts` columns).

**Real features the live home, features and pricing pages never mention (SEO opportunities)**

Visa/immigration travel-history PDF · boarding-pass barcode scan · free check-in reminders and check-in shortcut · Live Activity, Dynamic Island and Android widget · forwarding PDFs and screenshots · automatic deadline extraction · multi-currency expenses with locked exchange rates and budgets · PIN/Face ID vault · rail, bus, ferry, parking, events and restaurants · countries visited · CSV import.

## 6. Claims to avoid

- Support for "all", or any named, airline, hotel or OTA email. Say "supported confirmations, review required".
- Inbox or Gmail scanning. Import works only by forwarding.
- Free email import, or unlimited imports. Import is Pro and has a monthly AI quota.
- Real-time or official status for every flight. Data comes from a third party (AeroDataBox) and coverage varies.
- Automatic check-in. The app only opens the airline's site.
- Encryption, "bank-level" or end-to-end security. The PIN is a local app lock, and the Play Data safety form shows "Data isn't encrypted".
- Unlimited document storage.
- Live shared itinerary links, collaboration, or calendar or ICS subscription sync.
- Receipt scanning or OCR, expense splitting, Apple or Google Wallet, packing lists, journals, travel advisories.
- Flight-number auto-fill, localized (non-English) app, iPad, Watch or web app.
- Ratings, download counts, testimonials, or a guaranteed free trial.
