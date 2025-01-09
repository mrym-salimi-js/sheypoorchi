export function adTextLengthValidation(
  callback,
  errorItem,
  inputVal,
  validation,
  textLength
) {
  const shortTextError = 'لطفا حداقل 10 حرف وارد کنید';
  const longTextError = 'لطفا حداقل 20 حرف وارد کنید';

  textLength === 'long'
    ? inputVal &&
      inputVal.length < 20 &&
      callback({ ...validation, [errorItem]: { error: longTextError } })
    : inputVal &&
      inputVal.length < 10 &&
      callback({ ...validation, [errorItem]: { error: shortTextError } });
}
