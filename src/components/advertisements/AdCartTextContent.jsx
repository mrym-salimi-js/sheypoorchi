import { Link } from 'react-router-dom';
export function AdCartTextContent({ title, cost, href }) {
  return (
    <>
      <ul className='w-full h-auto  p-2 flex flex-col gap-2 justify-between items-start '>
        <li className='w-full flex justify-center items-center gap-3'>
          {/* <Speaker color={'#cccccc'} size={'size-6'} /> */}
          <Link to={href} className='cursor-pointer'>
            <p className='w-full break-words text-sm text-black '>{title}</p>
          </Link>
        </li>
        <li className='w-full flex flex-col gap-2 justify-center items-center '>
          {cost.length > 0 &&
            cost.map((costItem, index) => {
              return (
                <span
                  key={index}
                  className='w-full h-auto flex gap-3 rounded-md py-1  text-[0.7rem] text-gray-400 text-nowrap overflow-hidden'
                >
                  <p className='w-full break-words text-center'>
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
