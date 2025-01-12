import { useContext, useState } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { NewAdContext } from './NewAdForm';
import { clearPersistedState } from '../../store/store';

export function ClearForm() {
  const { setValidation } = useContext(NewAdContext);
  const [clearingFormAlarm, setClearingFormAlarm] = useState(false);

  const handleClearingFormAsk = () => {
    setClearingFormAlarm(true);
  };

  return (
    <>
      <BorderRoundedBtn
        lable={'پاک کردن فرم'}
        handleAction={handleClearingFormAsk}
        borderColor={'border-[#84105C]'}
        bgColor={'bg-pink-50'}
        textColor={'text-[#84105C]'}
      />
      {clearingFormAlarm && (
        <ClearingFormAskBox
          setClearingFormAlarm={setClearingFormAlarm}
          setValidation={setValidation}
        />
      )}
    </>
  );
}
export function ClearingFormAskBox({ setClearingFormAlarm, setValidation }) {
  const handleClrearingForm = () => {
    clearPersistedState();

    setValidation(undefined);
    setClearingFormAlarm(false);
    localStorage.setItem('coordinate', JSON.stringify([]));

    window.location.reload();
  };
  const handleCloseClearingForm = () => {
    setClearingFormAlarm(false);
  };
  return (
    <div className='w-full h-full flex flex-col items-center justify-end lg:justify-center fixed top-0 right-0 bg-[#7e7e7ed1] z-[100000] '>
      <div className='w-full md:w-[75%] lg:w-[40%] relative top-3 flex flex-col gap-5 p-8 bg-white rounded-3xl'>
        <div className='flex justify-between items-center pb-5 border-b'>
          <p className='text-lg '>پاک کردن فرم</p>
          <svg
            onClick={handleCloseClearingForm}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </div>

        <p className='text-md'>آیا از پاک کردن فرم اطمینان دارید؟</p>
        <div className='w-full flex justify-center lg:justify-end gap-3'>
          <p
            onClick={handleClrearingForm}
            className='w-1/2 lg:w-auto p-5 hover:opacity-[0.7] text-center leading-3 rounded-full bg-[#84105C] text-sm text-white cursor-pointer'
          >
            پاک کردن
          </p>
          <p
            onClick={handleCloseClearingForm}
            className='w-1/2 lg:w-auto p-5 hover:opacity-[0.7] text-center leading-3 rounded-full border border-[#84105C] bg-pink-50  text-sm text-[#84105C] cursor-pointer'
          >
            انصراف
          </p>
        </div>
      </div>
    </div>
  );
}
