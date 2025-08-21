import { adFormValidation } from '../validation/adFormValidation';

const formValidate = async (
  setValidationCallback,
  newAdStorageValue,
  validation
) => {
  //Get Storage Parameters For Validation
  const formParams = [
    {
      label: 'دسته بندی',
      name: newAdStorageValue?.category?.dependencies[1],
    },
    { label: 'عنوان آگهی', name: newAdStorageValue?.title },
    { label: 'توضیحات', name: newAdStorageValue?.description },
    { label: 'مکان', name: newAdStorageValue?.location?.dependencies[1] },
  ];

  formParams?.map((item) => {
    !item.name &&
      adFormValidation(
        (stateVal) => {
          setValidationCallback(stateVal);
        },
        item.label,
        validation,
        item.name
      );
  });

  newAdStorageValue?.attribute?.map((item) => {
    !item.name &&
      adFormValidation(
        (stateVal) => {
          setValidationCallback(stateVal);
        },
        item.label,
        validation,
        item.name
      );
  });
};
export default formValidate;
