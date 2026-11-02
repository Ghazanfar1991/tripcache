import type { BlogFaq, BlogFrontmatter } from "@/types/blog"

export const metadata: BlogFrontmatter = {
  slug: "best-claude-connectors-for-travel",
  title: "The Best Claude Connectors for Travel (2026)",
  seoTitle: "Best Claude Connectors for Travel Planning (2026)",
  excerpt:
    "The Claude connectors worth adding for travel, sorted by trip stage: flights, stays, things to do, business travel, and the trip you've already booked. Checked against Claude's directory.",
  description:
    "The best Claude connectors for travel planning, by trip stage: Expedia, Booking.com, Tripadvisor, Viator and more, plus TripCache for trips you've booked.",
  date: "2026-11-02",
  author: "TripCache Editorial Team",
  readTime: "8 min read",
  category: "Guide",
  image: "/blog-media/blog-cover-claude-travel-connectors.webp",
  imageAlt: "Cut-paper illustration of a chat speech bubble with a row of puzzle pieces showing a suitcase, a ticket, a hotel and a plane slotting into it",
  keywords: [
    "best Claude connectors for travel planning",
    "best Claude travel connectors",
    "Claude connectors for travel planning",
    "Claude travel connectors",
    "Claude connectors list travel",
  ],
}

export const body = String.raw`# The Best Claude Connectors for Travel (2026)

**Quick answer:** for planning, add **Expedia** or **Kiwi.com** for flights, **Booking.com** or **Tripadvisor** for places to stay, and **Viator** for things to do. If you book with one chain, **Wyndham**, **ALL Accor** or **Turkish Airlines** have their own. For work trips, **Navan** or **Otto Travel**. Once the trip is booked, add a trip organizer so Claude can answer from your real bookings: **TripCache** (our app) is built for that, and **Tineo** and **Tripsy** do it too.

We checked every listing in [Claude's connector directory](https://claude.com/marketplace/connectors-plugins) on 2 November 2026. Connectors change often, so check the listing before you rely on a feature.

| Trip stage | Connector | What it does in Claude | Sign-in |
|---|---|---|---|
| Flights | Expedia | Searches flights, hotels and activities; you book on Expedia's site (US only for now) | No |
| Flights | Kiwi.com | Flight search with flexible dates and all cabin classes | No |
| Stays | Booking.com | Searches stays and filters by price, rating and facilities | No |
| Stays | Tripadvisor | Hotel research: reviews, ratings, photos, availability and prices | No |
| Stays | Trivago | Compares hotel prices from several booking sites | No |
| Things to do | Viator | Tours, attractions and experiences | No |
| Things to do | AllTrails | Hikes and trails with community reviews | No |
| Business travel | Navan, Otto Travel | Book and manage company travel | Yes |
| After you book | **TripCache** | Answers from your own flights, stays and spending; adds plans and expenses if you allow it | Yes, approved on your phone |

## How we picked

- **Listed in Claude's directory**, made by the travel company itself, and marked "Anthropic verified". The exception is TripCache, which you add as a custom connector (details below).
- **Useful to travellers**, not just to developers.
- **Described from the listing.** Each "what it does" comes from the connector's own directory page or help page, not from guesses.

We make TripCache, so we've kept it to its own section and listed the other trip organizers next to it.

## Best Claude connectors for flights

### Expedia

Expedia's connector searches flights, hotels and activities. Its [help page](https://www.expedia.com/playground/mcp/doc/) says you don't need an Expedia account, it works on the web, desktop and mobile apps, and it searches one thing per request: flights or hotels, not both at once. It doesn't book inside Claude. You get a link to finish on Expedia's website. For now it's available to users in the United States.

**Best for:** comparing flights and hotels in one place, if you're in the US.

### Kiwi.com

Kiwi.com's connector is flight search only: one-way or return, flexible dates, several passengers and every cabin class. It's a good second opinion on price next to Expedia.

**Best for:** flexible-date flight searches.

### Turkish Airlines

The [Turkish Airlines connector](https://claude.com/marketplace/connectors/turkish-airlines) is the official one from the airline. It searches and compares Turkish Airlines flights, checks live flight status, looks up booking details and baggage allowance, and shows city guides and promotions.

**Best for:** people who fly Turkish Airlines often.

## Best Claude connectors for hotels and stays

### Booking.com

Booking.com's connector searches stays, from hotels to holiday homes, and lets you filter by price, ratings and facilities. No sign-in is needed.

**Best for:** a wide search across hotels and homes.

### Tripadvisor

Tripadvisor's connector is built for hotel research. Claude can search hotels in an area and pull details, photos, reviews, ratings, availability, prices and what's nearby.

**Best for:** checking reviews before you choose.

### Trivago

Trivago's connector is metasearch: it returns hotel options with prices from several booking sites, so you can see who's cheapest.

**Best for:** price comparison across sites.

### Wyndham and ALL Accor

If you stay with one chain, its own connector goes deeper than a general search. **Wyndham Hotels and Resorts** searches Wyndham hotels by city and dates and filters by amenities like pools or pet-friendly. **ALL Accor** covers Accor's hotels, from ibis and Novotel to its luxury brands, and its listing says it can book a room as well as search.

**Best for:** loyalty members of those chains.

## Best Claude connectors for things to do

- **Viator:** search tours, attractions and experiences by destination, dates, price and category.
- **AllTrails:** find hikes near where you're staying, with reviews, photos and ratings from other hikers.
- **Resy:** find and book restaurant tables in the United States. It needs a Resy sign-in.

## Best Claude connectors for business travel

- **Navan:** book and manage travel, and work with expenses, receipts and policies, if your company uses Navan.
- **Otto Travel:** search, book, change and cancel flights and hotels with your preferences and loyalty numbers applied.

Both need a company account. If your employer doesn't use one of them, they won't help.

## Best Claude connector for trips you've already booked

Every connector above helps before you book, or does the booking. None of them knows what's in your confirmation emails. Once a trip is booked, the questions change: "what time is check-in?", "which terminal?", "how much have I spent?" That needs a connector from the app that holds your trip.

### TripCache

[TripCache](/ai-agents/claude) keeps your flights, hotels, rental cars, plans, documents and expenses in one trip, and runs its own connector for Claude. Once it's connected, Claude can:

- tell you your next flight, with times, gate and status;
- show a whole trip, day by day, with the hotel's check-in and check-out times;
- add up your spending against the trip budget;
- add a plan or an expense to a trip, if you gave it permission.

![Claude showing a TripCache trip card for a Melbourne weekend, with flights, a hotel, dinner and a show listed by day](/blog-media/ai-agent-trip-card-claude.webp 720x1549 "Ask Claude to show a trip and TripCache returns the full itinerary as a card.")

Answers come back as cards drawn like TripCache's widgets. Claude never sees your confirmation numbers, booking prices or booking notes, and for documents it sees names only. TripCache doesn't book or pay for anything, and you can revoke Claude's access from the app at any time.

**What it needs:** TripCache Pro (see [plans](/pricing)), and the TripCache app on your phone to approve the connection. It isn't in Claude's directory, so you add it as a custom connector: Anthropic allows one custom connector on Claude's free plan and more on paid plans. The [Claude setup guide](/ai-agents/claude) walks through it.

**Best for:** asking Claude about trips you've booked, on iPhone or Android.

### Other trip organizers

- **Tineo** is in Claude's directory. Its connector reviews trips, flights, hotels and activities, adds or updates itinerary details, and is built around planning and sharing trips with friends.
- **Tripsy**, an iPhone and Mac trip organizer, offers a [custom connector for Claude](https://tripsy.app/claude) that can read and change your Tripsy trips.

If your trips already live in TripIt, there's no connector: see [does TripIt work with Claude or ChatGPT?](/blog/does-tripit-work-with-claude-chatgpt)

## How to add a connector in Claude

**From the directory** (Expedia, Booking.com and the rest):

1. In Claude, open **Settings → Connectors** and choose **Browse connectors**.
2. Find the connector and choose **Connect**. Sign in if it asks.
3. In a new chat, ask your question. Claude picks the connector it needs.

**As a custom connector** (TripCache, Tripsy):

1. Copy the connector's link from the app. In TripCache, it's under **Profile → AI agents**.
2. In Claude, open **Settings → Connectors → Add custom connector**, and paste it.
3. Approve the connection. TripCache sends the request to your phone, where you match a number.

## A connector setup for one trip

Say you're planning four days in Lisbon:

1. **Before booking:** ask Claude to compare flights with Expedia or Kiwi.com, check hotel reviews on Tripadvisor, and find a food tour on Viator.
2. **Book** on the sites Claude links to, as you normally would.
3. **After booking:** forward the confirmations to TripCache. Then ask Claude "which terminal does my Thursday flight leave from?" or "how much have I spent in Lisbon?", and it answers from the bookings.

Anthropic says Claude is designed to ask for your confirmation before it books or buys anything, and its directory warns to use connectors only from developers you trust. Leave tools you don't need switched off.

## Conclusion

The best Claude connectors for travel depend on where you are in the trip. Expedia, Kiwi.com, Booking.com, Tripadvisor and Viator cover planning, chain connectors go deeper for loyalty members, and Navan or Otto handle work trips. After you book, add a trip organizer so Claude answers from your own bookings.

To try that last part, [download TripCache](/download), add or forward a booking, and follow the [Claude setup guide](/ai-agents/claude). Prefer ChatGPT? The [ChatGPT guide](/ai-agents/chatgpt) has the same steps, and [which AI assistants can read your bookings](/blog/ai-travel-assistant-for-your-bookings) covers the rest.
`

