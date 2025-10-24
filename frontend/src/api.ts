//api.ts
import type { Provider } from './types';

const API_BASE_URL = 'http://localhost:3002/api';

export const fetchProviders = async (): Promise<Provider[]> => {
  const response = await fetch(`${API_BASE_URL}/providers`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const fetchProvider = async (id: string): Promise<Provider> => {
  const response = await fetch(`${API_BASE_URL}/providers/${id}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};
