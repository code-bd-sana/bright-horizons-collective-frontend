import { NextRequest, NextResponse } from 'next/server';

import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

type RouteContext = {
  params: Promise<{ childId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { childId } = await context.params;
  if (!childId) {
    return NextResponse.json({ message: 'Child ID is required.' }, { status: 400 });
  }

  const limit = request.nextUrl.searchParams.get('limit') || '5';

  try {
    const response = await serverApi.get(`/child-progress/${childId}/recent-activities`, {
      headers: authHeaders,
      params: { limit },
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json({ data });
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load recent activities.');
  }
}
