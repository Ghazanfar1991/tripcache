# App Store listing: live (2026-10-06) vs proposed

**Status 2026-10-06:** entered in App Store Connect as draft version **1.4.1** (Prepare for Submission, not submitted). The draft holds every field below for en-AU, en-US, en-GB and en-CA, plus the new 10-frame iPhone screenshot set (`../screenshots/out/`). The live 1.4.0 listing is unchanged until 1.4.1 is submitted with a build and approved. Still to do before submitting: attach a build. The app is iPhone-only (builds 78–82 report `IPHONE` only), so iPad screenshots aren't shown to anyone. The old iPad set left over in the draft can be deleted.

Character counts were checked against Apple's limits: name 30, subtitle 30, keywords 100 bytes, promotional text 170, description 4,000. Reasoning and evidence: [`../research/app-store-aso-2026-10-06.md`](../research/app-store-aso-2026-10-06.md).

## Live today (v1.4.0, en-AU is the only localization)

| Field | Value |
| --- | --- |
| Name | TripCache: Itinerary Planner (28) |
| Subtitle | Trip Organiser & Flight Alerts (30) |
| Keywords | booking,email,import,tracker,cancellation,reminder,expense,hotel,document,deadline,business,budget (98) |
| Promotional text | With TripCache Pro, turn booking emails into one itinerary and get supported live flight alerts. Keep cancellation deadlines, documents and expenses together. |
| Categories | Travel (primary), Productivity (secondary) |
| Screenshots | 9 iPhone (1290×2796), 5 iPad 13" |

Earlier keyword fields, kept for the record:
- v1.0 (Jan 2026): `flight,tracker,travel,itinerary,planner,tripcase,alternative,organizer,status,alerts,manager,widgets`
- v1.3.1–1.3.3 (Jun 2026): `travel planner, trip planner, itinerary organizer, travel organizer,flight tracker,itinerary planner` (spaces and repeated words waste bytes)

## Proposed

Keep the **name** the same in every locale: `TripCache: Itinerary Planner` (28). Impressions per day rose about 3.3× after it shipped on 2026-09-07, so don't reset it.

Apple combines words across the name, subtitle and keyword field, and a storefront also indexes certain extra locales: US indexes en-US + es-MX; Australia and the UK each index en-AU + en-GB; Canada indexes en-CA + fr-CA. So en-AU and en-GB are written as one set with no repeated words.

### en-US (new localization; today the US store shows the en-AU text)

| Field | Value |
| --- | --- |
| Subtitle | `Travel Organizer & Trip Alerts` (30) |
| Keywords | `vacation,flight,tracker,booking,wallet,documents,budget,expense,reminder,maker,manager,passport,visa` (100) |
| Promotional text | Get reminded before free cancellation ends, keep travel documents with the trip and see every booking in one itinerary. Pro adds email import and live flight alerts. (165) |

### en-AU (primary; also shown in every storefront without its own localization)

| Field | Value |
| --- | --- |
| Subtitle | `Holiday & Travel Organiser` (26) |
| Keywords | `tracker,booking,wallet,documents,budget,expense,reminder,maker,manager,passport,visa,organizer,log` (98) |
| Promotional text | Same as en-US. |

### en-GB (new; shown in the UK, also indexed in Australia)

| Field | Value |
| --- | --- |
| Subtitle | `Trip Organiser, Flights & Docs` (30) |
| Keywords | `boarding,pass,history,cancellation,deadline,scanner,currency,export,business,offline,status,widget` (98) |
| Promotional text | Same as en-US. |

### en-CA (new; Canada)

Same subtitle, keywords and promotional text as en-US.

### App preview, header and search assets

See [`../creative/README.md`](../creative/README.md). Since 2026-10-07 the App Preview in all four locales is a real simulator recording (26.7 s), replacing the earlier HyperFrames cut. The product page header (video loop) and the search-results image are on en-AU, and the other locales inherit them.

### Description (all English locales)

The description isn't used for App Store search ranking, but it drives conversion and Google indexes it. Every claim below was checked against `seo/research/app-feature-inventory.md` (Basic vs Pro per the code).

```text
TripCache keeps the trips you've already booked in one clear itinerary: flights, hotels, rental cars, trains, tours and restaurants, together with the cancellation deadlines and travel documents that go with them.

GET REMINDED BEFORE FREE CANCELLATION ENDS
Save a booking's cancellation deadline and choose a reminder 7 days, 2 days, 1 day or on the day. Included free.

FORWARD BOOKING EMAILS (PRO)
Send confirmations to your personal TripCache address. TripCache reads the email, attached PDFs and screenshots, and drafts the booking for you to check before it's saved, including the free-cancellation date when the confirmation has one.

ONE TRIP ITINERARY FOR EVERY BOOKING
Flights, stays, rental cars, trains, buses, ferries, parking, events, tours, restaurants, meetings and notes on one timeline. See the trip on a map and add it to your calendar in the right time zones.

LIVE FLIGHT TRACKER (PRO)
Alerts for delays, gate and terminal changes, departures, arrivals and baggage belts, plus a Live Activity, Dynamic Island and Home Screen widgets. Coverage depends on the airline and flight-data provider.

CHECK-IN REMINDERS
A heads-up 48 hours before departure and an alert when online check-in usually opens, with your booking reference ready to copy.

SCAN A BOARDING PASS
Scan the barcode on a boarding pass to add or update the flight in seconds.

TRAVEL DOCUMENT WALLET
Keep passports, visas, insurance, tickets and boarding passes with the trip. Lock them with a PIN or Face ID and open them offline.

TRAVEL BUDGET AND EXPENSES
Record expenses in more than 150 currencies with the exchange rate saved at the time, set budgets by category and see what the trip really cost.

TRAVEL HISTORY AND VISA EXPORT
Browse past trips and the countries you've visited. Export your travel history, a visa/immigration summary or an expense report as CSV or PDF, and import past flights from a spreadsheet.

WORKS OFFLINE
Trips, flights and saved documents stay on your phone. Changes sync when you're back online.

TRIPCACHE BASIC AND PRO
Basic is free: manual trips with every booking type, cancellation and check-in reminders, the document wallet, boarding-pass scan, budgets, exports and offline access. Pro adds booking-email import and live flight tracking with alerts, Live Activities and widgets. Flight data and alert availability vary by airline, route and region.

Privacy Policy: https://trip-cache.com/privacy
Terms of Use: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
```

### What's New (1.4.1, entered in the draft)

Same text in all four locales ("travellers" in en-AU, en-GB and en-CA). It isn't indexed for search, so it's written for people. Make it specific if the build ships a user-visible feature.

```text
TripCache 1.4.1 is a polish and stability update:

- Interface refinements and layout fixes across trips, documents and drafts.
- Security and privacy improvements.
- Performance and stability fixes.

Enjoying TripCache? A quick rating helps other travelers find it. Questions or feedback: trip-cache.com/about
```
