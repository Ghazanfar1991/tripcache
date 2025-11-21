import { Mail, Sparkles, Download, FileText } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionContainer } from "./section-container"

const features = [
  {
    icon: Mail,
    title: "Easy Trip Import",
    description:
      "Forward booking confirmations to your unique email address. We'll automatically parse and organize everything.",
    link: "Learn More →",
  },
  {
    icon: Sparkles,
    title: "Smart Organization",
    description:
      "All your trips, flights, and documents organized beautifully in one place with intelligent categorization.",
    link: "Learn More →",
  },
  {
    icon: Download,
    title: "Instant CSV Export",
    description:
      "Generate detailed travel reports with a single tap. Perfect for expense tracking and business reporting.",
    link: "Learn More →",
  },
  {
    icon: FileText,
    title: "Document Storage",
    description:
      "Store passports, visas, and boarding passes securely. Access everything offline when you need it most.",
    link: "Learn More →",
  },
]

const galleryScreens = [
  { src: "/app-screenshot-home.jpg", alt: "TripCache Home" },
  { src: "/app-screenshot-trip-detail.jpg", alt: "TripCache Trip Detail" },
  { src: "/app-screenshot-history.jpg", alt: "TripCache Travel History" },
  { src: "/app-screenshot-flight-detail.jpg", alt: "TripCache Flight Detail" },
  { src: "/app-screenshot-documents.jpg", alt: "TripCache Documents" },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-2 lg:py-10 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background scroll-mt-24"
    >
      <SectionContainer>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Everything You Need.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Nothing You Don't.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Comprehensive trip management designed with simplicity and security in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4 text-center md:text-left">
              {/* Icon */}
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                <button className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline">
                  {feature.link}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Screens Row */}
        <div className="relative mt-16">
          <div className="absolute inset-x-0 -top-12 bottom-12 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10 blur-3xl -z-10" />
          <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 lg:pb-6">
            {galleryScreens.map((screen, index) => {
              const tilt = index % 2 === 0 ? "-rotate-3" : "rotate-3"
              return (
                <div
                  key={screen.alt}
                  className={`relative w-28 sm:w-32 lg:w-36 xl:w-40 ${tilt} transition-transform hover:rotate-0`}
                >
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-b-2xl z-10" />
                    <div className="relative bg-black rounded-[1.6rem] overflow-hidden aspect-[9/19.5]">
                      <Image src={screen.src} alt={screen.alt} fill className="object-cover object-top" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-8 shadow-lg"
          >
            Explore Full Features →
          </Button>
        </div>
      </SectionContainer>
    </section>
  )
}
