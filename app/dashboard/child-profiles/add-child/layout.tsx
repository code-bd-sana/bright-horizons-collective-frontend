import { AddChildProvider } from '@/features/child-profiles/context/add-child-context';

export default function AddChildLayout({ children }: { children: React.ReactNode }) {
  return <AddChildProvider>{children}</AddChildProvider>;
}
