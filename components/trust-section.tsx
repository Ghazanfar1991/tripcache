import { Shield, Zap, Users } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const trustFeatures = [
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your travel data is encrypted end-to-end. We never share your information with third parties. Your privacy is our priority.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instantly parse booking confirmations with our AI-powered system. Add trips in seconds, not minutes.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Join over 50,000 travelers who rely on TripCache to manage their itineraries and travel documents.",
  },
]

export function TrustSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <SectionContainer>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Why Thousands Trust{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              TripCache
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">See how TripCache makes travel management effortless</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="space-y-4 text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Phone Mockups Row */}
        <div className="flex justify-center gap-4 mt-16 overflow-hidden">
          {["/app-screenshot-home.webp", "/app-screenshot-trip-detail.webp", "/app-screenshot-history.webp"].map(
            (screenshot, index) => (
              <div key={index} className="relative w-48 flex-shrink-0">
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10" />
                  <div className="relative bg-black rounded-[1.5rem] overflow-hidden aspect-[9/19.5]">
                    <Image
                      src={screenshot || "/placeholder.svg"}
                      alt="TripCache App"
                      fill
                      className="object-cover object-top"
                      sizes="176px"
                      quality={55}
                    />
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </SectionContainer>
    </section>
  )
}
