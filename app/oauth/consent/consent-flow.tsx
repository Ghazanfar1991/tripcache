"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react"
import { AlertTriangle, Check, Globe, Loader2, Lock, Mail, Smartphone, Sparkles } from "lucide-react"
import type { OAuthAuthorizationDetails, Session } from "@supabase/supabase-js"
import { buttonClass, cx } from "@/components/site/kit"
import { getBrowserSupabase } from "@/lib/supabase-browser"
import {
  claimAppApproval,
  clearAppApproval,
  loadAppApproval,
  startAppApproval,
  type AppApproval,
  type AppApprovalGrant,
} from "@/lib/connect-approval"

// Contract with trip-cache-app (MCP server): app-level scopes stored by the
// record_mcp_grant(p_client_id text, p_client_name text, p_scopes text[]) RPC.
const SCOPE_TRIPS_READ = "trips:read"
const SCOPE_BOOKINGS_DRAFT = "bookings:draft"

// Connecting AI assistants is a TripCache Pro feature (checked again by the MCP server on
// every call). The app's /paywall route opens the Pro plans.
const PRO_PAYWALL_URL = "tripcache:///paywall"

// supabase-js puts the id straight into the request path, so only accept plain ids.
const AUTHORIZATION_ID_PATTERN = /^[A-Za-z0-9_-]{6,128}$/

type ErrorKind = "missing" | "expired" | "failed" | "reconnect"

/**
 * What the consent card decides on. "pending" is a normal request; "reconsent" is one
 * Supabase already auto-approved (it holds the code-bearing redirect) for a client
 * whose mcp_grants row was revoked, so the grant must be recorded again first.
 */
type ConsentRequest = {
  client: { id: string; name: string }
  redirectHost: string | null
  email: string
  mode: { kind: "pending"; authorizationId: string } | { kind: "reconsent"; redirectUrl: string }
}

type View =
  | { name: "loading" }
  | { name: "sign-in" }
  | { name: "consent"; request: ConsentRequest }
  | { name: "redirecting"; host: string | null }
  | { name: "pro-required"; clientName: string; returnUrl: string | null }
  | { name: "error"; kind: ErrorKind; message?: string }

function hostOf(url: string | undefined | null) {
  if (!url) return null
  try {
    return new URL(url).host || url
  } catch {
    return url
  }
}

function isExpiredError(error: { status?: number; code?: string; message?: string } | null) {
  if (!error) return false
  if (error.status === 404 || error.status === 410) return true
  return /not.?found|expired|invalid authorization|already (been )?(approved|denied|used|processed)/i.test(error.message ?? "")
}

/** The access_denied redirect for a request Supabase already approved: same callback and state, no code. */
function deniedRedirect(redirectUrl: string) {
  const url = new URL(redirectUrl)
  const state = url.searchParams.get("state")
  url.search = ""
  url.searchParams.set("error", "access_denied")
  url.searchParams.set("error_description", "The user denied access")
  if (state) url.searchParams.set("state", state)
  return url.toString()
}

type ConsentedCheck =
  | { kind: "ok" }
  | { kind: "reconsent"; client: { id: string; name: string } }
  | { kind: "reconnect" }
  | { kind: "failed"; message: string }

/**
 * Supabase auto-approves clients it thinks the user already consented to, but revoking a
 * connection in the app (mcp_grants.revoked_at) only revokes the Supabase grant best-effort.
 * So before following an auto-approval, make sure this client still has an active
 * mcp_grants row. The auto-approval doesn't say which client it is for, so it is matched
 * against the user's Supabase grants.
 */
async function checkConsentedClient(redirectUrl: string): Promise<ConsentedCheck> {
  const supabase = getBrowserSupabase()
  const [grants, active] = await Promise.all([
    supabase.auth.oauth.listGrants(),
    supabase.from("mcp_grants").select("client_id").is("revoked_at", null),
  ])
  if (grants.error || active.error) return { kind: "failed", message: (grants.error ?? active.error)?.message ?? "" }

  const activeIds = new Set((active.data ?? []).map((row: { client_id: string }) => row.client_id))
  const all = grants.data ?? []
  const stale = all.filter((grant) => !activeIds.has(grant.client.id))
  if (stale.length === 0) return { kind: "ok" }

  // Which client is this? Match the callback host against each client's site; if every
  // Supabase grant is stale and there is only one, it must be this one.
  const host = hostOf(redirectUrl)
  const byHost = all.filter((grant) => {
    const site = hostOf(grant.client.uri)
    return !!site && !!host && (host === site || host.endsWith(`.${site}`) || site.endsWith(`.${host}`))
  })
  const current = byHost.length === 1 ? byHost[0] : all.length === 1 ? all[0] : null
  if (current && activeIds.has(current.client.id)) return { kind: "ok" }
  if (current) return { kind: "reconsent", client: { id: current.client.id, name: current.client.name } }

  // Can't tell which stale client this is: revoke the stale Supabase grants so the next
  // attempt shows the consent screen, and ask the user to start again.
  await Promise.all(stale.map((grant) => supabase.auth.oauth.revokeGrant({ clientId: grant.client.id })))
  return { kind: "reconnect" }
}

