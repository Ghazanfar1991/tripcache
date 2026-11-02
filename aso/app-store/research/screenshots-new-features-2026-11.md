# Screenshot refresh for the new features (2026-11-01)

> **Superseded for captions:** see [screenshot-captions-v2-2026-11.md](screenshot-captions-v2-2026-11.md). It has the second-round evidence, app-first Duo captions, Play wording without "Free", and the final caption table.

**Status:** recommendation plus finished files. Nothing has been uploaded.
- The finished screenshots are in the app repo: `trip-cache-app/design-assets/store-screenshots-2026-11/` (README, contact sheet, build scripts).
- This file holds the research behind the captions, the order and the keep/replace calls.

## Decisions (what the files implement)

**iOS, 10 iPhone frames**
- Order: itinerary, free cancellation, email import (Pro), **AI assistants (Pro, new)**, flight tracker (Pro), **Siri & Shortcuts (new)**, **live calendar (new)**, documents, budget, visa export.
- Dropped: timeline, map, history.
- Sizes: 1320×2868 and 1206×2622, in en-US and en-AU.

**iPhone Duo**
- Its own screenshot slot: 9 inner-display frames (2853×2007) and 2 outer-display frames (1398×2034 portrait, 2034×1398 tent).
- No Apple badge is painted into the art. Uploading Duo screenshots is what makes Apple show its badge.

**Google Play, 8 phone frames (1080×1920)**
- Order: itinerary, free cancellation, email import, **AI assistants (new)**, flight tracker with a **launcher-shortcut callout**, **live calendar (new)**, documents, visa export.
- Dropped: timeline and budget. Budget stays in the description.
- No Gemini or AppFunctions copy yet.

**Copy rules applied**
- ChatGPT and Claude appear only in subtext ("Works with ChatGPT, Claude and other AI assistants."), never in a headline, subtitle or keyword field (Guideline 2.3.7).
- No logos are added.
- The caption says "AI assistant", not "AI trip planner": the planner wording draws a different search intent.
- Spelling differs only in frame 1 (organized/organised).

**Metadata follow-ups**
- Next What's New: list the Siri, AI, calendar and Duo features (2.3.12).
- iOS description: add an AI-assistants section with the line "ChatGPT is a trademark of OpenAI. Claude is a trademark of Anthropic. TripCache isn't affiliated with or endorsed by either."
- Play description: add AI and live-calendar sections.

---


Read-only research. Nothing was edited, uploaded or logged into. This builds on `tripcache-landing-page/aso/` (the 2026-10-06 App Store and Play reviews, the keyword CSVs and the Semrush 2026-10 sprint in `seo/research/semrush-2026-10/`). Scratch files (competitor JSON, 53 downloaded screenshots, contact sheets) are in `/private/tmp/claude-501/aso-shots/`.

## TL;DR

1. **No competitor uses any of these features in a screenshot caption yet.** Flighty, Tripsy and byAir already mention iPhone Duo, ChatGPT/Claude or MCP, but only in release notes or descriptions. Their screenshot sets are unchanged (checked all frames, 2026-11-01). A TripCache frame about AI assistants, Siri or a live calendar would be the first in the category.
2. **iPhone Duo screenshots have their own slot** (inner display 2007×2853, outer 1398×2034, in portrait or landscape). Uploading them is what makes the **"Made for iPhone Duo"** badge appear. So the Duo and En Route frames go in that slot and **don't use up any of the 10 iPhone frames**. That changes the replace-or-keep question a lot.
3. **App Store search demand for these features is close to zero.** Apple autocomplete has no suggestions for "chatgpt travel", "trip calendar", "flight shortcut", "iphone duo" or anything Siri-related. "ai travel" and "ai trip" do autocomplete, but those results are AI trip-generator apps (Layla, Roameo), which is a different intent. These frames should help people decide to download; they won't bring in search traffic. So frames 1–3 should keep the core organiser story, and the new features go in frames 4–7.
4. **Trademarks:** don't put ChatGPT or Claude in the subtitle or keyword field (Guideline 2.3.7) or use their logos. A plain compatibility line in the screenshot subtext and the description ("Works with ChatGPT, Claude and other AI assistants") matches what live, approved listings do (byAir on iOS and Play, Tripsy release notes). Keep the brand names out of the big headline.
5. **Semrush had no API units** (`no_api_units`), so I couldn't pull new volumes. I reused volumes from the 2026-10 sprint where they exist.

