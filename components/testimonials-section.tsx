"use client"
import { Star } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const testimonials = [
  {
    name: "Sarah Chen",
    username: "@sarahchen",
    avatar: "/professional-woman-smiling.png",
    text: "TripCache has completely transformed how I manage my business travel. The email-to-trip feature is pure magic!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    username: "@mrodriguez",
    avatar: "/professional-man-smiling.png",
    text: "As a frequent traveler, having all my trips organized in one place is invaluable. The CSV export saves me hours every month.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    username: "@emmathompson",
    avatar: "/smiling-woman-glasses.png",
    text: "Finally, an app that makes travel management effortless. The document storage feature is a lifesaver at airports.",
    rating: 5,
  },
  {
    name: "David Kim",
    username: "@davidkim",
    avatar: "/asian-man-smiling.png",
    text: "The best travel app I've ever used. Clean interface, powerful features, and it just works. Highly recommended!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const marqueeTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="relative py-2 lg:py-10 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-background/40 to-transparent" />
      <SectionContainer>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Real People.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Real Results.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">Thousands trust TripCache for their travel needs weekly.</p>
        </div>

        <div className="relative mx-auto max-w-6xl overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent" />

          <div className="testimonial-track flex w-max gap-6 py-2">
            {marqueeTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.username}-${index}`}
                className="w-[260px] sm:w-[320px] lg:w-[360px] shrink-0 rounded-2xl border border-border/60 bg-card/90 p-6 shadow-lg shadow-black/5 backdrop-blur hover:-translate-y-1 transition-transform"
              >
                <header className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.username}</p>
                  </div>
                </header>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">{testimonial.text}</p>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background" />

      <style jsx>{`
        @keyframes testimonial-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .testimonial-track {
          animation: testimonial-marquee 38s linear infinite;
        }
        .testimonial-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
