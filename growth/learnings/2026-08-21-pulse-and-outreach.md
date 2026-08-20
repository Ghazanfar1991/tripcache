# Pulse guardrails and owner-authenticated outreach — 2026-08-21

## Observations

- The three active Search Console experiments cover 6,953 finalized impressions, or 80.84% of the site's 8,601 impressions, so the current tests already address the largest organic CTR surface.
- Their >72-hour fresh-data pulses all pass crawl, indexing, rendering, and position guardrails. The fresh rows remain incomplete and cannot select winners before the finalized 2026-09-03 gate.
- Production deployment `dpl_DYs3JAwf4BKizW8c8LWmDiPRXQqP` reached READY at `2026-08-20T13:52:42.191Z` for commit `929e94602bc8de43dba9cd545a192c1c9963aa0e`. The final post-deployment health check passed at `2026-08-20T14:04:34.687Z` across 39 sitemap URLs.
- The stored GA4 snapshot contains lowercase web-platform rows, but the website-funnel artifact was generated before the deployed case-normalization fix. A refresh attempt failed with insufficient authentication scopes, so GA4 is now correctly marked stale and waiting for human authentication; website store intent remains unknown.
- Revenue remains early and sparse: A$11 rounded MRR, one active subscription, and no verified activation events. Android reliability at 89.29% crash-free users is the current product constraint, outside this repository's authorized scope.
- Google Play evidence is stale at a latest reported date of 2026-08-03. App Store evidence is fresh through 2026-08-18 with 10 first-time downloads in its latest 28 reported days.

## Decisions

- Launch no fourth experiment and make no additional change to an active target page. Preserve all three 14-day windows and reassess from finalized evidence on or after 2026-09-03.
- Treat the website funnel as unknown until the GA4 credential scope is repaired by an authorized human and the collector is rerun. Do not reinterpret historical missing store clicks as zero.
- Do not change or promote a numeric paid price while the website, App Store, Google Play, and RevenueCat presentation remains inconsistent.
- Advance outreach by preparing qualified, truthful owner actions rather than using unauthenticated or automated submissions: Product Hunt launch draft, free BetaList submission, Tom's Guide calculator pitch, and correction of the live r/SideProject price claim.

## Next evidence

- After authorized GA4 reauthentication, rerun collection and verify the landing-user denominator and store-click event names before reporting a store-intent rate.
- At the next Monday/Thursday cycle, inspect a new Search Console pulse for failures only; keep 2026-09-03 as the decision gate.
- The owner may execute the prepared outreach from real personal accounts or email, preserving founder disclosure and editorial discretion.
