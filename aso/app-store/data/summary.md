# App Store summary — 2026-11-18

Generated 2026-11-17T17:22:41.770Z by `npm run aso:feed`.

## Downloads, last 28 reported days (App Store Connect)

- First-time downloads: 32 · redownloads 5 · updates 84
- Latest report: 2026-11-15

## Quality (store ranking factor)

- Crash-free users: 100.00% (dashboard baseline 2026-07-19–2026-08-17)
- Automated 30 days: 3 fatal/ANR events on 2 installs across 2 issues

## In-app funnel (GA4)

- installProxy: 49 users
- signUp: not instrumented
- onboardingComplete: 12 users
- activation: 9 users
- paywallView: 8 users
- trialStart: not instrumented
- purchase: not instrumented

## Where new users come from (GA4 first-user source)

- (direct) / (none): 46 new users
- Apple / search: 3 new users

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
