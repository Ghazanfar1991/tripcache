# /ai-agents keyword research (2026-11-02)

## Data sources and limits
- **Semrush: no data.** The API returned `no_api_units` on 2026-11-02, the same as on 2026-10-29. None of the volume or KD numbers below come from Semrush. Every keyword is **autocomplete-only**, ranked by how often Google suggests it and by what the live SERP shows. More units: https://www.semrush.com/mcp-access
- **Search Console:** `seo/data/search-console/queries.json` has no queries matching ai, mcp, chatgpt, claude, gemini, grok, perplexity, agent, connector, hermes or openclaw. `semrush-2026-10/keyword-candidates.csv` has only "best ai trip/travel planner apps 2026", which already belongs to /blog/best-travel-apps-2025.
- **Google autocomplete:** about 90 seeds in the US, plus seven in AU and GB. AU and GB returned the same suggestions as the US for every seed tested, so there's no separate regional angle.
- **WebSearch:** 17 live SERPs.

## What the SERPs show (applies to every page)
- **Generic setup searches** like "claude custom connector", "chatgpt mcp server", "grok custom connector" and "perplexity custom connector" are won by official docs (support.claude.com, developers.openai.com, docs.x.ai, docs.openclaw.ai, hermes-agent.nousresearch.com) and by **SaaS vendors' own "connect X to <agent>" docs** (Conductor, Crustdata, Porteden, hjarni, Arcade, Breakcold). A product's own setup page is a page type that ranks on these SERPs, which is the format TripCache's pages already use. The head terms are developer and B2B intent and won't turn into installs, so use them as secondary keywords and aim the pages at **agent + travel/flight** combinations.
- **Direct competitors already have these pages:** tripsy.app/claude ("Plan smarter trips with Claude") and byairapp.com/mcp ("byAir Personal Flight Tracking MCP"). There are also unofficial Flighty MCP servers on GitHub and glama.ai. "tripit claude connector", "tripit claude mcp" and "tripit mcp" are real autocomplete suggestions, but TripIt has no official connector, so a TripCache page can be the answer to those searches.
- **Travel-plus-agent SERPs are thin.** "openclaw travel assistant", "hermes agent travel planner" and "best claude connectors for travel planning" return small blogs, Product Hunt and store listings. Those are the most winnable queries.

## Per page

### /ai-agents (index) — cluster "TripCache AI agents (brand feature)"
- **Primary:** travel mcp server
- **Secondary (all autocomplete-only):** mcp server travel; trip mcp server; travel itinerary mcp; flight mcp server; mcp travel app; tripcache mcp (already in the map)
- **Intent:** commercial and informational: someone looking for a travel app that has an MCP server. Today the SERP is developer directories (lobehub, mcp.so, enterprisedna, glama) listing GitHub servers, and none of them is a consumer app with OAuth.
- **Title (44):** Travel MCP Server for Claude, ChatGPT & More
- **Meta (146):** Connect your TripCache trips to Claude, ChatGPT, Gemini, Grok, Perplexity, Hermes or OpenClaw with one MCP link. Approve on your phone. Needs Pro.
- **Questions to answer:** What is a travel MCP server? Which AI assistants can connect to a travel app? Is there an MCP server for my own flights, not flight search? Is it safe to give an AI assistant my trips (read-only scopes, revoke anytime)? Do I need a paid plan?
- **Rankability:** **Winnable** for the long tail (travel/trip/itinerary MCP server); a long shot for "flight mcp server", where flight-search repos dominate.

### /ai-agents/claude — "TripCache + Claude setup guide"
- **Primary:** claude travel connector (autocomplete: "claude travel connectors")
- **Secondary:** claude mcp flights; claude connectors iphone / claude connectors ios; claude custom connector oauth; claude custom connectors free plan; tripcache claude connector (already in the map)
- **Intent:** transactional how-to: they want it working right now.
- **Title (38):** Claude Travel Connector: Add TripCache
- **Meta (142):** Add TripCache to Claude as a custom connector in 3 steps, then ask Claude about your flights, hotels and trip spending. Approve on your phone.
- **Questions to answer:** Can I add a custom connector on Claude's free plan? (Anthropic support: yes, one custom connector on Free. TripCache Pro is still required.) Does the connector work in the Claude iPhone app once added on the web? (Check this before claiming it.) How does Claude's OAuth sign-in work for a custom connector? What can Claude see, and what can't it see? (No confirmation numbers, prices or PNRs.) How do I disconnect?
- **Rankability:** **Winnable** for "claude travel connector" and "claude mcp flights". A long shot for "claude custom connector", which support.claude.com and big SaaS docs hold.

