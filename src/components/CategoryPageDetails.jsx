import { createContext, useContext, useMemo, useState } from 'react';
import AdFiltersBox from './adFilters/AdFiltersBox';
import CategoryPageBreadCrumbs from './breadCrumbs/CategoryPageBreadCrumbs';
import { OptionsBtn } from './CategoryPageOptions/OptionsBtn';
import { SubCategory } from './CategoryPageOptions/SubCategory';
import { HomeContext } from '../pages/Home';
import { useMainCats } from '../hooks/useMainCats';
export const CategoryPageContext = createContext();

export default function CategoryPageDetails() {
  const [filterFormDisplay, setFilterFormDisplay] = useState(
    'opacity-0 invisible'
  );

  const { brand, model, locationUrl, category } = useContext(HomeContext);

  const mainCategories = useMainCats();
  // Get Cat and subCat Items
  const computeCatList = useMemo(() => {
    if (mainCategories === undefined) return;
    let res = { category: [], subCategory: [] };

    mainCategories.map((item) => {
      const mainCat = { id: item.id, name: item.name, slug: item.slug };
      item.slug === category &&
        (res = {
          category: [mainCat],
          subCategory: item.children,
        });

      item.children?.map((chItem) => {
        const subCat = { id: chItem.id, name: chItem.name, slug: chItem.slug };
        chItem.slug === category &&
          (res = {
            category: [mainCat, subCat],
            subCategory: chItem.brands,
          });

        chItem.brands?.map((bItem) => {
          const brandItem = {
            ...res.category,
            id: bItem.id,
            name: bItem.name,
            slug: bItem.slug,
          };
          if (bItem.slug === `${category}/${brand}`) {
            bItem.attributes.length > 0
              ? bItem.attributes?.map((bAttrItem) => {
                  res = {
                    category: [mainCat, subCat, brandItem],
                    subCategory: bAttrItem.options,
                  };
                })
              : (res = {
                  category: [mainCat, subCat, brandItem],
                  subCategory: [],
                });
            if (model) {
              res = {
                category: [
                  mainCat,
                  subCat,
                  brandItem,
                  { id: model, name: model, slug: model },
                ],
                subCategory: [],
              };
            }
          }
        });
      });
    });
    return res;
  }, [locationUrl]);

  return (
    <CategoryPageContext.Provider
      value={{
        filterFormDisplay,
        setFilterFormDisplay,
        computeCatList,
      }}
    >
      <AdFiltersBox />
      <OptionsBtn />
      <SubCategory />
      <CategoryPageBreadCrumbs />
    </CategoryPageContext.Provider>
  );
}
