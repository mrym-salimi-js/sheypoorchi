import { useContext } from 'react';
import { ChevronLeft } from '../globals/Icons';
import { SingleContext } from '../../pages/Single';

export default function SinglePageBreadCrumbs() {
  const { category, title } = useContext(SingleContext);

  return (
    <div className='w-auto h-auto flex gap-2 pt-6 pb-6 absolute top-[442px] right-[45px] lg:static '>
      <ul className='w-auto flex gap-2 items-center justify-start'>
        {category !== undefined &&
          category.map((item) => {
            return <BreadCrumbItem breadItem={item} key={item.id} />;
          })}
      </ul>
      {title !== undefined && <p className='text-sm text-gray-400'>{title}</p>}
    </div>
  );
}

export function BreadCrumbItem({ breadItem }) {
  return (
    <li className='w-auto h-full flex items-center justify-center'>
      <a
        href=''
        className='w-full h-full outline-none flex gap-1 items-center cursor-pointer'
      >
        <p className='text-sm text-black'>{breadItem.name}</p>
        <ChevronLeft color={'#000000'} size={'size-4'} />
      </a>
    </li>
  );
}
