import "../../secondary.css"

import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { LegalLayout, LegalNote, LegalSection, legalAnchor, legalLinkClass } from "@/components/site/company-legal"
import { Breadcrumbs, PageHero, SitePage } from "@/components/site/kit"
import { MCP_SERVER_URL } from "@/lib/ai-agents"
import { createPageMetadata } from "@/lib/seo-metadata"

/*
 * Public documentation of the TripCache MCP server: what the assistant
 * directories (Claude Connectors Directory, ChatGPT plugins, Meta Muse
 * Connector Platform) ask a listing to link to. Tool names, permissions,
 * fields and limits mirror trip-cache-app supabase/functions/mcp (pure.ts
 * TOOLS, the mcp_* migrations' rate limits). Change them there first.
 */

export const metadata: Metadata = createPageMetadata({
  title: "TripCache MCP Server Documentation",
  description:
    "How the TripCache MCP server works: server URL, OAuth sign-in, permissions, every tool with its inputs and side effects, rate limits, errors and troubleshooting.",
  path: "/ai-agents/mcp",
  keywords: ["TripCache MCP documentation", "TripCache MCP tools"],
})

type Tool = { name: string; kind: "Read" | "Write"; does: string; inputs: string; effect: string }

const TOOLS: Tool[] = [
  { name: "list_trips", kind: "Read", does: "Lists your trips, newest first or upcoming first.", inputs: "when (all, upcoming, past), limit, cursor", effect: "None." },
  { name: "get_trip", kind: "Read", does: "One trip with its flights, hotel stays, cars, activities, spending summary, checklist progress and next reminders.", inputs: "trip_id", effect: "None." },
  { name: "next_flight", kind: "Read", does: "Your next flight that hasn't landed, with live status, gate, terminal, baggage belt and delay.", inputs: "None", effect: "None." },
  { name: "get_flight", kind: "Read", does: "One flight with live status, gate, terminal, belt, delay and aircraft position when tracked.", inputs: "flight_id", effect: "None." },
  { name: "get_booking", kind: "Read", does: "One hotel stay, car, transport leg, restaurant, event, activity or meeting, with its local times and place.", inputs: "plan_item_id, or type with an optional trip_id and query", effect: "None." },
  { name: "list_documents", kind: "Read", does: "Names and types of your saved travel documents. Files and links are never returned.", inputs: "trip_id (optional), limit, cursor", effect: "None." },
  { name: "list_expenses", kind: "Read", does: "Expenses on your trips with totals per currency and category, and trip budgets.", inputs: "trip_id (optional), limit, cursor", effect: "None." },
  { name: "add_plan_item", kind: "Write", does: "Adds a car, hotel stay, activity, event, transport leg or other plan to one of your trips.", inputs: "trip_id, type, title, start_local and optional end_local with IANA time zones, provider, location, address, end_location, confirmation, notes", effect: "Creates one item, marked as added by the assistant. You can edit or delete it in the app." },
  { name: "add_expense", kind: "Write", does: "Logs an expense on one of your trips.", inputs: "trip_id, title, amount, currency (ISO 4217), category, date", effect: "Creates one expense, marked as added by the assistant. You can edit or delete it in the app." },
  { name: "import_booking", kind: "Write", does: "Sends a booking confirmation (email text or a PDF) to TripCache's importer.", inputs: "text or pdf_base64, optional filename and trip_id", effect: "Creates a draft you review and confirm in the app. Nothing is added to a trip until you do. Uses your AI import allowance." },
]

const LIMITS = [
  { what: "Reads", limit: "60 a minute per assistant, 120 a minute per account" },
  { what: "Discovery (initialize, tools/list)", limit: "120 a minute per assistant" },
  { what: "add_plan_item", limit: "50 a day per assistant, 100 a day per account" },
  { what: "add_expense", limit: "50 a day per assistant, 100 a day per account" },
  { what: "import_booking", limit: "20 a day per assistant, 30 a day per account, plus your plan's AI import allowance" },
  { what: "Request size", limit: "8 MB (a PDF up to about 5.9 MB), booking text up to 60,000 characters" },
  { what: "Response size", limit: "About 32 KB; longer lists are paginated with a cursor" },
]

