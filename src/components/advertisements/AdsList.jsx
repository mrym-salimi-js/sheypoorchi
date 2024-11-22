import { useEffect, useState } from 'react';
import { getAds } from '../../services/getAds';
import { AdCart } from './AdCart';

export function AdsList() {
  const [adsList, setAdsList] = useState();

  useEffect(() => {
    const getAdsList = async () => {
      const response = await getAds();

      response.result > 0 && setAdsList(response.data);
    };
    getAdsList();
  }, []);

  return (
    <div className='w-full h-auto p-2 mt-5'>
      <div className='w-full h-auto p-2 '>
        <ul className='w-full h-auto flex flex-wrap gap-y-10 gap-x-1 justify-center'>
          {adsList &&
            adsList.map((item) => {
              return <AdCart adItem={item} key={item._id} />;
            })}
        </ul>
      </div>
    </div>
  );
}
