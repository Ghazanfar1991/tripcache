/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [64, 96, 128, 256, 384],
    qualities: [50, 55, 60, 75],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance headers
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.trip-cache.com',
          },
        ],
        destination: 'https://trip-cache.com/:path*',
        statusCode: 308,
      },
      {
        source: '/blog/best-travel-apps-2026',
        destination: '/blog/best-travel-apps-2025',
        permanent: true,
      },
      {
        source: '/blog/tripcase-shutdown-legacy-migration',
        destination: '/blog/tripcase-shutdown-what-now',
        permanent: true,
      },
      {
        source: '/blog/tripcase-alternative-2026',
        destination: '/blog/tripcase-alternative-2025',
        permanent: true,
      },
      {
        source: '/blog/tripit-vs-tripcache-comparison-2026',
        destination: '/blog/tripit-vs-tripcache-comparison-2025',
        permanent: true,
      },
      {
        source: '/blog/travel-document-organization-guide-2026',
        destination: '/blog/best-travel-document-organizer-app-2026',
        permanent: true,
      },
      {
        source: '/blog/travel-document-organization-guide-2025',
        destination: '/blog/best-travel-document-organizer-app-2026',
        permanent: true,
      },
      {
        source: '/blog/travel-expense-tracking',
        destination: '/blog/business-travel-expense-reporting-app-2026',
        permanent: true,
      },
      {
        source: '/blog/digital-nomad-organization',
        destination: '/blog/business-travel-management-guide-2026',
        permanent: true,
      },
      {
        source: '/blog/getting-started-with-tripcache',
        destination: '/features',
        permanent: true,
      },
      {
        source: '/blog/frequent-flyer-tips',
        destination: '/blog/organize-travel-confirmation-emails-2026',
        permanent: true,
      },
      {
        source: '/blog/how-to-automatically-track-flights-2025',
        destination: '/blog/organize-travel-confirmation-emails-2026',
        permanent: true,
      },
      {
        source: '/blog/tripit-alternatives',
        destination: '/blog/best-tripit-alternatives-2026',
        permanent: true,
      },
      {
        source: '/blog/best-tripit-alternatives',
        destination: '/blog/best-tripit-alternatives-2026',
        permanent: true,
      },
      {
        source: '/blog/ai-travel-organizer',
        destination: '/blog/ai-travel-organizer-app-2026',
        permanent: true,
      },
      {
        source: '/blog/email-to-itinerary-app',
        destination: '/blog/ai-travel-organizer-app-2026',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Enable compression
  compress: true,
}

export default nextConfig
