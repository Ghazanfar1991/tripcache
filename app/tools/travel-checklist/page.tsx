import "../../secondary.css"
import "../tools.css"

import type { Metadata } from "next"
import { Check, FileText, ListChecks } from "lucide-react"

import { Footer } from "@/components/footer"
import { TravelChecklistGenerator } from "@/components/seo/travel-checklist-generator"
import { ToolBody, ToolCta, ToolDarkBand, ToolFaqSection, ToolHeading, ToolHero, ToolPage, ToolRelated, ToolSchema, ToolSection, type ToolFaq } from "@/components/seo/tool-page"
import { buildChecklist, groupChecklist, type ChecklistOptions } from "@/lib/travel-checklist"
import { createPageMetadata } from "@/lib/seo-metadata"

const PAGE_PATH = "/tools/travel-checklist"

/** The printable list: an international trip by air with a rental car, so driving documents are included too. */
const PRINTABLE: ChecklistOptions = {
  trip: "international",
  length: "week",
  purpose: "leisure",
  transport: ["flying", "car"],
  travelers: [],
  extras: [],
}

const forgotten = [
  {
    title: "Passport validity, not just the expiry date",
    text: "Many countries want your passport valid for some months beyond your stay, and some want blank pages. Check the rule for your destination, not only that the passport hasn't expired.",
  },
  {
    title: "A visa or electronic travel authorization",
    text: "Some destinations that don't need a visa still ask for an online authorization approved before you board. Apply through the official government site.",
  },
  {
    title: "An International Driving Permit",
    text: "If you plan to drive abroad, some countries and rental desks want a permit alongside your home licence.",
  },
  {
    title: "A consent letter for children",
    text: "When a child travels with one parent or another adult, some countries and airlines ask for a signed letter from the absent parent.",
  },
  {
    title: "Proof of return or onward travel",
    text: "Airlines and border officers sometimes ask how and when you're leaving, especially on one-way tickets.",
  },
  {
    title: "Copies you can reach offline",
    text: "If a bag goes missing or the phone signal drops, copies of your passport and bookings saved offline make the next step much easier.",
  },
]

const faqs: ToolFaq[] = [
  {
    question: "What should be on a travel checklist?",
    answer:
      "Start with documents (passport or ID, visa or entry authorization if needed, bookings and insurance), then money and cards, phone and power, health items, packing essentials, and the jobs to do before you leave, such as saving copies offline and noting check-in times and cancellation deadlines. The generator above builds this for your trip type.",
  },
  {
    question: "What documents do I need to travel internationally?",
    answer:
      "Most international trips need a valid passport, any visa or electronic travel authorization your destination requires, your flight and accommodation confirmations, and travel insurance details. Depending on the trip you may also need proof of onward travel, a driving licence and International Driving Permit, a consent letter for children, or health documents. Requirements depend on your destination and nationality, so check the destination's official government entry requirements.",
  },
  {
    question: "How long does my passport need to be valid to travel?",
    answer:
      "It depends on the destination. Some countries only need your passport to be valid for the length of your stay, while many ask for three or six months of validity beyond your arrival or departure, and some ask for blank pages. Check the destination's official entry requirements and your airline's rules well before you travel.",
  },
  {
    question: "How do I know if I need a visa or an eTA?",
    answer:
      "Check the official government website of the country you're visiting, or your own government's travel advice pages. Rules depend on your nationality, the purpose and the length of your stay. Some visa-free trips still need an electronic authorization approved before you board.",
  },
  {
    question: "What should I pack for international travel?",
    answer:
      "Beyond clothes and toiletries, an international travel packing list usually adds a power adapter for the destination's plug type, a roaming plan or local eSIM, two payment cards kept separately, a little local currency, any medication in its original packaging, and a layer for the flight. Tick the options above to tailor the packing checklist for traveling abroad.",
  },
  {
    question: "Should I keep digital copies of my travel documents?",
    answer:
      "Yes. A copy of your passport, ID, insurance and bookings saved on your phone and somewhere separate from the originals helps if something is lost or stolen. Carry the originals as well; a copy does not replace a passport at a border.",
  },
  {
    question: "Is this travel checklist generator free, and does it save my list?",
    answer:
      "It's free and needs no sign-up. Your choices and ticks are saved in this browser on this device only. You can also print it, save it as a PDF from the print dialog, copy it as text or download a .txt file.",
  },
  {
    question: "Can TripCache keep my travel documents with my trip?",
    answer:
      "Yes. The free TripCache app has a document vault for tickets, boarding passes, passport and visa copies, insurance and hotel documents, kept beside your itinerary and cancellation deadlines. You can lock the vault with an optional PIN, Face ID or fingerprint, and cached documents open without a connection.",
  },
]

