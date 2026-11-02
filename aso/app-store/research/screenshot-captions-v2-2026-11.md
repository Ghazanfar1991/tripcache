# Screenshot captions v2 (2026-11-01)

**Status:** recommendation only. Nothing has been uploaded, committed or pushed. This is the second round of work on the captions in `trip-cache-app/design-assets/store-screenshots-2026-11/sources/` (`build.py` `IOS_FRAMES`, `DUO_INNER`, `DUO_OUTER`; `duo_lifestyle.py`; `play_build.py` `FRAMES`). First round: [`screenshots-new-features-2026-11.md`](screenshots-new-features-2026-11.md).

**The owner's brief for this round:**
- Captions should sell the app, not explain the device.
- Every frame, Duo included, has to work as a standalone pitch to someone who has never heard of TripCache.
- iPhone Duo is shown by the imagery. At most it gets a light touch in the subtext.

## TL;DR

1. **On Apple, caption text is at best a weak, unconfirmed ranking signal.**
   - Appfigures (June 2025) says Apple extracts caption text.
   - ConsultMyApp/APPlyzer tested 64 caption phrases and found "no strong evidence" of broad indexing.
   - Apple has never confirmed either way.
   - So: write for conversion, and use real search wording only where it costs nothing in clarity.
2. **On Google Play, there is no credible evidence that text in screenshots is OCR'd for search.** The only Play-specific source found (AppTweak) says it isn't indexed. Captions there are purely for conversion.
   - Play's screenshot rules do matter: taglines take no more than 20% of the image, and there are no performance or promotional words ("Best", "#1", "Top", "New", "Discount", "Sale") and no price or promotional information. That means **"Free." is dropped from every Play subtext**.
3. **TripCache's app preview is live (`videoUrl` is present on the US and AU pages, 2026-11-01).**
   - Apple's "first one to three images" rule is worded for when *no* preview exists.
   - With a preview, it takes the first slot. So in portrait search results, iPhone frames 1–2 sit beside the video. This is my reading of Apple's wording, not a documented statement.
   - Frames 1 and 2 therefore carry the search impression, and they should stay the strongest free benefits: the itinerary and free-cancellation reminders.
4. **Duo set: every headline is rewritten to sell the app.** "Side by side", "open like a book", "closed or open" and "on a globe" are all gone. Each Duo headline now matches an iPhone selling point.
   - Duo inner frames render once, with no locale split, so their headlines avoid words spelled differently in AU/UK English.
   - The tent frame now leads with the traveller benefit: "Watch your flight, *hands-free*".
5. **Small changes on iPhone and Play:**
   - Two iPhone headlines were over the ~34-character limit (flight tracker, 39; calendar, 39). Both are shortened.
   - AI subtext changes from "Works with…" to an action: "Connect ChatGPT, Claude or another AI assistant to your trips."
   - Documents and budget subtexts now lead with the benefit.
   - iPhone order is unchanged. On the Duo, I recommend one reorder (below).

## A. Evidence

### A1. Search demand

**Semrush returned `no_api_units` again on 2026-11-01**, so there are no new volumes. Web volumes below come from the existing 2026-10 sprint and `keyword-data-2026-10-06.csv`. App Store evidence is live autocomplete (MZSearchHints) checked today. Play autocomplete couldn't be re-queried: the old `market.android.com/suggest` endpoint now returns 404. The Play column reuses `../../google-play/research/keyword-data-2026-10-06.csv`.

