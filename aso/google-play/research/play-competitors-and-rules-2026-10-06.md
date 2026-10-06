# Google Play: TripCache listing audit, competitors and rules

Researched 2026-10-06 from public US-English Play pages (`hl=en_US&gl=US`) and Google support pages. No logins. Listing data came from the public details page and from `google-play-scraper` 1.x, which reads the same page. Image sizes are the native sizes the Play image server returns. Reference images (first 3 screenshots and the feature graphic per app, plus all 13 TripCache images) are saved in the session scratchpad under `play-ref/`. That folder is temporary and is not in the repo.

This follows [google-play-aso-2026-09-11.md](google-play-aso-2026-09-11.md), which covered Console metrics and an experiment design. This file covers the public listing, competitors' copy and visuals, and the rules.

## 1. TripCache's current listing (app.tripcache)

| Field | Observed |
| --- | --- |
| Title | `TripCache: Trip Planner` (23/30) |
| Short description (meta/og description) | `Organize your itinerary and deadlines. Pro adds email import and flight alerts.` (79/80) |
| Full description | 2,088/4,000 chars. Intro paragraph, then 8 ALL-CAPS section headers: Booking email import - Pro; Trip itinerary organizer; Cancellation deadline reminders; Flight status and alerts - Pro; Travel document organizer; Trip budgets and expenses; Travel history and exports; TripCache Basic and Pro. Ends with an availability disclaimer. |
| Category / tags | Travel & Local. Tags don't appear on the public page; check them in Console (max 5). |
| Developer | Flowbyte Labs. "About the developer" shows a personal name and a support@fieldrecall.com address. The support email is a personal @gmail.com address. |
| Downloads / rating | 50+ (scraper realInstalls 75); no public rating |
| Released / updated | Mar 13, 2026 / Sep 5, 2026 |
| IAP | $5.99 – $49.99 per item; no ads |
| Screenshots | 13 unique: 8 phone at 2160×3840 (9:16, meets the promotion spec) and 5 tablet at 2064×2752 (3:4, an iPad-13" canvas) |
| Feature graphic | Yes, 1024×500 |
| Promo video | None |
| Data safety | No data shared. Collects Personal info (name opt., email, phone opt.), Files and docs (opt.), crash logs and diagnostics. **"Data isn't encrypted — Your data isn't transferred over a secure connection."** Deletion can be requested. |
| What's new | Generic ("improved offline functionality… bug fixes") |

### Weak spots

1. **Trust signals.** The Data safety label says data isn't encrypted in transit, on an app that holds passports, visas and booking emails. The support contact is a personal Gmail address, and "About the developer" names a different brand (fieldrecall.com). These are probably the biggest conversion drags. Fix the facts first; don't change the label just to look better.
2. **The title spends its keyword on "Trip Planner".** That puts TripCache in the pre-trip discovery space (Wanderlog, Stippl, Tripomatic). The product is a post-booking itinerary and flight organizer. 7 characters are unused.
3. **The short description has few keywords and leads with the paywall.** About half of it is "Pro adds…". It doesn't contain trip, travel, flight tracker, booking or organizer. Play indexes this field, and it's the first text users see.
4. **The full description uses half its space and leaves out the Android-specific features.** Missing: the live flight widget and ongoing notification, boarding-pass scan, offline access (only mentioned in What's new), visa / travel-history export, and booking PDFs. The hedges ("supported", "vary", "depends") are needed, but they appear in almost every section and dilute it.
5. **Phone screenshots** (all 8 have Android frames and an Android status bar, which is good):
   - The caption blocks (headline plus subline) take about 22–25% of the height, above Google's 20% guidance. The busy sunset and destination photos compete with the text.
   - The main differentiator (free-cancellation deadlines) is shot 7 of 8.
   - The shots show third-party marks: Philippine Airlines, Qantas and Thai Airways logos, and a Marriott hotel name. The guidance says to avoid third-party logos without permission.
   - "The ultimate smart travel itinerary manager" reads as a superlative.
   - The status bar isn't clean: mute icon, roaming "R", 93% battery charging. Google asks for full battery and signal icons and no notifications.
   - A fake "16" notification badge sits on the home screen bell.
6. **Tablet screenshots:**
   - They are 3:4 iPad-size canvases, not the 16:9/9:16 large-screen spec.
   - Two typos: "Securly Save your Documents" and "conneted ot trips".
   - They are reordered copies of the phone set.
7. **Feature graphic:**
   - It shows three phone mockups. Google says to avoid device imagery here.
   - It repeats the icon and wordmark at large size. Google says not to duplicate the icon.
   - It packs in 4 bullet badges, a script slogan and the vertical words "Explore / Plan / Track / Remember", which is too much fine detail.
   - The badges sit at the right edge, in the cut-off zone.
8. **No promo video, no ratings, and a generic What's new.**

## 2. Competitors on Play (US English, 2026-10-06)

TripCase (Sabre) was shut down on Apr 1, 2025 ([Travel Daily](https://traveldaily.com.au/?p=406643)). App in the Air closed on Sep 19, 2024 ([AlternativeTo](https://alternativeto.net/news/2024/9/app-in-the-air-to-shut-down-on-september-19-2024-users-advised-to-export-their-data-now)). Neither is listed. byAir replaces them as the flight-companion comparison.

### Copy

| App (package) | Title (exact, chars) | Short description (exact) | Opening of full description | Installs / ratings |
| --- | --- | --- | --- | --- |
| TripIt (com.tripit) | TripIt: Travel Planner (22) | TripIt® from Concur instantly organizes all your travel plans in one place. | "Join nearly 20 million travelers on the world's highest-rated travel planner app for trip and itinerary organization!" / header "TRAVEL ITINERARY" | 5M+ / 96,280 (4.7) |
| Wanderlog (com.wanderlog.android) | Wanderlog - Trip Planner App (28) | Map & organize your road trip and travel itinerary: TripIt, Roadtrippers in 1 | "The best app to plan a trip, Wanderlog is the easiest-to-use, completely free travel app for planning every kind of trip…" / "✈️🛏️ See flights, hotels, and attractions in one place (like TripIt and Tripcase)" | 1M+ / 37,013 (4.7) |
| KAYAK (com.kayak.android) | KAYAK: Flights, Hotels & Cars (29) | Find, compare & book flights, hotels and car rental with KAYAK's travel app. | "KAYAK searches hundreds of travel sites to show you your options… Track prices, set a budget, build your itinerary and more." | 10M+ / 430,705 (4.8) |
| Tripadvisor (com.tripadvisor.tripadvisor) | Tripadvisor: Plan & Book Trips (30) | Download now and start earning rewards on hotels, tours, and everything travel. | "One app, so many places to discover… For a limited time only, get $30 off Things to Do…" | 100M+ / 1.47M (4.5) |
| Polarsteps (com.polarsteps) | Polarsteps (10) | Travel Tracker & Trip Planner for countries & U.S. states you've been to | "Plan, track and relive your adventures with Polarsteps. Keep your friends and family up to date." | 10M+ / 195,741 (4.7) |
| Stippl (com.stippl.stippl) | Stippl: AI Travel Planner (25) | Free AI trip planner, budget tracker & travel journal. 1.5M travelers worldwide. | "Stippl is the free AI travel planner and trip organizer trusted by 1.5 million travelers…" / "✦ TRAVEL ROUTE PLANNER" | 100K+ / 2,169 (3.7) |
| Roadtrippers (com.roadtrippers) | Roadtrippers - Trip Planner (27) | With over 38 million trips planned, Roadtrippers makes your trip an adventure. | "DISCOVER THE OPEN ROAD…" / "Roadtrippers, the #1 road trip planning app in the USA and Canada…" | 1M+ / 8,873 (2.6) |
| Flightradar24 (com.flightradar24free) | Flightradar24 Flight Tracker (28) | Track airplanes and follow flights with our real-time flight tracker | "The world's most popular flight tracker - #1 Travel app in over 150 countries." | 100M+ / 657,763 (4.5) |
| FlightAware (com.flightaware.android.liveFlightTracker) | FlightAware Flight Tracker (26) | FlightAware Live Flight Tracker | "Free, live flight tracker and flight status app from FlightAware for Android!" | 10M+ / 45,361 (3.8) |
| byAir (com.byairapp.android) | byAir: Flight Tracker & Status (30) | Plane Tracker: Live Status, Delay Predictions, Flight Board & Alerts | "Stay ahead of every flight with byAir - an accurate flight tracker with live flight status, delay predictions, and airport guidance." | 100K+ / 4,789 (4.7) |
| TravelSpend (tech.jonas.travelbudget) | TravelSpend: Travel Budget App (30) | Manage your spending and budget on vacation. Share and split costs with friends. | "TravelSpend is an app to track your spending while traveling the world…" | 500K+ / 11,353 (4.7) |
| Lambus (io.lambus.app) | Lambus \| Travel Planner (23) | Manage expenses, itinerary, travel documents, photos and notes within one app! | "Lambus is a Tourlane company…" / "…the ultimate travel app that has everything you need for your trip!" | 100K+ / 2,296 (4.4) |
| Itinerate (com.blahovici.itinerate) | Itinerate - Travel planner (26) | Experience seamless travel planning and real-time collaboration with Itinerate. | "Discover a new horizon of travel planning with Itinerate. Your one-stop solution for planning, organizing, and visualizing your travel journeys." | 50K+ / 644 (4.2) |
| Trip Plans (com.travefy.tripplans) | Trip Plans (10) | View your detailed itinerary from your travel advisor on your device. | "The Trip Plans app lets you view your detailed itinerary from your travel advisor on your device. No data or internet connection? No problem!" | 100K+ / 2,823 (4.7) |
| Tripomatic (com.tripomatic) | Tripomatic Planner & Maps (25) | Plan your trips and create your own travel guide. Get offline maps. | "The new Tripomatic is here! Your trusted trip planner just got even better…" | 1M+ / 18,408 (4.2) |

All are in Travel & Local. Wanderlog, Stippl, byAir and Flightradar24 use most of the 4,000 characters. TripIt uses 2,445 and TravelSpend 1,542. Most titles follow "Brand: generic keyword"; brand-only titles (Polarsteps, Trip Plans) move their keywords into the short description.

### Visuals (first 3 phone screenshots + feature graphic)

| App | Count and size | Screenshot style | Feature graphic |
| --- | --- | --- | --- |
| TripIt | 8 × 1600×2560 | Blue brand background. #1 is a tilted, frameless itinerary timeline with no caption. #2 is a caption-only panel ("Organize your trip") with an illustrated car and no UI. #3 shows press logos (NYT, Forbes, T+L), "4.7 stars, 62k+ ratings" and a small phone. | Flat illustration of a traveler on a map pin with route lines to plane, hotel and car icons; small logo; no device |
| Wanderlog | 8 phone 1242×2208 + 7 tablet 2048×2732 | A different solid color per shot (coral, red, violet), bold white 3-line headline, iPhone UI (9:41 status bar) cropped edge to edge. | Coral; logo and headline "Your travel plans and itinerary, simplified" on the left, cropped iPhone UI on the right |
| KAYAK | 14 × 1080×1920 | Off-white background, orange icon tile, black bold 2-line headline, minimal phone outline. #1 carries a "4.8 · 446.3k ratings" chip. | Aerial landscape photo with the KAYAK tile logo and "Compare from 1,000+ travel sites" |
| Tripadvisor | 5 × 2160×3840 | Neon-green collage with stickers and heavy display type. The text is promotional ("Get 5% back in Trip Cash"). | Logo on flat green |
| Polarsteps | 7 × 1290×2796 (over the 2:1 limit) | #1 is a lifestyle photo of a hand holding an iPhone, with a "Google Play Editors' Choice" laurel. #2–3 use a small uppercase eyebrow ("PLAN YOUR JOURNEY") and a 2-line headline on cream, iPhone frames, map UI. | Satellite map with a route line and circular photo stops; no text, no device |
| Stippl | 8 × 1260×2736 | Dark-green/mint backgrounds, eyebrow plus headline, iPhone frames. #3 is a lifestyle photo with "Loved by 1.5M+ Travelers" and a user review in Dutch. | Photo of a laughing traveler with a large iPhone showing a route map |
| Roadtrippers | 7 phone 1242×2208 + 6 tablet | Collage backgrounds; #1–2 form one panorama with a tilted phone. "Get the ultimate road travel companion". | Mountain-road photo with script logo |
| Flightradar24 | 8 phone + 16 tablet + 2 Wear | Blue background; tilted full-bleed UI. #1 "The world's most trusted flight tracker" with a "Google Play #1 Travel App" laurel. #2 "As featured by ABC, CNN, WP, NYT, WSJ". | World map, logo, "LIVE AIR TRAFFIC" |
| FlightAware | 6 phone 1080×2220 + 12 tablet | Raw full-bleed Android captures from 2020 with no captions; ads visible. | Dark radar map with plane tracks, logo, "Live Flight Tracking" |
| byAir | 8 phone 1080×1920 + 7 tablet + 5 Wear | Purple-blue gradients. #1 "Stay ahead of every flight" with "300K travelers" and "Featured by Google" laurels. #2 shows an Android lock-screen live notification and a Wear OS watch: "Gate changed. You knew first." plus a 5-star review. #3 "A heads up — hours before airlines", with a delay-prediction card. | Sky background, "Featured by Google" laurels, logo, headline, phone |
| TravelSpend | 6 × 1620×2880 | Cream background with a red backpack mascot. Bold black headline plus a one-line subline ("Enter expenses quickly — works offline"). Tilted phone; #1–2 form a panorama. | Mascot only; no text |
| Lambus | 8 phone 1242×2688 + 8 tablet | Warm gradient. One sentence continues across shots ("Plan your next trip and have all information in one place…" → "…every stop, every activity…" → "…every document and every note…"). iPhone frames. | Mountain photo with logo |
| Itinerate | ~7 phone 1300×2040 + tablet | Illustrated blue landscape background, white 2-line caption, frameless Android screens, sometimes two per shot. | Illustrated camper van landscape; no text |
| Trip Plans | 7 × 1143×2286 | Pink background, thin light captions, 3D-tilted phones across a panorama. | Purple-tinted photo, logo, "Your Itinerary Awaits" |
| Tripomatic | 6 phone 1440×2960 + 6 tablet | Full-bleed map or 3D illustration with a one-word pill ("PLAN", "DISCOVER", "EXPLORE"). | Illustration of landmarks on a globe |

**What competitors do:**

- **iPhone frames are common** (Wanderlog, Polarsteps, Stippl, Lambus) and those listings are live, so enforcement is loose.
- **Ratings, press, award and user-count claims are common** (TripIt, KAYAK, Flightradar24, Polarsteps, Stippl, byAir), even though Google's guidance says not to show them.
- **Wanderlog names competitors** in its short and full descriptions, and Tripadvisor uses a CTA plus a time-limited price promotion.
- **These are big or legacy listings.** A small new listing shouldn't copy any of the three patterns above.

## 3. Google Play rules (current pages, fetched 2026-10-06)

### Text and metadata

| Item | Rule | Source |
| --- | --- | --- |
| Title | ≤30 chars. No emoji, emoticons or repeated special characters. No ALL CAPS unless it's the brand. No performance/ranking, price/promo or Play-program wording ("#1", "Best", "Free", "No Ads", "New", "Editor's Choice"). No implied relationship to another company. | [Metadata policy](https://support.google.com/googleplay/android-developer/answer/9898842?hl=en), [Store listing best practices](https://support.google.com/googleplay/android-developer/answer/13393723?hl=en) |
| Short description | ≤80 chars. No emoji or symbols (★), no line breaks, no repeated punctuation. No capitalization for emphasis. No CTA ("download now"). No "Best/#1/Top/New/Discount/Sale/Million Downloads". No keywords added only for search ("will not impact ranking"). | [Preview assets](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en) |
| Full description | ≤4,000 chars. Accurate, succinct. No repetitive keyword lists or word blocks. No unattributed/anonymous testimonials. No misleading references to other apps (comparisons count). Don't repeat the short description. "Excessive length, detail, improper formatting, or repetition can result in a violation." | [Metadata policy](https://support.google.com/googleplay/android-developer/answer/9898842?hl=en), [Best practices](https://support.google.com/googleplay/android-developer/answer/13393723?hl=en) |
| Translations | The same policy applies to every localization, including machine translations Google generates | [Best practices](https://support.google.com/googleplay/android-developer/answer/13393723?hl=en) |
| Tags | Max **5**, chosen in Console (Store settings → Manage tags) from suggested or searchable lists. They must be obviously relevant from the listing or the first in-app experience. Change them only when the app changes significantly. Accessibility tags exist too. | [Category and tags](https://support.google.com/googleplay/android-developer/answer/9859673?hl=en) |

### Graphics

| Asset | Hard requirements (upload or policy) | "Highly recommended" (affects promotion eligibility) |
| --- | --- | --- |
| Icon | 512×512, 32-bit PNG with alpha, ≤1024 KB. No badges or text suggesting ranking, price or category. No misleading notification dots. | Follow the icon design spec |
| Feature graphic | **Required to publish.** 1024×500, JPEG or 24-bit PNG (no alpha) | Keep the focal point centered and out of the cut-off zones. Don't duplicate the icon's branding. No fine detail. Avoid pure white, black or dark grey. **Avoid device imagery**, third-party logos and store badges. No ranking, testimonial, award or price wording. Alt text ≤140 chars. |
| Screenshots | At least 2 to publish, up to 8 per device type. JPEG or 24-bit PNG (no alpha). Each side 320–3840 px. **Long side ≤2× short side.** | For large-format recommendation surfaces: **≥4 screenshots, 9:16 portrait at ≥1080×1920** (or 16:9 at ≥1920×1080). Show the real in-app experience, with UI prioritized in the first 3. **Taglines ≤20% of the image.** No ranking, awards, testimonials or price/promo wording. No CTAs. No hands or fingers. Clean status bar (full battery and signal, no notifications or carrier). **Avoid device imagery.** No third-party logos without permission. Alt text per image. |
| Tablets / Chromebook | At least 4; 1080–7680 px; 16:9 or 9:16; avoid extra text that can be cropped | — |
| Promo video | Optional. Public or unlisted YouTube URL (not a playlist), ads disabled, not age-restricted, embeddable | Show the core feature in the first 10 s; only the first 30 s autoplay; ≥80% real UI. Google Play awards are allowed in video. |

Sources: [Add preview assets](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en), [Metadata policy](https://support.google.com/googleplay/android-developer/answer/9898842?hl=en).

**iOS UI or iPhone frames on Play.** No Google page names iOS directly. Two rules apply. First, the assets must show the "actual in-app experience" and must not misrepresent functionality ([Deceptive behavior / Metadata](https://support.google.com/googleplay/android-developer/answer/13393723?hl=en)). Second, device imagery is discouraged on every graphic. In practice, Play is full of iPhone frames (Wanderlog, Polarsteps, Stippl, Lambus). Third-party ASO guides say it can be treated as platform misrepresentation ([AppLaunchFlow](https://www.applaunchflow.com/blog/ios-vs-google-play-screenshot-guidelines-2026), [Screenhance](https://screenhance.com/blog/app-store-vs-play-store-screenshots)). Low rejection risk, but avoidable. Use Android captures, or frameless captures. TripCache's phone set already does this; the tablet set uses iPad-sized canvases.

### Custom store listings and experiments

- **Custom store listings:** up to **50**. Target them by country, pre-registration, **search keywords** (pick from keywords known to bring traffic, with variations), inactive users, Google Ads ad group, or a unique URL (`&listing=<param>`). Each country can be in only one custom listing. Ads custom listings show only on AdMob, not on Play search ads. [Custom store listings](https://support.google.com/googleplay/android-developer/answer/9867158?hl=en)
- **Experiments:** one default-graphics experiment (icon, feature graphic, screenshots) **or** up to 5 localized experiments (graphics and/or short/full description) at a time. Up to 2 variants. Target metric is unique user install clicks. Console estimates the duration; experiments auto-stop at 6 months. The **title cannot be tested**. [Store listing experiments](https://support.google.com/googleplay/android-developer/answer/12053285?hl=en)

## 4. How Play search differs from the App Store

| | Google Play | App Store |
| --- | --- | --- |
| Hidden keyword field | None | 100-char keyword field ([Apple](https://developer.apple.com/app-store/search/)) |
| Indexed text | Title (strongest), short description, **full description** ([AppTweak, Jun 2025](https://www.apptweak.com/en/aso-blog/google-play-ranking-factors), [MobileAction](https://www.mobileaction.co/blog/google-play-store-ranking-factors/)). Google: "Use SEO best practices in your 'Description,' but be mindful of… keyword spamming" ([Get discovered](https://support.google.com/googleplay/android-developer/answer/4448378?hl=en)). | Name, subtitle, keywords, category. Apple doesn't list the description as a ranking input. |
| Keyword repetition | No official number. Practitioners suggest repeating each core term a few times (up to about 5) across the description, in natural sentences. Google calls repetitive keyword lists a policy violation. | n/a (description not indexed) |
| Short description | Indexed, but it also appears beside screenshots and in other surfaces, so Google wants a clear benefit statement first | Subtitle (30) plays the same role |
| Developer name | Users can search by it. Ranking weight is anecdotal (third-party). | Not listed by Apple |
| Reviews, ratings, quality | Google says apps are "ranked based on a combination of ratings, reviews, downloads, and other factors" ([Get discovered](https://support.google.com/googleplay/android-developer/answer/4448378?hl=en)). Android vitals: user-perceived crash rate >1.09% overall or >8% on one phone model, and ANR rate >0.47% / 8%, "may reduce the visibility" and add a listing warning (28-day average) ([Android vitals](https://developer.android.com/topic/performance/vitals)). Third parties also cite retention, uninstalls and update cadence. Review *text* being indexed isn't documented. | User behavior (downloads, ratings) per Apple |
| Localization | Machine translations are auto-generated; human translations rank better per Google | Per-locale metadata, plus some cross-locale keyword indexing |
| Keyword-specific pages | Custom listings for search keywords (above) | Custom product pages (with keywords since 2025) |

Implication for TripCache: on Play, the full description is ranking surface. Use its 4,000 characters for honest, feature-led sections with the core terms each repeated a few times: trip itinerary, travel organizer, flight tracker/flight status, booking confirmations/email, cancellation deadline, travel documents, offline, travel budget. Keep the title "brand + strongest generic term". Keep Android vitals below the thresholds before buying traffic.

## 5. What gets a listing rejected or limited

**Rejected or suspended (policy or upload validation):**

- Title over 30 chars, or emoji, ALL CAPS, "#1/Best/Free/New/No Ads" in the title, icon or developer name.
- Unattributed testimonials, or competitor names and comparisons in the text.
- Keyword lists.
- Misleading functionality claims, or graphics that don't reflect the app.
- Third-party trademarks or logos without permission (IP and impersonation).
- Implying an official relationship with another company.
- An inaccurate Data safety form.
- Wrong asset formats: alpha in screenshots or the feature graphic, a feature graphic that isn't exactly 1024×500, screenshots outside 320–3840 px or over 2:1, an icon that isn't 512×512 or is over 1 MB.

**Not rejected, but limits promotion:**

- Fewer than 4 phone screenshots at 9:16 / ≥1080×1920.
- Taglines over 20% of the image.
- Device frames.
- Ranking, award or price words in graphics.
- CTAs.
- A busy status bar.
- A feature graphic with key content in the cut-off zones.
