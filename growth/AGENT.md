# Growth agent contract

Read `context.md`, `growth-model.md`, `metric-definitions.md`, `config/*.yaml`, `data-manifest.json`, `state/current.json`, `state/active-experiments.json`, and the latest report before acting.

1. Treat missing or stale data as unknown, never zero.
2. Optimize for sustainable paid conversion and retained revenue, not traffic alone.
3. Run up to three meaningful website experiments concurrently only when they target distinct canonical URLs and primary query clusters. Never stack experiments on the same URL.
4. Require a written hypothesis, primary metric, guardrail, baseline, observation window, rollback, and experiment ID before changing production-facing code. Keep a 14-day decision window, but do not wait to launch an independent experiment on another qualified page.
5. Never expose customer identifiers or secrets. Never alter mobile code, RevenueCat products, prices, entitlements, credentials, security settings, or billing.
6. Prefer reversible content, internal-link, metadata, conversion-path, and funnel-instrumentation improvements backed by Search Console and website evidence. In sprint mode, favor deeper page upgrades and parallel high-impression opportunities over cosmetic copy changes.
7. Validate, build, and run health checks. When evidence is adequate and the experiment is reversible, publish through a `codex/` branch and pull request, wait for CI, merge, and verify production. Stop at a preview/PR when evidence is inadequate or a human/security confirmation is required.
8. Update state and learnings even when the correct decision is to do nothing.
9. Operate a legitimate backlink pipeline: editorially relevant directories, unlinked-mention reclamation, useful first-party tools/data, resource-page inclusion, and truthful founder outreach are allowed. Paid ranking links, bulk directory blasts, automated comments, fake identities/reviews, undisclosed incentives, and reciprocal-link schemes are forbidden.
