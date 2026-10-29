// In-memory stand-in for the Supabase calls the OAuth consent page makes, for local
// testing only (see lib/supabase-browser.ts). Sign-in always succeeds; OTP code is
// 123456. Authorization ids:
//   expired    → 404, like an expired or unknown request
//   consented  → already approved, returns a redirect straight away
//   rpc-fails  → record_mcp_grant fails (e.g. migration not deployed)
//   anything else → a pending request from "Claude"
import type { SupabaseClient } from "@supabase/supabase-js"

const KEY = "tc-mock-supabase-session"

type Listener = (event: string, session: unknown) => void

function readSession() {
  try {
    return JSON.parse(window.sessionStorage.getItem(KEY) || "null")
  } catch {
    return null
  }
}

function apiError(message: string, status: number) {
  return Object.assign(new Error(message), { name: "AuthApiError", status, code: status === 404 ? "oauth_authorization_not_found" : undefined })
}

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

export function createMockSupabase(): SupabaseClient {
  const listeners = new Set<Listener>()

  const setSession = (email: string | null) => {
    const session = email ? { access_token: "mock", user: { id: "00000000-0000-0000-0000-000000000001", email } } : null
    if (session) window.sessionStorage.setItem(KEY, JSON.stringify(session))
    else window.sessionStorage.removeItem(KEY)
    listeners.forEach((listener) => listener(session ? "SIGNED_IN" : "SIGNED_OUT", session))
    return session
  }

  const redirect = (outcome: string) => ({ data: { redirect_url: `/?mock_oauth=${outcome}` }, error: null })

  const mock = {
    auth: {
      async getSession() {
        return { data: { session: readSession() }, error: null }
      },
      onAuthStateChange(callback: Listener) {
        listeners.add(callback)
        return { data: { subscription: { unsubscribe: () => listeners.delete(callback) } } }
      },
      async signInWithPassword({ email }: { email: string }) {
        await wait()
        return { data: { session: setSession(email) }, error: null }
      },
      async signInWithOtp() {
        await wait()
        return { data: {}, error: null }
      },
      async verifyOtp({ email, token }: { email: string; token: string }) {
        await wait()
        if (token !== "123456") return { data: {}, error: apiError("Token has expired or is invalid", 403) }
        return { data: { session: setSession(email) }, error: null }
      },
      async signInWithOAuth({ provider }: { provider: string }) {
        await wait()
        return { data: { session: setSession(`${provider}.user@example.com`) }, error: null }
      },
      async signOut() {
        setSession(null)
        return { error: null }
      },
      oauth: {
        async getAuthorizationDetails(id: string) {
          await wait()
          if (!readSession()) return { data: null, error: apiError("Auth session missing!", 401) }
          if (id === "expired") return { data: null, error: apiError("authorization not found", 404) }
          if (id === "consented") return redirect("already-approved")
          return {
            data: {
              authorization_id: id,
              redirect_uri: "https://claude.ai/api/mcp/auth_callback",
              client: { id: "6f1c1c2e-mock-client", name: "Claude", uri: "https://claude.ai", logo_uri: "" },
              user: readSession().user,
              scope: "openid email",
            },
            error: null,
          }
        },
        async approveAuthorization() {
          await wait()
          return redirect("approved")
        },
        async denyAuthorization() {
          await wait()
          return redirect("denied")
        },
      },
    },
    async rpc(name: string, args: Record<string, unknown>) {
      await wait()
      console.info("[mock supabase] rpc", name, args)
      if (new URLSearchParams(window.location.search).get("authorization_id") === "rpc-fails") {
        return { data: null, error: { message: "function record_mcp_grant does not exist", code: "PGRST202" } }
      }
      return { data: null, error: null }
    },
  }

  return mock as unknown as SupabaseClient
}
