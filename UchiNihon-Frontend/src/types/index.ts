// All shared TS types live in here
export interface AkiyaListing {
  listingId: string;
  title: string;
  prefecture: string;
  city: string;
  price: number;
  imageUrl: string;
  bedrooms?: number;
  sqMeters?: number;
  yearBuilt?: number;
  description?: string;
  tags?: string[];
}

export interface SavedProperty extends AkiyaListing {
  _id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

export interface AuthContextValue {
  currentUser: CurrentUser | null;
  token: string;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  login: (token: string, user: CurrentUser) => void;
  logout: () => void;
}

export interface SigninResponse {
  token: string;
}
export interface SignupResponse {
  _id: string;
  name: string;
  email: string;
}

export interface VacancyStat {
  prefecture: string;
  vacancyRate: number;
  vacantHomes: number;
}
