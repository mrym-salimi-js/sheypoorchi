import { useContext } from 'react';
import { formLocalErrorHandling } from '../../functions/newAd/formLocalErrorHandling';
import { NewAdContext } from './NewAdForm';
import { SpinnerLoading } from '../globals/SpinnerLoading';

export function SubmiteFormBtn({ sendLoading }) {
  const {
    catAttr,
    newAdStorageValue,
    setValidation,
    validation,
    setAttrs,
    attrs,
    setFormSubmitted,
  } = useContext(NewAdContext);
  const handleFormSubmite = () => {
    //Get Storage Category Attributes
    const attrRes = catAttr?.map((item) => {
      return item.value.options
        ? {
            id: +item.id,
            name: item.name,
            lable: item.value.lable,
            lableId: item.value.id,
          }
        : { id: +item.id, name: item.name, lable: item.value };
    });

    attrRes && setAttrs(attrRes);

    if (newAdStorageValue) {
      //Get Storage Parameters For Validation
      const formMainParams = [
        { name: 'دسته بندی', lable: newAdStorageValue?.category?.lable },
        { name: 'عنوان آگهی', lable: newAdStorageValue?.title },
        { name: 'توضیحات', lable: newAdStorageValue?.description },
        { name: 'مکان', lable: newAdStorageValue?.location?.lable },
      ];

      //Form Final Error Handling
      formLocalErrorHandling(
        (setVal) => {
          setValidation(setVal);
        },
        attrs,
        formMainParams,
        validation
      );

      setFormSubmitted(true);
    }
  };
  return (
    <>
      {sendLoading ? (
        <div className='w-full h-auto flex fixed right-0 bottom-0  lg:relative z-[10000] items-center justify-center  p-2'>
          <span className='w-full h-14   flex gap-3 justify-center  items-center bg-[#84105ba7]  cursor-grabbing rounded-lg '>
            <p className='text-white'> در حال ارسال فرم</p>
            <SpinnerLoading />
          </span>
        </div>
      ) : (
        <div className='w-full h-auto flex fixed right-0 bottom-0  lg:relative z-[10000] items-center justify-center  p-2'>
          <span
            onClick={handleFormSubmite}
            className='w-full h-14    flex justify-center items-center bg-[#84105C] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '
          >
            ثبت آگهی
          </span>
        </div>
      )}
    </>
  );
}
