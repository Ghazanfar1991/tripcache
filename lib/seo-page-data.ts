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
    title: "TripIt alternative for reminders, documents, and expenses",
    metaTitle: "TripIt Alternative with Reminders and Documents",
    description:
      "Compare TripCache with TripIt if you want travel email organization, cancellation deadline tracking, documents, and business travel expense workflows.",
    eyebrow: "TripIt alternative",
    hero: "A TripIt alternative built for the details after booking: deadlines, documents, and receipts.",
    image: "/blog-cover-tripit-alternative-documents-reminders.webp",
    imageAlt: "TripCache TripIt alternative article cover",
    primaryKeyword: "TripIt alternative",
    proofPoints: ["Email-to-trip workflow", "Cancellation reminders", "Documents and expenses"],
    planNote:
      "Basic supports manual trip organization. The paid plan adds email import, reminders, supported flight-status updates, expanded document storage, and CSV exports.",
    benefits: [
      {
        title: "More than a timeline",
        copy: "TripCache emphasizes the post-booking details travelers need: reminders, documents, notes, receipts, and exports.",
      },
      {
        title: "Built around travel email context",
        copy: "Forward confirmations and keep the original booking context close to the organized itinerary.",
      },
      {
        title: "Useful for business travelers",
        copy: "TripCache gives frequent travelers a place to manage reimbursement details and changing plans.",
      },
    ],
    workflowTitle: "When TripCache is the better fit",
    workflow: [
      {
        title: "You hold refundable bookings",
        copy: "Use TripCache to track hotel and rental car cancellation deadlines before they become penalties.",
      },
      {
        title: "You need documents in context",
        copy: "Keep confirmations, PDFs, receipts, and notes beside the trip rather than spread across folders.",
      },
      {
        title: "You travel for work",
        copy: "Use trip-based organization to prepare cleaner expense and reimbursement records.",
      },
    ],
    internalLinks: [
      { href: "/blog/tripit-vs-tripcache-comparison-2025", label: "TripIt vs TripCache" },
      { href: "/blog/best-tripit-alternatives-2026", label: "Best TripIt alternatives" },
      { href: "/features/cancellation-reminders", label: "Cancellation reminders" },
    ],
    resourceCta: {
      href: "/blog/tripit-vs-tripcache-comparison-2025",
      label: "Read the TripIt comparison",
    },
    faqs: [
      {
        question: "Is TripCache a direct TripIt replacement?",
        answer:
          "TripCache covers itinerary organization while putting extra emphasis on cancellation deadlines, documents, and travel expense context.",
      },
      {
        question: "Why compare TripCache with TripIt?",
        answer:
          "Travelers looking for a TripIt alternative often want itinerary organization with reminders and records kept in the same trip context.",
      },
      {
        question: "Does TripCache support business travel?",
        answer:
          "Yes. TripCache is designed for frequent business travelers who need organized bookings, receipts, and trip details.",
      },
    ],
  },
  {
    kind: "alternative",
    slug: "tripcase",
    path: "/alternatives/tripcase",
    title: "TripCase alternative for frequent travelers",
    metaTitle: "TripCase Alternative for Travel Confirmations",
    description:
      "Use TripCache as a TripCase alternative for organizing travel confirmations, trip timelines, cancellation reminders, documents, and expenses.",
    eyebrow: "TripCase alternative",
    hero: "Replacing TripCase? Move to a travel inbox built for confirmations, reminders, and records.",
    image: "/blog-tripcase-alternative.webp",
    imageAlt: "TripCache TripCase alternative article cover",
    primaryKeyword: "TripCase alternative",
    proofPoints: ["TripCase migration intent", "Modern travel inbox", "Reminders and documents"],
    planNote:
      "Basic supports manual trip organization. The paid plan adds supported email import, cancellation reminders, expanded document storage, and CSV exports.",
    benefits: [
      {
        title: "Organize confirmed trips",
        copy: "TripCache helps turn booking confirmations into a structured trip view with the details you need on the road.",
      },
      {
        title: "Protect cancellation windows",
        copy: "Add deadline reminders for refundable hotels, rental cars, and backup bookings.",
      },
      {
        title: "Keep work travel records tidy",
        copy: "Save receipts, documents, notes, and trip expenses in the same place as the itinerary.",
      },
    ],
    workflowTitle: "How to move your workflow",
    workflow: [
      {
        title: "Forward upcoming bookings",
        copy: "Start with future confirmations so your next trips are organized first.",
      },
      {
        title: "Add cancellation cutoffs",
        copy: "Record deadlines for flexible bookings so nothing expensive slips by.",
      },
      {
        title: "Attach documents and receipts",
        copy: "Keep travel records close to each trip for check-in, changes, and reimbursement.",
      },
    ],
    internalLinks: [
      { href: "/blog/tripcase-shutdown-what-now", label: "TripCase shutdown guide" },
      { href: "/blog/tripcase-alternative-2025", label: "TripCase alternative guide" },
      { href: "/features/email-to-itinerary", label: "Email-to-itinerary automation" },
    ],
    resourceCta: {
      href: "/blog/tripcase-shutdown-what-now",
      label: "Read the TripCase shutdown guide",
    },
    faqs: [
      {
        question: "Why look for a TripCase alternative?",
        answer:
          "Many travelers want a modern way to organize confirmations, documents, deadlines, and expenses after TripCase-related changes.",
      },
      {
        question: "Can TripCache organize booking emails?",
        answer:
          "Yes. TripCache is built around travel confirmations and the trip details that come after booking.",
      },
      {
        question: "Is TripCache only for business travel?",
        answer:
          "No. It works for frequent leisure travelers too, but its reminders, documents, and expenses are especially useful for work travel.",
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
