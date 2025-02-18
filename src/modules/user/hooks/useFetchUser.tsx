import { fetchUsers } from '../../../modules/user/data/userThunk';
import { useAppSelector } from 'src/modules/shared/store';
const useFetchUsers = () => {
  const { users } = useAppSelector((store) => store.user);

  return { users, fetchUsers };
};

export default useFetchUsers;
