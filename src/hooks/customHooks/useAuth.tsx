import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext.tsx';
import type { AuthContextValue } from '../../types/index.ts';

// Custom hook
// The error throw ensures misuse produces a clear message, not a cryptic undefined.

export function useAuth(): AuthContextValue {
  const context = useContext<AuthContextValue | null>(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>');
  return context;
}
