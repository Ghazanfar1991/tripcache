# Image provenance

Editorial images created for the site. All are illustrations of a concept, never product screenshots or claims about what the app does. Style: cut-paper and gentle 3D editorial, warm ivory paper, muted teal and indigo, soft coral; no text, logos or real people.

| File | Concept | Created | How |
| --- | --- | --- | --- |
| `public/blog-cover-flight-time-zones.webp` | Flight times and arrival dates across time zones | 2026-09-11 | OpenAI image generation via Codex |
| `public/blog-cover-offline-travel-documents.webp` | Saving travel documents offline before departure | 2026-09-11 | OpenAI image generation via Codex |
| `public/blog-cover-hotel-cancellation-policies.webp` | Hotel cancellation deadline: key card, alarm clock, calendar with one day circled | 2026-10-05 | OpenAI image generation via Codex (`codex-imagegen` skill), 1536×1024 PNG cropped to 1200×630 WebP; existing covers used as style references |
| `public/blog-cover-travel-history.webp` | Finding past travel history: passport stamps, globe, flight path | 2026-10-05 | Same as above |
| `public/blog-cover-wanderlog-vs-tripit.webp` | Planning a route vs organizing bookings: two notebooks side by side | 2026-10-05 | Same as above |

## App artwork

Not generated for the site: these come from the TripCache mobile app's own assets (`trip-cache-app/assets`) and are used by the 2026-10-05 landing redesign (DESIGN.md).

| File | What it is | Used on |
| --- | --- | --- |
| `public/brand-landmarks.webp` | The app's landmarks artwork | Home hero "Trip to" postcard, 404 page |
| `public/brand-suitcase-pass.webp` | The app's 3D suitcase and boarding pass | Home hero collage, About hero |

## Prompts

The 2026-09-11 covers were generated from these prompts, recorded in the old `growth/reports/blog-images-2026-09-11.json`. Method: built-in image generation, originals preserved in Codex generated_images; the WebP copies in `public/` were optimized with sharp, with no content edits.

**`public/blog-cover-flight-time-zones.webp`** (1536×1024 original, 196,340 bytes as WebP):

> Use case: illustration-story. Asset type: wide editorial blog hero, 1536 by 1024 landscape. Primary request: a tasteful travel illustration about understanding flight times and arrival dates across time zones. Scene: a small passenger airplane arcs over a beautifully textured partial globe transitioning from warm daylight on one side to deep blue night with stars on the other, subtle curved longitude lines and two simple analog clock faces integrated around the globe. Warm ivory paper background, muted teal and indigo, soft coral sun. Sophisticated cut-paper and gentle 3D editorial style, clear spacious composition, main details inside central area for 16:9 cropping. No words, letters, numbers, logos, UI, watermark, or false app screenshot. No map labels. Attractive and legible at card thumbnail size.

**`public/blog-cover-offline-travel-documents.webp`** (1536×1024 original, 170,312 bytes as WebP):

> Use case: illustration-story. Asset type: wide editorial blog hero, 1536 by 1024 landscape. Primary request: a tasteful travel illustration about saving travel documents offline before departure. Scene: an elegant smartphone resting beside an open travel folder holding a few clearly blank boarding-pass-shaped papers, small passport-like plain booklet and luggage tag on a warm ivory tabletop. On the phone screen show only a simple folder symbol with a checkmark and small airplane symbol for airplane mode, no text or app interface. Sophisticated cut-paper and gentle 3D editorial style with real paper texture, muted teal, indigo and soft coral accents, soft daylight and tactile shadows. Spacious diagonal arrangement, main objects centered for 16:9 cropping, legible at thumbnail size. No readable words, numbers, personal data, real document details, barcode, logos, watermark, or claimed app screenshot.

## Screenshots for the 2026-10-29 guides (`public/blog-media/`)

Inline images are real app UI, resized or cropped with sharp, no content edits. Covers are generated illustrations (below).

| File | Source |
| --- | --- |
| `ai-agent-trip-card-claude.webp`, `ai-agent-car-added-claude.webp`, `ai-agent-car-booking-chatgpt.webp` | `trip-cache-app/audits/agent-cards/` (MCP Apps cards rendered in the local Claude/ChatGPT host harness from fixtures, 2026-10-29) |
| `ai-agent-flight-card.webp` | `trip-cache-app/audits/mcp-flight-card/progress-widget/airport.png`, dark-host card |
| `siri-next-flight-card.webp`, `siri-hotel-card.webp`, `siri-baggage-belt-card.webp` | `trip-cache-app/audits/siri-app-intents/` 15, 16 and 06 (iOS 27 simulator, cropped to the Siri result) |
| `iphone-duo-*-two-panes.webp` | The left and right inner-display panes in `public/duo/` on the site-features branch (`claude/site-agent-siri-duo-bf92a9`), joined side by side with a 24 px hinge gap |

## Covers for the 2026-10-29 guides

Generated 2026-10-29 with the OpenAI image tool via Codex (`codex-imagegen` skill, model gpt-6-luna), 1536×1024 PNG center-cropped to 1200×630 WebP, with `blog-cover-travel-history.webp` and `blog-cover-wanderlog-vs-tripit.webp` as style references. Each brief ended with the shared style line: cut-paper and gentle 3D editorial, warm ivory paper, muted teal and indigo with soft coral, no words, logos, real people or app UI.

| File | Concept |
| --- | --- |
| `public/blog-media/blog-cover-connect-chatgpt-claude.webp` | A speech bubble plugged by a paper cable into an open suitcase; plane, hotel key and car float out |
| `public/blog-media/blog-cover-ai-assistants-bookings.webp` | Several different speech bubbles threaded to one folded itinerary card; one bubble unconnected |
| `public/blog-media/blog-cover-ask-siri-flight.webp` | Sound waves reaching a boarding pass, a plane taking off, a suitcase on a carousel |
| `public/blog-media/blog-cover-iphone-duo-travel.webp` | A half-open pop-up book, coastline on one page and city on the other, a paper plane crossing the fold |
