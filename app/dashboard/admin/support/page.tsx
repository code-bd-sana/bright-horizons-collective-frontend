import { AdminSupportPage } from '@/components/dashboard/admin/support/admin-support-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support & Feedback Management | Admin Dashboard',
  description: 'Manage parent contact inquiries, product feedback, and technical issue reports.',
};

export default function AdminSupportRoute() {
  return <AdminSupportPage />;
}
