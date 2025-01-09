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
      (!newAdStorageValue[storagePram] || newAdStorageValue.attribute) &&
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
  const handleStorage = (inputTag) => {
    const formInputVal = inputTag.value;

    inputTag.value !== undefined && setInputVal(inputTag.value);

    if (type === 'filter') {
      setFilterValue(formInputVal);
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
    <input
      data-label={label}
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
        newAdStorageValue?.active
          ? typeof newAdStorageValue[storagePram] === 'object'
            ? newAdStorageValue[storagePram]?.name ||
              newAdStorageValue[storagePram][index]?.name
            : newAdStorageValue[storagePram]
          : fieldVal !== undefined
          ? fieldVal
          : filterValue
      }
    />
  );
}
