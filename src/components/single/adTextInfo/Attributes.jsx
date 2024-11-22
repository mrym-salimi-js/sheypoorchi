import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';

export default function Attributes() {
  const { attribute } = useContext(SingleContext);
  return (
    <div className='w-full flex flex-col gap-5 items-center '>
      <ul className='w-full flex flex-col items-center'>
        {attribute.map((attrItem, index) => {
          if (
            attrItem.name !== 'قیمت (تومان)' &&
            attrItem.name !== 'رهن (تومان)' &&
            attrItem.name !== 'اجاره (تومان)'
          ) {
            return (
              <li
                className='w-full flex justify-between items-center p-4 border-b-[1px]'
                key={index}
              >
                <p className='text-sm text-gray-500'>{attrItem.name}</p>
                <p className='text-sm'>{attrItem.lable}</p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
