import "server-only"
import data from "@/lib/data/airports.json"

/** [iata, name, city, country, tz, lat, lon] from the TripCache app's airport dataset. */
type Row = [string, string, string, string, string, number, number]
export type Airport = { iata: string; name: string; city: string; country: string; tz: string; lat: number; lon: number }

const ROWS = data as Row[]

/** The main international gateway where a city has several hubs. */
const PRIMARY = new Set("LHR CDG ICN HND JFK ORD IAD FCO MXP IST DXB BOM KIX PEK PVG GRU EZE YYZ YUL MEX BKK".split(" "))

/** Major passenger hubs float to the top of city searches ("london" → LHR before Biggin Hill). */
const HUBS = new Set(
  (
    "ATL DFW DEN ORD LAX JFK LAS MCO MIA CLT SEA PHX EWR SFO IAH BOS FLL MSP LGA DTW PHL SLC DCA SAN BWI TPA AUS IAD BNA MDW HNL YYZ YVR YUL MEX CUN GRU GIG BOG LIM SCL EZE " +
    "LHR LGW STN LTN MAN EDI DUB CDG ORY AMS FRA MUC BER ZRH GVA VIE BRU CPH ARN OSL HEL MAD BCN LIS FCO MXP VCE ATH IST SAW PRG WAW BUD " +
    "DXB AUH DOH JED RUH CAI JNB CPT NBO ADD CMN TLV BOM DEL BLR MAA HYD CCU KHI LHE ISB CMB DAC KTM " +
    "SIN KUL CGK DPS BKK DMK HKT MNL CEB SGN HAN PNH HKG MFM TPE ICN GMP NRT HND KIX PEK PKX PVG SHA CAN SZX CTU " +
    "SYD MEL BNE PER ADL AKL CHC WLG"
  ).split(" "),
)
const toAirport = ([iata, name, city, country, tz, lat, lon]: Row): Airport => ({ iata, name, city, country, tz, lat, lon })

export function getAirport(iata: string): Airport | null {
  const code = iata.trim().toUpperCase()
  const row = ROWS.find((item) => item[0] === code)
  return row ? toAirport(row) : null
}

/** Exact code first, then city / name prefixes, then contains. Larger airports win ties by "International" in the name. */
export function searchAirports(query: string, limit = 8): Airport[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const scored: { row: Row; score: number }[] = []
  for (const row of ROWS) {
    const [iata, name, city] = row
    const code = iata.toLowerCase()
    const cityL = city.toLowerCase()
    const nameL = name.toLowerCase()
    let score = 0
    if (code === q) score = 100
    else if (cityL === q) score = 80
    else if (cityL.startsWith(q)) score = 60
    else if (code.startsWith(q)) score = 55
    else if (nameL.startsWith(q)) score = 50
    else if (nameL.includes(q) || cityL.includes(q)) score = 30
    if (!score) continue
    if (/international/i.test(name)) score += 6
    if (HUBS.has(iata)) score += 25
    if (PRIMARY.has(iata)) score += 10
    scored.push({ row, score })
  }
  return scored
    .sort((a, b) => b.score - a.score || a.row[0].localeCompare(b.row[0]))
    .slice(0, limit)
    .map(({ row }) => toAirport(row))
}
