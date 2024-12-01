import { adFormValidation } from '../../functions/validation/adFormValidation';

export function singleSelectedErrorHandling(
  setValidationCallback,
  openList,
  newAdStorageValue,
  storagePram,
  lable,
  validation
) {
  openList == false &&
    newAdStorageValue &&
    (storagePram === 'category' || storagePram === 'location'
      ? adFormValidation(
          (stateVal) => {
            setValidationCallback(stateVal);
          },
          lable,
          validation,
          newAdStorageValue[storagePram]?.dependencies[1]
        )
      : adFormValidation(
          (stateVal) => {
            setValidationCallback(stateVal);
          },
          lable,
          validation,
          newAdStorageValue[storagePram]?.lable
        ));
}
