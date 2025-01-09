import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateValidation } from '../utils/validation/authenticateValidation';
import axios from 'axios';
import { navTo } from '../utils/globals/navTo';
import Cookies from 'js-cookie';
import AuthForm from '../components/authForm/AuthForm';
import NotifToast from '../components/globals/NotifToast';

export default function Login() {
  const inputRefs = useRef([]);
  const [validation, setValidation] = useState();
  const navigateTo = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [notifToast, setNotifToast] = useState({ message: '', status: '' });
  const [inputVal, setInputVal] = useState();

  useEffect(() => {
    document.title = 'ورود کاربر';
    // userTokenCheck(baseURL, navigateTo);
  }, []);

  const handleLogin = async () => {
    // Check field form value after click on login btn
    inputRefs?.current?.map((item) => {
      if (item.value === '') {
        authenticateValidation(
          (stateVal) => {
            setValidation(stateVal);
          },
          item.getAttribute('data-lable'),
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
          `${baseURL}/api/users/login`,
          {
            email: inputRefs?.current[0].value,
            password: inputRefs?.current[1].value,
          },
          {
            withCredentials: true,
          }
        );

        if (sendForm !== undefined) {
          sendForm.data.status === 'success' && Cookies.remove('user-pass'),
            // Cookies.set('user-Token', sendForm.data.token);
            navTo('/dashboard/myProfile', '', navigateTo);
        }
      } catch (error) {
        setLoading(false);
        error.response.status !== 200 &&
          setNotifToast({
            message: 'کاربری با این مشخصات یافت نشد',
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

  // console.log(inputVal);
  return (
    <>
      {notifToast.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      <AuthForm
        fieldes={[
          { lable: 'ایمیل', type: 'email', valueType: 'email' },
          { lable: 'رمز عبور', type: 'password', valueType: 'password' },
        ]}
        handleBtn={handleLogin}
        headerLable={'ورود کاربر'}
        inputRefs={inputRefs}
        validation={validation}
        setValidation={setValidation}
        loading={loading}
        otherLink={[
          { lable: 'هنوز ثبت نام نکردی؟', link: '/register' },
          { lable: 'رمز عبورتو فراموش کردی؟', link: '/forgetPassword' },
        ]}
        btnLable={'ورود'}
      />
    </>
  );
}
