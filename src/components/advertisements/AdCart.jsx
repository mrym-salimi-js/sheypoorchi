import { useEffect, useState } from 'react';
import { getCost } from '../../functions/advertisements/getCost';
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
    <li className='max-w-[340px] min-w-[270px] w-[340px] md:w-[300px] h-auto border border-gray-300 bg-white rounded-[2rem] px-5  relative list-none'>
      <div className='flex flex-col gap-4 items-center relative bottom-8'>
        <AdCartPhoto photo={photo} href={href} id={_id} />

        <AdCartTextContent
          title={title}
          cost={cost}
          createAt={createAt}
          location={location}
          href={href}
        />
      </div>
      <AdCartFooter createAt={createAt} location={location} />
    </li>
  );
}
