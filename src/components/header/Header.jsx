import { Logo } from './Logo';
import { NewAdBtn } from './NewAdBtn';
import SearchBar from './SearchBar';
import { UserAccountBtn } from './UserAccountBtn';

export function Header() {
  return (
    <div className='w-full h-28 border-b-[1px] flex items-center justify-center gap-3 '>
      <div className='hidden xl:block'>
        <Logo />
      </div>
      <SearchBar />
      <NewAdBtn />
      <UserAccountBtn />
    </div>
  );
}
