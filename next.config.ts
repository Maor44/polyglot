import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack is default in Next.js 16 — explicitly opt in to silence warnings
  turbopack: {},
};

// PWA setup: only wrap with next-pwa when building with webpack (not turbopack)
// To build with PWA: next build --webpack
// For development: next dev (uses turbopack by default)
async function getConfig(): Promise<NextConfig> {
  if (process.env.BUNDLE_WITH_WEBPACK === '1') {
    const withPWAInit = (await import('@ducanh2912/next-pwa')).default;
    const withPWA = withPWAInit({
      dest: 'public',
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      workboxOptions: {
        disableDevLogs: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 },
            },
          },
        ],
      },
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
}

export default getConfig();
