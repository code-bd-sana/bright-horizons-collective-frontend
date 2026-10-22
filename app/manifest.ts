import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bright Horizons Collective',
    short_name: 'Bright Horizons',
    description:
      'Empowering families with pediatric occupational therapy resources, customized weekly developmental plans, and expert guidance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#174A4D',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
