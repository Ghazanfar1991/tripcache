# TripCache competitor research (Semrush, October 2026)

Pulled 2026-10-05 from Semrush (current monthly snapshot). US database unless noted. Raw files are in `raw/`; the file numbers are shown in brackets.
**Fact** = read directly from Semrush output. **Inference** = my interpretation.

## 1. Where TripCache stands (fact)

| Metric | Value | Source |
|---|---|---|
| Semrush Rank (US) | 7,750,985 | [01] |
| Organic keywords: US / AU / UK / CA | 83 / 15 / 9 / 14 (US count includes the same keyword on several URLs) | [01-05] |
| Est. organic traffic US | 12/mo | [01] |
| Authority Score | 8 | [54] |
| Backlinks / referring domains | 217 / 153 (181 follow) | [54] |
| Best-quality referring domains | apple.com (App Store), producthunt.com (AS 52), dataforseo.com (AS 47). Almost everything else is AS ≤ 24 and mostly spam or directory sites. | [58] |

Semrush's "organic competitors" for trip-cache.com (by competitor relevance) [06]: tripcase.app (0.57), tripcase.com, tripcaseconnect.com, globaltravelassociates.com, tripeasy.com, tripmanager.com, travel-sane.com, tripsy.app, tineo.ai, travo.me, lambus.com, tripcast.co, mtrip.com, folio.id, apurplelife.com, wanderingkenzie.com, tripmapper.co, tripplans.co, tripsource.com, stippl.io, webcatalog.io. The list is driven by TripCase queries, because almost all of TripCache's keyword footprint today is TripCase-related.
- *Inference:* tripcase.app ranks #2 for "tripcase" [40] and looks like an unofficial lookalike site, not the real TripCase. Do not treat it as a product competitor.

## 2. Chosen product-competitor set

I chose these as real post-booking organizer or itinerary-app competitors. tripit.com and wanderlog.com have little keyword overlap with TripCache today, but they own the category.

| Domain | Role | US organic keywords | US organic traffic/mo | Top-3 / 4-10 / 11-20 positions | Authority Score | Referring domains | Source |
|---|---|---|---|---|---|---|---|
| tripit.com | Direct competitor (email-forwarding itinerary organizer, Pro tier) | 7,292 | 34,053 | 370 / 861 / 1,263 | 50 | 15,713 | [07][55] |
| wanderlog.com | Category leader for planning and itineraries | 2,690,795 | 1,743,502 | 26,265 / 224,896 / 625,146 | 78 | 26,654 | [07][55] |
| tripsy.app | Direct competitor (iOS-first trip organizer, email import) | 111 | 1,195 (about 87% from the brand query "tripsy") | 5 / 6 / 21 | 26 | 719 | [07][38][55] |
| folio.id | Adjacent competitor (digital wallet: passes, documents, bookings) | 756 | 279 | 12 / 149 / 169 | 26 | 588 | [07][39][55] |

Adjacent and noted, not in the core set:
- **flighty.com** (flight tracker): 38,177 keywords, 76,472 visits/mo [62]. It grows through programmatic airport pages and compare pages [63]. Note that flightyapp.com is the wrong domain; it has only 161 keywords [07].
- **stippl.io** (trip planner): 5,011 keywords, 21,831 visits/mo [06], AS 34, 1,053 referring domains [55].
- **tripcase.com**: only 6 keywords and 11 visits/mo [07]. The product is winding down, and its demand is now being captured by others (see section 4).
- **tineo.ai**: 118 keywords, 206 visits/mo [07]. Too small to matter yet.

## 3. What earns each competitor's traffic (fact, with my reading)

### TripIt [31][32][33][34]
- **The homepage `/web` takes 70.9% of traffic** (1,799 keywords). It ranks for broad terms: "trip itinerary" #1, "travel itinerary planner" #3, "travel planner" #4, "itinerary planner" #4, "travel itinerary" #6, "trip organizer app" #6, "app itinerary" #6, "trip planner" #8, "travel itinerary app" #8, "best travel apps for planning" #8-9, "travel apps" #13.
- **Utility travel-tips blog.** The online passport renewal post (912 visits, 226 keywords), power-bank airline rules (584), best carry-on luggage (272), how early to get to the airport (255), flying standby (241), lost luggage (122), plus airport guides (YYZ, LHR, PHX, MDW, NCE, ZRH) and loyalty-program guides (Alaska, Southwest, United, AA).
- **Free tools hub.** `/web/free` has 385 keywords. `/de/web/free/road-trip-planner` is **#1 for "driving trip planner"** (2.9K/mo, KD 17) and brings 387 visits.
- **"Graveyard" capture pages for dead competitors:**
  - `/web/tripcase` brings 351 visits/mo. It is **#1 for "tripcase", "trip case", "tripcase login", "tripcase replacement" and "trip case app"**, and #2 for "tripcase alternative".
  - `/web/appintheair` is #6-7 for "app in the air".
- **Pro and pricing pages.** `/pro` brings 998 visits/mo and `/web/pro/pricing` 279. `/web/pro/sap-concur` targets business travellers.
- **Help center.** Articles on inbox sync, adding plans, seat maps and airport maps also earn traffic.

