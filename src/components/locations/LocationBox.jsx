import { useCookies } from 'react-cookie';
import { createContext, useEffect, useState } from 'react';
import { ProvincesList } from './provinces/ProvincesList';
import { BackBtn } from '../globals/BackBtn';
import { citiesList } from '../../utils/localStorage/locations';
import { DeleteAllFilterdCitiesBtn } from './DeleteAllFilterdCitiesBtn';
import { FilteringCity } from './FilteringCity';
import { SearchLocation } from './SearchLocation';
import { SearchItems } from './SearchItems';
import { EntryChangesBtn } from './EntryChangesBtn';
import { CitiesList } from './cities/CitiesList';
import { findProvinces } from '../../utils/locations/findProvinces';

export const LocationContext = createContext();

export default function LocationBox({ setOpenLocation, openLocation }) {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [locSituation, setLocSituation] = useState('استان');
  const [allCheckedBoxes, setAllCheckedBoxes] = useState([]);
  const [check, setCheck] = useState([]);
  const [prvId, setPrvId] = useState();
  const [prvName, setPrvName] = useState();
  const [searchRes, setSearchRes] = useState([]);
  const [deleteAllBtnClicked, setDeleteAllBtnClicked] = useState(false);
  const [removedAllLocs, setRemovedAllLocs] = useState(false);

  const cities = citiesList();

  useEffect(() => {
    setLocSituation('استان');
    setRemovedAllLocs(false);
    const list = [];
    cities?.forEach((city) => {
      if (cookie['cities']) {
        cookie['cities'].includes(city.id) &&
          list.push({
            name: city.name,
            id: city.id,
            province_id: city.province_id,
          });
      }
    });
    list.length > 0 && setAllCheckedBoxes(list);
    if (cookie['provinces']) {
      setCheck(cookie['provinces']);
    }
  }, [openLocation]);

  const prvs = findProvinces();
  const [prvList, setPrvList] = useState();
  useEffect(() => {
    setPrvList(prvs);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        setLocSituation,
        setAllCheckedBoxes,
        allCheckedBoxes,
        setCheck,
        setDeleteAllBtnClicked,
        setRemovedAllLocs,
        prvId,
        setPrvName,
        setSearchRes,
        locSituation,
        prvName,
        check,
        searchRes,
        setPrvId,
        setCookie,
        cookie,
        deleteAllBtnClicked,
        removeCookie,
        removedAllLocs,
        setOpenLocation,
      }}
    >
      <div
        className={`w-full h-full fixed top-0 right-0 bg-[#00000073] z-[100000] transition-opacity duration-1000 ease-in-out  ${openLocation}`}
      ></div>
      <div
        className={`w-full h-full flex flex-col items-center justify-end lg:justify-center fixed top-0 right-0   transition-all duration-1000 ease-in-out z-[1000000]  ${
          !openLocation.includes('invisible')
            ? `translate-y-0`
            : `translate-y-full`
        }    `}
      >
        <div className='w-full md:w-[75%] lg:w-[40%] h-[88%] bg-white rounded-2xl relative  z-[100000] border border-gray-50  overflow-hidden top-5 bottom-0  p-7 '>
          <div className=' flex flex-col gap-4'>
            <div className='flex justify-between items-center border-r-4 border-pink-400 pr-2'>
              <div className='flex'>
                {locSituation === 'شهر' && (
                  <BackBtn
                    title={'استان'}
                    setTitle={setLocSituation}
                    setSearchRes={setSearchRes}
                    setFieldVal={setPrvList}
                    lastList={prvList}
                  />
                )}
                <p className='w-auto text-md  p-2 '>انتخاب {locSituation}</p>
              </div>

              {allCheckedBoxes?.length > 0 && <DeleteAllFilterdCitiesBtn />}
            </div>

            {allCheckedBoxes?.length > 0 ? (
              <FilteringCity />
            ) : (
              <p className='text-[11px] text-gray-300 border-r-4 border-pink-400 p-2'>
                حداقل یک شهر را انتخاب کنید
              </p>
            )}

            <SearchLocation />
          </div>
          {searchRes?.length === 0 ? (
            locSituation === 'استان' ? (
              <ProvincesList />
            ) : (
              <CitiesList />
            )
          ) : (
            <SearchItems />
          )}

          <EntryChangesBtn />
        </div>
      </div>
    </LocationContext.Provider>
  );
}
