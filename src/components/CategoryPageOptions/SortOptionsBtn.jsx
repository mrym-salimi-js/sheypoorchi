import { useEffect, useState } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import ListSupport from './ListSupport';
import { allCatSortOptions } from '../../functions/adFilters/categorySortOptionTyps';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sort } from '../globals/Icons';

export function SortOptionsBtn({ searchObject }) {
  const [openList, setOpenList] = useState(false);
  const navigateTo = useNavigate();
  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);
  const [selectedSO, setSelectedSO] = useState({
    name: 'جدیدترین',
    slug: 'n',
    id: 11111111,
  });
  const [sortOptions, setSortOptions] = useState();

  const handleSortOptions = () => {
    setOpenList(!openList);
  };

  useEffect(() => {
    setSortOptions(allCatSortOptions);

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
        lable={selectedSO?.name}
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
          lable={'مرتب سازی'}
          locationUrl={locationUrl}
          queryKey={'o'}
          setSelectedItem={setSelectedSO}
        />
      )}
    </>
  );
}
