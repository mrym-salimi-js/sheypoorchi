import { useContext, useEffect, useState } from 'react';
import { RecycleBin } from '../../globals/Icons';
import { NewAdFormProvider } from '../NewAdForm';

export function PhotoComponent() {
  const { setNewAdStorageValue, newAdStorageValue } =
    useContext(NewAdFormProvider);
  const [allPhoto, setAllPhoto] = useState([]);

  let reader;

  const handlePhotoShow = (inputTag) => {
    const files = inputTag.files;

    Object.keys(inputTag.files).forEach((item, index) => {
      const file = files[item];
      reader = new FileReader();

      reader.onloadend = function (event) {
        newAdStorageValue &&
          setNewAdStorageValue((prev) => ({
            ...prev,
            photo: [...prev.photo, { id: index, src: event.target.result }],
          }));
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    newAdStorageValue?.photo
      ? setAllPhoto(newAdStorageValue.photo)
      : setAllPhoto([]);
  }, [newAdStorageValue]);

  const handleDeletePhoto = (e) => {
    const photoId = e.target.closest('.bin-box').nextElementSibling.id;

    const filterdPhoto = newAdStorageValue.photo.filter((item) => {
      return item.id != photoId;
    });

    setNewAdStorageValue((prev) => ({
      ...prev,
      photo: filterdPhoto,
    }));
  };

  return (
    <div className='w-full p-3 flex flex-col gap-8 pb-6 border-b lg:border-0'>
      <div className='flex flex-col gap-4'>
        <h4>انتخاب عکس</h4>
        <p className='text-gray-400 text-[12px]'>
          عکسی مناسب برای آگهی خود انتخاب کنید تا آگهی تان بهتر دیده شود.
        </p>
      </div>
      <div className='flex flex-wrap relative gap-3 '>
        <input
          accept='image/*'
          multiple
          onChange={(event) => handlePhotoShow(event.currentTarget)}
          type='file'
          className='opacity-0 z-[1] absolute w-full h-full cursor-pointer'
        />
        <div className='w-auto flex grow shrink basis-[20%] relative'>
          <div className='flex flex-col self-center items-center justify-center gap-1 absolute right-0 left-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#e4aac5'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
            <p className='text-[0.5rem] md:text-sm text-[#e4aac5]'>
              افزودن عکس
            </p>
          </div>
          <div className='p-[50%] border-2 border-[#e4aac5] border-dashed rounded-xl'></div>
        </div>

        {allPhoto.length > 0 &&
          allPhoto.map((item, index) => {
            return (
              <div
                className={`w-[20%] flex grow shrink basis-[20%] relative justify-center items-center border-2 border-[#ccccc] border-dashed rounded-xl overflow-hidden `}
                key={index}
              >
                <div
                  onClick={handleDeletePhoto}
                  className='bin-box w-8 h-8 p-1  rounded-full bg-[#0000006d] cursor-pointer flex items-center justify-center absolute top-3 left-3 z-50 hover:opacity-[0.9]'
                >
                  <RecycleBin />
                </div>

                <img
                  id={item?.id}
                  className='w-full h-full object-cover opacity-[0.6] z-[3]'
                  src={item?.src}
                ></img>
              </div>
            );
          })}

        <PhotoLogo opacity={allPhoto?.length > 0 && `hidden`} />
      </div>
    </div>
  );
}
export function PhotoLogo({ opacity }) {
  return (
    <>
      <div
        className={`w-auto flex grow shrink basis-[20%] relative justify-center items-center ${opacity}`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#cccccc'
          className='size-6  absolute left-0 right-0 m-auto'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z'
          />
        </svg>

        <div className='p-[50%] border-2 border-[#ccccc] border-dashed rounded-xl flex items-center justify-center'></div>
      </div>

      <div
        className={`w-auto flex grow shrink basis-[20%] relative justify-center items-center ${opacity}`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#cccccc'
          className='size-6  absolute left-0 right-0 m-auto'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z'
          />
        </svg>

        <div className='p-[50%] border-2 border-[#ccccc] border-dashed rounded-xl flex items-center justify-center'></div>
      </div>

      <div
        className={`w-auto flex grow shrink basis-[20%] relative justify-center items-center ${opacity}`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#cccccc'
          className='size-7  absolute left-0 right-0 m-auto'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z'
          />
        </svg>

        <div className='p-[50%] border-2 border-[#ccccc] border-dashed rounded-xl flex items-center justify-center'></div>
      </div>
    </>
  );
}
