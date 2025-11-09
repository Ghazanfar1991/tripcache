"use client"
import { AppStoreButtons } from "@/components/app-store-buttons"
import { MailchimpForm } from "@/components/mailchimp-form"
import { SectionContainer } from "./section-container"

export function CTASection() {
  return (
    <section id="cta" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-background/40 to-transparent" />

      <SectionContainer className="relative z-10">
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-background/95 via-muted/30 to-background/95 p-10 sm:p-12 text-center shadow-xl">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-purple-500/15" />
          <div className="space-y-4 text-foreground">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Download TripCache & Take Control
              <br />
              of Your Travel
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Available on iOS & Android. Start organizing your trips for free. No credit card required.
            </p>
          </div>

          {/* QR Code */}
          <div className="inline-block p-6 bg-white rounded-2xl shadow-2xl">
            <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white" />
                <path
                  d="M0,0 h20 v20 h-20 z M25,0 h5 v5 h-5 z M35,0 h10 v5 h-10 z M50,0 h5 v10 h-5 z M60,0 h15 v5 h-15 z M80,0 h20 v20 h-20 z"
                  fill="black"
                />
                <path d="M5,5 h10 v10 h-10 z M85,5 h10 v10 h-10 z" fill="white" />
                <path
                  d="M0,25 h5 v10 h-5 z M10,25 h10 v5 h-10 z M25,25 h20 v10 h-20 z M50,25 h10 v5 h-10 z M65,25 h10 v10 h-10 z M80,25 h5 v5 h-5 z M90,25 h10 v10 h-10 z"
                  fill="black"
                />
                <path
                  d="M0,40 h10 v5 h-10 z M15,40 h15 v10 h-15 z M35,40 h10 v5 h-10 z M50,40 h5 v10 h-5 z M60,40 h15 v5 h-15 z M80,40 h10 v10 h-10 z M95,40 h5 v5 h-5 z"
                  fill="black"
                />
                <path
                  d="M0,50 h5 v10 h-5 z M10,50 h10 v5 h-10 z M25,50 h10 v10 h-10 z M40,50 h15 v5 h-15 z M60,50 h5 v10 h-5 z M70,50 h15 v5 h-15 z M90,50 h10 v10 h-10 z"
                  fill="black"
                />
                <path
                  d="M0,65 h15 v10 h-15 z M20,65 h10 v5 h-10 z M35,65 h20 v10 h-20 z M60,65 h10 v5 h-10 z M75,65 h10 v10 h-10 z M90,65 h10 v5 h-10 z"
                  fill="black"
                />
                <path
                  d="M0,80 h20 v20 h-20 z M25,80 h10 v5 h-10 z M40,80 h15 v10 h-15 z M60,80 h5 v5 h-5 z M70,80 h10 v10 h-10 z M85,80 h15 v5 h-15 z"
                  fill="black"
                />
                <path d="M5,85 h10 v10 h-10 z" fill="white" />
              </svg>
            </div>
          </div>

          <AppStoreButtons />

          <div className="pt-6">
            <MailchimpForm />
          </div>
        </div>
      </SectionContainer>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  )
}
