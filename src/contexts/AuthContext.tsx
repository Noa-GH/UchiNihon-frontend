import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '@/utils/api';
import { AuthContextValue, CurrentUser } from '@/types';

// if a component is accidentally rendered outside <AuthProvider>.
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Initialise token from localStorage immediately so a page refresh

  const [token, setToken] = useState<string>(() => localStorage.getItem('jwt') ?? '');

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    getCurrentUser(token)
      .then((user) => setCurrentUser(user))
      .catch(() => {
        localStorage.removeItem('jwt');
        setToken('');
      })
      .finally(() => setIsAuthLoading(false));
  }, [token]);

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
export default AuthContext;
