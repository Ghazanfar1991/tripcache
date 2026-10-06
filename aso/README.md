# TripCache app-store optimization

Two separate projects, one per store, plus the app data they share. Landing-page SEO is a different project in [`../seo/`](../seo/README.md).

| Folder | Project | Start here |
| --- | --- | --- |
| [`app-store/`](app-store/README.md) | Apple App Store optimization | `app-store/data/summary.md` |
| [`google-play/`](google-play/README.md) | Google Play Store optimization | `google-play/data/summary.md` |
| `shared/data/` | Data covering both platforms: RevenueCat revenue (`revenue/`), Crashlytics quality and GA4 in-app usage (`app/`) | — |
| `scripts/` | Nightly collectors (`npm run aso:feed`, run by `.github/workflows/data-feed.yml`) | — |

The App Store project has its first research pass (`app-store/research/`, `app-store/listing/`, `app-store/keywords.csv`); Google Play has research only. Rules and changelogs still get built per store, using `../seo/` as the template.

It lives in this repo because the nightly collectors use credentials stored on this GitHub repository: keyless Google sign-in, plus the App Store Connect and RevenueCat keys. To move a store project to its own repo, copy its folder plus `scripts/` and `shared/`. Then re-add those secrets and grant the new repo access in the Google Cloud workload-identity settings.

Semrush only covers web search, so it can't do store keyword research. Use store-specific sources instead (see each store's README).
