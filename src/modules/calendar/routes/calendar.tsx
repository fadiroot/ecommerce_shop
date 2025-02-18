import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/modules/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/modules/shared/components/loading-screen';

// ----------------------------------------------------------------------

const CalendarView = lazy(() => import('../features/CalendarView'));

// ----------------------------------------------------------------------

export const calendarRoutes = [
  {
    path: 'calendar',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ path: 'view', element: <CalendarView /> }],
  },
];
