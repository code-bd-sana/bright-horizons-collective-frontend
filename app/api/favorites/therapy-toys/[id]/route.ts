import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateSameOrigin,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  therapyToyFavoriteEnvelopeSchema,
  therapyToyIdSchema,
} from '@/features/therapy-toys/model/therapy-toy.schemas';

type FavoriteTherapyToyRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, context: FavoriteTherapyToyRouteContext) {
  const invalidOrigin = validateSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await context.params;
  const toyId = therapyToyIdSchema.safeParse(id);
  if (!toyId.success) {
    return NextResponse.json({ message: 'Invalid therapy toy ID.' }, { status: 400 });
  }

  try {
    const response = await serverApi.post(
      '/favorites/toggle',
      { therapyToyId: toyId.data },
      { headers: authHeaders }
    );
    return validatedUpstreamResponse(response.data, therapyToyFavoriteEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update the therapy toy favorite.');
  }
}
