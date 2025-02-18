import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/modules/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/modules/shared/components/loading-screen';

// ----------------------------------------------------------------------

const BankingView = lazy(() => import('../features/BankingView'));

// ----------------------------------------------------------------------

export const bankingRoutes = [
  {
    path: 'banking',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ path: 'view', element: <BankingView /> }],
  },
];
