import { adFormValidation } from '../../functions/validation/adFormValidation';

export function formLocalErrorHandling(
  setValidationCallback,
  attrs,
  formMainParams,
  validation
) {
  attrs?.forEach((item) => {
    adFormValidation(
      (stateVal) => {
        setValidationCallback(stateVal);
      },
      item.name,
      validation,
      item.lable
    );
  });

  formMainParams?.map((item) => {
    !item.lable &&
      adFormValidation(
        (stateVal) => {
          setValidationCallback(stateVal);
        },
        item.name,
        validation,
        item.lable
      );
  });
}
