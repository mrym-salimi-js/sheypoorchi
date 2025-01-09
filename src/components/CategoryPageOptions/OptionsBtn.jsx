import { useSearchParams } from 'react-router-dom';
import { CategoryListBtn } from './CategoryListBtn';
import { FilterBtn } from './FilterBtn';
import FilterItemBtn from './FilterItemBtn';
import { FindMainCategories } from '../Category';
import { useContext, useMemo, useState } from 'react';
import { HomeContext } from '../../pages/Home';
import { scrollSlider } from '../../utils/globals/scrollSlider';
import { setFilteredPrice } from '../../utils/CategoryPageOptions/setFilteredPrice';
import { setFilteredItems } from '../../utils/CategoryPageOptions/setFilteredItems';
import { SortOptionsBtn } from './SortOptionsBtn';
import { setFilteredAdPhotoSetItem } from '../../utils/CategoryPageOptions/setFilteredAdPhotoSetItem';

export function OptionsBtn() {
  const { category, brands, model, locationUrl } = useContext(HomeContext);

  const handleScrollItem = () => {
    scrollSlider(document.querySelectorAll('.filtered-item-box'));
  };
  const [searchItems] = useSearchParams();
  const searchObject = Object.fromEntries(searchItems.entries());
  const mainCategories = FindMainCategories();
  // const [filterItemsList, setFilterItemsList] = useState([]);

  // Memoized computation for setting brand and model
  const computedBrandAndModel = useMemo(() => {
    let res = null;
    mainCategories?.map((item) => {
      if (item.name === 'وسایل نقلیه') {
        item.children?.forEach((chItem) => {
          chItem.brands.forEach((bItem) => {
            if (
              brands !== undefined &&
              bItem.slug === `${category}/${brands}`
            ) {
              res =
                model !== undefined
                  ? {
                      id: bItem.id,
                      title: `${bItem.name}   /   ${model}`,
                      slug: `${bItem.slug}/${model}`,
                    }
                  : { id: bItem.id, title: bItem.name, slug: bItem.slug };
            }
          });
        });
      }
    });
    return res;
  }, [locationUrl]);

  // Memoized computation for filter items list
  const computedFilterItemsList = useMemo(() => {
    let res = [];
    for (let key in searchObject) {
      if (key !== 'c' && key !== 'cities') {
        const id = key.match(/\d+/g);

        mainCategories?.map((item) => {
          item.attributes.map((attrItem) => {
            attrItem.id == id && setFilteredItems(key, res, id, attrItem);
          });
          item.children?.map((chItem) => {
            chItem.attributes?.map((attrChItem) => {
              attrChItem.id == id && setFilteredItems(key, res, id, attrChItem);
            });
          });
        });
      }
      setFilteredPrice(key, res);
      setFilteredAdPhotoSetItem(key, res);
    }
    return res;
  }, [locationUrl]);

  const [sortOptions, setSortOptions] = useState();
  return (
    <div className='w-[99%] h-14 '>
      <div
        onClick={handleScrollItem}
        className='w-full h-full  filtered-item-box overflow-x-scroll ul-box'
      >
        <ul id='places-category-ul' className='w-auto   px-1 flex gap-1 m-0'>
          <FilterBtn />
          <SortOptionsBtn
            sortOptions={sortOptions}
            searchObject={searchObject}
          />
          <CategoryListBtn setSortOptions={setSortOptions} />
          {computedBrandAndModel && (
            <FilterItemBtn
              key={computedBrandAndModel?.id}
              lable={computedBrandAndModel?.title}
              slug={computedBrandAndModel?.slug}
            />
          )}
          {computedFilterItemsList?.map((fI, index) => {
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
