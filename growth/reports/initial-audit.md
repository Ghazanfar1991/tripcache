# TripCache growth audit — 2026-08-17

## Executive decision

TripCache has growing organic visibility, but click-through rate and Android reliability are the two immediate constraints. The safe near-term plan is to improve qualified search snippets one page at a time while the owner reviews the two Android crash groups. Acquisition should not be scaled aggressively while the 30-day Android crash-free-user rate is 89.29%.

## Organic search and keyword findings

Search Console recorded 42 clicks from 7,770 impressions in the latest complete 28-day period (0.54% CTR, average position 10.26). Compared with the previous period, impressions increased 100.1%, but clicks fell 22.2% and CTR fell 61.1%. Visibility is growing faster than qualified clicks.

The strongest observable demand clusters are:

- TripCase and TripCase-alternative intent: `tripcase` produced 905 impressions and 5 clicks; the TripCase shutdown page produced 2,140 impressions and 13 clicks.
- Best-travel-app intent: `best travel apps for planning` ranked at 2.92 with 168 impressions and no clicks. The older best-travel-apps page generated 3,872 impressions but only 0.21% CTR.
- Hotel cancellation intent: `/blog/hotel-cancellation-reminder-app-2026` generated 192 impressions, no clicks, and an average position of 4.54. This is the cleanest first CTR experiment because the page already ranks, its intent matches a live TripCache capability, and success is measurable directly in Search Console.
- Primary markets by impressions are the United States, United Kingdom, India, Australia, and Canada. Mobile CTR (0.92%) is stronger than desktop CTR (0.44%), so snippets and landing pages must remain clear on smaller screens.

The first production experiment changes the hotel-reminder article title and description to make the free calculator benefit explicit. It does not add unverified claims or change pricing. The experiment is recorded as `seo-hotel-reminder-ctr-2026-08-17` with a 14-day observation window plus the normal three-day Search Console lag.

## App acquisition and usage

GA4 recorded 28 Android active users and 10 iOS active users in the audited window. It also recorded 23 Android and 8 iOS `first_open` events. These are analytics install proxies, not official store downloads. The official Google Play report shows six user installs and five user uninstalls in the latest 28 reported days; its latest reported active-device audience was 14 on August 3, while the live Play Console later displayed an installed audience of 13. App Store Connect still needs a Sales and Reports key before authoritative iOS download totals can be collected.

Current GA4 data contains platform-level default events but no screen-name breakdown in the stored snapshot. The collector now requests `unifiedScreenName` and `unifiedScreenClass`; once the next authenticated daily run succeeds, weekly reports will identify the most-used and least-used screens. A first-value activation event is still not verified, so install-to-activation conversion remains unknown.

Android emitted eight `app_remove` events affecting six users. This is a removal signal, not a subscription churn rate and must not be labeled as churn. Subscriber churn and retention will come from the corrected RevenueCat chart endpoints after the next authenticated run.

## Revenue and retention

The latest successful RevenueCat overview contains A$11 MRR, one active subscription, zero active trials, 19 new customers, and 24 active users. Revenue was A$0 over the displayed 28-day overview period. The earlier churn collector used an invalid endpoint and returned 404; that collector now uses RevenueCat v2 chart endpoints for churn, conversion, status, and subscription retention. Until a successful refresh arrives, subscriber churn remains unknown.

Pricing should remain unchanged until the website, App Store, Google Play, and RevenueCat products are reconciled. The audit previously observed conflicting public/historical price signals, so an autonomous system must not guess the intended catalog.

## Firebase Crashlytics quality audit

For July 19–August 17, Android showed 89.29% crash-free users and 91.23% crash-free sessions: 10 crashes affected three users. The open issue groups were:

- Six early-startup events affecting one user: `MainApplication.onCreate` / `SoLoaderDSONotFoundError` could not load `libreactnative.so` (versions 1.0.1–1.3.3).
- Four events affecting two users: `libhermesvm.so` `SIGSEGV`, with two variants (version 1.3.3).

The latest Android release shown was 1.3.5 (47), so the first engineering check is whether either historical issue reproduces on 1.3.5 before changing native code. The last seven days showed 100% crash-free users/sessions, but volume is small and does not erase the 30-day reliability risk.

iOS release 1.3.3 (51) showed 100% crash-free users and sessions with no open crash issues for the same 30-day selection.

The official dashboard baseline is stored in `growth/data/app/quality.json`. Crashlytics is not currently exported to BigQuery. A daily collector is ready to ingest fatal/ANR event counts and impacted installations automatically after that export is enabled; it deliberately does not infer crash-free percentages without a sessions denominator.

## Measurement and automation status

- Daily deterministic collection: 7:00 PM Australia/Sydney.
- Weekly intelligent growth cycle: Monday 1:00 PM Australia/Sydney.
- Monthly strategy review: first day of each month at 4:00 PM Australia/Sydney.
- The hourly macOS dispatcher is only a lightweight overdue-job checker. It does not run an AI audit every hour; it lets missed weekly/monthly work recover after sleep, restart, network loss, or a dirty worktree without requiring a permanently running process.
- Weekly/monthly email delivery is implemented through Resend with credentials held in macOS Keychain. Sending begins after the owner confirms the account sign-in/API-key step.

## Prioritized actions

1. Verify whether the two Android crash groups occur on 1.3.5; address current-release crashes before scaling acquisition.
2. Launch and observe the hotel-reminder CTR experiment; do not stack a second change on that page during the measurement window.
3. Confirm the growth service account's Google Play report access, create an App Store Connect Sales and Reports key, and enable the Crashlytics BigQuery export.
4. Complete the next authenticated RevenueCat/GA4 run to obtain churn, retention, screen use, and activation instrumentation gaps.
5. Reconcile subscription pricing before restoring paid-price structured data or changing public pricing copy.
