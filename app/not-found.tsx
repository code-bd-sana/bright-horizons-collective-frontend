import { StatusPage } from '@/components/errors/status-page';

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="We couldn’t find that page"
      description="The page may have moved, the address may be incorrect, or the content may no longer be available."
      primaryAction={{ href: '/', label: 'Return home' }}
      secondaryAction={{ href: '/explore', label: 'Explore resources' }}
    />
  );
}
