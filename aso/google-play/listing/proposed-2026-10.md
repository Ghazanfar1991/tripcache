# Google Play listing: live vs draft (2026-10-06)

**Status:** saved as a **store-listing draft** in Play Console (Default listing, en-US) on 2026-10-06. Nothing has been sent for review. To publish, open the listing, check it, click **Save** (this moves the changes to Publishing overview), then **Send for review**. Evidence: [`../research/keyword-data-2026-10-06.csv`](../research/keyword-data-2026-10-06.csv) and [`../research/play-competitors-and-rules-2026-10-06.md`](../research/play-competitors-and-rules-2026-10-06.md).

## Baseline (Play Console, last 28 days to 2026-10-02)

| Metric | Value |
| --- | ---: |
| Device impressions | 457 (+36%) |
| Store listing visitors | 23 (+15%) |
| Unique install clicks | 11 (+22%) |
| Click-through rate | 48% |
| Device acquisitions / first opens | 10 / 10 |
| Monthly active devices | 18 |

Impressions turn into few listing visits, the same pattern as iOS. Rankings (public search, top 30): #1 for "trip cache"; outside the top 30 for every generic term, including "trip planner", which is in the current title.

## Text

| Field | Live | Draft |
| --- | --- | --- |
| App name (30) | TripCache: Trip Planner | **TripCache: Itinerary Planner** (28) |
| Short description (80) | Organize your itinerary and deadlines. Pro adds email import and flight alerts. | **Trip organizer and itinerary maker with travel reminders, documents and budget** (78) |
| Full description (4,000) | 2,060 chars | 2,853 chars (below) |

Why: "itinerary planner" is the strongest generic Play term (suggested after 3–4 letters in the US and AU) that small apps actually rank for. Apps with 50K installs sit at #5 and #10, while "trip planner" needs 100K+ installs to reach the top 10. The name also now matches iOS. The short description covers trip organizer, itinerary maker, travel reminders, documents and budget without leading on a Pro feature. Play indexes the full description, so the measured terms (trip organizer, trip itinerary, itinerary maker, trip manager, holiday planner, travel organizer, travel reminder, document wallet/vault, boarding pass, trip budget/expense tracker, travel history, flight status) each appear naturally 1–3 times. There is no keyword list, competitor name or superlative.

```text
TripCache is a trip organizer and itinerary planner for the trips you've already booked. Keep flights, hotels, rental cars, trains, tours and restaurants in one clear trip itinerary, together with the cancellation deadlines and travel documents that go with them. Use it as your trip manager for holidays, weekends away and business travel.

NEVER MISS A FREE CANCELLATION
Save a booking's cancellation deadline and get a travel reminder 7 days, 2 days, 1 day or on the day. Cancellation reminders are included free.

FORWARD BOOKING EMAILS (PRO)
Send confirmations to your personal TripCache address. TripCache reads the email, attached PDFs and screenshots, and drafts the booking for you to check before it's saved, including the free-cancellation date when the confirmation has one.

ONE TRIP ITINERARY FOR EVERY BOOKING
The itinerary maker keeps flights, stays, rental cars, trains, buses, ferries, parking, events, tours, restaurants, meetings and notes on one timeline. See the trip on a map and add it to your calendar in the right time zones. Whether you call it a trip planner, travel organizer or holiday planner, everything you booked is in one place.

LIVE FLIGHT STATUS AND ALERTS (PRO)
Get flight status alerts for delays, gate and terminal changes, departures, arrivals and baggage belts, with an ongoing notification and a home-screen widget. Coverage depends on the airline and flight-data provider.

CHECK-IN AND TRAVEL REMINDERS
A heads-up 48 hours before departure and an alert when online check-in usually opens, with your booking reference ready to copy.

SCAN A BOARDING PASS
Scan the barcode on a boarding pass to add or update a flight in seconds.

TRAVEL DOCUMENT WALLET
Keep passports, visas, insurance, tickets and boarding passes with the trip in a travel document vault. Lock documents with a PIN or fingerprint and open them offline.

TRIP BUDGET AND EXPENSE TRACKER
Record trip expenses in more than 150 currencies with the exchange rate saved at the time, set a trip budget by category and see what the trip really cost.

TRAVEL HISTORY AND VISA EXPORT
Browse your travel history, past trips and the countries you've visited. Export your travel history, a visa or immigration summary, or an expense report as CSV or PDF, and import past flights from a spreadsheet.

WORKS OFFLINE
Your trip itinerary, flights and saved documents stay on your phone. Changes sync when you're back online.

TRIPCACHE BASIC AND PRO
Basic is free: manual trips with every booking type, cancellation and check-in reminders, the document wallet, boarding-pass scan, the trip budget, exports and offline access. Pro adds booking-email import and live flight status with alerts and widgets. Flight data and alert availability vary by airline, route and region.

Privacy Policy: https://trip-cache.com/privacy
Terms: https://trip-cache.com/terms
```

## Graphics

- **Phone screenshots:** 8 new frameless 1080×1920 frames (`../screenshots/out/play-*.jpg`). They replace the 8 old ones, which used the old UI, AI scenery, "ultimate" and captions over 20%.
- **Feature graphic:** new 1024×500 (`../screenshots/out/play-feature-graphic.jpg`).
- **Tablet screenshots:** the old 7" and 10" sets (iPad-sized canvases with the typos "Securly" and "conneted ot") were removed from the draft. Add real Android tablet captures later if tablet layouts ship.
- **Promo video:** https://www.youtube.com/watch?v=Lh2qlNdYeTE, added to the draft 2026-10-06. It's the 52.5 s horizontal 16:9 voiceover cut (`videos/final/TripCache-promo-horizontal-16x9-voiceover.mp4`), uploaded **unlisted** to the Ghazanfar Naseer channel (@drghazanfarnaseer). YouTube's checks found no issues; the channel isn't monetized, so no ads run (Play requires ads off). The cut shows iPhone mockups and the iOS Live Activity, which is acceptable for a promo but not Android-specific. An Android-framed recut would be stronger later.
- **Icon:** unchanged.

## Not changed, but worth fixing (trust and conversion)

1. **Data safety says "Data isn't encrypted — your data isn't transferred over a secure connection."** That's a strong warning on a document-vault app. Check with the app owner whether all traffic (Supabase, flight API, analytics SDKs) uses HTTPS. If it does, correct the form. Don't change it without that evidence.
2. ~~Store contact email was a personal Gmail.~~ **Done 2026-10-06:** changed to support@trip-cache.com (Store settings → Store listing contact details; app-specific, published immediately).
3. **Tags:** Air travel, Productivity, Travel & local, Travel guide. "Travel guide" doesn't describe TripCache, so consider removing it. Tag changes are under Store settings and may apply without the listing review, so I left them alone.
4. **No ratings yet.** The rating-prompt change recommended for iOS applies to Android too (Play's in-app review API).
5. **App Store preview video:** the promo can't be used on iOS. Apple previews must be 15–30 s, 886×1920 (6.9") and real screen recordings only. Recording one needs a fresh simulator dev build (the installed dev client lacks the ExpoSecureStore native module), so it's waiting on that.
