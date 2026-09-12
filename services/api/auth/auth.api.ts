import { browserApi } from '@/services/api/client/browser-client';
import { toApiError } from '@/services/api/client/api-error';
import type { AuthSession, LoginInput, RegisterInput } from './auth.types';

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