| Term | App Store autocomplete, US (today) | AU (today) | Play autocomplete (2026-10-06) | US web volume / App Store top-10 median ratings | Caption use |
|---|---|---|---|---|---|
| itinerary planner | #1 after "itinerary" | #2 | 4 chars, #2 | 3.6k / 14.3k | Name. iPhone 1 supports it via "itinerary" |
| travel itinerary | "travel itinerary planner", "travel itinerary" | yes | 8 chars, #4 | 5.4k / 5.2k | **iPhone 1 / Play 1 headline** |
| trip planner | "trip planner", "trip planner calendar", "trip planner budget" | yes | 6 chars, #2 | 33.1k / 35.7k | Not winnable. "calendar" and "budget" variants back up frames 7 and 9 |
| trip organizer / organiser | #1 after "trip org" | "trip organiser" #1 | 7 chars, #2 | – / 5.6k US, 709 AU | Subtitle. Frame 1's "organized/organised" echoes it |
| itinerary app | "itinerary app" #1 | yes | 11 chars, #1 | 590 | Covered by name + "app" |
| flight tracker | #1 after "flight track" | "flight tracker free/australia" | 8 chars | – / 93k | Unwinnable for rank, but it's the word users know. **iPhone 5 / Play 5 headline** |
| travel documents | "travel document vault / organizer / wallet", "travel docs" | same | 9 chars, #1 | – / 45.6k | **Frame 8 headline** |
| trip budget / travel expense | "trip budget", "travel expense tracker" | "travel expenses" | 8–9 chars | – / 919–6.4k | **iPhone 9 headline** |
| travel history | "travel history", plus an app named "travel history: visa forms pdf" | same | 9 chars, #4 | – / 5k | Proves the visa-history use case. **Frame 10** |
| travel calendar | "travel calendar" (results are day counters) | – | – | 2.4k web | Weak intent on iOS. Fine as caption wording (frame 7) |
| ai travel / ai trip / ai itinerary | "ai travel planner", "ai trip planner", "ai itinerary planner" (Layla, Mindtrip, Roameo…) | same | – | 30 ("ai travel planner app") | **Different intent** (AI that writes itineraries). Keep "AI assistant", not "AI planner" |
| chatgpt trip, trip remind, free cancel, booking email | none, or "trip reminder" only | – | not suggested | – | No search demand. Sell these with benefit wording |
| packing | "packing list", "packing list checklist" | – | – | – | **TripCache has no packing feature.** Don't caption it |
| live activ | only widget apps | – | – | – | Don't put "Live Activity" in a headline |

**Thin:** there are no Apple Search Ads popularity scores (no account), no AU web volumes, and no fresh Play suggestions.

### A2. Competitors' first three frames (App Store US, downloaded 2026-11-01)

