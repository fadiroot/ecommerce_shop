import { useEffect } from 'react';
import { fetchOneUser } from 'src/modules/user/data/userThunk';
import { useAppSelector } from 'src/modules/shared/store';
import { useAppDispatch } from 'src/modules/shared/store';
import { restoreUser } from 'src/modules/user/data/userSilce';

const useFetchOneUser = (id: any) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);
  useEffect(() => {
    dispatch(fetchOneUser(id));
    return () => {
      dispatch(restoreUser());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [user];
};

export default useFetchOneUser;
