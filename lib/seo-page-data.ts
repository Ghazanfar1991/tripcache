export type SeoPageKind = "feature" | "alternative"

export interface SeoFaq {
  question: string
  answer: string
}

export interface SeoLandingPage {
  kind: SeoPageKind
  slug: string
  path: string
  title: string
  metaTitle: string
  description: string
  eyebrow: string
  hero: string
  image: string
  imageAlt: string
  primaryKeyword: string
  proofPoints: string[]
  planNote: string
  benefits: Array<{
    title: string
    copy: string
  }>
  workflowTitle: string
  workflow: Array<{
    title: string
    copy: string
  }>
  internalLinks: Array<{
    href: string
    label: string
  }>
  resourceCta: {
    href: string
    label: string
  }
  faqs: SeoFaq[]
}

export const featurePages: SeoLandingPage[] = [
  {
    kind: "feature",
    slug: "email-to-itinerary",
    path: "/features/email-to-itinerary",
    title: "Email-to-itinerary automation",
    metaTitle: "Email-to-Itinerary App for Booking Confirmations",
    description:
      "Use TripCache Pro Email Import with supported travel confirmations to create reviewable trip drafts for flights, hotels, rental cars, trains, and tickets.",
    eyebrow: "Travel email organizer",
    hero: "Forward supported travel emails. TripCache turns booking confirmations into reviewable itinerary drafts.",
    image: "/app-screenshot-import.webp",
    imageAlt: "TripCache import screen for forwarding travel confirmation emails",
    primaryKeyword: "travel email organizer",
    proofPoints: ["Supported email forwarding", "Reviewable trip drafts", "Flights, stays, cars, and tickets"],
    planNote:
      "Email Import is part of Pro and includes a monthly import allowance. It works with supported booking confirmations; review each draft before saving. Cancellation reminders, documents, and exports are free on every plan.",
    benefits: [
      {
        title: "Stop hunting through your inbox",
        copy: "Keep confirmation numbers, dates, providers, and trip details connected to the journey they belong to.",
      },
      {
        title: "Build trips from real bookings",
        copy: "TripCache is organized around confirmed travel, so your itinerary starts from the emails you already receive.",
      },
      {
        title: "Keep documents beside the itinerary",
        copy: "Attach confirmations, PDFs, receipts, and notes so the details are ready when plans change.",
      },
    ],
    workflowTitle: "How email forwarding works",
    workflow: [
      {
        title: "Forward the confirmation",
        copy: "With Pro, forward a supported hotel, flight, rental car, ticket, or reservation confirmation, including attached PDFs or screenshots, to your TripCache address.",
      },
      {
        title: "Review the extracted draft",
        copy: "TripCache organizes the booking details into a trip item that you can confirm or edit. When the confirmation states a free-cancellation deadline, the draft includes it.",
      },
      {
        title: "Travel from one timeline",
        copy: "Your bookings, reminders, documents, and expenses stay grouped by trip instead of scattered across apps.",
      },
    ],
    internalLinks: [
      { href: "/features/cancellation-reminders", label: "Cancellation reminders" },
      { href: "/blog/organize-travel-confirmation-emails-2026", label: "Confirmation email guide" },
      { href: "/blog/email-to-trip-automation", label: "Email automation workflow" },
    ],
    resourceCta: {
      href: "/blog/organize-travel-confirmation-emails-2026",
      label: "Read the confirmation-email guide",
    },
    faqs: [
      {
        question: "What kinds of travel emails can TripCache organize?",
        answer:
          "Pro Email Import works with supported confirmations for flights, hotel stays, rental cars, trains, buses, ferries, parking, events, tours, and restaurant reservations. It also reads attached PDFs and screenshots. Review each draft before saving.",
      },
      {
        question: "Is email import free?",
        answer:
          "No. Email import is part of TripCache Pro and has a monthly allowance. On the free plan you can add bookings by hand or scan a boarding pass, and cancellation reminders work on both plans.",
      },
      {
        question: "Is this a generic trip planner?",
        answer:
          "No. TripCache focuses on turning confirmed bookings and travel documents into an organized trip timeline.",
      },
      {
        question: "Can I keep editing the itinerary?",
        answer:
          "Yes. You can review details, add notes, attach documents, and keep the itinerary useful as plans change.",
      },
    ],
  },
  {
    kind: "feature",
    slug: "cancellation-reminders",
    path: "/features/cancellation-reminders",
    title: "Free cancellation deadline reminders",
    metaTitle: "Hotel Cancellation Reminder and Deadline Tracker",
    description:
      "Free on every TripCache plan: save hotel, rental-car, and other refundable-booking deadlines and get reminded 7, 2, or 1 day before, or on the day.",
    eyebrow: "Free cancellation reminders",
    hero: "Get a free reminder before free cancellation ends.",
    image: "/app-feature-cancellation-reminder.webp",
    imageAlt: "TripCache cancellation reminder feature",
    primaryKeyword: "hotel cancellation reminder",
    proofPoints: ["Free on every plan", "Reminders 7, 2, or 1 day before, or on the day", "Hotels, rental cars, tours, and tickets"],
    planNote:
      "Cancellation reminders are included free in TripCache Basic. Enter the cutoff from the original confirmation, or let Pro's email import read it for you to check. The booking provider remains authoritative.",
    benefits: [
      {
        title: "Free, not a Pro upsell",
        copy: "Cancellation reminders are part of the free plan. You don't need a subscription to protect a refundable booking.",
      },
      {
        title: "Plan before the penalty starts",
        copy: "Choose a reminder 7 days, 2 days, or 1 day before the cutoff, or on the day, so you have time to compare prices, confirm plans, or cancel backups.",
      },
      {
        title: "Keep context with the alert",
        copy: "When the reminder fires, the confirmation, provider, notes, and trip details are in one place.",
      },
    ],
    workflowTitle: "A safer cancellation workflow",
    workflow: [
      {
        title: "Save the refundable booking",
        copy: "Add the hotel or rental car to the trip by hand, or forward the confirmation with Pro.",
      },
      {
        title: "Set the deadline",
        copy: "Enter the date and cutoff time from the confirmation, then pick when to be reminded.",
      },
      {
        title: "Act before the window closes",
        copy: "Review the trip when reminders arrive, then confirm or cancel directly with the provider before its stated deadline.",
      },
    ],
    internalLinks: [
      { href: "/tools/hotel-cancellation-deadline-calculator", label: "Deadline calculator" },
      { href: "/blog/hotel-cancellation-reminder-app-2026", label: "Hotel reminder guide" },
      { href: "/blog/free-cancellation-reminder-travel-bookings-2026", label: "Free cancellation reminders" },
    ],
    resourceCta: {
      href: "/tools/hotel-cancellation-deadline-calculator",
      label: "Calculate a hotel cancellation deadline",
    },
    faqs: [
      {
        question: "Can TripCache track hotel cancellation deadlines?",
        answer:
          "Yes, on the free plan. Save the cancellation deadline with the stay and pick reminders 7 days, 2 days, or 1 day before, or on the day. The provider's confirmation remains authoritative.",
      },
      {
        question: "Are cancellation reminders free?",
        answer:
          "Yes. Cancellation-deadline reminders are part of TripCache Basic, the free plan. Pro adds booking-email import, which can read the deadline from a forwarded confirmation, plus live flight-status alerts.",
      },
      {
        question: "Does this work for rental cars?",
        answer:
          "Yes. The same reminder workflow can be used for rental car reservations and other refundable bookings.",
      },
      {
        question: "Why use a dedicated reminder instead of a calendar event?",
        answer:
          "TripCache keeps the alert connected to the booking, confirmation number, notes, and trip context.",
      },
      {
        question: "Does TripCache also remind me to check in for flights?",
        answer:
          "Yes, also free. TripCache sends a reminder 48 hours before departure and another 24 hours before, when many airlines open online check-in. A shortcut copies your booking reference and opens the airline's website. It does not check you in automatically.",
      },
    ],
  },
  {
    kind: "feature",
    slug: "business-travel-expenses",
    path: "/features/business-travel-expenses",
    title: "Business travel expense organization",
    metaTitle: "Business Travel Expense and Receipt Organizer",
    description:
      "Organize business-trip bookings, receipts, documents, and expenses by trip, with free CSV and PDF export for reimbursement review.",
    eyebrow: "Business travel organizer",
    hero: "Keep business trip bookings, receipts, and expense details ready for reimbursement.",
    image: "/app-screen-expense-management.webp",
    imageAlt: "TripCache expense management screen for business travel",
    primaryKeyword: "business travel organizer",
    proofPoints: ["Receipts kept as trip documents", "153 currencies and category budgets", "Free CSV and PDF export"],
    planNote:
      "Expenses, budgets, and CSV and PDF export are free on every plan. Records are organizational aids, not accounting or tax advice.",
    benefits: [
      {
        title: "Keep receipts with the trip",
        copy: "Save hotel, transport, and meal receipts as trip documents, next to the bookings and expenses they back up.",
      },
      {
        title: "Reduce reimbursement cleanup",
        copy: "Log each cost in the currency you paid while traveling. TripCache locks the exchange rate on each expense, so your home-currency totals don't drift.",
      },
      {
        title: "Built for frequent travelers",
        copy: "Consultants, sales teams, executives, and remote workers can keep every trip organized for review.",
      },
    ],
    workflowTitle: "From trip to expense record",
    workflow: [
      {
        title: "Add bookings and receipts",
        copy: "Add bookings by hand or forward confirmations with Pro, and save receipts as trip documents as the trip happens.",
      },
      {
        title: "Review expenses by trip",
        copy: "Group costs by journey so reimbursement details do not get mixed with personal travel.",
      },
      {
        title: "Export when it is time to report",
        copy: "Export expenses as CSV or PDF, filtered by dates and by business or personal trips, to prepare records for submission or reimbursement review.",
      },
    ],
    internalLinks: [
      { href: "/blog/business-travel-expense-reporting-app-2026", label: "Expense reporting guide" },
      { href: "/blog/trip-expense-management-app-2026", label: "Trip expense management" },
      { href: "/features/email-to-itinerary", label: "Email-to-itinerary automation" },
    ],
    resourceCta: {
      href: "/blog/business-travel-expense-reporting-app-2026",
      label: "Read the expense reporting guide",
    },
    faqs: [
      {
        question: "Is TripCache a full corporate travel management system?",
        answer:
          "No. TripCache is focused on helping individual travelers organize bookings, documents, receipts, and expense context.",
      },
      {
        question: "Can I store receipts with a trip?",
        answer:
          "Yes. Save receipts as documents on the trip. They aren't attached to individual expense entries, and TripCache doesn't read amounts from receipt images, so log each amount as an expense.",
      },
      {
        question: "Who is this best for?",
        answer:
          "It is especially useful for frequent business travelers, consultants, sales professionals, executives, and remote workers.",
      },
      {
        question: "Does TripCache provide CSV export?",
        answer:
          "Yes, on the free plan. Export CSV or PDF records, including an expense report, your travel history, and a Visa / Immigration Summary. TripCache is an organizational aid, not accounting or tax advice.",
      },
    ],
  },
]

