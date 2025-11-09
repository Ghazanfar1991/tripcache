# TripCache Marketing Website

A modern, responsive marketing website for TripCache - the smart flight and trip itinerary manager.

## Features

- **Modern Design System**: Premium dark theme with carefully selected colors and typography
- **Responsive Layout**: Mobile-first design that works beautifully on all devices
- **Blog System**: Built-in blog with category filtering and individual post pages
- **Email Capture**: Mailchimp integration for newsletter subscriptions
- **Performance Optimized**: Built with Next.js 16 for lightning-fast loading

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui component library
- **Email Marketing**: Mailchimp API integration
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Mailchimp account (for email capture functionality)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_AUDIENCE_ID=your_audience_id
   MAILCHIMP_API_SERVER=your_server_prefix (e.g., us1, us2)
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Mailchimp Setup

To enable email capture functionality:

1. **Get your API Key**:
   - Log in to Mailchimp
   - Go to Account → Extras → API Keys
   - Create a new API key or use an existing one

2. **Get your Audience ID**:
   - Go to Audience → All contacts → Settings → Audience name and defaults
   - Copy the Audience ID

3. **Find your API Server**:
   - Your API server prefix is in your API key URL
   - Example: if your API key URL is `https://us1.api.mailchimp.com`, your server is `us1`

4. Add these values to your `.env.local` file

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Landing page
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/page.tsx   # Individual blog posts
│   └── api/
│       └── subscribe/
│           └── route.ts      # Mailchimp API endpoint
├── components/               # UI components
├── content/
│   └── blog/                 # Markdown (TS) sources for every blog post
├── lib/
│   └── blog.tsx              # Blog helpers + data access layer
└── public/                   # Static assets
\`\`\`

## Customization

### Colors

The color system is defined in `app/globals.css` using CSS custom properties. Modify the design tokens to match your brand:

\`\`\`css
:root {
  --primary: oklch(0.45 0.15 264);
  --accent: oklch(0.65 0.2 220);
  /* ... other colors */
}
\`\`\`

### Typography

Fonts are configured in `app/layout.tsx` using Next.js font optimization:

\`\`\`tsx
import { Inter, Geist_Mono } from 'next/font/google'
\`\`\`

### Blog Posts

Each article now lives in `content/blog/<slug>.ts`. Every file exports a strongly typed `metadata` object (slug, title, excerpt, dates, etc.) and a `body` template literal that contains the Markdown content. The helper in `lib/blog.tsx` automatically registers every post so both the listing page and individual routes share the same source of truth.

To publish a new article:

1. Duplicate one of the files in `content/blog/` and update its `metadata` block plus the `body` string (feel free to keep using Markdown syntax inside the template literal).
2. (Optional) Adjust the hero image in `public/` and reference it from the metadata `image` field.
3. Commit the file—no additional wiring is required; the sitemap, listing page, and dynamic route will pick it up automatically.

## Deployment

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Environment Variables

Required environment variables for production:

- `MAILCHIMP_API_KEY`: Your Mailchimp API key
- `MAILCHIMP_AUDIENCE_ID`: Your Mailchimp audience/list ID
- `MAILCHIMP_API_SERVER`: Your Mailchimp API server prefix

## License

MIT

## Support

For questions or issues, please open an issue on GitHub or contact support@tripcache.com
