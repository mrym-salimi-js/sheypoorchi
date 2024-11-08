import { useMemo, useRef, useState } from 'react';
import {
  adFormValidation,
  adTextLengthValidation,
  loginValidation,
} from '../../functions/validation/adFormValidation';
import { ChevronLeft } from '../globals/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteFilterSearch } from '../../functions/adFilters/deleteFilterSearch';
import { navTo } from '../../functions/globals/navTo';

export default function TextComponent({
  adLable,
  setNewAdStorageValue,
  newAdStorageValue,
  storagePram,
  textLength,
  subFiled,
  filedType,
  setOpenList,
  setValidation,
  validation,
  itemTitle,
  valueType,
  type,
  queryKey,
  searchItem,
}) {
  const inputRef = useRef();
  const [inputShow, setInputShow] = useState();
  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);
  const navigateTo = useNavigate();
  const [filterValue, setFilterValue] = useState();

  // Input Focus Settings
  const handleInputShow = (txt) => {
    filedType === 'text'
      ? (txt.children[0].children[1].focus(), setInputShow(adLable))
      : setOpenList(true);
  };

  // Set Filter Writing Filed Values (min/max)
  useMemo(() => {
    type === 'filter' && searchItem && setFilterValue(searchItem);
  }, [searchItem]);

  // Input Blur Setttings

  const handleInputBlur = (inputTag) => {
    const inputVal = inputTag.value;

    if (type === 'password') {
      localStorage.setItem('user-pass', inputVal);
    }

    if (
      type === 'email' ||
      type === 'password' ||
      type === 'confirm-password'
    ) {
      loginValidation(
        (stateVal) => {
          setValidation(stateVal);
        },
        adLable,
        inputVal,
        validation,
        type
      );
    }

    if (type === 'filter') {
      inputVal
        ? (queryParams.set(queryKey, inputVal),
          navTo(locationUrl.pathname, queryParams, navigateTo))
        : deleteFilterSearch(queryParams, queryKey, navigateTo, locationUrl);
    }

    newAdStorageValue &&
      !newAdStorageValue[storagePram] &&
      adFormValidation(
        (stateVal) => {
          setValidation(stateVal);
        },
        adLable,
        validation,
        newAdStorageValue[storagePram]
      );

    textLength !== undefined &&
      adTextLengthValidation(
        (stateVal) => {
          setValidation(stateVal);
        },
        adLable,
        inputVal,
        validation,
        textLength
      );

    setInputShow('');
  };
  const [inputVal, setInputVal] = useState();

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
        adLable,
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
    <div className='w-full flex flex-col gap-3 items-start  cursor-pointer'>
      <div
        onClick={(event) => handleInputShow(event.currentTarget)}
        className={`w-full  border-b flex justify-between items-center relative ${
          inputShow !== undefined && inputShow === adLable && `border-[#e4aac5]`
        } ${
          validation && validation[`${adLable}`]?.error && `border-[#fc3b3b]`
        }`}
      >
        <div className='w-full h-auto flex flex-col '>
          <p
            className={`w-full text-md transition-all absolute bottom-3 ${
              ((inputShow !== undefined && inputShow === adLable) ||
                filterValue ||
                itemTitle ||
                inputVal ||
                (newAdStorageValue && newAdStorageValue[storagePram]?.lable)) &&
              `mb-8 text-sm`
            }  ${inputShow === adLable && ` text-[#e4aac5]`} `}
          >
            {adLable}
          </p>

          <input
            type={valueType}
            ref={inputRef}
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
                  ? newAdStorageValue[storagePram]?.lable
                  : newAdStorageValue[storagePram]
                : itemTitle !== undefined
                ? itemTitle
                : filterValue
            }
          />
        </div>

        {filedType !== 'text' && (
          <ChevronLeft color={'#000000'} size={'size-4'} strokeWidth={2.4} />
        )}
      </div>

      {(() => {
        if (validation && validation[adLable]?.error) {
          return (
            <p className='text-[12px] text-[#fc3b3b] '>
              {validation[adLable]?.error}
            </p>
          );
        } else {
          return <p className='text-[12px] text-[#e4aac5] '>{subFiled}</p>;
        }
      })()}
    </div>
  );
}
