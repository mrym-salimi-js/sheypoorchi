import NavBar from '../components/NavBar';
import Category from '../components/Category';
import { AdsList } from '../components/advertisements/AdsList';
import { useCookies } from 'react-cookie';
import { createContext, useEffect, useState } from 'react';
import AdFiltersBox from '../components/adFilters/AdFiltersBox';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { SubCategory } from '../components/CategoryPageOptions/SubCategory';
import { OptionsBtn } from '../components/CategoryPageOptions/OptionsBtn';
import { Speaker } from '../components/globals/Icons';
import CategoryPageBreadCrumbs from '../components/breadCrumbs/CategoryPageBreadCrumbs';
import HomePageBreadCrumb from '../components/breadCrumbs/HomePageBreadCrumb';
import { navTo } from '../functions/globals/navTo';
export const HomeContext = createContext();

export default function Home() {
  const navigateTo = useNavigate();
  const params = useParams();
  const locationUrl = useLocation();
  const [cookie] = useCookies();
  const [filterFormDisplay, setFilterFormDisplay] = useState('hidden');
  const [brandAndModel, setBrandAndModel] = useState();
  // Url Params
  const category = params.category;
  const brands = params.brands;
  const model = params.model;
  // Url Search
  const queryParams = new URLSearchParams(locationUrl.search);

  // Global Url Set In Home Page
  const cookieCitiesInUrl = encodeURIComponent(
    JSON.stringify(cookie['cities'])
  );
  useEffect(() => {
    if (cookie['cities'] !== undefined && cookie['cities'].length > 0) {
      queryParams.set('cities', cookieCitiesInUrl);
      navTo(locationUrl.pathname, queryParams, navigateTo);
    } else {
      queryParams.delete('cities');
      const pathName = !locationUrl.pathname.includes('/s/iran')
        ? 's/iran'
        : locationUrl.pathname;
      navTo(pathName, queryParams, navigateTo);
    }
  }, [cookieCitiesInUrl]);

  useEffect(() => {
    // Set Last Url In LocalStorage Before Change Url
    localStorage.setItem('last-url-pathname', locationUrl.pathname);
    localStorage.setItem('last-url-search', locationUrl.search);
  }, [locationUrl]);

  return (
    <HomeContext.Provider
      value={{
        filterFormDisplay,
        setFilterFormDisplay,
        category,
        brands,
        model,
        locationUrl,
        navigateTo,
        queryParams,
        brandAndModel,
        setBrandAndModel,
      }}
    >
      <div className='w-[98%] sm:w-[85%] h-full absolute flex flex-col gap-6 items-center mb-14  p-2'>
        <Header />
        {category && (
          <>
            <AdFiltersBox />
            <OptionsBtn />
            <SubCategory />
            <CategoryPageBreadCrumbs />
          </>
        )}
        {category === undefined && (
          <>
            <Category />
            <div className='w-[98%] h-auto p-4 flex flex-row gap-3 justify-start items-center border-t-[1px] border-b-[1px]'>
              <Speaker color={'#84105C'} size={'size-7'} />
              <HomePageBreadCrumb />
            </div>
          </>
        )}

        <AdsList
          category={category}
          queryParams={queryParams}
          locationUrl={locationUrl}
        />
      </div>
      <NavBar />
    </HomeContext.Provider>
  );
}
