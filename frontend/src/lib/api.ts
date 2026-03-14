const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = {
  get: async (endpoint: string, token?: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {}),
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },

  post: async (endpoint: string, body: any, token?: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },

  put: async (endpoint: string, body: any, token?: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },

  delete: async (endpoint: string, token?: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {}),
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  },
};
