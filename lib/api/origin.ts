import { NextRequest } from 'next/server';

function checkOriginMatch(candidateOrigin: string, request: NextRequest): boolean {
  try {
    const candidateUrl = new URL(candidateOrigin);

    // 1. Match against Next.js internal URL (e.g., localhost in local dev)
    if (candidateUrl.origin === request.nextUrl.origin) {
      return true;
    }

    // 2. Match against reverse proxy headers (Host / X-Forwarded-Host + X-Forwarded-Proto)
    const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const forwardedProto =
      request.headers.get('x-forwarded-proto') ||
      (request.url.startsWith('https') ? 'https' : 'http');

    if (forwardedHost) {
      const forwardedOrigin = `${forwardedProto}://${forwardedHost}`;
      if (candidateUrl.origin === forwardedOrigin) {
        return true;
      }

      // Support apex domain and www subdomain interchangeably
      const hostWithoutPort = forwardedHost.split(':')[0].toLowerCase();
      const candidateHostname = candidateUrl.hostname.toLowerCase();

      if (
        candidateHostname === hostWithoutPort ||
        candidateHostname === `www.${hostWithoutPort}` ||
        `www.${candidateHostname}` === hostWithoutPort
      ) {
        return true;
      }
    }

    // 3. Match against configured environment origins
    const envCandidates = [
      process.env.NEXT_PUBLIC_FRONTEND_URL,
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.NEXT_PUBLIC_WS_URL,
      process.env.NEXT_PUBLIC_ASSET_ORIGIN,
    ].filter(Boolean) as string[];

    for (const envVal of envCandidates) {
      try {
        const envUrl = new URL(envVal);
        if (candidateUrl.origin === envUrl.origin) {
          return true;
        }

        const envHostname = envUrl.hostname.toLowerCase();
        const candidateHostname = candidateUrl.hostname.toLowerCase();

        if (
          candidateHostname === envHostname ||
          candidateHostname === `www.${envHostname}` ||
          `www.${candidateHostname}` === envHostname
        ) {
          return true;
        }
      } catch {
        // Ignore invalid URL format in env
      }
    }
  } catch {
    return false;
  }

  return false;
}

/**
 * Validates whether the incoming request originates from an authorized origin.
 * Supports direct access, reverse proxy (Nginx with X-Forwarded-Proto / Host),
 * and apex/www domain variations.
 */
export function isAllowedOrigin(request: NextRequest, requireOrigin = false): boolean {
  const origin = request.headers.get('origin');

  if (!origin) {
    if (!requireOrigin) return true;

    // Fall back to referer header if origin is required
    const referer = request.headers.get('referer');
    if (!referer) {
      return process.env.NODE_ENV !== 'production';
    }
    try {
      const refererUrl = new URL(referer);
      return checkOriginMatch(refererUrl.origin, request);
    } catch {
      return false;
    }
  }

  return checkOriginMatch(origin, request);
}
