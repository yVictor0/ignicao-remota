import { API_URL } from '../config';

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, { method = 'GET', password } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      cache: 'no-store',
      headers: password ? { Authorization: `Bearer ${password}` } : {},
    });
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.error || `Erro ${response.status}`, response.status);
  }
  return data;
}

export const getStatus = (password) => request('/api/status', { password });

export const sendWake = (password) => request('/api/wake', { method: 'POST', password });
