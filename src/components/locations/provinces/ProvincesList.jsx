import { ProvimcesItem } from './ProvimcesItem';
import { findProvinces } from '../../../utils/locations/findProvinces';

export function ProvincesList() {
  const provinces = findProvinces();
  return (
    <div className='h-[59%] lg:h-[51%] p-1 border-t-2 border-gray-100 mt-[20px] overflow-scroll '>
      <ul className='flex flex-col gap-2 p-2'>
        {provinces?.map((prv) => {
          return (
            <ProvimcesItem prvName={prv.name} prvId={prv.id} key={prv.id} />
          );
        })}
      </ul>
    </div>
  );
}
