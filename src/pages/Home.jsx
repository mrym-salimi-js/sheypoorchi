import NavBar from '../components/NavBar';
import Category, { FindMainCategories } from '../components/Category';
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
import { getAdsByCategory } from '../services/getAdsByCategory';
import { getAds } from '../services/getAds';
import { useQuery } from '@tanstack/react-query';
import { navTo } from '../utils/globals/navTo';
import PageLoading from '../components/globals/PageLoading';
export const HomeContext = createContext();

export default function Home() {
  const navigateTo = useNavigate();
  const params = useParams();
  const locationUrl = useLocation();
  const [cookie] = useCookies();
  const [filterFormDisplay, setFilterFormDisplay] = useState(
    'opacity-0 invisible'
  );
  const [searchedAds, setSearchedAds] = useState();

  // const [brandAndModel, setBrandAndModel] = useState();
  // Url Params
  const category = params.category;
  const brands = params.brands;
  const model = params.model;
  // Url Search
  const searchParams = new URLSearchParams(locationUrl.search);
  const queryParams = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  // Global Url Set In Home Page
  const cookieCitiesInUrl = encodeURIComponent(
    JSON.stringify(cookie['cities'])
  );

  // Get All Ads By every Change category and queryParams
  const { data: adsList, isLoading } = useQuery({
    queryKey: ['ads', category, queryParams],
    queryFn:
      category || Object.keys(queryParams).length > 0
        ? async () => await getAdsByCategory(category, searchParams)
        : async () => await getAds(),

    keepPreviousData: true,
  });

  // Nave To After Change  Cities In Cookie
  useEffect(() => {
    if (cookie['cities'] !== undefined && cookie['cities'].length > 0) {
      searchParams.set('cities', cookieCitiesInUrl);

      navTo(locationUrl.pathname, searchParams, navigateTo);
    } else {
      searchParams.delete('cities');
      const pathName = !locationUrl.pathname.includes('/s/iran')
        ? 's/iran'
        : locationUrl.pathname;
      navTo(pathName, searchParams, navigateTo);
    }
  }, [cookieCitiesInUrl]);

  // Set Last Url In LocalStorage Before Change Url
  const mainCat = FindMainCategories();
  useEffect(() => {
    localStorage.setItem('last-url-pathname', locationUrl.pathname);
    localStorage.setItem('last-url-search', locationUrl.search);

    // Set Title For Metatag
    if (!locationUrl.pathname.includes('/s/iran')) return;
    if (!category) {
      document.title = 'شیپورچی مرجع نیازمندی های سرتاسر ایران';
    } else {
      const currentCat = mainCat?.find((item) => {
        return item.slug === category;
      });

      currentCat !== undefined &&
        (document.title = `اگهی های مربوط یه ${currentCat?.name}`);
    }
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
        setSearchedAds,
        adsList,
        cookieCitiesInUrl,
      }}
    >
      {isLoading && <PageLoading />}
      <div className='w-[98%] sm:w-[87%] h-full absolute flex flex-col gap-6 items-center mb-14  p-2'>
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
            <div className='w-[98%] h-auto p-4 flex flex-row gap-3 justify-start items-center border-t-[1px] border-b-[1px] '>
              <Speaker color={'#84105C'} size={'size-7'} />
              <HomePageBreadCrumb />
            </div>
          </>
        )}

        <AdsList adsList={searchedAds ? searchedAds : adsList} />
      </div>
      <NavBar />
    </HomeContext.Provider>
  );
}
