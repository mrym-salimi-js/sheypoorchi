import { useSearchParams } from 'react-router-dom';
import { CategoryListBtn } from './CategoryListBtn';
import { FilterBtn } from './FilterBtn';
import FilterItemBtn from './FilterItemBtn';
import { FindMainCategories } from '../Category';
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../pages/Home';
import { scrollSlider } from '../../functions/globals/scrollSlider';
import { setFilteredPrice } from '../../functions/CategoryPageOptions/setFilteredPrice';
import { setFilteredItems } from '../../functions/CategoryPageOptions/setFilteredItems';
import { SortOptionsBtn } from './SortOptionsBtn';
import { setFilteredAdPhotoSetItem } from '../../functions/CategoryPageOptions/setFilteredAdPhotoSetItem';

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
      if (key !== 'c' && key !== 'cities') {
        const id = key.match(/\d+/g);

        mainCategories?.map((item) => {
          item.attributes.map((attrItem) => {
            attrItem.id == id &&
              setFilteredItems(
                key,
                (stateVal) => setFilterItemsList(stateVal),
                id,
                attrItem
              );
          });
          item.children?.map((chItem) => {
            chItem.attributes?.map((attrChItem) => {
              attrChItem.id == id &&
                setFilteredItems(
                  key,
                  (stateVal) => setFilterItemsList(stateVal),
                  id,
                  attrChItem
                );
            });
          });
        });

        setFilteredPrice(key, (stateVal) => setFilterItemsList(stateVal));
        setFilteredAdPhotoSetItem(key, (stateVal) =>
          setFilterItemsList(stateVal)
        );
      }
    }
  }, [locationUrl]);

  return (
    <div className='w-[99%] h-14 '>
      <div
        onClick={handleScrollItem}
        className='w-full h-full  filtered-item-box overflow-x-scroll ul-box'
      >
        <ul id='places-category-ul' className='w-auto   px-1 flex gap-3  m-0'>
          <FilterBtn />
          <SortOptionsBtn searchObject={searchObject} />
          <CategoryListBtn />
          {brandAndModel !== undefined && (
            <FilterItemBtn
              key={brandAndModel?.id}
              lable={brandAndModel?.title}
              slug={brandAndModel?.slug}
            />
          )}
          {filterItemsList?.map((fI, index) => {
            return (
              <FilterItemBtn
                key={fI.id * index}
                lable={fI.title}
                slug={fI.slug}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
