import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '@/utils/api';
import { AuthContextValue, CurrentUser } from '@/types';

// null as the default value means useAuth() will throw a helpful error
// if a component is accidentally rendered outside <AuthProvider>.
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Initialise token from localStorage immediately so a page refresh
  // does not flash a logged-out state before the verification completes.
  const [token, setToken] = useState<string>(() => localStorage.getItem('jwt') ?? '');

  // While we verify the stored token against the backend, we do not know
  // whether the user is authenticated. isAuthLoading prevents ProtectedRoute
  // from redirecting before the check finishes.
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // On mount: verify any stored JWT is still valid with the backend.
  // If the token is expired, clean up silently so the user sees a
  // logged-out state rather than an error screen.
  useEffect(() => {
    if (!token) {
      setIsAuthLoading(false);
      return;
    }
    getCurrentUser(token)
      .then((user) => setCurrentUser(user))
      .catch(() => {
        localStorage.removeItem('jwt');
        setToken('');
      })
      .finally(() => setIsAuthLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only — token value at mount time is what matters

  // Called after a successful signin or signup + auto-login
  const login = useCallback((newToken: string, user: CurrentUser) => {
    localStorage.setItem('jwt', newToken);
    setToken(newToken);
    setCurrentUser(user);
  }, []);

  // Called when the user clicks Log Out
  const logout = useCallback(() => {
    localStorage.removeItem('jwt');
    setToken('');
    setCurrentUser(null);
  }, []);

  const value: AuthContextValue = {
    currentUser,
    token,
    isLoggedIn: Boolean(currentUser),
    isAuthLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook
// The error throw ensures misuse produces a clear message, not a cryptic undefined.
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>');
  return context;
}
