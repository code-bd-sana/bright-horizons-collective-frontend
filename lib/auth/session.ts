import { cache } from 'react';
import { cookies } from 'next/headers';
import { serverApi } from '@/services/api/client/server-client';
import { backendSessionResponseSchema } from '@/services/api/auth/auth.schemas';
import { mapAuthUser } from '@/services/api/auth/auth.mapper';
import type { AuthSession } from '@/services/api/auth/auth.types';
import { AUTH_TOKEN_COOKIE } from './token';

export const getSession = cache(async (): Promise<AuthSession | null> => {
  const token = (await cookies()).get(AUTH_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const response = await serverApi.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const parsed = backendSessionResponseSchema.parse(response.data);
    const user = mapAuthUser(parsed.data);

    return { user, role: user.role };
  } catch {
    return null;
  }
});
