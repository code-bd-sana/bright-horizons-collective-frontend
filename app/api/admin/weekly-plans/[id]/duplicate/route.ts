import { NextRequest, NextResponse } from 'next/server';

import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await params;

  try {
    const response = await serverApi.post(
      `/admin/weekly-plans/${id}/duplicate`,
      {},
      { headers: authHeaders }
    );
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to duplicate weekly plan.');
  }
}