type ProCheck = { kind: "pro" } | { kind: "free" } | { kind: "failed"; message: string }

/** Whether the signed-in account has TripCache Pro (has_my_pro_subscription, own account only). */
async function checkPro(): Promise<ProCheck> {
  const { data, error } = await getBrowserSupabase().rpc("has_my_pro_subscription")
  if (error) return { kind: "failed", message: error.message }
  return data === true ? { kind: "pro" } : { kind: "free" }
}

/**
 * A free account can't connect an assistant: deny the request so the assistant gets a clean
 * access_denied, and return where its Back button should go. A request Supabase already
 * approved can't be denied any more; send the same error to its callback instead.
 */
async function denyWithoutPro(data: { redirect_url: string } | OAuthAuthorizationDetails, authorizationId: string): Promise<string | null> {
  if ("redirect_url" in data && !("authorization_id" in data)) return deniedRedirect(data.redirect_url)
  const { data: denied } = await getBrowserSupabase().auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true })
  return denied?.redirect_url ?? null
}

/** Drops the OAuth return parameters (code, error) a provider sign-in leaves in the URL. */
function cleanReturnParams() {
  const url = new URL(window.location.href)
  let changed = false
  for (const key of ["code", "error", "error_code", "error_description"]) {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key)
      changed = true
    }
  }
  if (changed) window.history.replaceState(window.history.state, "", url.toString())
}

export function ConsentFlow() {
  const params = useSearchParams()
  const authorizationId = params.get("authorization_id") ?? ""
  const validId = AUTHORIZATION_ID_PATTERN.test(authorizationId)
  const [view, setView] = useState<View>(() => (validId ? { name: "loading" } : { name: "error", kind: "missing" }))
  const [providerError] = useState(() => params.get("error_description"))
  const loadedFor = useRef<string | null>(null)
  // While an approval from the app signs in and finishes, auth events must not redraw the page.
  const finishingFromApp = useRef(false)

  const loadDetails = useCallback(
    async (current: Session) => {
      if (loadedFor.current === current.access_token) return
      loadedFor.current = current.access_token
      setView({ name: "loading" })
      const supabase = getBrowserSupabase()
      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId)
      if (error || !data) {
        loadedFor.current = null
        setView(isExpiredError(error) ? { name: "error", kind: "expired" } : { name: "error", kind: "failed", message: error?.message })
        return
      }
      const pro = await checkPro()
      if (pro.kind === "failed") {
        loadedFor.current = null
        setView({ name: "error", kind: "failed", message: pro.message })
        return
      }
      if (pro.kind === "free") {
        const clientName = ("client" in data && data.client?.name) || "this app"
        setView({ name: "pro-required", clientName, returnUrl: await denyWithoutPro(data, authorizationId) })
        return
      }
      if ("redirect_url" in data && !("authorization_id" in data)) {
        // Already approved earlier: Supabase sends the user straight back, unless the
        // TripCache grant for this client was revoked since.
        const check = await checkConsentedClient(data.redirect_url)
        if (check.kind === "ok") {
          setView({ name: "redirecting", host: hostOf(data.redirect_url) })
          window.location.assign(data.redirect_url)
        } else if (check.kind === "reconsent") {
          setView({
            name: "consent",
            request: {
              client: check.client,
              redirectHost: hostOf(data.redirect_url),
              email: current.user.email ?? "",
              mode: { kind: "reconsent", redirectUrl: data.redirect_url },
            },
          })
        } else {
          setView(check.kind === "reconnect" ? { name: "error", kind: "reconnect" } : { name: "error", kind: "failed", message: check.message })
        }
        return
      }
      const details = data as OAuthAuthorizationDetails
      setView({
        name: "consent",
        request: {
          client: { id: details.client.id, name: details.client.name },
          redirectHost: hostOf(details.redirect_uri),
          email: details.user?.email || current.user.email || "",
          mode: { kind: "pending", authorizationId: details.authorization_id },
        },
      })
    },
    [authorizationId],
  )

  useEffect(() => {
    if (!validId) return
    const supabase = getBrowserSupabase()
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active || finishingFromApp.current) return
      cleanReturnParams()
      if (data.session) loadDetails(data.session)
      else setView({ name: "sign-in" })
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, next) => {
      if (!active || finishingFromApp.current) return
      if (event === "SIGNED_OUT" || !next) {
        loadedFor.current = null
        setView({ name: "sign-in" })
      } else if (event === "SIGNED_IN") {
        loadDetails(next)
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [validId, loadDetails])

  /**
   * Approved in the TripCache app: sign in with the one-time token, record the scopes the
   * user picked in the app, approve, and go back to the agent. The session only exists for
   * these calls; it is signed out before the redirect.
   */
  const finishFromApp = useCallback(
    async (grant: AppApprovalGrant): Promise<string | null> => {
      finishingFromApp.current = true
      const supabase = getBrowserSupabase()
      const fail = async (message: string) => {
        await supabase.auth.signOut({ scope: "local" }).catch(() => undefined)
        finishingFromApp.current = false
        return message
      }
      const signIn = await supabase.auth.verifyOtp({ token_hash: grant.tokenHash, type: "magiclink" })
      if (signIn.error || !signIn.data.session) return fail("We couldn't sign you in from the app. Please try again.")

      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId)
      if (error || !data) {
        if (isExpiredError(error)) {
          await fail("")
          setView({ name: "error", kind: "expired" })
          return null
        }
        return fail(error?.message || "We couldn't load this connection request.")
      }
      const record = await supabase.rpc("record_mcp_grant", {
        p_client_id: grant.client.id,
        p_client_name: grant.client.name || "This app",
        p_scopes: grant.scopes,
      })
      if (record.error?.hint === "pro_required") {
        const returnUrl = await denyWithoutPro(data, authorizationId)
        clearAppApproval(authorizationId)
        await fail("")
        setView({ name: "pro-required", clientName: grant.client.name || "this app", returnUrl })
        return null
      }
      if (record.error) return fail("We couldn't save your choices, so nothing was connected. Please try again in a moment.")

      let redirectUrl: string
      if ("redirect_url" in data && !("authorization_id" in data)) {
        redirectUrl = data.redirect_url
      } else {
        const approved = await supabase.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })
        if (approved.error || !approved.data?.redirect_url) {
          if (isExpiredError(approved.error)) {
            await fail("")
            setView({ name: "error", kind: "expired" })
            return null
          }
          return fail(approved.error?.message || "We couldn't finish connecting. Please try again.")
        }
        redirectUrl = approved.data.redirect_url
      }
      clearAppApproval(authorizationId)
      setView({ name: "redirecting", host: hostOf(redirectUrl) })
      await supabase.auth.signOut({ scope: "local" }).catch(() => undefined)
      window.location.assign(redirectUrl)
      return null
    },
    [authorizationId],
  )

  switch (view.name) {
    case "loading":
      return <ConsentSkeleton />
    case "sign-in":
      return (
        <SignInCard
          initialError={providerError}
          authorizationId={authorizationId}
          onAppApproved={finishFromApp}
          onProRequired={() => {
            clearAppApproval(authorizationId)
            setView({ name: "pro-required", clientName: "this app", returnUrl: null })
          }}
        />
      )
    case "consent":
      return (
        <ConsentCard
          request={view.request}
          onRedirect={(host) => setView({ name: "redirecting", host })}
          onExpired={() => setView({ name: "error", kind: "expired" })}
        />
      )
    case "redirecting":
      return <RedirectingCard host={view.host} />
    case "pro-required":
      return <ProRequiredCard clientName={view.clientName} returnUrl={view.returnUrl} />
    case "error":
      return <ErrorCard kind={view.kind} message={view.message} />
  }
}

