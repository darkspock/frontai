import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { RequireRole } from '@/components/auth/RequireRole';
import { PageLoading } from '@/components/ui/Loading';
import PlaceholderPage from '@/pages/placeholders/PlaceholderPage';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const VerifyPage = lazy(() => import('@/pages/auth/VerifyPage'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  // Public auth routes
  {
    path: '/auth/login',
    element: (
      <SuspenseWrapper>
        <LoginPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <SuspenseWrapper>
        <RegisterPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/auth/verify',
    element: (
      <SuspenseWrapper>
        <VerifyPage />
      </SuspenseWrapper>
    ),
  },

  // Protected routes under AppLayout
  {
    element: <AppLayout />,
    children: [
      { index: true, element: null }, // handled by AppLayout redirect
      {
        path: '/dashboard',
        element: (
          <RequireRole roles={['admin', 'super_admin']}>
            <SuspenseWrapper>
              <DashboardPage />
            </SuspenseWrapper>
          </RequireRole>
        ),
      },
      {
        path: '/my/equipment',
        element: (
          <RequireRole roles={['employee', 'admin', 'super_admin']}>
            <PlaceholderPage title="My Equipment" />
          </RequireRole>
        ),
      },
      {
        path: '/my/requests',
        element: (
          <RequireRole roles={['employee', 'admin', 'super_admin']}>
            <PlaceholderPage title="My Requests" />
          </RequireRole>
        ),
      },
      {
        path: '/requests',
        element: (
          <RequireRole roles={['technician', 'admin', 'super_admin']}>
            <PlaceholderPage title="Requests" />
          </RequireRole>
        ),
      },
      {
        path: '/assets',
        element: (
          <RequireRole roles={['technician', 'admin', 'super_admin']}>
            <PlaceholderPage title="Assets" />
          </RequireRole>
        ),
      },
      {
        path: '/users',
        element: (
          <RequireRole roles={['admin', 'super_admin']}>
            <PlaceholderPage title="Users" />
          </RequireRole>
        ),
      },
      {
        path: '/departments',
        element: (
          <RequireRole roles={['admin', 'super_admin']}>
            <PlaceholderPage title="Departments" />
          </RequireRole>
        ),
      },
      {
        path: '/settings',
        element: (
          <RequireRole roles={['admin', 'super_admin']}>
            <PlaceholderPage title="Settings" />
          </RequireRole>
        ),
      },
    ],
  },
]);
