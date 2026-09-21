import { NextResponse } from 'next/server';
import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/memberships/dashboard-stats', {
      headers: authHeaders,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to fetch membership dashboard statistics.');
  }
}
