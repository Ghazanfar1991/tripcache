import { Bell, CalendarClock, FileLock2, Grid2x2Plus, MapPinned, ReceiptText } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"
import {
  PHONE_SCREEN_IMAGE_HEIGHT,
  PHONE_SCREEN_IMAGE_WIDTH,
  PHONE_SCREEN_SIZES,
  PHONE_SCREEN_WIDTH,
} from "@/components/ui/phone-screen-size"

const showcases = [
  {
    id: "add-everything",
    icon: Grid2x2Plus,
    title: "Add More Than Flights",
    subtitle: "Complete Trip Building",
    description: "Build a real itinerary with flights, hotels, rental cars, transport, activities, tickets, restaurants, meetings, parking, documents, notes, and custom items.",
    image: "/app-feature-add-everything.webp",
    color: "from-amber-400 to-orange-500",
    bgAccent: "bg-orange-500/10",
  },
  {
    id: "cancellation-reminders",
    icon: CalendarClock,
    title: "Never Miss Free Cancellation",
    subtitle: "Booking Deadline Alerts",
    description: "Set cancellation deadlines for hotels, rental cars, tours, tickets, and other reservations. Choose reminders two days before, one day before, day of deadline, or a custom time.",
    image: "/app-feature-cancellation-reminder.webp",
    color: "from-cyan-400 to-blue-500",
    bgAccent: "bg-cyan-500/10",
  },
  {
    id: "secure-documents",
    icon: FileLock2,
    title: "Securely Save Your Documents",
    subtitle: "Travel Vault",
    description: "Keep passports, boarding passes, flight tickets, visas, confirmations, and travel documents in one protected place connected to your trips.",
    image: "/app-feature-secure-documents.webp",
    color: "from-purple-400 to-fuchsia-500",
    bgAccent: "bg-purple-500/10",
  },
  {
    id: "trip-map",
    icon: MapPinned,
    title: "Navigate the Trip Visually",
    subtitle: "Map View",
    description: "Use the trip map to understand where your stays, activities, and travel details sit in relation to each other before you arrive.",
    image: "/app-screen-trip-map.webp",
    color: "from-sky-400 to-cyan-500",
    bgAccent: "bg-sky-500/10",
  },
  {
    id: "expense-management",
    icon: ReceiptText,
    title: "Keep Expenses Under Control",
    subtitle: "Receipts and Costs",
    description: "Track travel spending, attach receipts, and keep expense context tied to the trip instead of scattered across email and notes.",
    image: "/app-screen-expense-management.webp",
    color: "from-emerald-400 to-teal-500",
    bgAccent: "bg-emerald-500/10",
  },
  {
    id: "live-updates",
    icon: Bell,
    title: "Real-time Flight Tracking",
    subtitle: "Stay Ahead of Schedule",
    description: "Get instant push notifications for gate changes, delays, and boarding times. TripCache monitors your flights so you do not have to refresh a page again.",
    image: "/app-screenshot-flight-detail.webp",
    color: "from-amber-400 to-orange-500",
    bgAccent: "bg-orange-500/10",
  },
]

export function FeatureShowcaseSection() {
  return (
    <section className="content-auto-section tripcache-section-backdrop relative overflow-hidden bg-background py-12 dark:bg-slate-950 sm:py-20">
      <div className="tripcache-section-routes" />

      <SectionContainer className="relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32 space-y-6">
          <h2
            className="text-4xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-5xl lg:text-6xl"
          >
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Peace of Mind.</span>
          </h2>
          <p
            className="text-xl leading-relaxed text-muted-foreground dark:text-slate-400"
          >
            Dive deeper into the trip details that usually get lost across inboxes, screenshots, and booking apps.
          </p>
        </div>

        <div className="space-y-32 lg:space-y-48">
          {showcases.map((item, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={item.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 relative`}
              >

                {/* Background Glow */}
                <div className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} -translate-y-1/2 w-[800px] h-[600px] ${item.bgAccent} blur-[120px] rounded-full pointer-events-none -z-10`} />

                {/* Text Content */}
                <div
                  className="flex-1 space-y-8"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2">
                      <item.icon className={`w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r ${item.color} [&>path]:stroke-[url(#gradient-${item.id})]`} />
                      <span className={`text-sm font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground dark:text-white lg:text-5xl">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xl leading-relaxed text-muted-foreground dark:text-slate-400">
                    {item.description}
                  </p>

                  <div className={`h-1 w-24 bg-gradient-to-r ${item.color} rounded-full`} />
                </div>

                {/* Image Showcase */}
                <div
                  className="relative flex-1 w-full perspective-1000"
                >
                  <div
                    className="relative z-20 mx-auto origin-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                    style={{ width: PHONE_SCREEN_WIDTH }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={PHONE_SCREEN_IMAGE_WIDTH}
                      height={PHONE_SCREEN_IMAGE_HEIGHT}
                      sizes={PHONE_SCREEN_SIZES}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </SectionContainer>

      {/* SVG Definitions for Icon Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {showcases.map(item => (
            <linearGradient key={`gradient-${item.id}`} id={`gradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              {item.color.includes('amber') ? (
                <>
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </>
              ) : item.color.includes('cyan') ? (
                <>
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#d946ef" />
                </>
              )}
            </linearGradient>
          ))}
        </defs>
      </svg>
    </section>
  )
}
