import { ClearInvalidSession } from '@/components/errors/clear-invalid-session';
import { StatusPage } from '@/components/errors/status-page';

export default function Unauthorized() {
  return (
    <>
      <ClearInvalidSession />
      <StatusPage
        code="401"
        title="Please sign in to continue"
        description="Your session is missing or has expired. Sign in securely to access your Bright Horizons dashboard."
        primaryAction={{ href: '/login', label: 'Sign in' }}
        secondaryAction={{ href: '/', label: 'Return home' }}
      />
    </>
  );
}
