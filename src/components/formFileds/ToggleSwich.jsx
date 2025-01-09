import { useLocation } from 'react-router-dom';
import { deleteFilterSearch } from '../../utils/adFilters/deleteFilterSearch';
import { navTo } from '../../utils/globals/navTo';
import { useDispatch } from 'react-redux';
import { toggleChat } from '../../store/newAdSlice';

export default function ToggleSwich({
  label,
  desc,
  storagePram,
  newAdStorageValue,
  type,
  queryKey,
  navigateTo,
  queryParams,
}) {
  const locationUrl = useLocation();
  const searchItems = new URLSearchParams(locationUrl.search);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    // Insert And Update Filter Items Into Url
    if (type === 'filter') {
      queryParams.set(queryKey, e.target.checked),
        navTo(locationUrl.pathname, queryParams, navigateTo);

      // Insert And Update Filter Items Into Url
      if (e.target.checked === false) {
        deleteFilterSearch(searchItems, queryKey, navigateTo, locationUrl);
      }
    }

    // Insert And Update LocalStorage Checked (in newAd form)
    if (newAdStorageValue) {
      const status = e.target.checked;
      dispatch(toggleChat({ status }));
    }
  };

  const filterChecked = searchItems.get(queryKey) === 'true' ? true : false;
  return (
    <div className='w-full  flex flex-col gap-4'>
      <div className='w-full flex justify-between items-center pb-2 ]'>
        <p className='text-md'>{label}</p>
        <label className='inline-flex items-center  cursor-pointer'>
          <input
            onClick={handleInput}
            type='checkbox'
            className='sr-only peer'
            checked={
              newAdStorageValue !== undefined
                ? newAdStorageValue[storagePram]
                : filterChecked
            }
            readOnly
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-pink-100 dark:peer-focus:ring-[#84105C] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#84105C] "></div>
          {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span> */}
        </label>
      </div>
      {(() => {
        if (desc !== undefined) {
          return <p className='text-[12px] text-[#e4aac5] '>{desc}</p>;
        }
      })()}
    </div>
  );
}
