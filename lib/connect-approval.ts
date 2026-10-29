// "Approve with the TripCache app" on the OAuth consent page. Talks to the
// connect-approval edge function in trip-cache-app (supabase/functions/connect-approval).
//
// The page makes a random secret, keeps it in sessionStorage and sends only its SHA-256
// when it asks for an approval. Polling sends the secret itself; the function only hands
// out the one-time sign-in token to the browser that holds it, once.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jvwnjqiypayicqfgvdyo.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_OToVgslOngmAoZyKnAY2Yw_r9PWXmC4"
const ENDPOINT = `${SUPABASE_URL}/functions/v1/connect-approval`
const STORAGE_PREFIX = "tc-connect-approval:"

export type AppApproval = {
  authorizationId: string
  requestId: string
  matchNumber: number
  expiresAt: string
  secret: string
}

export type AppApprovalGrant = {
  tokenHash: string
  scopes: string[]
  client: { id: string; name: string }
}

export type PollResult =
  | { kind: "approved"; grant: AppApprovalGrant }
  | { kind: "pending" | "denied" | "expired" | "used" | "invalid" | "retry" }

function toBase64Url(bytes: Uint8Array) {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
}

async function post(body: Record<string, unknown>) {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_PUBLISHABLE_KEY },
    body: JSON.stringify(body),
    cache: "no-store",
  })
}

function storageKey(authorizationId: string) {
  return `${STORAGE_PREFIX}${authorizationId}`
}

/** A request this tab started for this authorization and that hasn't expired. */
export function loadAppApproval(authorizationId: string): AppApproval | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(storageKey(authorizationId))
    if (!raw) return null
    const saved = JSON.parse(raw) as AppApproval
    if (saved.authorizationId !== authorizationId || !(Date.parse(saved.expiresAt) > Date.now())) {
      window.sessionStorage.removeItem(storageKey(authorizationId))
      return null
    }
    return saved
  } catch {
    return null
  }
}

export function clearAppApproval(authorizationId: string) {
  try {
    window.sessionStorage.removeItem(storageKey(authorizationId))
  } catch {
    // Storage blocked: nothing was kept.
  }
}

export async function startAppApproval(
  authorizationId: string,
  email: string,
): Promise<{ kind: "ok"; approval: AppApproval } | { kind: "rate_limited" | "invalid" | "failed" }> {
  const secret = toBase64Url(crypto.getRandomValues(new Uint8Array(32)))
  let response: Response
  try {
    response = await post({
      action: "create",
      authorization_id: authorizationId,
      email,
      browser_public_nonce: await sha256Hex(secret),
    })
  } catch {
    return { kind: "failed" }
  }
  if (response.status === 429) return { kind: "rate_limited" }
  if (response.status === 400) return { kind: "invalid" }
  if (!response.ok) return { kind: "failed" }
  const data = (await response.json().catch(() => null)) as { request_id?: string; match_number?: number; expires_at?: string } | null
  if (!data?.request_id || typeof data.match_number !== "number" || !data.expires_at) return { kind: "failed" }
  const approval: AppApproval = {
    authorizationId,
    requestId: data.request_id,
    matchNumber: data.match_number,
    expiresAt: data.expires_at,
    secret,
  }
  try {
    window.sessionStorage.setItem(storageKey(authorizationId), JSON.stringify(approval))
  } catch {
    // Without storage the request still works until the tab reloads.
  }
  return { kind: "ok", approval }
}

export async function claimAppApproval(approval: AppApproval): Promise<PollResult> {
  let response: Response
  try {
    response = await post({
      action: "poll",
      request_id: approval.requestId,
      authorization_id: approval.authorizationId,
      browser_secret: approval.secret,
    })
  } catch {
    return { kind: "retry" }
  }
  if (response.status === 404) return { kind: "invalid" }
  if (!response.ok) return { kind: "retry" }
  const data = (await response.json().catch(() => null)) as {
    status?: string
    token_hash?: string
    scopes?: string[]
    client?: { id?: string; name?: string }
  } | null
  if (data?.status === "approved" && data.token_hash && data.client?.id) {
    return {
      kind: "approved",
      grant: {
        tokenHash: data.token_hash,
        scopes: Array.isArray(data.scopes) ? data.scopes : ["trips:read"],
        client: { id: data.client.id, name: data.client.name ?? "" },
      },
    }
  }
  if (data?.status === "pending" || data?.status === "denied" || data?.status === "expired" || data?.status === "used") return { kind: data.status }
  return { kind: "retry" }
}
