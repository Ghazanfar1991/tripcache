export const IOS_STORE_URL = "https://apps.apple.com/app/id6758403056"
export const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=app.tripcache"

/** The app's category colours (trip-cache-app/lib/theme.tsx). */
export type Category = "flight" | "hotel" | "car" | "activity"

export const CATEGORY: Record<Category, { label: string; plural: string; color: string; soft: string; text: string }> = {
  flight: { label: "Flight", plural: "Flights", color: "#6366f1", soft: "#eef2ff", text: "#4f46e5" },
  hotel: { label: "Hotel", plural: "Hotels", color: "#12b76a", soft: "#e8f8f0", text: "#067647" },
  car: { label: "Car", plural: "Cars", color: "#f59e0b", soft: "#fff5d6", text: "#b54708" },
  activity: { label: "Activity", plural: "Activities", color: "#d82d7e", soft: "#fce7f2", text: "#c12570" },
}

/** Sample confirmation emails for the signature section. Illustrative, not real bookings. */
export const EMAILS: {
  category: Category
  from: string
  subject: string
  detail: string
  time: string
  chip: string
  when: string
  date: string
}[] = [
  {
    category: "flight",
    from: "Flight booking",
    subject: "Your e-ticket receipt · PR 731",
    detail: "Bangkok → Manila · 13 May, 1:25 pm",
    time: "9:41",
    chip: "PR 731 · BKK → MNL",
    when: "13:25",
    date: "13 May",
  },
  {
    category: "hotel",
    from: "Belmont Hotel Manila",
    subject: "Reservation confirmed",
    detail: "13–14 May · free cancellation until 11 May",
    time: "Yesterday",
    chip: "Belmont Hotel · 1 night",
    when: "15:00",
    date: "13 May",
  },
  {
    category: "car",
    from: "Car rental",
    subject: "Your rental voucher is ready",
    detail: "Pick-up 14 May, 9:00 am · Pasay",
    time: "Mon",
    chip: "Rental car · Pasay",
    when: "09:00",
    date: "14 May",
  },
  {
    category: "activity",
    from: "Tour tickets",
    subject: "2 tickets: Intramuros walking tour",
    detail: "15 May, 10:30 am · meet at Fort Santiago",
    time: "Sun",
    chip: "Walking tour · 2 tickets",
    when: "10:30",
    date: "15 May",
  },
]

export const STEPS = [
  {
    id: "forward",
    label: "Forward",
    title: "Forward the confirmation.",
    text: "With Pro, send it to your private TripCache address. No retyping, no copying and pasting.",
  },
  {
    id: "review",
    label: "Review",
    title: "Watch it become a draft.",
    text: "TripCache pulls out the flight, times and booking reference. You check every field before anything is saved.",
  },
  {
    id: "organize",
    label: "Organize",
    title: "File it into the trip.",
    text: "Approved bookings slot into one itinerary, in date order and colour-coded by type.",
  },
  {
    id: "keep",
    label: "Keep",
    title: "Keep the rest beside it.",
    text: "Deadlines, documents, receipts and expenses stay attached to the trip they belong to.",
  },
] as const

/** Destinations for the hero trip card. Sample trips mirrored from the app's screenshots. */
export const HERO_TRIPS: {
  city: string
  dates: string
  counts: Record<Category, number>
  next: { category: Category; title: string; meta: string }
}[] = [
  {
    city: "Manila",
    dates: "13 – 19 May 2026",
    counts: { flight: 2, hotel: 1, car: 1, activity: 3 },
    next: { category: "flight", title: "PR 731 · Bangkok → Manila", meta: "13 May · 13:25" },
  },
  {
    city: "Sydney",
    dates: "19 – 22 May 2026",
    counts: { flight: 2, hotel: 1, car: 0, activity: 2 },
    next: { category: "flight", title: "Flight · Manila → Sydney", meta: "19 May · 08:30" },
  },
  {
    city: "Bangkok",
    dates: "17 – 20 Mar 2026",
    counts: { flight: 1, hotel: 2, car: 0, activity: 4 },
    next: { category: "hotel", title: "Riverside hotel · check-in", meta: "17 Mar · 15:00" },
  },
  {
    city: "Melbourne",
    dates: "8 – 11 Mar 2026",
    counts: { flight: 2, hotel: 1, car: 1, activity: 1 },
    next: { category: "flight", title: "QF 43 · Sydney → Melbourne", meta: "8 Mar · 16:30" },
  },
]

