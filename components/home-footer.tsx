import Link from "next/link"
import Image from "next/image"
import { SectionContainer } from "./section-container"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 dark:border-white/10">
      <SectionContainer className="py-14 lg:py-20">
        <div className="surface-panel mb-12 overflow-hidden p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Download TripCache</div>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl">
                Keep every itinerary in one premium mobile workspace.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Download the app and keep bookings, flight updates, travel documents, and expense exports together in one clear workflow.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="https://apps.apple.com/app/id6758403056" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/app-store-v3.svg"
                  alt="Download on the App Store"
                  width={200}
                  height={60}
                  className="h-auto w-[190px]"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=app.tripcache" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/play-store-v3.svg"
                  alt="Get it on Google Play"
                  width={200}
                  height={60}
                  className="h-auto w-[190px]"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.8fr))]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/app-icon.webp" alt="TripCache" width={40} height={40} className="rounded-2xl" />
              <div>
                <div className="text-lg font-bold text-foreground">TripCache</div>
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Trip manager</div>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              TripCache helps travelers organize bookings, track flights, store documents, and export expenses from one clean mobile app.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">Product</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/#how-it-works" className="block text-muted-foreground transition hover:text-foreground">
                How it works
              </Link>
              <Link href="/#features" className="block text-muted-foreground transition hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="block text-muted-foreground transition hover:text-foreground">
                Pricing
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">Resources</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/blog" className="block text-muted-foreground transition hover:text-foreground">
                Blog
              </Link>
              <Link href="/privacy" className="block text-muted-foreground transition hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="block text-muted-foreground transition hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">Support</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/about" className="block text-muted-foreground transition hover:text-foreground">
                About
              </Link>
              <a href="mailto:support@trip-cache.com" className="block text-muted-foreground transition hover:text-foreground">
                Contact
              </a>
              <Link href="/account-delete" className="block text-muted-foreground transition hover:text-foreground">
                Account Delete
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/70 pt-6 text-sm text-muted-foreground dark:border-white/10">
          © {new Date().getFullYear()} TripCache. All rights reserved.
        </div>
      </SectionContainer>
    </footer>
  )
}
