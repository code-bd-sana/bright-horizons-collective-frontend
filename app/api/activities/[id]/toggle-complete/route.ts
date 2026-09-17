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

const toggleCompleteEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    isCompleted: z.boolean(),
    status: z.string(),
    data: z.any().optional(),
  }),
});

type ActivityRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, context: ActivityRouteContext) {
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
      `/activities/${activityId.data}/toggle-complete`,
      {},
      { headers: authHeaders }
    );
    return validatedUpstreamResponse(response.data, toggleCompleteEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update activity completion status.');
  }
}
