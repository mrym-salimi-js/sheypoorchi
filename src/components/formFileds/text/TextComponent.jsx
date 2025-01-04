import { createContext, useMemo, useState } from 'react';
import { ChevronLeft } from '../../globals/Icons';
import SubText from './SubText';
import InputText from './InputText';
import LabelText from './LabelText';

export const TextFiledContext = createContext();

export default function TextComponent({
  inputRefs,
  index,
  adLabel,
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
  const [inputShow, setInputShow] = useState();
  const [filterValue, setFilterValue] = useState();
  const [inputVal, setInputVal] = useState();

  // Input Focus Settings
  const handleInputShow = (txt) => {
    filedType === 'text'
      ? (txt.children[0].children[1].focus(), setInputShow(adLabel))
      : setOpenList('opacity-100 visible');
  };

  // Set Filter Writing Filed Values (min/max)
  useMemo(() => {
    type === 'filter' && searchItem && setFilterValue(searchItem);
  }, [searchItem]);

  return (
    <TextFiledContext.Provider
      value={{
        inputShow,
        adLabel,
        filterValue,
        itemTitle,
        inputVal,
        newAdStorageValue,
        storagePram,
        subFiled,
        valueType,
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
        setNewAdStorageValue,
      }}
    >
      <div className='w-full flex flex-col gap-3 items-start  cursor-pointer'>
        <div
          onClick={(event) => handleInputShow(event.currentTarget)}
          className={`w-full  border-b flex justify-between items-center relative ${
            inputShow !== undefined &&
            inputShow === adLabel &&
            `border-[#e4aac5]`
          } ${
            validation && validation[`${adLabel}`]?.error && `border-[#fc3b3b]`
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