| App | Frame 1 | Frame 2 | Frame 3 | Pattern |
|---|---|---|---|---|
| TripIt | "Organize your trip" | Press logos + "4.8 Stars, 200k+ ratings" | "Get real-time flight alerts on your trip" (PRO FEATURE banner) | Plain verb-led sentences |
| Wanderlog | "Your travel plans and itinerary, simplified" | "Plan, organize, and map your trip in a document designed just for travel" | "Easily import your flight and hotel reservations" | Keyword-rich sentences (itinerary, organize, import) |
| Flighty | "First-class flight tracker / Fly smarter." + Apple Design Award | NYT quote | "Live Activities / Dynamic Island: Track your flight status on your lock and home screen" | Claim, then social proof, then feature |
| Tripsy | "Travel Planner" + Editors' Choice / App of the Year | "Your Travel Companion" | "Trip Organizer" | One keyword noun per frame |
| byAir | "Stay ahead of **every** flight" + "300K travelers" | "INSTANT UPDATES / Gate changed. You knew first." | "BYAIR PREDICT / A heads up — hours before airlines" | Short punchy benefit, one coloured word |
| Google Travel | No standalone app (part of Google Search/Maps) | – | – | n/a |
| TripCase, App in the Air | Shut down (byAir is App in the Air's successor) | – | – | – |

**Takeaways:**
- Every leader's frame 1 states the core job in plain words, and most use a search word (organize, itinerary, flight tracker, travel planner). TripCache's "Your travel itinerary, *organized*" already does this.
- Nobody leads with free-cancellation reminders, email-to-trip or AI. Those are TripCache's distinct hooks.
- Frames 2–3 at the big apps are often social proof. TripCache has 0 ratings and can't do that (and Play forbids it). The next-best proof is a concrete, specific benefit ("7 days, 2 days, 1 day or on the day").
- byAir's style (short benefit line, one highlighted word) is the closest match to TripCache's gold-phrase style, and it reads fastest.

Play: TripIt's Play frame 2 is a caption-only panel ("Organize your trip"), and frame 3 is press logos and stars. Wanderlog mirrors its iOS set. Detail is in `../../google-play/research/play-competitors-and-rules-2026-10-06.md`.

### A3. Platform rules (with sources)

**Apple**
- Product page: up to 10 screenshots. "The first one to three images will appear in search results when no app preview is available." Make the first images "highlight the essence of your app". [developer.apple.com/app-store/product-page](https://developer.apple.com/app-store/product-page/)
- Review Guideline 2.3.3: "Screenshots should show the app in use…"
- 2.3.7: don't "pack any of your metadata with trademarked terms, popular app names, pricing information, or other irrelevant phrases". So ChatGPT and Claude stay in subtext, never in a headline, and no keyword stuffing.
- 2.3.10: no "names, icons, or imagery of other mobile platforms". [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Asset best practices: avoid pricing, unverifiable awards and Apple recognitions. [Asset best practices](https://developer.apple.com/app-store/asset-best-practices/) (cited in round 1). "Free." in iOS subtext is a mild pricing reference; the first round kept it, and it's common on live listings. Low risk, but it's the first thing to cut if Review objects.
- **Caption indexing:**
  - For: Appfigures, "The Biggest App Store Algorithm Change is Here" (June 2025): "Apple is now extracting text from your app's screenshot captions". Their caveats: Apple reads only "some" of the text, and it's a weaker signal than core metadata. [appfigures.com](https://appfigures.com/resources/guides/app-store-algorithm-update-2025)
  - Against: ConsultMyApp/APPlyzer tested 64 caption-derived phrases across 8 apps. 36 didn't rank, 27 were explained by other metadata, and 1 anomaly was found. Verdict: "no strong evidence Apple is broadly indexing screenshot titles". [consultmyapp](https://consultmyapp.squarespace.com/blog/-is-apple-now-indexing-screenshot-titles-on-the-app-store)
  - Apple has made no statement. Vendor blogs claiming confirmation cite no source.
  - **Conclusion:** captions are a conversion asset first. Using real search words is a free option, not a strategy.

**Google Play**
- Screenshots ([Play Console Help 9866151](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en)):
  - "Taglines should not take up more than 20% of the image."
  - "Do not include any content that reflects or suggests Google Play performance": "Best", "#1", "Top", "New", "Discount", "Sale", "Million Downloads". Testimonials, accolades, awards, and price or promotional information are also excluded.
  - No calls to action ("Download now"…).
  - Screenshots "must demonstrate the actual in-app or in-game experience". In stylised sets, UI should take priority in the first three.
  - Alt text: up to 140 characters per screenshot.
- Metadata policy (no implied endorsement, no unpermitted third-party logos): [answer 9898842](https://support.google.com/googleplay/android-developer/answer/9898842?hl=en)
- OCR: AppTweak says screenshot text isn't indexed by Play search, and that the indexed fields are the title, short description and long description ([AppTweak](https://www.apptweak.com/en/aso-blog/how-to-add-keywords-to-apps-on-google-play)). No study or Google statement says otherwise. **The claim that Play OCRs screenshots isn't credible on current evidence.** The alt text field is a better place to put keyword wording, and that's worth doing at upload.

### A4. How TripCache's metadata fits (live, 2026-11-01)

| | US | AU |
|---|---|---|
| App Store name | TripCache: Itinerary Planner | same |
| App Store subtitle | Travel Organizer & Trip Alerts | Holiday & Travel Organiser |
| Keyword field (per `listing/proposed-2026-10.md`; can't be read publicly) | vacation, flight, tracker, booking, wallet, documents, budget, expense, reminder, maker, manager, passport, visa | tracker, booking, wallet, documents, budget, expense, reminder, maker, manager, passport, visa, organizer, log |
| Play name / short description | TripCache: Itinerary Planner / "Trip organizer and itinerary maker with travel reminders, documents and budget" | (en-US only) |

The captions echo these words without repeating them in every frame: itinerary + organized (frame 1), free cancellation + reminder (2), booking (3), flight tracker (5), travel documents (8), budget/expense (9), visa/travel history (10).

## B. Writing rules used

- **Benefit first, app first.** Each headline says what TripCache does for a traveller. Device and layout words appear only in the art or, at most, once in a subtext.
- **Readable in under 2 seconds:** headlines 24–34 characters (iPhone/Play), and at most 48 on the Duo landscape (the longest used is 39). Subtext at most 70 (the longest used is 68).
- **One gold `<em>` phrase per headline**, and it's the benefit or the search word.
- **Plain words.** No "MCP", "ICS", "Live Activity" or "En Route" in headlines. "En Route" is dropped from the tent subtext because a new user doesn't know the name.
- **Spelling:** only iPhone frame 1 differs (organized/organised). Duo frames have no locale split, so they avoid variant words entirely. Play is en-US only today.
- **No "Free" on Play** (price/promotional information). Keep "Free." on iOS subtexts where the feature is in Basic.
- **ChatGPT and Claude only in subtext**, never in a headline, with no logos.

## C. Frames 1–3: options and recommendation

### iPhone (and Play, same copy)

| Frame | Option A (recommended) | Option B | Option C |
|---|---|---|---|
| 1 itinerary | Your travel itinerary, *organized* (AU *organised*), 32 | Every booking, *one itinerary*, 28 | All your trips, *organized*, 25 |
| 2 free cancellation | Never miss a *free cancellation*, 30 | Cancel for free, *right on time*, 30 | Never miss a *check-in* or deadline, 33 |
| 3 email import (Pro) | Forward booking emails. *Get a trip.*, 35 (live; it renders on two lines) | Forward an email. *Get a trip.*, 29 | Your bookings, *added for you*, 28 |

**Why A:**
- **Frame 1:** A contains "travel itinerary" (autocomplete #2–9 US/AU) plus "organized", which echoes the subtitle. It's the only option that tells a stranger the category and the benefit at once. B is punchier but loses "travel" and the organiser echo. Keep B as the Play feature graphic line (already used there).
- **Frame 2:** no competitor uses this hook, it saves money, it's free, and it's concrete. B is clever but "cancel" alone reads as subscription cancelling (App Store results for "cancellation" are subscription apps). C dilutes the hook.
- **Frame 3:** A is the clearest two-step promise and matches what competitors' searchers expect ("import reservations"). B is shorter if the extra character ever wraps badly. C (byAir-style) is vaguer about *how*.
- **Order:** keep 1–3 as is. With the app preview in slot 1, frames 1–2 are the two images shown in search, and both are free benefits that match the "itinerary / organizer" queries.

### iPhone Duo (frame 1 is the only image shown in search: landscape inner)

| Frame | Option A (recommended) | Option B | Option C |
|---|---|---|---|
| 1 home + live map | Every booking, *one itinerary*, 28 | Every trip you've booked, *in one place*, 36 | Your trips and flights, *all in one app*, 35 |
| 2 free cancellation | Never miss a *free cancellation*, 30 | — | — |
| 3 email import (Pro) | Forward booking emails. *Get a trip.*, 35 | Forward an email. *Get a trip.*, 29 | — |

**Why:**
- **Frame 1:** A is spelling-neutral (the Duo has no AU split), uses "itinerary" (the name keyword) and matches the iPhone and Play feature-graphic story. The subtext adds the Duo touch: "…with the next flight live."
- **Frames 2–3:** these mirror the iPhone set, so a Duo buyer gets the same pitch.

## D. Final captions

Character counts exclude the `<em>` tags. "Target" is the search word or selling point the frame carries.

### D1. iPhone, 10 frames (`ios/<size>/<locale>/`): order unchanged

| File | Headline (US) | AU/UK | Subtext | H / S chars | Target |
|---|---|---|---|---|---|
| 01-itinerary | Your travel itinerary, `<em>organized</em>` | …`<em>organised</em>` | Flights, hotels, cars and plans for every trip you've booked. | 32 / 61 | travel itinerary, organizer |
| 02-free-cancellation | Never miss a `<em>free cancellation</em>` | – | Get reminded 7 days, 2 days, 1 day or on the day. Free. | 30 / 55 | cancellation reminder |
| 03-email-import (Pro) | Forward booking emails. `<em>Get a trip.</em>` | – | TripCache drafts each confirmation for you to check. | 35 / 52 | booking import |
| 04-ai-assistants (Pro) | Your trips, in your `<em>AI assistant</em>` | – | Connect ChatGPT, Claude or another AI assistant to your trips. | 32 / 62 | AI assistant (not "AI planner") |
| 05-flight-tracker (Pro) | Live `<em>flight tracker</em>` & alerts | – | Delays, gate changes and arrival times on your Lock Screen. | 28 / 59 | flight tracker, flight alerts (was 39 chars) |
| 06-siri-shortcuts | Ask Siri about your `<em>next flight</em>` | – | Flights, gates and trips in Siri, Shortcuts and Spotlight. Free. | 31 / 64 | Siri (conversion only) |
| 07-live-calendar | Travel calendar, `<em>always up to date</em>` | – | Trips sync to Apple, Google or Outlook Calendar. Free. | 34 / 54 | travel calendar, "trip planner calendar" (was 39 chars) |
| 08-documents | Travel documents, `<em>locked</em>` | – | Passports, visas and tickets behind a PIN, kept with the trip. | 24 / 62 | travel documents (vault/wallet) |
| 09-budget | Travel `<em>budget</em>` & expense tracker | – | Track spending in 150+ currencies and see what the trip really cost. | 31 / 68 | travel budget, travel expense tracker |
| 10-visa-export | Export travel history `<em>for visas</em>` | – | Visa summaries, travel history and expense reports as PDF or CSV. | 31 / 65 | travel history, visa |

**Changes from the current files:**
- 04: subtext
- 05: headline and subtext
- 07: headline and subtext
- 08: subtext
- 09: subtext
- Everything else is unchanged.

**Reorder:** none. AI stays at 4 because it's the differentiator people see when they open the page. Moving the flight tracker up wouldn't help, because "flight tracker" isn't winnable for search.

### D2. iPhone Duo inner, 9 frames (`ios-duo/inner-landscape-2853x2007/`): one reorder recommended

Proposed order: home, free cancellation, email import, flight, trip day by day, AI, calendar, documents, history. This mirrors the iPhone story (core, then the free hook, then the Pro hook). The flight board and the trip timeline move after email import, so the second and third frames sell the same things as iPhone frames 2–3.

| New # | File (current name) | Pro | Headline | Subtext | H / S chars | Target |
|---|---|---|---|---|---|---|
| 01 | 01-trips-side-by-side → rename `01-itinerary` | – | Every booking, `<em>one itinerary</em>` | Flights, hotels, cars and plans, with the next flight live. | 28 / 58 | itinerary |
| 02 | 04-free-cancellation → `02-free-cancellation` | – | Never miss a `<em>free cancellation</em>` | Get reminded 7 days, 2 days, 1 day or on the day. Free. | 30 / 55 | cancellation reminder |
| 03 | 05-email-import → `03-email-import` | Pro | Forward booking emails. `<em>Get a trip.</em>` | TripCache drafts each confirmation for you to check. | 35 / 52 | booking import |
| 04 | 02-arrivals-board → `04-flight-tracker` | Pro | Delays and gate changes, `<em>as they happen</em>` | Live progress, gate, seat and arrival time for every flight. | 39 / 60 | flight tracker / alerts |
| 05 | 03-trip-open-like-a-book → `05-trip-day-by-day` | – | Your whole trip, `<em>day by day</em>` | Flights, stays and plans in order, for every day of the trip. | 27 / 61 | trip itinerary |
| 06 | 06-ai-assistants | Pro | Your trips, in your `<em>AI assistant</em>` | Connect ChatGPT, Claude or another AI assistant to your trips. | 32 / 62 | AI assistant |
| 07 | 07-live-calendar | – | Travel calendar, `<em>always up to date</em>` | Trips sync to Apple, Google or Outlook Calendar. Free. | 34 / 54 | travel calendar |
| 08 | 08-documents | – | Travel documents, `<em>locked</em>` | Passports, visas and tickets behind a PIN, kept with the trip. | 24 / 62 | travel documents |
| 09 | 09-history-globe → `09-travel-history` | – | See `<em>everywhere you've been</em>` | Your travel history by country, ready to export for visa forms. | 26 / 63 | travel history |

**Layout words removed:**
- "side by side"
- "open like a book"
- "on a globe"
- "on one page… on the other"
- "sealed on this device"

The only Duo-flavoured touch is frame 1's "with the next flight live", which describes what the image shows. If renaming files is a nuisance, keep the current names and change only the `DUO_INNER` order. The upload order is what matters.

**Spelling:** no AU/UK variants are needed in any Duo frame.

### D3. iPhone Duo outer

| File | Pro | Headline | Subtext | H / S chars | Target |
|---|---|---|---|---|---|
| outer-portrait-1398x2034/01-closed-same-trip (suggest renaming `01-next-trip`) | – | Your next trip, `<em>at a glance</em>` | Upcoming trips and live flights, even with iPhone Duo closed. | 27 / 61 | itinerary at a glance (Duo as the light touch) |
| outer-landscape-2034x1398/02-en-route-tent (`duo_lifestyle.py`) | Pro | Watch your flight, `<em>hands-free</em>` | Live progress and arrival time on your tray table, with iPhone Duo. | 29 / 67 | live flight progress |

**Tent rendering note:** `duo_lifestyle.py` hard-codes `<h1>Stand it up.<br><em>Watch your flight.</em></h1>`. The new copy is `Watch your flight,<br><em>hands-free.</em>`, or the same without the full stop to match the other headlines. "En Route" moves out of the caption; keep it in the description and What's New.

**Fallback** if the owner wants the posture word kept: "Your flight, live on the *tray table*" (35).

### D4. Google Play, 8 frames (`android/phone-1080x1920/`): order unchanged

| File | Pro | Headline | Subtext | H / S chars | Target |
|---|---|---|---|---|---|
| 01-itinerary | – | Your travel itinerary, `<em>organized</em>` | Flights, hotels, cars and plans for every trip you've booked. | 32 / 61 | travel itinerary, trip organizer |
| 02-free-cancellation | – | Never miss a `<em>free cancellation</em>` | Get reminded 7 days, 2 days, 1 day or on the day. | 30 / 49 | travel reminder |
| 03-email-import | Pro | Forward booking emails. `<em>Get a trip.</em>` | TripCache drafts each confirmation for you to check. | 35 / 52 | booking import |
| 04-ai-assistants | Pro | Your trips, in your `<em>AI assistant</em>` | Connect ChatGPT, Claude or another AI assistant to your trips. | 32 / 62 | AI assistant |
| 05-flight-tracker | Pro | Live `<em>flight tracker</em>` & alerts | Delays and gate changes, plus your next flight from the app icon. | 28 / 65 | flight tracker, flight alerts |
| 06-live-calendar | – | Travel calendar, `<em>always up to date</em>` | Trips sync to Google, Outlook or Apple Calendar. | 34 / 48 | travel calendar |
| 07-documents | – | Travel documents, `<em>locked</em>` | Passports, visas and tickets behind a PIN, kept with the trip. | 24 / 62 | travel documents |
| 08-visa-export | – | Export travel history `<em>for visas</em>` | Visa summaries, travel history and expense reports as PDF or CSV. | 31 / 65 | travel history |

**Changes:**
- 02 and 06: "Free." removed (Play's price/promotional rule)
- 04: subtext
- 05: subtext
- 06: headline
- 07: subtext

**Upload step worth adding:** Play alt text (up to 140 characters) for each frame, written with the search phrases. For example: "TripCache travel itinerary showing upcoming trips with flights, hotels and a live flight". Alt text is the one place on Play where image keywords plausibly matter.

**Reorder:** none. Frames 1–3 are UI-led, as Play recommends.

## E. Open questions / where evidence is thin

- No fresh Semrush data, no Apple Search Ads popularity scores, no fresh Play autocomplete.
- There's no per-frame conversion data on either store, and traffic (~35 page views a month on iOS) is too low for a product page optimization test. The ordering is judgement, not measurement.
- The claim that frames 1–2 show beside the preview is inferred from Apple's "when no app preview is available" wording. Check by searching "TripCache" on an iPhone.
- "Free." on iOS is low risk but not zero (Apple's asset guidance says to avoid pricing).
- Accuracy checks carried over from round 1:
  - Siri phrasing works as shown.
  - Calendar sync works in Apple, Google and Outlook calendars for Basic users.
  - ChatGPT custom connectors exist for typical plans.
  - The Android launcher shortcut shows the next flight. The current Play callout shows "QF 43 to Melbourne".
