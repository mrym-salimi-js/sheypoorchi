import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateValidation } from '../functions/validation/adFormValidation';
import axios from 'axios';
import { navTo } from '../functions/globals/navTo';
import Cookies from 'js-cookie';
import { userTokenCheck } from '../functions/auth/userTokenCheck';
import AuthForm from '../components/authForm/AuthForm';
import NotifToast from '../components/globals/NotifToast';

export default function Register() {
  const inputRefs = useRef([]);
  const [validation, setValidation] = useState();
  const navigateTo = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);

  const [notifToast, setNotifToast] = useState({ message: '', status: '' });
  const [inputVal, setInputVal] = useState();

  useEffect(() => {
    document.title = 'ثبت نام کاربر';
    userTokenCheck(baseURL, navigateTo);
  }, []);

  const handleRegister = async () => {
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
        const sendForm = await axios.post(`${baseURL}/api/users/register`, {
          name: inputRefs?.current[0].value,
          email: inputRefs?.current[1].value,
          password: inputRefs?.current[2].value,
          passwordConfirm: inputRefs?.current[3].value,
        });

        if (sendForm !== undefined) {
          sendForm.data.status === 'success' && Cookies.remove('user-pass'),
            Cookies.set('user-Token', sendForm.data.token);
          navTo('/myAccount/dashboard', '', navigateTo);
        }
      } catch (error) {
        setLoading(false);
        error.response.status !== 200 &&
          setNotifToast({
            message: 'خطایی رخ داده',
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
        fieldes={[
          { lable: 'نام', type: 'name', valueType: 'text' },
          { lable: 'ایمیل', type: 'email', valueType: 'email' },
          { lable: 'رمز عبور', type: 'password', valueType: 'password' },
          {
            lable: 'تکرار رمز عبور',
            type: 'password-confirm',
            valueType: 'password',
          },
        ]}
        handleBtn={handleRegister}
        headerLable={'ثبت نام کاربر'}
        inputRefs={inputRefs}
        validation={validation}
        setValidation={setValidation}
        loading={loading}
        otherLink={[{ lable: 'قبلا ثبت نام کردی؟', link: '/login' }]}
        btnLable={'ثبت نام'}
      />
    </>
  );
}
