import type { NextConfig } from 'next';

const configuredAssetUrl =
  process.env.NEXT_PUBLIC_ASSET_ORIGIN ?? process.env.BACKEND_API_URL ?? 'http://localhost:5000';
const assetOrigin = new URL(configuredAssetUrl).origin;
const configuredFrontendUrl =
  process.env.NEXT_PUBLIC_FRONTEND_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  'http://localhost:3000';
const frontendOrigin = new URL(configuredFrontendUrl).origin;

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      new URL('/uploads/therapy-toys/**', assetOrigin),
      new URL('/figma/explore/**', frontendOrigin),
    ],
  },
};

export default nextConfig;
