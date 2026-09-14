import type { NextConfig } from 'next';

const configuredAssetUrl =
  process.env.NEXT_PUBLIC_ASSET_ORIGIN ?? process.env.BACKEND_API_URL ?? 'http://localhost:5000';
const assetOrigin = new URL(configuredAssetUrl).origin;

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [new URL('/uploads/therapy-toys/**', assetOrigin)],
  },
};

export default nextConfig;
