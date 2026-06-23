import Link from "next/link"
import Image from "next/image"
import { Twitter, Github, Linkedin } from "lucide-react"
import { SectionContainer } from "./section-container"

export function Footer() {
  return (
    <footer className="content-auto-section relative border-t border-border/50 glass dark:bg-background">
      <SectionContainer className="py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" prefetch={false} className="flex items-center gap-3 group">
              <Image
                src="/app-icon.webp"
                alt="TripCache"
                width={40}
                height={40}
                className="rounded-xl group-hover:scale-110 transition-transform"
              />
              <span className="text-lg font-bold">TripCache</span>
            </Link>
            <p className="text-sm text-muted-foreground text-pretty">
              AI travel inbox for booking emails, cancellation deadlines, receipts, and trip documents.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/features/email-to-itinerary" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Email Automation
                </Link>
              </li>
              <li>
                <Link href="/features/cancellation-reminders" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Cancellation Reminders
                </Link>
              </li>
              <li>
                <Link href="/features/business-travel-expenses" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Business Expenses
                </Link>
              </li>
              <li>
                <Link href="/tools/hotel-cancellation-deadline-calculator" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Deadline Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Compare</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/alternatives/tripit" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  TripIt Alternative
                </Link>
              </li>
              <li>
                <Link href="/alternatives/tripcase" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  TripCase Alternative
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

         </div>
         

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TripCache. All rights reserved.</p>
        </div>
      </SectionContainer>
    </footer>
  )
}
