import { Navigate, useRoutes } from 'react-router-dom';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes } from './main';

import { authRoutes } from '../../auth/routes/auth';
import { dashboardRoutes } from '../../dashboard/routes/dashboard';
import { userRoutes } from 'src/modules/user/routes/user';
import { analyticsRoute } from 'src/modules/analytics/routes/analytics';
import { formRoutes } from 'src/modules/form/routes/form';
import { profileRoutes } from 'src/modules/profile/routes/profile';
import { calendarRoutes } from 'src/modules/calendar/routes/calendar';
import { bankingRoutes } from 'src/modules/banking/routes/banking';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    ...userRoutes,

    ...analyticsRoute,

    ...formRoutes,

    ...profileRoutes,

    ...calendarRoutes,

    ...bankingRoutes,
    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
