export function adFormValidation(callback, errorItem, validation, inputValue) {
  const epmtyFiledError = 'لطفا این قسمت را تکمیل کنید';

  !inputValue
    ? callback((prev) => ({ ...prev, [errorItem]: { error: epmtyFiledError } }))
    : validation &&
      validation[`${errorItem}`] &&
      delete validation[`${errorItem}`];
}

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

export function authenticateValidation(
  callback,
  errorItem,
  value,
  validation,
  type
) {
  const epmtyFiledError = 'لطفا این قسمت را تکمیل کنید';

  const emailError = 'لطفا ایمیل صحیح وارد کنید';
  const passwordError =
    ' رمز عبور باید دارای حداقل 8 حرف شامل حرف بزرگ، حرف کوچک و اعداد باشد';
  const confirmPass = 'تکرار رمز عبور صحیح نمی باشد';

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!value) {
    callback((prev) => ({ ...prev, [errorItem]: { error: epmtyFiledError } }));
  }

  if (value && type === 'email' && !emailRegex.test(value)) {
    callback({ ...validation, [errorItem]: { error: emailError } });
  } else {
    validation &&
      validation[`${errorItem}`] &&
      delete validation[`${errorItem}`];
  }

  if (value && type == 'password' && !passwordRegex.test(value)) {
    callback({ ...validation, [errorItem]: { error: passwordError } });
  } else {
    validation &&
      validation[`${errorItem}`] &&
      delete validation[`${errorItem}`];
  }
  if (value && type === 'confirm-password') {
    value !== localStorage.getItem('user-pass') &&
      callback({ ...validation, [errorItem]: { error: confirmPass } });
  } else {
    validation &&
      validation[`${errorItem}`] &&
      delete validation[`${errorItem}`];
  }
}
