# Treatment integrity, store-intent repair, and editorial outreach — 2026-08-27

## Observations

- The Search Console snapshot generated at `2026-08-26T09:36:53.955Z` is fresh. Finalized data ends August 23; August 24 is the first incomplete date and August 26 is unknown rather than zero.
- Current 28-day organic performance is 50 clicks / 9,997 impressions, 0.50% CTR, position 9.51. Impressions increased 94.3% period over period, but clicks declined 12.3% and CTR declined 54.9%.
- Finalized August 17–23 evidence is: hotel reminder 0 / 68, position 5.57; best travel apps 4 / 1,771, 0.23% CTR, position 6.99; TripCase recovery 9 / 652, 1.38% CTR, position 9.07.
- The incomplete August 24–25 pulse is: hotel reminder 0 / 8, position 6.13; best travel apps 6 / 317, 1.89% CTR, position 8.45; TripCase recovery 1 / 176, 0.57% CTR, position 9.38. Every position guardrail passes and none of these rows is a winner decision.
- Live production health passed at `2026-08-27T03:42:20.653Z`: homepage, robots, sitemap, both AI reference files, and 39 sitemap URLs passed status, redirect, title, description, canonical, and `noindex` checks.
- Public GitHub/Vercel production evidence ties the live redesign to commit `2e437f647da408f4f2ef49fb19ecd1e6290fd03b`, completed at `2026-08-25T17:11:29Z`. The prior known-good record pointed to an obsolete August 20 deployment.
- The redesign changed the shared blog template and layout during all three active experiments. This is a mixed-treatment window even though the declared titles, descriptions, canonicals, and primary query clusters remain intact.
- GA4 reports 6 store-intent users among 61 landing users, but 25 of 39 sitemap pages use a same-origin `/download` CTA that the existing listener did not count. The 9.84% rate is therefore a historical lower bound.
- Revenue remains sparse: A$11 MRR, one active subscription, no active trials, A$0 recognized revenue in the latest 28 days, and 0/85 seven-day paying conversions in the current 90-day chart. Activation through purchase remains uninstrumented.
- Android reliability remains the acquisition constraint at the dated 89.29% crash-free-user baseline. The newer iOS raw export also prevents a current healthy claim.

## Decisions and repairs

- Launch no new experiment and change no active target's content. All three slots remain occupied.
- Preserve the original evidence rather than discarding or shortening it, quarantine August 25 as a transition day, and require a homogeneous August 26–September 8 treatment window plus the existing three-day reporting lag. The earliest defensible decision gate is September 12.
- Repair the `/download` analytics failure immediately without treating it as a fourth content experiment. The shared classifier now uses the same iOS/Android user-agent rules as the redirect route, emits the corresponding store event only for mobile destinations, records other platforms as `download_cta_click`, preserves placement/destination fields, requests beacon transport, and prevents duplicate direct-store events.
- Treat all pre-repair store-intent values as directional lower bounds. Start secondary-metric comparison only after the repair deployment time is recorded and the next GA4 collector confirms events.
- Correct the known-good production attribution to the verified August 25 redesign deployment.
- Keep public pricing unchanged and make no mobile, store, RevenueCat, product, entitlement, billing, credential, or access-control change.

## Backlink pipeline

- Advanced The Points Guy, Travel + Leisure, and Travelling for Business to founder-disclosed pitch copy with official editorial contact paths and destination-specific reader value.
- Reverified Product Hunt's personal-account, account-age, duplicate, primary-link, and anti-vote-manipulation rules. Reverified Tom's Guide's editorial contact and no-self-promotion comment rule.
- Left AlternativeTo in its existing free review queue, kept BetaList deferred under its current recency criterion, and kept the r/TripIt reply blocked on a signed-in rules check.
- The existing r/SideProject founder post still exposes a stale `$9.99/month` claim and should be corrected through the owner account before it is amplified.
- No email, post, comment, or submission was made because an authorized sender identity was not confirmed. No paid link, bulk submission, automation, incentive, fake identity/review, reciprocal scheme, or undisclosed promotion was used.

## Validation and skills

- `npx tsc --noEmit`, 22/22 growth tests, growth-memory validation, and the 39-URL local health check passed after the repair. Lint completed with no errors and seven pre-existing warnings. The default Turbopack build could not bind its internal CSS worker port in the managed execution environment; the installed Next 16 documentation's `next build --webpack` fallback completed all 48 routes successfully.
- `seo-growth-automation` governed the evidence, publishing, and rollback boundaries. Its blog orchestration route was checked, but no blog production skill was invoked because no article was created or materially changed. `vercel:vercel-cli` guidance was used to structure deployment attribution and production verification; public GitHub/Vercel status evidence was used because this checkout is not locally linked to Vercel CLI.

## Next evidence

- After deployment, verify the exact production commit/time, rerun production health, and confirm direct Apple, direct Play, mobile `/download`, and non-mobile `/download` behavior.
- In the next GA4 snapshot, require a populated `download_cta_click` row or new mobile store-click evidence from a `/download` placement before calling the repair operational. A measured absence is zero only after the deployment boundary and a successful report.
- At each Monday/Thursday cycle, continue fresh directional crawl/indexing/position checks without changing targets. At the September 12 gate, use only the homogeneous finalized window for a win/loss decision.
- Escalate activation instrumentation and crash investigation to the authorized mobile owner outside this repository; do not patch mobile code from the landing-page cycle.
