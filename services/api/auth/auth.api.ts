import { browserApi } from '@/services/api/client/browser-client';
import { toApiError } from '@/services/api/client/api-error';
import type {
  AuthSession,
  ForgotPasswordInput,
  LoginInput,
  MessageResult,
  RegisterInput,
  ResetPasswordInput,
  VerifyOtpInput,
  VerifyOtpResult,
} from './auth.types';

export async function login(input: LoginInput): Promise<AuthSession> {
  try {
    const { data } = await browserApi.post<AuthSession>('/auth/login', input);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function registerAccount({
  name,
  email,
  password,
}: RegisterInput): Promise<AuthSession> {
  try {
    const { data } = await browserApi.post<AuthSession>('/auth/register', {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function requestPasswordReset(input: ForgotPasswordInput): Promise<MessageResult> {
  try {
    const { data } = await browserApi.post<MessageResult>('/auth/forgot-password', input);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function verifyPasswordResetOtp(input: VerifyOtpInput): Promise<VerifyOtpResult> {
  try {
    const { data } = await browserApi.post<VerifyOtpResult>('/auth/verify-otp', input);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function resetPassword(input: ResetPasswordInput): Promise<MessageResult> {
  try {
    const { data } = await browserApi.post<MessageResult>('/auth/reset-password', input);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
