# TripCache Autonomous Growth Engine

This directory is the durable, Git-backed memory for TripCache growth operations. Cloud jobs collect deterministic, sanitized aggregates every day. A local launchd dispatcher wakes hourly, runs overdue intelligent work through the installed Codex CLI authenticated with the owner's ChatGPT subscription, and records locks, retries, decisions, and evidence here.

## Commands

- `npm run growth:daily` — collect all configured data and write a deterministic snapshot.
- `npm run growth:collect:play` — collect official Google Play installs/uninstalls from the private report bucket.
- `npm run growth:collect:apple` — collect official App Store first-time downloads from Sales and Trends.
- `npm run growth:collect:crashlytics` — collect fatal/ANR aggregates from the Crashlytics BigQuery export while preserving the official dashboard baseline.
- `npm run growth:email -- --kind weekly` — email the latest report using a Resend key from the environment or macOS Keychain.
- `npm run growth:health` — verify production SEO and availability.
- `npm run growth:dispatch -- --dry-run` — show due local jobs without executing them.
- `npm run growth:validate` — validate memory, configuration, and secret hygiene.
- `node growth/scripts/install-launchd.mjs` — install/reload the hourly macOS dispatcher.

Raw customer records, credentials, OAuth refresh tokens, and ad identifiers must never be committed. Only sanitized aggregates belong here.

## Operating boundary

The engine may implement and publish reversible landing-page and SEO experiments in this repository after recording evidence, passing CI, and verifying production. It must not modify the mobile application, subscriptions, store pricing, billing, credentials, legal claims, or external access controls without the owner taking the required confirmation step.

Local email credentials are stored in macOS Keychain services `com.tripcache.growth.resend-api-key` and `com.tripcache.growth.report-email`; they are never written to Git or dispatcher logs.
