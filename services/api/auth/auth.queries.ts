'use client';

import { useQuery } from '@tanstack/react-query';
import { getClientSession } from './auth.api';
import { authKeys } from './auth.keys';

export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: getClientSession,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
