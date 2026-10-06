# Google Play screenshots and feature graphic

`out/play-01…08-*.jpg` (1080×1920, 9:16) and `out/play-feature-graphic.jpg` (1024×500) are what's in the Play Console store-listing draft, saved 2026-10-06.

Same story and art direction as the App Store set (`../../app-store/screenshots/`), adapted to Play's rules (`../research/play-competitors-and-rules-2026-10-06.md`):

- **Frameless.** The real screen sits as a rounded card. Google's large-format promotion surfaces ask for no device imagery and real UI in the first three shots.
- **Captions under 20% of the image** (headline 78px, subtext 36px).
- **Android status bar.** The raw captures come from the iOS simulator, so `build.py` covers the iOS status bar with a clean Android-style one (time left; signal, Wi-Fi and full battery right). It samples the app background under the bar so the fill and icon colour match each screen. The UI below the bar is the same React Native app on both platforms.
- **No Live Activity card** (iOS-only). Frame 4 is the flight detail screen, and its subtext mentions the Android home-screen widget.
- **8 frames** (Play's maximum): itinerary, free cancellation, email import (Pro), flight tracker (Pro), timeline, documents, budget, visa export.
- **Feature graphic:** wide blue-hour Sydney Harbour photo generated in ChatGPT (Ghazanfar Naseer's account, 2026-10-06, same style reference as the iOS backgrounds), with the app icon, name and a two-line headline on the left. No device imagery, ratings or badges.
- **Tablet screenshots:** the old 7" and 10" sets (iPad-sized canvases with typos) were removed from the draft. Add real Android tablet captures if tablet layouts ship.

Backgrounds and fonts are reused from `../../app-store/screenshots/assets/`.

```bash
python3 aso/google-play/screenshots/build.py   # renders out/NN-*.jpg and out/feature-graphic.png
python3 aso/google-play/screenshots/sheet.py   # contact sheet in build/
```

`build.py` writes `NN-*.jpg`; the uploaded copies are prefixed `play-` so they're easy to find in the Play asset library.