export const alternativePages: SeoLandingPage[] = [
  {
    kind: "alternative",
    slug: "tripit",
    path: "/alternatives/tripit",
    title: "Switching from TripIt to TripCache",
    metaTitle: "Moving From TripIt? What Changes in TripCache",
    description:
      "What changes when you move from TripIt to TripCache: free cancellation and check-in reminders, a PIN-locked document vault, and expense exports.",
    eyebrow: "For TripIt users",
    hero: "Moving from TripIt? Here's what changes in TripCache.",
    image: "/blog-cover-tripit-alternative-documents-reminders.webp",
    imageAlt: "TripCache trip with cancellation reminders and travel documents",
    primaryKeyword: "Switching from TripIt",
    proofPoints: ["Free deadline and check-in reminders", "PIN-locked document vault", "CSV and PDF exports"],
    planNote:
      "Basic is free and includes cancellation and check-in reminders, the document vault, expenses, and CSV or PDF export. Pro adds email import with a monthly allowance, live flight-status alerts, and Live Activities and widgets.",
    benefits: [
      {
        title: "Reminders before free cancellation ends",
        copy: "Save a refundable booking's cutoff and get reminded 7 days, 2 days, 1 day, or on the day. TripIt's pricing page doesn't list this; in TripCache it's free.",
      },
      {
        title: "Documents locked inside the trip app",
        copy: "Sort passports, visas, tickets, and insurance in a vault with an optional PIN and Face ID or fingerprint unlock, on every plan.",
      },
      {
        title: "What the trip cost, ready to export",
        copy: "Log expenses in 153 currencies, set budgets, and export CSV or PDF records, including a visa travel-history summary.",
      },
    ],
    workflowTitle: "How to move from TripIt",
    workflow: [
      {
        title: "Start with upcoming trips",
        copy: "Add your next trip first: enter bookings by hand, scan a boarding pass, or forward confirmations with Pro.",
      },
      {
        title: "Bring over past flights",
        copy: "If you keep a record of past flights, import them from a CSV file using TripCache's sample template.",
      },
      {
        title: "Add deadlines and documents",
        copy: "Set cancellation reminders on refundable bookings and add the documents you need to the vault.",
      },
    ],
    internalLinks: [
      { href: "/blog/best-tripit-alternatives-2026", label: "Compare TripIt alternatives" },
      { href: "/blog/tripit-vs-tripcache-comparison-2025", label: "TripIt Pro vs free" },
      { href: "/features/cancellation-reminders", label: "Cancellation reminders" },
    ],
    resourceCta: {
      href: "/blog/tripit-vs-tripcache-comparison-2025",
      label: "See TripIt Pro vs TripCache",
    },
    faqs: [
      {
        question: "Does TripCache import confirmation emails like TripIt?",
        answer:
          "Yes, with TripCache Pro: forward confirmations, including attached PDFs and screenshots, to your own TripCache address and review each draft before saving. TripIt includes email forwarding on its free plan, so if that is all you need, TripIt costs less.",
      },
      {
        question: "What does TripCache include for free?",
        answer:
          "Basic includes trips, cancellation-deadline and check-in reminders, boarding-pass scanning, the document vault, multi-currency expenses and budgets, CSV and PDF export, CSV import of past flights, and offline access.",
      },
      {
        question: "Can I use TripCache and TripIt together?",
        answer:
          "Yes. You can keep TripIt's free plan for email forwarding and use TripCache Basic for deadline reminders, documents, and expenses.",
      },
      {
        question: "Is TripCache available on Android?",
        answer: "Yes. TripCache is available on iPhone and Android.",
      },
    ],
  },
  {
    kind: "alternative",
    slug: "tripcase",
    path: "/alternatives/tripcase",
    title: "TripCache for former TripCase users",
    metaTitle: "Moving From TripCase? How TripCache Works",
    description:
      "How TripCache covers the jobs TripCase did: free check-in and cancellation reminders, CSV import of past flights, a document vault, and Pro email import.",
    eyebrow: "For former TripCase users",
    hero: "Used TripCase? Here's how the same jobs work in TripCache.",
    image: "/blog-tripcase-alternative.webp",
    imageAlt: "TripCache trip timeline for travelers who used TripCase",
    primaryKeyword: "Moving from TripCase",
    proofPoints: ["Free check-in reminders", "CSV import of past flights", "Email import with Pro"],
    planNote:
      "Basic is free and includes check-in and cancellation reminders, the document vault, CSV import, and CSV or PDF export. Pro adds email import with a monthly allowance, live flight-status alerts, and widgets.",
    benefits: [
      {
        title: "Forward confirmations, then review",
        copy: "With Pro, forward a booking email, including PDFs and screenshots, to your own TripCache address and check the draft before it joins the trip.",
      },
      {
        title: "Check-in and deadline reminders, free",
        copy: "Get check-in reminders 48 and 24 hours before departure, and reminders before refundable hotels and cars stop being free to cancel.",
      },
      {
        title: "Your flight history back",
        copy: "Import past flights from a CSV file, then export your travel history as CSV or PDF when you need it.",
      },
    ],
    workflowTitle: "How to move your trips",
    workflow: [
      {
        title: "Rebuild upcoming trips first",
        copy: "TripCase data can't be recovered, so start with the confirmations for your next trips.",
      },
      {
        title: "Add cancellation cutoffs",
        copy: "Record the free-cancellation deadline for each refundable booking and choose when to be reminded.",
      },
      {
        title: "Add documents and past flights",
        copy: "Put passports, visas, and tickets in the vault, and import past flights from a CSV file if you keep a record.",
      },
    ],
    internalLinks: [
      { href: "/blog/tripcase-shutdown-what-now", label: "What to use now TripCase is gone" },
      { href: "/features/email-to-itinerary", label: "Email-to-itinerary import" },
      { href: "/features/cancellation-reminders", label: "Cancellation reminders" },
    ],
    resourceCta: {
      href: "/blog/tripcase-shutdown-what-now",
      label: "Compare TripCase replacements",
    },
    faqs: [
      {
        question: "Is TripCache connected to TripCase?",
        answer:
          "No. TripCache is an independent app with a similar name. It isn't made by Sabre, and it can't access old TripCase accounts or data.",
      },
      {
        question: "Can I forward booking emails like I did with TripCase?",
        answer:
          "Yes, with TripCache Pro, which includes a monthly import allowance. TripCase's forwarding was free; if free forwarding is your priority, compare TripIt in our TripCase replacement guide.",
      },
      {
        question: "What can I do on the free plan?",
        answer:
          "Basic includes trips, check-in and cancellation-deadline reminders, boarding-pass scanning, the document vault, expenses, CSV import of past flights, CSV and PDF export, and offline access.",
      },
    ],
  },
]

export const seoLandingPages = [...featurePages, ...alternativePages]

export function getFeaturePage(slug: string) {
  return featurePages.find((page) => page.slug === slug)
}

export function getAlternativePage(slug: string) {
  return alternativePages.find((page) => page.slug === slug)
}
