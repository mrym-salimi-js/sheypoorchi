import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { selectedLocations } from '../../utils/locations/selectedLocations';
import { Link } from 'react-router-dom';

export default function HomePageBreadCrumb() {
  const [cookie] = useCookies();
  const locs = JSON.parse(localStorage.getItem('ads_locations_list'));
  const [selectedLoc, setSelectedLoc] = useState('');

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
      <Link to={'/s/iran/'}>
        <p className='text-[0.8rem]'>همه آگهی ها</p>
      </Link>
      {selectedLoc && <p className='text-[0.8rem]'>{selectedLoc}</p>}
    </div>
  );
}
