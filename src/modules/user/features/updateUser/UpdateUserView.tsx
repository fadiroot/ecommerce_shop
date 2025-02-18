import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/modules/shared/components/settings';
import { fetchUsers } from '../../data/userThunk';
import { useEffect } from 'react';
import { useAppDispatch } from 'src/modules/shared/store';
import UserForm from '../../components/UserForm';
import { useParams } from 'react-router';
import useFetchOneUser from '../../hooks/useFetchOneUser';

export default function UpdateUserView() {
  const settings = useSettingsContext();
  const dispatch = useAppDispatch();
  const params = useParams();
  //@ts-ignore

  const { user } = useFetchOneUser(params?.id);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Update User </Typography>
      <UserForm currentUser={user} />
    </Container>
  );
}
