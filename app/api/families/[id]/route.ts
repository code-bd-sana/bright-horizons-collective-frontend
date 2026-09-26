import { NextRequest, NextResponse } from 'next/server';
import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const { id } = await params;
    const response = await serverApi.get(`/admin/families/${id}`, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to fetch family details.');
  }
}
