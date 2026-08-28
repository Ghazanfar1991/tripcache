import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight, BadgeCheck, Bell, BellRing, BriefcaseBusiness, CalendarClock, Download,
  FileCheck2, FileLock2, FileSpreadsheet, Grid2x2Plus, Hotel, Mail, MailCheck, MapPinned,
  Plane, ReceiptText, Shield, Sparkles, Zap,
} from "lucide-react"

import { Reveal } from "@/components/design-one/reveal"
import { DesignOneHeroCarousel, DesignOneStoreButtons, DesignOneSupportLink } from "@/components/design-one/home-interactions"
import { Footer } from "@/components/footer"

const heroPoints = [
  "Import booking confirmation emails",
  "Track free-cancellation deadlines",
  "Keep travel documents and receipts",
  "Export business travel expenses",
]

const heroStories = [
  {
    image: "/app-screenshot-import.webp",
    alt: "TripCache booking confirmation email import screen",
    label: "Travel inbox", title: "Forward confirmations", description: "Turn booking emails into trip drafts.",
    secondLabel: "Review first", secondTitle: "Keep the details accurate", secondDescription: "Check each draft before saving it.",
  },
  {
    image: "/app-feature-cancellation-reminder.webp",
    alt: "TripCache cancellation reminder screen",
    label: "Reminders", title: "Protect free cancellation", description: "Deadlines stay visible before they pass.",
    secondLabel: "Flexible bookings", secondTitle: "Cancel in time", secondDescription: "Get reminded before hotel or car windows close.",
  },
  {
    image: "/app-screen-expense-management.webp",
    alt: "TripCache business travel expense management screen",
    label: "Business travel", title: "Track costs by trip", description: "Keep receipts and expenses together.",
    secondLabel: "Reports", secondTitle: "Export cleaner records", secondDescription: "Prepare CSVs for reimbursement or review.",
  },
  {
    image: "/app-feature-secure-documents.webp",
    alt: "TripCache travel document organization screen",
    label: "Documents", title: "Files beside the trip", description: "Keep tickets, passes, and confirmations close.",
    secondLabel: "Trip context", secondTitle: "Find what you need faster", secondDescription: "Avoid digging through inboxes and screenshots.",
  },
]

const steps = [
  { icon: Mail, title: "Forward Your Bookings", description: "Simply forward any flight, hotel, or car rental confirmation to your TripCache email address.", image: "/app-screenshot-import.webp" },
  { icon: Sparkles, title: "Review the Trip Draft", description: "TripCache extracts booking details into a trip draft for you to review and correct before saving.", image: "/app-screenshot-drafts.webp" },
  { icon: Download, title: "Ready When You Are", description: "Review your itinerary, track flight updates, and export expense records when you need them.", image: "/app-screenshot-home.webp" },
]

