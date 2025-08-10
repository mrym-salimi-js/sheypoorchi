import { useContext } from 'react';
import { ChevronLeft } from '../../globals/Icons';
import { LocationContext } from '../LocationBox';

export function ProvimcesItem({ prvName, prvId }) {
  const { setLocSituation, setPrvId, setPrvName, setSearchRes } =
    useContext(LocationContext);

  const preparToGetCities = () => {
    setSearchRes([]);
    setLocSituation('شهر');
    setPrvId(prvId);
    setPrvName(prvName);
  };

  return (
    <>
      <li
        onClick={preparToGetCities}
        className='p-2 border-r-2 cursor-pointer border-pink-400 flex justify-between items-center '
        key={prvId}
      >
        <p className='text-sm'>{prvName}</p>
        <ChevronLeft color={'#000000'} size={'size-4'} strokeWidth={2.4} />
      </li>
    </>
  );
}
