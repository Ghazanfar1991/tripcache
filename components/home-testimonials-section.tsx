"use client"

import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { SectionContainer } from "./section-container"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "/professional-woman-smiling.webp",
    text: "TripCache has completely transformed how I manage my business travel. The email-to-trip feature saves me hours every month.",
  },
  {
    name: "Michael Rodriguez",
    role: "Digital Nomad",
    avatar: "/professional-man-smiling.webp",
    text: "Having all my trips organized in one place is invaluable. The CSV export is especially useful when I need expense records fast.",
  },
  {
    name: "Emma Thompson",
    role: "Travel Blogger",
    avatar: "/smiling-woman-glasses.webp",
    text: "The document storage feature is a lifesaver at airports. I no longer jump between screenshots, email, and airline apps.",
  },
  {
    name: "David Kim",
    role: "Consultant",
    avatar: "/asian-man-smiling.webp",
    text: "The interface is clean, fast, and easy to trust on travel days. It feels designed for actual frequent flyers.",
  },
  {
    name: "Priya Patel",
    role: "Operations Lead",
    avatar: "/professional-woman-smiling.webp",
    text: "Email-to-trip plus exports keep finance and travel in sync. That removes a surprising amount of operational friction.",
  },
  {
    name: "Jason Lee",
    role: "Founder",
    avatar: "/professional-man-smiling.webp",
    text: "We moved away from scattered email workflows and immediately got a more reliable process for every trip.",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-12 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_24%)]" />

      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Customer feedback</div>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Trusted by travelers who need
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              clarity on the move.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Readable review cards make it easier to scan what different types of travelers value most about the app.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="surface-panel h-full p-6"
            >
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <div className="relative mt-5">
                <Quote className="absolute -top-1 left-0 h-7 w-7 text-foreground/10" />
                <p className="pl-9 text-base leading-relaxed text-foreground/85">{testimonial.text}</p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/70 dark:border-white/10">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
