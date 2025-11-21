"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "/professional-woman-smiling.png",
    text: "TripCache has completely transformed how I manage my business travel. The email-to-trip feature is pure magic!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Digital Nomad",
    avatar: "/professional-man-smiling.png",
    text: "As a frequent traveler, having all my trips organized in one place is invaluable. The CSV export saves me hours every month.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "Travel Blogger",
    avatar: "/smiling-woman-glasses.png",
    text: "Finally, an app that makes travel management effortless. The document storage feature is a lifesaver at airports.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Consultant",
    avatar: "/asian-man-smiling.png",
    text: "The best travel app I've ever used. Clean interface, powerful features, and it just works. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Operations Lead",
    avatar: "/professional-woman-smiling.png",
    text: "Email-to-trip plus CSV exports keep finance and travel in sync—no more Sunday night expense marathons.",
    rating: 5,
  },
  {
    name: "Jason Lee",
    role: "Founder",
    avatar: "/professional-man-smiling.png",
    text: "We switched the team to TripCache and never looked back. The offline doc vault has already saved us twice.",
    rating: 5,
  },
  {
    name: "Olivia Martinez",
    role: "Travel Coordinator",
    avatar: "/smiling-woman-glasses.png",
    text: "Gate changes synced everywhere and shared trips keep our execs calm. The UI feels premium and fast.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-12 overflow-hidden scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <SectionContainer>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Loved by
            <span className="text-gradient-primary"> Travelers.</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users who trust TripCache for their journey.
          </p>
        </div>

        <div className="relative mask-gradient-x group">
          <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={i}
                className="group/card relative w-[340px] sm:w-[360px] shrink-0"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/25 via-primary/5 to-purple-500/20 opacity-0 blur-xl transition duration-500 group-hover/card:opacity-100" />
                <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-primary/30 transition-all duration-500 dark:bg-white/5 dark:border-white/10 dark:hover:border-primary/30">
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary/90 text-primary" />
                    ))}
                  </div>

                  <p className="relative mb-6 text-muted-foreground leading-relaxed">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/10 -z-10" />
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-primary/20">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 34s linear infinite;
          animation-play-state: running;
        }
        .mask-gradient-x:hover .animate-marquee,
        .animate-marquee:hover {
          animation-play-state: paused !important;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  )
}
