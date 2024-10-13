import { Logo } from './Logo';
import { NewAdBtn } from './NewAdBtn';
import SearchBar from './SearchBar';
import { UserAccountBtn } from './UserAccountBtn';
import { linkTo } from '../../functions/globals/linkTo';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function Header() {
  // use sepereted navigateTo and locationUrl from Home page, because of Header component that use in differ pages
  const locationUrl = useLocation();
  const navigateTo = useNavigate();
  const params = useParams();
  const handleNavTo = (event, href) => {
    localStorage.setItem('last-url-pathname', locationUrl.pathname);
    localStorage.setItem('last-url-search', locationUrl.search);
    linkTo(event, navigateTo, href);
  };

  return (
    <div className='w-full h-auto py-3  border-b-[1px] flex items-center justify-between'>
      <Logo handleNavTo={handleNavTo} />

      {locationUrl.pathname !== '/newAd' && params.id === undefined && (
        <SearchBar />
      )}
      <div className='w-auto  flex gap-3 items-center'>
        {locationUrl.pathname !== '/newAd' && (
          <NewAdBtn handleNavTo={handleNavTo} />
        )}
        <UserAccountBtn handleNavTo={handleNavTo} />
      </div>
    </div>
  );
}
