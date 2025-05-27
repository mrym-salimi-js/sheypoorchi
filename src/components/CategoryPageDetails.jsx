import { createContext, useState } from 'react';
import AdFiltersBox from './adFilters/AdFiltersBox';
import CategoryPageBreadCrumbs from './breadCrumbs/CategoryPageBreadCrumbs';
import { OptionsBtn } from './CategoryPageOptions/OptionsBtn';
import { SubCategory } from './CategoryPageOptions/SubCategory';
export const CategoryPageContext = createContext();

export default function CategoryPageDetails() {
  const [filterFormDisplay, setFilterFormDisplay] = useState(
    'opacity-0 invisible'
  );

  return (
    <CategoryPageContext.Provider
      value={{
        filterFormDisplay,
        setFilterFormDisplay,
      }}
    >
      <AdFiltersBox />
      <OptionsBtn />
      <SubCategory />
      <CategoryPageBreadCrumbs />
    </CategoryPageContext.Provider>
  );
}
