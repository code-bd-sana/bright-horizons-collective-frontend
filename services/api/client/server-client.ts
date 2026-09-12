import axios from 'axios';

const backendApiUrl =
  process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

export const serverApi = axios.create({
  baseURL: backendApiUrl.replace(/\/$/, ''),
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});
