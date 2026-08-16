# Weekly growth cycle

Operate inside the TripCache landing-page repository. Follow `growth/AGENT.md` exactly.

Review source freshness, current state, the latest weekly report, Search Console opportunities, revenue and funnel evidence, active experiments, and production health. Decide whether the highest-value action is measurement repair, a reversible website/SEO experiment, or explicitly no change.

If making a change, create/update the experiment record first, keep scope small, validate and build, and run the local health check. Commit on a dated `codex/growth-*` branch, push it, open a pull request, wait for required CI checks, merge only after they pass, then wait for and verify the Vercel production deployment with `npm run growth:health`. Record the production commit and deployment time. Never bypass a human/security confirmation or modify mobile/store/subscription configuration. Always update learnings and orchestrator evidence, including when the correct decision is no change.
