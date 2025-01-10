import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authenticateValidation } from '../utils/validation/authenticateValidation';
import axios from 'axios';
import { navTo } from '../utils/globals/navTo';
import Cookies from 'js-cookie';
import AuthForm from '../components/authForm/AuthForm';
// import { userTokenCheck } from '../functions/auth/userTokenCheck';
import NotifToast from '../components/globals/NotifToast';

export default function ResetPassword() {
  const inputRefs = useRef([]);
  const [validation, setValidation] = useState();
  const navigateTo = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [notifToast, setNotifToast] = useState({ message: '', status: '' });
  const [inputVal, setInputVal] = useState();

  useEffect(() => {
    document.title = 'ساخت رمز عبور جدید';

    // userTokenCheck(baseURL, navigateTo);
  }, []);

  const handleResetPassword = async () => {
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
          `${baseURL}/resetPassword/${params.token}`,
          {
            password: inputRefs?.current[0].value,
            passwordConfirm: inputRefs?.current[1].value,
          },
          { headers: { Authorization: `Bearer ${params.token}` } }
        );

        if (sendForm !== undefined) {
          sendForm.data.status === 'success' &&
            setNotifToast({
              message: 'رمز عبور شما تغییر کرد',
              status: 'success',
            });
          Cookies.remove('user-pass'), navTo('/login', '', navigateTo);
        }
      } catch (error) {
        setLoading(false);
        error &&
          setNotifToast({
            message: 'رمز عبور موقتی وجود ندارد یا منقضی شده',
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
  // const handleResetPassword = async () => {
  //   // Check field form value after click on register btn

  //   // send form data
  //   if (validation !== undefined || Object?.keys(validation)?.length == 0) {
  //     try {
  //       setLoading(true);
  //       const sendForm = await axios.post(
  //         `${baseURL}/resetPassword/${params.token}`,
  //         {
  //           password: inputRefs?.current[0].value,
  //           passwordConfirm: inputRefs?.current[1].value,
  //         },
  //         { headers: { Authorization: `Bearer ${params.token}` } }
  //       );

  //       if (sendForm !== undefined) {
  //         sendForm.data.status === 'success' && Cookies.remove('user-pass'),
  //           navTo('/login', '', navigateTo);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error.response);
  //     }
  //   }
  // };

  return (
    <>
      {notifToast.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      <AuthForm
        fieldes={[
          { label: 'رمز عبور', type: 'password', valueType: 'password' },
          {
            label: 'تکرار رمز عبور',
            type: 'password',
            valueType: 'password',
          },
        ]}
        handleBtn={handleResetPassword}
        headerLabel={'ساخت رمز عبور جدید'}
        inputRefs={inputRefs}
        validation={validation}
        setValidation={setValidation}
        loading={loading}
        otherLink={[{ label: 'فراموشی رمز عبور!', link: '/forgetPassword' }]}
        btnLabel={'ارسال'}
      />
    </>
  );
}
