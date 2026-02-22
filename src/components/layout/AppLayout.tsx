import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getDefaultRouteForRole } from '@/lib/navigation';
import { PageLoading } from '@/components/ui/Loading';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (loading) return <PageLoading />;

  if (!user) {
    return <Navigate to={`/auth/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (location.pathname === '/') {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setMobileNavOpen(!mobileNavOpen)} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
