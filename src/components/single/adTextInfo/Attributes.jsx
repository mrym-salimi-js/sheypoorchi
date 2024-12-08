import { useContext } from 'react';
import { SingleContext } from '../../../pages/Single';

export default function Attributes() {
  const { attribute } = useContext(SingleContext);
  return (
    <div className='w-full flex flex-col gap-5 items-center '>
      <ul className='w-full grid grid-cols-3 md:grid-cols-4 gap-2  py-5 border-b'>
        {attribute.map((attrItem, index) => {
          if (
            attrItem.name !== 'قیمت (تومان)' &&
            attrItem.name !== 'رهن (تومان)' &&
            attrItem.name !== 'اجاره (تومان)'
          ) {
            return (
              <li
                className=' rounded-3xl shadow-sm bg-[#f5f5f5]  flex flex-col gap-3 justify-center items-center p-4 border-b-[1px]'
                key={index}
              >
                <p className='text-[0.8rem] text-gray-500'>{attrItem.name}</p>
                <p className='text-[0.8rem]'>{attrItem.lable}</p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
