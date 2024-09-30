import { useSearchParams } from 'react-router-dom';
import { CategoryListBtn } from './CategoryListBtn';
import { FilterBtn } from './FilterBtn';
import FilterItemBtn from './FilterItemBtn';
import { FindMainCategories } from '../Category';
import { useEffect, useState } from 'react';

export function OptionsBtn({
  setFilterFormDisplay,
  category,
  brands,
  model,
  locationUrl,
  navigateTo,
}) {
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
  const [searchItems] = useSearchParams();
  const searchObject = Object.fromEntries(searchItems.entries());
  const mainCategories = FindMainCategories();
  const [filterItemsList, setFilterItemsList] = useState([]);
  const [brandAndModel, setBrandAndModel] = useState();

  useEffect(() => {
    // Get And Set Brand And Model
    setBrandAndModel();
    mainCategories?.map((item) => {
      if (item.name === 'وسایل نقلیه') {
        item.children?.map((chItem) => {
          chItem.brands.map((bItem) => {
            brands !== undefined &&
              bItem.slug === `${category}/${brands}` &&
              setBrandAndModel(
                model !== undefined
                  ? {
                      id: bItem.id,
                      title: `${bItem.name}   >   ${model}`,
                      slug: `${bItem.slug}/${model}`,
                    }
                  : { id: bItem.id, title: bItem.name, slug: bItem.slug }
              );
          });
        });
      }
    });

    //Get And Set Search Param From Url
    setFilterItemsList([]);

    for (let key in searchObject) {
      if (key !== 'c' && key !== 'cities' && key !== 'o') {
        const id = key.match(/\d+/g);

        mainCategories?.map((item) => {
          item.attributes.map((attrItem) => {
            attrItem.id == id &&
              setFilterItemsList((prev) => [
                ...prev,
                { id: id, title: attrItem.title, slug: key },
              ]);
          });
          item.children?.map((chItem) => {
            chItem.attributes?.map((attrChItem) => {
              attrChItem.id == id &&
                setFilterItemsList((prev) => [
                  ...prev,
                  { id: id, title: attrChItem.title, slug: key },
                ]);
            });
          });
        });
      }
      key.includes('p') &&
        setFilterItemsList((prev) => [
          ...prev,
          { id: 0, title: 'قیمت', slug: key },
        ]);
    }
  }, [locationUrl]);

  return (
    <div
      onClick={sliderActions}
      className='w-full h-full overflow-x-scroll ul-box'
    >
      <ul id='places-category-ul' className='w-auto  px-1 flex gap-3 m-0'>
        <FilterBtn setFilterFormDisplay={setFilterFormDisplay} />
        <CategoryListBtn category={category} />
        {brandAndModel !== undefined && (
          <FilterItemBtn
            key={brandAndModel?.id}
            lable={brandAndModel?.title}
            slug={brandAndModel?.slug}
            locationUrl={locationUrl}
            navigateTo={navigateTo}
          />
        )}
        {filterItemsList?.map((fI) => {
          return (
            <FilterItemBtn
              key={fI.id}
              lable={fI.title}
              slug={fI.slug}
              locationUrl={locationUrl}
              navigateTo={navigateTo}
            />
          );
        })}
      </ul>
    </div>
  );
}
