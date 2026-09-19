import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { backendParentThreadEnvelopeSchema } from '@/features/messages/model/message.schemas';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/messages/parent-thread', {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendParentThreadEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load parent message thread.');
  }
}
