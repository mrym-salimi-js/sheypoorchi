import { useState } from 'react';
import { InVisible, Send, Visible } from '../globals/Icons';

export default function TodoList() {
  const [visiblity, setVisiblity] = useState('visible');

  const handleVisiblity = () => {
    setVisiblity(visiblity === 'visible' ? 'invisible' : 'visible');
  };
  return (
    <div
      className={`w-full h-auto p-4 flex flex-col items-center justify-between  border border-purple-100 rounded-3xl bg-white ${
        visiblity === `invisible` && `blur-sm`
      }`}
    >
      <div className='w-full flex flex-col gap-3'>
        {/* Header */}
        <div className='w-full p-3 flex items-center justify-between border-b'>
          <h4>دست نویس</h4>
          <div
            className='w-auto h-auto p-1 flex cursor-pointer'
            onClick={handleVisiblity}
          >
            {visiblity === 'visible' ? (
              <InVisible color={'#cccccc'} size={'size-6'} />
            ) : (
              <Visible color={'#cccccc'} size={'size-6'} />
            )}
          </div>
        </div>
        {/* Content */}
        <div className='w-full h-auto flex flex-col gap-2 p-2 self-start'>
          <div className='w-full h-auto p-3 rounded-xl bg-[#fae5fa60] flex gap-3 border'>
            <div className='inline-flex items-center'>
              <label className='flex items-center cursor-pointer relative'>
                <input
                  type='checkbox'
                  className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded  bg-white border border-slate-300 checked:bg-purple-600 checked:border-purple-600'
                  id='check7'
                />
                <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
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
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
            <p className='text-[0.8rem] '>متن جدید</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className='w-full p-2 border-t flex items-center justify-center'>
        <div className='w-full flex p-2 justify-between gap-3 border rounded-2xl'>
          <div className='w-auto flex cursor-pointer hover:opacity-70  border-l p-2'>
            <Send color={'#5b1869'} size={'size-5 '} />
          </div>
          <textarea
            className='w-[95%] h-full text-gray-500 text-[0.8rem] self-center outline-none'
            placeholder='نوشتن تسک جدید'
          />
        </div>
      </div>
    </div>
  );
}
