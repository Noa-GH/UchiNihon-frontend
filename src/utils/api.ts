import { AkiyaListing, CurrentUser, SavedProperty, SigninResponse, SignupResponse } from '@/types';

// ─── Listings query params ────────────────────────────────────────────────────
export interface ListingsParams {
  prefecture?: string;
  maxPrice?: number;
}

// All calls to Express backend live here.
// VITE_API_BASE_URL is read from .env.
//   Development:  http://localhost:3001
//   Production:   https://your-deployed-backend.com This is future implementation; domain deployment
// Swap the .env value and the frontend points to a different backend.
// No proxy needed. No code changes between environments.
// Prefer an explicit VITE_API_BASE_URL. If it's missing, default to a local
// development backend URL so dev users don't get a 404 from the frontend origin.

const DEFAULT_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';
const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || DEFAULT_BASE_URL;

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn(`[api.ts] VITE_API_BASE_URL is not set. Using ${BASE_URL || 'relative API paths'}.`);
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

// ─── Public Listings ──────────────────────────────────────────────────────────
// No auth token required — available to logged-out visitors.
// The backend returns all Akiya properties in the database, filtered by the
// optional query params. When the DB is empty (before any e-Stat sync),
// the response is { count: 0, properties: [] }.

export interface ListingsResponse {
  count: number;
  properties: AkiyaListing[];
}

export function getListings(params: ListingsParams = {}): Promise<ListingsResponse> {
  const query = new URLSearchParams();
  if (params.prefecture && params.prefecture !== 'All') {
    query.set('prefecture', params.prefecture);
  }
  if (params.maxPrice !== undefined) {
    query.set('maxPrice', String(params.maxPrice));
  }
  const qs = query.toString();
  return fetch(`${BASE_URL}/api/listings${qs ? `?${qs}` : ''}`).then((res) =>
    handleResponse<ListingsResponse>(res)
  );
}
