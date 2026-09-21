import type { Metadata } from 'next';
import { PaymentSuccessPage } from '@/components/payment/payment-success-page';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Payment Successful | Bright Horizons Collective',
  description: 'Your Bright Horizons Collective membership has been activated successfully.',
});

export default function PaymentSuccessRoute() {
  return <PaymentSuccessPage />;
}
