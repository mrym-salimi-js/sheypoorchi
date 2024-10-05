import { useContext } from 'react';
import { Logo } from './Logo';
import { NewAdBtn } from './NewAdBtn';
import SearchBar from './SearchBar';
import { UserAccountBtn } from './UserAccountBtn';
import { HomeContext } from '../../pages/Home';
import { linkTo } from '../globals/functions/linkTo';

export function Header() {
  const { navigateTo } = useContext(HomeContext);
  const handleNavTo = (event, href) => {
    linkTo(event, navigateTo, href);
  };
  return (
    <div className='w-full h-28 border-b-[1px] flex items-center justify-center gap-3 '>
      <div className='hidden xl:block'>
        <Logo handleNavTo={handleNavTo} />
      </div>
      <SearchBar />
      <NewAdBtn handleNavTo={handleNavTo} />
      <UserAccountBtn handleNavTo={handleNavTo} />
    </div>
  );
}
