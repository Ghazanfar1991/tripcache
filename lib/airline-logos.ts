import { cacheLife } from "next/cache"

// Airline logos come from the same public asset catalog the TripCache app uses
// (src/services/catalog.ts in the app repo): a pointer names the current
// release, its manifest says where logos live and how files are named.
const POINTER_URL = "https://cdn.jsdelivr.net/gh/Ghazanfar1991/tripcache-assets/pointer.json"

type Pointer = { base?: string; manifest?: string }
type Manifest = { airlineLogos?: { baseDir?: string; fileTemplate?: string; iataCase?: "upper" | "lower" } }

const joinUrl = (...parts: (string | undefined)[]) =>
  parts
    .filter((part): part is string => !!part)
    .map((part, i) => (i === 0 ? part.replace(/\/+$/, "") : part.replace(/^\/+|\/+$/g, "")))
    .join("/")

async function getLogoTemplate(): Promise<{ base: string; dir?: string; file: string; upper: boolean } | null> {
  "use cache"
  cacheLife("days")
  try {
    const pointer = (await fetch(POINTER_URL).then((r) => (r.ok ? r.json() : null))) as Pointer | null
    if (!pointer?.base || !pointer.manifest) return null
    const manifest = (await fetch(joinUrl(pointer.base, pointer.manifest)).then((r) => (r.ok ? r.json() : null))) as Manifest | null
    const logos = manifest?.airlineLogos
    if (!logos?.fileTemplate) return null
    return { base: pointer.base, dir: logos.baseDir, file: logos.fileTemplate, upper: logos.iataCase !== "lower" }
  } catch {
    return null
  }
}

/**
 * The CDN URL of an airline's logo, or null when the catalog has none for that
 * code (the page then shows the IATA code instead of a broken image).
 */
export async function getAirlineLogoUrl(iata?: string | null): Promise<string | null> {
  "use cache"
  cacheLife("days")
  const code = iata?.trim()
  if (!code || !/^[A-Za-z0-9]{2,3}$/.test(code)) return null
  const template = await getLogoTemplate()
  if (!template) return null
  const url = joinUrl(template.base, template.dir, template.file.replace("{{IATA}}", template.upper ? code.toUpperCase() : code.toLowerCase()))
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok ? url : null
  } catch {
    return null
  }
}
