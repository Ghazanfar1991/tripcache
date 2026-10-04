---
name: seo-change
description: Make any change to trip-cache.com that search engines can see (new or updated blog post or landing page, title/meta rewrite, internal links, schema, redirects, removing a page) following the TripCache SEO system's rules, keyword map and changelog. Use whenever the user asks to write SEO content, optimize a page, target a keyword, add or remove a page, or act on an item from seo/backlog.md.
---

# Make an SEO change the TripCache way

The system lives in `seo/` (see `seo/README.md`). These steps keep every change targeted, logged and measurable. Don't skip steps because a change looks small; small untracked changes are how the old system lost track.

## 1. Load context

Read `seo/RULES.md`, `seo/STRATEGY.md`, `seo/data/summary.md` and `PRODUCT.md` (product facts, plans and prices, voice; never contradict it). If you're writing Next.js code, follow `AGENTS.md` first.

## 2. Pin the target

- Find the keyword's cluster in `seo/keywords.csv`. The cluster's `owner` is the only page that should target it (R5).
  - **Owner is a live path:** improve that page. Don't create a new one.
  - **Owner is `NEW:/path`:** a new page is planned. Check the R6 indexing gate in `seo/data/summary.md` first.
  - **Owner is `SKIP`:** don't target it (R7). Tell the user why.
  - **Keyword isn't in the map:** add a row (keyword, cluster, owner, intent, priority, volumes if known, source) and explain the choice.
- Check `seo/changelog.jsonl` for the owner page. If a `shipped` entry for that page (or a site-wide entry) is still inside its 28-day window, changing it now will confound that result (R1, R9). Tell the user and propose waiting, or proceed only if they accept losing that measurement.

## 3. Make the change

Where things live:
- **Blog posts:** `content/blog/<slug>.ts` (metadata + markdown), registered in `lib/blog.tsx`. The sitemap picks them up automatically.
- **Feature / alternative landing pages:** `lib/seo-page-data.ts`, rendered by `app/features/[slug]` and `app/alternatives/[slug]`.
- **Other pages:** `app/**/page.tsx`. **Sitemap:** `app/sitemap.ts`. **Redirects:** `next.config.mjs`.
- **When the date changes,** update `updatedAt` on posts. Don't change a post's `date`.

Use the installed SEO skills where they fit. Base the work on our data (Search Console queries for the page in `seo/data/search-console/keyword-map.json`, plus `seo/research/`), not generic advice:
- **New article or big rewrite:** `searchfit-seo:content-brief` first, then `seo-article-writer-faq:seo-article-writer` or `searchfit-seo:create-content`. Run `seo-article-writer-faq:seo-article-audit` on the result.
- **Title/meta/on-page:** `searchfit-seo:on-page-seo`, then `searchfit-seo:seo-check`.
- **Structured data:** `searchfit-seo:schema-markup`.
- **Links:** `searchfit-seo:internal-linking`.
- **If those skills aren't available** (for example if a plugin is disabled), apply the same checks by hand.

Quality bar:
- Answer the searcher's question in the first screen.
- Show the product working; use real screenshots from `public/`.
- Make no claim that the app or the stores don't back up (R8).
- No invented statistics, testimonials or ratings.
- Keep the title ≤ 60 characters, put the main keyword near the start, and make it specific enough to earn the click. Keep the meta description ≤ 155 characters.

URL rules:
- **New page:** evergreen slug with no year (R4). Add it to `seo/url-registry.json` as `live`. Link to it from at least two related pages.
- **Removing or renaming a page:** add a permanent redirect in `next.config.mjs` to the closest replacement. Set the registry entry to `redirected` with `redirectTo` (R3). Never rename a ranking URL just to change its year.

## 4. Log it

```bash
npm run seo:log -- add --type <title-meta|content-update|new-page|internal-links|technical|schema|redirect|site-wide|backlink|removal> \
  --pages "/path/one;/path/two" --keywords "keyword one;keyword two" \
  --summary "What changed, concretely (old → new title, etc.)" \
  --why "The evidence: impressions/position/CTR from Search Console or research, and what you expect to improve" \
  --date <expected production date>
```

If it ships on a different day, fix `date` in `seo/changelog.jsonl` (results are measured from that date).

## 5. Verify

```bash
npm run seo:check
npm run seo:test
npm run build            # if Turbopack complains in a git worktree, use: npx next build --webpack
START_LOCAL_SITE=1 node seo/scripts/check-site.mjs --base-url http://127.0.0.1:3000 --no-write
```

All must pass. Fix failures; don't weaken checks.

## 6. Hand off

- Commit on a branch named `seo/<yyyy-mm-dd>-<short-slug>`.
- Push and open a PR whose description states: target keywords and owner page, the evidence, what changed, the expected effect, and the date the result will be scored (ship date + 31 days).
- Don't merge. The owner merges.
