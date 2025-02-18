import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/modules/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/modules/shared/components/loading-screen';

// ----------------------------------------------------------------------

const Profile = lazy(() => import('../features/ProfileView'));

// ----------------------------------------------------------------------

export const profileRoutes = [
  {
    path: 'profile',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ path: 'edit', element: <Profile /> }],
  },
];
