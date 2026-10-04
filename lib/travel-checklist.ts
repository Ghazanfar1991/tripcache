/**
 * Travel checklist generator: the trip options, the item catalogue and the rules that pick items.
 * Shared by the interactive generator (client) and the server-rendered printable list.
 *
 * Truth rule: entry, visa, passport-validity and health requirements differ by destination and
 * nationality, so items never state a country rule as fact. They point at the official source.
 */
import type { Category } from "@/components/home/data"

export type TripType = "domestic" | "international"
export type TripLength = "weekend" | "week" | "long"
export type Purpose = "leisure" | "business"
export type Transport = "flying" | "car" | "cruise" | "train"
export type Traveler = "solo" | "kids" | "pets"
export type Extra = "driving" | "medication" | "laptop"

export type ChecklistOptions = {
  trip: TripType
  length: TripLength
  purpose: Purpose
  transport: Transport[]
  travelers: Traveler[]
  extras: Extra[]
}

export type GroupId = "documents" | "money" | "tech" | "health" | "packing" | "before"

export type ChecklistItem = {
  id: string
  group: GroupId
  label: string
  detail?: string
  /** The app's booking colour, where the item belongs to a booking. */
  category?: Category
}

export const DEFAULT_OPTIONS: ChecklistOptions = {
  trip: "international",
  length: "week",
  purpose: "leisure",
  transport: ["flying"],
  travelers: [],
  extras: [],
}

export const GROUPS: { id: GroupId; title: string }[] = [
  { id: "documents", title: "Documents" },
  { id: "money", title: "Money & cards" },
  { id: "tech", title: "Tech & power" },
  { id: "health", title: "Health" },
  { id: "packing", title: "Packing essentials" },
  { id: "before", title: "Before you leave" },
]

export const OPTION_LABELS = {
  trip: { domestic: "Domestic", international: "International" },
  length: { weekend: "Weekend", week: "1 week", long: "2+ weeks" },
  purpose: { leisure: "Leisure", business: "Business" },
  transport: { flying: "Flying", car: "Renting a car", cruise: "Cruise", train: "Train" },
  travelers: { solo: "Solo", kids: "With kids", pets: "With pets" },
  extras: { driving: "Driving abroad", medication: "Medication", laptop: "Work laptop" },
} as const

type Rule = ChecklistItem & { when?: (o: ChecklistOptions, has: Has) => boolean }
type Has = {
  intl: boolean
  flying: boolean
  car: boolean
  cruise: boolean
  train: boolean
  kids: boolean
  pets: boolean
  solo: boolean
  driving: boolean
  medication: boolean
  laptop: boolean
  business: boolean
  long: boolean
  weekend: boolean
}