### Wanderlog [35][37]
- **Homepage.** It is #1-3 for "itinerary" (135K), "travel planner" (8.1K), "travel itinerary" (5.4K), "vacation planner" (5.4K), "trip planning" (4.4K), "itinerary planner" (3.6K), "travel itinerary planner", "best travel apps for planning" (#1), "itinerary maker", "travel calendar" and "road trip planner free".
- **The rest is programmatic.** Millions of `/place/details/...` and `/list/geoCategory/...` "best X in Y" pages make up most of its 1.7M visits/mo.
- **Its own comparison page ranks only #6** for "wanderlog vs tripit" [41], behind Reddit, Facebook, Rick Steves and TripAdvisor forums and a small app (stardrift.ai).

### Tripsy [38]
- **The homepage targets organizer terms but sits on pages 2-3:** "itinerary app" #19, "travel organizer app" #17, "trip organizer app" #21, "travel itinerary app" #26, "trip planning software" #28.
- **It runs a `/tripcase` capture page:** #9 "tripcase", #8 "tripcase login", #12 "tripcase mobile app".
- **Its `/pro` page tries to catch TripIt price queries:** "tripit pro cost" #66, "how much is tripit pro" #65, "tripit cost" #55.

### Folio [39]
- **Blog-driven.** Wallet how-tos bring its traffic: adding insurance, gift and loyalty cards to Apple Wallet, Google Wallet alternatives, ID scanner apps.
- **Travel comparison posts:**
  - "App in the Air alternative" ranks #9-10 for "app in the air".
  - "TripCase alternative" ranks #13 for "tripcase" and #9 in the SERP [40].
  - "Best apps to plan travel" ranks #22 for "best travel apps for planning".
  - "Digital passport copies" ranks **#4 for "digital copy of passport"**.

### Flighty [62][63]
- The homepage takes 41.5% of traffic.
- Programmatic `/airports/{code}` and `/airports/{code}/tv` departure-board pages make up most of the rest.
- It also has `/pricing`, `/passport`, and compare pages such as `/compare/app-in-the-air` (#6 for "app in the air" [61]).

## 4. SERP incumbents: not competitors, but they set the ceiling (fact)
From the top-10 checks [40-50, 60-61]:
- **Reddit** is #1-3 on almost every checked query: "tripcase", "wanderlog vs tripit", "best travel apps for planning", "best travel itinerary app", "trip organizer app", "hotel cancellation policy", "wanderlog reviews", "app in the air".
- **App Store and Google Play listings** (Wanderlog) hold #1-6 on app queries ("trip organizer app" #1 is the App Store Wanderlog page).
- **Forums:** Facebook groups, Rick Steves Community and TripAdvisor forums.
- **Templates:** Canva (#1), gdoc.io, Notion, Adobe Express and Pinterest for "travel itinerary template".
- **Physical goods:** Amazon, Target, Walmart and Pack Hacker for "travel document organizer". This is the wrong intent for an app.
- **Hotel policy:** Hilton help center, hotels.com, a trade association (calodging) and the travelmarketreport chain-policy list.
- **Flight time:** single-purpose tools (airplanemanager, travelmath, flighttimecalculator.org, geotimedate).
- **Google itself:** "google trips" has KD 82. Google Flights answer boxes handle city-pair flight times (*inference* from the Flights SERP feature on those keywords).

## 5. What TripCache can learn (inference)
1. **Own the shutdown traffic with one page per dead product.**
   - TripIt's single `/web/tripcase` beats TripCache's five TripCase URLs (/blog/tripcase-shutdown-what-now, /blog/tripcase-alternative-2025, /alternatives/tripcase, /blog, /pricing all rank in GSC and Semrush).
   - Consolidate into /blog/tripcase-shutdown-what-now, which already ranks best (GSC 7.5 for "tripcase"), and 301 the rest. Repeat the play for App in the Air (590/mo, KD 12), where only TripIt, Flighty, Folio and byairapp compete.
2. **Free tools beat blog posts for a low-authority domain.**
   - TripIt's road-trip tool and the flight-time tool sites show that a focused tool can take #1 with almost no authority.
   - Prioritise in this order: the flight arrival/time calculator (3.6K/mo KD 31), itinerary templates (Docs and Sheets, KD 10-20), the hotel cancellation policy guide with the existing calculator, then a jet lag calculator.
3. **A programmatic layer tied to a product feature.**
   - Wanderlog and Flighty grow on templated pages.
   - TripCache's natural equivalent is "{brand} cancellation policy" pages (Airbnb 6.6K, Booking.com 2.9K, Vrbo 2.4K, Enterprise 2.4K, Marriott 1.6K, Avis 1.6K, Hertz 1.3K US). Each page ends with "get reminded before the free-cancellation deadline".
4. **Comparison SERPs are weak.**
   - "wanderlog vs tripit" (4.4K, KD 22) and "tripit pro" (1.9K, KD 33) are won by forums and hobby blogs. A three-way comparison and an honest "Is TripIt Pro worth it? (and a $49.99/yr alternative)" page can rank.
   - Tripsy already tries the TripIt-price angle but ranks on page 6-7.
5. **The listicle SERP is soft.** Small blogs hold the top 5 for "best travel apps for planning" (US and AU). TripCache's listicle already gets GSC position ~6 with 0 clicks, so the title/snippet and freshness are the fix, not more pages.
6. **Do not copy TripIt's passport and airport content yet.** It brings traffic but unrelated intent. Revisit only after the P1 items are done.
