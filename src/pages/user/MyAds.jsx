import { useEffect, useState } from 'react';
import Menu from '../../components/user/menu/Menu';
import { AdCart } from '../../components/advertisements/AdCart';
import axios from 'axios';
import { Plus } from '../../components/globals/Icons';
import { Link } from 'react-router-dom';

export default function MyAds() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [myAds, setMyAds] = useState([]);
  useEffect(() => {
    const getMyAds = async () => {
      const ads = await axios.get(`${baseURL}/api/users/myAds`, {
        withCredentials: true,
      });
      ads && setMyAds(ads.data.data);
    };
    getMyAds();
  }, []);
  return (
    <div className='w-full h-full bg-gray-50 flex flex-col gap-5 px-3 lg:px-7 items-end '>
      <Menu />
      <div className='w-full h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center gap-24'>
        {/* Header */}
        <div className='w-[98%] h-40 rounded-3xl shadow-sm bg-[rgb(206,164,192)] '>
          <p className='w-full mt-16 text-center text-gray-50 text-md'>
            آگهی های فعال من
          </p>
          <div className='w-auto flex gap-12 items-center'>
            <Link
              to={'/newAd'}
              className='w-40 h-40 bg-[rgb(206,164,192)] flex flex-col items-center justify-center gap-3 relative bottom-3 rounded-full border-[5px] border-white right-9'
            >
              <Plus color={'#f3f3f3'} size={'size-8'} />
              <p className='text-md text-gray-50'>ثبت آگهی جدید</p>
            </Link>
          </div>
        </div>
        <div className='w-full h-auto  overflow-x-scroll p-8 px-4 bg-white rounded-3xl border'>
          <div className='w-auto h-auto flex gap-3 gap-y-10 mt-4 justify-start'>
            {myAds.length > 0 &&
              myAds.map((ad) => {
                return <AdCart key={ad._id} adItem={ad} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
