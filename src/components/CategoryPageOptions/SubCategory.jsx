import { useEffect } from 'react';
import { FindMainCategories } from '../Category';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SubCategory({ category, brands, locationUrl }) {
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
  const [catList, setCatList] = useState();
  const mainCategories = FindMainCategories();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (mainCategories !== undefined) {
      mainCategories.map((item) => {
        if (item.slug === category) {
          setCatList(item.children);
        }
        item.children?.map((chItem) => {
          chItem.slug === category && setCatList(chItem.brands);

          chItem.brands?.map((bItem) => {
            bItem.slug === `${category}/${brands}` &&
              bItem.attributes?.map((bAttrItem) => {
                // console.log(bAttrItem.options);
                setCatList(bAttrItem.options);
              });
          });
        });
      });
    }
  }, [locationUrl]);

  const handleShowFilterItem = (filterItem, event) => {
    event.preventDefault();

    filterItem.slug !== undefined
      ? navigateTo(`/s/iran/${filterItem.slug}`)
      : navigateTo(`/s/iran/${category}/${brands}/${filterItem.name}`);
  };

  return (
    <div
      onClick={sliderActions}
      className='w-full h-auto bg-gray-50 overflow-x-scroll ul-box border-b-[1px] border-t-[1px]'
    >
      <ul className='w-auto  flex  m-0 py-1 '>
        {catList?.map((item) => {
          return (
            <li
              className='min-w-auto flex flex-col items-center gap-2  '
              key={item.id}
            >
              <a
                href={
                  item.slug !== undefined
                    ? `/s/iran/${item.slug}`
                    : `/s/iran/${category}/${brands}/${item.name}`
                }
                onClick={(event) => handleShowFilterItem(item, event)}
                className='w-full p-2  rounded-3xl cursor-pointer flex flex-col gap-3 justify-center items-center'
              >
                <p className='text-[#84105C] text-[0.8rem] py-1 px-2 text-center text-nowrap'>
                  {item.name}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
