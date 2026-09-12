import { browserApi } from '@/services/api/client/browser-client';
import { toApiError } from '@/services/api/client/api-error';
import type { AuthSession, LoginInput } from './auth.types';

export async function login(input: LoginInput): Promise<AuthSession> {
  try {
    const { data } = await browserApi.post<AuthSession>('/auth/login', input);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
