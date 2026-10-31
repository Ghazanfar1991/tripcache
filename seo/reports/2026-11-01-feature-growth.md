# Feature growth pass — 2026-11-01

Branch `seo/feature-growth-2026-11` (worktree `../tripcache-landing-seo-growth`), cut from local `preview/agents-siri-duo`. **Nothing pushed or deployed.** Local preview: http://localhost:3160 (dev server in the Terminal tab "seo preview 3160").

## What the data says (nightly feed, Search Console 2026-10-02 → 10-29)

- **Growing fast from a small base:** 170 clicks (+198%), 17,911 impressions (+110%), position 7.8, CTR 0.9%. Daily clicks reached 14–15 on Oct 28–29.
- **What's working:** `/blog/tripcase-shutdown-what-now` (42 clicks, pos 5.0), `/blog/how-to-find-your-travel-history` (34, pos 7.4), `/tools/jet-lag-calculator` (20, pos 7.0), `/` (23 clicks; 18 store-click users, by far the best converter). Store intent is 8.9% of 350 web users (GA4).
- **AI assistants already send visitors:** 15 sessions in 28 days from chatgpt.com, gemini.google.com and others (GA4 `ai-assistant` medium), mostly to `/` and the travel-history guide.
- **Losing / weak CTR (quick wins, all inside a measurement window until ~Nov 5, so don't touch yet):** "wanderlog vs tripit" 432 impressions at pos 6.6 with 0 clicks; "endless travel plans alternatives" 148 impr, 0 clicks; "tripit alternative(s)" ~250 impr at pos 17–18; "i94 travel history" 494 impr at 0.8% CTR; `/blog/hotel-cancellation-policies` 2,136 impr at 0.1% CTR.
- **Indexing (R6 gate was red):** 36/46 sitemap URLs indexed = 22% not indexed. Never crawled or "discovered – not indexed": `/account-delete`, `/blog/ai-trip-planner-2026`, `/blog/business-travel-management-guide-2026`, `/blog/email-to-trip-automation`, `/blog/flighty-vs-tripcache-2026`, `/blog/free-cancellation-reminder-travel-bookings-2026`, `/blog/google-travel-alternative-2026`, `/blog/travel-booking-organizer-app-2026`, `/blog/travel-itinerary-template-2026`, `/tools/flight-arrival-time-calculator`.
- **New-feature queries:** none yet in Search Console (no Siri/ChatGPT/calendar/Duo queries), as expected: those pages aren't live.
- **28 Oct-05 changes are scored on ~Nov 5**; no verdicts yet.

## Problems found that only you can fix

1. **The weekly and midweek scheduled tasks don't actually run.** Every run since Oct 19 stops at its first Bash command after ~6 seconds (waiting for tool approval with nobody there). Open each task in the desktop app's scheduled tasks list and click **Run now** once while you're at the Mac, approving its tools. (Backlog Phase 0 item, still open.)
2. **Your Codex default model breaks `codex-imagegen`.** `~/.codex/config.toml` sets `model = "gpt-6.1-sol"`, which Codex refuses for ChatGPT-account sign-in. I generated the covers with `-m gpt-6-luna` from a scratch copy of the script and didn't change your config. Either set the config to a supported model or add `-m` to the skill's script.
3. **Every new-feature page depends on the next app build.** Siri, the AI connector, the live calendar and Android shortcuts were merged into the app on Oct 29–30; the last store build (1.4.4) is from Oct 23. Ship the landing preview only once that build is live, or the guides describe features users can't find. The calendar feed and MCP functions are already deployed on Supabase; the `trip-cache.com/calendar/*` rewrite ships with this landing branch.
4. Couldn't do: **Semrush** (MCP needs re-auth via /mcp, and the trial units were exhausted on Oct 12), so search volumes for the new clusters are unmeasured. **Installing extra skills** with `npx skills` was blocked by the auto-mode safety check, and the claude.ai skill catalogue had nothing new, so I used the installed claude-seo, searchfit-seo and seo-article-writer-faq skills plus live Google SERP checks.

## What I built and why

| Change | Targets | Why |
| --- | --- | --- |
| New guide `/blog/sync-travel-itinerary-to-calendar` (free live calendar): live vs add once, what the feed contains, Apple/Google/Outlook setup, refresh times, link privacy, 7 FAQs (FAQPage), 3 real app screenshots, generated cover | sync travel itinerary to calendar · add flight itinerary to google calendar · travel calendar subscription · ics travel calendar · tripit calendar feed alternative | Live calendar is free and new. The SERPs for these are thin how-to and spam pages; forum threads ask for a TripIt calendar-feed alternative. No page owned the cluster. |
| New `/alternatives/app-in-the-air` (product page template, FAQ schema, generated cover) | app in the air (590 US, KD 12) · app in the air alternative | Backlog Phase 2 item, keyword map owner, WINNABLE_NOW. Same play as TripCase. Shutdown facts: Sept 19, 2024; export until Oct 19, 2024. |
| 308-merged two never-indexed duplicates into their owners: `/blog/email-to-trip-automation` → `/features/email-to-itinerary`, `/blog/free-cancellation-reminder-travel-bookings-2026` → `/features/cancellation-reminders`; repointed all internal links | email to itinerary app · forward booking email to itinerary · free cancellation reminder app | Clears the R6 gate (10/46 → 8/44 ≈ 18%) and removes cannibalisation (R5). Both had 0 impressions. |
| Android facts in the Siri guide, its FAQ and the home Siri section: the three launcher shortcuts are real; Gemini can't call TripCache yet (Google early-access only) | gemini flight status · android travel app shortcuts | Old copy said "in progress"; now matches app main. |
| Home meta/OG/Twitter descriptions lead with the free features and say email import is Pro | trip organizer app · travel organizer app | Backlog item: the old text implied email import was free (R8). |
| Internal links: flight time zones → calendar guide; Flighty vs TripCache → App in the Air; ChatGPT/Claude guide → calendar guide; calendar guide → two unindexed posts | — | Each new page gets 2+ contextual inbound links; unindexed posts get fresh links. |
| `llms.txt` / `llms-full.txt`: live calendar and Android shortcuts added, "sync calendars by subscription" removed from Not supported, redirected posts dropped | — | They told answer engines calendar sync didn't exist. |
| `RULES.md` R8, `app-feature-inventory.md`, `keywords.csv` (14 rows), `url-registry.json`, `image-provenance.md`, 7 changelog entries (status `planned`, date 2026-11-01: set `shipped` and the real date on deploy) | — | System bookkeeping. |

Claims were checked against `trip-cache-app` `main` (b828a75): calendar has no Pro gate (`CalendarSheet.tsx`, `calendar-feed/ics.ts`); MCP returns `pro_required` without Pro; email import and flight alerts are Pro per the inventory.

Deliberately not touched (inside the 28-day window from Oct 5–7): the Wanderlog vs TripIt, TripIt alternatives, travel history and hotel cancellation pages, and the feature pages' copy (only their now-self-referencing related links changed).

## What I'd do next

1. Ship this branch together with the app build that contains the new features, then request indexing for the calendar guide, App in the Air page and the four Oct-29 guides (about 5 a day).
2. After Nov 5 verdicts: rewrite the "wanderlog vs tripit" snippet (432 impressions, 0 clicks at position 6.6) and the hotel-cancellation-policies title (0.1% CTR).
3. Decide the rest of the R6 list: `travel-booking-organizer-app-2026` and `business-travel-management-guide-2026` have no cluster and look mergeable; `ai-trip-planner-2026` and `google-travel-alternative-2026` should get links or a refresh.
4. Make the weekly task work (item 1 above) so this loop runs without you.
5. Re-check the "ChatGPT (including Dots)" wording in `llms-full.txt`: the site-features notes say there's no "Dots".