const features = [
  { icon: Mail, title: "Email-to-Trip Magic", description: "Forward booking emails and TripCache turns confirmations into organized trip drafts.", images: ["/app-screenshot-import.webp", "/app-screenshot-drafts.webp"], imageAlts: ["TripCache email import screen for booking confirmations", "TripCache draft itinerary review screen"], layout: "min-[980px]:col-span-7" },
  { icon: Hotel, title: "Add Everything", description: "Keep flights, hotels, rental cars, transport, activities, tickets, restaurants, parking, notes, and custom items in one trip.", images: ["/app-feature-add-everything.webp"], imageAlts: ["TripCache screen for adding flights hotels rental cars tickets notes and custom trip items"], layout: "min-[980px]:col-span-5" },
  { icon: BellRing, title: "Cancellation Reminders", description: "Save free-cancellation deadlines and get reminded before hotels, cars, tours, or tickets become non-refundable.", images: ["/app-feature-cancellation-reminder.webp"], imageAlts: ["TripCache free cancellation reminder screen for refundable travel bookings"], layout: "min-[980px]:col-span-4" },
  { icon: Shield, title: "Travel Document Hub", description: "Keep passports, boarding passes, tickets, visas, and confirmations attached to the trip where you need them.", images: ["/app-feature-secure-documents.webp"], imageAlts: ["TripCache travel document hub for passports boarding passes tickets and visas"], layout: "min-[980px]:col-span-4" },
  { icon: Plane, title: "Live Trip Tracking", description: "Stay on top of every journey with flight status, live progress, and your travel details in one view.", images: ["/app-screenshot-flight-detail.webp"], imageAlts: ["TripCache live flight tracking screen with status and travel details"], layout: "min-[980px]:col-span-4" },
  { icon: MapPinned, title: "Trip Map View", description: "Visualize your destination, stays, activities, and travel context on a map built for trip days.", images: ["/app-screen-trip-map.webp"], imageAlts: ["TripCache trip map screen showing destinations stays and activities"], layout: "min-[980px]:col-span-5" },
  { icon: ReceiptText, title: "Expense Management", description: "Track trip costs, save receipts, and keep cleaner records for reimbursement or personal budgets.", images: ["/app-screen-expense-management.webp"], imageAlts: ["TripCache expense management screen for receipts costs and travel budgets"], layout: "min-[980px]:col-span-7" },
  { icon: FileSpreadsheet, title: "Smart Exports", description: "Generate detailed CSV reports for tax records, reimbursements, and travel reviews.", images: ["/app-screenshot-export.webp"], imageAlts: ["TripCache CSV export screen for travel expense reports"], layout: "min-[980px]:col-span-12" },
]

const mobileScreens = [
  ["/app-screen-expense-management.webp", "Expense management"], ["/app-feature-add-everything.webp", "Add everything to trip"],
  ["/app-screenshot-export.webp", "Export report"], ["/app-feature-secure-documents.webp", "Travel documents hub"],
  ["/app-screenshot-trip-detail.webp", "Trip overview"], ["/app-screenshot-home.webp", "Dashboard"],
  ["/app-screenshot-flight-detail.webp", "Flight detail"], ["/app-screenshot-history.webp", "Travel history"],
  ["/app-screenshot-import.webp", "Import preview"], ["/app-screen-trip-map.webp", "Trip map"],
  ["/app-feature-cancellation-reminder.webp", "Cancellation reminder"],
] as const

const showcases = [
  { id: "add-everything", icon: Grid2x2Plus, title: "Add More Than Flights", subtitle: "Complete Trip Building", description: "Build a real itinerary with flights, hotels, rental cars, transport, activities, tickets, restaurants, meetings, parking, documents, notes, and custom items.", image: "/app-feature-add-everything.webp" },
  { id: "cancellation-reminders", icon: CalendarClock, title: "Stay Ahead of Free Cancellation", subtitle: "Booking Deadline Alerts", description: "Set cancellation deadlines for hotels, rental cars, tours, tickets, and other reservations. Choose reminders two days before, one day before, day of deadline, or a custom time.", image: "/app-feature-cancellation-reminder.webp" },
  { id: "secure-documents", icon: FileLock2, title: "Keep Documents With the Trip", subtitle: "Travel Documents", description: "Keep passports, boarding passes, flight tickets, visas, confirmations, and other travel files connected to the trip where you will look for them.", image: "/app-feature-secure-documents.webp" },
  { id: "trip-map", icon: MapPinned, title: "Navigate the Trip Visually", subtitle: "Map View", description: "Use the trip map to understand where your stays, activities, and travel details sit in relation to each other before you arrive.", image: "/app-screen-trip-map.webp" },
  { id: "expense-management", icon: ReceiptText, title: "Keep Expenses Under Control", subtitle: "Receipts and Costs", description: "Track travel spending, attach receipts, and keep expense context tied to the trip instead of scattered across email and notes.", image: "/app-screen-expense-management.webp" },
  { id: "live-updates", icon: Bell, title: "Real-time Flight Tracking", subtitle: "Stay Ahead of Schedule", description: "See flight-status updates and receive notifications for supported gate changes, delays, and boarding times without repeatedly refreshing a flight-status page.", image: "/app-screenshot-flight-detail.webp" },
]

