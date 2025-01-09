import { Link } from 'react-router-dom';
import { Speaker } from '../globals/Icons';
export function AdCartTextContent({ title, cost, href }) {
  return (
    <>
      <ul className='w-full p-4 flex flex-col gap-5 justify-between items-start mb-5 '>
        <li className='flex justify-start items-center gap-3'>
          <Speaker color={'#cccccc'} size={'size-6'} />
          <Link to={href} className='cursor-pointer'>
            <p className='w-full break-words text-[0.9rem] text-black'>
              {title}
            </p>
          </Link>
        </li>
        <li className='w-full flex flex-col gap-2 '>
          {cost.length > 0 &&
            cost.map((costItem, index) => {
              return (
                <span
                  key={index}
                  className='w-full h-auto flex gap-3 rounded-md border-r-4 border-pink-400 px-2 py-1  text-[0.7rem] text-gray-400 text-nowrap overflow-hidden'
                >
                  <p className='w-full break-words'>
                    {costItem.label}:{' '}
                    {costItem.name
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    تومان
                  </p>
                </span>
              );
            })}
        </li>
      </ul>
    </>
  );
}
