import { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';

export function FindMainCategories() {
  const [mainCategories, setMainCategories] = useState();

  useEffect(() => {
    const mainCats = JSON.parse(localStorage.getItem('ads_categories_list'));
    mainCats && setMainCategories(mainCats);
  }, []);
  return mainCategories;
}
export default function Category({ queryParams, navigateTo }) {
  // const [setCookie] = useCookies();

  const mainCategories = FindMainCategories();

  const handleCatCookie = (slug, event) => {
    // setCookie('selectedCat', slug);
    // console.log(event);
    event.preventDefault();
    navigateTo({
      pathname: `/s/iran/${slug}`,
      search: queryParams.toString(),
    });
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
      className='w-[98%] h-[130px] py-1 px-4 rounded-xl z-[1000] bg-white  '
    >
      <div className='w-full h-full overflow-x-scroll ul-box'>
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
                    handleCatCookie(item.slug, event);
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
