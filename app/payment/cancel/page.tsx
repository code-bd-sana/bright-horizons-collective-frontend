import type { Metadata } from 'next';
import { PaymentCancelPage } from '@/components/payment/payment-cancel-page';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Payment Cancelled | Bright Horizons Collective',
  description: 'Your payment process was cancelled. No charges were made to your account.',
});

export default function PaymentCancelRoute() {
  return <PaymentCancelPage />;
}
