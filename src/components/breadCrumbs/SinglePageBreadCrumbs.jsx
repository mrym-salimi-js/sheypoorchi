import { useContext } from 'react';
import { ChevronLeft } from '../globals/Icons';
import { SingleContext } from '../../pages/Single';
import { Link } from 'react-router-dom';

export default function SinglePageBreadCrumbs() {
  const { category, title } = useContext(SingleContext);

  return (
    <div className='w-auto h-auto flex gap-2 pt-2 lg:pt-6 pb-6 absolute  right-[22px] lg:right-[45px] lg:static '>
      <ul className='w-auto flex gap-2 items-center justify-start'>
        {category !== undefined &&
          category.map((item) => {
            return <BreadCrumbItem breadItem={item} key={item.id} />;
          })}
      </ul>
      {title !== undefined && (
        <p className='text-[0.8rem] text-gray-400'>{title}</p>
      )}
    </div>
  );
}

export function BreadCrumbItem({ breadItem }) {
  return (
    <li className='w-auto h-full flex items-center justify-center'>
      <Link
        to={`/s/iran/${breadItem?.slug}`}
        className='w-full h-full outline-none flex gap-1 items-center cursor-pointer'
      >
        <p className='text-[0.8rem] text-black'>{breadItem.name}</p>
        <ChevronLeft color={'#000000'} size={'size-4'} />
      </Link>
    </li>
  );
}
