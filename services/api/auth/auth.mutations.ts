'use client';

import { getRoleConfig } from '@/lib/role-config';
import { ApiError } from '@/services/api/client/api-error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  login,
  registerAccount,
  requestPasswordReset,
  resetPassword,
  verifyPasswordResetOtp,
} from './auth.api';
import { authKeys } from './auth.keys';
import type { VerifyOtpResult } from './auth.types';

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

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: registerAccount,
    onSuccess: (session) => {
      queryClient.setQueryData(authKeys.session(), session);
      toast.success('Your account has been created successfully!');
      router.replace('/dashboard');
      router.refresh();
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError
          ? error.message
          : 'Unable to create your account. Please try again.'
      );
    },
  });
}

export function useForgotPasswordMutation(onSuccess: () => void) {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success('Verification code sent to your email.');
      onSuccess();
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError
          ? error.message
          : 'Unable to send the verification code. Please try again.'
      );
    },
  });
}

export function useVerifyOtpMutation(onSuccess: (result: VerifyOtpResult) => void) {
  return useMutation({
    mutationFn: verifyPasswordResetOtp,
    onSuccess: (result) => {
      toast.success('Code verified successfully.');
      onSuccess(result);
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : 'Unable to verify the code. Please try again.'
      );
    },
  });
}

export function useResetPasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully! Please log in.');
      router.replace('/login');
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError
          ? error.message
          : 'Unable to reset your password. Please try again.'
      );
    },
  });
}
