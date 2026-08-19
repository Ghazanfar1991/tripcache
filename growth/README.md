# TripCache Autonomous Growth Engine

This directory is the durable, Git-backed memory for TripCache growth operations. Cloud jobs collect deterministic, sanitized aggregates every day. A local launchd dispatcher wakes hourly, runs overdue intelligent work through the installed Codex CLI authenticated with the owner's ChatGPT subscription, and records locks, retries, decisions, and evidence here.

Until 2026-09-17 the engine operates in four-week sprint mode: Monday and Thursday intelligent cycles, up to three independent URL/query-cluster experiments in parallel, and a quality-controlled backlink pipeline. Experiments retain a 14-day evidence window; speed comes from parallel execution rather than premature conclusions.

## Commands

- `npm run growth:daily` — collect all configured data and write a deterministic snapshot.
- `npm run growth:collect:play` — collect official Google Play installs/uninstalls from the private report bucket.
- `npm run growth:collect:apple` — collect official App Store first-time downloads from Sales and Trends.
- `npm run growth:collect:crashlytics` — collect fatal/ANR aggregates from the Crashlytics BigQuery export while preserving the official dashboard baseline.
- `npm run growth:email -- --kind weekly` — email the latest report using a Resend key from the environment or macOS Keychain.
- `npm run growth:health` — verify production SEO and availability.
- `npm run growth:dispatch -- --dry-run` — show due local jobs without executing or synchronizing them.
- `npm run growth:test` — run regression tests for dispatcher synchronization and measurement semantics.
- `npm run growth:validate` — validate memory, configuration, and secret hygiene.
- `node growth/scripts/install-launchd.mjs` — install/reload the hourly macOS dispatcher.

Raw customer records, credentials, OAuth refresh tokens, and ad identifiers must never be committed. Only sanitized aggregates belong here.

The daily snapshot includes a separate Search Console fresh-data pulse for 72-hour health checks and finalized rows for decisions. Fresh data can reveal crawl/indexing or tracking problems quickly, but it is never treated as a completed experiment result. The Monday and Thursday intelligent cycles consume this pulse, so the engine reacts every 3–4 days while retaining a 14-day evidence window for winner/rollback decisions.

Immediately before an intelligent cycle, the dispatcher verifies a clean `main` checkout, fetches `origin/main`, and applies only a fast-forward update. It stops safely instead of running against stale or divergent code. GA4 app reporting retains a three-day stability lag, while the website funnel reports through yesterday and labels recent rows as potentially incomplete. If GA4 returns no web rows, website conversion and AI-referral values remain unknown rather than being reported as zero.

## Operating boundary

The engine may implement and publish reversible landing-page and SEO experiments in this repository after recording evidence, passing CI, and verifying production. It must not modify the mobile application, subscriptions, store pricing, billing, credentials, legal claims, or external access controls without the owner taking the required confirmation step.

Backlink work is authorized only for accurate, relevant, editorially legitimate placements. Paid ranking links, automated directory/comment spam, fake reviews or identities, and undisclosed incentives are prohibited. The active opportunity and outreach status is stored in `outreach/backlink-backlog.json`.

Local email credentials are stored in macOS Keychain services `com.tripcache.growth.resend-api-key` and `com.tripcache.growth.report-email`; they are never written to Git or dispatcher logs.
