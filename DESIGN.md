---
name: TripCache
description: The post-booking travel organizer's marketing site, built in the mobile app's own visual world.
colors:
  violet: "#612bd3"
  violet-mid: "#4a1eac"
  violet-night: "#2a1170"
  violet-deep: "#3f1a9a"
  violet-focus: "#4d20af"
  violet-soft: "#ebe8ff"
  violet-mist-text: "#e4dcff"
  magenta: "#d82d7e"
  bloom-violet: "#8b5cf6"
  bloom-pink: "#ec4899"
  ink: "#0e0e0e"
  ink-2: "#3a3d42"
  mute: "#686d72"
  line: "#e7e9eb"
  canvas: "#f0f2f4"
  mist: "#f5f7f9"
  white: "#ffffff"
  hero-wash: "#f7f5ff"
  cat-flight: "#6366f1"
  cat-flight-ink: "#4f46e5"
  cat-flight-soft: "#eef2ff"
  cat-hotel: "#12b76a"
  cat-hotel-ink: "#067647"
  cat-hotel-soft: "#e8f8f0"
  cat-car: "#f59e0b"
  cat-car-ink: "#b54708"
  cat-car-soft: "#fff5d6"
  cat-activity: "#d82d7e"
  cat-activity-ink: "#c12570"
  cat-activity-soft: "#fce7f2"
  gold: "#fec84b"
  live-green: "#00ff9e"
  live-gate: "#ffc933"
  live-surface: "#0b0b10"
  board-ink: "#17151f"
