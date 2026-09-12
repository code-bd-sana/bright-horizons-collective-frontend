'use client';

import { useEffect } from 'react';
import { StatusPage } from '@/components/errors/status-page';

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error('[application-error]', {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <StatusPage
      code="500"
      title="Something didn’t load correctly"
      description="A temporary problem interrupted this page. Try again, or return home if the problem continues."
      primaryAction={{ label: 'Try again', onClick: retry }}
      secondaryAction={{ href: '/', label: 'Return home' }}
    />
  );
}
