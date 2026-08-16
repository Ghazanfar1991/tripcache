# Measurement foundation — 2026-08-17

## Observations

- Production was configured with the placeholder GA ID `G-XXXX`; the GA4 property had app streams only.
- Android store clicks were emitted as `app_store_click`, making platform funnel reporting ambiguous.
- Paid price structured data said USD 9.99 while the visible pricing page and US App Store showed USD 5.99 monthly; a historical Play transaction also showed USD 9.99.

## Decisions

- Reject placeholder/invalid GA IDs at render time. Add a real web measurement ID only after creating the web stream.
- Emit `app_store_click` for iOS and `play_store_click` for Android with consistent placement/platform parameters.
- Remove the unverified paid-price structured offer and explicit homepage FAQ price while retaining the factual free offer and linking people to the pricing page. Re-add paid structured pricing only after cross-store catalog reconciliation.

These are measurement/data-quality repairs, not growth experiments.
