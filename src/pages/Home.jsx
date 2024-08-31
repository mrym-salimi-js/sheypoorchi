import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import Category from '../components/Category';
import { AdsList } from '../components/advertisements/adComponents/AdsList';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import AdFilters from '../components/adFilters/AdFilters';
import SelectedLoc from '../components/breadCrumbs/SelectedLocs';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigateTo = useNavigate();
  const params = useParams();
  const locationUrl = useLocation();
  const [cookie, setCookie] = useCookies();

  const catItemInUrl = cookie['selectedCat'];
  useEffect(() => {
    setCookie('selectedCat', catItemInUrl ? catItemInUrl : '');
  }, []);

  const cookieCitiesInUrl = encodeURIComponent(
    JSON.stringify(cookie['cities'])
  );

  const category = params.category;
  console.log(category);

  useEffect(() => {
    const queryParams = new URLSearchParams(locationUrl.search);
    if (cookie['cities'] !== undefined && cookie['cities'].length > 0) {
      queryParams.set('cities', cookieCitiesInUrl);
      navigateTo({
        pathname: locationUrl.pathname,
        search: queryParams.toString(),
      });
    } else {
      navigateTo({
        pathname: locationUrl.pathname,
      });
    }
  }, [cookieCitiesInUrl]);

  return (
    <>
      <SearchBar />
      <AdFilters />
      <div className='w-[80%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>
        <Category />
        <SelectedLoc />
        <AdsList />
      </div>
      <NavBar />
    </>
  );
}
