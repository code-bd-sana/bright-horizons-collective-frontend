'use client';

import { getRoleConfig } from '@/lib/role-config';
import { ApiError } from '@/services/api/client/api-error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login } from './auth.api';
import { authKeys } from './auth.keys';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      queryClient.setQueryData(authKeys.session(), session);
      toast.success('Welcome back!');
      router.replace(getRoleConfig(session.role).homePath);
      router.refresh();
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : 'Unable to sign in. Please try again.'
      );
    },
  });
}
