// utils/dashboardInvalidate.js
import { queryClient } from '../../queryClient';

export const dashboardInvalidate = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ['user'] }),
    queryClient.invalidateQueries({ queryKey: ['userAds'] }),
    queryClient.invalidateQueries({ queryKey: ['userChats'] }),
    queryClient.invalidateQueries({ queryKey: ['userSavedAds'] }),
  ]);
};
