# App Store screenshots

`out/en-US/` (also used for en-CA) and `out/en-AU/` (also used for en-GB) are the 10 iPhone frames uploaded to draft version 1.4.1 on 2026-10-06, at 1290×2796 (the 6.7"/6.9" slot). The two sets differ only in frame 1 ("organized" vs "organised").

- `assets/screens/`: real TripCache screens with the latest UI, captured from the iOS simulator and framed by `videos/tripcache-promo/scripts/frame_phone.py` (promo-video session).
- `assets/fonts/`: brand fonts (Fraunces, Inter).
- `assets/backgrounds/`: one blue-hour destination photo per frame, matched to the trip on that screen (Sydney, New York, Singapore, a departing jet, Melbourne x2, a travel-documents still life, Great Ocean Road, London, Bangkok). Generated 2026-10-06 with ChatGPT image generation (Ghazanfar Naseer's account, chatgpt.com), using the app's own Melbourne trip-cover image (`videos/tripcache-promo/assets/landmark-melbourne-au.webp`) as the style reference. Brief: blue hour, indigo-to-violet-to-magenta sky, warm city lights; landmark between 22% and 45% of the height so it shows between the headline and the phone; no text, logos, liveries or recognisable people. 1024x1536 PNG originals converted to WebP q92.
- `build.py`: renders each frame from HTML with headless Chrome. Captions, callouts (enlarged crops of the same screens) and the Live Activity card (rebuilt from `WidgetLiveActivity.swift` via `videos/tripcache-promo/live-activity-spec.md`) are all code, so text stays exact. The app UI and all text are real; only the scenery behind the phone is generated.

```bash
python3 aso/app-store/screenshots/build.py            # both locales
python3 aso/app-store/screenshots/sheet.py en-US      # contact sheet in build/
```

To change a caption or the order, edit `FRAMES` in `build.py`. Apple allows up to 10 per device size; keep the first three strongest because they show in search results.