/** Visible home FAQ; the FAQPage JSON-LD in faq.tsx is built from this same list, word for word. */
export const FAQS = [
  {
    question: "What is TripCache?",
    answer:
      "TripCache is a post-booking travel organizer app for iPhone and Android. It keeps flights, stays, cancellation deadlines, travel documents and expenses in one itinerary. Basic is free; Pro adds booking-email import, live flight-status alerts on supported flights, and Live Activity and widgets. TripCache is an independent app and has no connection to Sabre's TripCase.",
  },
  {
    question: "Is TripCache free?",
    answer:
      "Yes. Basic is free and includes manual trips, cancellation-deadline and check-in reminders, boarding-pass scanning, the document vault, expenses and budgets, CSV and PDF export, the trip map, and travel history. Pro adds booking-email import, live flight-status alerts, and Live Activity and widgets. Storage limits are the same on both plans. You upgrade to Pro inside the mobile app.",
  },
  {
    question: "How does booking-email import work?",
    answer:
      "Pro gives you a TripCache forwarding address. Send a supported booking confirmation to that address and TripCache extracts the details, including from attached PDFs and screenshots, into a draft. You review and correct the draft before adding it to your itinerary. Imports count toward a monthly allowance.",
  },
  {
    question: "How do free-cancellation reminders work?",
    answer:
      "They are free on every plan. You enter the cutoff from your refundable booking and choose a reminder 7 days, 2 days, or 1 day before, or on the day. Always confirm the final deadline and cancellation terms with the hotel, airline, rental company, tour operator, or other booking provider.",
  },
  {
    question: "Can I keep travel documents with an itinerary?",
    answer:
      "Yes. You can attach boarding passes, tickets, confirmations, visas, passport copies, and other travel files to the relevant trip so they are easier to find in context. You can also lock documents with a PIN and unlock them with Face ID or a fingerprint.",
  },
  {
    question: "Can I track expenses and export a CSV?",
    answer:
      "Yes, on the free plan. Track costs in any of 153 currencies, set category budgets, and export CSV or PDF records for reimbursement review, client billing, or personal recordkeeping. Receipts can be saved as trip documents.",
  },
  {
    question: "Does TripCache replace airline or booking-provider updates?",
    answer:
      "No. With Pro, TripCache sends live flight-status alerts for supported flights, but airline, airport, and booking-provider information remains authoritative and can change or arrive late.",
  },
  {
    question: "Does TripCache work on iPhone and Android?",
    answer:
      "Yes. TripCache is available on the Apple App Store for iPhone with iOS 16.4 or later, and on Google Play for Android 7.0 or later. This page links directly to both official listings. The app is in English.",
  },
]

/** The quotable definition under the hero (40–60 words); keep it in step with the first FAQ. */
export const WHAT_IS_TRIPCACHE =
  "TripCache is a post-booking travel organizer app for iPhone and Android. It keeps flights, stays, cancellation deadlines, travel documents and trip expenses together in one itinerary. The free Basic plan includes cancellation-deadline and check-in reminders, a document vault and CSV or PDF export; TripCache Pro adds booking-email import and live flight-status alerts on supported flights."

export const GUIDES = [
  { href: "/blog/organize-travel-confirmation-emails-2026", label: "How to organize travel confirmation emails" },
  { href: "/blog/free-cancellation-reminder-travel-bookings-2026", label: "Free cancellation reminder workflow" },
  { href: "/blog/best-travel-document-organizer-app-2026", label: "Best travel document organizer app" },
  { href: "/blog/business-travel-expense-reporting-app-2026", label: "Business travel expense reporting app" },
]
