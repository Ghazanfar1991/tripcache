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
              The modern way to manage your flight itineraries and travel plans.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#features" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" prefetch={false} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  How It Works
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
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
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
