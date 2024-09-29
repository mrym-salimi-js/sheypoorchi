import NavBar from '../components/NavBar';
import Category from '../components/Category';
import { AdsList } from '../components/advertisements/adComponents/AdsList';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import AdFiltersBox from '../components/adFilters/AdFiltersBox';
import SelectedLoc from '../components/breadCrumbs/SelectedLocs';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { SubCategory } from '../components/CategoryPageOptions/SubCategory';
import { OptionsBtn } from '../components/CategoryPageOptions/OptionsBtn';
import BreadCrumbs from '../components/breadCrumbs/BreadCrumbs';

export default function Home() {
  const navigateTo = useNavigate();
  const params = useParams();
  const locationUrl = useLocation();
  const [cookie, setCookie] = useCookies();
  const [filterFormDisplay, setFilterFormDisplay] = useState('hidden');

  const catItemInUrl = cookie['selectedCat'];
  useEffect(() => {
    setCookie('selectedCat', catItemInUrl ? catItemInUrl : '');
  }, []);

  const cookieCitiesInUrl = encodeURIComponent(
    JSON.stringify(cookie['cities'])
  );

  // Url Params
  const category = params.category;
  const brands = params.brands;
  const model = params.model;

  useEffect(() => {
    const queryParams = new URLSearchParams(locationUrl.search);

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
    <>
      <div className='w-[85%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>
        <Header />
        {category !== undefined && (
          <>
            <AdFiltersBox
              filterFormDisplay={filterFormDisplay}
              setFilterFormDisplay={setFilterFormDisplay}
            />
            <OptionsBtn
              setFilterFormDisplay={setFilterFormDisplay}
              category={category}
              brands={brands}
              model={model}
              locationUrl={locationUrl}
            />
            <SubCategory
              category={category}
              brands={brands}
              locationUrl={locationUrl}
            />
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
    </>
  );
}