## A. Competitor listings (iTunes lookup API, US, 2026-11-01)

Source: `https://itunes.apple.com/lookup?id=<id>&country=us` and `/search?...&entity=software`. Feature hits come from scanning the description and the current release notes, then checking each hit in context (false positives such as "unfolds" and "subscription" were removed). Every app lists `iPhoneDuo` under supportedDevices, but that only means it's compatible, not optimized.

| App (id) | Ratings | Version / date | iPhone shots | Siri / Shortcuts | Widgets / Live Activity | AI / ChatGPT / Claude / MCP | Calendar | iPhone Duo |
|---|---:|---|---:|---|---|---|---|---|
| Flighty (1358823008) | 159.7k (4.85) | 4.11.3, Oct 26 | 10 | – | Yes | – | "Calendar sync" (Pro) | **Release notes:** "Flighty is ready for iPhone Duo. During a flight, prop iPhone Duo up like a tent to follow your progress hands-free." |
| TripIt (311035142) | 312.7k (4.84) | 21.1.0, Oct 19 | 10 | "Access this information hands-free with **Siri shortcuts**!" (description) | – | – | "Seamlessly sync travel plans to your calendar" | – |
| Tripsy (1429967544) | 5.7k (4.66) | 3.10.6, Oct 27 | 9 | – | – | Description section **"PLAN WITH YOUR AI ASSISTANT"**: "Connect Tripsy to a compatible AI assistant…". **Release notes name ChatGPT and Claude.** Also "requires Apple Intelligence" for cost extraction. Landing page tripsy.app/claude: "Plan smarter trips with Claude" | – | "Sync your Tripsy itinerary to your calendar" | – |
| byAir (6468928108) | 223 (4.86) | 2.42.4, Oct 28 | 8 | – | Yes | **"Personal Flight Tracking MCP… in Claude, Perplexity, Codex"** (iOS description); the Play description names "Claude, ChatGPT, Perplexity, Codex" | "Auto-scan Email & Calendar" | **Release notes:** "A new map-first layout with iPhone Duo support" |
| Wanderlog (1476732439) | 36.2k (4.90) | 2.227, Oct 25 | 10 | – | – | – (AI "import from anywhere" in notes) | – | – |
| KAYAK (305204535) | 499k (4.83) | 297.0.0, Oct 20 | 6 | – | – | – | – | – |
| Flightradar24 (382233851) | 676.6k | 11.14.1, Oct 28 | 10 | – | – | – | – | – |
| Mindtrip (6503107567) | 854 | 20.1, Oct 1 | 10 | – | – | AI-native ("personal travel assistant") | – | – |
| Layla (6758730467) | 214 | 1.0.38, Oct 26 | 4 | – | – | AI-native chat planner | – | – |
| Paths (6786985803) | 6 | 1.7.3, Oct 16 | 6 | – | – | Calls itself a "Trip & Itinerary **Agent**" in the name | – | – |
| **TripCache (6758403056)** | **0** | **1.4.4, Oct 23** | 10 | – | Yes | – | 1.4.4 notes: "Smarter Calendar Integration" | – |

App in the Air and TripCase are shut down and not listed (confirmed in the 2026-10-06 Play research). Searching "app in the air" now returns Flighty, TripIt and Flight Tracker +.

### Caption patterns (from the contact sheets, 53 frames)

