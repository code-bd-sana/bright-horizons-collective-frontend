import { Metadata } from 'next';

const DEFAULT_TITLE = 'Bright Horizons Collective | Pediatric OT & Family Support';
const DEFAULT_DESCRIPTION =
  'Empowering families with pediatric occupational therapy resources, customized weekly developmental plans, and expert guidance.';
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  'https://brighthorizonscollective.com';

export function constructMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = '/logo/logo.png',
  icons,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: Metadata['icons'];
  noIndex?: boolean;
} = {}): Metadata {
  const formattedTitle = title.includes('Bright Horizons Collective')
    ? title
    : `${title} | Bright Horizons Collective`;

  return {
    title: formattedTitle,
    description,
    applicationName: 'Bright Horizons Collective',
    metadataBase: new URL(SITE_URL),
    icons: icons ?? {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      ],
      shortcut: '/favicon.ico',
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    openGraph: {
      title: formattedTitle,
      description,
      siteName: 'Bright Horizons Collective',
      url: SITE_URL,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: 'Bright Horizons Collective',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      images: [image],
    },
    manifest: '/manifest.webmanifest',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