/* ------------------------------------------------------------------ */
/* Frame                                                               */
/* ------------------------------------------------------------------ */

function Shell({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <>
      <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-7">
        <Image src="/app-icon-violet-indigo.png" alt="" width={32} height={32} className="size-8 rounded-[10px] shadow-[0_6px_14px_-6px_rgba(97,43,211,0.6)]" />
        <span className="font-tc-display text-[20px] font-semibold tracking-[-0.01em] text-tc-ink">TripCache</span>
      </div>
      <div className="relative overflow-hidden rounded-[26px] border border-tc-line bg-white p-6 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_30px_60px_-40px_rgba(45,27,87,0.4)] sm:p-8">
        {children}
      </div>
      {footer ? (
        <p className="mt-6 text-center text-[12.5px] leading-5 text-tc-mute">
          <Link href="/privacy" prefetch={false} className="underline-offset-4 hover:text-tc-ink hover:underline">
            Privacy
          </Link>
          <span aria-hidden="true" className="mx-2 text-[#c4c8cc]">·</span>
          <Link href="/terms" prefetch={false} className="underline-offset-4 hover:text-tc-ink hover:underline">
            Terms
          </Link>
          <span aria-hidden="true" className="mx-2 text-[#c4c8cc]">·</span>
          <a href="mailto:support@trip-cache.com" className="underline-offset-4 hover:text-tc-ink hover:underline">
            Help
          </a>
        </p>
      ) : null}
    </>
  )
}

function Title({ children }: { children: ReactNode }) {
  return <h1 className="text-balance font-tc-display text-[26px] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink sm:text-[28px]">{children}</h1>
}

function Notice({ children, tone = "error" }: { children: ReactNode; tone?: "error" | "info" }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cx(
        "rounded-[12px] px-3.5 py-2.5 text-[13.5px] leading-5",
        tone === "error" ? "bg-[#fce7f2] text-[#a3165a]" : "bg-tc-violet-soft text-tc-violet-deep",
      )}
    >
      {children}
    </p>
  )
}

