import { useContext, useEffect, useState } from 'react';
import { Camera, RecycleBin } from '../globals/Icons';
import { NewAdFormProvider } from './NewAdForm';

export function PhotoComponent() {
  const { setNewAdStorageValue, newAdStorageValue } =
    useContext(NewAdFormProvider);
  const [allPhoto, setAllPhoto] = useState([]);

  let reader;

  const handlePhotoShow = async (inputTag) => {
    const files = inputTag.files;

    Object.keys(inputTag.files).forEach((item, index) => {
      const file = files[item];
      reader = new FileReader();

      reader.onloadend = function (event) {
        newAdStorageValue &&
          setNewAdStorageValue((prev) => ({
            ...prev,
            photo: [
              ...prev.photo,
              {
                id: index,
                src: event.target.result,
                name: file.name,
                type: file.type,
                size: file.size,
              },
            ],
          }));
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    newAdStorageValue?.photo
      ? setAllPhoto(newAdStorageValue.photo)
      : setAllPhoto([]);
  }, [newAdStorageValue?.photo]);

  const handleDeletePhoto = (e) => {
    const photoId = e.target.closest('.bin-box').getAttribute('data-id');

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
            <Camera color={'#e4aac5'} size={'size-6'} />
            <p className='text-[0.5rem] md:text-[0.7rem] text-[#e4aac5]'>
              افزودن عکس
            </p>
          </div>
          <div className='p-[50%] border-2 border-[#e4aac5] border-dashed rounded-xl'></div>
        </div>
        {allPhoto.length > 0 &&
          allPhoto.map((item, index) => {
            return (
              <>
                <PhotosItem
                  index={index}
                  item={item}
                  handleDeletePhoto={handleDeletePhoto}
                />
              </>
            );
          })}
        {[0, 1, 2].map((item) => {
          return (
            <>
              <PhotoLogo
                key={item}
                opacity={allPhoto?.length > 0 && `hidden`}
              />
            </>
          );
        })}{' '}
      </div>
    </div>
  );
}
export function PhotosItem({ index, handleDeletePhoto, item }) {
  return (
    <div
      className={`w-[20%] flex grow shrink basis-[20%] relative justify-center items-center border-2 border-[#ccccc] border-dashed rounded-xl overflow-hidden `}
      key={index}
    >
      <div
        onClick={handleDeletePhoto}
        data-id={item?.id}
        className='bin-box w-8 h-8 p-1  rounded-full bg-[#0000006d] cursor-pointer flex items-center justify-center absolute top-3 left-3 z-50 hover:opacity-[0.9]'
      >
        <RecycleBin size={'size-5'} color={'#ffffff'} />
      </div>

      <img
        id={item?.id}
        className='w-full h-full object-cover opacity-[0.6] z-[3]'
        src={item?.src}
      ></img>
    </div>
  );
}
export function PhotoLogo({ opacity }) {
  return (
    <>
      <div
        className={`w-auto flex grow shrink basis-[20%] relative justify-center items-center ${opacity}`}
      >
        <div className='w-full h-full absolute left-0 right-0 flex items-center justify-center'>
          <Camera color={'#cccccc'} size={'size-6'} />
        </div>

        <div className='p-[50%] border-2 border-[#ccccc] border-dashed rounded-xl flex items-center justify-center'></div>
      </div>
    </>
  );
}
