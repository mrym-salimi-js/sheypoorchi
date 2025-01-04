import { useContext } from 'react';
import { TextFiledContext } from '../text/TextComponent';
import { useLocation, useNavigate } from 'react-router-dom';

import cookies from 'js-cookie';
import {
  adFormValidation,
  adTextLengthValidation,
  authenticateValidation,
} from '../../../functions/validation/adFormValidation';
import { navTo } from '../../../functions/globals/navTo';

export default function InputText() {
  const {
    adLabel,
    valueType,
    inputRefs,
    index,
    storagePram,
    filedType,
    newAdStorageValue,
    itemTitle,
    filterValue,
    type,
    setValidation,
    validation,
    queryKey,
    textLength,
    setInputShow,
    setInputVal,
    setFilterValue,
    setNewAdStorageValue,
  } = useContext(TextFiledContext);

  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);
  const navigateTo = useNavigate();
  // Input Blur Setttings
  const handleInputBlur = (inputTag) => {
    const inputVal = inputTag.value;

    if (type === 'password') {
      cookies.get('user-pass') && cookies.remove('user-pass');
      cookies.set('user-pass', inputVal);
    }

    if (
      type === 'email' ||
      type === 'password' ||
      type === 'password-confirm' ||
      type === 'name'
    ) {
      authenticateValidation(
        (stateVal) => {
          setValidation(stateVal);
        },
        adLabel,
        inputVal,
        validation,
        type
      );
    }

    if (type === 'filter') {
      inputVal !== ''
        ? (queryParams.set(queryKey, inputVal),
          navTo(locationUrl.pathname, queryParams, navigateTo))
        : queryParams.delete(queryKey),
        navTo(locationUrl.pathname, queryParams, navigateTo);
    }

    newAdStorageValue &&
      !newAdStorageValue[storagePram] &&
      adFormValidation(
        (stateVal) => {
          setValidation(stateVal);
        },
        adLabel,
        validation,
        newAdStorageValue[storagePram]
      );

    textLength !== undefined &&
      adTextLengthValidation(
        (stateVal) => {
          setValidation(stateVal);
        },
        adLabel,
        inputVal,
        validation,
        textLength
      );

    setInputShow('');
  };

  // Input Change Value settings
  const handleStorage = (inputTag) => {
    const formInputVal = inputTag.value;

    inputTag.value !== undefined && setInputVal(inputTag.value);

    if (type === 'filter') {
      setFilterValue(formInputVal);
    }
    if (type === 'newAd') {
      adFormValidation(
        (stateVal) => {
          setValidation(stateVal);
        },
        adLabel,
        validation,
        formInputVal
      );
      setNewAdStorageValue !== undefined &&
        setNewAdStorageValue({
          ...newAdStorageValue,
          [`${storagePram}`]: formInputVal,
        });
    }
  };

  return (
    <input
      data-lable={adLabel}
      type={valueType}
      ref={(el) => {
        inputRefs && (inputRefs.current[index] = el);
      }}
      name={storagePram}
      onChange={(event) =>
        filedType === 'text' && handleStorage(event.currentTarget)
      }
      className={`w-full outline-none text-sm text-gray-500 h-12 ${
        filedType !== 'text' && `cursor-pointer`
      }`}
      onBlur={(event) =>
        filedType === 'text' && handleInputBlur(event.currentTarget)
      }
      value={
        newAdStorageValue
          ? typeof newAdStorageValue[storagePram] === 'object'
            ? newAdStorageValue[storagePram]?.name
            : newAdStorageValue[storagePram]
          : itemTitle !== undefined
          ? itemTitle
          : filterValue
      }
    />
  );
}
