# Google Play summary — 2026-11-18

Generated 2026-11-17T17:22:41.771Z by `npm run aso:feed`.

## Installs, last 28 reported days (Play Console)

- User installs: 25 · uninstalls 17 · installed audience 32
- Latest report: 2026-11-09 (Play reports lag 3–7 days)
- Top countries: US 8, GB 5, AU 4, ID 3, IN 3, IT 3, SE 3, DE 3

## Quality (store ranking factor)

- Crash-free users: 89.29% (dashboard baseline 2026-07-19–2026-08-17)
- Automated 30 days: 56 fatal/ANR events on 17 installs across 4 issues

## In-app funnel (GA4)

- installProxy: 95 users
- signUp: not instrumented
- onboardingComplete: 14 users
- activation: 3 users
- paywallView: 7 users
- trialStart: not instrumented
- purchase: not instrumented

## Where new users come from (GA4 first-user source)

- (direct) / (none): 71 new users
- google-play / organic: 18 new users
- google / organic: 6 new users

## Revenue (RevenueCat, AUD, both platforms combined)

- MRR A$48 · active subscriptions 6 · active trials 1 · new customers (28d) 79

## Data sources

- app-store-connect: **CONNECTOR_FAILURE** (stale) — HTTP 500 fetching App Store report for 2026-10-14: {
	"errors": [{
		"status": "500",
		"code": "UNEXPECTED_ERROR",
		"title": "An unexpected error occurred.",
		"detail": "An unexpected error occurred on the server side. If this issue continues, contact us at https://developer.apple.com/contact/."
	}]
}
- google-play: **SUCCESS** (stale) — Play export fetched successfully, but the latest reported date (2026-11-09) is 8 days old; treat install totals as stale.
- revenuecat: **SUCCESS** (fresh) — Automated through RevenueCat API v2 with charts/metrics read-only access.
- firebase-crashlytics: **SUCCESS** (fresh) — Automated raw fatal/ANR event collection from the Firebase Crashlytics BigQuery export; official dashboard baseline retained for crash-free percentages.
- ga4-app: **SUCCESS** (fresh) — GA4 in-app events, screens, acquisition and funnel.
