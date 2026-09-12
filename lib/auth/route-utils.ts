import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

type BackendErrorPayload = {
  message?: string | string[];
};

export function validateJsonRequest(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ message: 'Unsupported request format.' }, { status: 415 });
  }

  return null;
}

export function backendErrorResponse(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<BackendErrorPayload>(error) && error.response) {
    const backendMessage = error.response.data?.message;
    const message = Array.isArray(backendMessage)
      ? backendMessage[0]
      : typeof backendMessage === 'string'
        ? backendMessage
        : fallbackMessage;

    return NextResponse.json(
      { message },
      { status: error.response.status, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(
    { message: 'The authentication service is temporarily unavailable.' },
    { status: 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
