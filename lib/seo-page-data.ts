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
  faqs: SeoFaq[]
}

export const featurePages: SeoLandingPage[] = [
  {
    kind: "feature",
    slug: "email-to-itinerary",
    path: "/features/email-to-itinerary",
    title: "Email-to-itinerary automation",
    metaTitle: "Email-to-Itinerary App for Travel Confirmation Emails",
    description:
      "Forward travel confirmation emails to TripCache and turn flights, hotels, rental cars, and bookings into organized trip timelines.",
    eyebrow: "Travel email organizer",
    hero: "Forward travel emails. TripCache turns booking confirmations into organized itineraries.",
    image: "/app-screenshot-import.webp",
    imageAlt: "TripCache import screen for forwarding travel confirmation emails",
    primaryKeyword: "travel email organizer",
    proofPoints: ["Booking email forwarding", "Automatic trip timelines", "Flights, stays, cars, and tickets"],
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
        copy: "Send hotel, flight, rental car, ticket, or reservation emails into TripCache.",
      },
      {
        title: "Review the extracted draft",
        copy: "TripCache organizes the booking details into a trip item that you can confirm or edit.",
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
    faqs: [
      {
        question: "What kinds of travel emails can TripCache organize?",
        answer:
          "TripCache is built around common travel confirmations such as flights, hotel stays, rental cars, tickets, and reservations.",
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
    title: "Cancellation deadline reminders",
    metaTitle: "Hotel Cancellation Reminder and Booking Deadline Tracker",
    description:
      "Track hotel, rental car, and refundable booking cancellation deadlines so you can avoid missed free-cancellation windows.",
    eyebrow: "Cancellation protection",
    hero: "Never miss the free-cancellation deadline buried inside a travel confirmation.",
    image: "/app-feature-cancellation-reminder.webp",
    imageAlt: "TripCache cancellation reminder feature",
    primaryKeyword: "hotel cancellation reminder",
    proofPoints: ["Hotel cutoff tracking", "Rental car reminders", "Refundable booking workflows"],
    benefits: [
      {
        title: "Protect flexible bookings",
        copy: "Record the deadline, local cutoff time, and cancellation rule beside the booking.",
      },
      {
        title: "Plan before the penalty starts",
        copy: "Use reminder timing that gives you space to compare prices, confirm plans, or cancel backups.",
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
        copy: "Add the hotel or rental car confirmation to TripCache with the cancellation rule.",
      },
      {
        title: "Set the deadline",
        copy: "Capture the exact date, cutoff time, local time zone, and penalty notes.",
      },
      {
        title: "Act before the window closes",
        copy: "Review the trip when reminders arrive and cancel duplicate or risky bookings in time.",
      },
    ],
    internalLinks: [
      { href: "/tools/hotel-cancellation-deadline-calculator", label: "Deadline calculator" },
      { href: "/blog/hotel-cancellation-reminder-app-2026", label: "Hotel reminder guide" },
      { href: "/blog/free-cancellation-reminder-travel-bookings-2026", label: "Free cancellation reminders" },
    ],
    faqs: [
      {
        question: "Can TripCache track hotel cancellation deadlines?",
        answer:
          "Yes. TripCache helps you store cancellation deadlines and reminders with the hotel stay and its confirmation details.",
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
    ],
  },
  {
    kind: "feature",
    slug: "business-travel-expenses",
    path: "/features/business-travel-expenses",
    title: "Business travel expense organization",
    metaTitle: "Business Travel Organizer for Receipts and Trip Expenses",
    description:
      "Organize business trip bookings, receipts, documents, and expenses so reimbursement records stay connected to each trip.",
    eyebrow: "Business travel organizer",
    hero: "Keep business trip bookings, receipts, and expense details ready for reimbursement.",
    image: "/app-screen-expense-management.webp",
    imageAlt: "TripCache expense management screen for business travel",
    primaryKeyword: "business travel organizer",
    proofPoints: ["Receipt storage", "Trip expense records", "CSV export workflows"],
    benefits: [
      {
        title: "Attach receipts where they belong",
        copy: "Keep hotel, transport, meals, and trip documents grouped with the business trip.",
      },
      {
        title: "Reduce reimbursement cleanup",
        copy: "Capture expense context while traveling instead of reconstructing it from email later.",
      },
      {
        title: "Built for frequent travelers",
        copy: "Consultants, sales teams, executives, and remote workers can keep every trip audit-ready.",
      },
    ],
    workflowTitle: "From trip to expense record",
    workflow: [
      {
        title: "Add bookings and receipts",
        copy: "Forward travel confirmations and save receipts or documents as the trip happens.",
      },
      {
        title: "Review expenses by trip",
        copy: "Group costs by journey so reimbursement details do not get mixed with personal travel.",
      },
      {
        title: "Export when it is time to report",
        copy: "Use TripCache as the organized source of truth before submitting expenses.",
      },
    ],
    internalLinks: [
      { href: "/blog/business-travel-expense-reporting-app-2026", label: "Expense reporting guide" },
      { href: "/blog/trip-expense-management-app-2026", label: "Trip expense management" },
      { href: "/features/email-to-itinerary", label: "Email-to-itinerary automation" },
    ],
    faqs: [
      {
        question: "Is TripCache a full corporate travel management system?",
        answer:
          "No. TripCache is focused on helping individual travelers organize bookings, documents, receipts, and expense context.",
      },
      {
        question: "Can I store receipts with a trip?",
        answer:
          "Yes. TripCache is designed to keep receipts and travel documents connected to the relevant trip.",
      },
      {
        question: "Who is this best for?",
        answer:
          "It is especially useful for frequent business travelers, consultants, sales professionals, executives, and remote workers.",
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
    metaTitle: "TripIt Alternative for Email Itineraries and Cancellation Reminders",
    description:
      "Compare TripCache with TripIt if you want travel email organization, cancellation deadline tracking, documents, and business travel expense workflows.",
    eyebrow: "TripIt alternative",
    hero: "A TripIt alternative built for the details after booking: deadlines, documents, and receipts.",
    image: "/blog-cover-tripit-alternative-documents-reminders.webp",
    imageAlt: "TripCache TripIt alternative article cover",
    primaryKeyword: "TripIt alternative",
    proofPoints: ["Email-to-trip workflow", "Cancellation reminders", "Documents and expenses"],
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
    faqs: [
      {
        question: "Is TripCache a direct TripIt replacement?",
        answer:
          "TripCache covers itinerary organization while putting extra emphasis on cancellation deadlines, documents, and travel expense context.",
      },
      {
        question: "Why compare TripCache with TripIt?",
        answer:
          "Travelers looking for a TripIt alternative often want automatic organization plus stronger workflows around reminders and records.",
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
    metaTitle: "TripCase Alternative for Travel Emails, Documents, and Reminders",
    description:
      "Use TripCache as a TripCase alternative for organizing travel confirmations, trip timelines, cancellation reminders, documents, and expenses.",
    eyebrow: "TripCase alternative",
    hero: "Replacing TripCase? Move to a travel inbox built for confirmations, reminders, and records.",
    image: "/blog-tripcase-alternative.webp",
    imageAlt: "TripCache TripCase alternative article cover",
    primaryKeyword: "TripCase alternative",
    proofPoints: ["TripCase migration intent", "Modern travel inbox", "Reminders and documents"],
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
