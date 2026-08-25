import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const socialImageAlt =
  "TripCache travel itinerary app for booking emails and cancellation deadlines"

export const socialImageSize = {
  width: 1200,
  height: 630,
}

export async function createSocialPreview() {
  const [icon, screenshot] = await Promise.all([
    readFile(join(process.cwd(), "public/app-icon.png")),
    readFile(join(process.cwd(), "public/app-screenshot-import-og.png")),
  ])
  const iconSource = `data:image/png;base64,${icon.toString("base64")}`
  const screenshotSource = `data:image/png;base64,${screenshot.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          background: "#f4f0e8",
          color: "#121212",
          fontFamily: "sans-serif",
          padding: "58px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            borderRadius: 430,
            right: -90,
            top: -110,
            background: "#c3b0ee",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* next/image is not supported inside ImageResponse markup. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSource}
              width={52}
              height={52}
              style={{ borderRadius: 14 }}
              alt=""
            />
            <div style={{ fontSize: 26, fontWeight: 700 }}>TripCache</div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 54,
              color: "#4d20af",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Travel itinerary organizer app
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 18,
              maxWidth: 760,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.045em",
            }}
          >
            Turn booking emails into one organized travel itinerary.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
            {["Cancellation deadlines", "Documents & receipts", "Expense records"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  border: "1px solid rgba(41,37,31,0.13)",
                  borderRadius: 999,
                  padding: "10px 16px",
                  background: "rgba(255,255,255,0.45)",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: 250,
              height: 540,
              marginTop: 8,
              padding: "18px 22px 0",
              overflow: "hidden",
              borderRadius: "42px 42px 0 0",
              background: "#e6d7c5",
              boxShadow: "0 28px 60px rgba(65,45,28,0.20)",
            }}
          >
            {/* next/image is not supported inside ImageResponse markup. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotSource}
              width={190}
              height={410}
              style={{ objectFit: "cover", objectPosition: "top", borderRadius: "28px 28px 0 0" }}
              alt=""
            />
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  )
}
