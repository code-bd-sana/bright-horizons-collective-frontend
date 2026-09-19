import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { backendThreadsListEnvelopeSchema } from '@/features/messages/model/message.schemas';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/messages/threads', {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendThreadsListEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load message threads.');
  }
}
