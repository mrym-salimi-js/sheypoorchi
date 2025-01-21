import ProfileInput from './ProfileInput';
import { useEffect, useRef, useState } from 'react';
import { updateUserInfo } from '../../../services/user/updateUserInfo';
// import { ToastContainer, toast } from 'react-toastify';
import NotifToast from '../../globals/NotifToast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SpinnerLoading } from '../../globals/SpinnerLoading';

export default function EditInfo({ userInfo }) {
  // const [formData, setFormData] = useState();
  // const [form, setForm] = useState(false);
  const formRef = useRef();
  const [notifToast, setNotifToast] = useState({ message: '', status: '' });

  const schema = z.object({
    name: z.string().min(1, { message: 'لطفااین قسمت را تکمیل کنید' }),
    email: z
      .string()
      .min(1, { message: 'لطفااین قسمت را تکمیل کنید' })
      .email('آدرس ایمیل صحیح نمی باشد'),
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
    updateUserInfo(data);
    formRef?.current && formRef?.current.submit();
  };

  useEffect(() => {
    isSubmitting &&
      setNotifToast({
        message: 'فرم ارسال شد',
        status: 'success',
      });
  }, [isSubmitting]);
  // console.log(isSubmitted);
  // const { data } = useQuery({
  //   queryKey: ['userInfo', formData],
  //   queryFn: async () => updateUserInfo(formData),
  //   enabled: form,
  //   refetchInterval: false,
  // });

  // useEffect(() => {
  //   form &&
  //     data !== undefined &&
  //     (data?.data?.status === 'success'
  //       ? setNotifToast({
  //           message: 'تغییرات با موفقیت انجام شد.',
  //           status: 'success',
  //         })
  //       : setNotifToast({
  //           message: 'خطایی رخ داد!',
  //           status: 'fail',
  //         }));
  // }, [data]);

  // console.log(notifToast);
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
          { label: 'نام', name: 'name' },
          {
            label: 'ایمیل',
            name: 'email',
          },
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
