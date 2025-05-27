import { useQuery } from '@tanstack/react-query';
import { getAdsByCategory } from '../services/getAdsByCategory';
import { getAds } from '../services/getAds';

export const useAdsByUrlChange = (category, searchPureObj, searchParams) => {
  const { data: adsList, isLoading } = useQuery({
    queryKey: ['ads', category, searchPureObj],
    queryFn:
      category || Object.keys(searchPureObj).length > 0
        ? async () => await getAdsByCategory(category, searchParams)
        : async () => await getAds(),

    keepPreviousData: true,
  });
  return { adsList, isLoading };
};