export function ConsentSkeleton() {
  return (
    <Shell footer={false}>
      <div aria-busy="true" aria-live="polite" className="flex flex-col items-center gap-3 py-10 text-tc-mute">
        <Loader2 className="size-6 animate-spin text-tc-violet" aria-hidden="true" />
        <span className="text-[14px]">Loading the request…</span>
      </div>
    </Shell>
  )
}

/* ------------------------------------------------------------------ */
/* Sign in                                                             */
/* ------------------------------------------------------------------ */

const fieldClass =
  "h-12 w-full rounded-[12px] border border-tc-line bg-white px-3.5 text-[16px] text-tc-ink outline-none transition-[border-color,box-shadow] placeholder:text-[#9aa0a6] focus:border-tc-violet focus:shadow-[0_0_0_3px_rgba(97,43,211,0.15)]"

function SignInCard({
  initialError,
  authorizationId,
  onAppApproved,
  onProRequired,
}: {
  initialError: string | null
  authorizationId: string
  onAppApproved: (grant: AppApprovalGrant) => Promise<string | null>
  onProRequired: () => void
}) {
  const id = useId()
  const [mode, setMode] = useState<"password" | "code">("password")
  const [email, setEmail] = useState("")
  const [approval, setApproval] = useState<AppApproval | null>(() => loadAppApproval(authorizationId))
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(initialError)
  // Which form the error belongs to: the app-approval box or the other sign-in methods.
  const [errorAt, setErrorAt] = useState<"app" | "other">("other")
  const [info, setInfo] = useState<string | null>(null)

  const supabase = getBrowserSupabase()

  const withBusy = async (key: string, action: () => Promise<void>) => {
    setBusy(key)
    setError(null)
    setErrorAt(key === "app" ? "app" : "other")
    setInfo(null)
    try {
      await action()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.")
    } finally {
      setBusy(null)
    }
  }

  const onSendToApp = (event: FormEvent) => {
    event.preventDefault()
    withBusy("app", async () => {
      const result = await startAppApproval(authorizationId, email.trim())
      if (result.kind === "rate_limited") throw new Error("Too many requests. Wait a few minutes, or sign in with your password below.")
      if (result.kind === "invalid") throw new Error("This connection request has expired. Go back to the app you were connecting and start again.")
      if (result.kind !== "ok") throw new Error("We couldn't reach TripCache. Check your connection and try again.")
      setApproval(result.approval)
    })
  }

  const signInWithProvider = (provider: "google") =>
    withBusy(provider, async () => {
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.href } })
      if (error) throw error
      // Real Supabase navigates away here; keep the spinner until it does.
      await new Promise((resolve) => setTimeout(resolve, 4000))
    })

  const onPassword = (event: FormEvent) => {
    event.preventDefault()
    withBusy("password", async () => {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (error) throw new Error(error.message === "Invalid login credentials" ? "That email and password don't match a TripCache account." : error.message)
    })
  }

  const onSendCode = (event: FormEvent) => {
    event.preventDefault()
    withBusy("send", async () => {
      const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: false } })
      if (error) {
        throw new Error(/signups? not allowed|not found/i.test(error.message) ? "There's no TripCache account with that email." : error.message)
      }
      setCodeSent(true)
      setInfo(`We sent a code to ${email.trim()}.`)
    })
  }

  const onVerifyCode = (event: FormEvent) => {
    event.preventDefault()
    withBusy("verify", async () => {
      const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: "email" })
      if (error) throw new Error(/expired|invalid/i.test(error.message) ? "That code is wrong or has expired." : error.message)
    })
  }

  const disabled = busy !== null

  if (approval) {
    return (
      <AppApprovalWaiting
        approval={approval}
        onApproved={onAppApproved}
        onProRequired={onProRequired}
        onCancel={(message) => {
          clearAppApproval(authorizationId)
          setApproval(null)
          setError(message ?? null)
          setErrorAt("app")
          setInfo(null)
        }}
      />
    )
  }

  return (
    <Shell>
      <Title>Sign in to continue</Title>
      <p className="mt-2 text-[15px] leading-6 text-tc-ink-2">An app wants to connect to your TripCache account. Sign in to review what it can do.</p>

      <form onSubmit={onSendToApp} className="mt-6 grid gap-3 rounded-[18px] border border-tc-violet/30 bg-tc-violet-soft/40 p-4">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-tc-violet text-white">
            <Smartphone className="size-5" aria-hidden="true" />
          </span>
          <div className="grid gap-0.5">
            <span className="text-[15px] font-semibold text-tc-ink">Approve with the TripCache app</span>
            <span className="text-[13px] leading-5 text-tc-ink-2">No password. We&apos;ll send a request to your phone.</span>
          </div>
        </div>
        <label className="grid gap-1.5" htmlFor={`${id}-app-email`}>
          <span className="text-[13.5px] font-semibold text-tc-ink">Email</span>
          <input
            id={`${id}-app-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            data-testid="app-approval-email"
          />
        </label>
        {error && errorAt === "app" ? <Notice>{error}</Notice> : null}
        <button type="submit" disabled={disabled} className={cx(buttonClass("primary", "lg"), "w-full disabled:opacity-60")} data-testid="app-approval-send">
          {busy === "app" ? <Loader2 className="size-[18px] animate-spin" aria-hidden="true" /> : <Smartphone className="size-[18px]" aria-hidden="true" />}
          Approve with the TripCache app
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-[12.5px] text-tc-mute" aria-hidden="true">
        <span className="h-px flex-1 bg-tc-line" />
        or sign in another way
        <span className="h-px flex-1 bg-tc-line" />
      </div>

      {/* Apple sign-in isn't set up for the web, so only Google is offered here. */}
      <button type="button" disabled={disabled} onClick={() => signInWithProvider("google")} className={cx(buttonClass("secondary", "lg"), "mb-4 w-full disabled:opacity-60")}>
        {busy === "google" ? <Loader2 className="size-[18px] animate-spin" aria-hidden="true" /> : <GoogleLogo />}
        Continue with Google
      </button>

      <div role="tablist" aria-label="Email sign-in method" className="grid grid-cols-2 gap-1 rounded-[14px] border border-tc-line bg-tc-mist p-1">
        {(
          [
            ["password", "Password"],
            ["code", "Email code"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => {
              setMode(value)
              setError(null)
              setInfo(null)
            }}
            className={cx(
              "h-10 rounded-[10px] text-[14px] font-semibold transition-colors",
              mode === value ? "bg-tc-violet text-white shadow-[0_6px_14px_-8px_rgba(97,43,211,0.8)]" : "text-tc-ink-2 hover:text-tc-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {(error && errorAt === "other") || info ? (
        <div className="mt-4 grid gap-3">
          {error && errorAt === "other" ? <Notice>{error}</Notice> : null}
          {info ? <Notice tone="info">{info}</Notice> : null}
        </div>
      ) : null}

      {mode === "password" ? (
        <form onSubmit={onPassword} className="mt-4 grid gap-3">
          <label className="grid gap-1.5" htmlFor={`${id}-email`}>
            <span className="text-[13.5px] font-semibold text-tc-ink">Email</span>
            <input id={`${id}-email`} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} />
          </label>
          <label className="grid gap-1.5" htmlFor={`${id}-password`}>
            <span className="text-[13.5px] font-semibold text-tc-ink">Password</span>
            <input
              id={`${id}-password`}
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </label>
          <button type="submit" disabled={disabled} className={cx(buttonClass("primary", "lg"), "mt-1 w-full disabled:opacity-60")}>
            {busy === "password" ? <Loader2 className="size-[18px] animate-spin" aria-hidden="true" /> : null}
            Sign in
          </button>
        </form>
      ) : (
        <form onSubmit={codeSent ? onVerifyCode : onSendCode} className="mt-4 grid gap-3">
          <label className="grid gap-1.5" htmlFor={`${id}-otp-email`}>
            <span className="text-[13.5px] font-semibold text-tc-ink">Email</span>
            <input
              id={`${id}-otp-email`}
              type="email"
              required
              autoComplete="email"
              value={email}
              readOnly={codeSent}
              onChange={(e) => setEmail(e.target.value)}
              className={cx(fieldClass, codeSent && "bg-tc-mist text-tc-ink-2")}
            />
          </label>
          {codeSent ? (
            <label className="grid gap-1.5" htmlFor={`${id}-code`}>
              <span className="text-[13.5px] font-semibold text-tc-ink">Code from the email</span>
              <input
                id={`${id}-code`}
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6,10}"
                maxLength={10}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className={cx(fieldClass, "text-center text-[20px] font-semibold tracking-[0.3em] [font-variant-numeric:tabular-nums]")}
              />
            </label>
          ) : null}
          <button type="submit" disabled={disabled} className={cx(buttonClass("primary", "lg"), "mt-1 w-full disabled:opacity-60")}>
            {busy === "send" || busy === "verify" ? <Loader2 className="size-[18px] animate-spin" aria-hidden="true" /> : <Mail className="size-[18px]" aria-hidden="true" />}
            {codeSent ? "Verify and sign in" : "Email me a code"}
          </button>
          {codeSent ? (
            <button
              type="button"
              onClick={() => {
                setCodeSent(false)
                setCode("")
                setInfo(null)
              }}
              className="h-10 rounded-[10px] text-[14px] font-semibold text-tc-violet hover:bg-tc-violet-soft"
            >
              Use a different email
            </button>
          ) : null}
        </form>
      )}

      <p className="mt-6 text-center text-[13px] leading-5 text-tc-mute">
        No account yet?{" "}
        <a href="/download" className="font-semibold text-tc-violet underline-offset-4 hover:underline">
          Get the TripCache app
        </a>
      </p>
    </Shell>
  )
}

const POLL_MS = 2000

/** "Check your phone": polls until the request is answered in the app or expires. */
function AppApprovalWaiting({
  approval,
  onApproved,
  onProRequired,
  onCancel,
}: {
  approval: AppApproval
  onApproved: (grant: AppApprovalGrant) => Promise<string | null>
  onProRequired: () => void
  onCancel: (message?: string) => void
}) {
  const [now, setNow] = useState(() => Date.now())
  const [finishing, setFinishing] = useState(false)
  const onApprovedRef = useRef(onApproved)
  const onProRequiredRef = useRef(onProRequired)
  const onCancelRef = useRef(onCancel)
  useEffect(() => {
    onApprovedRef.current = onApproved
    onProRequiredRef.current = onProRequired
    onCancelRef.current = onCancel
  })

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let stopped = false
    let timer: ReturnType<typeof setTimeout> | null = null
    const tick = async () => {
      const result = await claimAppApproval(approval)
      if (stopped) return
      if (result.kind === "approved") {
        setFinishing(true)
        const message = await onApprovedRef.current(result.grant)
        if (!stopped && message !== null && message !== "") onCancelRef.current(message)
        return
      }
      if (result.kind === "pro_required") return onProRequiredRef.current()
      if (result.kind === "denied") return onCancelRef.current("The request was denied in the TripCache app. If that was a mistake, send it again.")
      if (result.kind === "expired" || result.kind === "used") return onCancelRef.current("The request expired before it was approved. Send it again to try once more.")
      if (result.kind === "invalid") return onCancelRef.current("This request is no longer valid. Send it again.")
      timer = setTimeout(tick, POLL_MS)
    }
    timer = setTimeout(tick, POLL_MS)
    return () => {
      stopped = true
      if (timer) clearTimeout(timer)
    }
  }, [approval])

  const secondsLeft = Math.max(0, Math.floor((Date.parse(approval.expiresAt) - now) / 1000))
  useEffect(() => {
    if (secondsLeft === 0 && !finishing) onCancelRef.current("The request expired before it was approved. Send it again to try once more.")
  }, [secondsLeft, finishing])

  if (finishing) {
    return (
      <Shell footer={false}>
        <div role="status" className="flex flex-col items-center gap-3 py-8 text-center">
          <Loader2 className="size-7 animate-spin text-tc-violet" aria-hidden="true" />
          <Title>Approved</Title>
          <p className="text-[14.5px] leading-6 text-tc-ink-2">Finishing the connection…</p>
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="flex flex-col items-center text-center" aria-live="polite">
        <span className="grid size-14 place-items-center rounded-[18px] bg-tc-violet-soft text-tc-violet">
          <Smartphone className="size-7" aria-hidden="true" />
        </span>
        <div className="mt-5">
          <Title>Check your phone</Title>
        </div>
        <p className="mt-2 text-[15px] leading-6 text-tc-ink-2">
          Open the TripCache notification, or the app itself, and tap this number:
        </p>
        <div
          className="mt-5 grid h-24 w-32 place-items-center rounded-[22px] border-2 border-tc-violet bg-tc-violet-soft/50 font-tc-display text-[52px] font-semibold tracking-[0.02em] text-tc-violet-deep [font-variant-numeric:tabular-nums]"
          data-testid="app-approval-number"
          aria-label={`Number ${approval.matchNumber}`}
        >
          {approval.matchNumber}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[13px] text-tc-mute">
          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          Waiting for approval · {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
        </p>
      </div>

      <p className="mt-6 text-[12.5px] leading-5 text-tc-mute">
        No notification? Open TripCache on your phone; the request shows up there while this page is open. It only works if this email has a TripCache account.
      </p>

      <button type="button" onClick={() => onCancel()} className={cx(buttonClass("secondary", "lg"), "mt-5 w-full")}>
        Use a password or email code instead
      </button>
    </Shell>
  )
}

/* ------------------------------------------------------------------ */
/* Consent                                                             */
/* ------------------------------------------------------------------ */

function ConsentCard({
  request,
  onRedirect,
  onExpired,
}: {
  request: ConsentRequest
  onRedirect: (host: string | null) => void
  onExpired: () => void
}) {
  const draftsId = useId()
  const [allowDrafts, setAllowDrafts] = useState(false)
  const [busy, setBusy] = useState<"approve" | "deny" | "switch" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const supabase = getBrowserSupabase()
  const { email, mode, redirectHost } = request
  const clientName = request.client.name?.trim() || "This app"

  const follow = (redirectUrl: string) => {
    onRedirect(hostOf(redirectUrl))
    window.location.assign(redirectUrl)
  }

  const approve = async () => {
    setBusy("approve")
    setError(null)
    const scopes = allowDrafts ? [SCOPE_TRIPS_READ, SCOPE_BOOKINGS_DRAFT] : [SCOPE_TRIPS_READ]
    const grant = await supabase.rpc("record_mcp_grant", {
      p_client_id: request.client.id,
      p_client_name: clientName,
      p_scopes: scopes,
    })
    if (grant.error) {
      setBusy(null)
      setError(
        grant.error.hint === "pro_required"
          ? "Connecting AI assistants is a TripCache Pro feature. Upgrade in the TripCache app (Profile → Pro) to use it."
          : "We couldn't save your choices, so nothing was connected. Please try again in a moment.",
      )
      return
    }
    if (mode.kind === "reconsent") {
      follow(mode.redirectUrl)
      return
    }
    const { data, error } = await supabase.auth.oauth.approveAuthorization(mode.authorizationId, { skipBrowserRedirect: true })
    if (error || !data?.redirect_url) {
      setBusy(null)
      if (isExpiredError(error)) onExpired()
      else setError(error?.message || "We couldn't finish connecting. Please try again.")
      return
    }
    follow(data.redirect_url)
  }

  const deny = async () => {
    setBusy("deny")
    setError(null)
    if (mode.kind === "reconsent") {
      // Supabase still counts this client as consented; drop that too so it can't auto-approve again.
      await supabase.auth.oauth.revokeGrant({ clientId: request.client.id })
      follow(deniedRedirect(mode.redirectUrl))
      return
    }
    const { data, error } = await supabase.auth.oauth.denyAuthorization(mode.authorizationId, { skipBrowserRedirect: true })
    if (error || !data?.redirect_url) {
      setBusy(null)
      if (isExpiredError(error)) onExpired()
      else setError(error?.message || "We couldn't cancel the request. You can close this page.")
      return
    }
    follow(data.redirect_url)
  }

  const switchAccount = async () => {
    setBusy("switch")
    await supabase.auth.signOut({ scope: "local" })
  }

  const disabled = busy !== null

  return (
    <Shell>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-tc-violet-soft font-tc-display text-[22px] font-semibold text-tc-violet"
        >
          {clientName.charAt(0).toUpperCase()}
        </span>
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-1 rounded-full bg-[#c4c8cc]" />
          <span className="size-1 rounded-full bg-[#c4c8cc]" />
          <span className="size-1 rounded-full bg-[#c4c8cc]" />
        </span>
        <Image src="/app-icon-violet-indigo.png" alt="" width={48} height={48} className="size-12 rounded-[14px] shadow-[0_6px_14px_-6px_rgba(97,43,211,0.6)]" />
      </div>

      <div className="mt-5">
        <Title>
          Connect {clientName} to TripCache
        </Title>
        <p className="mt-2 text-[15px] leading-6 text-tc-ink-2">
          {clientName} is asking to use your TripCache account.
        </p>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-[16px] bg-tc-mist px-4 py-3">
        <Globe className="mt-0.5 size-[18px] shrink-0 text-tc-mute" aria-hidden="true" />
        <div className="min-w-0 text-[13.5px] leading-5">
          <div className="text-tc-mute">After you choose, you&apos;ll go back to</div>
          <div className="break-all font-semibold text-tc-ink" data-testid="redirect-host">
            {redirectHost || "an unknown address"}
          </div>
        </div>
      </div>

      <h2 className="mt-6 text-[14.5px] font-semibold text-tc-ink">{clientName} will be able to</h2>
      <ul className="mt-3 grid gap-2.5">
        <li className="flex items-start gap-3 rounded-[16px] border border-tc-line px-4 py-3.5">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-tc-violet text-white">
            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="text-[14.5px] leading-[22px] text-tc-ink">See your trips, flights, live flight status, document names and expenses</span>
        </li>
        <li>
          <label
            htmlFor={draftsId}
            className={cx(
              "flex cursor-pointer items-start gap-3 rounded-[16px] border px-4 py-3.5 transition-colors",
              allowDrafts ? "border-tc-violet bg-tc-violet-soft/50" : "border-tc-line hover:bg-tc-mist",
            )}
          >
            <input
              id={draftsId}
              type="checkbox"
              checked={allowDrafts}
              disabled={disabled}
              onChange={(e) => setAllowDrafts(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cx(
                "mt-0.5 grid size-6 shrink-0 place-items-center rounded-[7px] border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#4d20af]",
                allowDrafts ? "border-tc-violet bg-tc-violet text-white" : "border-[#c4c8cc] bg-white text-transparent",
              )}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="grid gap-0.5">
              <span className="text-[14.5px] leading-[22px] text-tc-ink">Add plans and expenses to your trips, and import bookings as drafts</span>
              <span className="text-[12.5px] leading-5 text-tc-mute">Optional. You can edit or delete anything it adds; imported bookings wait for you in the app.</span>
            </span>
          </label>
        </li>
      </ul>

      <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-5 text-tc-mute">
        <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        <span>It never sees your password. Only connect apps you trust.</span>
      </p>

      {error ? (
        <div className="mt-4">
          <Notice>{error}</Notice>
        </div>
      ) : null}

      <div className="mt-6 grid gap-2.5 sm:grid-cols-[1fr_1.4fr]">
        <button type="button" disabled={disabled} onClick={deny} className={cx(buttonClass("secondary", "lg"), "order-2 w-full disabled:opacity-60 sm:order-1")}>
          {busy === "deny" ? <Loader2 className="size-[18px] animate-spin" aria-hidden="true" /> : null}
          Cancel
        </button>
        <button type="button" disabled={disabled} onClick={approve} className={cx(buttonClass("primary", "lg"), "order-1 w-full disabled:opacity-60 sm:order-2")}>
          {busy === "approve" ? <Loader2 className="size-[18px] animate-spin" aria-hidden="true" /> : null}
          Allow access
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-tc-line pt-4 text-[13px] leading-5">
        <span className="min-w-0 text-tc-mute">
          Signed in as <span className="break-all font-semibold text-tc-ink-2">{email}</span>
        </span>
        <button type="button" disabled={disabled} onClick={switchAccount} className="font-semibold text-tc-violet underline-offset-4 hover:underline disabled:opacity-60">
          Not you?
        </button>
      </div>
    </Shell>
  )
}

/* ------------------------------------------------------------------ */
/* Redirecting and errors                                              */
/* ------------------------------------------------------------------ */

function RedirectingCard({ host }: { host: string | null }) {
  return (
    <Shell footer={false}>
      <div role="status" className="flex flex-col items-center gap-3 py-8 text-center">
        <Loader2 className="size-7 animate-spin text-tc-violet" aria-hidden="true" />
        <Title>Taking you back</Title>
        <p className="text-[14.5px] leading-6 text-tc-ink-2">
          Returning you to <span className="break-all font-semibold text-tc-ink">{host || "the app"}</span>. You can close this page if nothing happens.
        </p>
      </div>
    </Shell>
  )
}

/** Free account: the request was denied; point to Pro in the app. */
function ProRequiredCard({ clientName, returnUrl }: { clientName: string; returnUrl: string | null }) {
  return (
    <Shell>
      <div className="flex flex-col items-start gap-4" data-testid="pro-required">
        <span className="grid size-12 place-items-center rounded-[14px] bg-tc-violet-soft text-tc-violet">
          <Sparkles className="size-6" aria-hidden="true" />
        </span>
        <Title>Connecting AI assistants is a TripCache Pro feature</Title>
        <p className="text-[15px] leading-6 text-tc-ink-2">
          With Pro, {clientName} can read your trips and live flight status and add plans for you. Upgrade in the TripCache app,
          then connect again. Nothing was connected this time.
        </p>
        <a href={PRO_PAYWALL_URL} className={cx(buttonClass("primary", "lg"), "w-full")} data-testid="open-pro">
          <Sparkles className="size-[18px]" aria-hidden="true" />
          Open TripCache Pro
        </a>
        <p className="text-[12.5px] leading-5 text-tc-mute">On a computer? Open TripCache on your phone and go to Profile → Pro.</p>
        {returnUrl ? (
          <button type="button" onClick={() => window.location.assign(returnUrl)} className={cx(buttonClass("secondary", "lg"), "w-full")}>
            Back to {clientName}
          </button>
        ) : (
          <p className="text-[13px] leading-5 text-tc-ink-2">You can close this page.</p>
        )}
      </div>
    </Shell>
  )
}

const ERROR_COPY: Record<ErrorKind, { title: string; body: string }> = {
  missing: {
    title: "This link isn't complete",
    body: "The connection request is missing from this address. Go back to the app you were connecting and start again from there.",
  },
  expired: {
    title: "This request has expired",
    body: "Connection requests only last a few minutes and can be used once. Go back to the app you were connecting and start again.",
  },
  reconnect: {
    title: "Please connect again",
    body: "This app's access to TripCache was turned off. Go back to the app you were connecting and start again to review what it can do.",
  },
  failed: {
    title: "Something went wrong",
    body: "We couldn't load this connection request. Check your connection and try again.",
  },
}

function ErrorCard({ kind, message }: { kind: ErrorKind; message?: string }) {
  const copy = ERROR_COPY[kind]
  return (
    <Shell>
      <div className="flex flex-col items-start gap-4">
        <span className="grid size-12 place-items-center rounded-[14px] bg-[#fff5d6] text-[#b54708]">
          <AlertTriangle className="size-6" aria-hidden="true" />
        </span>
        <Title>{copy.title}</Title>
        <p className="text-[15px] leading-6 text-tc-ink-2">{copy.body}</p>
        {kind === "failed" && message ? <p className="text-[12.5px] leading-5 text-tc-mute">Details: {message}</p> : null}
        {kind === "failed" ? (
          <button type="button" onClick={() => window.location.reload()} className={cx(buttonClass("primary", "lg"), "w-full")}>
            Try again
          </button>
        ) : null}
      </div>
    </Shell>
  )
}

/* ------------------------------------------------------------------ */
/* Provider marks                                                      */
/* ------------------------------------------------------------------ */

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  )
}
