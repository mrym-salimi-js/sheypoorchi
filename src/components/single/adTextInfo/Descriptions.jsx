import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';

export function Descriptions() {
  const { description } = useContext(SingleContext);
  return (
    <div className='w-full flex flex-col gap-5 border-b-[1px] mb-3 p-4'>
      <p className='text-sm text-gray-500'>توضیحات آگهی</p>
      <p className='text-sm'>{description}</p>
    </div>
  );
}
