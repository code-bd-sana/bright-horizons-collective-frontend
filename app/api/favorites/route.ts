import { NextRequest } from 'next/server';
import { z } from 'zod';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

const favoritesEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    activities: z
      .array(
        z.object({
          id: z.string().optional(),
          userId: z.string().optional(),
          activityId: z.string().optional(),
          activity: z.any().optional(),
        })
      )
      .optional()
      .default([]),
    resources: z.array(z.any()).optional().default([]),
    toys: z
      .array(
        z.object({
          id: z.string().optional(),
          userId: z.string().optional(),
          toyId: z.string().optional(),
          toy: z.any().optional(),
        })
      )
      .optional()
      .default([]),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/favorites', { headers: authHeaders });
    return validatedUpstreamResponse(response.data, favoritesEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load saved favorites.');
  }
}
