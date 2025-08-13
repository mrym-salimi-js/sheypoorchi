import ProfileInput from './ProfileInput';
import { useState } from 'react';
import { updateUserInfo } from '../../../services/user/updateUserInfo';
// import { ToastContainer, toast } from 'react-toastify';
import NotifToast from '../../globals/NotifToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SpinnerLoading } from '../../globals/SpinnerLoading';
import { useForm } from 'react-hook-form';

export default function ProfileForm({ userInfo }) {
  const [notifToast, setNotifToast] = useState(null);

  const schema = z.object({
    name: z.string().min(1, { message: 'لطفا این قسمت را تکمیل کنید' }),
    email: z
      .string()
      .min(1, { message: 'لطفا این قسمت را تکمیل کنید' })
      .email('آدرس ایمیل صحیح نمی باشد'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: userInfo?.name || '',
      email: userInfo?.email || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await updateUserInfo(data);
      if (res?.status === 200) {
        setNotifToast({
          message: 'تغییرات با موفقیت ذخیره شد.',
          status: 'success',
        });
      } else {
        setNotifToast({ message: 'خطایی رخ داد!', status: 'fail' });
      }
    } catch (err) {
      setNotifToast({ message: 'مشکل در ارتباط با سرور.', status: 'fail' });
    }
  };

  return (
    <>
      {notifToast?.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full lg:w-1/2 h-auto flex flex-col gap-3'
      >
        {[
          { label: 'نام', name: 'name' },
          { label: 'ایمیل', name: 'email' },
        ].map((el, index) => (
          <ProfileInput
            key={index}
            el={el}
            data={userInfo}
            setValue={setValue}
            register={register}
            errors={errors}
          />
        ))}

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full h-14 flex items-center justify-center gap-3 bg-[rgb(169,206,173)] text-white cursor-pointer rounded-lg hover:opacity-[0.7] p-2'
        >
          <span>اعمال تغییرات</span>
          {isSubmitting && <SpinnerLoading w='w-5' h='h-5' />}
        </button>
      </form>
    </>
  );
}
