import { NextRequest, NextResponse } from 'next/server';
import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET(req: NextRequest) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const tier = searchParams.get('tier') || '';

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (tier && tier !== 'all') params.set('tier', tier);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await serverApi.get(`/memberships/members${queryString}`, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to fetch member directory.');
  }
}
