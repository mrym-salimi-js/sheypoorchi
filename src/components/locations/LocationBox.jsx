import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Provinces, { ProvimcesItem } from './Provinces';
import Cities, { CitiesItem } from './Cities';
// import { provincesList } from "./provincesList"
// import { citiesList } from "./citiesList"
import { BackBtn } from '../globals/BackBtn';
import { citiesList, provincesList } from '../localStorage/locations';

export default function LocationBox({ setOpenLocation }) {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [locSituation, setLocSituation] = useState('استان');
  const [allCheckedBoxes, setAllCheckedBoxes] = useState([]);
  const [check, setCheck] = useState([]);
  const [prvId, setPrvId] = useState();
  const [prvName, setPrvName] = useState();
  const [searchRes, setSearchRes] = useState([]);
  const [deleteAllBtnClicked, setDeleteAllBtnClicked] = useState(false);

  const cities = citiesList();

  const filterdCitiesByCookies = cities?.filter((city) => {
    if (cookie['cities']) {
      return cookie['cities'].includes(city.id);
    }
  });

  useEffect(() => {
    filterdCitiesByCookies !== undefined &&
      setAllCheckedBoxes(filterdCitiesByCookies);
    if (cookie['provinces']) {
      setCheck(cookie['provinces']);
    }
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center justify-end lg:justify-center fixed top-0 right-0 bg-[#7e7e7ed1] z-[100000]'>
      <div className='w-full md:w-[75%] lg:w-[40%] h-[88%] bg-white rounded-2xl relative  z-[100000] border border-gray-50  overflow-hidden top-2 bottom-0  p-8 '>
        <div className=' flex flex-col gap-4'>
          <div className='flex justify-between items-center border-r-4 border-pink-400 pr-2'>
            <div className='flex'>
              {locSituation === 'شهر' && (
                <BackBtn
                  setTitle={setLocSituation}
                  title={'استان'}
                  setPrvId={setPrvId}
                />
              )}
              <p className='w-auto text-md  p-2 '>انتخاب {locSituation}</p>
            </div>

            {allCheckedBoxes?.length > 0 && (
              <DeleteAllFilterdCitiesBtn
                setFilterdCities={setAllCheckedBoxes}
                setCheck={setCheck}
                setDeleteAllBtnClicked={setDeleteAllBtnClicked}
                removeCookie={removeCookie}
              />
            )}
          </div>

          {allCheckedBoxes?.length > 0 ? (
            <FilteringCity
              filterdCities={allCheckedBoxes}
              setFilterdCities={setAllCheckedBoxes}
            />
          ) : (
            <p className='text-[11px] text-gray-300 border-r-4 border-pink-400 p-2'>
              حداقل یک شهر را انتخاب کنید
            </p>
          )}

          <SearchLocation
            prvId={prvId}
            locSituation={locSituation}
            setSearchRes={setSearchRes}
            prvName={prvName}
          />
        </div>
        {searchRes?.length === 0 ? (
          locSituation === 'استان' ? (
            <Provinces
              locSituation={locSituation}
              setLocSituation={setLocSituation}
              setPrvId={setPrvId}
              setPrvName={setPrvName}
              setSearchRes={setSearchRes}
            />
          ) : (
            <Cities
              prvId={prvId}
              prvName={prvName}
              filterdCities={allCheckedBoxes}
              setFilterdCities={setAllCheckedBoxes}
              setCheck={setCheck}
              check={check}
              locSituation={locSituation}
              setLocSituation={setLocSituation}
              searchRes={searchRes}
            />
          )
        ) : (
          <SearchItems
            searchRes={searchRes}
            setFilterdCities={setAllCheckedBoxes}
            filterdCities={allCheckedBoxes}
            setLocSituation={setLocSituation}
            setPrvId={setPrvId}
            setPrvName={setPrvName}
            setSearchRes={setSearchRes}
            check={check}
            setCheck={setCheck}
          />
        )}

        <EntryChangesBtn
          setOpenLocation={setOpenLocation}
          filterdCities={allCheckedBoxes}
          setCookie={setCookie}
          cookie={cookie}
          check={check}
          deleteAllBtnClicked={deleteAllBtnClicked}
        />
      </div>
    </div>
  );
}

export function FilteringCity({ setFilterdCities, filterdCities }) {
  const handleHideFilteredCitiy = (cityName) => {
    const filtered = filterdCities.filter((item) => {
      if (item.name !== cityName) {
        return item;
      }
    });
    setFilterdCities(filtered);
  };

  return (
    <div className='w-full overflow-scroll'>
      <ul className='flex gap-3 items-center justify-start'>
        {filterdCities?.map((city, index) => {
          return (
            <li
              className='w-auto h-auto p-3 flex items-center justify-between gap-3 rounded-full bottom-2  bg-pink-50'
              key={index}
            >
              <p className='text-[11px] text-[#84105C] '>{city.name}</p>
              <svg
                onClick={() => handleHideFilteredCitiy(city.name, city.id)}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#501a3d'
                className='size-4 cursor-pointer'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DeleteAllFilterdCitiesBtn({
  setFilterdCities,
  setCheck,
  setDeleteAllBtnClicked,
  removeCookie,
}) {
  const handleHideFilteredCities = () => {
    setDeleteAllBtnClicked(true);
    setCheck([]);
    setFilterdCities([]);
    removeCookie('provinces');
    removeCookie('cities');
  };

  return (
    <div className='w-24 h-auto p-3  flex items-center justify-center gap-3 rounded-full bottom-2  bg-pink-50 cursor-pointer'>
      <p
        onClick={handleHideFilteredCities}
        className='text-[12px] text-[#84105C] '
      >
        حذف همه
      </p>
    </div>
  );
}
export function SearchLocation({ prvId, locSituation, prvName, setSearchRes }) {
  let placeholderText = `جستجو در ${locSituation} ها  `;
  let plcVal =
    prvName && locSituation === 'شهر'
      ? placeholderText + prvName
      : placeholderText;

  const [inputValue, setInputValue] = useState();

  const handleInputValue = (event) => {
    const inputVal = event.target.value;
    setInputValue(inputVal);

    const prv = provincesList();
    let prvRes = [];

    if (prvId === undefined) {
      prvRes = prv?.filter((prv) => {
        return prv.name.includes(inputValue);
      });
    }

    const selectedCity = prv.filter((prv) => {
      if (prv.id == prvId) {
        return prv.children;
      }
    });

    let cityRes = [];
    if (selectedCity.length > 0 && prvRes.length == 0) {
      cityRes = selectedCity[0].children.filter((city) => {
        return city.name.includes(inputValue);
      });
    }

    let bothRes = inputVal ? [...cityRes, ...prvRes] : [];

    // console.log()
    setSearchRes(bothRes);
  };

  return (
    <div className='w-full h-16 rounded-lg p-2 z-20  border flex gap-1 justify-between items-center'>
      <input
        onChange={(event) => handleInputValue(event)}
        className='outline-none w-full h-full p-2 text-gray-400 placeholder-gray-200 text-[12px] '
        placeholder={plcVal}
      ></input>
    </div>
  );
}

export function SearchItems({
  searchRes,
  setFilterdCities,
  filterdCities,
  setLocSituation,
  setPrvId,
  setPrvName,
  setSearchRes,
  check,
  setCheck,
}) {
  // console.log(searchRes)
  return (
    <div className='h-[59%] p-1 border-t-2 border-gray-100 mt-[20px] overflow-scroll '>
      <ul className='flex flex-col gap-2 p-2'>
        {searchRes.map((item, index) => {
          if (item?.children === undefined) {
            return (
              <CitiesItem
                name={item.name}
                id={item.id}
                setFilterdCities={setFilterdCities}
                filterdCities={filterdCities}
                prvId={item.id}
                check={check}
                setCheck={setCheck}
                key={index}
              />
            );
          } else {
            return (
              <ProvimcesItem
                prvName={item.name}
                prvId={item.id}
                setLocSituation={setLocSituation}
                setPrvId={setPrvId}
                setPrvName={setPrvName}
                key={index}
                setSearchRes={setSearchRes}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

export function EntryChangesBtn({
  setOpenLocation,
  filterdCities,
  setCookie,
  check,
  deleteAllBtnClicked,
}) {
  const cookieItems = [];
  filterdCities?.forEach((item) => {
    cookieItems.push(item.id);
  });

  const handleLocationCookie = () => {
    check && setCookie('provinces', check);
    filterdCities && setCookie('cities', cookieItems);

    setOpenLocation(false);
  };

  return (
    <div className='w-[93%] p-4 flex flex-row-reverse gap-2 justify-start bg-white items-center absolute bottom-0 '>
      <button
        onClick={handleLocationCookie}
        className={
          filterdCities?.length > 0 || deleteAllBtnClicked
            ? 'hover:opacity-[0.8] outline-none text-white bg-[#84105C] rounded-lg text-sm '
            : 'text-gray-300 bg-gray-100 rounded-lg text-sm hover:opacity-[0.8] outline-none cursor-not-allowed'
        }
      >
        تایید
      </button>

      <button
        onClick={() => setOpenLocation(false)}
        className=' border  bg-gray-200 rounded-lg text-sm'
      >
        انصراف
      </button>
    </div>
  );
}
