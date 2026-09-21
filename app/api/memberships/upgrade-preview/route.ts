import { NextRequest, NextResponse } from 'next/server';
import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET(request: NextRequest) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const planId = request.nextUrl.searchParams.get('planId');
  const billingCycle = request.nextUrl.searchParams.get('billingCycle') ?? 'MONTHLY';

  if (!planId) {
    return NextResponse.json({ message: 'planId query parameter is required.' }, { status: 400 });
  }

  try {
    const response = await serverApi.get('/memberships/upgrade-preview', {
      headers: authHeaders,
      params: { planId, billingCycle },
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to calculate upgrade preview.');
  }
}
