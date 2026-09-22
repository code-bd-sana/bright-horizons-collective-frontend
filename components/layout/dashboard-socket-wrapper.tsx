'use client';

import type { ReactNode } from 'react';
import { MessagesSocketProvider } from '@/features/messages/socket/messages-socket-context';

export function DashboardSocketWrapper({ children }: { children: ReactNode }) {
  return <MessagesSocketProvider>{children}</MessagesSocketProvider>;
}
