import { Logo } from './Logo';
import { NewAdBtn } from './NewAdBtn';
import SearchBar from './SearchBar';
import { UserAccountBtn } from './UserAccountBtn';
import { useLocation, useParams } from 'react-router-dom';

export function Header() {
  // use sepereted  locationUrl from Home page, because of Header component that use in differ pages
  const locationUrl = useLocation();
  const params = useParams();

  return (
    <div className='w-full h-auto py-3  border-b-[1px] flex items-center justify-between'>
      <Logo />

      {locationUrl.pathname !== '/newAd' &&
        !locationUrl.pathname.startsWith('/myAccount') &&
        params.id === undefined && <SearchBar />}

      <div className='hidden xl:flex w-auto  gap-3 items-center'>
        {locationUrl.pathname !== '/newAd' && <NewAdBtn />}
        <UserAccountBtn />
      </div>
    </div>
  );
}
