# SEO rules

Read this before changing anything that search engines see. Every rule exists because we already made the mistake once. When a new mistake happens, add a rule here with the incident that caused it, and automate the check if you can.

"Enforced" means CI or the nightly run fails or flags it automatically. "Manual" means the reviewer has to catch it.

## Changing pages

**R1. Don't change shared templates while page changes are being measured.** If a site-wide design or template change can't wait, log it as a `site-wide` changelog entry so every overlapping result is marked confounded.
- *Why:* the 2026-08-25 redesign changed the shared blog template in the middle of three title/meta tests, and none of them could ever be judged.
- *Enforced:* CI requires a changelog entry for page/layout/content changes; the review flags confounded results.

**R2. Every change that search can see gets a changelog entry: what, which pages, which keywords, and why.** Add it in the same PR as the change.
- *Why:* changes were scattered across commits, experiment files and reports, so nobody could say what changed when or whether it worked.
- *Enforced:* `seo/scripts/check-repo.mjs --base` fails a PR that touches `content/`, `app/**/page.tsx`, layouts, sitemap, robots, redirects or SEO data without touching `seo/changelog.jsonl`.

**R3. Never let a published URL die.** A removed or renamed page gets a permanent (308) redirect to its closest replacement, and its `seo/url-registry.json` entry becomes `redirected`.
- *Why:* `/support` returned 404 for months; retired blog posts sat in "crawled – not indexed".
- *Enforced:* `check-site.mjs` fails when a registered live URL leaves the sitemap, when a sitemap URL isn't registered, or when a recorded redirect stops working.

**R4. No years in new URLs, and never rename a URL just to change its year.** Put the year in the title and update the title instead.
- *Why:* 20 of 39 URLs carry 2025/2026. Slugs were renamed `-2025` → `-2026` and back, and evergreen slugs were redirected *to* year-stamped ones. `/blog/best-travel-apps-2025` now looks stale.
- *Enforced:* `check-site.mjs` fails on a new year-stamped path. Existing ones are marked `legacyYearSlug` and stay where they are; changing a ranking URL costs more than it gains.

**R5. One page per keyword cluster.** Before writing a page or retargeting one, look up the cluster in `seo/keywords.csv`. If it has an owner, improve that page instead of creating a competitor.
- *Why:* four pages chase "TripIt alternative" searches (`/alternatives/tripit`, `/blog/best-tripit-alternatives-2026`, `/blog/tripit-alternative-cancellation-reminders-documents-2026`, `/blog/tripit-vs-tripcache-comparison-2025`). `/alternatives/tripit` sits around position 48.
- *Enforced:* `check-repo.mjs` fails if a cluster has more than one owner, or if an owner page isn't live.

## Choosing what to work on

**R6. Indexing before volume.** While more than ~20% of sitemap pages aren't indexed, improve, merge or remove weak pages before publishing new ones.
- *Why:* in Sep 2026, 16 of 39 pages were "discovered – currently not indexed" while new pages kept being added.
- *Manual:* `seo/data/summary.md` shows the live index status every night; the weekly review checks this gate before proposing new pages.

**R7. Target searches that can turn into installs.** Mark navigational competitor queries ("tripcase login", "wanderlog reviews") and audiences that won't install a post-booking organizer as `SKIP` in `keywords.csv`.
- *Why:* our top query, "tripcase", produced 1,054 impressions and 7 clicks in 28 days. Impressions aren't the goal; installs are.
- *Manual.*

**R8. Claims must match the app and the stores.** Plans, prices and features come from `PRODUCT.md` (Basic free; Pro $5.99/month or $49.99/year) and must agree with the App Store and Google Play listings.
- *Why:* the site said cancellation reminders were Pro-only while the Play listing said Basic. A stale "$9.99/month" claim was found in an external post.
- *Manual.*

## Judging results

**R9. Judge a change only after 28 days, against the site trend, and don't touch the same page again inside that window.**
- *Why:* the old system kept extending windows after contamination and never reached a verdict.
- *Enforced:* `npm run seo:log -- review` scores entries automatically once 28 finalized days exist. Results are compared with the site as a control, and overlapping changes are flagged as confounded.

**R10. Write the lesson.** A reviewed change without a `lesson` isn't finished. Wins become patterns to repeat; losses become rules here.
- *Manual:* the summary lists reviewed entries that still need a lesson.

## How we work

**R11. Ship or drop within 7 days.** SEO work goes on a branch with a PR. Finished work doesn't stay uncommitted in a local checkout.
- *Why:* the 2026-09-11 work (two guides, the `/support` redirect, breadcrumbs, image sitemap, plan-claim fixes) sat undeployed for over three weeks, and the local `main` fell 36 commits behind.
- *Manual:* the weekly review lists stale SEO PRs.

**R12. Automation never runs in a checkout someone works in.** Scheduled AI work runs in the dedicated `../tripcache-seo-automation` checkout, reset to `origin/main` at the start of every run. Data collection runs in GitHub Actions.
- *Why:* the old Codex dispatcher ran in the owner's working checkout. It also wrote its own state file there every hour, so its "wait for a clean working tree" safeguard blocked it. It silently stalled for five weeks (about 30 failed attempts per job).
- *Enforced:* `seo/scripts/sync-automation-checkout.sh` refuses to run anywhere except the automation checkout.

**R13. Every store button is measured.** Use the tracked store-link components (`data-store-placement`), including the `/download` route.
- *Why:* `/download` clicks weren't counted until 2026-08-27, so store intent was under-reported.
- *Manual.*