export const metadata: Metadata = createPageMetadata({
  title: "Travel Checklist Generator: Documents & Packing",
  description:
    "Build a travel checklist in seconds: documents for international travel, money, tech, health and a packing list. Tick items off, then print or download it.",
  keywords: [
    "travel checklist",
    "travel checklist generator",
    "international travel checklist",
    "travel document checklist",
    "documents needed for international travel",
    "travel packing checklist",
    "international travel packing list",
  ],
  path: PAGE_PATH,
  socialTitle: "Travel Checklist Generator | TripCache",
  socialDescription: "A free travel checklist for documents and packing, tailored to your trip. Tick it off, print it or download it.",
})

export default function TravelChecklistPage() {
  const printable = groupChecklist(buildChecklist(PRINTABLE))

  return (
    <ToolPage className="print:bg-white">
      <ToolSchema
        path={PAGE_PATH}
        name="Travel checklist generator"
        description="Builds a travel checklist of documents, money, tech, health and packing items for domestic or international trips."
        faqs={faqs}
      />
      {/* Printing prints the checklist only: the fixed navigation lives in the root layout, outside this page. */}
      <style>{`@media print { body > header, body header.fixed, body > a[href="#main-content"] { display: none !important; } @page { margin: 14mm; } }`}</style>

      <div className="print:hidden">
        <ToolHero
          eyebrow="Free travel checklist"
          icon={ListChecks}
          crumb="Travel checklist generator"
          title="Travel checklist generator"
          lede={
            <p>
              Build a travel checklist for your trip in a few taps: the documents you need, money and cards, tech, health and a packing
              list. Tick things off as you go, then print it, copy it or download it.
            </p>
          }
          placement="tools-travel-checklist"
          secondary={{ href: "/blog/save-travel-documents-offline", label: "Save documents offline" }}
        />
      </div>

      <ToolBody id="generator" className="print:bg-white print:py-0!">
        <TravelChecklistGenerator />
      </ToolBody>

      <ToolDarkBand
        className="print:hidden"
        eyebrow="Before you go"
        title="Documents most people forget"
        intro={
          <p>
            The passport is rarely what goes wrong. These are the travel documents that catch people out at check-in or the border.
            Rules vary, so check each one against your destination&rsquo;s official entry requirements.
          </p>
        }
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {forgotten.map((item) => (
            <li key={item.title} className="rounded-[18px] bg-white/[0.06] px-5 py-4 ring-1 ring-white/10">
              <span className="flex items-start gap-3">
                <FileText className="mt-1 size-4 shrink-0 text-[#c4b5fd]" aria-hidden="true" />
                <span>
                  <span className="block text-[15.5px] font-semibold leading-6 text-white">{item.title}</span>
                  <span className="mt-1 block text-[14.5px] leading-6 text-white/75">{item.text}</span>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </ToolDarkBand>

      <ToolSection flush id="printable-international-travel-checklist" className="print:hidden">
        <ToolHeading
          title="Printable international travel checklist"
          lede="A complete international travel checklist for a week away by air with a rental car. Use the generator above to tailor it, or print this list as it is."
        />
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {printable.map((group) => (
            <div key={group.id}>
              <h3 className="border-b border-tc-line pb-3 font-tc-display text-[21px] font-semibold text-tc-ink">
                {group.id === "documents" ? "Travel document checklist" : group.id === "packing" ? "International travel packing list" : group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.id} className="flex gap-3 text-[15.5px] leading-7 text-tc-ink-2">
                    <Check className="mt-1.5 size-4 shrink-0 text-tc-violet" aria-hidden="true" />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ToolSection>

      <div className="print:hidden">
        <ToolFaqSection tone="canvas" title="Travel checklist questions" intro="Short answers about travel documents, passports, visas and packing." faqs={faqs} />

        <ToolRelated
          tone="white"
          links={[
            { href: "/blog/save-travel-documents-offline", title: "How to save travel documents offline", text: "Keep passports, tickets and bookings reachable without a signal." },
            { href: "/blog/best-travel-document-organizer-app-2026", title: "Best travel document organizer apps", text: "Compare ways to keep travel documents organized by trip." },
            { href: "/tools/flight-arrival-time-calculator", title: "Flight time calculator", text: "Check your local arrival time before you book the first night." },
          ]}
        />

        <ToolCta
          placement="tools-travel-checklist-cta"
          title="Keep the documents with the trip."
          text="TripCache keeps your itinerary, cancellation deadlines and travel documents together, with an optional PIN or Face ID lock on the vault. Free on iPhone and Android."
        />
        <Footer />
      </div>
    </ToolPage>
  )
}
