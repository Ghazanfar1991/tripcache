# SEO backlog

Ranked by expected installs × confidence ÷ effort. The weekly review re-ranks this list and moves finished items into the changelog. Keyword-driven items from the Semrush research are added under "From keyword research".

## Now

1. **Ship the finished 2026-09-11 work that never deployed.** It's uncommitted in the owner's local checkout, mixed in with the in-progress redesign: two guides (flight time zones / arrival date; saving travel documents offline), the `/support` → `/about#support` redirect, visible breadcrumbs, image sitemap entries, and plan-claim corrections. Split it from the redesign, register the new URLs, and log each change. (R11)
2. **Make www → apex a permanent 308.** `https://www.trip-cache.com/*` currently answers 307. This is a domain-level setting in Vercel/Cloudflare, not repo code, so it needs the owner.
3. **Find out why `/blog/best-travel-apps-2025` fell from ~7 to ~15.7.** It's the biggest impressions page (2,238 impressions in 28 days, 4 clicks). Check the query → page split, the competing pages for "best travel apps for planning", and whether the 2025 slug or title is hurting it. Don't rename the URL (R4).
4. **Fix indexing before adding pages.** 16 of 39 pages were "discovered – not indexed" in September; the nightly index check will show the current list. For each page, decide whether to improve it, merge it into its cluster owner (with a redirect), or drop it. (R6)
5. **Resolve the TripIt cannibalization.** Four pages compete for TripIt-alternative searches. Pick one owner in `keywords.csv`; merge or differentiate the rest. (R5)

## Next

6. **Stray URLs getting impressions:** `/blog/best-travel-5d5d2b` and `/blog/best-travel-id-2025` showed up in Search Console. Find where Google found them; redirect them if they resolve.
7. **Weak hub pages:** `/alternatives/tripit` (~48), `/alternatives/tripcase` (~50), `/pricing` (~42) and `/blog` (~48) rank poorly for their queries. Check content depth and internal links.
8. **TripCase demand:** "tripcase" brings 1,000+ impressions a month at position 7–11 with under 1% CTR. Make sure the shutdown guide answers "what replaces TripCase" in the title/snippet without targeting "tripcase login" style navigational searches (R7).
9. **Backlink outreach waiting on the owner:** `backlinks.json` has pitches ready for Tom's Guide, The Points Guy, Travel + Leisure, Marie Claire and a business-travel guide. They need sending from the owner's email.

## From keyword research

_Filled from `research/semrush-2026-10/` once the Semrush pull finishes._
