import { CurrentUser, SavedProperty, SigninResponse, SignupResponse } from '@/types';

// All calls to Express backend live here.
// VITE_API_BASE_URL is read from .env.
//   Development:  http://localhost:3001
//   Production:   https://your-deployed-backend.com
// Swap the .env value and the frontend points to a different backend.
// No proxy needed. No code changes between environments.
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!BASE_URL) {
  // Fail loudly in dev if the env var is missing — silent undefined produces
  // confusing network errors that are hard to trace.
  console.error('[api.ts] VITE_API_BASE_URL is not set. Check your .env file.');
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error((body as { error: string }).error ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function jsonHeaders(token?: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export function signup(name: string, email: string, password: string): Promise<SignupResponse> {
  return fetch(`${BASE_URL}/api/signup`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ name, email, password }),
  }).then((res) => handleResponse<SignupResponse>(res));
}

export function signin(email: string, password: string): Promise<SigninResponse> {
  return fetch(`${BASE_URL}/api/signin`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
  }).then((res) => handleResponse<SigninResponse>(res));
}

export function getCurrentUser(token: string): Promise<CurrentUser> {
  return fetch(`${BASE_URL}/api/users/me`, {
    headers: jsonHeaders(token),
  }).then((res) => handleResponse<CurrentUser>(res));
}

// ─── Saved Properties ────────────────────────────────────────────────────────

export function getSavedProperties(token: string): Promise<SavedProperty[]> {
  return fetch(`${BASE_URL}/api/properties/saved`, {
    headers: jsonHeaders(token),
  }).then((res) => handleResponse<SavedProperty[]>(res));
}

export function saveProperty(
  token: string,
  propertyData: Omit<SavedProperty, '_id' | 'owner' | 'createdAt' | 'updatedAt'>
): Promise<SavedProperty> {
  return fetch(`${BASE_URL}/api/properties/saved`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(propertyData),
  }).then((res) => handleResponse<SavedProperty>(res));
}

export function unsaveProperty(token: string, propertyDbId: string): Promise<{ message: string }> {
  return fetch(`${BASE_URL}/api/properties/saved/${propertyDbId}`, {
    method: 'DELETE',
    headers: jsonHeaders(token),
  }).then((res) => handleResponse<{ message: string }>(res));
}
