import { BellRing, FileSpreadsheet, Hotel, Mail, MapPinned, Plane, ReceiptText, Shield, Zap } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const features = [
  {
    icon: Mail,
    title: "Email-to-Trip Magic",
    description: "Forward booking emails and TripCache turns confirmations into organized trip drafts.",
    images: ["/app-screenshot-import.webp", "/app-screenshot-drafts.webp"],
    imageAlts: ["TripCache email import screen for booking confirmations", "TripCache draft itinerary review screen"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    icon: Hotel,
    title: "Add Everything",
    description: "Keep flights, hotels, rental cars, transport, activities, tickets, restaurants, parking, notes, and custom items in one trip.",
    images: ["/app-feature-add-everything.webp"],
    imageAlts: ["TripCache screen for adding flights hotels rental cars tickets notes and custom trip items"],
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
  {
    icon: BellRing,
    title: "Cancellation Reminders",
    description: "Save free-cancellation deadlines and get reminded before hotels, cars, tours, or tickets become non-refundable.",
    images: ["/app-feature-cancellation-reminder.webp"],
    imageAlts: ["TripCache free cancellation reminder screen for refundable travel bookings"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Secure Document Vault",
    description: "Store passports, boarding passes, tickets, visas, and confirmations with PIN-protected access.",
    images: ["/app-feature-secure-documents.webp"],
    imageAlts: ["TripCache secure travel document vault for passports boarding passes tickets and visas"],
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    icon: Plane,
    title: "Live Trip Tracking",
    description: "Stay on top of every journey with flight status, live progress, and your travel details in one view.",
    images: ["/app-screenshot-flight-detail.webp"],
    imageAlts: ["TripCache live flight tracking screen with status and travel details"],
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
  },
  {
    icon: MapPinned,
    title: "Trip Map View",
    description: "Visualize your destination, stays, activities, and travel context on a map built for trip days.",
    images: ["/app-screen-trip-map.webp"],
    imageAlts: ["TripCache trip map screen showing destinations stays and activities"],
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    icon: ReceiptText,
    title: "Expense Management",
    description: "Track trip costs, save receipts, and keep cleaner records for reimbursement or personal budgets.",
    images: ["/app-screen-expense-management.webp"],
    imageAlts: ["TripCache expense management screen for receipts costs and travel budgets"],
    gradient: "from-indigo-500 via-purple-500 to-fuchsia-500",
  },
  {
    icon: FileSpreadsheet,
    title: "Smart Exports",
    description: "Generate detailed CSV reports for tax records, reimbursements, and travel reviews.",
    images: ["/app-screenshot-export.webp"],
    imageAlts: ["TripCache CSV export screen for travel expense reports"],
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
  },
]

const mobileScreens = [
  { src: "/app-screen-expense-management.webp", alt: "Expense management" },
  { src: "/app-feature-add-everything.webp", alt: "Add everything to trip" },
  { src: "/app-screenshot-export.webp", alt: "Export report" },
  { src: "/app-feature-secure-documents.webp", alt: "Secure documents hub" },
  { src: "/app-screenshot-trip-detail.webp", alt: "Trip overview" },
  { src: "/app-screenshot-home.webp", alt: "Dashboard" },
  { src: "/app-screenshot-flight-detail.webp", alt: "Flight detail" },
  { src: "/app-screenshot-history.webp", alt: "Travel history" },
  { src: "/app-screenshot-import.webp", alt: "Import preview" },
  { src: "/app-screen-trip-map.webp", alt: "Trip map" },
  { src: "/app-feature-cancellation-reminder.webp", alt: "Cancellation reminder" },
]


function PhoneStack() {
  return (
    <div className="relative mx-auto mt-24 hidden h-[400px] w-full max-w-5xl overflow-hidden md:block">
      <div className="absolute inset-x-0 bottom-[-50px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />

      {mobileScreens.map((screen, index) => {
        const centerIndex = Math.floor(mobileScreens.length / 2)
        const offsetIndex = index - centerIndex
        const x = offsetIndex * 110
        const rotate = offsetIndex * 6
        const y = Math.abs(offsetIndex) * 15
        const scale = 1 - Math.abs(offsetIndex) * 0.05
        const zIndex = 20 - Math.abs(offsetIndex)

        return (
          <div
            key={screen.alt}
            className="absolute left-1/2 top-10 origin-bottom"
            style={{
              transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
              zIndex,
            }}
          >
            <div className="relative w-[180px] shadow-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {/* Note: since screenshots are already framed, we just render them directly. No mock phone border needed. */}
              <Image
                src={screen.src || "/placeholder.svg"}
                alt={screen.alt}
                width={180}
                height={390}
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ width: "100%", height: "auto" }}
                priority={index === centerIndex}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="content-auto-section tripcache-section-backdrop relative overflow-hidden bg-background py-12 dark:bg-slate-950 sm:py-20">

      {/* Background decorations */}
      <div className="tripcache-section-routes" />

      <SectionContainer className="relative z-10">
        <div className="mb-20 text-center max-w-4xl mx-auto space-y-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary shadow-lg shadow-primary/5 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-cyan-400"
          >
            <Zap className="w-4 h-4" />
            <span>Everything You Need</span>
          </div>

          <h2
            className="mb-6 text-5xl font-extrabold tracking-tight text-foreground dark:text-white md:text-6xl"
          >
            Powerfully Simple.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Simply Powerful.</span>
          </h2>

          <p
            className="text-xl text-muted-foreground dark:text-slate-300"
          >
            Master every booking in your itinerary, from flights and stays to maps, expenses, cancellation deadlines, and secure documents.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card/60 backdrop-blur-xl transition-colors duration-500 hover:bg-card/80 dark:border-white/10 dark:bg-slate-900/50 dark:hover:bg-slate-800/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />

              {/* Composition container */}
              <div className="relative w-full h-56 mt-6 px-6 overflow-hidden flex justify-center items-end">
                {/* Glowing orb behind images */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r ${feature.gradient} blur-[60px] opacity-20 group-hover:opacity-60 transition-opacity duration-700`} />

                {feature.images.length === 2 ? (
                  <div className="relative w-full h-full flex justify-center items-start pt-6 perspective-1000">
                    <Image
                      src={feature.images[0]}
                      alt={feature.imageAlts[0]}
                      width={150}
                      height={325}
                      className="absolute left-2 top-4 rotate-[-4deg] origin-bottom drop-shadow-2xl transition-transform duration-700 group-hover:rotate-[-4deg] group-hover:-translate-y-4"
                    />
                    <Image
                      src={feature.images[1]}
                      alt={feature.imageAlts[1]}
                      width={150}
                      height={325}
                      className="absolute right-2 top-4 rotate-[4deg] origin-bottom drop-shadow-2xl transition-transform duration-700 group-hover:rotate-[4deg] group-hover:-translate-y-4 z-10"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex justify-center items-start pt-6">
                    <Image
                      src={feature.images[0]}
                      alt={feature.imageAlts[0]}
                      width={160}
                      height={346}
                      className="absolute top-4 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:-translate-y-6"
                    />
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="relative z-10 mt-auto bg-gradient-to-t from-background via-background/85 to-transparent p-8 pt-6 dark:from-slate-900 dark:via-slate-900/80">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border/70 bg-background/70 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-balance leading-relaxed text-muted-foreground dark:text-slate-400">
                  {feature.description}
                </p>

                {/* Hover indicator line */}
                <div className={`h-1 w-0 bg-gradient-to-r ${feature.gradient} rounded-full mt-6 transition-all duration-500 group-hover:w-full opacity-50`} />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Phones Spread */}
        <div className="mt-32 text-center hidden md:block">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-cyan-400"
          >
            The Complete Picture
          </div>
          <h3
            className="mb-4 text-3xl font-bold text-foreground dark:text-white"
          >
            All Your Workflows in One Hub
          </h3>
          <PhoneStack />
        </div>
      </SectionContainer>
    </section>
  )
}
