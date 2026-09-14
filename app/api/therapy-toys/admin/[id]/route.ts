import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import {
  therapyToyEnvelopeSchema,
  therapyToyIdSchema,
} from '@/features/therapy-toys/model/therapy-toy.schemas';
import { serverApi } from '@/services/api/client/server-client';

type AdminTherapyToyContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: AdminTherapyToyContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await context.params;
  const toyId = therapyToyIdSchema.safeParse(id);
  if (!toyId.success) {
    return NextResponse.json({ message: 'Invalid therapy toy ID.' }, { status: 400 });
  }

  try {
    const response = await serverApi.get(`/therapy-toys/admin/${toyId.data}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, therapyToyEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load the therapy toy.');
  }
}
