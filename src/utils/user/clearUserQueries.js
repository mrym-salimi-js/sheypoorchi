import { queryClient } from '../../queryClient';

export const clearUserQueries = () => {
  queryClient.removeQueries({ queryKey: ['user'] });
  queryClient.removeQueries({ queryKey: ['userAds'] });
  queryClient.removeQueries({ queryKey: ['userChats'] });
  queryClient.removeQueries({ queryKey: ['userSavedAds'] });
};