const ERRORS = [
  { code: "401 with WWW-Authenticate", meaning: "No token, or the token is expired or not a connected-app token. The assistant signs in again." },
  { code: "403 insufficient_scope", meaning: "The tool needs permission to add, and the connection only allows reading, or the connection was revoked. Reconnect and allow it." },
  { code: "pro_required", meaning: "The account doesn't have TripCache Pro. Returned as a tool error the assistant can show." },
  { code: "429 rate_limited", meaning: "A limit above was reached. Retry after the number of seconds in Retry-After." },
  { code: "invalid_arguments", meaning: "An input was missing or the wrong shape. The message names the field." },
  { code: "not_found", meaning: "That trip, flight or booking isn't in this account." },
  { code: "invalid_cursor", meaning: "A pagination cursor was changed or reused from another list. Start the list again." },
  { code: "import_unavailable", meaning: "import_booking couldn't start: the AI import allowance is used up, or the file couldn't be read." },
]

const TROUBLE = [
  { q: "The assistant says it can't connect.", a: `Check that the link is exactly ${MCP_SERVER_URL} and that the assistant is set to OAuth. Remove the connector, add it again, and finish the sign-in within 10 minutes.` },
  { q: "The sign-in page timed out.", a: "The approval request lasts 10 minutes. Start connecting again, or sign in with your password or an email code instead of the phone number." },
  { q: "Every request fails after I revoked access.", a: "That's expected. Remove TripCache from the assistant and connect it again to give it a new approval." },
  { q: "It can read my trips but can't add anything.", a: "The connection was approved for reading only. Reconnect and tick “Add plans and expenses to your trips, and import bookings as drafts” on the TripCache approval page." },
  { q: "It says I need TripCache Pro.", a: "Connecting AI assistants is part of TripCache Pro. Plans are on the pricing page." },
  { q: "I see text instead of TripCache cards.", a: "Cards show in assistants that support MCP Apps, such as Claude and ChatGPT on the web and desktop. Other assistants answer in text with the same data." },
  { q: "An imported booking didn't appear in my trip.", a: "import_booking creates a draft. Open TripCache → Drafts to review and confirm it." },
]

const sections = [
  "Overview",
  "Connect",
  "Sign-in and permissions",
  "Tools",
  "Data returned",
  "Limits",
  "Errors",
  "Troubleshooting",
  "Support and security",
]

