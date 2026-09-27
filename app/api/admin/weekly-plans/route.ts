import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/admin/weekly-plans', {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load weekly plans.');
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const body = await request.json();
    const response = await serverApi.post('/admin/weekly-plans', body, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to create weekly plan.');
  }
}
