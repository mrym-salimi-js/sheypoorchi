import { useContext } from 'react';
import { CitiesItem } from './cities/CitiesItem';
import { ProvimcesItem } from './provinces/ProvimcesItem';
import { LocationContext } from './LocationBox';

export function SearchItems() {
  const { searchRes } = useContext(LocationContext);
  return (
    <div className='h-[59%] p-1 border-t-2 border-gray-100 mt-[20px] overflow-scroll '>
      <ul className='flex flex-col gap-2 p-2'>
        {searchRes.map((item, index) => {
          if (item?.children === undefined) {
            return <CitiesItem name={item.name} id={item.id} key={index} />;
          } else {
            return (
              <ProvimcesItem prvName={item.name} prvId={item.id} key={index} />
            );
          }
        })}
      </ul>
    </div>
  );
}
