import Cookies from 'js-cookie';

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
  if (value && type === 'password-confirm') {
    value !== Cookies.get('user-pass') &&
      callback({ ...validation, [errorItem]: { error: confirmPass } });
  } else {
    validation &&
      validation[`${errorItem}`] &&
      delete validation[`${errorItem}`];
  }
}
