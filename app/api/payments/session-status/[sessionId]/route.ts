import { NextRequest, NextResponse } from 'next/server';
import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { sessionId } = await context.params;

  try {
    const response = await serverApi.get(`/payments/session-status/${sessionId}`, {
      headers: authHeaders,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to verify payment session.');
  }
}
