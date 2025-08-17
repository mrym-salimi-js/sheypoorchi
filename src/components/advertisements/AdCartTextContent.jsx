import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/globals/formatPrice';
export function AdCartTextContent({ title, cost, href }) {
  // console.log(cost);
  return (
    <>
      <ul className='w-full h-auto overflow-hidden  p-2 flex flex-col gap-2 justify-start items-start '>
        <li className='w-full flex justify-start items-start gap-3'>
          {/* <Speaker color={'#cccccc'} size={'size-6'} /> */}
          <Link to={href} className='cursor-pointer'>
            <p className='w-48 lg:w-[18rem] truncate text-[0.8rem] text-black text-justify '>
              {title}
            </p>
          </Link>
        </li>
        <li className='w-full flex gap-2 justify-start items-center '>
          {cost.length > 0 &&
            cost.map((costItem, index) => {
              return (
                <span
                  key={index}
                  className='w-full h-auto flex gap-3  py-1  text-[0.7rem] text-gray-700 text-nowrap overflow-hidden'
                >
                  <p className='w-48 lg:w-[18rem] truncate  text-justify'>
                    {costItem.label}: {formatPrice(costItem.name, 1)} تومان
                  </p>
                </span>
              );
            })}
        </li>
      </ul>
    </>
  );
}
