import { StatusPage } from '@/components/errors/status-page';

export default function Forbidden() {
  return (
    <StatusPage
      code="403"
      title="You don’t have access to this area"
      description="This page belongs to a different account role. Return to your dashboard to continue."
      primaryAction={{ href: '/dashboard', label: 'Go to my dashboard' }}
      secondaryAction={{ href: '/', label: 'Return home' }}
    />
  );
}
