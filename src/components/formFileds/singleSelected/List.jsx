import { useState } from 'react';
import { BackBtn } from '../../globals/BackBtn';
import { CloseMark } from '../../globals/Icons';
import { ListItems } from './ListItems';
import SearchAtList from '../../globals/SearchAtList';
export function List({
  label,
  allList,
  setFieldVal,
  setOpenList,
  firstItemBold,
  type,
  setListTitle,
  handleListItems,
  openList,
  setListItems,
}) {
  const [listType, setListType] = useState('main');
  const [lastList, setLastList] = useState();
  const [searchRes, setSearchRes] = useState();

  const handleClosing = () => {
    setOpenList('opacity-0 invisible');
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
    <>
      {/* Back Dark */}
      <div
        className={`w-full h-full fixed top-0 right-0 bg-[#00000073] z-[100000] transition-opacity duration-1000 ease-in-out ${openList}`}
      ></div>

      {/* List Box */}
      <div
        className={`w-full h-full  flex flex-col items-center justify-end lg:justify-center fixed top-0 right-0  transition-all duration-1000 ease-in-out z-[1000000]  ${
          !openList?.includes('invisible')
            ? `translate-y-0`
            : `translate-y-full`
        }   `}
      >
        <div
          className={`w-full rounded-t-3xl relative bottom-0  md:w-[75%] lg:w-[40%] h-auto max-h-[80%] bg-white lg:rounded-3xl   z-[100000] border border-gray-50  overflow-hidden   p-4 flex flex-col gap-4 `}
        >
          <div className='w-12 h-1 bg-[#ecececa2] rounded-full self-center lg:hidden absolute top-4'></div>
          <div className='w-full h-full p-4'>
            <div className='flex justify-between items-center pb-5 '>
              <div className='flex items-center gap-1 border-r-4 border-pink-400 pr-2'>
                {listType === 'sub' && (
                  <BackBtn
                    setTitle={setListType}
                    title={'main'}
                    setFieldVal={setFieldVal}
                    lastList={lastList}
                    setListTitle={setListTitle}
                    setListItems={setListItems}
                    setSearchRes={setSearchRes}
                  />
                )}
                <p className='text-lg p-2'>{label}</p>
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
    </>
  );
}