export const faq: BlogFaq[] = [
  {
    question: "What are the best Claude connectors for travel planning?",
    answer:
      "For flights, Expedia and Kiwi.com. For stays, Booking.com, Tripadvisor and Trivago, plus Wyndham or ALL Accor if you stay with those chains. For things to do, Viator and AllTrails. For work trips, Navan or Otto Travel. After you book, a trip organizer such as TripCache lets Claude answer from your own bookings.",
  },
  {
    question: "Can Claude book flights and hotels?",
    answer:
      "Some connectors can and some can't. Expedia's connector searches but sends you to Expedia's website to book. The lastminute.com, ALL Accor, Resy, Navan and Otto Travel listings say they can book. Anthropic says Claude is designed to ask for your confirmation before it books or buys anything. TripCache doesn't book or pay for travel.",
  },
  {
    question: "Are Claude connectors free?",
    answer:
      "Directory connectors work on every Claude plan, and most travel ones need no sign-in. Custom connectors are limited to one on Claude's free plan. The app behind a connector may charge on its side: connecting Claude to TripCache needs TripCache Pro.",
  },
  {
    question: "Is there a Claude connector for TripIt?",
    answer:
      "No. TripIt isn't in Claude's connector directory and doesn't offer an MCP server, and its public API is closed to new integrations. Trip organizers that do connect to Claude include TripCache, Tineo and Tripsy.",
  },
  {
    question: "Can Claude see my existing travel bookings?",
    answer:
      "Only through a connector to an app that holds them. Booking connectors like Expedia and Booking.com search for new trips and don't read your reservations. If you connect TripCache, Claude can read the trips saved there, without confirmation numbers, booking prices or notes.",
  },
]
