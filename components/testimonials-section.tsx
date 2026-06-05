import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { SectionContainer } from "./section-container"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "/professional-woman-smiling.webp",
    text: "TripCache has completely transformed how I manage my business travel. The email-to-trip feature is pure magic, saving me hours every month.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Digital Nomad",
    avatar: "/professional-man-smiling.webp",
    text: "As a frequent traveler, having all my trips organized in one place is invaluable. The CSV export is perfect for my expense tracking.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "Travel Blogger",
    avatar: "/smiling-woman-glasses.webp",
    text: "Finally, an app that makes travel management effortless. The document storage feature is an absolute lifesaver at busy airports.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Consultant",
    avatar: "/asian-man-smiling.webp",
    text: "The best travel app I've ever used. Clean dark mode interface, powerful features, and it just works seamlessly across devices.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Operations Lead",
    avatar: "/professional-woman-smiling.webp",
    text: "Email-to-trip plus CSV exports keep finance and travel in sync—no more Sunday night expense marathons.",
    rating: 5,
  },
  {
    name: "Jason Lee",
    role: "Founder",
    avatar: "/professional-man-smiling.webp",
    text: "We switched the entire team to TripCache and never looked back. The offline document vault has already saved us twice when traveling abroad.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="content-auto-section relative overflow-hidden bg-background py-12 dark:bg-slate-950 lg:py-16">
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-gradient-to-l from-indigo-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[400px] bg-gradient-to-tr from-cyan-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(2,6,23,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(2,6,23,0.04)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      </div>

      <SectionContainer className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-indigo-500 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-indigo-400"
          >
            Social Proof
          </div>
          <h2
            className="text-4xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-5xl lg:text-6xl"
          >
            Loved by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"> Travelers.</span>
          </h2>
          <p
            className="text-lg leading-relaxed text-muted-foreground dark:text-slate-400"
          >
            Join thousands of users who trust TripCache for their journey.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden mask-gradient-x py-10">
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {/* Render 3 sets of testimonials to ensure flawless infinite scrolling */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={`testimonial-${i}`}
                className="group relative w-[320px] sm:w-[380px] shrink-0"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/20 group-hover:via-indigo-500/20 group-hover:to-purple-500/20 blur-xl transition-opacity duration-500 rounded-3xl -z-10" />
                
                <div className="relative flex h-full flex-col whitespace-normal rounded-3xl border border-border/70 bg-card/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-white/20">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent dark:via-white/20" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    ))}
                  </div>

                  <p className="relative mb-8 flex-1 leading-relaxed text-muted-foreground dark:text-slate-300">
                    <Quote className="absolute -top-3 -left-3 -z-10 h-8 w-8 rotate-180 text-foreground/10 dark:text-white/5" />
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-border/70 shadow-lg dark:border-white/10">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground dark:text-white">{testimonial.name}</p>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-indigo-500 dark:text-indigo-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
