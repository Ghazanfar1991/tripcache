# Metric definitions

- **MRR (AUD):** RevenueCat normalized recurring revenue in AUD. UI values in another currency are labeled, not converted ad hoc.
- **Active subscriptions:** currently active paid subscriptions from RevenueCat.
- **Organic clicks/impressions/CTR/position:** Search Console web-search metrics with a three-day reporting lag.
- **Store-intent rate:** unique users with an App Store or Play Store click divided by unique web landing-page users. Requires a valid GA4 web stream.
- **Activation:** an app user completing the product's defined first-value event. Unknown until that event is verified.
- **Retention:** returning active users or retained subscribers over a defined cohort period; source and window must always accompany the value.
- **Google Play user installs:** official daily user installs from the Play Console Cloud Storage statistics export; reported with its 3–7 day lag.
- **App Store first-time downloads:** App Store Sales and Trends app units (product types 1, 1F, and 1T); redownloads and updates are excluded.
- **Screen popularity:** GA4 `screen_view` events grouped by Firebase screen name/class and platform. Aggregate counts contain no user identifiers.
- **Crash-free users/sessions:** Firebase Crashlytics aggregate quality metrics; never infer these from raw crash counts when the denominator is unavailable.
- **Experiment win:** primary metric improves beyond the predeclared threshold with no guardrail regression and enough observation time. Otherwise record inconclusive or loss.
