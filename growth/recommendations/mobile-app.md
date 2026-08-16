# Mobile-app recommendations (owner-reviewed; not automatically edited)

1. Verify both Android crash groups on the latest 1.3.5 (47) build. Historical 30-day evidence is six early `libreactnative.so` load failures and four Hermes `SIGSEGV` events; do not patch blindly if the issues are already absent from 1.3.5.
2. Add a single verified activation event for first product value, such as the first successfully parsed/imported trip or first approved draft. Keep onboarding completion separate from activation.
3. Standardize screen names so GA4 `unifiedScreenName` produces stable product areas rather than implementation-specific classes. Review screens with users but low repeat engagement during the weekly cycle.
4. Carry privacy-safe web campaign attribution into first open where platform rules permit, while keeping official store downloads separate from GA4 `first_open` proxies.
5. Reconcile monthly/yearly products and entitlement presentation across App Store Connect, Google Play, RevenueCat, and the website before changing any public price.
