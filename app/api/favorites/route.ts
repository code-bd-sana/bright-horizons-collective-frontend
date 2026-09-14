import { NextRequest } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { therapyToyFavoritesEnvelopeSchema } from '@/features/therapy-toys/model/therapy-toy.schemas';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/favorites', { headers: authHeaders });
    return validatedUpstreamResponse(response.data, therapyToyFavoritesEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load saved therapy toys.');
  }
}
