import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../pages/Home';
import { scrollSlider } from './globals/functions/scrollSlider';
import { linkTo } from './globals/functions/linkTo';

export function FindMainCategories() {
  const [mainCategories, setMainCategories] = useState();

  useEffect(() => {
    const mainCats = JSON.parse(localStorage.getItem('ads_categories_list'));
    mainCats && setMainCategories(mainCats);
  }, []);
  return mainCategories;
}
export default function Category() {
  const { queryParams, navigateTo } = useContext(HomeContext);

  const mainCategories = FindMainCategories();

  const handleNavTo = (slug, event) => {
    linkTo(event, navigateTo, `/s/iran/${slug}`, queryParams.toString());
  };

  const handleScrollItems = () => [
    scrollSlider(document.querySelectorAll('.cat-items-box')),
  ];

  return (
    <div
      onClick={handleScrollItems}
      id='places-category-box'
      className='w-[98%] h-[130px] py-1 px-4 rounded-xl z-[1000] bg-white  '
    >
      <div className=' cat-items-box w-full h-full overflow-x-scroll ul-box'>
        <ul id='places-category-ul' className='w-auto py-3 px-1 flex gap-6 m-0'>
          {mainCategories?.map((item) => {
            return (
              <li
                className='min-w-[92px] flex flex-col items-center gap-2 p-2'
                key={item.id}
              >
                <a
                  href={`/s/iran/${item.slug}`}
                  onClick={(event) => {
                    handleNavTo(item.slug, event);
                  }}
                  className='w-full p-2 bg-gray-50 rounded-3xl cursor-pointer flex flex-col gap-3 justify-center items-center'
                >
                  <img className='w-14 h-14 ' src={item.iconURL}></img>
                </a>
                <p className='text-black text-[0.7rem] py-1 px-2 text-center'>
                  {item.name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
