import { useEffect, useMemo, useState } from 'react';
import SingleSelected from '../../formFileds/singleSelected/SingleSelected';
import ToggleSwich from '../../formFileds/ToggleSwich';
import TextComponent from '../../formFileds/TextComponent';
import LocationBox from '../../locations/LocationBox';
import { useCookies } from 'react-cookie';
import { selectedLocations } from '../../locations/selectedLocations';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import AttrsFields from './AttrsFields';
import { allCatSortOptions } from '../categorySortOptionTyps';
import { deleteFilterSearch } from '../deleteFilterSearch';

export function Fields() {
  const [cookie] = useCookies();
  const navigateTo = useNavigate();
  const params = useParams();

  const category = params.category;

  const locs = JSON.parse(localStorage.getItem('ads_locations_list'));
  const [selectedLoc, setSelectedLoc] = useState('');
  const [selectedCat, setSelectedCat] = useState();
  const [adsCategoriesList, setAdsCategoriesList] = useState();
  const [parentCatAttr, setParentCatAttr] = useState([]);
  const [childCatAttr, setChildCatAttr] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [defaultSortid, setDefaultSortid] = useState(1);
  const [openLocation, setOpenLocation] = useState(false);
  const [selctedSo, setSelectedSo] = useState();
  const locationUrl = useLocation();
  // Get Url Search
  const searchItems = new URLSearchParams(locationUrl.search);

  // Selected Location Setting
  useEffect(() => {
    selectedLocations(
      cookie,
      (locVal) => {
        setSelectedLoc(locVal);
      },
      locs
    );
  }, [cookie['cities']]);

  // Get Categories List From Localhost
  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
    cats && setAdsCategoriesList(cats);
  }, []);

  // Find Selected Category For Filter Form
  useEffect(() => {
    if (adsCategoriesList !== undefined && category) {
      adsCategoriesList?.find((item) => {
        // Get Parent Cat Attrs
        if (item.slug === category && item.type != 0) {
          setParentCatAttr([]);
          setParentCatAttr(item.attributes);
          setChildCatAttr([]);
          setSelectedCat(item);
          item.defaultSortid && setDefaultSortid(item.defaultSortid);
          item.sortOptions.length > 0 && setSortOptions(item.sortOptions);
        }
        //Get Child Cat Attrs
        item.children?.find((itemCh) => {
          if (itemCh?.slug === category) {
            setChildCatAttr(itemCh.attributes);
            setParentCatAttr(item.attributes);
            setSelectedCat(itemCh);
            itemCh.defaultSortid && setSortOptions(itemCh.sortOptions);
            itemCh.sortOptions.length > 0 && setSortOptions(itemCh.sortOptions);
          }
        });
      });
    }
  }, [category, adsCategoriesList]);

  // Find Selected Sort Opton In Url
  useMemo(() => {
    const selctedSos = allCatSortOptions.find((soItem) => {
      return soItem.slug === searchItems.get('o');
    });
    if (sortOptions.length > 0) {
      selctedSos !== undefined
        ? setSelectedSo(selctedSos.name)
        : setSelectedSo(sortOptions.find((o) => o.id === defaultSortid).title);
    }
  }, [locationUrl]);

  // Delete Serach Item Of Url
  const [allSearchItems] = useSearchParams();
  const searchObject = Object.fromEntries(allSearchItems.entries());
  useEffect(() => {
    deleteFilterSearch(searchObject, searchItems, navigateTo, locationUrl);
  }, [category]);

  return (
    <div className='w-full h-auto p-6 flex flex-col gap-8 pb-[5.25rem]'>
      {/* SortOptions */}
      {sortOptions.length > 0 && selctedSo !== undefined && (
        <SingleSelected
          lable={'مرتب سازی'}
          allList={sortOptions}
          defaultItem={selctedSo}
          type={'filter'}
          navigateTo={navigateTo}
          queryKey={'o'}
          firstItemBold={true}
        />
      )}

      {/* By Photo Ad Switch */}
      <ToggleSwich
        lable='فقط آگهی های عکس دار'
        type={'filter'}
        queryKey={'wp'}
        navigateTo={navigateTo}
      />

      {/* Categories */}
      {selectedCat && (
        <SingleSelected
          lable={'دسته بندی'}
          allList={adsCategoriesList}
          type={'filter'}
          defaultItem={selectedCat.name}
          navigateTo={navigateTo}
          queryKey={'c'}
          firstItemBold={true}
        />
      )}

      {/* Locations */}
      <TextComponent
        setOpenList={setOpenLocation}
        adLable={'استان و شهر'}
        itemTitle={selectedLoc}
        type={'filter'}
      />

      {openLocation && <LocationBox setOpenLocation={setOpenLocation} />}

      {/* Category Parent Attributes */}
      {parentCatAttr.length > 0 && (
        <AttrsFields
          catAttrs={parentCatAttr}
          setOpenLocation={setOpenLocation}
          navigateTo={navigateTo}
          searchItems={searchItems}
        />
      )}
      {/* Category Child Attributes */}
      {childCatAttr.length > 0 && (
        <AttrsFields
          catAttrs={childCatAttr}
          setOpenLocation={setOpenLocation}
          navigateTo={navigateTo}
          searchItems={searchItems}
        />
      )}
    </div>
  );
}
