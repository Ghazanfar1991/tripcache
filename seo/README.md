# TripCache SEO (landing page)

This folder is the memory for trip-cache.com's search work: what we target, what we changed, whether it worked, and the rules that stop us repeating mistakes. App Store and Google Play optimization lives separately in [`../aso/`](../aso/README.md).

**Goal:** qualified search visitors → store clicks → installs. Traffic alone isn't the goal.

## The loop

| When | Who | What happens |
| --- | --- | --- |
| Every night, 7 pm Sydney | GitHub Actions (`.github/workflows/data-feed.yml`) | Pulls Search Console, index status and GA4 web data; crawls production against the rules; scores changelog entries whose 28 days are up; commits `seo/data/` and `seo/CHANGELOG.md`. No AI involved. |
| Monday 9 am | Claude scheduled task on the owner's Mac ("TripCache SEO weekly review") | Runs the `seo-weekly` skill: writes lessons for scored changes, picks the next 1–3 actions, makes them on a branch and opens a PR. |
| Thursday 9 am | Claude scheduled task ("TripCache SEO midweek check") | Checks the data feed, site health, indexing and stale PRs. Opens a fix PR only if something broke. |
| When a PR arrives | You | Review and merge. Nothing ships without your merge. |
| Any time | You or Claude (`seo-change` skill) | Make an SEO change by the same rules: check the keyword map, change the page, log it, open a PR. |

### How the AI part runs

The scheduled tasks are Claude desktop-app tasks, so they use the owner's Claude subscription.
- They run while the app is open. A task that was due while the app was closed runs on the next launch.
- They work only in a dedicated checkout, `../tripcache-seo-automation`. `seo/scripts/sync-automation-checkout.sh` resets it to `origin/main` at the start of every run, so nobody's unfinished work can block it (R12). **Don't edit files in that folder; anything there is discarded on the next run.**
- Task definitions live in `~/.claude/scheduled-tasks/`. Manage them from the desktop app's scheduled tasks list.

## Files

| File | What it is |
| --- | --- |
| [`RULES.md`](RULES.md) | Never-again rules, each tied to the mistake that created it. **Read first.** |
| [`STRATEGY.md`](STRATEGY.md) | Audience, positioning, markets, and the keyword clusters we're going after. |
| [`keywords.csv`](keywords.csv) | Keyword map. Each keyword belongs to a cluster, and each cluster has exactly one owner page (`/path`, `NEW:/path`, or `SKIP`). |
| [`changelog.jsonl`](changelog.jsonl) → [`CHANGELOG.md`](CHANGELOG.md) | Every change search can see, with its automatically computed 28-day result and the lesson. |
| [`backlog.md`](backlog.md) | **The roadmap checklist:** what's done `[x]` and what's next `[ ]`, in order. |
| [`url-registry.json`](url-registry.json) | Every URL we've ever published, and whether it's live or redirected. |
| [`backlinks.json`](backlinks.json) | Backlink opportunities and their outreach status. |
| [`research/`](research/) | Keyword and competitor research. `semrush-2026-10/` is the one-time Semrush trial export; Semrush isn't available after 2026-10-12. |
| `data/` | Nightly snapshots written by the bot. Start with [`data/summary.md`](data/summary.md). |
| `reports/` | Weekly review notes. |
| `scripts/` | Data feed, checks and changelog tooling. |

## Commands

```bash
npm run seo:log -- add --type title-meta --pages /blog/x --keywords "kw one;kw two" --summary "What changed" --why "Evidence or hypothesis"
npm run seo:check            # static rules: changelog, keyword map, URL registry
npm run seo:site -- --base-url https://trip-cache.com --no-write   # crawl a running site against the rules
npm run seo:log -- review    # score finished changes (runs nightly)
npm run seo:summary          # rebuild data/summary.md from the latest data
npm run seo:test
```

Change types: `title-meta`, `content-update`, `new-page`, `internal-links`, `technical`, `schema`, `redirect`, `site-wide`, `backlink`, `removal`. Use `pages: ["*"]` for site-wide changes. `date` is the day it reached production.

## How results are judged

28 days after a change ships, the nightly run compares the 28 days before with the 28 days after, for the pages in the entry. The rest of the site is the control: if the whole site gained 30% clicks, a page needs more than 30% to count.

- **better:** clicks beat the site-adjusted expectation by at least 20% (and at least 5 clicks), or position improved by 2+ without losing clicks.
- **worse:** the mirror image, or position dropped by 3+.
- **no clear change:** anything in between.
- **too little data:** under 200 impressions across both windows.
- **launched:** new pages, reported with their first 28 days.
- **⚠ confounded:** another change touched the same pages (or the whole site) during the window, so the result can't be attributed cleanly.

The verdict is computed; the **lesson** is written by whoever reviews it. Lessons that generalize become rules.

## Data sources

- **Search Console** (keyless Google auth from GitHub Actions): queries, pages, countries, devices. It keeps a growing `page-daily.csv` and `site-daily.csv`; the first run backfills about 16 months. Data lags 3 days.
- **URL Inspection API:** index status of every sitemap URL, nightly.
- **GA4 web stream:** landing-page traffic and App Store / Play click intent per page.
- **Production crawl:** titles, descriptions, canonicals, H1s, JSON-LD, sitemap, registry, redirects, orphans.

Missing or stale data is reported as unknown, never as zero.
