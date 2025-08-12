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
    <li className=' h-auto border border-gray-200 bg-white rounded-[3rem] p-4 relative list-none'>
      <div className='flex flex-col gap-2 items-center '>
        <AdCartPhoto photo={photo} href={href} id={_id} />

        <AdCartTextContent
          title={title}
          cost={cost}
          createAt={createAt}
          location={location}
          href={href}
        />
      </div>
      <AdCartFooter createAt={createAt} location={location} href={href} />
    </li>
  );
}
