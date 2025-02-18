import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/modules/shared/components/settings';
import { fetchUsers } from '../../data/userThunk';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/modules/shared/store';
import UserForm from '../../components/UserForm';

export default function CreateUserView() {
  const settings = useSettingsContext();
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Create User </Typography>
      <UserForm />
    </Container>
  );
}
