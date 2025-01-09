import { useContext, useState } from 'react';
import LocationBox from '../locations/LocationBox';
import { useCookies } from 'react-cookie';
import { citiesList } from '../../utils/localStorage/locations';
import { mapMerker } from '../globals/Icons';
import { HomeContext } from '../../pages/Home';

export default function SearchBar() {
  const [openLocation, setOpenLocation] = useState('opacity-0 invisible');
  const [cookie] = useCookies();
  const { adsList, setSearchedAds } = useContext(HomeContext);
  const cities = citiesList();

  const handleSearch = (event) => {
    const searchedAds = adsList?.data.data.filter((ad) => {
      return ad.title?.includes(event.target.value);
    });

    setSearchedAds(searchedAds);
  };
  return (
    <div className='w-full xl:w-[63%] h-20  flex justify-center items-center z-[10000] '>
      <div className='w-[95%] h-[70%] border border-gray-200 z-20 rounded-xl flex gap-2 justify-between'>
        {/*Input */}
        <input
          onChange={handleSearch}
          className='outline-none w-[70%] lg:w-[93%] md:w-[85%]  h-full p-3 bg-transparent text-gray-400 placeholder-gray-300 text-[0.8rem] z-30 text-right '
          placeholder='جستجو در همه آگهی ها'
        ></input>

        {/*Icon And Selected Cities  */}
        <div className='w-32 py-2 px-3 flex flex-row-reverse gap-1 items-center justify-around border-r-[1px]'>
          <img className='w-[28px]' src={mapMerker}></img>

          {cookie['cities']?.length > 0 ? (
            cities?.map((city) => {
              if (city.id == cookie['cities'][0]) {
                const citiesLength = cookie['cities'].length;
                return (
                  <p
                    onClick={() => setOpenLocation('opacity-100 visible')}
                    className='text-[0.8rem] text-gray-400 cursor-pointer  text-nowrap'
                    key={city.id}
                  >
                    {citiesLength ? `${citiesLength} شهر` : city.name}
                  </p>
                );
              }
            })
          ) : (
            <p
              onClick={() => setOpenLocation('opacity-100 visible')}
              className='text-[0.8rem] text-gray-400 cursor-pointer text-nowrap'
            >
              همه ایران
            </p>
          )}
        </div>
      </div>
      {openLocation && (
        <LocationBox
          setOpenLocation={setOpenLocation}
          openLocation={openLocation}
        />
      )}
    </div>
  );
}
