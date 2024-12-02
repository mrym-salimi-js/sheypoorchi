import { useContext, useEffect, useState } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { ChevronDown } from '../globals/Icons';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { deleteFilterSearch } from '../../functions/adFilters/deleteFilterSearch';
import { HomeContext } from '../../pages/Home';
import { FindMainCategories } from '../Category';
import ListSupport from './ListSupport';

export function CategoryListBtn() {
  const { category } = useContext(HomeContext);
  const [selectedCat, setSelectedCat] = useState();
  const [openList, setOpenList] = useState(false);
  const mainCats = FindMainCategories();
  const navigateTo = useNavigate();
  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);
  const [allSearchItems] = useSearchParams();
  const searchObject = Object.fromEntries(allSearchItems.entries());

  // Get Selected Cat
  useEffect(() => {
    if (mainCats !== undefined) {
      mainCats.map((item) => {
        if (item.slug === category) {
          setSelectedCat({ id: item.id, name: item.name, slug: item.slug });
        }
        item.children?.map((chItem) => {
          chItem.slug === category &&
            setSelectedCat({
              id: chItem.id,
              name: chItem.name,
              slug: chItem.slug,
            });
        });
      });
    }
  }, [locationUrl]);

  const handleCategoryListDisplay = () => {
    setOpenList(!openList);
  };

  // Delete Serach Item Of Url
  useEffect(() => {
    deleteFilterSearch(searchObject, queryParams, navigateTo, locationUrl);
  }, [category]);

  return (
    <>
      <BorderRoundedBtn
        borderColor={'border-[#84105C]'}
        bgColor={'bg-pink-50'}
        textColor={'text-[#84105C]'}
        lable={selectedCat?.name}
        handleAction={handleCategoryListDisplay}
        icon={
          <ChevronDown color={'#84105C'} size={'size-5'} strokeWidth={'2'} />
        }
      />
      {openList && (
        <ListSupport
          setOpenList={setOpenList}
          openList={openList}
          navigateTo={navigateTo}
          list={mainCats}
          queryParams={queryParams}
          lable={'دسته بندی'}
          locationUrl={locationUrl}
          queryKey={'c'}
          type={'categorySearch'}
        />
      )}
    </>
  );
}
