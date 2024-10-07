import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';

export function Descriptions() {
  const { adDescription } = useContext(SingleContext);
  return (
    <div className='w-full flex flex-col gap-5 border-b-[1px] p-4'>
      <p className='text-sm text-gray-500'>توضیحات آگهی</p>
      <p className='text-sm'>{adDescription}</p>
    </div>
  );
}
