import { useEffect, useRef, useState } from 'react';
import { authenticateValidation } from '../utils/validation/authenticateValidation';
import axios from 'axios';
import AuthForm from '../components/authForm/AuthForm';
// import { userTokenCheck } from '../functions/auth/userTokenCheck';
// import { useNavigate } from 'react-router-dom';
import NotifToast from '../components/globals/NotifToast';

export default function ForgetPassword() {
  const inputRefs = useRef([]);
  const [validation, setValidation] = useState();
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  // const navigateTo = useNavigate();

  const [notifToast, setNotifToast] = useState({ message: '', status: '' });
  const [inputVal, setInputVal] = useState();

  useEffect(() => {
    document.title = 'فراموشی رمز عبور';

    // userTokenCheck(baseURL, navigateTo);
  }, []);

  const handleForgetPass = async () => {
    // Check field form value after click on login btn
    inputRefs?.current?.map((item) => {
      if (item.value === '') {
        authenticateValidation(
          (stateVal) => {
            setValidation(stateVal);
          },
          item.getAttribute('data-label'),
          item.value,
          validation,
          item.type
        );
      } else {
        setInputVal(item.value);
      }
    });
  };

  // send form data
  useEffect(() => {
    const sendForm = async () => {
      try {
        setLoading(true);
        const sendForm = await axios.post(
          `${baseURL}/api/users/forgetPassword`,
          {
            email: inputRefs?.current[0].value,
          }
        );

        if (sendForm !== undefined) {
          sendForm.data.status === 'success' &&
            setNotifToast({
              message: 'ایمیلی برای شما ارسال شد!',
              status: 'success',
            });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        error &&
          setNotifToast({
            message: 'کاربری بااین ایمیل یافت نشد',
            status: 'fail',
          });
      }
    };
    if (
      inputVal &&
      ((validation && Object?.keys(validation)?.length == 0) ||
        validation === undefined)
    ) {
      sendForm();
    }
  }, [inputVal]);

  return (
    <>
      {notifToast.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      <AuthForm
        fieldes={[{ label: 'ایمیل', type: 'email', valueType: 'email' }]}
        handleBtn={handleForgetPass}
        headerLabel={'فراموشی رمز عبور'}
        inputRefs={inputRefs}
        validation={validation}
        setValidation={setValidation}
        loading={loading}
        otherLink={[{ label: 'رمز عبورم یادمه :)', link: '/login' }]}
        btnLabel={'ارسال'}
      />
    </>
  );
}
