import NavBar from '../components/NavBar';
import Category from '../components/Category';
import { AdsList } from '../components/advertisements/adComponents/AdsList';
import { useCookies } from 'react-cookie';
import { createContext, useEffect, useState } from 'react';
import AdFiltersBox from '../components/adFilters/AdFiltersBox';
import SelectedLoc from '../components/breadCrumbs/SelectedLocs';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { SubCategory } from '../components/CategoryPageOptions/SubCategory';
import { OptionsBtn } from '../components/CategoryPageOptions/OptionsBtn';
import BreadCrumbs from '../components/breadCrumbs/BreadCrumbs';

export const HomeContext = createContext();

export default function Home() {
  const navigateTo = useNavigate();
  const params = useParams();
  const locationUrl = useLocation();
  const [cookie, setCookie] = useCookies();
  const [filterFormDisplay, setFilterFormDisplay] = useState('hidden');

  // Set Selected Cat In Cookie
  const catItemInUrl = cookie['selectedCat'];
  useEffect(() => {
    setCookie('selectedCat', catItemInUrl ? catItemInUrl : '');
  }, []);

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
      navigateTo({
        pathname: locationUrl.pathname,
        search: queryParams.toString(),
      });
    } else {
      queryParams.delete('cities');
      navigateTo({
        pathname: !locationUrl.pathname.includes('/s/iran')
          ? 's/iran'
          : locationUrl.pathname,
        search: queryParams.toString(),
      });
    }
  }, [cookieCitiesInUrl]);

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
      }}
    >
      <div className='w-[98%] sm:w-[85%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>
        <Header />
        {category !== undefined && (
          <>
            <AdFiltersBox />
            <OptionsBtn />
            <SubCategory />
            <BreadCrumbs />
          </>
        )}
        {category === undefined && (
          <>
            <Category />
            <SelectedLoc />
          </>
        )}

        <AdsList />
      </div>
      <NavBar />
    </HomeContext.Provider>
  );
}
