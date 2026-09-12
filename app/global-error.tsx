'use client';

import { useEffect } from 'react';
import { StatusPage } from '@/components/errors/status-page';
import './globals.css';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error('[global-application-error]', {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <title>Something went wrong | Bright Horizons Collective</title>
        <StatusPage
          code="500"
          title="Something went wrong"
          description="We couldn’t load Bright Horizons right now. Try again, or return home and continue from there."
          primaryAction={{ label: 'Try again', onClick: retry }}
          secondaryAction={{ href: '/', label: 'Return home' }}
        />
      </body>
    </html>
  );
}
