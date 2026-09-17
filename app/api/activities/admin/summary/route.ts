import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { activityAdminSummaryEnvelopeSchema } from '@/features/activities/model/activity.schemas';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/activities/admin/summary', {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, activityAdminSummaryEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load activity summary.');
  }
}
