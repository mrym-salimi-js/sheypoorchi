import { useContext, useEffect, useMemo, useState } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { ChevronDown } from '../globals/Icons';
import { List } from '../formFileds/singleSelected/List';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { deleteFilterSearch } from '../../functions/adFilters/deleteFilterSearch';
import { HomeContext } from '../../pages/Home';
import { FindMainCategories } from '../Category';

export function CategoryListBtn() {
  const { category } = useContext(HomeContext);

  const [selectedCat, setSelectedCat] = useState();
  const [openList, setOpenList] = useState(false);
  const mainCats = FindMainCategories();
  const [listItems, setListItems] = useState();
  const navigateTo = useNavigate();
  const [filterListTitle, setFilterListTitle] = useState();
  const locationUrl = useLocation();

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

  useMemo(() => {
    setFilterListTitle({ name: 'همه گروه ها', slug: '', id: '' });

    setListItems(mainCats);
  }, [openList]);

  const handleCategoryListDisplay = () => {
    setOpenList(!openList);
  };

  // Delete Serach Item Of Url
  const searchItems = new URLSearchParams(locationUrl.search);
  const [allSearchItems] = useSearchParams();
  const searchObject = Object.fromEntries(allSearchItems.entries());
  useEffect(() => {
    deleteFilterSearch(searchObject, searchItems, navigateTo, locationUrl);
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
        <List
          lable={'دسته بندی'}
          allList={listItems}
          setListItems={setListItems}
          setOpenList={setOpenList}
          navigateTo={navigateTo}
          type={'category_search'}
          setFilterListTitle={setFilterListTitle}
          filterListTitle={filterListTitle}
          firstItemBold={true}
        />
      )}
    </>
  );
}
