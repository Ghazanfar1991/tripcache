# App Store (iOS) backlog

- [x] 2026-10-06 Research, keyword map, metadata for en-AU/en-US/en-GB/en-CA in draft 1.4.1 (`research/`, `listing/`)
- [x] 2026-10-06 New 10-frame iPhone screenshot set (`screenshots/`)
- [x] 2026-10-07 Product page header video, search-results asset and a real-UI App Preview in draft 1.4.1 (`creative/`)
- [x] 2026-10-07 Build 1.4.1 (83) built locally with `eas build --local`, uploaded with `eas submit`, attached and submitted for review (Waiting for Review)
- [ ] After 1.4.1 is live: update `app_runtime_config` (ios: latest_version 1.4.1, latest_build 83) per `New Release Instructions.rtf`
- [ ] App: rating-prompt change (2 milestones / 2 days, plus a "Rate TripCache" row); the biggest ranking lever
- [ ] 28 days after 1.4.1 goes live: compare search impressions per day with the Sep 7–Oct 1 baseline (28.4/day)
- [ ] Later: localized captions if more languages are added; product page optimization test of the static vs video header
- [ ] Later: custom product pages for flight-tracking and travel-documents searches

## Google Play

- [x] 2026-10-07 Android 1.4.1 (61) built on EAS, uploaded in Play Console, sent for review with the new listing (9 changes)
- [ ] After it's live: update `app_runtime_config` (android: latest_version 1.4.1, latest_build 61)
- [ ] Once build 60 is off internal testing, change the advertising ID declaration to "No" (1.4.1+ block AD_ID)
- [ ] Set up a Google Play service account in EAS so `eas submit -p android` works next time
- [ ] Fix the Data safety answer "Data isn't encrypted" after confirming all traffic is HTTPS
