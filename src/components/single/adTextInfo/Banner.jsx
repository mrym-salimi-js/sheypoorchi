import { useContext, useEffect } from 'react';
import { SingleContext } from '../../../pages/Single';
import momentJalaali from 'moment-jalaali';
import { Saved } from '../../globals/Icons';
import { updateSavedAds } from '../../../services/user/updateSavedAds';
import { navTo } from '../../../utils/globals/navTo';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/globals/formatPrice';
import { queryClient } from '../../../queryClient';
import axios from 'axios';

momentJalaali.loadPersian({ usePersianDigits: true });

export default function Banner() {
  const { _id, title, location, cost, createAt, setSaved, saved } =
    useContext(SingleContext);
  const navigatTo = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getProf = async () => {
      const user = await axios.get(`${baseURL}/api/users/me`, {
        withCredentials: true,
      });
      user && user.data.data.savedAd.includes(_id) && setSaved(true);
    };
    getProf();
  }, []);

  const handleSaveAd = () => {
    setSaved(!saved);
    const saveAd = async () => {
      const saved = await updateSavedAds(_id);

      saved.response?.data?.status === 'fail' && navTo('/login', '', navigatTo);

      saved.status === 'success' &&
        queryClient.invalidateQueries(['userSavedAds']);
    };
    saveAd();
  };

  return (
    <div className='w-full flex flex-col gap-6 items-center p-5  border-b-[1px]'>
      <div className='w-full flex gap-2 justify-between items-start'>
        <h2 className='text-md font-bold text-gray-800'>{title}</h2>
        <div
          onClick={handleSaveAd}
          className='w-auto h-auto transition-all  cursor-pointer flex items-center justify-center'
        >
          <Saved
            color={'#000000'}
            fill={saved ? '#000000' : 'none'}
            size={'size-6'}
          />
        </div>
      </div>
      <div className='w-full flex flex-row-reverse justify-between items-end'>
        <p className='text-sm text-gray-500'>
          {momentJalaali(createAt).locale('fa').fromNow() +
            ' در ' +
            location[1]?.name}
        </p>
        <div className='flex flex-col gap-2'>
          {cost.length > 0 &&
            cost.map((costItem, index) => {
              return (
                <p className='text-sm' key={index}>
                  {costItem.label}: {formatPrice(costItem.name, 1)} تومان
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}
