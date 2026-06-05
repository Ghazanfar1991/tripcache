import { Mail, Sparkles, Download } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"
import {
  PHONE_SCREEN_IMAGE_HEIGHT,
  PHONE_SCREEN_IMAGE_WIDTH,
  PHONE_SCREEN_SIZES,
  PHONE_SCREEN_WIDTH,
} from "@/components/ui/phone-screen-size"

const steps = [
  {
    icon: Mail,
    title: "Forward Your Bookings",
    description: "Simply forward any flight, hotel, or car rental confirmation to your TripCache email address.",
    image: "/app-screenshot-import.webp",
    gradient: "from-cyan-500 to-blue-600",
    glow: "bg-cyan-500/20",
    textGradient: "from-cyan-400 to-cyan-200"
  },
  {
    icon: Sparkles,
    title: "AI Works Its Magic",
    description: "Our intelligent parser instantly extracts every detail and builds a beautiful, interactive itinerary.",
    image: "/app-screenshot-drafts.webp",
    gradient: "from-purple-500 to-fuchsia-600",
    glow: "bg-purple-500/20",
    textGradient: "from-purple-400 to-fuchsia-200"
  },
  {
    icon: Download,
    title: "Ready When You Are",
    description: "Access everything offline, track live flight updates, and export expense reports with a tap.",
    image: "/app-screenshot-home.webp",
    gradient: "from-emerald-500 to-teal-600",
    glow: "bg-emerald-500/20",
    textGradient: "from-emerald-400 to-teal-200"
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="content-auto-section relative overflow-hidden bg-background py-6 dark:bg-slate-950 sm:py-12">
      {/* Background Decor */}
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-900/10" />
      <div className="pointer-events-none absolute bottom-[10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-900/10" />

      <SectionContainer className="relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            How It Works
          </div>
          <h2
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:text-white"
          >
            The Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Pipeline.</span>
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground dark:text-slate-400"
          >
            Three simple steps to transform messy confirmation emails into a master itinerary.
          </p>
        </div>

        {/* The Pipeline Steps */}
        <div className="relative max-w-5xl mx-auto">

          {/* Connecting Line (Desktop) */}
          <div className="absolute bottom-24 left-1/2 top-24 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-border/90 to-transparent dark:via-white/10 lg:block" />

          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={step.title} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 relative`}>

                  {/* Text Content */}
                  <div
                    className={`flex-1 text-center ${isEven ? 'lg:text-right' : 'lg:text-left'} space-y-6 lg:max-w-md z-10`}
                  >
                    <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-2xl shadow-black/50 mb-4`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground dark:text-slate-500">Step 0{index + 1}</h3>
                      <h4 className={`text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${step.textGradient}`}>
                        {step.title}
                      </h4>
                      <p className="text-lg leading-relaxed text-muted-foreground dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Node connecting marker (Desktop) */}
                  <div className="absolute left-1/2 top-1/2 z-20 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-background dark:border-white/20 dark:bg-slate-950 lg:block">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${step.gradient} blur-sm opacity-50`} />
                  </div>

                  {/* Image Presentation */}
                  <div
                    className="relative z-10 flex-1 w-full perspective-1000"
                  >
                    {/* Glow behind image */}
                    <div className={`absolute inset-0 ${step.glow} blur-[80px] rounded-full -z-10 bg-opacity-40`} />

                    <div
                      className="relative mx-auto origin-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                      style={{ width: PHONE_SCREEN_WIDTH }}
                    >
                      {/* Image direct rendering, no mock borders needed per user feedback */}
                      <Image
                        src={step.image}
                        alt={step.title}
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
        </div>

      </SectionContainer>
    </section>
  )
}
