import { useEffect, useState } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import ListSupport from './ListSupport';
import { allCatSortOptions } from '../../utils/adFilters/categorySortOptionTyps';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sort } from '../globals/Icons';

export function SortOptionsBtn({ sortOptions, searchObject }) {
  const [openList, setOpenList] = useState('opacity-0 invisible');
  const navigateTo = useNavigate();
  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);
  const [selectedSO, setSelectedSO] = useState({
    name: 'جدیدترین',
    slug: 'n',
    id: 11111111,
  });

  const handleSortOptions = () => {
    openList.includes('invisible')
      ? setOpenList('opacity-1 visible')
      : setOpenList('opacity-0 invisible');
  };

  useEffect(() => {
    allCatSortOptions.map((so) => {
      so.slug === searchObject['o'] && setSelectedSO(so);
    });
  }, [locationUrl]);

  return (
    <>
      <BorderRoundedBtn
        borderColor={'border-[#84105C]'}
        bgColor={'bg-pink-50'}
        textColor={'text-[#84105C]'}
        label={selectedSO?.name}
        handleAction={handleSortOptions}
        icon={<Sort color={'#84105C'} size={'size-5'} strokeWidth={'2'} />}
      />
      {openList && sortOptions && (
        <ListSupport
          setOpenList={setOpenList}
          openList={openList}
          navigateTo={navigateTo}
          list={sortOptions}
          queryParams={queryParams}
          label={'مرتب سازی'}
          locationUrl={locationUrl}
          queryKey={'o'}
          setSelectedItem={setSelectedSO}
        />
      )}
    </>
  );
}
