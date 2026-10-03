import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // PT-PT spelling and the V2 brief route both land on the existing page.
      { source: '/:locale/contacto', destination: '/:locale/contato', permanent: true },
    ];
  },
};

export default nextConfig;
