import { useEffect, useState } from 'react';
import MenuProfile from './MenuProfile';
import MenuItems from './MenuItems';
import { CherveLeftDouble, Speaker } from '../../globals/Icons';
import { lockBodyScroll } from '../../../utils/globals/lockBodyScroll';
import { unlockBodyScroll } from '../../../utils/globals/unlockBodyScroll';

export default function Menu() {
  const [openMenu, setOpenMenu] = useState('translate-x-[89%]');
  const handleOpeningMenu = () => {
    openMenu.includes('translate-x-0')
      ? setOpenMenu('translate-x-[89%]')
      : setOpenMenu('translate-x-0');
  };

  useEffect(() => {
    openMenu.includes('translate-x-0') ? lockBodyScroll() : unlockBodyScroll();
  }, [openMenu]);
  return (
    <div
      className={`w-full md:w-[35%]  lg:w-[25%] xl:w-[20%]  fixed top-0 right-0 h-full flex  items-center justify-center py-4  pr-3 transition-all ease-in-out duration-500 z-[100000]  ${openMenu} md:translate-x-0`}
    >
      {/* Menu Colored Box */}
      <div className='w-full  h-full rounded-[2rem] overflow-hidden justify-between bg-[rgb(43,58,62)] flex flex-col items-center '>
        <div className='w-full flex flex-col gap-6'>
          <div className='w-full flex flex-col justify-between pt-9 items-center'>
            <a
              href={'/s/iran'}
              className='w-auto h-auto flex gap-3 p-4 rounded-3xl outline-none bg-[#22776019]'
            >
              <Speaker color={'#227760'} size={'size-6'} />
              <p className='text-[#227760] text-md'>شیپورچی</p>
            </a>
            <MenuProfile />
          </div>
          {/* Menu Items */}
          <MenuItems setOpenMenu={setOpenMenu} />
        </div>
      </div>

      {/* Menu Opening Btn */}
      <div className='w-auto  md:hidden h-full  '>
        <div
          onClick={handleOpeningMenu}
          className='h-16 w-10  bg-[rgb(43,58,62)] relative top-20 left-2 p-1 rounded-l-3xl flex items-center justify-around  cursor-pointer'
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