const answers = [
  { icon: MailCheck, question: "How do I organize travel confirmation emails in one place?", answer: "Forward flight, hotel, rental car, tour, and ticket confirmations to TripCache. The app reads the booking details, creates a trip draft, and lets you review the itinerary before saving it." },
  { icon: BellRing, question: "How do I avoid missing free cancellation deadlines?", answer: "Add the cancellation deadline for refundable hotels, cars, tours, or tickets, then choose when TripCache should remind you before the booking becomes non-refundable." },
  { icon: FileLock2, question: "Where should I keep passports, boarding passes, visas, and tickets?", answer: "TripCache keeps travel documents connected to the right trip, so boarding passes, PDFs, passport copies, visa files, and tickets are easier to find when you are at the airport or hotel desk." },
  { icon: ReceiptText, question: "What travel app helps with expense reports after a trip?", answer: "Track trip costs, attach receipts, and export a CSV report for reimbursement, taxes, client billing, or personal travel budgets." },
]

const searchUseCases = [
  "Business travelers who need flight updates, receipt records, and cleaner reimbursement exports.",
  "Families planning flights, hotels, rental cars, activities, restaurant bookings, and tickets in one shared itinerary.",
  "Digital nomads who need past trip history, travel documents, maps, and flexible booking reminders.",
  "TripCase and TripIt users who want a modern itinerary app with cancellation reminders and document storage.",
]

const relatedGuides = [
  { href: "/blog/organize-travel-confirmation-emails-2026", title: "How to organize travel confirmation emails" },
  { href: "/blog/free-cancellation-reminder-travel-bookings-2026", title: "Free cancellation reminder workflow" },
  { href: "/blog/best-travel-document-organizer-app-2026", title: "Best travel document organizer app" },
  { href: "/blog/business-travel-expense-reporting-app-2026", title: "Business travel expense reporting app" },
]

const postBookingUseCases = [
  { icon: MailCheck, title: "A confirmation inbox that becomes an itinerary", description: "Forward bookings, review the extracted details, and keep flights, stays, cars, tickets, and activities in one trip." },
  { icon: CalendarClock, title: "A safety net for refundable bookings", description: "Record hotel, rental car, tour, and ticket cancellation cutoffs so flexible bookings do not quietly become expensive ones." },
  { icon: BriefcaseBusiness, title: "A cleaner closeout for business travel", description: "Keep receipts and costs with the trip, then export structured CSV records for reimbursement, client billing, or tax preparation." },
  { icon: FileCheck2, title: "Travel documents in the right context", description: "Keep tickets, boarding passes, confirmations, visas, and other files attached to the trip where you will look for them." },
]

const faqs = [
  { question: "Is TripCache free?", answer: "Yes. TripCache Basic includes manual trip entry, itinerary viewing, and core trip organization. TripCache Pro adds the automation and reporting tools listed on the pricing page." },
  { question: "What is included in TripCache Pro?", answer: "Pro adds email-to-trip automation, automatic flight updates, CSV expense exports, expanded document storage, calendar integration, trip sharing, and priority support. Subscriptions are activated and managed in the mobile app." },
  { question: "How does email forwarding work?", answer: "TripCache Pro gives you a unique forwarding address. Send a booking confirmation to that address and TripCache extracts the travel details into a draft. You review the draft before adding it to your itinerary." },
  { question: "What happened to TripCase?", answer: "The TripCase app and web experience were sunset on April 1, 2025. TripCache is one option for former TripCase users who want email-based itinerary organization, cancellation reminders, documents, and expense records." },
  { question: "Can I track free-cancellation deadlines?", answer: "Yes. You can save cancellation cutoffs for refundable hotels, rental cars, tours, tickets, and other bookings, then choose when TripCache should remind you before the deadline." },
  { question: "Can I export my travel data?", answer: "Yes. TripCache Pro includes CSV exports for travel history and expense records, useful for reimbursement, client billing, tax preparation, or personal recordkeeping." },
  { question: "Does TripCache work on iPhone and Android?", answer: "Yes. TripCache is available now from the Apple App Store and Google Play. The website links directly to both official listings." },
  { question: "What types of bookings can I organize?", answer: "TripCache is designed for flights, hotels, rental cars, transport, activities, tickets, restaurants, meetings, parking, notes, documents, and custom trip items. Unusual email formats can still be reviewed and corrected before saving." },
]

const searchSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "FAQPage", "@id": "https://trip-cache.com/#faq", mainEntity: [...answers, ...faqs].map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    { "@type": "ItemList", name: "TripCache travel organization guides", itemListElement: relatedGuides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: `https://trip-cache.com${guide.href}`, name: guide.title })) },
  ],
}

function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <div className={`journal-eyebrow ${inverse ? "journal-eyebrow-inverse" : ""}`}>{children}</div>
}

export function DesignOneHome() {
  return <main className="journal-paper min-h-screen overflow-hidden text-[#121212] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
    <section className="relative mx-auto grid min-h-screen max-w-[1380px] items-center gap-5 px-5 pb-12 pt-28 sm:px-8 sm:pt-28 min-[940px]:min-h-[100svh] min-[940px]:grid-cols-[minmax(0,1.02fr)_minmax(27rem,0.98fr)] min-[940px]:gap-10 min-[940px]:px-12 min-[940px]:pb-10 min-[940px]:pt-24">
      <div className="relative z-10 mx-auto max-w-[650px] py-3 text-center min-[940px]:mx-0 min-[940px]:py-8 min-[940px]:text-start">
        <Reveal className="design-one-hero-reveal"><Eyebrow><Plane className="h-3.5 w-3.5" /> Travel itinerary organizer app</Eyebrow></Reveal>
        <Reveal delay={70} className="design-one-critical-reveal design-one-hero-reveal"><h1 className="mt-6 design-one-display-home">Turn booking emails into one organized travel itinerary.</h1></Reveal>
        <Reveal delay={150} className="design-one-hero-reveal"><p className="mx-auto mt-6 max-w-[590px] text-base leading-7 tracking-[-0.01em] text-[#626262] sm:text-lg sm:leading-8 min-[940px]:mx-0">Forward flight, hotel, car, tour, and ticket confirmations to TripCache. Review your itinerary, track free-cancellation deadlines, and keep documents, receipts, and expenses together.</p></Reveal>
        <Reveal delay={220} className="design-one-hero-reveal mt-7 flex justify-center min-[940px]:justify-start"><DesignOneStoreButtons /></Reveal>
        <Reveal delay={280} className="design-one-hero-reveal mx-auto mt-5 grid max-w-[35rem] gap-x-7 gap-y-2.5 text-start text-[13px] font-medium text-[#666666] min-[520px]:grid-cols-2 min-[940px]:mx-0">{heroPoints.map((point) => <span key={point} className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 shrink-0 text-[#602ad2]" />{point}</span>)}</Reveal>
      </div>
      <DesignOneHeroCarousel stories={heroStories} />
    </section>

    <section className="px-5 pb-20 pt-2 sm:px-8 min-[940px]:pb-28"><div className="mx-auto max-w-[1240px]">
      <Reveal className="mb-8 flex items-end justify-between gap-8"><h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">One calm place for the details after booking.</h2><p className="hidden max-w-xs text-sm leading-6 text-[#746c61] min-[900px]:block">The whole post-booking journey, organized around what you need next.</p></Reveal>
      <div className="journal-story-scroller">{heroStories.map((story, index) => <Reveal key={story.title} delay={index * 70} className="journal-story-card"><div className="relative flex min-h-[355px] items-end overflow-hidden rounded-[26px] bg-[#e8dece] px-5 pt-7"><Image src={story.image} alt={story.alt} width={1250} height={2700} sizes="155px" className="mx-auto w-[155px] translate-y-12 drop-shadow-[0_24px_30px_rgba(42,20,82,0.2)]" /></div><div className="space-y-5 px-1 pt-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#602ad2]">{story.label}</p><h3 className="mt-2 text-xl font-semibold tracking-[-0.025em]">{story.title}</h3><p className="mt-2 text-sm leading-6 text-[#666666]">{story.description}</p></div><div className="rounded-2xl bg-white/54 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#858585]">{story.secondLabel}</p><p className="mt-1.5 text-sm font-bold">{story.secondTitle}</p><p className="mt-1 text-xs leading-5 text-[#666666]">{story.secondDescription}</p></div></div></Reveal>)}</div>
    </div></section>

    <section id="how-it-works" className="bg-[#121212] px-5 py-24 text-[#f7f2e9] sm:px-8 min-[940px]:py-32"><div className="mx-auto max-w-[1240px]">
      <Reveal className="grid gap-8 min-[900px]:grid-cols-[0.82fr_1.18fr] min-[900px]:items-end min-[900px]:gap-20"><div><Eyebrow inverse>How It Works</Eyebrow><h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">Turn booking confirmation emails into an itinerary.</h2></div><p className="max-w-2xl text-lg leading-8 text-[#b9b0a3] min-[900px]:justify-self-end">Three simple steps to transform messy confirmation emails into a master itinerary.</p></Reveal>
      <div className="mt-16 grid gap-5 min-[860px]:grid-cols-3">{steps.map((step, index) => { const Icon = step.icon; return <Reveal key={step.title} delay={index * 80} as="article" className="rounded-[28px] bg-white/[0.055] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-7"><div className="relative flex h-[310px] items-start justify-center overflow-hidden rounded-[22px] bg-[#2b175b] pt-7"><Image src={step.image} alt={step.title} width={1250} height={2700} sizes="164px" className="relative w-[164px] drop-shadow-[0_24px_32px_rgba(0,0,0,0.34)]" /></div><div className="mt-7 flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#602ad2] text-white"><Icon className="h-5 w-5" /></div><span className="font-mono text-xs text-white/60">0{index + 1}</span></div><h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">{step.title}</h3><p className="mt-3 leading-7 text-[#b2b2b2]">{step.description}</p></Reveal> })}</div>
    </div></section>

    <section id="features" className="px-5 py-24 sm:px-8 min-[940px]:py-36"><div className="mx-auto max-w-[1240px]">
      <Reveal className="mx-auto max-w-4xl text-center"><Eyebrow><Zap className="h-3.5 w-3.5" /> Everything You Need</Eyebrow><h2 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl">Everything you need in a travel organizer app.</h2><p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#666666]">Master every booking in your itinerary, from flights and stays to maps, expenses, cancellation deadlines, and travel documents.</p></Reveal>
      <div className="mt-16 grid gap-5 min-[680px]:grid-cols-2 min-[980px]:grid-cols-12">{features.map((feature, index) => { const Icon = feature.icon; return <Reveal key={feature.title} delay={(index % 3) * 70} as="article" className={`journal-feature-card ${feature.layout}`}><div className="relative flex h-[270px] items-start justify-center overflow-hidden rounded-[24px] bg-[#e7ddcd] pt-7">{feature.images.length === 2 ? <><Image src={feature.images[0]} alt={feature.imageAlts[0]} width={1250} height={2700} sizes="(min-width: 980px) 165px, (min-width: 680px) 135px, (min-width: 520px) 150px, 145px" className="journal-feature-phone journal-feature-phone-import" /><Image src={feature.images[1]} alt={feature.imageAlts[1]} width={1250} height={2700} sizes="(min-width: 980px) 165px, (min-width: 680px) 135px, (min-width: 520px) 150px, 145px" className="journal-feature-phone journal-feature-phone-draft" /></> : <Image src={feature.images[0]} alt={feature.imageAlts[0]} width={1250} height={2700} sizes="165px" className="w-[165px] drop-shadow-[0_22px_28px_rgba(68,50,32,0.2)]" />}</div><div className="px-1 pt-7"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#e8e0ff] text-[#602ad2]"><Icon className="h-4.5 w-4.5" /></div><h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">{feature.title}</h3><p className="mt-3 max-w-xl leading-7 text-[#666666]">{feature.description}</p></div></Reveal> })}</div>
      <Reveal className="mt-28 text-center"><Eyebrow>The Complete Picture</Eyebrow><h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">All Your Workflows in One Hub</h3></Reveal>
    </div><div className="journal-screen-rail mt-14" aria-label="TripCache app workflows">{mobileScreens.map(([src, alt], index) => <Reveal key={alt} delay={(index % 5) * 45} className="shrink-0"><Image src={src} alt={alt} width={1250} height={2700} sizes="(min-width: 640px) 205px, 168px" className={`h-auto w-[168px] drop-shadow-[0_26px_30px_rgba(64,48,31,0.2)] sm:w-[205px] ${index % 2 ? "translate-y-10" : ""}`} /></Reveal>)}</div></section>

    <section className="bg-[#eee7dc] px-5 py-24 sm:px-8 min-[940px]:py-36"><div className="mx-auto max-w-[1240px]">
      <Reveal className="mx-auto mb-20 max-w-3xl text-center min-[940px]:mb-32"><Eyebrow>Inside every trip</Eyebrow><h2 className="mt-6 text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl">Track deadlines, documents, flights, and expenses.</h2><p className="mt-6 text-lg leading-8 text-[#665f56]">Dive deeper into the trip details that usually get lost across inboxes, screenshots, and booking apps.</p><p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#665f56]">Explore each workflow as you scroll. Every detail stays attached to the trip where it belongs.</p></Reveal>
      <div className="space-y-24 min-[940px]:space-y-36">{showcases.map((item, index) => { const Icon = item.icon; return <article key={item.id} id={item.id} className="grid items-center gap-12 min-[860px]:grid-cols-2 min-[860px]:gap-16"><Reveal className={index % 2 ? "min-[860px]:order-2" : ""}><div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#602ad2]"><Icon className="h-4.5 w-4.5" />{item.subtitle}</div><h3 className="mt-6 text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl">{item.title}</h3><p className="mt-7 max-w-xl text-lg leading-8 text-[#666666]">{item.description}</p></Reveal><Reveal delay={110} className={`relative mx-auto flex min-h-[530px] w-full max-w-[560px] items-center justify-center rounded-[34px] bg-[#e3d6c3] px-8 ${index % 2 ? "min-[860px]:order-1" : ""}`}><div className="absolute inset-[12%] rounded-full border border-[#3f352a]/10" /><Image src={item.image} alt={item.title} width={1250} height={2700} sizes="(min-width: 640px) 285px, 240px" className="relative z-10 h-auto w-[240px] drop-shadow-[0_38px_42px_rgba(61,44,28,0.24)] sm:w-[285px]" /></Reveal></article> })}</div>
    </div></section>

    <section id="travel-organizer-guide" className="px-5 py-20 sm:px-8 min-[940px]:py-28"><script id="homepage-search-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema).replace(/</g, "\\u003c") }} /><div className="mx-auto max-w-[1240px]">
      <Reveal className="max-w-[960px]"><Eyebrow><Plane className="h-3.5 w-3.5" /> Travel Organizer Guide</Eyebrow><h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">Answers for the trip details travelers search for most</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-[#666666]">TripCache is built for the practical parts of travel planning: confirmations, cancellation windows, documents, maps, flight changes, and the records you need after the trip.</p></Reveal>
      <div className="mt-16 grid gap-5 min-[760px]:grid-cols-2">{answers.map((item, index) => { const Icon = item.icon; return <Reveal key={item.question} delay={(index % 2) * 70} as="article" className="rounded-[28px] bg-white/54 p-7 shadow-[0_1px_0_rgba(255,255,255,0.7),0_20px_55px_rgba(72,53,33,0.07)] sm:p-9"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e8e0ff] text-[#602ad2]"><Icon className="h-5 w-5" /></div><h3 className="mt-7 text-2xl font-semibold leading-snug tracking-[-0.03em]">{item.question}</h3><p className="mt-4 leading-7 text-[#666666]">{item.answer}</p></Reveal> })}</div>
      <div className="mt-20 grid gap-12 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:gap-20"><Reveal><h3 className="text-3xl font-semibold tracking-[-0.04em]">Who TripCache is useful for</h3><ul className="mt-7 space-y-5">{searchUseCases.map((useCase, index) => <li key={useCase} className="grid grid-cols-[2rem_1fr] gap-3 text-[#626262]"><span className="font-mono text-xs text-[#602ad2]">0{index + 1}</span><span className="leading-7">{useCase}</span></li>)}</ul></Reveal><Reveal delay={90} className="rounded-[30px] bg-[#121212] p-7 text-[#f7f2e9] sm:p-10"><div className="flex items-center gap-3"><MapPinned className="h-5 w-5 text-[#9673e7]" /><h3 className="text-2xl font-semibold tracking-[-0.035em]">Explore detailed travel workflows</h3></div><div className="mt-8 grid gap-3 min-[520px]:grid-cols-2">{relatedGuides.map((guide) => <Link key={guide.href} href={guide.href} prefetch={false} className="design-one-press group flex min-h-28 flex-col justify-between rounded-2xl bg-white/[0.065] p-5 text-sm font-semibold leading-6 transition-colors duration-150 hover:bg-white/[0.1]">{guide.title}<ArrowUpRight className="mt-4 h-4 w-4 text-[#9673e7] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>)}</div></Reveal></div>
    </div></section>

    <section className="bg-[#121212] px-5 py-24 text-[#f7f2e9] sm:px-8 min-[940px]:py-32"><div className="mx-auto max-w-[1240px]">
      <Reveal className="mx-auto max-w-4xl text-center"><h2 className="text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl">Built for the work that starts<span className="block">after you book.</span></h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#b9b0a3]">TripCache is not another destination-inspiration feed. It is a practical organizer for confirmed travel, deadlines, documents, and records.</p></Reveal>
      <div className="mx-auto mt-16 grid max-w-5xl gap-x-12 gap-y-14 min-[720px]:grid-cols-2">{postBookingUseCases.map((useCase, index) => { const Icon = useCase.icon; return <Reveal key={useCase.title} delay={(index % 2) * 70} as="article" className="grid grid-cols-[auto_1fr] gap-5"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#602ad2] text-white"><Icon className="h-5 w-5" /></div><div><h3 className="text-xl font-semibold tracking-[-0.025em]">{useCase.title}</h3><p className="mt-3 leading-7 text-[#b2b2b2]">{useCase.description}</p></div></Reveal> })}</div>
    </div></section>

    <section id="faq" className="journal-faq px-5 py-20 sm:px-8 min-[940px]:py-28"><div className="mx-auto max-w-[1080px]">
      <Reveal className="max-w-[820px]"><Eyebrow>FAQ</Eyebrow><h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Frequently asked questions</h2><p className="mt-5 text-lg leading-8 text-[#666666]">Straight answers about pricing, availability, email import, and the post-booking workflow.</p></Reveal>
      <div className="mt-14 space-y-3">{faqs.map((faq, index) => <Reveal key={faq.question} delay={(index % 3) * 45}><details open={index === 0} className="group rounded-[22px] bg-white/46 px-6 shadow-[0_1px_0_rgba(255,255,255,0.7),0_16px_44px_rgba(72,53,33,0.055)] sm:px-8"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold marker:content-none sm:text-xl"><span>{faq.question}</span><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e5dcff] text-xl font-normal text-[#602ad2] transition-transform duration-150 group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-7 leading-7 text-[#666666]">{faq.answer}</p></details></Reveal>)}</div>
      <Reveal className="mt-14 rounded-[30px] bg-[#602ad2] p-8 text-center text-white sm:p-12"><h3 className="text-2xl font-semibold">Still have questions?</h3><p className="mt-2 text-white/76">Contact the TripCache support team for setup or billing help.</p><DesignOneSupportLink className="design-one-press mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 font-semibold text-[#121212] shadow-[0_12px_28px_rgba(58,24,135,0.2)]">Contact support</DesignOneSupportLink></Reveal>
    </div></section>

    <Footer />
  </main>
}
