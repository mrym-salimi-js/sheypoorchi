import { useEffect, useState } from 'react';
import SingleSelected from '../../formFileds/singleSelected/SingleSelected';
import ToggleSwich from '../../formFileds/ToggleSwich';
import TextComponent from '../../formFileds/TextComponent';
import LocationBox from '../../locations/LocationBox';
import { useCookies } from 'react-cookie';
import { selectedLocations } from '../../locations/selectedLocations';
import { useNavigate, useParams } from 'react-router-dom';
import AttrsFields from './AttrsFields';

export function Fields() {
  const [cookie, setCookie] = useCookies();
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

  // Selected Location Names Setting
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
            itemCh.defaultSortid && setDefaultSortid(itemCh.defaultSortid);
            itemCh.sortOptions.length > 0 && setSortOptions(itemCh.sortOptions);
          }
        });
      });
    }
  }, [category, adsCategoriesList]);

  return (
    <div className='w-full h-auto p-6 flex flex-col gap-8 pb-[5.25rem]'>
      {/* SortOptions */}
      {sortOptions.length > 0 && (
        <SingleSelected
          lable={'مرتب سازی'}
          allList={sortOptions}
          defaultItem={sortOptions.find((o) => o.id === defaultSortid).title}
          type={'filter'}
        />
      )}

      <ToggleSwich lable='فقط آگهی های عکس دار' />

      {/* Categories */}
      {selectedCat && (
        <SingleSelected
          lable={'دسته بندی'}
          allList={adsCategoriesList}
          type={'filter'}
          defaultItem={selectedCat.name}
          setCookie={setCookie}
          cookie={cookie}
          navigateTo={navigateTo}
        />
      )}

      {/* Locations */}
      <TextComponent
        setOpenList={setOpenLocation}
        adLable={'استان و شهر'}
        itemTitle={selectedLoc}
      />
      {openLocation && <LocationBox setOpenLocation={setOpenLocation} />}

      {/* Category Parent Attributes */}
      {parentCatAttr.length > 0 && (
        <AttrsFields
          catAttrs={parentCatAttr}
          setOpenLocation={setOpenLocation}
        />
      )}
      {/* Category Child Attributes */}
      {childCatAttr.length > 0 && (
        <AttrsFields
          catAttrs={parentCatAttr}
          setOpenLocation={setOpenLocation}
        />
      )}
    </div>
  );
}
