import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getDefaultRouteForRole } from '@/lib/navigation';
import type { UserRole } from '@/types/auth';
import type { ReactNode } from 'react';

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactNode;
}

export function RequireRole({ roles, children }: RequireRoleProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to={`/auth/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return <>{children}</>;
}
