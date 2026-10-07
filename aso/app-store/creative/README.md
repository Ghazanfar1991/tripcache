# App Store creative assets and App Preview (2026-10-07)

Apple's creative assets appear on iOS 27 / iPadOS 27 and later. Specs: [creative assets](https://developer.apple.com/help/app-store-connect/reference/app-information/creative-assets-specifications), [app previews](https://developer.apple.com/help/app-store-connect/reference/app-information/app-preview-specifications), [best practices](https://developer.apple.com/app-store/asset-best-practices/). Everything is in draft version **1.4.1** only; nothing is submitted.

| File | Slot | Spec | Idea |
|---|---|---|---|
| `out/tripcache-header-21x9.mp4` | Product page header (uploaded, en-AU; the other locales inherit it) | 3840×1646, 30 fps, 14.4 s, muted seamless loop | One idea: "Every booking, one itinerary." Real app footage plays in an iPhone 17 Pro Max: home → New York trip → hotel with its free-cancellation date → live QF 480 flight, then back to the opening frame |
| `out/tripcache-header-21x9.jpg` | Header alternative (not uploaded) | 3840×1646, no alpha | Static version, ready for a product page optimization test |
| `out/tripcache-search-3x2.jpg` | Search results (uploaded, en-AU) | 3840×2560 JPEG | States the category with the top keyword phrase ("Itinerary planner & trip organizer") and shows three real screens |
| `out/tripcache-app-preview-886x1920.mp4` | App Preview, 6.9" iPhone (replaced the promo cut in en-AU, en-US, en-CA, en-GB; poster at 5 s) | 886×1920, 26.7 s, 30 fps, H.264 High L4.0, AAC 256 kbps stereo 48 kHz | Real simulator recordings in six captioned beats: itinerary, trip timeline, free-cancellation reminder, email-import draft review, live flight, budget |

- **Footage:** recorded 2026-10-07 with `xcrun simctl io <udid> recordVideo` on a dedicated "TripCache Capture 17 Pro Max" simulator (UDID 468C18C9-…), running a Release build of `trip-cache-app` signed in to the owner's demo account (John Doe, Pro). Raw `.mov` files and constant-frame-rate copies are in `raw/`, which is gitignored (about 95 MB). The recording only tapped through screens: no reminders saved, no draft accepted, nothing created.
- **Captions** reuse the screenshot phrases. There are no prices, URLs, other platforms, awards or ratings. The UI shows sample prices inside the app (e.g. "$2,140" on a booking), which is real UI rather than a pricing claim.
- **Backdrops and fonts** are the same as the screenshot set: blue-hour destination photos generated in ChatGPT (see `../screenshots/README.md`), plus Fraunces and Inter. The wide Sydney backdrop is the Google Play feature-graphic image (`assets/bg-sydney-wide.webp`). The bezel is Apple's iPhone 17 Pro Max frame (`assets/iphone-17-pro-max-silver.png`, screen at 75,66 in 1470×3000).
- **Music bed:** the promo's "Future Bright" cut (`videos/tripcache-promo/assets/bgm/future-bright-cut.mp3`, HeyGen library), starting at its drop (5.99 s).
- **Superseded:** the HyperFrames promo cut previously in the App Preview slot (`videos/final/TripCache-appstore-preview-886x1920-28s.mp4`) showed recreated UI. Keep it for social and the website, not for the App Store.

Rebuild (needs the raw recordings):

```bash
python3 aso/app-store/creative/creative.py          # static header + search image
python3 aso/app-store/creative/videos.py            # App Preview + header loop
```

Beat cut points are the `PREVIEW` / `HEADER` lists in `videos.py`, with times relative to `raw/cfr/*.mp4` (30 fps copies of the recordings).
