import { Mail, FileSpreadsheet, Plane, Zap, Shield, Cloud } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const features = [
  {
    icon: Mail,
    title: "Email-to-Trip Magic",
    description:
      "Simply forward your booking confirmations to your unique TripCache email address. Our intelligent system automatically parses flight details, hotel reservations, and creates organized trips instantly. No manual entry required.",
    gradient: "from-cyan-400 to-blue-500",
    screenshot: "/app-screenshot-import.jpg",
    previewTitle: "Inbox Import Preview",
  },
  {
    icon: Plane,
    title: "Beautiful Trip Timeline",
    description:
      "Experience your travel itinerary like never before. View all flights in a stunning visual timeline with airline logos, departure and arrival times, airport codes, and quick access to all your travel documents in one place.",
    gradient: "from-blue-500 to-purple-500",
    screenshot: "/app-screenshot-trip-detail.jpg",
    previewTitle: "Trip Timeline Preview",
  },
  {
    icon: FileSpreadsheet,
    title: "CSV Travel Reports",
    description:
      "Generate comprehensive travel history reports with a single tap. Export detailed CSV files with flight numbers, dates, destinations, and costs. Perfect for expense tracking, tax purposes, and business reporting.",
    gradient: "from-purple-500 to-cyan-500",
    screenshot: "/app-screenshot-export.jpg",
    previewTitle: "CSV Export Preview",
  },
  {
    icon: Cloud,
    title: "Travel Documents Hub",
    description:
      "Store all your travel documents securely in one place. Passports, visas, boarding passes, and tickets are organized by trip and accessible offline. Never scramble for documents at the airport again.",
    gradient: "from-cyan-500 to-blue-600",
    screenshot: "/app-screenshot-documents.jpg",
    previewTitle: "Documents Hub Preview",
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "Built with cutting-edge technology for instant loading and smooth interactions. Your travel data syncs in real-time across all devices, ensuring you always have the latest information at your fingertips.",
    gradient: "from-blue-400 to-purple-500",
    screenshot: "/app-screenshot-flight-detail.jpg",
    previewTitle: "Flight Detail Preview",
  },
  {
    icon: Shield,
    title: "Travel History & Analytics",
    description:
      "Track your entire travel journey with beautiful visualizations. See your total trips, business vs personal travel, and filter by date ranges. Your complete travel story in one elegant interface.",
    gradient: "from-purple-500 to-cyan-400",
    screenshot: "/app-screenshot-history.jpg",
    previewTitle: "Travel Analytics Preview",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-2 lg:py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <SectionContainer className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Everything you need to
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              manage your travels
            </span>
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            TripCache combines powerful automation with beautiful design to make travel management effortless.
          </p>
        </div>

        {/* Features Grid - Alternating Layout */}
        <div className="space-y-14 lg:space-y-18">
          {features.map((feature, index) => {
            const isReversed = index % 2 === 1
            return (
              <div key={feature.title} className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                {/* Content Side */}
                <div
                  className={`space-y-6 lg:space-y-7 max-w-2xl ${isReversed ? "lg:order-2 lg:ml-auto" : "lg:mr-auto"}`}
                >
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-3xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl lg:text-4xl font-bold text-balance">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>

                  {/* Decorative gradient line */}
                  <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                </div>

                {/* Phone Mockup Side */}
                <div
                  className={`relative flex justify-center lg:justify-end ${
                    isReversed ? "lg:order-1 lg:justify-start" : ""
                  }`}
                >
                  <div
                    className={`absolute -inset-10 bg-gradient-to-br ${feature.gradient} opacity-25 blur-3xl rounded-full pointer-events-none`}
                    aria-hidden="true"
                  />

                  <div className="relative flex w-full max-w-[190px] sm:max-w-[210px] lg:max-w-[230px] flex-col items-center gap-4 lg:gap-5">
                    {/* Phone mockup container */}
                    <div className="relative w-full">
                      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.75rem] p-3 shadow-2xl ring-1 ring-white/10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-3xl z-10" />
                        <div className="relative bg-black rounded-[2.25rem] overflow-hidden aspect-[9/19.5]">
                          <Image
                            src={feature.screenshot || "/placeholder.svg"}
                            alt={feature.title}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      </div>

                      {/* Phone buttons */}
                      <div className="absolute -right-1 top-20 w-1 h-11 bg-gray-700 rounded-l" />
                      <div className="absolute -right-1 top-36 w-1 h-14 bg-gray-700 rounded-l" />
                      <div className="absolute -left-1 top-28 w-1 h-8 bg-gray-700 rounded-r" />
                    </div>

                    {/* Preview Label */}
                    <p
                      className="text-sm font-medium text-muted-foreground text-center"
                    >
                      {feature.previewTitle}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}
