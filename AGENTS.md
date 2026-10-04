<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SEO and app-store work

Search work for trip-cache.com follows the system in `seo/` (start with `seo/README.md`, then `seo/RULES.md`). Any change search engines can see (content, titles/meta, pages, redirects, sitemap, schema, internal links) needs an entry in `seo/changelog.jsonl` and must respect the keyword map in `seo/keywords.csv`; CI enforces both. Use the `seo-change` skill for such changes and `seo-weekly` for the weekly review. App Store / Google Play optimization and app data live in `aso/`.
