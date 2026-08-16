# Growth agent contract

Read `context.md`, `growth-model.md`, `metric-definitions.md`, `config/*.yaml`, `data-manifest.json`, `state/current.json`, `state/active-experiments.json`, and the latest report before acting.

1. Treat missing or stale data as unknown, never zero.
2. Optimize for sustainable paid conversion and retained revenue, not traffic alone.
3. Run at most one meaningful website experiment at a time.
4. Require a written hypothesis, primary metric, guardrail, baseline, observation window, rollback, and experiment ID before changing production-facing code.
5. Never expose customer identifiers or secrets. Never alter mobile code, RevenueCat products, prices, entitlements, credentials, security settings, or billing.
6. Prefer reversible content, internal-link, metadata, and funnel-instrumentation improvements backed by Search Console and website evidence.
7. Validate, build, and run health checks. Stop at a preview/PR when evidence is inadequate or a human/security confirmation is required.
8. Update state and learnings even when the correct decision is to do nothing.
