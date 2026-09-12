import type { BackendAuthRole } from '@/services/api/auth/auth.types';

export const AUTH_TOKEN_COOKIE = 'bhc_access_token';
export const AUTH_TOKEN_MAX_AGE = 60 * 60 * 24;

type TokenClaims = {
  exp: number;
  role: BackendAuthRole;
};

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  return atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='));
}

export function readTokenClaims(token?: string): TokenClaims | null {
  if (!token) return null;

  const [, payload, ...rest] = token.split('.');
  if (!payload || rest.length !== 1) return null;

  try {
    const claims = JSON.parse(decodeBase64Url(payload)) as Partial<TokenClaims>;
    const validRole = claims.role === 'ADMIN' || claims.role === 'PARENTS';
    const validExpiration =
      typeof claims.exp === 'number' && claims.exp > Math.floor(Date.now() / 1000);

    return validRole && validExpiration
      ? { role: claims.role as BackendAuthRole, exp: claims.exp as number }
      : null;
  } catch {
    return null;
  }
}

export function tokenMaxAge(token: string) {
  const claims = readTokenClaims(token);
  if (!claims) return null;

  return Math.max(0, Math.min(AUTH_TOKEN_MAX_AGE, claims.exp - Math.floor(Date.now() / 1000)));
}