const RULES: Rule[] = [
  /* -------------------------------- Documents -------------------------------- */
  {
    id: "passport",
    group: "documents",
    label: "Passport, checked against the destination's validity rule",
    detail:
      "Many countries ask for several months of validity beyond your stay and blank pages for stamps. Check the destination's official government entry requirements.",
    when: (_, h) => h.intl,
  },
  {
    id: "photo-id",
    group: "documents",
    label: "Government-issued photo ID",
    detail: "Check which IDs your airline and airport security accept for domestic flights.",
    when: (_, h) => !h.intl,
  },
  {
    id: "visa",
    group: "documents",
    label: "Visa, eTA or entry authorization, if your destination requires one",
    detail: "Some electronic authorizations must be approved before you board. Apply only through the official government site.",
    when: (_, h) => h.intl,
  },
  {
    id: "onward",
    group: "documents",
    label: "Proof of return or onward travel",
    detail: "Some airlines and border officers ask for it at check-in or on arrival.",
    when: (_, h) => h.intl,
  },
  { id: "boarding-pass", group: "documents", label: "Boarding passes, or the airline app with you checked in", category: "flight", when: (_, h) => h.flying },
  { id: "flight-confirmation", group: "documents", label: "Flight confirmation and booking reference", category: "flight", when: (_, h) => h.flying },
  {
    id: "stay-confirmation",
    group: "documents",
    label: "Hotel or accommodation confirmations",
    detail: "With the address, check-in time and the cancellation terms.",
    category: "hotel",
  },
  { id: "car-confirmation", group: "documents", label: "Rental car voucher and pick-up details", category: "car", when: (_, h) => h.car },
  {
    id: "licence",
    group: "documents",
    label: "Driving licence (the physical card)",
    detail: "Rental desks usually want the card itself and a credit card in the main driver's name.",
    category: "car",
    when: (_, h) => h.car || h.driving,
  },
  {
    id: "idp",
    group: "documents",
    label: "International Driving Permit, if required",
    detail: "Some countries and rental companies require one alongside your licence. Check before you go.",
    category: "car",
    when: (_, h) => h.intl && (h.car || h.driving),
  },
  { id: "cruise-docs", group: "documents", label: "Cruise booking documents and boarding time", category: "activity", when: (_, h) => h.cruise },
  { id: "train-tickets", group: "documents", label: "Train tickets, passes or seat reservations", category: "activity", when: (_, h) => h.train },
  {
    id: "insurance",
    group: "documents",
    label: "Travel insurance policy and its emergency number",
    when: (_, h) => h.intl || h.cruise || h.long,
  },
  {
    id: "kids-docs",
    group: "documents",
    label: "Children's passports and a parental consent letter, if needed",
    detail: "Some countries and airlines ask for a letter when a child travels without both parents. Check the requirements.",
    when: (_, h) => h.kids && h.intl,
  },
  {
    id: "kids-id",
    group: "documents",
    label: "Children's ID or birth certificate, if your airline asks for one",
    when: (_, h) => h.kids && !h.intl,
  },
  {
    id: "pet-docs",
    group: "documents",
    label: "Pet health certificate and vaccination records",
    detail: "Rules for travelling with animals vary widely and some take weeks to complete. Check them early.",
    when: (_, h) => h.pets,
  },
  {
    id: "health-docs",
    group: "documents",
    label: "Vaccination or health documents, if required",
    detail: "Check the destination's official requirements and your own health authority's travel advice.",
    when: (_, h) => h.intl,
  },
  {
    id: "business-letter",
    group: "documents",
    label: "Invitation or business letter, if your entry type needs one",
    when: (_, h) => h.business && h.intl,
  },
  {
    id: "emergency",
    group: "documents",
    label: "Emergency contacts, plus your embassy or consulate details",
    when: (_, h) => h.intl,
  },

  /* ------------------------------ Money & cards ------------------------------ */
  { id: "two-cards", group: "money", label: "Two payment cards, carried separately" },
  { id: "fx-fees", group: "money", label: "Check your cards' foreign transaction fees", when: (_, h) => h.intl },
  { id: "local-cash", group: "money", label: "A little local currency for arrival", when: (_, h) => h.intl },
  { id: "corporate-card", group: "money", label: "Corporate card and a plan for keeping receipts", when: (_, h) => h.business },
  { id: "tolls", group: "money", label: "Cash or a card for tolls, fuel and parking", category: "car", when: (_, h) => h.car || h.driving },
  { id: "cash-small", group: "money", label: "Some cash for tips and small purchases", when: (_, h) => !h.intl },

  /* ------------------------------- Tech & power ------------------------------ */
  { id: "phone", group: "tech", label: "Phone, charger and cable" },
  { id: "adapter", group: "tech", label: "Power adapter for the destination's plug type", when: (_, h) => h.intl },
  { id: "data", group: "tech", label: "Roaming plan or a local eSIM", when: (_, h) => h.intl },
  {
    id: "power-bank",
    group: "tech",
    label: "Power bank in your carry-on",
    detail: "Airlines limit spare batteries in checked bags. Check your airline's rules.",
    when: (_, h) => h.flying,
  },
  { id: "offline-maps", group: "tech", label: "Offline maps downloaded for where you're going" },
  { id: "headphones", group: "tech", label: "Headphones", when: (_, h) => h.flying || h.train },
  { id: "laptop", group: "tech", label: "Work laptop, charger and VPN or remote access tested", when: (_, h) => h.laptop || h.business },
  { id: "kids-entertainment", group: "tech", label: "Downloaded shows and games for the kids", when: (_, h) => h.kids },

  /* ---------------------------------- Health --------------------------------- */
  {
    id: "meds",
    group: "health",
    label: "Prescription medication in its original packaging, plus a few spare days",
    when: (_, h) => h.medication,
  },
  {
    id: "meds-letter",
    group: "health",
    label: "Copy of prescriptions or a doctor's letter",
    detail: "Some medicines are restricted in some countries. Check the destination's official guidance.",
    when: (_, h) => h.medication && h.intl,
  },
  { id: "first-aid", group: "health", label: "Small first-aid kit and pain relief", when: (_, h) => !h.weekend },
  { id: "sun", group: "health", label: "Sunscreen and insect repellent", when: (o) => o.purpose === "leisure" },
  { id: "seasick", group: "health", label: "Motion-sickness remedy", when: (_, h) => h.cruise },
  { id: "kids-meds", group: "health", label: "Children's medicine and thermometer", when: (_, h) => h.kids },

  /* -------------------------------- Packing ---------------------------------- */
  { id: "clothes-weekend", group: "packing", label: "Clothes for 2–3 days", when: (_, h) => h.weekend },
  { id: "clothes-week", group: "packing", label: "Clothes for a week, planned to re-wear", when: (o) => o.length === "week" },
  { id: "clothes-long", group: "packing", label: "Clothes for about a week, plus a laundry plan", when: (_, h) => h.long },
  { id: "liquids", group: "packing", label: "Toiletries, with liquids in a clear bag for security", category: "flight", when: (_, h) => h.flying },
  { id: "toiletries", group: "packing", label: "Toiletries and personal care", when: (_, h) => !h.flying },
  { id: "shoes", group: "packing", label: "Comfortable walking shoes", when: (o) => o.purpose === "leisure" },
  { id: "business-outfit", group: "packing", label: "Business outfit for meetings", when: (_, h) => h.business },
  { id: "flight-layer", group: "packing", label: "A warm layer and travel pillow for the flight", category: "flight", when: (_, h) => h.flying && (h.intl || h.long) },
  { id: "bottle", group: "packing", label: "Reusable water bottle (empty through security)", when: (_, h) => h.flying },
  { id: "kids-pack", group: "packing", label: "Snacks, wipes and a comfort item for the kids", when: (_, h) => h.kids },
  { id: "pet-pack", group: "packing", label: "Pet carrier, leash, food and bowls", when: (_, h) => h.pets },
  { id: "cruise-bag", group: "packing", label: "Day bag for embarkation, before your cabin is ready", category: "activity", when: (_, h) => h.cruise },

  /* ----------------------------- Before you leave ---------------------------- */
  {
    id: "offline-copies",
    group: "before",
    label: "Save copies of your passport, ID and bookings offline",
    detail: "Keep them on your phone and somewhere separate from the originals.",
  },
  { id: "bank", group: "before", label: "Check whether your bank wants to know you're travelling", when: (_, h) => h.intl },
  { id: "check-in", group: "before", label: "Check in online and note the check-in and bag-drop times", category: "flight", when: (_, h) => h.flying },
  { id: "baggage", group: "before", label: "Check your fare's baggage allowance", category: "flight", when: (_, h) => h.flying },
  { id: "cancellation", group: "before", label: "Note free-cancellation deadlines for hotels and cars", category: "hotel" },
  { id: "car-pickup", group: "before", label: "Confirm rental pick-up time and what insurance is included", category: "car", when: (_, h) => h.car },
  { id: "register", group: "before", label: "Register with your government's traveller program, if it has one", when: (_, h) => h.intl },
  { id: "share", group: "before", label: "Share your itinerary with someone at home", detail: "Especially useful when you travel solo." },
  { id: "transfer", group: "before", label: "Plan the ride or parking to and from the airport", category: "flight", when: (_, h) => h.flying },
  { id: "out-of-office", group: "before", label: "Set your out-of-office and share your schedule", when: (_, h) => h.business },
  { id: "pet-care", group: "before", label: "Confirm pet-friendly stays, or arrange pet care at home", when: (_, h) => h.pets },
  { id: "home", group: "before", label: "Pause deliveries and secure your home", when: (_, h) => h.long },
]

