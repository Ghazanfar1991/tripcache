import { Mail, Plane, FileSpreadsheet, Cloud, Zap, Shield, Sparkles, Download, FileText } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const featurePoints = [
  {
    icon: Mail,
    title: "Email-to-Trip Magic",
    description: "Forward any booking email and TripCache builds a complete itinerary automatically.",
  },
  {
    icon: Plane,
    title: "Unified Timeline",
    description: "Flights, hotels, documents, and reminders stay together in a gorgeous trip timeline.",
  },
  {
    icon: FileSpreadsheet,
    title: "Instant CSV Reports",
    description: "Export tax-ready or expense-ready travel history with airline, cost, and purpose in one click.",
  },
  {
    icon: Cloud,
    title: "Secure Document Vault",
    description: "Passports, visas, receipts, and boarding passes stay encrypted and available offline.",
  },
  {
    icon: Zap,
    title: "Live Sync & Alerts",
    description: "Gate changes, cancellations, and shared trips update across devices in real time.",
  },
  {
    icon: Shield,
    title: "Enterprise Privacy",
    description: "SOC2-ready controls, strict permissions, and audit trails keep travel data protected.",
  },
  {
    icon: Sparkles,
    title: "Smart Organization",
    description: "Tag trips by client, traveler, or purpose and surface them instantly with search.",
  },
  {
    icon: Download,
    title: "Works Everywhere",
    description: "Access itineraries on web or mobile—even when you’re offline mid-flight.",
  },
  {
    icon: FileText,
    title: "Collaborative Sharing",
    description: "Share specific trips with teammates or family with optional SMS/email updates.",
  },
]

const mobileScreens = [
  { src: "/app-screenshot-import.webp", alt: "Import preview" },
  { src: "/app-screenshot-trip-detail.webp", alt: "Trip overview" },
  { src: "/app-screenshot-flight-detail.webp", alt: "Flight detail" },
  { src: "/app-screenshot-home.webp", alt: "Dashboard" },
  { src: "/app-screenshot-documents.webp", alt: "Documents hub" },
  { src: "/app-screenshot-history.webp", alt: "Travel history" },
  { src: "/app-screenshot-export.webp", alt: "Export report" },
]

const phoneLayout = [
  { offset: -240, scale: 0.74, rotation: -10, translateY: 26, zIndex: 8 },
  { offset: -160, scale: 0.88, rotation: -6, translateY: 18, zIndex: 14 },
  { offset: -95, scale: 1.02, rotation: -3, translateY: 10, zIndex: 22 },
  { offset: 0, scale: 1.2, rotation: 0, translateY: 0, zIndex: 40 },
  { offset: 95, scale: 1.02, rotation: 3, translateY: 10, zIndex: 22 },
  { offset: 160, scale: 0.88, rotation: 6, translateY: 18, zIndex: 14 },
  { offset: 240, scale: 0.74, rotation: 10, translateY: 26, zIndex: 8 },
]

function PhoneStack() {
  return (
    <div className="relative mx-auto mt-16 h-[340px] w-full max-w-5xl">
      <div className="absolute inset-x-6 bottom-8 h-24 rounded-[55%] bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-amber-400/15 blur-3xl" />
      {mobileScreens.map((screen, index) => {
        const layout = phoneLayout[index] || phoneLayout[phoneLayout.length - 1]
        return (
          <div
            key={`${screen.alt}-${index}`}
            className="absolute left-1/2 top-1/2 transition-transform duration-500"
            style={{
              transform: `translate(-50%, -50%) translateX(${layout.offset}px) translateY(${layout.translateY}px) rotate(${layout.rotation}deg) scale(${layout.scale})`,
              zIndex: layout.zIndex,
            }}
          >
            <div className="relative w-[150px] sm:w-[180px] lg:w-[200px]">
              <div className="absolute inset-0 -z-10 rounded-[2.4rem] bg-gradient-to-br from-white/35 to-white/10 blur-2xl" />
              <div className="relative rounded-[2.2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-2 shadow-[0_24px_50px_rgba(15,23,42,0.35)] ring-1 ring-white/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-16 rounded-b-3xl bg-black/80" />
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.9rem]">
                  <Image
                    src={screen.src || "/placeholder.svg"}
                    alt={screen.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ProductHighlightsSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-[#cfe2ff] via-[#e3f0ff] to-background py-20 lg:py-28 dark:from-slate-900 dark:via-slate-900/80 dark:to-background"
    >
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#cfe2ff] via-transparent to-transparent dark:from-slate-900" />
      <div className="pointer-events-none absolute inset-0 before:absolute before:inset-x-0 before:top-12 before:h-72 before:bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.14),_transparent)] dark:before:bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),_transparent)]" />
      <SectionContainer className="relative z-10 space-y-20 lg:space-y-24">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
            Product Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Everything You Need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">Own Every Trip</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TripCache combines automation, compliance-ready reporting, and polished design so every traveler stays organized—whether
            you’re managing one itinerary or an entire team.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          <div className="hidden grid-cols-3 gap-4 lg:grid">
            {featurePoints.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/70 px-5 py-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 text-white shadow-md shadow-cyan-500/30">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:hidden">
            {featurePoints.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/70 px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 text-white shadow-md">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PhoneStack />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background pointer-events-none dark:from-transparent dark:to-slate-950" />
      </SectionContainer>
    </section>
  )
}
