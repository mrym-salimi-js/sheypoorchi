import ProfileInput from './ProfileInput';
import { useRef, useState } from 'react';
import { updateUserPass } from '../../../services/user/updateUserPass';
// import { ToastContainer, toast } from 'react-toastify';
import NotifToast from '../../globals/NotifToast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SpinnerLoading } from '../../globals/SpinnerLoading';
import { dashboardInvalidate } from '../../../utils/user/dashboardInvalidate';

export default function EditPass({ userInfo }) {
  // const [formData, setFormData] = useState();
  // const [form, setForm] = useState(false);
  const formRef = useRef();
  const [notifToast, setNotifToast] = useState({ message: '', status: '' });

  const schema = z
    .object({
      passwordCurrent: z
        .string()
        .min(8, 'رمز عبور باید حداقل شامل 8 کاراکتر باشد')
        .regex(/[a-z]/, 'رمز عبور باید حداقل شامل یک حرف کوچک باشد')
        .regex(/[A-Z]/, 'رمز عبور باید حداقل شامل یک حرف بزرگ باشد')
        .regex(/[0-9]/, 'رمز عبور باید حداقل شامل یک عدد باشد'),
      // .regex(
      //   /[@$!%-*?&_]/,
      //   'رمز عبور باید حداقل شامل یکی از این (@$!%-*?&_) کاراکتر ها باشد'
      // ),
      password: z.string().min(1, { message: 'لطفااین قسمت را تکمیل کنید' }),
      passwordConfirm: z
        .string()
        .min(1, { message: 'لطفااین قسمت را تکمیل کنید' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'تکرار رمز عبور اشتباه است',
      path: ['passwordConfirm'], // path of error
    });

  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    // console.log(data);
    const setPass = async () => {
      const res = await updateUserPass(data);
      await dashboardInvalidate();
      res &&
        setNotifToast({
          message: res.message,
          status: res.status,
        });
    };
    setPass();
    formRef?.current && formRef?.current.submit();
  };

  return (
    <>
      {notifToast.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      {/* {<ToastContainer position='top-center' />} */}
      <form
        ref={formRef}
        className='w-full lg:w-1/2 h-auto  flex flex-col gap-3'
      >
        {[
          { label: 'رمز عبور فعلی', name: 'passwordCurrent' },
          { label: 'رمز عبور جدید', name: 'password' },
          { label: ' تکرار رمز عبور جدید', name: 'passwordConfirm' },
        ].map((el, index) => {
          return (
            <ProfileInput
              data={userInfo}
              el={el}
              key={index}
              setValue={setValue}
              // setFormData={setFormData}
              register={register}
              errors={errors}
            />
          );
        })}
        {/* Aplly Btn */}
        <div
          onClick={handleSubmit(onSubmit)}
          className='w-full h-14 flex  items-center justify-center  gap-3 bg-[rgb(169,206,173)] text-white cursor-pointer rounded-lg hover:opacity-[0.7]  p-2'
        >
          <span className='w-auto  slef-end  flex justify-center items-center '>
            اعمال تغییرات
          </span>
          {isSubmitting && <SpinnerLoading w={'w-5'} h={'h-5'} />}
        </div>
      </form>
    </>
  );
}
