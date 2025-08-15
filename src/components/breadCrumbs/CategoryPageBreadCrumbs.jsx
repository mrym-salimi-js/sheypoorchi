import { useContext } from 'react';
import HomePageBreadCrumb from './HomePageBreadCrumb';
import { ChevronLeft } from '../globals/Icons';
import { Link } from 'react-router-dom';
import { CategoryPageContext } from '../CategoryPageDetails';

export default function CategoryPageBreadCrumbs() {
  const { computeCatList } = useContext(CategoryPageContext);
  // console.log(computeCatList);
  return (
    <div className='w-full h-auto flex gap-1 overflow-x-scroll sm:overflow-hidden  p-3 py-4 border-b-[1px] border-t-[1px] items-center '>
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
      <div className='w-auto h-full flex items-center justify-center'>
        <ChevronLeft color={'#000000'} size={'size-4'} />
        <Link
          to={`/s/iran/${breadItem?.slug}`}
          className='w-full h-full outline-none flex gap-1 items-center cursor-pointer'
        >
          <p className='text-[0.8rem] text-black whitespace-nowrap'>
            {breadItem?.name || breadItem}
          </p>
        </Link>
      </div>
    </>
  );
}
