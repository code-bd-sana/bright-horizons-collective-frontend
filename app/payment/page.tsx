import type { Metadata } from 'next';

import { PaymentPage } from '@/components/payment/payment-page';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Payment | Bright Horizons Collective',
  description: 'Complete your Bright Horizons Collective membership payment securely.',
});

export default function PaymentRoute() {
  return <PaymentPage />;
}
