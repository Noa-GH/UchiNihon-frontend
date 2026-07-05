import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/customHooks/useAuth.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) return <div className="loading">Verifying session...</div>;

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
