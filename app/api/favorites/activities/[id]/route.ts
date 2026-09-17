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
import { activityIdSchema } from '@/features/activities/model/activity.schemas';

const activityFavoriteEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    status: z.enum(['favorited', 'unfavorited']),
    type: z.literal('activity'),
    data: z.any().optional(),
  }),
});

type FavoriteActivityRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, context: FavoriteActivityRouteContext) {
  const invalidOrigin = validateSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await context.params;
  const activityId = activityIdSchema.safeParse(id);
  if (!activityId.success) {
    return NextResponse.json({ message: 'Invalid activity ID.' }, { status: 400 });
  }

  try {
    const response = await serverApi.post(
      '/favorites/toggle',
      { activityId: activityId.data },
      { headers: authHeaders }
    );
    return validatedUpstreamResponse(response.data, activityFavoriteEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update the activity favorite.');
  }
}
