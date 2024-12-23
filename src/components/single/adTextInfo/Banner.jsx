import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';
import momentJalaali from 'moment-jalaali';
import { Saved } from '../../globals/Icons';
import { updateSavedAds } from '../../../services/user/updateSavedAds';
import { navTo } from '../../../functions/globals/navTo';
import { useNavigate } from 'react-router-dom';
momentJalaali.loadPersian({ usePersianDigits: true });

export default function Banner() {
  const { _id, title, location, cost, createAd, setSaved, saved } =
    useContext(SingleContext);
  const navigatTo = useNavigate();

  const handleSaveAd = () => {
    setSaved(!saved);
    const saveAd = async () => {
      const saved = await updateSavedAds(_id);
      saved.response?.data.status === 'fail' && navTo('/login', '', navigatTo);
    };
    saveAd();
  };

  return (
    <div className='w-full flex flex-col gap-6 items-center p-5  border-b-[1px]'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
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
      <div className='w-full flex flex-row-reverse justify-between items-center'>
        <p className='text-sm text-gray-500'>
          {momentJalaali(createAd).locale('fa').fromNow() +
            ' در ' +
            location[1]?.name}
        </p>

        {cost.length > 0 &&
          cost.map((costItem, index) => {
            return (
              <p className='text-md' key={index}>
                {costItem.name}:{' '}
                {costItem.lable
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                تومان
              </p>
            );
          })}
      </div>
    </div>
  );
}
