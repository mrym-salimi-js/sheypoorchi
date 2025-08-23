import { useEffect, useState } from 'react';
import { getCost } from '../../utils/advertisements/getCost';
import { AdCartPhoto } from './AdCartPhoto';
import { AdCartTextContent } from './AdCartTextContent';
import { AdCartFooter } from './AdCartFooter';

export function AdCart({ adItem }) {
  const { attribute, createAt, _id, location, photo, title } = adItem;

  const [cost, setCost] = useState([]);

  useEffect(() => {
    getCost(attribute, (costVal) => {
      setCost(costVal);
    });
  }, []);

  const adTitle = title?.trim().replace(/\s+/g, '-');
  const href = `/v/${_id}/${adTitle}`;

  return (
    <li className='w-auto max-h-[140px] border overflow-hidden border-gray-200 bg-white rounded-2xl p-3 relative list-none'>
      <div className='h-full flex  gap-2 items-center '>
        <AdCartPhoto photo={photo} href={href} />

        <div className='flex w-[67%] h-[95%] flex-col gap-3 justify-between'>
          <AdCartTextContent
            title={title}
            cost={cost}
            createAt={createAt}
            location={location}
            href={href}
          />
          <AdCartFooter createAt={createAt} location={location} />
        </div>
      </div>
    </li>
  );
}
