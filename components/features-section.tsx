"use client"

import { BellRing, FileSpreadsheet, Hotel, Mail, Plane, Shield, Zap } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SectionContainer } from "./section-container"

const features = [
  {
    icon: Mail,
    title: "Email-to-Trip Magic",
    description: "Forward booking emails and TripCache turns confirmations into organized trip drafts.",
    images: ["/app-screenshot-import.webp", "/app-screenshot-drafts.webp"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    icon: Hotel,
    title: "Add Everything",
    description: "Keep flights, hotels, rental cars, transport, activities, tickets, restaurants, parking, notes, and custom items in one trip.",
    images: ["/app-feature-add-everything.png"],
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
  {
    icon: BellRing,
    title: "Cancellation Reminders",
    description: "Save free-cancellation deadlines and get reminded before hotels, cars, tours, or tickets become non-refundable.",
    images: ["/app-feature-cancellation-reminder.png"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Secure Document Vault",
    description: "Store passports, boarding passes, tickets, visas, and confirmations with PIN-protected access.",
    images: ["/app-feature-secure-documents.png"],
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    icon: Plane,
    title: "Live Trip Tracking",
    description: "Stay on top of every journey with flight status, live progress, and your travel details in one view.",
    images: ["/app-screenshot-flight-detail.webp"],
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
  },
  {
    icon: FileSpreadsheet,
    title: "Smart Exports",
    description: "Generate detailed CSV reports for expenses, tax records, reimbursements, and travel reviews.",
    images: ["/app-screenshot-export.webp"],
    gradient: "from-indigo-500 via-purple-500 to-fuchsia-500",
  },
]

const mobileScreens = [
  { src: "/app-screenshot-import.webp", alt: "Import preview" },
  { src: "/app-screenshot-trip-detail.webp", alt: "Trip overview" },
  { src: "/app-feature-add-everything.png", alt: "Add everything to trip" },
  { src: "/app-feature-cancellation-reminder.png", alt: "Cancellation reminder" },
  { src: "/app-screenshot-flight-detail.webp", alt: "Flight detail" },
  { src: "/app-screenshot-home.webp", alt: "Dashboard" },
  { src: "/app-feature-secure-documents.png", alt: "Secure documents hub" },
  { src: "/app-screenshot-history.webp", alt: "Travel history" },
  { src: "/app-screenshot-export.webp", alt: "Export report" },
]

function PhoneStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // We map the scroll progress to the fanning out of the phones.
  // 0 -> completely stacked, 0.5 -> fully fanned out, 1 -> stacked again.
  const fanOutProgress = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])

  return (
    <div ref={containerRef} className="relative mx-auto mt-24 h-[400px] w-full max-w-5xl overflow-hidden hidden md:block">
      <div className="absolute inset-x-0 bottom-[-50px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
      
      {mobileScreens.map((screen, index) => {
        // Calculate offsets based on index
        const centerIndex = Math.floor(mobileScreens.length / 2)
        const offsetIndex = index - centerIndex
        
        // Final fan out values
        const finalX = offsetIndex * 110 // pixels to separate
        const finalRotate = offsetIndex * 6 // degrees to rotate
        const finalY = Math.abs(offsetIndex) * 15 // pixels down to create an arc
        
        // Transform based on scroll
        const x = useTransform(fanOutProgress, [0, 1], [0, finalX])
        const rotate = useTransform(fanOutProgress, [0, 1], [0, finalRotate])
        const y = useTransform(fanOutProgress, [0, 1], [0, finalY])
        const scale = useTransform(fanOutProgress, [0, 1], [1, 1 - Math.abs(offsetIndex) * 0.05])
        
        // Z-index calculation (center is highest)
        const zIndex = 20 - Math.abs(offsetIndex)

        return (
          <motion.div
            key={screen.alt}
            className="absolute left-1/2 top-10 origin-bottom"
            style={{ 
              x, 
              y, 
              rotate, 
              scale,
              zIndex,
              translateX: "-50%" 
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
                priority={index === centerIndex}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden bg-background py-12 dark:bg-slate-950 sm:py-20">
      
      {/* Background decorations */}
      <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-gradient-to-b from-cyan-500/10 to-transparent blur-[120px] dark:from-cyan-900/10" />

      <SectionContainer className="relative z-10">
        <div className="mb-20 text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary shadow-lg shadow-primary/5 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-cyan-400"
          >
            <Zap className="w-4 h-4" />
            <span>Everything You Need</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-5xl font-extrabold tracking-tight text-foreground dark:text-white md:text-6xl"
          >
            Powerfully Simple.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Simply Powerful.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground dark:text-slate-300"
          >
            Master every booking in your itinerary, from flights and stays to cancellation deadlines and secure documents.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
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
                      alt="Screenshot"
                      width={150}
                      height={325}
                      className="absolute left-2 top-4 rotate-[-4deg] origin-bottom drop-shadow-2xl transition-transform duration-700 group-hover:rotate-[-4deg] group-hover:-translate-y-4"
                    />
                    <Image
                      src={feature.images[1]}
                      alt="Screenshot"
                      width={150}
                      height={325}
                      className="absolute right-2 top-4 rotate-[4deg] origin-bottom drop-shadow-2xl transition-transform duration-700 group-hover:rotate-[4deg] group-hover:-translate-y-4 z-10"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex justify-center items-start pt-6">
                    <Image
                      src={feature.images[0]}
                      alt="Screenshot"
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
            </motion.div>
          ))}
        </div>

        {/* Dynamic Phones Spread */}
        <div className="mt-32 text-center hidden md:block">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-cyan-400"
          >
            The Complete Picture
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-foreground dark:text-white"
          >
            All Your Workflows in One Hub
          </motion.h3>
          <PhoneStack />
        </div>
      </SectionContainer>
    </section>
  )
}
