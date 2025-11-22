"use client"

import { motion } from "framer-motion"
import { Mail, FileSpreadsheet, Plane, Zap, Shield, Cloud } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const features = [
  {
    icon: Mail,
    title: "Email-to-Trip Magic",
    description: "Forward emails, get trips. Our AI parses flight details instantly.",
    image: "/app-screenshot-import.webp",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
  },
  {
    icon: Plane,
    title: "Visual Timeline",
    description: "Your entire journey in one stunning, interactive timeline.",
    image: "/app-screenshot-trip-detail.webp",
    gradient: "from-purple-500 via-pink-500 to-red-500",
  },
  {
    icon: FileSpreadsheet,
    title: "Smart Exports",
    description: "Generate detailed CSV reports for expenses and tax purposes.",
    image: "/app-screenshot-export.webp",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    icon: Cloud,
    title: "Document Hub",
    description: "Secure offline access to all your travel documents.",
    image: "/app-screenshot-documents.webp",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Instant Sync",
    description: "Real-time updates across all your devices, always in sync.",
    image: "/app-screenshot-flight-detail.webp",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Travel Analytics",
    description: "Track your journey with beautiful visualizations and insights.",
    image: "/app-screenshot-history.webp",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
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
    <div className="relative mx-auto mt-16 h-[340px] w-full max-w-5xl pb-15">
      <div className="absolute inset-x-6  bottom-8 h-24 rounded-[55%] bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-amber-400/15 blur-3xl" />
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

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-12 pb-24 lg:pb-28 overflow-hidden scroll-mt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <SectionContainer className="relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <Zap className="w-4 h-4" />
            <span>Everything You Need</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Powerfully Simple.
            <br />
            <span className="text-gradient-primary">Simply Powerful.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to manage your travels, beautifully designed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 dark:border-white/5 dark:bg-white/5 dark:hover:border-primary/20">
                {/* Image container with consistent aspect ratio and top accent frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 ring-1 ring-white/5">
                  <div
                    className={`pointer-events-none absolute -inset-[1px] rounded-[1.2rem] bg-gradient-to-br ${feature.gradient} opacity-15 blur-xl transition-opacity duration-500 group-hover:opacity-35`}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 mix-blend-screen" />
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed dark:text-gray-400">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center md:mt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
            App Screens
          </div>
          <p className="mt-4 pb-10 text-sm text-muted-foreground">
            See TripCache’s core workflows stacked together—import, organize, and share in one place.
          </p>
        </div>
        <PhoneStack />
      </SectionContainer>
    </section>
  )
}
