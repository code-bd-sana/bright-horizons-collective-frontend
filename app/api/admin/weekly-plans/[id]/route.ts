import { NextRequest, NextResponse } from 'next/server';

import { readAuthHeaders, safeBackendErrorResponse, unauthenticatedResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await params;

  try {
    const response = await serverApi.get(`/admin/weekly-plans/${id}`, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load weekly plan.');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await params;

  try {
    const body = await request.json();
    const response = await serverApi.patch(`/admin/weekly-plans/${id}`, body, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update weekly plan.');
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await params;

  try {
    const response = await serverApi.delete(`/admin/weekly-plans/${id}`, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to delete weekly plan.');
  }
}
