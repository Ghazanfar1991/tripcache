"use client"

/**
 * The generator's state: trip options and ticked item ids, kept in memory and mirrored to
 * localStorage when the browser allows it. Read through useSyncExternalStore so the server
 * (and hydration) render the default checklist, and the saved one takes over on the client.
 */
import { useSyncExternalStore } from "react"
import { DEFAULT_OPTIONS, parseOptions, type ChecklistOptions } from "@/lib/travel-checklist"

const KEY = "tc-travel-checklist-v1"

export type ChecklistState = { options: ChecklistOptions; checked: string[] }

const SERVER_STATE: ChecklistState = { options: DEFAULT_OPTIONS, checked: [] }

let state: ChecklistState | null = null
const listeners = new Set<() => void>()

function load(): ChecklistState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return SERVER_STATE
    const parsed = JSON.parse(raw) as { options?: unknown; checked?: unknown }
    return {
      options: parseOptions(parsed.options),
      checked: Array.isArray(parsed.checked) ? parsed.checked.filter((id): id is string => typeof id === "string") : [],
    }
  } catch {
    return SERVER_STATE
  }
}

function getSnapshot() {
  if (!state) state = load()
  return state
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return
    state = load()
    listener()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

export function setChecklistState(update: (current: ChecklistState) => ChecklistState) {
  state = update(getSnapshot())
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* private mode or storage blocked: the list still works for this visit */
  }
  listeners.forEach((listener) => listener())
}

export function useChecklistState() {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_STATE)
}
