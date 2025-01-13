import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/user/getUser';
import { useEffect } from 'react';
import { updateUserStatus } from '../services/user/updateUserStatus';

const useUserStatus = () => {
  useEffect(() => {
    const userId = user !== 'fail' ? user?._id : undefined;
    updateUserStatus(userId);
  }, [user]);
};
export default useUserStatus;
