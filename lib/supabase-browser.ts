// Browser-only Supabase client for pages that sign the user in on trip-cache.com
// (today: the OAuth consent page at /oauth/consent). It uses the publishable key,
// which is public by design; row access is enforced in Postgres. Never put a
// secret or service-role key here.
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { createMockSupabase } from "@/lib/supabase-mock"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jvwnjqiypayicqfgvdyo.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_OToVgslOngmAoZyKnAY2Yw_r9PWXmC4"

// Local testing only: NEXT_PUBLIC_SUPABASE_MOCK=1 swaps in an in-memory fake so the
// consent flow can be exercised before the OAuth server and record_mcp_grant exist.
// Ignored in production builds.
const USE_MOCK = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SUPABASE_MOCK === "1"

let client: SupabaseClient | null = null

export function getBrowserSupabase(): SupabaseClient {
  if (client) return client
  client = USE_MOCK
    ? createMockSupabase()
    : createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          flowType: "pkce",
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
  return client
}
