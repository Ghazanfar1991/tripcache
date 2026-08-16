# Initial growth audit — 2026-08-17

The immediate growth constraint is measurement, not a shortage of ideas. Search Console demonstrates demand, especially around TripCase alternatives and travel-planning queries, but the deployed site emits the placeholder GA identifier `G-XXXX`. The existing GA4 property has Android and iOS streams only. Website sessions and store-intent conversion are therefore unmeasurable.

RevenueCat showed one live active subscription, no trials, and an MRR display of 8 in an unverified UI currency. Pricing is inconsistent: the website pricing page says USD 5.99/month, site structured data says USD 9.99, the US App Store exposes USD 5.99/month and USD 50/year, and a historical Play transaction was observed at USD 9.99/month. No pricing or product change should occur until the intended current catalog is confirmed.

The safe sequence is: establish authenticated aggregate collection; add a GA4 web stream; normalize RevenueCat currency; reconcile price messaging; then prioritize one reversible SEO/funnel experiment.