export default function McpDocsPage() {
  const contents = sections.map((title) => ({ id: legalAnchor(title), title }))
  const th = "border-b border-tc-line py-2 pr-4 text-left text-[14px] font-semibold text-tc-ink"
  const td = "border-b border-tc-line py-2.5 pr-4 align-top text-[15px] leading-6 text-tc-ink-2"

  return (
    <SitePage>
      <PageHero
        breadcrumb={<Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "AI agents", href: "/ai-agents" }, { name: "MCP server" }]} />}
        title="TripCache MCP server"
        lede={
          <p>
            Documentation for the remote MCP server that connects TripCache to AI assistants such as Claude and ChatGPT.
            Updated November 4, 2026.
          </p>
        }
      />

      <LegalLayout label="MCP server" contents={contents}>
        <LegalSection id={legalAnchor("Overview")} title="Overview">
          <p>
            TripCache keeps the trips you&apos;ve already booked: flights with live gate, terminal, belt and delay, hotel stays, cars,
            activities, documents and spending. The MCP server lets an assistant you connect answer questions about them and,
            if you allow it, add plans, expenses and booking drafts. It never books, pays, deletes or shares anything.
          </p>
          <p>
            You need a TripCache account with TripCache Pro. TripCache is free on iPhone and Android; see{" "}
            <Link className={legalLinkClass} href="/pricing">
              pricing
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection id={legalAnchor("Connect")} title="Connect">
          <p>
            Server URL: <code className="break-all rounded bg-tc-mist px-1.5 py-0.5 text-[15px]">{MCP_SERVER_URL}</code>
          </p>
          <p>
            Transport: Streamable HTTP (JSON responses, stateless). MCP protocol versions 2025-03-26, 2025-06-18, 2025-11-25 and
            2026-07-28. Step-by-step guides for each assistant are on the{" "}
            <Link className={legalLinkClass} href="/ai-agents">
              AI agents page
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection id={legalAnchor("Sign-in and permissions")} title="Sign-in and permissions">
          <p>
            OAuth 2.1 with PKCE (S256). The server publishes protected resource metadata (RFC 9728) at{" "}
            <code className="break-all rounded bg-tc-mist px-1.5 py-0.5 text-[15px]">https://trip-cache.com/.well-known/oauth-protected-resource/mcp</code>{" "}
            and answers unauthenticated requests with 401 and a <code>WWW-Authenticate</code> header that points to it. The
            authorization server supports dynamic client registration and pre-registered clients.
          </p>
          <p>
            During sign-in, TripCache shows a number to tap in the TripCache app on your phone; a password or an email code also
            works. The approval page then asks what the assistant may do:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>See your trips, flights, live flight status, document names and expenses</strong> (always on): the read tools below.
            </li>
            <li>
              <strong>Add plans and expenses to your trips, and import bookings as drafts</strong> (off unless you tick it): add_plan_item, add_expense and import_booking.
            </li>
          </ul>
          <p>
            Revoke a connection at any time in TripCache → Profile → AI agents. Its next request is refused.
          </p>
        </LegalSection>

        <LegalSection id={legalAnchor("Tools")} title="Tools">
          <p>
            Every tool has a title and the MCP annotations readOnlyHint, destructiveHint, idempotentHint and openWorldHint. Read
            tools are read-only. Write tools only add; none of them changes or deletes existing data, so none is destructive.
            All tools act on the connected account only (openWorldHint false).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className={th}>Tool</th>
                  <th className={th}>Type</th>
                  <th className={th}>What it does</th>
                  <th className={th}>Inputs</th>
                  <th className={th}>Side effects</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((tool) => (
                  <tr key={tool.name}>
                    <td className={`${td} font-mono text-[13.5px]`}>{tool.name}</td>
                    <td className={td}>{tool.kind}</td>
                    <td className={td}>{tool.does}</td>
                    <td className={td}>{tool.inputs}</td>
                    <td className={td}>{tool.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Results come as structured content with a text copy. In assistants that support MCP Apps, flights, trips, bookings,
            expenses, documents and imports also render as TripCache cards. The cards load no scripts or data from elsewhere;
            only images come from TripCache&apos;s asset CDN.
          </p>
        </LegalSection>

        <LegalSection id={legalAnchor("Data returned")} title="Data returned">
          <p>
            Trip names, dates and destinations; flight numbers, airlines, airports, times, gate, terminal, belt, delay and aircraft
            position; names, places and local times of plans; expense titles, amounts, currencies, categories and budgets; document
            names and types; checklist progress and reminder titles.
          </p>
          <p>
            Never returned: confirmation and ticket numbers, booking notes, booking prices, document files or links, passwords or
            payment details. Text that came from booking emails is cleaned of links, images and hidden characters, capped at 500
            characters per field, and marked as untrusted so the assistant treats it as data. Full details are in the{" "}
            <Link className={legalLinkClass} href="/privacy#ai-assistant-connections">
              privacy policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection id={legalAnchor("Limits")} title="Limits">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <tbody>
                {LIMITS.map((row) => (
                  <tr key={row.what}>
                    <td className={`${td} font-semibold text-tc-ink`}>{row.what}</td>
                    <td className={td}>{row.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection id={legalAnchor("Errors")} title="Errors">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse">
              <tbody>
                {ERRORS.map((row) => (
                  <tr key={row.code}>
                    <td className={`${td} font-mono text-[13.5px] text-tc-ink`}>{row.code}</td>
                    <td className={td}>{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection id={legalAnchor("Troubleshooting")} title="Troubleshooting">
          <dl className="space-y-5">
            {TROUBLE.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-tc-ink">{item.q}</dt>
                <dd className="mt-1">{item.a}</dd>
              </div>
            ))}
          </dl>
        </LegalSection>

        <LegalSection id={legalAnchor("Support and security")} title="Support and security">
          <p>
            Help with connecting:{" "}
            <a className={legalLinkClass} href="mailto:support@trip-cache.com">
              support@trip-cache.com
            </a>
            . Privacy requests:{" "}
            <a className={legalLinkClass} href="mailto:privacy@trip-cache.com">
              privacy@trip-cache.com
            </a>
            . To report a security issue, email{" "}
            <a className={legalLinkClass} href="mailto:support@trip-cache.com?subject=Security">
              support@trip-cache.com
            </a>{" "}
            with “Security” in the subject.
          </p>
        </LegalSection>

        <LegalNote>
          See also the{" "}
          <Link className={legalLinkClass} href="/support">
            support page
          </Link>
          ,{" "}
          <Link className={legalLinkClass} href="/privacy">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link className={legalLinkClass} href="/terms">
            terms
          </Link>
          .
        </LegalNote>
      </LegalLayout>
      <Footer />
    </SitePage>
  )
}
