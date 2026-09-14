import type { NextConfig } from 'next';

const configuredAssetUrl =
  process.env.NEXT_PUBLIC_ASSET_ORIGIN ?? process.env.BACKEND_API_URL ?? 'http://localhost:5000';
const assetUrl = new URL(configuredAssetUrl);
const assetOrigin = assetUrl.origin;
const isLocalDevelopmentAsset =
  process.env.NODE_ENV === 'development' &&
  ['localhost', '127.0.0.1', '::1'].includes(assetUrl.hostname);
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
    dangerouslyAllowLocalIP: isLocalDevelopmentAsset,
    remotePatterns: [
      new URL('/uploads/therapy-toys/**', assetOrigin),
      new URL('/figma/explore/**', frontendOrigin),
    ],
  },
};

export default nextConfig;
