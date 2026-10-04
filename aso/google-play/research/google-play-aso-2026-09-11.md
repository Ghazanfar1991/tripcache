# TripCache Google Play discoverability and ASO review

Reviewed 2026-09-11. Public listing: [TripCache on Google Play](https://play.google.com/store/apps/details?id=app.tripcache). Status: research and copy prepared; no Play listing, mobile app, pricing, or security setting changed.

## Decision

TripCache has a public, reachable Play listing. The evidence does **not** show that the app is missing from Play's index. Whether it appears for a particular search depends on query relevance, the user/device/market, and product quality. Website indexing in Google Search and app discovery inside Google Play need separate measurements and fixes. Google documents both listing relevance and user experience as discoverability inputs; it does not publish a guaranteed ranking formula. [Play discovery guidance](https://support.google.com/googleplay/android-developer/answer/4448378?hl=en-GB), [visibility troubleshooting](https://support.google.com/googleplay/android-developer/answer/9042516?hl=en).

The current English listing already has focused post-booking positioning and qualified email-import and flight-alert claims. Authenticated Console observations show recent acquisition, an active default listing, and no policy issues. The next useful work is to reconcile feature access across the website and app, finish the acquisition breakdown, establish measurable activation, and test stronger visual proof. Rewriting the listing repeatedly without those baselines would make the result harder to interpret.

## Public observations — separate from private analytics

The canonical English listing identifies **TripCache: Trip Planner**, publisher **Flowbyte Labs**, **Travel & Local**, in-app purchases, and a **50+ downloads** public band. It shows an update on **September 5, 2026**. These are public listing observations, not exact active users or recent installs. No public rating aggregate appeared in the fetched English page; this does not establish that there are zero reviews.

The description explains supported email imports, draft review and variable flight-alert coverage. It explicitly includes cancellation reminders in Basic. It mentions CSV/PDF exports without assigning a plan. Data safety currently displays **“Data isn’t encrypted.”** The support contact differs from the branded contact on the website. [Observed listing](https://play.google.com/store/apps/details?id=app.tripcache).

An older translated search result still showed previous copy and a lower download band. The canonical English page was newer. Search-cache differences are not evidence that the current English text is wrong; review published localizations in Play Console before deciding whether translations need correction.

### Product truth and trust fixes

| Priority | Finding | Concrete next step |
| --- | --- | --- |
| P0 | Website feature/pricing copy assigns cancellation reminders to the paid plan, while current Play places them in Basic. | Verify Android and iOS entitlement behavior with a Basic account, then make the website, store copy, and in-app paywall agree. Until verified, use plan-neutral reminder descriptions and keep confirmed email-import Pro labeling. |
| P0 | Current Data safety wording creates a trust question for a document organizer. | Have the mobile/backend owner verify transport protection for every app/SDK data flow and the submitted Data safety answers. If the disclosure is wrong, correct it from evidence; if a data path is unencrypted, fix the implementation first. Do not change the answer for conversion reasons. |
| P1 | Export entitlement and exact availability are not reconciled. | Verify CSV/PDF and free/paid access by platform. Avoid adding new unconditional export or pricing promises to acquisition copy meanwhile. |
| P1 | Brand and support presentation differ across website and Play. | Verify that the branded support mailbox is monitored; use consistent public branding and support contact where appropriate. Do not alter developer legal identity as an ASO tactic. |
| P1 | Current Play search-term demand and usable vitals rates remain unavailable in the evidence gathered so far. | Finish the search-term, listing and country breakdown; check device availability and current release quality. Preserve unavailable values as unknown. |

Repository evidence: `app/pricing/page.tsx`, `lib/seo-page-data.ts`, `components/design-one/`, `growth/context.md`, and `growth/recommendations/mobile-app.md`. A document PIN controls app access; it is not evidence of transport or end-to-end encryption. Google's Data safety guidance requires encryption-in-transit claims to account for all collected/transmitted user data, including SDKs. [Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).

## Competitive positioning

Public US/English observations on September 11 are directional context, not a keyword rank or a country-specific market-share estimate.

| App | Public scale signal | Positioning in the listing | Implication for TripCache |
| --- | --- | --- | --- |
| [TripIt: Travel Planner](https://play.google.com/store/apps/details?id=com.tripit) | 5M+ downloads; 4.7 rating displayed | Reservation forwarding, itinerary access, travel documents and maps; paid flight extras | General itinerary/email organization is established. Show a concrete cancellation-deadline workflow and clearer first-use experience. |
| [Wanderlog - Trip Planner App](https://play.google.com/store/apps/details?id=com.wanderlog.android&hl=en-US) | 1M+ downloads; 4.7 rating displayed | Collaborative planning, road trips, maps, discovery, budgeting and reservations | TripCache can explain its narrower job: managing confirmed bookings and their deadlines. Avoid implying destination discovery or group collaboration without current feature proof. |

These are competitors to learn from, not brands to repeat in Play metadata. A comparison guide on the website can answer a real migration question using accurate, sourced comparisons. The store listing should describe TripCache's own experience.

### Candidate query themes

1. **Travel itinerary / itinerary organizer**: primary product intent.
2. **Trip planner / travel organizer**: broader category language, already present in the current title.
3. **Booking email organizer / booking confirmations**: paid automation intent.
4. **Cancellation reminders / hotel cancellation deadline**: specific problem and differentiation.
5. **Travel documents / trip expenses**: supporting workflows.

This is a relevance hypothesis, not a keyword-volume report. Use the actual Play search-term report to prioritize. Keep Travel & Local unless the product's core purpose changes; select only accurate available tags in Console. Start localization with the existing English markets (US, AU, GB, CA) and actual traffic, then use human-reviewed localization where the app and support can serve that language. Play supports custom listings for relevant search keyword groups, but this changes what eligible visitors see; it is not a promise of ranking for those keywords. [Custom listings](https://support.google.com/googleplay/android-developer/answer/9867158?hl=en).

## Concrete listing draft

The current title is already reasonable. Keep it as the control. The alternative below is a **candidate for a later, separately logged title change**, after search-term evidence supports itinerary intent. Play's standard listing experiments document graphics and descriptions as testable assets, not app titles.

**Candidate title — 27/30 characters**

> TripCache: Travel Itinerary

**Candidate short description — 76/80 characters**

> Keep bookings and cancellation reminders together. Add email import with Pro

**Full description — 1225/4,000 characters**

```text
TripCache organizes the travel you have already booked. Keep flights, hotel stays, rental cars, documents and expenses connected to one trip itinerary.

BUILD YOUR TRIP
Add your reservations manually and follow a clear timeline. Keep booking references and notes beside the relevant plan.

REVIEW BOOKING EMAILS WITH PRO
Forward supported confirmations to your TripCache import address. Review and correct the extracted draft before saving it to your itinerary.

REMEMBER CANCELLATION DEADLINES
Record the cutoff from your booking confirmation and choose a reminder. Check the date, time zone and terms with your provider. Notifications depend on your device permissions and settings.

KEEP DOCUMENTS AND COSTS TOGETHER
Attach tickets, boarding passes and confirmations to the trip. Record expenses while the details are fresh.

CHECK SUPPORTED FLIGHT UPDATES WITH PRO
See available flight information and supported alerts. Coverage and timing vary; your airline and airport remain authoritative.

START WITH MANUAL TRIP ORGANIZATION
Basic includes manual entry and itinerary viewing. Pro adds booking-email import and enhanced flight tracking. Check the in-app plan details for current feature access and subscription terms.
```

The draft deliberately leaves unresolved export tiers and cancellation-reminder tier out of its plan section. It makes no universal offline, encryption, automatic correctness, or guaranteed notification claim. Its functional scope is supported by the local product pages and the current first-party listing; current app behavior remains the final check before publication.

Google's guidance calls for clear benefits, accurate features, no repetitive keyword lists, and the 30/80/4,000-character limits. Do not add “best,” “#1,” price promotions, competitor-name stuffing, or manufactured testimonials. [Store listing best practices](https://support.google.com/googleplay/android-developer/answer/13393723?hl=en), [metadata policy](https://support.google.com/googleplay/android-developer/answer/9898842?hl=en).

## Screenshot narrative to produce

Use current **Android app captures with realistic sample data**. Existing website images are references to screen concepts, not evidence that every asset matches the current Android build. This report does not claim to have visually audited every currently published Play screenshot.

Recommended six-image order:

| Order | Short caption | Screen proof | Suggested alt text |
| --- | --- | --- | --- |
| 1 | Your booked trip, in order | Populated trip timeline with flight, hotel and next activity | A trip timeline groups a flight, hotel stay and activity by date. |
| 2 | Keep cancellation cutoffs visible | Hotel booking with a user-entered deadline and reminder | A hotel booking shows its cancellation deadline and reminder setting. |
| 3 | Review booking emails with Pro | Extracted draft with editable dates and booking reference | A booking-email draft is ready to review before it is added to a trip. |
| 4 | Find documents with the trip | Tickets and confirmation files attached to a journey | Tickets and confirmation documents are stored beside the trip. |
| 5 | Record costs while you travel | Expense list and budget using harmless sample amounts | A trip expense view groups recorded costs by category. |
| 6 | Check supported flight updates with Pro | Real current flight-detail UI with sample/appropriate data | Flight details show available status information and alert settings. |

Capture portraits at 1080 × 1920 or higher in 9:16, using at least four suitable screenshots. Keep the actual UI prominent, especially the first three. If taglines are used, keep them under 20% of the image and readable on a small screen. Supply distinct alt text. A feature graphic uses 1024 × 500. These are source-based asset recommendations, not evidence of a current asset violation. [Preview asset requirements and recommendations](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en).

Use generated images for editorial blog covers or restrained supporting artwork. Do not generate imaginary app screens, review counts, badges or functionality for Play. The value of store screenshots comes from showing the app a traveler will actually install.

## Authenticated Play Console — observed September 11, 2026

The main audit operator inspected the signed-in account and supplied these observations. They are private Console metrics, separate from public store-page badges. The Grow users view was set to **last 28 days**, **Metrics by Device**; exact calendar boundaries and comparator dates were not captured in this workstream.

| Displayed metric | Displayed value | Displayed comparison |
| --- | ---: | ---: |
| Impressions | 288 | +372% |
| Acquisitions | 11 | +83% |
| First opens | 7 | +75% |
| Monthly active devices | 10 | +67% |
| 7-day device retention | 1 | 0% change |

Keep the units and labels above. The retention value is a displayed metric value, **not a 1% retention rate**. Do not divide first opens by acquisitions as a cohort conversion rate without confirming matching dates, device populations and definitions. The Console also showed Explore **user acquisitions +19 in the last 90 days**, which has a different unit/window from the device table.

The default store listing is **active**, with **zero experiments**. The legacy overview shows **37.78% conversion rate**; its denominator differs from the drilled listing view below. Do not substitute this number for install CTR or compare it with website CTR. Store analysis currently points to the newer Store listings page.

### Drilled store listing report: August 8–September 4, 2026

The Store listings URL explicitly contained **dateRange=2026_08_08-2026_09_04** while the interface displayed **Last 28 days**. The selected metric was **Installs**. Record the exact dates rather than assuming this ends on September 11.

| Displayed metric | Displayed value | Displayed comparison |
| --- | ---: | ---: |
| Visitors | 19 | +19% |
| Unique user install clicks | 9 | +29% |
| Click-through rate | 47% | +8% |

The default listing row separately displayed **17 visitors** and **52.9% conversion rate**. Those row values have a narrower denominator than the overall 19-visitor table; retain the UI label while using its current click-based reporting definition. The published listing showed **Live**, last updated **September 5**.

This report window ends **before the September 5 listing update**. It cannot measure the current copy's performance. The observed 9 clicks from 19 visitors show real install intent but are a tiny sample; they do not establish good performance against peers or successful installations. The immediate measurable constraint is limited listing reach in this window. Capture a complete post-update window before judging the revision or choosing a copy winner. Keep the displayed percentage changes verbatim; the “+8%” label was not verified as relative change versus percentage points.

The monitor view showed **no policy issues**. User-perceived crash rate, ANR rate and slow cold start were all **Data unavailable**. This establishes neither zero problems nor a threshold violation. The latest September 5 release has recommendations concerning bitmap image optimization and R8 configuration; these are engineering follow-ups, not evidence that Google has deindexed or penalized the app.

**Interpretation:** Acquisition is occurring and displayed growth is positive, but the absolute sample is small. There is no observed policy or indexing block in this Console evidence. The remaining questions are which searches/countries produce qualified visitors, how many acquisitions activate, and whether current stability is measurable. Focus on conversion and retained use while expanding relevant discovery.

## Private historical evidence — not current September performance

The repository's `growth/data/store/google-play.json` was generated August 29, with a latest reported date of **August 21**. It contains a historical 28-day total of **3 user installs and 5 user uninstalls**, and a latest installed audience of **13**. The manifest already marks the export stale. These figures cannot diagnose current Play acquisition or conversion and must not be combined with the public 50+ lifetime download band.

The August 30 growth report records a **July 19–August 17** Android Crashlytics dashboard baseline of **89.29% crash-free users**, alongside startup/native crash groups. This is a historical investigation lead, not current Android vitals and not proof that the September build is suppressed. Crashlytics crash-free-user percentages and Play's daily user-perceived crash metric have different definitions and denominators.

The authenticated observations above supersede the stale export for current top-line context. Still required to complete the baseline:

- Last 28 complete days versus the preceding 28: country, language, search term and traffic-source breakdowns.
- Listing visitors, unique Install clicks and listing CTR; separate new/returning users where available.
- Completed user acquisitions, first opens, verified activation, and retained subscribers as distinct downstream measures.
- User-perceived crashes/ANRs by current version and device, release distribution, excluded devices and country availability.
- Recent rating/review themes and support issues.

Play explicitly connects stability with discoverability. Inspect current Android vitals before buying or scaling traffic; an August crash snapshot cannot establish September health. [Android technical quality](https://developer.android.com/quality/technical).

## Measurement and experiment plan

**Important 2026 reporting change:** Google says store-listing performance moved to intent metrics in June/July 2026. Conversion analysis now reports visitors, button clicks and CTR; successful acquisitions remain available in Grow users/Statistics. Keep website store-link clicks, Play Install clicks and completed installs separate. Record metric labels and report windows exactly as shown in Console. [Current acquisition reporting](https://support.google.com/googleplay/android-developer/answer/9859173?hl=en).

| Funnel stage | Source | What it establishes |
| --- | --- | --- |
| Google web impression → website click | Search Console | Search visibility and search-result CTR |
| Website visit → Play link click | Website analytics | Store intent, not installation |
| Play listing visit → Install click | Play listing conversion analysis | Listing intent/CTR |
| Completed acquisition | Play Grow users / Statistics | Actual acquisition as defined by Play |
| First useful trip created/reviewed | Verified app event | Activation |
| Return use / subscription retained | App cohorts / RevenueCat | Ongoing customer value |

### Proposed experiment ASO-2026-09-11-01 — not launched

- **Hypothesis:** Showing a real populated trip plus the cancellation-deadline workflow in the first screenshots makes TripCache's value clearer and increases Install clicks.
- **Control:** Published screenshots, exported and archived with exact locale/date.
- **Variant:** One alternative screenshot set using the sequence above. Keep title, descriptions, price and app release steady during the comparison.
- **Setup:** One graphics variant; 50% of eligible traffic to it. Use the Console estimator before launching. Do not split very small traffic among multiple variants.
- **Primary metric:** Unique user install clicks, the current experiment target offered by Play. Use Console's randomized comparison and confidence interval.
- **Minimum effect:** Predeclare a practical 15% relative improvement and select the corresponding available setting. This is a decision threshold, not a predicted outcome.
- **Observation:** Minimum 14 days and the Console-estimated sample requirement, with a review at 28 days. Insufficient data remains inconclusive; do not declare success because the calendar elapsed.
- **Guardrails:** Completed acquisitions, verified activation, current crash/ANR health and review themes. Downstream aggregate changes are directional unless variant attribution exists.
- **Rollback:** Retain original assets and restore them if the experiment loses or confuses users.
- **Decision:** Apply only if supported by the declared statistical result and no material guardrail concern. If sparse traffic makes a test impractical, make one documented usability improvement and treat before/after observations as descriptive.

Google currently supports graphics and localized description experiments, recommends changing one asset type at a time, and provides an estimator and confidence settings. [Store listing experiments](https://support.google.com/googleplay/android-developer/answer/12053285?hl=en).

After the screenshot decision, test the short-description candidate separately. A title change requires a separate dated observation window; do not present it as a randomized title experiment. Avoid overlapping changes to the same listing.

## Sustainable acquisition priorities

1. Reconcile feature claims and refresh acquisition/quality data.
2. Make first trip creation and booking-draft review dependable; validate first-value measurement.
3. Show current Android screens and clear plan boundaries.
4. Improve high-intent website pages that answer a real travel problem and link to a matching app workflow. Track their store intent instead of optimizing blog volume alone.
5. Request an honest in-app review after sufficient product use, using Play's native review flow, without pre-screening for happy users or offering incentives. [In-app review guidance](https://developer.android.com/guide/playcore/in-app-review).
6. Earn relevant travel/product coverage using useful tools and original guides. No bulk link, install, or review schemes.
7. Consider a focused custom listing or localization only after the corresponding segment has meaningful traffic and current app support.

The target is more travelers who successfully organize a trip and return, not a ranking promise. No public Play settings were changed by this audit.
