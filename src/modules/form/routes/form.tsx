import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/modules/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/modules/shared/components/loading-screen';

// ----------------------------------------------------------------------

const CreateForm = lazy(() => import('../features/createForm/CreateFormView'));
const UpdateForm = lazy(() => import('../features/updateForm/UpdateFormView'));

// ----------------------------------------------------------------------

export const formRoutes = [
  {
    path: 'form',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { path: 'create', element: <CreateForm /> },
      { path: 'update', element: <UpdateForm /> },
    ],
  },
];
