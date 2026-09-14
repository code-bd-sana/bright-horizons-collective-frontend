import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { therapyToyAdminSummaryEnvelopeSchema } from '@/features/therapy-toys/model/therapy-toy.schemas';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/therapy-toys/admin/summary', {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, therapyToyAdminSummaryEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load therapy toy totals.');
  }
}
