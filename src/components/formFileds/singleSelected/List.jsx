import { useState } from 'react';
import { BackBtn } from '../../globals/BackBtn';
import { CloseMark } from '../../globals/Icons';
import { ListItems } from './ListItems';
export function List({
  lable,
  allList,
  setListItems,
  setOpenList,
  firstItemBold,
  setSelectedItem,
  type,
}) {
  const [listType, setListType] = useState('main');
  const [lastList, setLastList] = useState();

  const handleClosing = () => {
    setOpenList(false);
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-end lg:justify-center fixed top-0 right-0 bg-[#7e7e7ed1] z-[100000]'>
      <div className='w-full md:w-[75%] lg:w-[40%] h-auto max-h-[80%] bg-white rounded-2xl relative  z-[100000] border border-gray-50  overflow-hidden top-2 bottom-0  p-6 '>
        <div className='flex justify-between items-center pb-5 '>
          <div className='flex items-center gap-3 border-r-4 border-pink-400 pr-2'>
            {listType === 'sub' && (
              <BackBtn
                setTitle={setListType}
                title={'main'}
                setListItems={setListItems}
                lastList={lastList}
                // setFilterListTitle={setFilterListTitle}
              />
            )}
            <p className='text-lg '>{lable}</p>
          </div>

          <CloseMark
            handleClosing={handleClosing}
            color={'#000000'}
            size={'size-6'}
          />
        </div>

        <div className='h-[87%] p-1 mt-[20px] overflow-scroll '>
          <ul className='flex flex-col gap-2 p-1 '>
            <ListItems
              type={type}
              list={allList}
              setLastList={setLastList}
              setListType={setListType}
              firstItemBold={firstItemBold}
              setSelectedItem={setSelectedItem}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
