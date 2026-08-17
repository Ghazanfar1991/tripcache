# Growth model

The model is: qualified organic discovery → landing or comparison page → store-intent click → install → activated customer → trial/subscription → retained MRR.

Each stage has an evidence gate. Search Console can measure discovery and landing-page demand. A GA4 web stream is required for store-intent conversion. App analytics measures activation. RevenueCat measures subscriptions, churn, and recurring revenue. The engine must not substitute one stage for another or claim causal lift from a single before/after observation.

Priority score = expected retained-revenue impact × evidence confidence × reversibility ÷ implementation effort. Data repair outranks experimentation when a critical funnel stage is unmeasurable.

During the four-week sprint ending 2026-09-17, speed comes from parallel independent tests and twice-weekly execution, not from declaring results before enough data exists. Up to three distinct URLs/query clusters may be tested at once. The engine should favor high-impression pages with weak CTR, deeper page/CTA improvements, internal-link clusters, and useful assets that can earn editorial references.

The 7 PM daily collection stores both finalized Search Console evidence and a separate fresh-data pulse. At 72 hours, the pulse is used to catch indexing, rendering, tracking, and severe directional regressions. Because fresh rows may still change, experiment winners are chosen from finalized evidence after the 14-day window. Monday and Thursday intelligent cycles act on new evidence every 3–4 days; independent experiments do not wait for an existing test to finish.

Backlinks are evaluated by topical relevance, editorial legitimacy, likely qualified referral traffic, destination-page fit, and effort. A small number of real travel/app references outranks bulk low-quality directory links. All outreach must use an accurate owner/founder identity and truthful product claims.