function facts(o: ChecklistOptions): Has {
  return {
    intl: o.trip === "international",
    flying: o.transport.includes("flying"),
    car: o.transport.includes("car"),
    cruise: o.transport.includes("cruise"),
    train: o.transport.includes("train"),
    kids: o.travelers.includes("kids"),
    pets: o.travelers.includes("pets"),
    solo: o.travelers.includes("solo"),
    driving: o.extras.includes("driving"),
    medication: o.extras.includes("medication"),
    laptop: o.extras.includes("laptop"),
    business: o.purpose === "business",
    long: o.length === "long",
    weekend: o.length === "weekend",
  }
}

/** The items that apply to these options, in catalogue order. */
export function buildChecklist(options: ChecklistOptions): ChecklistItem[] {
  const has = facts(options)
  return RULES.filter((rule) => !rule.when || rule.when(options, has)).map(({ id, group, label, detail, category }) => ({ id, group, label, detail, category }))
}

export function groupChecklist(items: ChecklistItem[]) {
  return GROUPS.map((group) => ({ ...group, items: items.filter((item) => item.group === group.id) })).filter((group) => group.items.length)
}

/** A short human summary of the options, e.g. "International · 1 week · Leisure · Flying". */
export function describeOptions(o: ChecklistOptions) {
  return [
    OPTION_LABELS.trip[o.trip],
    OPTION_LABELS.length[o.length],
    OPTION_LABELS.purpose[o.purpose],
    ...o.transport.map((t) => OPTION_LABELS.transport[t]),
    ...o.travelers.map((t) => OPTION_LABELS.travelers[t]),
    ...o.extras.map((t) => OPTION_LABELS.extras[t]),
  ].join(" · ")
}

