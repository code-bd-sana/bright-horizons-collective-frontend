import axios from 'axios';

type ErrorPayload = {
  message?: string | string[];
  error?: string;
  code?: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (!axios.isAxiosError<ErrorPayload>(error)) {
    return new ApiError('Something went wrong. Please try again.');
  }

  const responseMessage = error.response?.data?.message;
  const message = Array.isArray(responseMessage)
    ? responseMessage[0]
    : responseMessage ||
      (error.code === 'ECONNABORTED'
        ? 'The request took too long. Please try again.'
        : 'Unable to connect. Please check your connection and try again.');

  return new ApiError(message, error.response?.status, error.response?.data?.code);
}
