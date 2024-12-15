import { useState } from 'react';
import MenuProfile from './MenuProfile';
import MenuItems from './MenuItems';
import { CherveLeftDouble } from '../../globals/Icons';

export default function Menu() {
  const [openMenu, setOpenMenu] = useState('translate-x-[85%]');
  const handleOpeningMenu = () => {
    openMenu.includes('translate-x-0')
      ? setOpenMenu('translate-x-[85%]')
      : setOpenMenu('translate-x-0');
  };

  return (
    <div
      className={`w-full sm:w-[35%]  lg:w-[25%] xl:w-[20%]  fixed right-0 h-full flex  items-center justify-center py-4 pl-4 pr-3 transition-all ease-in-out duration-500 z-[100000]  ${openMenu} sm:translate-x-0`}
    >
      {/* Menu Colored Box */}
      <div className='w-full  h-full rounded-[4rem] overflow-hidden justify-between bg-[#6e2956] flex flex-col items-center '>
        <div className='w-full flex flex-col gap-6'>
          <div className='w-full flex flex-col justify-between'>
            <MenuProfile />
          </div>
          {/* Menu Items */}
          <MenuItems />
        </div>
      </div>

      {/* Menu Opening Btn */}
      <div className='w-auto  md:hidden h-full  '>
        <div
          onClick={handleOpeningMenu}
          className='h-16 w-10  bg-[#6e2956] relative top-20 left-2 p-1 rounded-l-3xl flex items-center justify-around  cursor-pointer'
        >
          <CherveLeftDouble
            color={'#ffffff'}
            size={'size-4 hover:opacity-[0.7] transition-all'}
          />
        </div>
      </div>
    </div>
  );
}
