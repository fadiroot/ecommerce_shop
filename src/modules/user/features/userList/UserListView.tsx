import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/modules/shared/components/settings';
import ListView from 'src/modules/shared/components/listView/ListView';
import { FiltersProvider } from 'src/modules/shared/contexts/filterContext';
import { ColumnsInfo } from '../../constants/ColumnsInfo';
import { fetchUsers } from '../../data/userThunk';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/modules/shared/store';
import useFetchUsers from '../../hooks/useFetchUser';
import { deleteUsers } from '../../data/userThunk';
import { paths } from '../../../shared/routes/paths';
import CustomBreadcrumbs from 'src/modules/shared/components/custom-breadcrumbs';
import { Button } from '@mui/material';
import { RouterLink } from '../../../shared/routes/components';
import Iconify from 'src/modules/shared/components/iconify/iconify';

export default function UserList() {
  const settings = useSettingsContext();
  const dispatch = useAppDispatch();
  const { users } = useFetchUsers();
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> User List </Typography>
      <CustomBreadcrumbs
        links={[{ name: 'Dashboard' }, { name: 'User' }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.user.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New User
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FiltersProvider
        //@ts-ignore

        values={{
          items: users,
          columnsInfo: ColumnsInfo,
          initialValues: {},
          fetchFunc: fetchUsers,
        }}
      >
        {/* @ts-ignore */}
        <ListView
          modelName="user"
          fetchData={fetchUsers}
          // metadata={metadata}
          // status={status}
          setChecked={setChecked}
          checked={checked}
          deleteData={deleteUsers}
          path={paths.user.create}
          // queryParam={{ role_id: 3 }}
        />
      </FiltersProvider>
    </Container>
  );
}
