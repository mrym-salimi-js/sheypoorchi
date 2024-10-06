import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Speaker } from '../globals/Icons';
import { selectedLocations } from '../locations/selectedLocations';

export function SelectedLocBox() {
  return (
    <div className='w-[98%] h-auto p-4 flex flex-row gap-3 justify-start items-center border-t-[1px] border-b-[1px]'>
      <Speaker color={'#84105C'} size={'size-7'} />
      <SelectedLoc />
    </div>
  );
}

export default function SelectedLoc() {
  const [cookie] = useCookies();
  const locs = JSON.parse(localStorage.getItem('ads_locations_list'));
  const [selectedLoc, setSelectedLoc] = useState('ایران');

  useEffect(() => {
    selectedLocations(
      cookie,
      (locVal) => {
        setSelectedLoc(locVal);
      },
      locs
    );
  }, [cookie['cities']]);

  return (
    <div className='flex gap-2 items-center'>
      <p className='text-[0.8rem]'>همه آگهی های</p>
      <p className='text-[0.8rem]'>{selectedLoc}</p>
    </div>
  );
}
