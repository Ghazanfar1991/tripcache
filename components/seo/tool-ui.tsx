/**
 * Small shared pieces for the free travel tools (flight arrival, jet lag, layover, travel checklist).
 * Kept here, inside a folder app/secondary.css already scans, so their Tailwind classes compile with
 * the rest of the route styles. The `tc-*` colour and font utilities come from the token block in
 * app/secondary.css; `tc-press` and the `tct-*` board styles live in app/tools/tools.css.
 */
import { BedDouble, Car, Plane, Ticket, type LucideIcon } from "lucide-react"

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ")
}

/** The app's booking categories and colours (trip-cache-app/lib/theme.tsx). */
export type Category = "flight" | "hotel" | "car" | "activity"

export const CATEGORY: Record<Category, { label: string; plural: string; color: string; soft: string; text: string }> = {
  flight: { label: "Flight", plural: "Flights", color: "#6366f1", soft: "#eef2ff", text: "#4f46e5" },
  hotel: { label: "Hotel", plural: "Hotels", color: "#12b76a", soft: "#e8f8f0", text: "#067647" },
  car: { label: "Car", plural: "Cars", color: "#f59e0b", soft: "#fff5d6", text: "#b54708" },
  activity: { label: "Activity", plural: "Activities", color: "#d82d7e", soft: "#fce7f2", text: "#c12570" },
}

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  flight: Plane,
  hotel: BedDouble,
  car: Car,
  activity: Ticket,
}

/** The app's round category glyph: soft tint with the category colour on top. */
export function CategoryGlyph({ category, className = "size-9" }: { category: Category; className?: string }) {
  const Icon = CATEGORY_ICON[category]
  const tone = CATEGORY[category]
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full ${className}`}
      style={{ backgroundColor: tone.soft, color: tone.text }}
    >
      <Icon className="size-[48%]" strokeWidth={2.2} />
    </span>
  )
}
