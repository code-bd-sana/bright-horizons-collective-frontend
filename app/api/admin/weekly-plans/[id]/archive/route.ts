import { NextRequest, NextResponse } from 'next/server';

import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await params;

  try {
    const response = await serverApi.patch(
      `/admin/weekly-plans/${id}/archive`,
      {},
      { headers: authHeaders }
    );
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to archive weekly plan.');
  }
}
