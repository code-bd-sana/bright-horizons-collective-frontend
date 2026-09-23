import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateSameOrigin,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { parentResourceIdSchema } from '@/features/parent-resources/model/parent-resource.schemas';

const resourceFavoriteEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    status: z.enum(['favorited', 'unfavorited']),
    type: z.literal('resource'),
    data: z.any().optional(),
  }),
});

type FavoriteResourceRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, context: FavoriteResourceRouteContext) {
  const invalidOrigin = validateSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await context.params;
  const resourceId = parentResourceIdSchema.safeParse(id);
  if (!resourceId.success) {
    return NextResponse.json({ message: 'Invalid parent resource ID.' }, { status: 400 });
  }

  try {
    const response = await serverApi.post(
      '/favorites/toggle',
      { parentResourceId: resourceId.data },
      { headers: authHeaders }
    );
    return validatedUpstreamResponse(response.data, resourceFavoriteEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update the parent resource favorite.');
  }
}
