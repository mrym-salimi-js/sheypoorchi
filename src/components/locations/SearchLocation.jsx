import { useContext, useEffect, useState } from 'react';
import { LocationContext } from './LocationBox';
import { provincesList } from '../../utils/localStorage/locations';
import SearchAtList from '../globals/SearchAtList';

export function SearchLocation() {
  const { prvId, locSituation, prvName, setSearchRes, openLocation } =
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

  useEffect(() => {
    setInputValue('');
    setSearchRes([]);
  }, [openLocation]);

  return (
    <SearchAtList
      handleInputValue={handleInputValue}
      plcVal={plcVal}
      inputValue={inputValue}
    />
  );
}
