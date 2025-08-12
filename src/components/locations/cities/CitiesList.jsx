import { useContext } from 'react';
import { LocationContext } from '../LocationBox';
import { findCities } from '../../../utils/locations/findCities';
import { CitiesItem } from './CitiesItem';

export function CitiesList() {
  const {
    prvId,
    prvName,
    setCheck,
    check,
    setAllCheckedBoxes,
    allCheckedBoxes,
    searchRes,
  } = useContext(LocationContext);

  const cities = findCities(prvId);
  const data = searchRes[0] ? searchRes : cities;

  const handleCheckedAll = () => {
    const allCheck = document.getElementById('all-check');

    prvId && setCheck([...check, prvId]);

    cities?.forEach((city) => {
      if (city !== undefined) {
        setAllCheckedBoxes((prev) => [
          ...prev,
          { name: city.name, id: city.id, province_id: prvId },
        ]);
      }
    });

    if (!allCheck.checked) {
      const filterCities = allCheckedBoxes.filter((item) => {
        return item.province_id != prvId;
      });

      setAllCheckedBoxes(filterCities);

      const filterChecks = check.filter((item) => {
        return item != prvId;
      });

      setCheck(filterChecks);
    }
  };
  const handleAllCheck = (prvId) => {
    let checkAllStatus = false;

    check?.map((item) => {
      if (item == prvId) {
        checkAllStatus = true;
      }
    });

    return checkAllStatus;
  };

  return (
    <div className='h-[58%] lg:h-[51%] p-1 border-t-2 border-gray-100 mt-[20px] overflow-scroll '>
      <ul className='flex flex-col p-2'>
        <li className='cursor-pointer flex justify-between items-center border-b-[1px] pb-2'>
          <p className='text-sm p-1 pr-2 border-r-4  border-pink-400'>
            {' '}
            همه شهر های {prvName}
          </p>
          <div className='inline-flex items-center'>
            <label
              className='relative flex items-center p-3 rounded-full cursor-pointer'
              htmlFor='check'
            >
              <input
                readOnly
                checked={handleAllCheck(prvId)}
                onClick={handleCheckedAll}
                type='checkbox'
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-900 checked:bg-[#84105C] checked:before:bg-[#84105C] hover:before:opacity-10"
                id='all-check'
              />
              <span className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  stroke='currentColor'
                  strokeWidth='1'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        </li>
        {data?.map((city) => {
          if (city !== undefined) {
            return <CitiesItem name={city.name} id={city.id} key={city.id} />;
          }
        })}
      </ul>
    </div>
  );
}
