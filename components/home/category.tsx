import { BedDouble, Car, Plane, Ticket, type LucideIcon } from "lucide-react"
import { CATEGORY, type Category } from "./data"

export const CATEGORY_ICON: Record<Category, LucideIcon> = {
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

/** Clipped colour pools, the app's "prismatic bloom" surface language. */
export function Bloom({ className, color }: { className: string; color: string }) {
  return (
    <span
      aria-hidden="true"
      className={`tc-bloom pointer-events-none absolute rounded-full ${className}`}
      style={{ backgroundColor: color }}
    />
  )
}
