import { useContext } from 'react';
import { TextFiledContext } from '../text/TextComponent';
import { useLocation, useNavigate } from 'react-router-dom';

import cookies from 'js-cookie';
import { adFormValidation } from '../../../utils/validation/adFormValidation';
import { adTextLengthValidation } from '../../../utils/validation/adTextLengthValidation';
import { authenticateValidation } from '../../../utils/validation/authenticateValidation';
import { navTo } from '../../../utils/globals/navTo';
import { useDispatch } from 'react-redux';
import {
  updateCategoryAttr,
  updateDescription,
  updatePhone,
  updateTitle,
} from '../../../store/newAdSlice';
import { formatPrice } from '../../../utils/globals/formatPrice';

export default function InputText() {
  const {
    label,
    valueType,
    inputRefs,
    index,
    storagePram,
    filedType,
    newAdStorageValue,
    fieldVal,
    filterValue,
    type,
    setValidation,
    validation,
    queryKey,
    textLength,
    setInputShow,
    setInputVal,
    setFilterValue,
    itemId,
  } = useContext(TextFiledContext);

  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(locationUrl.search);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

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
        label,
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

    if (setValidation && newAdStorageValue) {
      (!newAdStorageValue[storagePram] ||
        (storagePram === 'attributr' && newAdStorageValue.attribute)) &&
        adFormValidation(
          (stateVal) => {
            setValidation(stateVal);
          },
          label,
          validation,
          !newAdStorageValue?.attribute[index]?.name
            ? ''
            : newAdStorageValue[storagePram]
        ),
        textLength !== undefined &&
          adTextLengthValidation(
            (stateVal) => {
              setValidation(stateVal);
            },
            label,
            inputVal,
            validation,
            textLength
          );
    }

    setInputShow('');
  };

  // Input Change Value settings
  const handleAfterChange = (inputTag) => {
    const formInputVal = inputTag.value;

    if (inputTag.value !== undefined) {
      setInputVal(inputTag.value);
    }

    if (type === 'filter') {
      const cleanNumber = formInputVal?.replace(/[,٬\s]/g, '');
      setFilterValue(cleanNumber);
    }
    if (type === 'newAd') {
      setValidation &&
        adFormValidation(
          (stateVal) => {
            setValidation(stateVal);
          },
          label,
          validation,
          formInputVal
        );

      switch (storagePram !== undefined) {
        case storagePram === 'title':
          dispatch(updateTitle({ formInputVal }));
          break;
        case storagePram === 'description':
          dispatch(updateDescription({ formInputVal }));
          break;
        case storagePram === 'attribute':
          dispatch(updateCategoryAttr({ filedType, formInputVal, itemId }));
          break;
        case storagePram === 'phone':
          dispatch(updatePhone({ formInputVal }));
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      {label === 'توضیحات' ? (
        <textarea
          data-label={label}
          type={type}
          ref={(el) => {
            inputRefs && (inputRefs.current[index] = el);
          }}
          name={storagePram}
          onChange={(event) =>
            filedType === 'text' && handleAfterChange(event.currentTarget)
          }
          className={`w-full h-20 bg-transparent outline-none text-sm text-gray-500 ${
            filedType !== 'text' && `cursor-pointer`
          }`}
          onBlur={(event) =>
            filedType === 'text' && handleInputBlur(event.currentTarget)
          }
          value={
            newAdStorageValue?.active
              ? typeof newAdStorageValue[storagePram] === 'object'
                ? newAdStorageValue[storagePram]?.name ||
                  formatPrice(
                    newAdStorageValue[storagePram][index]?.name,
                    valueType
                  )
                : formatPrice(newAdStorageValue[storagePram], valueType)
              : fieldVal !== undefined
              ? fieldVal
              : formatPrice(filterValue, valueType)
          }
        />
      ) : (
        <input
          data-label={label}
          type={type}
          ref={(el) => {
            inputRefs && (inputRefs.current[index] = el);
          }}
          name={storagePram}
          onChange={(event) =>
            filedType === 'text' && handleAfterChange(event.currentTarget)
          }
          className={`w-full bg-transparent outline-none text-sm text-gray-500 h-12 ${
            filedType !== 'text' && `cursor-pointer`
          }`}
          onBlur={(event) =>
            filedType === 'text' && handleInputBlur(event.currentTarget)
          }
          value={
            newAdStorageValue?.active
              ? typeof newAdStorageValue[storagePram] === 'object'
                ? newAdStorageValue[storagePram]?.name ||
                  formatPrice(
                    newAdStorageValue[storagePram][index]?.name,
                    valueType
                  )
                : formatPrice(newAdStorageValue[storagePram], valueType)
              : fieldVal !== undefined
              ? fieldVal
              : formatPrice(filterValue, valueType)
          }
        />
      )}
    </>
  );
}
