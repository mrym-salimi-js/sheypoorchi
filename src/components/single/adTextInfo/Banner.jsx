import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });

export default function Banner() {
  const { title, location, cost, createAd } = useContext(SingleContext);
  return (
    <div className='w-full flex flex-col gap-6 items-center p-5  border-b-[1px]'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
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
