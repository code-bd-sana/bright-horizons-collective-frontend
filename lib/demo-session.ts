export const DEMO_SESSION_COOKIE = 'bhc_demo_session';
export const DEMO_SESSION_MAX_AGE = 60 * 60 * 8;
export const DEMO_SESSION_REMEMBER_MAX_AGE = 60 * 60 * 24 * 7;

export type DemoRole = 'parent' | 'admin';

type SessionPayload = {
  role: DemoRole;
  iat: number;
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.DEMO_AUTH_SECRET;

  if (!secret && process.env.NODE_ENV === 'production') {
    console.warn('WARNING: DEMO_AUTH_SECRET is not set in production. Using fallback secret.');
  }

  return secret ?? 'local-development-demo-secret-change-before-production';
}

function toBase64Url(value: string | Uint8Array) {
  const binary =
    typeof value === 'string'
      ? value
      : Array.from(value, (byte) => String.fromCharCode(byte)).join('');

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

async function signingKey() {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function signature(value: string) {
  const signed = await crypto.subtle.sign(
    'HMAC',
    await signingKey(),
    new TextEncoder().encode(value)
  );
  return toBase64Url(new Uint8Array(signed));
}

export async function createDemoSession(role: DemoRole, maxAge: number) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { role, iat: now, exp: now + maxAge };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  return `${encodedPayload}.${await signature(encodedPayload)}`;
}

export async function readDemoSession(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;

  const [encodedPayload, encodedSignature, ...rest] = token.split('.');
  if (!encodedPayload || !encodedSignature || rest.length) return null;

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await signingKey(),
      fromBase64Url(encodedSignature),
      new TextEncoder().encode(encodedPayload)
    );
    if (!valid) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(encodedPayload))
    ) as SessionPayload;
    if (!['parent', 'admin'].includes(payload.role) || !Number.isInteger(payload.exp)) return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}
