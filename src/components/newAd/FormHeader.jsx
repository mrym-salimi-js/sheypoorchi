import { useNavigate } from 'react-router-dom';
import { navTo } from '../../utils/globals/navTo';
import { ClearForm } from './ClearForm';

export function FormHeader() {
  const navigateTo = useNavigate();
  const handleBackBtn = () => {
    navTo(
      localStorage.getItem('last-url-pathname'),
      localStorage.getItem('last-url-search'),
      navigateTo
    );
  };
  return (
    <div className='w-full lg:p-4 flex justify-between items-center border-b pb-5'>
      <div className='w-auto h-auto flex gap-3 items-center'>
        <button
          onClick={handleBackBtn}
          className='flex  p-2 bg-[#efeaea57] rounded-md  items-center justify-center outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#b1b1b1'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m8.25 4.5 7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
        <p className='text-lg lg:text-xl'>ثبت آگهی</p>
      </div>
      <ClearForm />
    </div>
  );
}
