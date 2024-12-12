import { useContext } from 'react';
import { HomeContext } from '../../pages/Home';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { deleteFilterSearch } from '../../functions/adFilters/deleteFilterSearch';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function Head() {
  const locationUrl = useLocation();
  const navigateTo = useNavigate();

  const [allSearchItems] = useSearchParams();
  const searchObject = Object.fromEntries(allSearchItems.entries());
  // Get Url Search
  const searchItems = new URLSearchParams(locationUrl.search);

  const { setFilterFormDisplay } = useContext(HomeContext);
  const handleClearingFilter = () => {
    deleteFilterSearch(searchObject, searchItems, navigateTo, locationUrl);
    setFilterFormDisplay('opacity-0 invisible');
  };
  return (
    <div className='w-full h-30 p-8 flex items-center justify-between border-b '>
      <p className='text-lg lg:text-xl'>فیلتر</p>
      <BorderRoundedBtn
        lable={'حذف فیلتر'}
        handleAction={handleClearingFilter}
        borderColor={'border-[#84105C]'}
        bgColor={'bg-pink-50'}
        textColor={'text-[#84105C]'}
      />
    </div>
  );
}
