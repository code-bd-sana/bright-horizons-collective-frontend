import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { parentResourceAdminSummaryEnvelopeSchema } from '@/features/parent-resources/model/parent-resource.schemas';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/parent-resources/admin/summary', {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, parentResourceAdminSummaryEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load parent resources summary.');
  }
}
