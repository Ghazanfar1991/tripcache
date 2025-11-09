import Image from "next/image"
import { Plane, FileText, History } from "lucide-react"

const showcaseFeatures = [
  {
    title: "Trip Dashboard",
    description: "View your upcoming flights with beautiful city backgrounds and instant access to all trip details.",
    screenshot: "/app-screenshot-home.jpg",
    icon: Plane,
  },
  {
    title: "Travel History",
    description: "Browse all your past trips with smart filtering by business or personal travel.",
    screenshot: "/app-screenshot-history.jpg",
    icon: History,
  },
  {
    title: "Flight Details",
    description: "See complete flight information with airline branding, times, and passenger details.",
    screenshot: "/app-screenshot-flight-detail.jpg",
    icon: Plane,
  },
  {
    title: "Documents Manager",
    description: "Store and organize passports, visas, and boarding passes in one secure place.",
    screenshot: "/app-screenshot-documents.jpg",
    icon: FileText,
  },
]

export function AppShowcaseSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
            <Plane className="h-4 w-4 text-cyan-400" />
            <span>Beautiful Interface</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Designed for
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              modern travelers
            </span>
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Every screen is crafted with attention to detail, making travel management a delightful experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {showcaseFeatures.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="space-y-6">
                {/* Screenshot */}
                <div className="relative mx-auto w-64 h-[520px] rounded-[3rem] overflow-hidden border-8 border-gray-900 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={feature.screenshot || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover object-top"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed max-w-md mx-auto">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