### /ai-agents/chatgpt — "TripCache + ChatGPT setup guide"
- **Primary:** chatgpt travel apps (autocomplete; the SERP is Jotform's "best ChatGPT apps for travel planning", which is planning intent)
- **Secondary:** chatgpt mcp server setup; chatgpt developer mode mcp; how to add mcp to chatgpt app / chatgpt mcp mobile app; chatgpt custom connector oauth; tripcache chatgpt (already in the map)
- **Intent:** a mix of commercial (which travel apps work in ChatGPT) and how-to.
- **Title (45):** ChatGPT Travel App: Connect TripCache via MCP
- **Meta (132):** Connect TripCache to ChatGPT as a custom MCP server, then ask about your flights, gates and trip spending. 3 steps, 39-second video.
- **Questions to answer:** Which ChatGPT plans can add a custom MCP server? Do I need Developer mode? Can I add a custom MCP server from the ChatGPT mobile app? (Guides say no: add it on the web, then use it.) Is it called Apps, Connectors or Plugins now? (The SERP uses all three and chatgpt.com/plugins/ URLs appear, so check the current label and mention every name.) How is TripCache different from the Expedia and Tripadvisor apps in ChatGPT? (Those plan and book; TripCache reads trips you've already booked.)
- **Rankability:** "chatgpt travel apps" is a **long shot** because it's a listicle SERP, so pitch TripCache to Jotform-style roundups instead. Specific how-to long tail like "chatgpt mcp mobile app" is **winnable**.

### /ai-agents/gemini — "TripCache + Gemini setup guide"
- **Primary:** gemini custom mcp connector
- **Secondary:** gemini add custom mcp; gemini connect custom mcp; gemini connectors like claude; gemini mcp web; gemini custom connectors
- **Intent:** how-to and "is this even possible". The SERP contradicts itself: some third-party guides say the consumer Gemini web app takes custom MCP apps, and FreeWheel's guide says it doesn't. Google Cloud docs cover only Gemini Enterprise.
- **Title (36):** Gemini Custom MCP: Connect TripCache
- **Meta (129):** Add TripCache to the Gemini web app as a custom MCP app, then ask Gemini about your flights and trips. Some answers show as text.
- **Questions to answer:** Can the consumer Gemini app connect to a custom MCP server? Does it work in the Gemini mobile app after I add it on the web? Is it different from Gemini Enterprise connectors? Why do some answers come back as text instead of cards? (Limited, according to the feature inventory.)
- **Rankability:** **Winnable.** The SERP is confused and a clear, dated how-to that shows it working fills the gap. Facts: the inventory says Gemini is "limited; some answers as text". Never write that Gemini reads TripCache on Android or through app actions, because AppFunctions is not in Google's Early Access Program.

### /ai-agents/grok — "TripCache + Grok setup guide"
- **Primary:** grok custom connector
- **Secondary:** grok add custom connector; grok mcp connector; grok connectors list; grok connectors not working
- **Intent:** how-to. The SERP is docs.x.ai plus vendor docs (Crustdata, Porteden, context-link, twitterapi.io), which is exactly the page type TripCache has.
- **Title (36):** Grok Custom Connector for Your Trips
- **Meta (142):** Add TripCache at grok.com/connectors as a custom MCP connector, then ask Grok about your flights, hotels and spending. Needs a paid Grok plan.
- **Questions to answer:** Which Grok plans support custom connectors? Is there a travel connector in the Grok catalog? (No travel entries in the reported lists.) Why doesn't Grok see the connector in my current chat? (Start a new chat.) Why isn't my connector working?
- **Rankability:** **Winnable** for "grok custom connector" + travel/flights. The head term is a long shot.

### /ai-agents/perplexity — "TripCache + Perplexity setup guide"
- **Primary:** perplexity custom connector
- **Secondary:** perplexity add custom connector; perplexity custom mcp connector; perplexity connectors list; perplexity flight tracker
- **Intent:** how-to, plus "track my flight in Perplexity". Perplexity has had built-in flight status by flight number since November 2025. TripCache adds the traveller's own bookings, hotels and spending on top of that.
- **Title (42):** Perplexity Custom Connector for Your Trips
- **Meta (132):** Add TripCache to Perplexity as a custom remote connector (Pro or Max), then ask about your own flights, trips and spending. 3 steps.
- **Questions to answer:** Which Perplexity plans can add custom connectors? (Pro, Max or Enterprise; Enterprise admins must turn on the toggle.) Remote or local connector: which do I pick? Can Perplexity track my flight without a connector? What's the fix when the OAuth sign-in doesn't stick? (Remove the connector and add it again.)
- **Rankability:** **Winnable** for custom connector + travel. "perplexity flight tracker" is a long shot because the news results are about Perplexity's own feature, but it's worth one section on the page.

### /ai-agents/hermes — "TripCache + Hermes setup guide"
- **Primary:** hermes agent mcp setup
- **Secondary:** hermes agent mcp oauth; hermes agent remote mcp; hermes agent travel planner; hermes agent travel; hermes agent mobile; tripcache hermes agent (already in the map)
- **Intent:** how-to for technical self-hosters. The SERP is Nous's docs and a few vendor guides (Arcade, Breakcold, Autosana).
- **Title (41):** Hermes Agent MCP Setup for Travel (OAuth)
- **Meta (133):** Add TripCache to your self-hosted Hermes agent as a remote MCP server with OAuth, then ask it about your flights, trips and spending.
- **Questions to answer:** How do I add a remote OAuth MCP server to Hermes (`mcp_servers`, `auth: oauth`)? What happens to OAuth when Hermes runs on a VPS or headless? (The loopback callback fails, so use paste-back or SSH.) How do I re-login or reload? (`hermes mcp login`, `/reload-mcp`.) Can I limit which TripCache tools Hermes sees (`tools.include`)? Can Hermes be a travel planner for trips I've already booked?
- **Rankability:** **Winnable.** The SERP is niche and growing, and "travel" combinations have almost no competition.

### /ai-agents/openclaw — "TripCache + OpenClaw setup guide"
- **Primary:** openclaw travel assistant
- **Secondary:** openclaw travel; openclaw flight tracker; openclaw remote mcp server; openclaw mcp oauth; openclaw as a travel companion
- **Intent:** a mix of commercial ("make OpenClaw handle my travel") and how-to. The SERP is an Ampere blog post, ClawHub store listings and promotional pages, all of them weak.
- **Title (40):** OpenClaw Travel Assistant: TripCache MCP
- **Meta (134):** Make OpenClaw your travel assistant: add TripCache as a remote MCP server with OAuth, then ask about your flights, trips and spending.
- **Questions to answer:** Can OpenClaw track my flights and trips? Does OpenClaw support remote OAuth MCP servers natively? (The current docs say yes, with `auth: "oauth"` and `openclaw mcp login`; older guides say to use mcp-remote.) How does OAuth work on a headless OpenClaw gateway? (The URL appears in the logs, so open it on another device.) Is TripCache a skill or an MCP server, and what's the difference?
- **Rankability:** **Winnable now.** This is the best travel-intent opportunity in the set, so make "travel assistant" the H1 angle. Don't copy Ampere's claims about price comparison or booking: TripCache doesn't book or pay.

### /ai-agents/muse — "TripCache + Muse setup guide"
- **Primary:** meta muse connectors
- **Secondary:** meta muse connectors list; muse ai connectors; meta muse ai agent; meta ai mcp connector; tripcache meta ai (already in the map)
- **Intent:** informational: which connectors Muse has. The SERP is postfa.st's weekly list, Meta's help centre, CData and Postiz.
- **Title (43):** Meta Muse Connectors: TripCache Coming Soon
- **Meta (142):** Meta's Muse can't connect to TripCache yet. See what Muse connectors cover today, and connect Claude, ChatGPT or Perplexity to your trips now.
- **Questions to answer:** Does Meta Muse support MCP or custom connectors? Is there a travel connector for Muse? When will TripCache work with Muse? Which assistant can I use instead today?
- **Rankability:** **Long shot.** Big news sites and listicles hold this SERP, so treat it as a holding page.
- **Fact risk, check before republishing:** a search summary reports that Meta's help centre article "How Muse works with Connectors" (meta.com/help/artificial-intelligence/1687253048996149) says Muse can create a **Custom Connector** that Meta doesn't review. I couldn't confirm it because the page is rendered by JavaScript. If it's true, the page's "No third-party connectors yet" is wrong. Have the owner check it in the Muse app before the page goes further.

## Keep with the blog posts (don't target on these pages)
- **/blog/connect-chatgpt-claude-to-travel-app:** connect chatgpt/claude to travel app, claude mcp travel, chatgpt flight tracker, ask chatgpt about my flight, chatgpt custom connector travel app, add custom connector claude travel. The Claude and ChatGPT pages should link to this post and should not use "travel app" in the H1.
- **/blog/ai-travel-assistant-for-your-bookings:** can chatgpt/gemini see my flights, gemini travel app, grok connectors travel, perplexity mcp connector travel, ai travel assistant, ai assistant that knows my bookings.
- **/blog/ask-siri-about-your-flight:** gemini flight status, android travel app shortcuts. That's why "gemini flight tracker" isn't on the Gemini page.

## Better as new blog posts
1. **"Best Claude connectors for travel (2026)"**: best claude connectors for travel planning / best claude travel connectors / claude connectors for travel planning. This is a listicle SERP (beginnersinai, Tom's Guide, Product Hunt) covering Booking.com, Expedia, Tripadvisor, Viator, AllTrails and Wyndham. TripCache fits as the "after you book" pick. It's winnable, and the setup page shouldn't try to take listicle intent.
2. **"Does TripIt work with Claude or ChatGPT?"**: tripit claude connector / tripit claude mcp / tripit mcp / tripit chatgpt. TripIt has no official connector; there's a community iCal skill. This is an alternative-intent search from people who want to install something. R7 check: it isn't a "login" or "reviews" navigational query. It could also go as a section in /alternatives/tripit if that page exists in url-registry.
3. Optional: **"Flight tracking MCP servers compared"** (flight mcp server, flighty mcp, mcp server for flights), set against byAir and the unofficial Flighty servers. P3, developer-leaning.

## Proposed rows for seo/keywords.csv
All volume columns are blank because Semrush had no units.
```
travel mcp server,TripCache AI agents (brand feature),/ai-agents,P2,commercial+informational,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,"autocomplete-only (Semrush units exhausted 2026-11-02). SERP = dev MCP directories (lobehub, mcp.so, glama); no consumer app with OAuth ranks"
trip mcp server,TripCache AI agents (brand feature),/ai-agents,P3,commercial+informational,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
travel itinerary mcp,TripCache AI agents (brand feature),/ai-agents,P3,commercial+informational,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
mcp travel app,TripCache AI agents (brand feature),/ai-agents,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
flight mcp server,TripCache AI agents (brand feature),/ai-agents,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,"autocomplete-only. SERP = flight-search repos, byAir /mcp, unofficial Flighty MCP; secondary only"
claude travel connector,TripCache + Claude setup guide,/ai-agents/claude,P2,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,"autocomplete-only. Competitor tripsy.app/claude ranks; generic 'claude mcp travel' stays with /blog/connect-chatgpt-claude-to-travel-app"
claude mcp flights,TripCache + Claude setup guide,/ai-agents/claude,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
claude connectors iphone,TripCache + Claude setup guide,/ai-agents/claude,P3,informational,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,autocomplete-only; verify mobile behaviour before claiming
claude custom connectors free plan,TripCache + Claude setup guide,/ai-agents/claude,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,"autocomplete-only. Anthropic: 1 custom connector on Free; TripCache Pro still required. FAQ line only"
claude custom connector oauth,TripCache + Claude setup guide,/ai-agents/claude,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,autocomplete-only; dev-intent head term, FAQ only
chatgpt travel apps,TripCache + ChatGPT setup guide,/ai-agents/chatgpt,P2,commercial,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,"autocomplete-only. Listicle SERP (jotform); pursue via roundup outreach, keep as H2 angle"
chatgpt mcp mobile app,TripCache + ChatGPT setup guide,/ai-agents/chatgpt,P3,informational,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only; custom MCP is added on web not mobile (verify)
chatgpt developer mode mcp,TripCache + ChatGPT setup guide,/ai-agents/chatgpt,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,autocomplete-only; dev-intent head term
chatgpt mcp server setup,TripCache + ChatGPT setup guide,/ai-agents/chatgpt,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,autocomplete-only; SERP = OpenAI docs + vendor guides
gemini custom mcp connector,TripCache + Gemini setup guide,/ai-agents/gemini,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,"autocomplete-only. SERP contradicts itself on consumer Gemini support; Gemini is limited (some text answers). Never claim Android/AppFunctions"
gemini add custom mcp,TripCache + Gemini setup guide,/ai-agents/gemini,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
gemini connectors like claude,TripCache + Gemini setup guide,/ai-agents/gemini,P3,informational,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,autocomplete-only
grok custom connector,TripCache + Grok setup guide,/ai-agents/grok,P3,transactional,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,"autocomplete-only. SERP = docs.x.ai + SaaS vendor setup docs (same page type). 'grok connectors travel' stays with which-assistants post"
grok add custom connector,TripCache + Grok setup guide,/ai-agents/grok,P3,transactional,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,autocomplete-only
grok mcp connector,TripCache + Grok setup guide,/ai-agents/grok,P3,transactional,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,autocomplete-only
perplexity custom connector,TripCache + Perplexity setup guide,/ai-agents/perplexity,P3,transactional,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,"autocomplete-only. Pro/Max/Enterprise only. 'perplexity mcp connector travel' stays with which-assistants post"
perplexity add custom connector,TripCache + Perplexity setup guide,/ai-agents/perplexity,P3,transactional,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,autocomplete-only
perplexity custom mcp connector,TripCache + Perplexity setup guide,/ai-agents/perplexity,P3,transactional,,,,,,WINNABLE_WITH_LINKS,,,google-autocomplete-2026-11-02,autocomplete-only
perplexity flight tracker,TripCache + Perplexity setup guide,/ai-agents/perplexity,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,"autocomplete-only. Perplexity has native flight status (Nov 2025); TripCache adds your own bookings. Section, not primary"
hermes agent mcp setup,TripCache + Hermes setup guide,/ai-agents/hermes,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only; SERP = Nous docs + few vendor guides
hermes agent mcp oauth,TripCache + Hermes setup guide,/ai-agents/hermes,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only; cover headless/VPS callback workaround
hermes agent remote mcp,TripCache + Hermes setup guide,/ai-agents/hermes,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
hermes agent travel planner,TripCache + Hermes setup guide,/ai-agents/hermes,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only; frame as booked trips, not planning/booking
openclaw travel assistant,TripCache + OpenClaw setup guide,/ai-agents/openclaw,P2,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,"autocomplete-only. Weak SERP (ampere.sh blog, ClawHub listings). Best travel-intent opening in the set; no booking/price-compare claims"
openclaw travel,TripCache + OpenClaw setup guide,/ai-agents/openclaw,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
openclaw flight tracker,TripCache + OpenClaw setup guide,/ai-agents/openclaw,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only; ClawHub 'Track Flight' skill competes
openclaw remote mcp server,TripCache + OpenClaw setup guide,/ai-agents/openclaw,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,"autocomplete-only. Current docs: auth: oauth + openclaw mcp login"
openclaw mcp oauth,TripCache + OpenClaw setup guide,/ai-agents/openclaw,P3,transactional,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
meta muse connectors,TripCache + Muse setup guide,/ai-agents/muse,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,"autocomplete-only. SERP = postfa.st list, Meta help, CData. Verify Meta's Custom Connector help text before keeping 'no third-party connectors' claim"
meta muse connectors list,TripCache + Muse setup guide,/ai-agents/muse,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,autocomplete-only
muse ai connectors,TripCache + Muse setup guide,/ai-agents/muse,P3,informational,,,,,,NOT_YET,,,google-autocomplete-2026-11-02,autocomplete-only
```

New-post rows. The owner is a NEW: path, so it needs owner approval and R5 lookups.
```
best claude connectors for travel planning,Best Claude connectors for travel (listicle),NEW:/blog/best-claude-connectors-for-travel,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,"autocomplete-only. Listicle SERP (beginnersinai, Tom's Guide, Product Hunt). Keeps listicle intent off /ai-agents/claude"
best claude travel connectors,Best Claude connectors for travel (listicle),NEW:/blog/best-claude-connectors-for-travel,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
tripit claude connector,TripIt with Claude/ChatGPT (alternative intent),NEW:/blog/does-tripit-work-with-claude-chatgpt,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,"autocomplete-only. TripIt has no official connector (community iCal skill only). Or a section of the TripIt alternative page if one exists"
tripit mcp,TripIt with Claude/ChatGPT (alternative intent),NEW:/blog/does-tripit-work-with-claude-chatgpt,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
tripit chatgpt,TripIt with Claude/ChatGPT (alternative intent),NEW:/blog/does-tripit-work-with-claude-chatgpt,P3,commercial,,,,,,WINNABLE_NOW,,,google-autocomplete-2026-11-02,autocomplete-only
```

## Fact guardrails for the copy (from app-feature-inventory.md)
- Pro only (`pro_required`). Assistants can read data and can add a plan item, expense or draft import when the user grants `bookings:draft`. They **can't book or pay**.
- Responses never include confirmation numbers, prices or PNRs.
- Gemini works but is limited, and some answers come back as text. Gemini on Android (AppFunctions) is not available. Muse can't connect yet, but check the help-centre point above.
- The index page's meta already lists Gemini as connecting. That's fine for MCP on the web; just don't imply Android.
