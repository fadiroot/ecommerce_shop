import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/modules/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/modules/shared/components/loading-screen';

// ----------------------------------------------------------------------

const UserList = lazy(() => import('../features/userList/UserListView'));
const CreateUser = lazy(() => import('../features/createUser/CreateUserView'));
const UpdateUser = lazy(() => import('../features/updateUser/UpdateUserView'));

// ----------------------------------------------------------------------

export const userRoutes = [
  {
    path: 'user',
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
      { path: 'list', element: <UserList /> },
      { path: 'create', element: <CreateUser /> },
      { path: ':id/edit', element: <UpdateUser /> },
    ],
  },
];
