import { NextResponse } from 'next/server';
import { safeBackendErrorResponse } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET() {
  try {
    const response = await serverApi.get('/memberships/plans');
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to fetch membership plans.');
  }
}
