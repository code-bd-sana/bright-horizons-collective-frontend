import { Metadata } from 'next';

export function constructMetadata({
  title = 'Jaicys Frontend | Modern Web Application',
  description = 'A production-ready, batteries-included Next.js frontend application for Jaicys.',
  image = '/logo/logo.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@jaicys',
    },
    icons,
    metadataBase: new URL('https://jaicys.com'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
