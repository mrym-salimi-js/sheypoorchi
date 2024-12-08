import { useContext, useEffect, useState } from 'react';
import HomePageBreadCrumb from './HomePageBreadCrumb';
import { ChevronLeft } from '../globals/Icons';
import { HomeContext } from '../../pages/Home';
import { Link } from 'react-router-dom';

export default function CategoryPageBreadCrumbs() {
  const { brandAndModel, category, locationUrl } = useContext(HomeContext);
  const mainCats = JSON.parse(localStorage.getItem('ads_categories_list'));
  const [mainCat, setMainCat] = useState([]);

  // Get Main and Sub Selected Cat
  useEffect(() => {
    mainCats !== undefined &&
      mainCats.map((item) => {
        if (category === item.slug) {
          setMainCat([{ id: item.id, name: item.name, slug: item.slug }]);
        } else {
          item.children?.map((chItem) => {
            chItem.slug === category &&
              setMainCat([
                { id: item.id, name: item.name, slug: item.slug },
                { id: chItem.id, name: chItem.name, slug: chItem.slug },
              ]);
          });
        }
      });
  }, [locationUrl]);

  return (
    <div className='w-full h-auto flex gap-1  p-3 py-4 border-b-[1px] border-t-[1px] items-center '>
      <HomePageBreadCrumb />
      <ChevronLeft color={'#000000'} size={'size-4'} />
      <BreadCrumbItem breadItem={mainCat[0]} />
      {mainCat[1] !== undefined && (
        <ChevronLeft color={'#000000'} size={'size-4'} />
      )}
      <BreadCrumbItem breadItem={mainCat[1]} />
      {brandAndModel !== undefined && (
        <ChevronLeft color={'#000000'} size={'size-4'} />
      )}
      <BreadCrumbItem breadItem={brandAndModel} />
    </div>
  );
}

export function BreadCrumbItem({ breadItem }) {
  return (
    <div className='w-auto h-full flex items-center justify-center'>
      <Link
        to={`/s/iran/${breadItem?.slug}`}
        className='w-full h-full outline-none flex gap-1 items-center cursor-pointer'
      >
        <p className='text-[0.8rem] text-black'>
          {breadItem?.name || breadItem?.title}
        </p>
      </Link>
    </div>
  );
}
