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
├── components/
│   ├── navigation.tsx        # Header navigation
│   ├── hero-section.tsx      # Hero section
│   ├── features-section.tsx  # Features grid
│   ├── how-it-works-section.tsx
│   ├── cta-section.tsx       # Email capture form
│   ├── footer.tsx            # Footer
│   └── blog-card.tsx         # Blog post card
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

Blog posts are currently stored as data objects in the page files. To add a new blog post:

1. Add the post metadata to the `blogPosts` array in `app/blog/page.tsx`
2. Add the full post content to the `blogPosts` object in `app/blog/[slug]/page.tsx`

For a production site, consider using MDX files or a headless CMS.

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
