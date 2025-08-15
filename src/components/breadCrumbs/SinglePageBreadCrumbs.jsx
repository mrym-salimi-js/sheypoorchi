import { useContext } from 'react';
import { ChevronLeft } from '../globals/Icons';
import { SingleContext } from '../../pages/Single';
import { Link } from 'react-router-dom';
import { scrollSlider } from '../../utils/globals/scrollSlider';

export default function SinglePageBreadCrumbs() {
  const { category, title } = useContext(SingleContext);
  const handleScrollItem = () => {
    scrollSlider(document.querySelectorAll('.bread-item-box'));
  };
  return (
    <div
      onClick={handleScrollItem}
      className='w-full h-auto  bread-item-box overflow-x-scroll ul-box  pt-2 lg:pt-6 pb-6   right-[22px] lg:right-[45px] lg:static '
    >
      <ul className='w-auto flex gap-2 items-center justify-start'>
        {category !== undefined &&
          category.map((item) => {
            return <BreadCrumbItem breadItem={item} key={item.id} />;
          })}
        {title !== undefined && (
          <p className='text-[0.8rem] text-gray-400 whitespace-nowrap'>
            {title}
          </p>
        )}
      </ul>
    </div>
  );
}

export function BreadCrumbItem({ breadItem }) {
  return (
    <li className='w-auto h-full flex items-center justify-center '>
      <Link
        to={`/s/iran/${breadItem?.slug}`}
        className='w-auto h-full outline-none flex gap-1 items-center flex-nowrap cursor-pointer'
      >
        <p className='w-auto text-[0.8rem] text-black whitespace-nowrap'>
          {breadItem.name}
        </p>
        <ChevronLeft color={'#000000'} size={'size-4'} />
      </Link>
    </li>
  );
}