- **Flighty** (10): dark cinematic style. Frame 1 is the claim plus awards ("First-class flight tracker / Fly smarter", Apple Design Award). Frame 2 is a press quote (NYT). Frame 3 is **Live Activities + Dynamic Island** with checkmarks. Later frames use a small coloured eyebrow pill ("#1 CAUSE OF DELAYS", "POPULAR", "FASTER THAN AIRLINES", "LIVE") over a 2–3-word headline. The last frame is an icon grid ("All this. And so much more!") that lists Calendar Sync, Email Forwarding and Home & Lock Screen Widgets. **No Duo frame yet**, even though the release notes advertise it.
- **Tripsy** (9): frames 1–5 are one- or two-word nouns ("Travel Planner", "Trip Organizer", "Activity Lists", "Flight Detail"), which reads as keyword captions. Frames 6–9 use an orange eyebrow plus a headline ("FLIGHT ALERTS / Never be Late", "NEW FEATURE / Expenses", "UNLIMITED / Documents"). **No AI frame**, even though the description has a section on it.
- **byAir** (8): bold 3–5-word headlines with one word coloured ("Stay ahead of **every** flight"), eyebrows ("INSTANT UPDATES", "SAVE TIME"), a review quote under the UI, and pills for third-party sources ("Import from Gmail", "Sync from Calendar"). The last frame is a feature list. **No MCP or Duo frame.**
- **TripIt** (10): dated 2022-era UI, a blue background, long sentence captions ("Get real-time flight alerts on your trip") and "★ PRO FEATURE ★" banners. Frame 2 is press logos and a star rating.
- **Wanderlog** (10): one solid colour per frame and long 3-line sentence captions. Uses the Gmail "G" logo in an import pill.
- **Shared patterns:** headlines run 2–6 words, with emphasis on one word or phrase (byAir colours a word; Flighty and Tripsy use an eyebrow). Feature order is almost always core value → strongest differentiator → live/flight → secondary features → a catch-all "and more" grid. Several apps break Apple's asset guidance (awards, press, ratings), and those listings are live, so enforcement is loose. That still isn't a reason for a 0-rating app to copy them.
- **TripCache's existing style** (Fraunces headline with one italic emphasised phrase, Inter subtext, and a "Pro" pill) already matches the stronger patterns. Keep it. A Flighty- or Tripsy-style eyebrow ("NEW", "FREE", "PRO") is the only addition worth trying, and the Pro pill already does that job.

### Google Play (public pages, `hl=en_US&gl=US`)

- byAir's Play description: "Personal Flight Tracking MCP: One link, every assistant… into **Claude, ChatGPT, Perplexity, Codex**, and more." This is live on Play, so naming the assistants as plain text in a Play description is tolerated today.
- TripIt (Play): mentions calendar sync only. Wanderlog, KAYAK and Flightradar24: none of the target features. Flighty has no Play listing (the page came back empty).
- No Play competitor mentions Gemini, AppFunctions or launcher shortcuts.

## B. Keyword angles (proxy data only)

**Semrush:** the MCP returned `no_api_units` ("does not have enough API units"), so I couldn't pull new US or AU volumes. Semrush only covers Google web search anyway, so it would only have been a proxy for app-store demand. The figures below come from the 2026-10 Semrush sprint already in the repo (`seo/research/semrush-2026-10/`, US web volume):

| Phrase | US web vol (Oct 2026) | Note |
|---|---:|---|
| calendar travel / travel calendar | 3,600 / 2,400 | Wanderlog ranks. The best web term for the live-calendar feature |
| flight status real time tracking | 880 | |
| app to track flight status | 480 | |
| email for tripit / email tripit | 170 | Shows people search *how* to forward bookings |
| ai travel planner app | 30 | Small; most AI demand is listicle-style ("best ai trip planner apps 2026", 50) |
| flight countdown widget / flight tracker widget android | 20 / 20 | |
| AU volumes for these | not in the sprint data | Couldn't measure |

**App Store autocomplete (MZSearchHints, US and AU storefronts, 2026-11-01):**

