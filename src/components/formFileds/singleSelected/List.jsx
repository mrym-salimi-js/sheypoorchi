import { useState } from 'react';
import { BackBtn } from '../../globals/BackBtn';
import { CloseMark } from '../../globals/Icons';
import { ListItems } from './ListItems';
import SearchAtList from '../../globals/SearchAtList';
export function List({
  lable,
  allList,
  setListItems,
  setOpenList,
  firstItemBold,
  type,
  setListTitle,
  handleListItems,
}) {
  const [listType, setListType] = useState('main');
  const [lastList, setLastList] = useState();
  const [searchRes, setSearchRes] = useState();

  const handleClosing = () => {
    setOpenList(false);
  };

  const handleInputValue = (event) => {
    const inputVal = event.target.value;

    const searchedItems = allList?.filter((item) => {
      if (item.name) {
        return item.name.includes(inputVal);
      } else if (item.title) {
        return item.name.includes(inputVal);
      }
    });
    searchedItems && setSearchRes(searchedItems);
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-end lg:justify-center fixed top-0 right-0 bg-[#7e7e7ed1] z-[100000] '>
      <div className='w-full rounded-t-3xl  md:w-[75%] lg:w-[40%] h-auto max-h-[80%] bg-white lg:rounded-3xl relative  z-[100000] border border-gray-50  overflow-hidden top-2 bottom-0 p-4 flex flex-col gap-4 animate-slideinup '>
        <div className='w-12 h-1 bg-[#ecececa2] rounded-full self-center lg:hidden absolute top-4'></div>
        <div className='w-full h-full p-8'>
          <div className='flex justify-between items-center pb-5 '>
            <div className='flex items-center gap-3 border-r-4 border-pink-400 pr-2'>
              {listType === 'sub' && (
                <BackBtn
                  setTitle={setListType}
                  title={'main'}
                  setListItems={setListItems}
                  lastList={lastList}
                  setListTitle={setListTitle}
                  setSearchRes={setSearchRes}
                />
              )}
              <p className='text-lg p-2'>{lable}</p>
            </div>

            <CloseMark
              handleClosing={handleClosing}
              color={'#000000'}
              size={'size-6'}
            />
          </div>
          <SearchAtList
            handleInputValue={handleInputValue}
            plcVal={'جست و جو ...'}
          />
          <div className='h-[75%] p-1 mt-[20px] overflow-scroll border-t-2 border-gray-100'>
            <ul className='flex flex-col gap-2 p-1 '>
              <ListItems
                type={type}
                list={searchRes ? searchRes : allList}
                setLastList={setLastList}
                setListType={setListType}
                firstItemBold={firstItemBold}
                handleListItems={handleListItems}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
