import { useContext } from 'react';
import { formLocalErrorHandling } from '../../functions/newAd/formLocalErrorHandling';
import { NewAdFormProvider } from './NewAdForm';

export function SubmiteFormBtn() {
  const {
    catAttr,
    newAdStorageValue,
    setValidation,
    validation,
    setAttrs,
    attrs,
    setFormSubmitted,
  } = useContext(NewAdFormProvider);
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
        { name: 'دسته بندی', lable: newAdStorageValue.category.lable },
        { name: 'عنوان آگهی', lable: newAdStorageValue.title },
        { name: 'توضیحات', lable: newAdStorageValue.description },
        { name: 'مکان', lable: newAdStorageValue.location.lable },
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
    <span
      onClick={handleFormSubmite}
      className='w-full h-14 fixed right-0 bottom-0 z-[1000] lg:relative  flex justify-center items-center bg-[#84105C] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '
    >
      ثبت آگهی
    </span>
  );
}
