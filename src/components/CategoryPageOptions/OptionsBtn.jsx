import { useSearchParams } from 'react-router-dom';
import { CategoryListBtn } from './CategoryListBtn';
import { FilterBtn } from './FilterBtn';
import FilterItemBtn from './FilterItemBtn';
import { FindMainCategories } from '../Category';
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../pages/Home';
import { scrollSlider } from '../../functions/globals/scrollSlider';

export function OptionsBtn() {
  const {
    category,
    brands,
    model,
    locationUrl,
    brandAndModel,
    setBrandAndModel,
  } = useContext(HomeContext);

  const handleScrollItem = () => {
    scrollSlider(document.querySelectorAll('.filtered-item-box'));
  };
  const [searchItems] = useSearchParams();
  const searchObject = Object.fromEntries(searchItems.entries());
  const mainCategories = FindMainCategories();
  const [filterItemsList, setFilterItemsList] = useState([]);

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
                      title: `${bItem.name}   /   ${model}`,
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
      key.includes('mxp') &&
        setFilterItemsList((prev) => [
          ...prev,
          { id: 0, title: 'حداکثر قیمت', slug: key },
        ]);
      key.includes('mnp') &&
        setFilterItemsList((prev) => [
          ...prev,
          { id: 0, title: 'حداقل قیمت', slug: key },
        ]);
    }
  }, [locationUrl]);
  console.log(filterItemsList);
  return (
    <div
      onClick={handleScrollItem}
      className='w-full  filtered-item-box ul-box'
    >
      <ul
        id='places-category-ul overflow-x-scroll'
        className='w-auto  px-1 flex gap-3 m-0'
      >
        <FilterBtn />
        <CategoryListBtn />
        {brandAndModel !== undefined && (
          <FilterItemBtn
            key={brandAndModel?.id}
            lable={brandAndModel?.title}
            slug={brandAndModel?.slug}
          />
        )}
        {filterItemsList?.map((fI) => {
          return (
            <FilterItemBtn key={fI.id + 1} lable={fI.title} slug={fI.slug} />
          );
        })}
      </ul>
    </div>
  );
}
