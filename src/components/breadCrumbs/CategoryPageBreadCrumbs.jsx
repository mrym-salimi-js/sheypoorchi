import { useContext } from 'react';
import HomePageBreadCrumb from './HomePageBreadCrumb';
import { ChevronLeft, Speaker } from '../globals/Icons';
import { Link } from 'react-router-dom';
import { CategoryPageContext } from '../CategoryPageDetails';

export default function CategoryPageBreadCrumbs() {
  const { computeCatList } = useContext(CategoryPageContext);
  // console.log(computeCatList);
  return (
    <div className='w-full h-14 flex gap-2 overflow-x-scroll sm:overflow-hidden  sm:px-3 sm:py-6 border-b-[1px] border-t-[1px] items-center '>
      <Speaker color={'#84105C'} size={'size-7'} />
      <HomePageBreadCrumb />
      {computeCatList?.category.map((item) => {
        return <BreadCrumbItem key={item.id} breadItem={item} />;
      })}
    </div>
  );
}

export function BreadCrumbItem({ breadItem }) {
  return (
    <>
      <div className='w-auto h-auto gap-2 flex items-center justify-center'>
        <ChevronLeft color={'#000000'} size={'size-4'} />
        <Link
          to={
            breadItem.name === breadItem.slug
              ? ``
              : `/s/iran/${breadItem?.slug}`
          }
          className='w-auto h-full outline-none flex gap-1 items-center cursor-pointer'
        >
          <p className='text-[0.8rem] text-black whitespace-nowrap'>
            {breadItem?.name || breadItem}
          </p>
        </Link>
      </div>
    </>
  );
}
