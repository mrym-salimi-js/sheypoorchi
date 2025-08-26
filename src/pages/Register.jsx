import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateValidation } from '../utils/validation/authenticateValidation';
import axios from 'axios';
import { navTo } from '../utils/globals/navTo';
import Cookies from 'js-cookie';
// import { userTokenCheck } from '../functions/auth/userTokenCheck';
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
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = 'ثبت نام کاربر';
    // userTokenCheck(baseURL, navigateTo);
  }, []);

  const handleRegister = async () => {
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
        setSending(!sending);
      }
    });
  };
  //send form data
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
          navTo('/account/dashboard', '', navigateTo);
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
      ((validation && Object?.keys(validation)?.length === 0) ||
        validation === undefined)
    ) {
      sendForm();
    }
  }, [sending]);

  const [passVis, setPassVis] = useState('password');
  return (
    <>
      {notifToast.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      <AuthForm
        fieldes={[
          { label: 'نام', type: 'name', valueType: 'text' },
          { label: 'ایمیل', type: 'email', valueType: 'email' },
          { label: 'رمز عبور', type: 'password', valueType: 'password' },
          {
            label: 'تکرار رمز عبور',
            type: 'password-confirm',
            valueType: 'password',
          },
        ]}
        handleBtn={handleRegister}
        headerLabel={'ثبت نام کاربر'}
        inputRefs={inputRefs}
        validation={validation}
        setValidation={setValidation}
        loading={loading}
        otherLink={[{ label: 'قبلا ثبت نام کردی؟', link: '/login' }]}
        btnLabel={'ثبت نام'}
        passVis={passVis}
        setPassVis={setPassVis}
      />
    </>
  );
}
