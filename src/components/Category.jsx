import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
// import { Loading } from './Loading';

export function FindMainCategories() {
  const [mainCategories, setMainCategories] = useState();

  useEffect(() => {
    const mainCats = JSON.parse(localStorage.getItem('ads_categories_list'));
    mainCats && setMainCategories(mainCats);
  }, []);
  return mainCategories;
}
export default function Category() {
  const [setCookie] = useCookies();

  // const cookieCitiesInUrl = encodeURIComponent(
  //   JSON.stringify(cookie['cities'])
  // );
  // let href
  // (cookie['cities'] !== undefined && cookie['cities'].length > 0) ? href = `/${cookieCitiesInUrl}` : href = `/s/iran/`

  const mainCategories = FindMainCategories();

  const handleCatCookie = (slug) => {
    setCookie('selectedCat', slug);
  };

  const sliderActions = () => {
    const sliderUl = document.querySelectorAll('.ul-box');
    let pressed = false;
    let startX = 0;
    let scrollLeft;

    sliderUl.forEach((ulElm) => {
      ulElm.addEventListener('mousedown', (event) => {
        pressed = true;
        if (startX > 0) {
          return;
        }

        startX = event.pageX - ulElm.offsetLeft;
        scrollLeft = ulElm.scrollLeft;
      });

      ulElm.addEventListener('mouseleave', () => {
        pressed = false;
      });

      window.addEventListener('mouseup', () => {
        pressed = false;
      });

      ulElm.addEventListener('mousemove', (event) => {
        if (!pressed) {
          return;
        }

        const x = event.pageX - ulElm.offsetLeft;
        const walk = x - startX;
        ulElm.scrollLeft = scrollLeft - walk;
      });
    });
  };

  return (
    <div
      onClick={sliderActions}
      id='places-category-box'
      className='w-[98%] h-[100px] py-1 px-4 rounded-xl z-[1000] bg-white  sticky top-[75px]'
    >
      <div className='w-full h-full overflow-x-scroll ul-box'>
        <ul id='places-category-ul' className='w-auto py-3 px-1 flex gap-6 m-0'>
          {mainCategories?.map((item) => {
            return (
              <li
                onClick={() => {
                  handleCatCookie(item.slug);
                }}
                className='min-w-[92px] bg-gray-50 rounded-3xl p-2'
                key={item.id}
              >
                <a
                  href={`/s/iran/${item.slug}`}
                  className='w-full h-full cursor-pointer flex flex-col gap-3 justify-center items-center'
                >
                  <img className='w-14 h-14 ' src={item.iconURL}></img>
                  {/* <p className="text-white text-[0.6rem] py-1 px-2 bg-pink-200 rounded-lg">{item.name}</p> */}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
