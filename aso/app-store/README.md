# App Store optimization (iOS)

Research done 2026-10-06; no listing change published yet. Data is collecting nightly.

**Research and listing**
- [`research/app-store-aso-2026-10-06.md`](research/app-store-aso-2026-10-06.md): analytics baseline, rankings, competitors, metadata/screenshot/ratings findings and the order of work.
- [`listing/proposed-2026-10.md`](listing/proposed-2026-10.md): live listing vs ready-to-paste proposed copy per locale (en-US, en-AU, en-GB, en-CA).
- [`keywords.csv`](keywords.csv): target keywords, priority and which field covers each one.
- `research/keyword-data-2026-10-06.csv`: raw autocomplete, rank and competition measurements.

**Data**
- `data/downloads.json`: first-time downloads, redownloads and updates per day (App Store Connect Sales & Trends).
- `data/dashboard-baseline.json`: a manual App Store Connect dashboard baseline from August 2026.
- `data/summary.md`: one-page overview, iOS slice of shared data included.

**For keyword research**
- Apple Search Ads keyword popularity (free with an account).
- App Store Connect → App Analytics → Sources (search vs browse vs referrer).
- Optionally, a trial of a dedicated ASO tool.

**Known starting points:** most new iOS users show as "direct" in GA4, so store search attribution is missing. Most of the in-app funnel (sign-up → activation → purchase) isn't instrumented.
