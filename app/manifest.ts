import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "TripCache: Smart Trip Planner",
    short_name: "TripCache",
    description:
      "Basic is free: cancellation-deadline and check-in reminders, a document vault, expenses, and CSV or PDF export. Pro adds booking-email import, live flight-status alerts on supported flights, and Live Activity and widgets.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#f4f0e8",
    theme_color: "#602ad2",
    lang: "en",
    dir: "ltr",
    categories: ["travel", "productivity"],
    icons: [
      {
        src: "/app-icon-violet-indigo.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/app-ui-home.webp",
        sizes: "1322x2720",
        type: "image/webp",
        form_factor: "narrow",
        label: "TripCache itinerary home screen",
      },
    ],
    prefer_related_applications: false,
    related_applications: [
      {
        platform: "itunes",
        url: "https://apps.apple.com/app/id6758403056",
        id: "6758403056",
      },
      {
        platform: "play",
        url: "https://play.google.com/store/apps/details?id=app.tripcache",
        id: "app.tripcache",
      },
    ],
  }
}
