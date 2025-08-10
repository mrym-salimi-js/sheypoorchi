import { createContext, useEffect, useMemo, useState } from 'react';
import { ChevronLeft } from '../../globals/Icons';
import SubText from './SubText';
import InputText from './InputText';
import LabelText from './LabelText';

export const TextFiledContext = createContext();

export default function TextComponent({
  inputRefs,
  index,
  label,
  newAdStorageValue,
  storagePram,
  textLength,
  subFiled,
  filedType,
  setOpenList,
  setValidation,
  validation,
  fieldVal,
  valueType,
  type,
  queryKey,
  searchItem,
  itemId,
  defaultItem,
}) {
  const [inputShow, setInputShow] = useState();
  const [filterValue, setFilterValue] = useState();
  const [inputVal, setInputVal] = useState();

  // Input Focus Settings
  const handleInputShow = (txt) => {
    filedType === 'text'
      ? (txt.children[0].children[1].focus(), setInputShow(label))
      : setOpenList('opacity-100 visible');
  };

  // Set Filter Writing Filed Values (min/max)

  useEffect(() => {
    searchItem !== undefined && setFilterValue(searchItem);
  }, [searchItem]);

  return (
    <TextFiledContext.Provider
      value={{
        inputShow,
        label,
        filterValue,
        fieldVal,
        inputVal,
        newAdStorageValue,
        storagePram,
        subFiled,
        valueType,
        defaultItem,
        inputRefs,
        index,
        filedType,
        type,
        setValidation,
        validation,
        queryKey,
        textLength,
        setInputShow,
        setInputVal,
        setFilterValue,
        itemId,
      }}
    >
      <div className='w-full flex flex-col gap-3 items-start  cursor-pointer'>
        <div
          onClick={(event) => handleInputShow(event.currentTarget)}
          className={`w-full  border-b flex justify-between items-center relative ${
            inputShow !== undefined && inputShow === label && `border-[#e4aac5]`
          } ${
            validation && validation[`${label}`]?.error && `border-[#fc3b3b]`
          }`}
        >
          <div className='w-full h-auto flex flex-col '>
            <LabelText />
            <InputText />
          </div>

          {filedType !== 'text' && (
            <ChevronLeft color={'#000000'} size={'size-4'} strokeWidth={2.4} />
          )}
        </div>
        <SubText />
      </div>
    </TextFiledContext.Provider>
  );
}
