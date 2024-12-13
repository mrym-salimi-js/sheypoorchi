'use server';

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
import { navTo } from '../functions/globals/navTo';
import axios from 'axios';
import { getAds } from '../services/getAds';
export const HomeContext = createContext();

export default function Home() {
  const navigateTo = useNavigate();
  const params = useParams();
  const locationUrl = useLocation();
  const [cookie] = useCookies();
  const [filterFormDisplay, setFilterFormDisplay] = useState(
    'opacity-0 invisible'
  );
  const baseURL = import.meta.env.VITE_BASE_URL;
  // const [brandAndModel, setBrandAndModel] = useState();
  // Url Params
  const category = params.category;
  const brands = params.brands;
  const model = params.model;
  // Url Search
  const queryParams = new URLSearchParams(locationUrl.search);

  const [adsList, setAdsList] = useState();
  const [searchedAds, setSearchedAds] = useState();
  // Global Url Set In Home Page
  const cookieCitiesInUrl = encodeURIComponent(
    JSON.stringify(cookie['cities'])
  );

  // Get All Ads By every Change category and locationUrl
  useEffect(() => {
    // const getAd = async () => {
    //   const ads = await axios.get(
    //     `${baseURL}/api/ads?cities=${cookieCitiesInUrl}`
    //   );
    //   ads.status === 200 && setAdsList(ads.data.data);
    // };
    // const getAdsList = async () => {
    //   const response = await getAds();
    //   setAdsList(response.data);
    // };

    // if (!category) {
    //   cookie['cities'] !== undefined && cookie['cities'].length > 0
    //     ? getAd()
    //     : getAdsList();
    // }

    if (!category) return;
    const getAdsByUrlChanges = async () => {
      const response = await axios.get(
        `${baseURL}/api/ads/s/${category}?${queryParams}`
      );
      setAdsList(response.data.data);
    };
    getAdsByUrlChanges();
  }, [category, locationUrl]);

  // Get All Ads By First Rendering
  useEffect(() => {
    const getAd = async () => {
      const ads = await axios.get(
        `${baseURL}/api/ads?cities=${cookieCitiesInUrl}`
      );
      ads.status === 200 && setAdsList(ads.data.data);
    };
    cookie['cities'] && cookie['cities'].length > 0 && getAd();

    if (category) return;
    const getAdsList = async () => {
      const response = await getAds();
      setAdsList(response.data);
    };
    getAdsList();
  }, []);

  // Nave To After Change  Cities In Cookie
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
  }, [cookie, category]);

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
        // brandAndModel,
        // setBrandAndModel,
        setSearchedAds,
        adsList,
        cookieCitiesInUrl,
      }}
    >
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
