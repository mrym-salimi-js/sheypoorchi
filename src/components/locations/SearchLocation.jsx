import { useContext, useState } from 'react';
import { LocationContext } from './LocationBox';
import { provincesList } from '../localStorage/locations';

export function SearchLocation() {
  const { prvId, locSituation, prvName, setSearchRes } =
    useContext(LocationContext);

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
