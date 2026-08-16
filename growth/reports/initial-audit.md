# TripCache growth audit — 2026-08-17

## Executive decision

TripCache has growing organic visibility, but click-through rate and Android reliability are the two immediate constraints. The safe near-term plan is to improve qualified search snippets one page at a time while the owner reviews the two Android crash groups. Acquisition should not be scaled aggressively while the 30-day Android crash-free-user rate is 89.29%.

## Organic search and keyword findings

Search Console recorded 40 clicks from 7,905 impressions in the latest complete 28-day period (0.51% CTR, average position 10.23). Compared with the previous period, impressions increased 101.7%, but clicks fell 29.8% and CTR fell 65.2%. Visibility is growing faster than qualified clicks.

The strongest observable demand clusters are:

- TripCase and TripCase-alternative intent: the `tripcase` query produced 814 impressions and 5 clicks on the shutdown page; that page produced 2,179 impressions and 12 clicks overall.
- Best-travel-app intent: `best travel apps for planning` ranked at 2.92 with 168 impressions and no clicks. The older best-travel-apps page generated 3,959 impressions but only 0.20% CTR.
- Hotel cancellation intent: `/blog/hotel-cancellation-reminder-app-2026` generated 192 impressions, no clicks, and an average position of 4.63. This is the cleanest first CTR experiment because the page already ranks, its intent matches a live TripCache capability, and success is measurable directly in Search Console.
- Primary markets by impressions are the United States, United Kingdom, India, Australia, and Canada. Mobile CTR (0.92%) is stronger than desktop CTR (0.44%), so snippets and landing pages must remain clear on smaller screens.

The first production experiment changes the hotel-reminder article title and description to make the free calculator benefit explicit. It does not add unverified claims or change pricing. The experiment is recorded as `seo-hotel-reminder-ctr-2026-08-17` with a 14-day observation window plus the normal three-day Search Console lag.

## App acquisition and usage

GA4 recorded 28 Android active users and 10 iOS active users in the audited window. It also recorded 23 Android and 8 iOS `first_open` events. These are analytics install proxies, not official store downloads. The official Google Play report shows six user installs and five user uninstalls in the latest 28 reported days; its latest reported active-device audience was 14 on August 3, while the live Play Console later displayed an installed audience of 13. The cloud service account still needs Play report permission for future automation. App Store Connect still needs a Sales and Reports key before authoritative iOS download totals can be collected.

The authenticated screen audit completed, but every Firebase screen name is `(not set)`. GA4 can only see implementation classes: iOS `RNSScreen` produced 945 views from nine users; Android `MainActivity` produced 221 views from 28 users; `PaywallActivity` produced 20 views from seven users; and `SignInHubActivity` produced 15 views from 13 users. These are not reliable product-screen names, so popular/unused product areas still cannot be ranked. Development traffic is also contaminating the property: iOS `DevLauncherViewController` produced 258 views from three users and Android `DevLauncherActivity` produced 34 views from one user. Configure explicit screen names and exclude development builds/internal traffic before using screen counts for product decisions.

Only the install proxy is instrumented in the app funnel. No verified events were observed for sign-up, onboarding completion, activation, paywall view, trial start, or purchase. Returning-user evidence is modest: six returning Android users generated 49 sessions, while seven returning iOS users generated 21 sessions. A first-value activation event is still required before install-to-value conversion can be calculated.

Android emitted eight `app_remove` events affecting six users. This is a removal signal, not a subscription churn rate and must not be labeled as churn. Subscriber churn and retention will come from the corrected RevenueCat chart endpoints after the next authenticated run.

## Revenue and retention

The latest successful RevenueCat overview contains A$11 MRR, one active subscription, zero active trials, 19 new customers, and 24 active users. Revenue was A$0 over the displayed 28-day overview period. The corrected 90-day charts show an average churn rate of 32.47%, and initial conversion to paying of 1.45% (one paying customer from 69 new customers). The subscription-retention total contains only two subscriptions and shows zero retained at Month 1. These samples are far too small for confident forecasting, but they clearly justify focusing on activation, paywall instrumentation, and early retention rather than scaling traffic alone.

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
4. Add stable Firebase screen names, exclude development traffic, and instrument sign-up, onboarding, activation, paywall, trial, and purchase events.
5. Reconcile subscription pricing before restoring paid-price structured data or changing public pricing copy.
