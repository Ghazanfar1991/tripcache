import { BellRing, Briefcase, CalendarPlus, Coins, FileUp, History, LockKeyhole, Plane, Share2, Smartphone, type LucideIcon } from "lucide-react"

type Reason = { icon: LucideIcon; color: string; lead: string; text: string }

/** Free on every plan (seo/research/app-feature-inventory.md). */
const INCLUDED: Reason[] = [
  { icon: History, color: "#686d72", lead: "Travel history.", text: "Every past trip, sorted into personal and business." },
  { icon: LockKeyhole, color: "#612bd3", lead: "Document PIN.", text: "Sensitive travel files behind a PIN, with Face ID or fingerprint unlock." },
  { icon: BellRing, color: "#b54708", lead: "Check-in reminders.", text: "A heads-up 48 hours before a flight and an alert at 24." },
  { icon: FileUp, color: "#067647", lead: "Bulk import.", text: "Bring past flights in from a CSV file." },
  { icon: Coins, color: "#b54708", lead: "Your currency.", text: "Expenses in 153 currencies, with budgets in the one you think in." },
  { icon: Briefcase, color: "#4f46e5", lead: "Work or personal.", text: "Tag trips so business travel stays separate." },
  { icon: CalendarPlus, color: "#c12570", lead: "Add to calendar.", text: "Put a flight, with both time zones, or a whole trip in your phone's calendar." },
  { icon: Share2, color: "#4f46e5", lead: "Trip cards.", text: "Share a trip or flight as an image with the people traveling with you." },
]

const PRO: Reason[] = [
  { icon: Plane, color: "#4f46e5", lead: "Live flight alerts.", text: "Delays and gate, terminal and baggage-belt changes on supported flights." },
  { icon: Smartphone, color: "#c12570", lead: "Live Activity and widgets.", text: "Flight progress on the lock screen, Dynamic Island and home screen." },
]

function Item({ reason }: { reason: Reason }) {
  const Icon = reason.icon
  return (
    <li className="flex gap-3 py-4 sm:gap-3.5">
      <Icon className="mt-[3px] size-[18px] shrink-0" style={{ color: reason.color }} strokeWidth={2.2} aria-hidden="true" />
      <p className="text-pretty text-[15px] leading-6 text-tc-mute sm:text-[15.5px]">
        <span className="font-semibold text-tc-ink">{reason.lead}</span> {reason.text}
      </p>
    </li>
  )
}

export function Reasons() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 className="max-w-[16ch] text-balance font-tc-display text-[clamp(32px,3.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.02em] text-tc-ink">
          And the small things that make a trip easier.
        </h2>
        <div>
          <ul className="grid border-t border-tc-line sm:grid-cols-2 sm:gap-x-10 [&>li]:border-b [&>li]:border-tc-line">
            {INCLUDED.map((reason) => (
              <Item key={reason.lead} reason={reason} />
            ))}
          </ul>
          <div className="mt-8 rounded-[22px] bg-tc-violet-soft/60 px-5 pb-1 pt-4 sm:px-6">
            <p className="flex items-center gap-2 text-[13px] font-semibold text-tc-violet">
              <span className="rounded-full bg-[#fff5d6] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#b54708]">Pro</span>
              Also with Pro
            </p>
            <ul className="grid sm:grid-cols-2 sm:gap-x-10">
              {PRO.map((reason) => (
                <Item key={reason.lead} reason={reason} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
