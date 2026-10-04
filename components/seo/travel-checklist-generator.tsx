"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  Baby,
  Car,
  Check,
  ClipboardCheck,
  Copy,
  FileDown,
  FileText,
  HeartPulse,
  Laptop,
  ListChecks,
  Luggage,
  PawPrint,
  Pill,
  Plane,
  PlugZap,
  Printer,
  RotateCcw,
  Ship,
  TrainFront,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { useMemo, useState, type ReactNode } from "react"
import { CategoryGlyph, cx } from "@/components/seo/tool-ui"
import { DepartureBoard } from "@/components/seo/tools-departure-board"
import {
  OPTION_LABELS,
  buildChecklist,
  checklistText,
  describeOptions,
  groupChecklist,
  type ChecklistOptions,
  type GroupId,
} from "@/lib/travel-checklist"
import { setChecklistState, useChecklistState } from "./travel-checklist-store"

const EASE = [0.16, 1, 0.3, 1] as const

const GROUP_ICON: Record<GroupId, LucideIcon> = {
  documents: FileText,
  money: Wallet,
  tech: PlugZap,
  health: HeartPulse,
  packing: Luggage,
  before: ListChecks,
}

const CHIP_ICON: Record<string, LucideIcon> = {
  flying: Plane,
  car: Car,
  cruise: Ship,
  train: TrainFront,
  solo: User,
  kids: Baby,
  pets: PawPrint,
  driving: Car,
  medication: Pill,
  laptop: Laptop,
}

const LEGEND = "mb-2.5 block text-[13.5px] font-semibold text-tc-ink"
const FOCUS_RING = "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-tc-violet"

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