/** Plain-text export for Copy and Download. */
export function checklistText(options: ChecklistOptions, checked: ReadonlySet<string>) {
  const items = buildChecklist(options)
  const lines = ["TRAVEL CHECKLIST", describeOptions(options), ""]
  for (const group of groupChecklist(items)) {
    lines.push(group.title.toUpperCase())
    for (const item of group.items) lines.push(`[${checked.has(item.id) ? "x" : " "}] ${item.label}`)
    lines.push("")
  }
  lines.push("Entry, visa and health rules change. Check the destination's official government sources before you travel.")
  lines.push("Made with the TripCache travel checklist generator: https://trip-cache.com/tools/travel-checklist")
  return lines.join("\n")
}

/* ------------------------------------------------------------------ */
/* Parsing saved state                                                 */
/* ------------------------------------------------------------------ */

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback
}
function pickMany<T extends string>(value: unknown, allowed: readonly T[]): T[] {
  return Array.isArray(value) ? allowed.filter((item) => value.includes(item)) : []
}

export function parseOptions(value: unknown): ChecklistOptions {
  const v = (value && typeof value === "object" ? value : {}) as Record<string, unknown>
  return {
    trip: pick(v.trip, ["domestic", "international"], DEFAULT_OPTIONS.trip),
    length: pick(v.length, ["weekend", "week", "long"], DEFAULT_OPTIONS.length),
    purpose: pick(v.purpose, ["leisure", "business"], DEFAULT_OPTIONS.purpose),
    transport: Array.isArray(v.transport) ? pickMany(v.transport, ["flying", "car", "cruise", "train"]) : DEFAULT_OPTIONS.transport,
    travelers: pickMany(v.travelers, ["solo", "kids", "pets"]),
    extras: pickMany(v.extras, ["driving", "medication", "laptop"]),
  }
}
