import NavBar from '../components/NavBar';
import { AdsList } from '../components/advertisements/AdsList';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { navTo } from '../utils/globals/navTo';
import { updateUserStatus } from '../services/user/updateUserStatus';
import { useAdsByUrlChange } from '../hooks/useAdsByUrlChange';
import { useUrlSearchParam } from '../hooks/useUrlSearchParam';
import { useNavToByCityChange } from '../hooks/useNavToByCityChange';
import { useCitiesInCookie } from '../hooks/useCitiesInCookie';
import { useLastUrl } from '../hooks/useLastUrl';
import CategoryPage from '../components/CategoryPageDetails';
import HomePageDetails from '../components/HomePageDetails';
import { createContext, useState } from 'react';
import { LoadingWrapper } from '../components/globals/LoadingWrapper';

export const HomeContext = createContext();
export default function Home() {
  updateUserStatus();
  const navigateTo = useNavigate();
  const params = useParams();
  const locationUrl = useLocation();
  const [cookie] = useCookies();
  const [searchedAds, setSearchedAds] = useState();
  // Url Params
  const category = params.category;
  const brands = params.brands;
  const model = params.model;

  // Url Search
  const { searchParams, searchPureObj } = useUrlSearchParam(locationUrl);

  // Get All Ads By every Change category and searchPureObj
  const { adsList, isLoading } = useAdsByUrlChange(
    category,
    searchPureObj,
    searchParams
  );

  // Global Url Set In Home Page
  const cookieCitiesInUrl = useCitiesInCookie(cookie);
  // Nave To After Change  Cities In Cookie
  useNavToByCityChange({
    cookie,
    locationUrl,
    searchParams,
    navigateTo,
    navTo,
  });

  // Set Last Url In LocalStorage Before Change Url
  useLastUrl(locationUrl, category);

  return (
    <HomeContext.Provider
      value={{
        category,
        brands,
        model,
        locationUrl,
        navigateTo,
        searchParams,
        setSearchedAds,
        adsList,
        cookieCitiesInUrl,
      }}
    >
      <LoadingWrapper isLoading={isLoading}>
        <div className='w-[98%] sm:w-[87%] h-full absolute flex flex-col gap-6 items-center mb-14  p-2'>
          <Header />
          {category && <CategoryPage />}
          {category === undefined && <HomePageDetails />}

          <AdsList adsList={searchedAds ? searchedAds : adsList?.data?.data} />
        </div>
        <NavBar />
      </LoadingWrapper>
    </HomeContext.Provider>
  );
}
