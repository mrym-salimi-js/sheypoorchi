import { useEffect, useState } from 'react';
import { getCost } from '../../functions/advertisements/getCost';
import { getDifferDate } from '../../functions/advertisements/getDifferDate';
import { AdCartPhoto } from './AdCartPhoto';
import { AdCartTextContent } from './AdCartTextContent';
import { AdCartFooter } from './AdCartFooter';

export function AdCart({ adItem }) {
  const { attributes, created_at, id, location, photo, title } = adItem;

  const [date, setDate] = useState(0);
  const [cost, setCost] = useState([]);

  useEffect(() => {
    getCost(JSON.parse(attributes), (costVal) => {
      setCost(costVal);
    });
    getDifferDate(created_at, (dateVal) => {
      setDate(dateVal);
    });
  }, []);

  const adTitle = JSON.parse(title.trim().replace(/\s+/g, '-'));
  const href = `/v/${id}/${adTitle}`;

  return (
    <li className='max-w-[320px] w-[300px]  h-auto border border-gray-300 rounded-[2rem] px-5  relative'>
      <div className='flex flex-col gap-4 items-center relative bottom-8'>
        <AdCartPhoto photo={photo} href={href} />

        <AdCartTextContent
          title={title}
          cost={cost}
          date={date}
          location={location}
          href={href}
        />
      </div>
      <AdCartFooter date={date} location={location} />
    </li>
  );
}
