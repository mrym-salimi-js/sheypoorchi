export function adFormValidation(callback, errorItem, validation, inputValue) {
  const epmtyFiledError = 'لطفا این قسمت را تکمیل کنید';

  !inputValue
    ? callback((prev) => ({ ...prev, [errorItem]: { error: epmtyFiledError } }))
    : validation &&
      validation[`${errorItem}`] &&
      delete validation[`${errorItem}`];
}
