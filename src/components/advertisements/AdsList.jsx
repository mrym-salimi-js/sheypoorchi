import { useEffect, useState } from 'react';
import { getAds } from '../../services/getAds';
import { AdCart } from './AdCart';
import axios from 'axios';

export function AdsList({ category, queryParams, locationUrl }) {
  const [adsList, setAdsList] = useState();

  useEffect(() => {
    const getAdsByUrlChanges = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5137/api/ads/s/${category}?${queryParams}`
      );
      setAdsList(response.data.data);
    };
    getAdsByUrlChanges();
  }, [category, locationUrl]);

  useEffect(() => {
    if (category || queryParams) return;
    const getAdsList = async () => {
      const response = await getAds();
      setAdsList(response.data);
    };
    getAdsList();
  }, []);

  return (
    <div className='w-full h-auto p-2 mt-5'>
      <div className='w-full h-auto p-2 '>
        <ul className='w-full h-auto flex flex-wrap gap-y-16 gap-x-1 justify-center'>
          {adsList &&
            adsList?.map((item) => {
              return <AdCart adItem={item} key={item._id} />;
            })}
        </ul>
      </div>
    </div>
  );
}
