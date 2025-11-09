import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER // e.g., 'us1', 'us2', etc.

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_API_SERVER) {
      console.error("Missing Mailchimp environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Mailchimp API endpoint
    const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`

    // Subscribe user to Mailchimp
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        tags: ["TripCache Landing Page"],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Handle specific Mailchimp errors
      if (data.title === "Member Exists") {
        return NextResponse.json({ error: "This email is already subscribed" }, { status: 400 })
      }
      console.error("Mailchimp API error:", data)
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Successfully subscribed!" }, { status: 200 })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
