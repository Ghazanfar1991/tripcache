---
name: seo-weekly
description: Run the weekly TripCache SEO review. Read the nightly data, write lessons for scored changes, update the backlog, pick and implement the next 1–3 SEO actions, and open a PR for the owner. Use when the user says "weekly SEO review", "run /seo-weekly", "what should we do next for SEO", or when the Monday scheduled task fires.
---

# Weekly SEO review

The output is one PR the owner can review in five minutes. Work from data in the repo; don't guess.

When this runs as the scheduled task, it works in the dedicated `tripcache-seo-automation` checkout, freshly synced to `origin/main` (see `seo/README.md` → "How the AI part runs"). Create your branch from there. Never touch the owner's working checkout.

## 1. Read

- `seo/RULES.md`, `seo/STRATEGY.md`, `seo/backlog.md`, `seo/research/app-feature-inventory.md`
- `seo/data/summary.md`. Check its date: if the nightly feed hasn't run for 3+ days, say so at the top of the report and don't draw trend conclusions.
- `seo/CHANGELOG.md` and `seo/changelog.jsonl`
- `seo/data/search-console/{queries,opportunities,keyword-map,index-status}.json`, `seo/data/website/funnel.json`, `seo/data/site/technical-health.json`
- `seo/keywords.csv`
- Open PRs: anything SEO-related older than 7 days (R11)

## 2. Close the loop on past changes

For each `reviewed` changelog entry with no `lesson`:
- Look at the computed outcome. Check `confoundedBy`, and check the query mix for the page in `keyword-map.json`.
- Write one or two sentences in `lesson`: what we learned, stated so it changes future decisions. "Title naming the free calculator: no clear change at position ~5; snippet CTR isn't the bottleneck there" is a lesson. "Results were mixed" isn't.
- If the lesson generalizes, add or update a rule in `seo/RULES.md` with the incident.
- Then run `npm run seo:log -- render`.

## 3. Decide what's next

Re-rank `seo/backlog.md` with the summary in hand, in this order:
1. **Broken things:** site-health failures, indexing drops, lost redirects, tracking gaps.
2. **The R6 indexing gate:** if more than ~20% of sitemap pages aren't indexed, prefer improving or merging weak pages over new ones.
3. **Quick wins:** owner pages ranking 4–20 for P1/P2 keywords with weak CTR or thin answers.
4. **Gaps:** P1 clusters with a `NEW:` owner.
5. **Backlinks** that only need the owner to send something. List them; you can't send email.

Pick at most 3 changes on different pages that aren't inside another change's 28-day window (R9). Fewer, measurable changes beat many overlapping ones.

## 4. Do the work

Implement each chosen change by following the `seo-change` skill (`.claude/skills/seo-change/SKILL.md`) end to end, including the changelog entry. Put all of this week's changes on one branch, `seo/weekly-<yyyy-mm-dd>`.

## 5. Report

Write `seo/reports/<yyyy-mm-dd>.md` (keep it under a page):
- **Numbers:** 28-day clicks, impressions, CTR and position versus the previous 28 days; indexed pages; store-intent rate. Include the date range.
- **Results:** changes scored this week, with their lessons.
- **Shipped in this PR:** what, why, and when each will be scored.
- **Needs the owner:** anything only they can do, such as domain settings, sending outreach, or merging stale PRs.
- **Watch list:** anomalies that aren't actionable yet.

Then verify (`npm run seo:check`, `npm run seo:test`, build, local `check-site`), commit, push, and open the PR, with the report as the PR description.

**If nothing is worth changing this week,** still commit the report and the lessons. Use a PR titled "SEO weekly review — no changes".