| Typed | Suggestions | Reading |
|---|---|---|
| ai travel / ai trip | layla – ai travel agent, docentpro: ai travel planner, roameo: ai trip planner, "ai trip planner travel" (AU) | Real demand, but the intent is AI that *generates* itineraries. TripCache's AI feature is "your AI assistant reads and updates your trips", a different job. Use "AI assistant", not "AI trip planner", or you'll get the wrong visitors |
| chatgpt / claude | Only the assistant apps themselves | People don't search the App Store for "chatgpt + travel" |
| chatgpt travel, trip calendar, itinerary calendar, flight shortcut | **none** | No App Store demand |
| travel calendar | nomadlog, roamdays (day-counting apps) | Wrong intent on iOS |
| siri | only SiriusXM | None |
| iphone duo | "iphone dua" only | None |
| foldable | novelty apps ("foldable accordion", "foldable wallpaper") | People browse Duo showcase apps. The badge and Apple's curated Duo collections are the discovery route, not keywords |

**Words people and press use (web evidence):**
- Siri: "ask Siri", "next flight", "gate", "flight status". TripIt has marketed "Siri Shortcuts" for years ([TripIt blog](https://www.tripit.com/web/blog/news-culture/travel-plans-your-command-siri-shortcuts)). Skift and AltexSoft describe App Intents as the route for "find a booking, check flight status, open a check-in flow" ([AltexSoft](https://www.altexsoft.com/travel-industry-news/apples-siri-ai-pushes-travel-apps-toward-smarter-in-trip-help/), [Skift 2026-06-08](https://skift.com/2026/06/08/apples-rebuilt-siri-opens-new-doors-for-travel-apps/)).
- AI: OTAs talk about "apps in ChatGPT" ([Expedia newsroom](https://www.expedia.com/newsroom/smart-trip-planning-new-expedia-app-in-chatgpt-to-plan-your-trip), [Travel Weekly](https://www.travelweekly.com/Travel-News/Travel-Technology/OTAs-build-travel-planning-apps-in-ChatGPT)). Anthropic says "connectors" ([Tom's Guide](https://www.tomsguide.com/ai/claude-now-connects-to-more-everyday-apps-heres-what-you-can-do-now)). Tripsy says "AI assistant" and "connect"; byAir says "AI assistants" and "MCP link". Ordinary users say "AI assistant". "MCP" means nothing to them and belongs only in the description and help pages.
- Calendar: "sync to your calendar" (TripIt, Tripsy), "calendar sync" (Flighty). "Subscribe" and "ICS/webcal" are technical words; use them in the description, not the caption.
- Duo: Apple's own HIG pose wording is "partially folded like a book", "placed down on a surface" and "standing on its edges" ([Designing for iPhone Duo](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo)). Flighty uses "tent". Avoid "two-page" as a product claim; "side by side" is clearer.

## C. Apple and Google guidance

**Apple, screenshots and assets** ([asset best practices](https://developer.apple.com/app-store/asset-best-practices/), [screenshot specs](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)):
- Up to 10 screenshots; **up to three can appear in search results**. "Lead with your best features." Text should be "a short phrase that enhances your visual rather than describes it."
- Avoid pricing, URLs, unverifiable awards and **Apple recognitions** (Editor's Choice, App of the Day). So **don't paint "Made for iPhone Duo" or an Apple-style badge into a screenshot.** Apple adds the real badge itself.
- **iPhone Duo:** 1398×2034 / 2034×1398 (outer) and 2007×2853 / 2853×2007 (inner). "When you submit iPhone Duo screenshots in App Store Connect, your App Store product page will display a badge to let people know your app is optimized for iPhone Duo." "Starting in April 2027, screenshots will be required for any app using the iOS 27.1 SDK or later." Press says the badge also needs an iOS 27.1 SDK build ([iGeeksBlog](https://www.igeeksblog.com/iphone-duo-app-store-badge/)). Apple's page alt text names it **"Made for iPhone Duo"** ([developer.apple.com/iphone-duo](https://developer.apple.com/iphone-duo/)). Without a Duo set, Duo users see scaled iPhone screenshots. A developer forum reports the 886×1920 preview spec doesn't match either Duo display ([thread 849757](https://developer.apple.com/forums/thread/849757)), so skip a Duo app preview for now.
- Large iPhone sizes accepted: 1260×2736, 1290×2796, 1320×2868. The current 1290×2796 set is fine.

**Apple, Review Guidelines** ([guidelines](https://developer.apple.com/app-store/review/guidelines/)):
- **2.3.3:** screenshots "should show the app in use". A frame that is mostly a ChatGPT or Claude chat window shows *another* app. Lead with TripCache's own AI Agents screen, with the in-chat card (TripCache's own card design) as a callout, and keep third-party chrome and logos out.
- **2.3.7:** "don't try to pack any of your metadata with trademarked terms, popular app names…"; subtitles must not "reference other apps". So **no ChatGPT, Claude or Gemini in the name, subtitle or keyword field.**
- **2.3.9:** you're responsible for rights to all materials in screenshots; use fictional account data (the demo trips already do).
- **2.3.10:** no names or imagery of other mobile platforms. Keep the Android frames off iOS and the iPhone chrome off Play.
- **2.3.12:** significant features must be listed in What's New. The Siri, AI, calendar and Duo release should say so explicitly.
- **2.3.14 (creative assets):** no "references to other apps with an intent to mislead".
- **5.2.1:** don't use protected third-party trademarks "without permission". Naming a compatible service in plain text is nominative use, which listings do routinely (byAir, Tripsy), but it isn't zero risk. That's why: text only, no logos, smaller subtext rather than headline, and an attribution line in the description.
- **5.1.2(i):** "clearly disclose where personal data will be shared with third parties, including with third-party AI". The AI frame and the in-app AI Agents screen should make clear that the user connects and authorises the assistant.
- **OpenAI** app guidelines: apps "should not imply that they are made or endorsed by OpenAI" ([OpenAI app developer guidelines](https://developers.openai.com/apps-sdk/app-developer-guidelines)). I found no "Works with ChatGPT" badge programme and no published Anthropic co-branding rule. That's unverified, not a confirmed absence.

**Google Play** (summarised in the existing `play-competitors-and-rules-2026-10-06.md`; [Metadata policy](https://support.google.com/googleplay/android-developer/answer/9898842?hl=en)): no implied relationship with another company, no third-party logos without permission, taglines ≤20% of the image, no device frames, show the real in-app experience. Play also prohibits misleading functionality claims. **Don't show or mention Gemini or AppFunctions until Gemini can actually call TripCache for ordinary users.** Reports disagree on whether Gemini's access to third-party AppFunctions is still a trusted-tester preview or a 40-app wave ([9to5Google 2026-02-25](https://9to5google.com/2026/02/25/android-appfunctions-gemini/), [Android Authority](https://www.androidauthority.com/gemini-galaxy-s26-pixel-10-control-other-apps-3643939/)). The safe position for now is launcher shortcuts only.

**Risk summary for third-party names (no logos in any case):**

| Placement | ChatGPT / Claude | Siri / Spotlight / iPhone Duo (Apple's own) | Gemini |
|---|---|---|---|
| App name / subtitle / keyword field | **Don't** (2.3.7) | Avoid in subtitle/keywords; not needed | **Don't** |
| Screenshot headline | Avoid. Use "your AI assistant" | OK ("Ask Siri…" is describing the feature) | Don't, until live |
| Screenshot subtext | OK as a compatibility line: "Works with ChatGPT, Claude and other AI assistants." | OK | Not yet |
| Description / What's New / promo text | OK, plus "ChatGPT is a trademark of OpenAI. Claude is a trademark of Anthropic. TripCache isn't affiliated with or endorsed by either." | OK | Only once live |
| Logos / brand colours / third-party UI chrome | **No** | Don't recreate Apple badges; real Siri/Spotlight UI captured from the device is fine | No |

**Accuracy checks before shipping captions (I couldn't verify these from here):**
- The Siri frame must quote a phrase that really works. App Shortcuts phrases have to include the app name (for example "When's my next flight in TripCache?"), unless you've confirmed Siri answers without it on iOS 27.
- Which ChatGPT plans can add a custom MCP connector, and whether TripCache is in OpenAI's or Anthropic's directory. Caption only what a typical user can do, and keep the Pro pill on the frame.
- That the calendar feed is free and works in Apple, Google and Outlook calendars, as described.

## D. Recommendations

### Caption copy (headline, *emphasis*, subtext)

US spelling is shown. AU/UK variants appear only where the spelling differs. I kept the wording spelling-neutral where possible.

**Siri / Spotlight (free)**
- Headline: `Ask Siri about your *next flight*`
- Alt headline: `Your gate? *Just ask Siri.*`
- Subtext: `Flight times, gates and bookings in Siri and Spotlight. Free.`
- Screen: a real Siri answer card (next flight, gate, terminal) over the home screen, plus a small Spotlight result callout.

**AI agents (Pro)**
- Headline: `Your trips, in your *AI assistant*`
- Alt headline: `Ask AI. It *knows your trip.*`
- Subtext: `Works with ChatGPT, Claude and other AI assistants.` Pro pill. The second line of subtext could be `Read trips, add bookings, see flight cards.` if space allows.
- Screen: the in-app **AI Agents** screen (connected assistants, permissions) as the phone, with a TripCache flight or hotel card as an enlarged callout. No third-party logos or chat chrome.
- Rationale: brand names in the subtext keep the 2.3.7 and 5.2.1 risk low. "AI assistant" is the user wording (Tripsy and byAir use it) and avoids the "AI trip planner" intent.

**Live calendar (free)**
- Headline: `A travel calendar that *updates itself*`
- Shorter alt: `Your calendar, *always current*`
- Subtext: `Subscribe in Apple, Google or Outlook. Flight changes sync. Free.`
- Note: "travel calendar" is the strongest web term (2.4k US) and caption text is reportedly indexed by Apple.

**iPhone Duo set** (goes in the Duo slot, not the 10 iPhone frames; capture inner display 2007×2853 portrait unless noted)
1. `Your trip and map, *side by side*` / `Timeline on one page, the map on the other.`
2. `Every booking, *open like a book*` / `Flights, stays and plans across both pages.` (Apple's "like a book" wording)
3. `Boarding pass on one side, *trip on the other*` / `Documents beside the itinerary, offline.`
4. `Never miss a *free cancellation*` / reuse the iPhone subtext, laid out as a two-pane detail view
5. **En Route / tent:** `Stand it up. *Watch your flight.*` / `En Route shows live progress hands-free, Sydney to London.` Flighty's notes say "prop… up like a tent", so this wording stays distinct from theirs.
- Alt for 5: `*Hands-free* flight progress` / `Fold iPhone Duo into a tent for En Route mode.`
- Optional: 1 outer-display frame (1398×2034) of the closed phone showing the trip with the side tab bar, captioned `Closed or open, *the same trip*` / `Picks up where you left off when you unfold.`
- Don't write "Made for iPhone Duo" in the art; Apple adds the badge.

**En Route on the regular iPhone set (if it ships for non-Duo iPhones in landscape):** use frame 5's copy without "Duo". Otherwise keep it Duo-only.

**Android launcher shortcuts (Play)**
- Headline: `Your next flight, *one tap away*`
- Subtext: `Press and hold TripCache for flights, bookings and documents.`
- Better as a callout inside the Play flight-tracker frame than as its own frame (see below). **No Gemini or AppFunctions copy until it's live for ordinary users.**

**Spelling variants:** the only differences in this set are `organized`/`organised` (frame 1, as today) and `traveler`/`traveller` if it's used. "Favorite", "center" and "color" are avoided on purpose. For en-AU or en-GB, "holiday" could replace "trip" in the Duo frame 2 subtext ("Flights, stays and plans for the whole holiday"), but it isn't necessary.

### iOS: the 10 iPhone frames

There is **no per-frame performance data**. App Store Connect doesn't report screenshot-level metrics, and there have been no product page optimization tests. The evidence available: 96% of impressions come from search, impression → page view is 7.6–9.1%, page view → download is about 40% (90 days to 2026-10-01), and only the first three frames show in search. So the order is a judgement based on intent: frames 1–3 match what searchers typed (itinerary/organiser terms), and frames 4+ persuade people who are already on the page.

| # | Proposed | From current | Reason |
|---|---|---|---|
| 1 | Itinerary (keep) | 1 | Matches "itinerary planner", the head term in the name |
| 2 | Free cancellation (keep) | 2 | The free differentiator; no competitor leads with it |
| 3 | Email import (keep) | 3 | The closest match to "trip organizer"; TripIt and Tripsy both lead with forwarding |
| 4 | **AI assistants (new, Pro)** | replaces timeline | No competitor shows it; works as a press hook. Kept out of the first three because App Store search demand is nil and the "AI trip planner" intent is different |
| 5 | Live flight tracker (keep) | 4 | Moves down one place; still the Live Activity proof |
| 6 | **Siri & Spotlight (new, free)** | replaces map | Free and visual; TripIt only mentions Siri in text |
| 7 | **Live calendar (new, free)** | replaces history | "travel calendar" web demand; competitors only say "calendar sync" in text |
| 8 | Documents (keep) | 6 | Matches the "travel document wallet" keyword |
| 9 | Budget (keep) | 7 | "travel budget" is a low-competition term (top-10 median 919 ratings); caption text helps |
| 10 | Visa export (keep) | 9 | Unique feature |

Dropped: **timeline** (overlaps frame 1), **map** (generic; every competitor has one), **history** (overlaps visa export). If you'd rather keep the first three free of Pro, swap 3 and 4 only after a product page optimization test; traffic is too low to test now (~35 page views a month).

**Custom product pages (later):** one CPP that leads with AI assistants, one with Siri and widgets, assigned to any matching organic keywords once Apple Ads popularity data exists. That lets AI-curious visitors see the AI frame first without changing the default page.

### Google Play: the 8 phone frames

The Play baseline (28 days to 2026-10-02): 457 impressions, 23 listing visitors, 11 install clicks, 48% visitor → install CTR. Again, there's no per-frame data.

| # | Proposed | From current |
|---|---|---|
| 1 | Itinerary | keep |
| 2 | Free cancellation | keep |
| 3 | Email import (Pro) | keep |
| 4 | **AI assistants (Pro)**: same copy; byAir names Claude and ChatGPT on Play already | replaces timeline |
| 5 | Flight tracker & alerts, with a **launcher-shortcut callout** ("Press and hold for your next flight") | keep and extend |
| 6 | **Live calendar (free)** | replaces budget (budget stays in the description, where Play indexes "trip budget / expense tracker") |
| 7 | Documents | keep |
| 8 | Visa export | keep |

Use Android captures, frameless, with taglines ≤20% of the height. No Gemini until it's live. Update the Play full description with an "AI assistants (Pro)" section and a "Live calendar" section, because the description is a ranking surface on Play.

### Metadata follow-ups (not screenshots)

- Add AI-assistant, Siri/Spotlight and live-calendar sections to the iOS description, with the trademark attribution line. The 1.4.4 What's New only mentions "Smarter Calendar Integration". The next What's New must list the new features (2.3.12).
- Keyword field: you could add `siri` or `calendar` in a locale with spare bytes, but there's no measured demand. Prefer `calendar` (it combines with "travel" and "trip" already indexed). Never `chatgpt`, `claude` or `gemini`.

## What I couldn't verify

- Semrush US/AU volumes (no API units). AU web volumes for every phrase.
- Apple Ads popularity scores (there's no Apple Ads account, as before).
- Per-screenshot conversion data (App Store Connect and Play don't provide it).
- The live text of Apple's Siri Style Guide and any Anthropic/OpenAI co-branding rules.
- Gemini AppFunctions availability for third-party apps today (sources conflict).
- Whether TripCache's Siri phrases work without the app name, and which ChatGPT plans support custom connectors.
- The HIG Duo page was read through its JSON endpoint; the rendered page and the "Three steps" page weren't fully read.
