import Link from "next/link"
import Image from "next/image"
import { SectionContainer } from "./section-container"

export function Footer() {
  return (
    <footer className="relative bg-[#eee7dc] text-[#29251f] shadow-[inset_0_1px_0_rgba(66,50,32,0.08)]">
      <SectionContainer className="py-14 lg:py-18">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 min-[800px]:grid-cols-[minmax(16rem,1.4fr)_minmax(10rem,0.7fr)_minmax(10rem,0.7fr)] min-[800px]:gap-12">
          <div className="col-span-2 max-w-sm space-y-4 min-[800px]:col-span-1">
            <Link href="/" prefetch={false} className="design-one-press group flex items-center gap-3">
              <Image
                src="/icon.png"
                alt="TripCache"
                width={40}
                height={40}
                className="rounded-[11px] shadow-sm transition-transform duration-150 ease-out group-hover:scale-[1.04]"
              />
              <span className="text-lg font-bold">TripCache</span>
            </Link>
            <p className="text-pretty text-sm leading-6 text-[#71695f]">
              AI travel inbox for booking emails, cancellation deadlines, receipts, and trip documents.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/features/email-to-itinerary" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  Email Automation
                </Link>
              </li>
              <li>
                <Link href="/features/cancellation-reminders" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  Cancellation Reminders
                </Link>
              </li>
              <li>
                <Link href="/features/business-travel-expenses" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  Business Expenses
                </Link>
              </li>
              <li>
                <Link href="/tools/hotel-cancellation-deadline-calculator" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  Deadline Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
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
                <Link href="/alternatives/tripit" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  TripIt Alternative
                </Link>
              </li>
              <li>
                <Link href="/alternatives/tripcase" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  TripCase Alternative
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch={false} className="text-[#71695f] transition-colors duration-150 ease-out hover:text-[#a44833]">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

         </div>
         

        <div className="mt-12 border-t border-[#3f352a]/10 pt-8 text-center text-sm text-[#7c7469]">
          <p>© {new Date().getFullYear()} TripCache. All rights reserved.</p>
        </div>
      </SectionContainer>
    </footer>
  )
}