typography:
  display:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(44px, 5.6vw, 78px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "\"SOFT\" 50"
  headline:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(36px, 4.8vw, 62px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "\"SOFT\" 50"
  statement:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(30px, 4.3vw, 58px)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.3
  numeral:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\""
  script:
    fontFamily: "Allura, Snell Roundhand, cursive"
    fontSize: "clamp(52px, 7vw, 96px)"
    fontWeight: 400
    lineHeight: 0.9
  lede:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.68
    fontFeature: "\"cv11\", \"ss01\""
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.8
    fontFeature: "\"cv11\", \"ss01\""
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sm: "10px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  panel: "26px"
  card: "30px"
  postcard: "34px"
  pill: "9999px"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  grid-gap: "20px"
  card-pad: "24px"
  card-pad-sm: "32px"
  section-y: "96px"
  section-y-sm: "128px"
  container: "1200px"
  container-narrow: "1080px"
components:
  button-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-primary-large:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-on-violet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.violet}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-on-violet-hover:
    backgroundColor: "{colors.violet-soft}"
  button-quiet:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-quiet-hover:
    backgroundColor: "{colors.line}"
  nav-link:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  nav-link-active:
    backgroundColor: "{colors.violet-soft}"
    textColor: "{colors.violet}"
  segmented-control:
    backgroundColor: "{colors.white}"
    rounded: "14px"
    padding: "4px"
  segmented-control-active:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    height: "40px"
  chip-category-flight:
    backgroundColor: "{colors.cat-flight-soft}"
    textColor: "{colors.cat-flight-ink}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  chip-reminder:
    backgroundColor: "{colors.cat-car-soft}"
    textColor: "{colors.cat-car-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-pro:
    backgroundColor: "{colors.cat-car-soft}"
    textColor: "{colors.cat-car-ink}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  bloom-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad-sm}"
  bloom-card-dark:
    backgroundColor: "{colors.live-surface}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad-sm}"
  list-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "12px 14px"
  faq-toggle:
    backgroundColor: "{colors.violet-soft}"
    textColor: "{colors.violet}"
    rounded: "{rounded.sm}"
    size: "36px"
  faq-toggle-open:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
---

# Design System: TripCache

<!-- Scope: this file governs the whole marketing site: the home page (components/home/*, app/home.css), the global navigation and footer, and every other route, which is built from the page kit (components/site/kit.tsx, components/site/*, components/seo/tool-page.tsx, app/tc-tokens.css, app/tools/tools.css). It was recorded from the shipped build on 2026-10-05. The retired "design-one" paper look (app/design-one.css, the paper/ink tokens in the first :root block of app/globals.css) is not part of this system; do not copy it into new surfaces. Product and plan facts in any copy come from seo/research/app-feature-inventory.md (see PRODUCT.md), never from this file. -->

## Overview

**Creative North Star: "The Inbox Becomes the Trip"**

The site is not a brand world invented for marketing; it is the TripCache mobile app (trip-cache-app/lib/theme.tsx) opened up to page scale. A cool grey canvas (#f0f2f4 family) carries white cards with hairline borders; soft, heavily blurred colour pools ("prismatic bloom") sit clipped inside sections and cards the way they do in the app; violet carries every action. Bookings are always colour-coded the app's way: flight indigo, hotel green, car amber, activity pink. Fraunces sets every heading, Inter does the work, and Allura appears only to write "Trip to" before a destination. Every demonstration on the page is built from the app's own artefacts — its screenshots, its landmarks postcard and 3D suitcase art, its toasts, its black-and-neon-green Live Activity — never from generic illustration.

The page tells one story: confirmation emails scattered in an inbox are forwarded, reviewed as drafts, and filed into one colour-coded itinerary, with deadlines, documents and receipts kept beside it. Motion is damped and physical (one shared expo-out curve, gentle springs, slow drift), and it always demonstrates the mechanism rather than decorating. Density is relaxed: generous section padding, large Fraunces headings, short ledes, demonstrations doing the persuading.

Confirmed visual rejection: the site must not resemble flighty.com. Flighty was the owner's initial quality reference; on 2026-10-05 the owner asked that nothing read as a copy of it. Its signature devices are out of bounds (listed under Do's and Don'ts). The previous "design-one" warm-paper journal look is also retired.

**Key Characteristics:**
- Cool canvas + white hairline cards, the app's surface language, never warm paper.
- Violet is the only action colour; magenta and the category colours are supporting voices.
- Category colour-coding (indigo / green / amber / pink) is the information system, used identically wherever a booking appears.
- Prismatic bloom: blurred colour pools clipped inside their container, never a page-wide gradient wash.
- Fraunces headings, Inter body, Allura only for "Trip to".
- App artefacts as evidence: real screenshots, app artwork, Live Activity quoted as-is.
- Damped motion on one ease (cubic-bezier(0.16, 1, 0.3, 1)); everything honours reduced motion and reduced transparency.

## Colors

A cool, near-neutral grey field lit by one saturated violet, with the app's four category colours carrying meaning and a single neon-green island quoted from the Live Activity.

### Primary
- **TripCache Violet** (violet): every action — the nav Download button, the billing toggle's active pill, the "Approve & save" control, the stage progress rail fill, FAQ toggle when open, link text, script "Trip to" on light grounds. Hover deepens toward violet-deep.
- **Violet Field** (violet → violet-mid → violet-night, 150–160deg linear gradient): the only large coloured surfaces — the Statement section and the Pro plan card. Text on it is white, secondary text is Violet Mist Text.
- **Violet Soft** (violet-soft): tinted backgrounds for violet glyph tiles, the active nav link, the "From email" chip, FAQ toggles at rest, the Pro add-ons panel (at 60% opacity).
- **Focus Violet** (violet-focus): the global 2px focus outline with a 2px white inner ring; on dark sections the outline flips to white over violet-mid.

### Secondary
- **App Magenta** (magenta): the app's second brand voice. Used as a bloom colour on violet fields (Statement, Pro card) and as the activity category. Never used for buttons.

### Tertiary — Category system
- **Flight Indigo** (cat-flight / cat-flight-ink / cat-flight-soft), **Hotel Green** (cat-hotel / -ink / -soft), **Car Amber** (cat-car / -ink / -soft), **Activity Pink** (cat-activity / -ink / -soft). Each category has three roles: the pure colour for dots, avatar discs, connector lines and the itinerary rail gradient; the soft tint as a chip or glyph background; the ink shade as text on that tint. The ink shades exist because the pure colours fail contrast as text.
- **Reminder Gold** (gold): the "Boarding soon" text on the postcard, the "Save 30%" badge and check marks on the Pro card. Reminder chips and the Pro chip use the car-soft/car-ink pair.

### Neutral
- **Ink** (ink): headings and primary text.
- **Ink 2** (ink-2): ledes and longer supporting copy.
- **Mute** (mute): body copy inside cards, captions, meta lines, footer links.
- **Hairline** (line): every border and list divider; also quiet-button hover.
- **Canvas** (canvas): alternating section ground (How it works, Kept, Plans, footer).
- **Mist** (mist): quiet fills inside cards — timeline rows, PIN panel, quiet button, nav-link hover.
- **White** (white): cards and the alternate section ground (Reasons, FAQ, Final CTA). Sections alternate white and canvas; the hero runs a vertical wash from hero-wash into canvas.
- **Bloom Violet / Bloom Pink** (bloom-violet, bloom-pink): bloom-only hues, used together with cat-flight, cat-hotel, cat-car and live-green as bloom pools.

### Quoted app surfaces
- **Live Activity** (live-green on live-surface, gate pill in live-gate): the app's black-and-neon-green Live Activity, quoted verbatim in the hero Dynamic Island pill and the "Live on your lock screen" card. Neon green appears nowhere else.
- **Departure Board** (board-ink with violet radial glow): the split-flap cancellation countdown and the headline result of each /tools calculator.

### Named Rules
**The One Action Colour Rule.** Violet is the only colour a clickable control may be filled with (white-on-violet surfaces invert to a white button with violet text). Category colours and magenta never fill a button.

**The Category Code Rule.** Wherever a booking appears — inbox avatar, chip, itinerary dot, connector line, glyph — it wears its category colour: flight indigo, hotel green, car amber, activity pink. Never reassign or decorate with these four hues outside a booking context, except as bloom pools.

**The Clipped Bloom Rule.** Colour pools are blurred (72px), clipped by `overflow: hidden` on their section or card, set at 20–55% opacity and drifting slowly. A bloom never escapes its container and never becomes a page background.

## Typography

**Display Font:** Fraunces (with Iowan Old Style, Georgia), variable, SOFT axis at 50
**Body Font:** Inter (with ui-sans-serif, system-ui), stylistic sets cv11 + ss01
**Script Font:** Allura (with Snell Roundhand, cursive)

**Character:** A soft, slightly wonky old-style serif at heavy weight gives every heading the warmth of a travel postcard, while Inter keeps the product facts plain and exact. The script is a signature, not a style.

### Hierarchy
- **Display** (600, clamp(44px, 5.6vw, 78px), 1.02, -0.02em): the hero H1 only, three lines, balanced.
- **Headline** (600, clamp(36px, 4.8vw, 62px), 1.04, -0.02em): section H2s (Kept, Plans, FAQ at a slightly smaller clamp; Reasons at clamp(32px, 3.8vw, 48px)).
- **Statement** (600, clamp(30px, 4.3vw, 58px), 1.14): the single long-form statement on the violet field; words brighten from 45% to 100% opacity with scroll.
- **Title** (600, 25px → 28px, 1.15): bloom-card titles; stage titles in How it works run 26px → 36px.
- **Subtitle** (600, 19–21px): FAQ questions, panel titles ("Inbox", "Review draft", "Get TripCache"), footer column heads (16px), the wordmark (20–22px).
- **Numeral** (600, 60px, tabular): plan prices. A light (300) variant at clamp(56px, 6.4vw, 80px) sets the budget figure.
- **Script** (400, 40–96px, ~0.9 line-height): only the words "Trip to", violet on light grounds, white on the photo postcard.
- **Lede** (Inter 400, 17px → 19px, 28–32px line-height, ink-2): one short paragraph under a heading, max 46–54ch.
- **Body** (Inter 400, 15.5px, 28px line-height, mute): card copy, max 46ch; FAQ answers at 16px, max 62ch.
- **Label** (Inter 600, 13–15px): buttons, nav, list titles, inbox subjects.
- **Caption** (Inter 400, 11.5–13.5px, mute): meta lines, timestamps, fine print.

### Named Rules
**The Script Signature Rule.** Allura sets the words "Trip to" and nothing else, always immediately followed by a Fraunces destination name.

**The Headings Stand Alone Rule.** Section headings carry no eyebrow, kicker or label above them; the heading and a one-paragraph lede are the whole header.

**The Tabular Facts Rule.** Prices, times, countdowns, amounts and dates use tabular figures.

## Layout

Content sits in centred containers of 1200px (most sections), 1080px (Plans, Statement, footer) or 1240px (hero), with 20px side gutters on phones and 32px from 640px. Sections are vertically generous: 96px top and bottom on phones, 128px from 640px (Statement: 112px → 160px). Sections alternate white and canvas grounds so a boundary never needs a rule.

Headers use an asymmetric two-column split on desktop (heading left, lede or list right, roughly 0.8fr / 1.2fr or 1.1fr / 0.9fr) and stack on phones. The hero is a two-column grid (copy left, collage right) that stacks below 1024px, copy first.

The "How it works" section is a sticky full-viewport stage (the section scrolls past a pinned 100svh frame) with a four-step numbered progress rail at the top (Forward, Review, Organize, Keep). Its demonstration is a fixed-size scene (1120×540 desktop, 340×640 below 768px) inside a dark studio panel, scaled to fit the remaining viewport; the hero collage (600×640) likewise scales to its column. On phones the stage uses a separate vertical layout rather than a shrunk desktop.

The Kept section is a 12-column bento of bloom cards in 7/5, 5/7, 6/6 rows with 20px gaps, collapsing to one column. Breakpoints in use: 640px (sm), 768px (stage layout switch), 900px (nav links appear), 1024px (lg two-column layouts).

## Elevation & Depth

Depth is ambient and violet-tinted: shadows are long, soft, pulled far below the object with a large negative spread, and coloured with deep violet (rgb(45 27 87)) rather than black, so lifted objects read as sitting in the app's light. Resting cards pair a 1px hairline border with a barely-there contact shadow and one long ambient shadow. Floating collage objects (emails, toast, suitcase, phones) get stronger, closer drop shadows and a slow float. The only dark shadows belong to the quoted black objects (Dynamic Island, Live Activity, departure board).

### Shadow Vocabulary
- **Card rest** (`0 1px 2px rgba(14,14,14,0.04), 0 30px 60px -40px rgba(45,27,87,0.4)`): bloom cards, stage panels, plan cards.
- **Floating object** (`0 18px 34px -18px rgba(45,27,87,0.55)` to `0 24px 44px -22px rgba(45,27,87,0.55)`): forwarded-email cards, reminder toast, connector chips.
- **Postcard** (`0 50px 90px -40px rgba(45,27,87,0.65)` + 1px white inset highlight): the hero trip postcard.
- **Phone** (`drop-shadow(0 34px 40px rgba(45,27,87,0.22)) drop-shadow(0 6px 12px rgba(45,27,87,0.12))`): app screenshots in device frames.
- **Violet glow** (`0 8px 18px -8px rgba(97,43,211,0.7)`; Pro card `0 40px 80px -40px rgba(97,43,211,0.8)`): the violet CTA and the Pro card only.
- **Nav settled** (`0 0 0 1px #e7e9eb, 0 18px 40px -24px rgba(45,27,87,0.35)` over white 86% with 18px backdrop blur): the scrolled navigation bar.

### Named Rules
**The Violet Light Rule.** Shadows on light grounds are tinted rgb(45 27 87), never neutral black, and always use a negative spread so they pool under the object instead of outlining it.

## Shapes

Corners are generous and friendly, matching the app: 10px for small icon tiles, nav links and FAQ toggles; 12px for every button, store badge focus box and field; 16px for list rows and email cards; 20–22px for panels, the nav bar, the departure board and the get-app popover; 24–26px for stage panels and the mobile menu; 30px for bloom and plan cards; 34px for the hero postcard; full pills for chips, the Dynamic Island and status badges. Category glyphs and avatars are circles. Borders are 1px hairlines in the line colour (white at 10–15% on dark grounds); the forwarding-address strip is the single dashed border. Collage objects tilt slightly (−2deg to +3deg); page structure never tilts.

## Components

### Buttons
Compact, solid and confident; they press in rather than lift.
- **Shape:** gently rounded (12px); 40px tall in the nav, 48px in content.
- **Primary:** violet fill, white Inter 600 text at 14.5–15px, violet glow shadow in the nav.
- **On violet fields:** inverts to a white button with violet text; hover tints to violet-soft.
- **Quiet:** mist fill, hairline border, ink text ("Download free"); hover to the hairline grey.
- **Press:** every pressable scales to 0.97 over 160ms on the shared ease (`.tc-press`). Focus uses the global violet outline.
- **Store badges:** the official App Store and Google Play badges are the conversion CTA everywhere (48px tall; 40px in the footer). Never redraw them as custom buttons.

### Chips
- **Category chip:** pill, category soft tint background, category ink text, 11px semibold.
- **Reminder chip:** pill, car-soft background, car-ink text with a check ("7 days before"); unselected variant is a hairline-outlined pill in mute.
- **Pro chip:** small car-soft pill, car-ink text, 10.5px bold uppercase with 0.06em tracking.
- **Glass chip:** on photographs, white at 16% with a white 20% ring and backdrop blur.

### Cards / Containers
- **Bloom card:** 30px corners, white (or live-surface for the Live Activity card), hairline border, card-rest shadow, one clipped bloom pool in its top-right corner in the colour of its subject; Fraunces title + mute body at top, demonstration anchored to the bottom.
- **List card:** 16px corners, white with hairline border, a round category glyph at left, title in ink and meta in mute.
- **Plan cards:** Basic is a white bloom-free card; Pro is the violet field with a magenta bloom.
- **Internal padding:** 24px on phones, 32px from 640px (plan cards 32/40px).

### Inputs / Fields
There are no free-text inputs on the home page. The only control is the **billing segmented control**: a white 14px-cornered track with a hairline border and 4px inset, holding a violet pill that springs between options (stiffness 420, damping 36). The review-draft "fields" are read-only 12px tiles that gain a check as each value is confirmed.

### Navigation
A floating bar centred 12–16px from the top, max 1200px wide, transparent at the top of the page. After 24px of scroll it narrows to 1040px and settles into a white 86% glass bar with 20px corners and the nav-settled shadow. It reads `data-nav-theme` from whatever is beneath it and inverts over dark sections (deep-violet glass, white text, white Download button with violet text). Links are 14.5px Inter 500 in ink-2 with a mist hover; the active link sits on violet-soft. Below 900px the links collapse into a 24px-cornered sheet with large Fraunces link labels and both store badges. On desktop, Download opens a small popover with both badges; on phones it routes straight to the store via /download.

### Footer
Canvas ground with a hairline top border, wordmark and store badges at left, four link columns (Fraunces 16px heads, 14px mute links), and a hairline-separated base line of 13px captions.

### Signature: Trip Postcard
The app's landmarks artwork in a 34px-cornered, −2deg tilted card with a slow Ken Burns zoom and a violet-black gradient at the bottom. It carries a glass "next item" tile, a "Boarding soon" gold status pill, "Trip to" in white Allura and a Fraunces destination whose letters settle in one by one (opacity, 0.35em rise, 8px blur, 35ms stagger). Forwarded emails drop into it before the destination changes. Used in the hero; the "Trip to ___" cycling headline reappears in the final CTA.

### Signature: Inbox → Itinerary Stage
A dark "studio" panel (rounded 30–36px, inset from the canvas, violet-black gradient with a fine 22px white dot grid and violet/magenta blooms) pinned for four steps, with the caption on the left and a numbered progress rail on the right that fills with a violet→magenta gradient. The scene is scroll-scrubbed through damped springs:
1. **Forward**: a white email (the confirmation, read as paper on the dark stage) types the forwarding address into its "Fwd to" bar, the Send button glows, and an envelope arcs into the pulsing TripCache app icon ("Your TripCache address").
2. **Review**: a scanner beam sweeps the email; each extracted value (flight, airports, date, times, booking ref, class) glows in place and flies as an indigo chip into a boarding-pass-style draft (violet header, perforation notches, dashed empty fields that fill). When every field is filled, the button turns green and a spring-stamped "APPROVED" lands.
3. **Organize**: the four confirmations stack as "filed" (category glyph + green check) beside the "Trip to Manila" timeline with its four-colour gradient rail and glowing category dots.
4. **Keep**: the timeline moves left; the real app screen slides in on the right with attachment chips (cancellation deadline, boarding pass, receipts) tied to it by glowing category-colour threads.

### Signature: Departure Board (cancellation countdown and tool result headers)
A near-black board with a violet radial glow, split-flap letters that shuffle before settling ("BELMONT HOTEL / CANCEL BY 11 MAY") and flip-clock digits for days, hours, minutes and seconds, with reminder chips beneath. This is the only place split-flap tiles may appear.

### Signature: Live Activity Quote
The app's Dynamic Island pill and lock-screen Live Activity reproduced as-is: black surface, neon-green times and progress, yellow gate pill, tabular figures.

### FAQ Disclosure
Native `details` rows divided by hairlines; Fraunces question, a 36px violet-soft toggle with a plus that rotates 45deg and fills violet when open; the answer height animates on the shared ease.

## Do's and Don'ts

### Do:
- **Do** build new surfaces on the canvas/white alternation with hairline-bordered white cards, 30px corners for feature cards and 12px for controls.
- **Do** use violet for every action and only for actions; invert to a white button on violet fields.
- **Do** colour every booking by its category (flight #6366f1, hotel #12b76a, car #f59e0b, activity #d82d7e) with the matching soft tint and ink shade for chips and text.
- **Do** demonstrate with the app's own material: real screenshots, the landmarks and suitcase artwork, the app's toasts and Live Activity.
- **Do** set headings in Fraunces 600 with -0.02em tracking and keep body copy in Inter at 15.5–19px with mute or ink-2.
- **Do** keep blooms clipped inside their section or card at 20–55% opacity.
- **Do** animate with cubic-bezier(0.16, 1, 0.3, 1), heavily damped springs that settle with little or no overshoot, and provide a static equivalent under `prefers-reduced-motion` and an opaque one under `prefers-reduced-transparency`.
- **Do** mark dark sections with `data-nav-theme="dark"` so the navigation inverts.

### Don't:
- **Don't** reintroduce Flighty's signature devices: a centred phone orbited by floating notifications; a bottom segmented stage switcher; a day-to-night flip that ghosts data across the transition; glow-bordered delay cards; an orbit of planes around an import tile.
- **Don't** use split-flap or flip-clock tiles anywhere except the free-cancellation countdown.
- **Don't** use the retired design-one paper palette (#f4f0e8 paper, #602ad2 accent, warm brown shadows) or its journal styling on new-world surfaces.
- **Don't** use Allura for anything but "Trip to".
- **Don't** put eyebrows, kickers or small uppercase labels above section headings.
- **Don't** fill buttons with magenta, gold or a category colour, and don't use neon green outside the quoted Live Activity.
- **Don't** use neutral black drop shadows on light grounds or let a bloom bleed into an adjacent section.
- **Don't** add testimonials, ratings, user counts or press logos; the build demonstrates the product instead.
