// ─── Domain types ────────────────────────────────────────────────────────────

// A property listing from mock data or a future external API.
// Every field that matches the backend Property model is represented here.
export interface AkiyaListing {
  listingId: string;
  title: string;
  prefecture: string;
  city: string;
  price: number; // 0 = free transfer
  imageUrl: string;
  bedrooms?: number;
  sqMeters?: number;
  yearBuilt?: number;
  description?: string;
  tags?: string[];
}

// A saved property stored in MongoDB.
// Extends AkiyaListing and adds the database-generated fields.
export interface SavedProperty extends AkiyaListing {
  _id: string; // MongoDB ObjectId serialised to string
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Auth types ──────────────────────────────────────────────────────────────

export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

// Typing the full context value means every call to useAuth() is
// fully autocompleted — no guessing what is available.
export interface AuthContextValue {
  currentUser: CurrentUser | null;
  token: string;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  login: (token: string, user: CurrentUser) => void;
  logout: () => void;
}

// ─── API response types ──────────────────────────────────────────────────────

export interface SigninResponse {
  token: string;
}

export interface SignupResponse {
  _id: string;
  name: string;
  email: string;
}

// ─── Third-party API types ───────────────────────────────────────────────────

export interface VacancyStat {
  prefecture: string;
  vacancyRate: number;
  vacantHomes: number;
}