function Segmented<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
}: {
  name: string
  legend: string
  value: T
  options: Record<T, string>
  onChange: (value: T) => void
}) {
  const reduce = useReducedMotion()
  const entries = Object.entries(options) as [T, string][]
  return (
    <fieldset>
      <legend className={LEGEND}>{legend}</legend>
      <div className="grid gap-[0.25rem] rounded-[14px] border border-tc-line bg-white p-1" style={{ gridTemplateColumns: `repeat(${entries.length}, minmax(0, 1fr))` }}>
        {entries.map(([key, label]) => {
          const active = key === value
          return (
            <label
              key={key}
              className={cx(
                "relative grid h-10 cursor-pointer place-items-center rounded-[0.625rem] px-2 text-center text-[14px] font-semibold transition-colors duration-200",
                active ? "text-white" : "text-tc-ink-2 hover:bg-tc-mist",
                FOCUS_RING,
              )}
            >
              <input type="radio" name={name} value={key} checked={active} onChange={() => onChange(key)} className="tct-sr-only" />
              {active ? (
                <motion.span
                  layoutId={`seg-${name}`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[0.625rem] bg-tc-violet shadow-[0_8px_18px_-10px_rgba(97,43,211,0.8)]"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className="relative">{label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function Toggles<T extends string>({
  legend,
  values,
  options,
  onToggle,
}: {
  legend: string
  values: T[]
  options: Record<T, string>
  onToggle: (value: T) => void
}) {
  return (
    <fieldset>
      <legend className={LEGEND}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {(Object.entries(options) as [T, string][]).map(([key, label]) => {
          const on = values.includes(key)
          const Icon = CHIP_ICON[key]
          return (
            <label
              key={key}
              className={cx(
                "tc-press inline-flex h-10 cursor-pointer select-none items-center gap-2 rounded-full border px-3.5 text-[14px] font-semibold transition-colors duration-200",
                on ? "border-[#c9bdf5] bg-tc-violet-soft text-tc-violet" : "border-tc-line bg-white text-tc-ink-2 hover:bg-tc-mist",
                FOCUS_RING,
              )}
            >
              <input type="checkbox" checked={on} onChange={() => onToggle(key)} className="tct-sr-only" />
              {on ? <Check className="size-4" strokeWidth={2.6} aria-hidden="true" /> : Icon ? <Icon className="size-4 text-tc-mute" aria-hidden="true" /> : null}
              {label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/* ------------------------------------------------------------------ */
/* Progress ring                                                       */
/* ------------------------------------------------------------------ */

function ProgressRing({ done, total }: { done: number; total: number }) {
  const r = 26
  const circumference = 2 * Math.PI * r
  const ratio = total ? done / total : 0
  return (
    <span className="relative grid size-[68px] shrink-0 place-items-center" aria-hidden="true">
      <svg viewBox="0 0 64 64" className="absolute inset-0 size-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#ebe8ff" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#612bd3"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          className="transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        />
      </svg>
      <span className="relative font-tc-display text-[17px] font-semibold tabular-nums text-tc-ink">{Math.round(ratio * 100)}%</span>
    </span>
  )
}

function ActionButton({ onClick, icon, children, primary = false }: { onClick: () => void; icon: ReactNode; children: ReactNode; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "tc-press inline-flex h-11 items-center gap-2 rounded-[12px] px-4 text-[14.5px] font-semibold transition-colors duration-200",
        primary
          ? "bg-tc-violet text-white shadow-[0_10px_22px_-10px_rgba(97,43,211,0.8)] hover:bg-[#5520cb]"
          : "border border-tc-line bg-white text-tc-ink hover:bg-tc-mist",
      )}
    >
      {icon}
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Generator                                                           */
/* ------------------------------------------------------------------ */

export function TravelChecklistGenerator() {
  const { options, checked } = useChecklistState()
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const items = useMemo(() => buildChecklist(options), [options])
  const groups = useMemo(() => groupChecklist(items), [items])
  const checkedSet = useMemo(() => new Set(checked), [checked])
  const done = items.filter((item) => checkedSet.has(item.id)).length
  const total = items.length

  const setOptions = (update: (o: ChecklistOptions) => ChecklistOptions) =>
    setChecklistState((current) => ({ ...current, options: update(current.options) }))

  const toggleIn = <T extends string>(list: T[], value: T) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value])

  const toggleItem = (id: string) =>
    setChecklistState((current) => ({
      ...current,
      checked: current.checked.includes(id) ? current.checked.filter((item) => item !== id) : [...current.checked, id],
    }))

  const text = () => checklistText(options, checkedSet)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const download = () => {
    const blob = new Blob([text()], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "travel-checklist.txt"
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const summary = describeOptions(options)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start print:block">
      {/* Inputs */}
      <form
        aria-label="Trip details"
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-6 rounded-[26px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:p-7 lg:sticky lg:top-24 lg:max-h-[calc(100svh-7.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:[scrollbar-gutter:stable] lg:[scrollbar-width:thin] print:hidden"
      >
        <div>
          <h2 className="font-tc-display text-[22px] font-semibold leading-tight text-tc-ink">Tell us about the trip</h2>
          <p className="mt-1.5 text-[14.5px] leading-6 text-tc-mute">Tap what fits. The checklist updates as you go.</p>
        </div>
        <Segmented name="trip" legend="Trip type" value={options.trip} options={OPTION_LABELS.trip} onChange={(trip) => setOptions((o) => ({ ...o, trip }))} />
        <Segmented name="length" legend="Trip length" value={options.length} options={OPTION_LABELS.length} onChange={(length) => setOptions((o) => ({ ...o, length }))} />
        <Segmented name="purpose" legend="Purpose" value={options.purpose} options={OPTION_LABELS.purpose} onChange={(purpose) => setOptions((o) => ({ ...o, purpose }))} />
        <Toggles legend="Getting there and around" values={options.transport} options={OPTION_LABELS.transport} onToggle={(t) => setOptions((o) => ({ ...o, transport: toggleIn(o.transport, t) }))} />
        <Toggles
          legend="Who's going"
          values={options.travelers}
          options={OPTION_LABELS.travelers}
          onToggle={(t) =>
            setOptions((o) => {
              let travelers = toggleIn(o.travelers, t)
              // Solo and "with kids" can't both be true.
              if (t === "solo" && travelers.includes("solo")) travelers = travelers.filter((x) => x !== "kids")
              if (t === "kids" && travelers.includes("kids")) travelers = travelers.filter((x) => x !== "solo")
              return { ...o, travelers }
            })
          }
        />
        <Toggles legend="Extras" values={options.extras} options={OPTION_LABELS.extras} onToggle={(t) => setOptions((o) => ({ ...o, extras: toggleIn(o.extras, t) }))} />
      </form>

      {/* Result */}
      <section aria-labelledby="checklist-result-title" className="flex min-w-0 flex-col gap-4">
        <div className="tct-surface rounded-[26px] p-4 sm:p-6 print:hidden">
          <DepartureBoard
            meta={`${OPTION_LABELS.trip[options.trip]} · ${OPTION_LABELS.length[options.length]}`}
            label={`${done} of ${total} done`}
            icon={
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tc-violet/40 text-[#c4b5fd]">
                <ClipboardCheck className="size-3.5" />
              </span>
            }
            width={14}
            rows={[{ text: "YOUR CHECKLIST" }, { text: `${total} ITEMS`, tone: "gold" }, { text: options.trip.toUpperCase() }]}
          />
        </div>

        {/* Print-only header */}
        <div className="hidden print:block">
          <p className="font-tc-display text-[26px] font-semibold text-black">Travel checklist</p>
          <p className="mt-1 text-[13px] text-black">{summary}</p>
        </div>

        <div className="rounded-[26px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:p-6 print:hidden">
          <div className="flex items-center gap-4">
            <ProgressRing done={done} total={total} />
            <div className="min-w-0">
              <h2 id="checklist-result-title" className="font-tc-display text-[22px] font-semibold leading-snug text-tc-ink sm:text-[25px]">
                Your checklist: {total} items
              </h2>
              <p className="mt-1 text-[14.5px] text-tc-mute" aria-live="polite">
                {done === total && total > 0 ? "Everything is ticked. Have a good trip." : `${done} of ${total} done.`} Ticks are saved in this browser.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <ActionButton primary onClick={() => window.print()} icon={<Printer className="size-4" aria-hidden="true" />}>
              Print or save as PDF
            </ActionButton>
            <ActionButton onClick={copy} icon={copied ? <Check className="size-4 text-[#067647]" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}>
              {copied ? "Copied" : "Copy as text"}
            </ActionButton>
            <ActionButton onClick={download} icon={<FileDown className="size-4" aria-hidden="true" />}>
              Download .txt
            </ActionButton>
            {done > 0 ? (
              <ActionButton onClick={() => setChecklistState((current) => ({ ...current, checked: [] }))} icon={<RotateCcw className="size-4" aria-hidden="true" />}>
                Clear ticks
              </ActionButton>
            ) : null}
          </div>
        </div>

        {groups.map((group) => {
          const Icon = GROUP_ICON[group.id]
          const groupDone = group.items.filter((item) => checkedSet.has(item.id)).length
          return (
            <div
              key={group.id}
              className="rounded-[26px] border border-tc-line bg-white p-3 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-44px_rgba(45,27,87,0.45)] sm:p-4 print:mt-5 print:break-inside-avoid print:rounded-none print:border-0 print:p-0 print:shadow-none"
            >
              <div className="flex items-center justify-between gap-3 px-2 pb-2 pt-1 sm:px-3">
                <h3 className="flex items-center gap-3 font-tc-display text-[19px] font-semibold text-tc-ink sm:text-[21px] print:text-black">
                  <span className="grid size-9 place-items-center rounded-[0.625rem] bg-tc-violet-soft text-tc-violet print:hidden" aria-hidden="true">
                    <Icon className="size-[18px]" />
                  </span>
                  {group.title}
                </h3>
                <span className="text-[13px] font-semibold tabular-nums text-tc-mute print:hidden">
                  {groupDone}/{group.items.length}
                </span>
              </div>
              <ul className="flex flex-col">
                <AnimatePresence initial={false}>
                  {group.items.map((item) => {
                    const isChecked = checkedSet.has(item.id)
                    return (
                      <motion.li
                        key={item.id}
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <label
                          className={cx(
                            "flex cursor-pointer items-start gap-3.5 rounded-[14px] px-2 py-3 transition-colors duration-200 hover:bg-tc-mist sm:px-3 print:py-1.5",
                            FOCUS_RING,
                          )}
                        >
                          <input type="checkbox" checked={isChecked} onChange={() => toggleItem(item.id)} className="peer tct-sr-only" />
                          <span
                            aria-hidden="true"
                            className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[8px] border-2 border-[#b9bdc3] bg-white transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-checked:scale-105 peer-checked:border-tc-violet peer-checked:bg-tc-violet motion-reduce:transition-none peer-checked:[&_svg]:scale-100 peer-checked:[&_svg]:opacity-100 print:border-black print:peer-checked:bg-white"
                          >
                            <Check
                              className="size-3.5 scale-50 text-white opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none print:text-black"
                              strokeWidth={3}
                            />
                          </span>
                          <span className="min-w-0 flex-1 transition-colors duration-300 peer-checked:text-tc-mute">
                            <span
                              className={cx(
                                "block text-[15.5px] font-semibold leading-6 decoration-tc-mute/70 decoration-2 print:text-[13px] print:text-black",
                                isChecked ? "text-tc-mute line-through" : "text-tc-ink",
                              )}
                            >
                              {item.label}
                            </span>
                            {item.detail ? <span className="mt-0.5 block text-[14px] leading-6 text-tc-mute print:text-[11.5px] print:leading-5 print:text-black">{item.detail}</span> : null}
                          </span>
                          {item.category ? <CategoryGlyph category={item.category} className="mt-0.5 size-7 print:hidden" /> : null}
                        </label>
                      </motion.li>
                    )
                  })}
                </AnimatePresence>
              </ul>
            </div>
          )
        })}

        <p className="px-2 text-[13px] leading-6 text-tc-mute print:mt-5 print:px-0 print:text-[11px] print:text-black">
          Entry, visa, passport and health requirements differ by destination and nationality and can change. Check the destination&rsquo;s
          official government sources and your airline before you travel.
        </p>
      </section>
    </div>
  )
}
