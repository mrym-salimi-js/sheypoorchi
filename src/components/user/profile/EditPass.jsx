import { useState } from 'react';
import ProfileInput from './ProfileInput';
import { useQuery } from '@tanstack/react-query';
import { updateUserPass } from '../../../services/user/updateUserPass';

import { ToastContainer, toast } from 'react-toastify';

export default function EditPass() {
  const [formData, setFormData] = useState();
  const [form, setForm] = useState(false);
  const errorMsg = 'خطایی رخ داده! لطفا فرم را به درستی پر کنید.';
  const successMsg = 'تغییرات با موفقیت انجام شد';

  const { data } = useQuery({
    queryKey: ['userPass', formData],
    queryFn: async () => updateUserPass(formData),
    refetchInterval: false,
    enabled: form,
    onError: () => {
      toast.error(errorMsg);
    },
    onSuccess: () => {
      toast.success(successMsg);
    },
  });

  data &&
    (data?.status !== 200 ? toast.error(errorMsg) : toast.success(successMsg));

  return (
    <>
      {<ToastContainer position='top-center' />}
      <div className='w-full lg:w-1/2 h-auto  flex flex-col gap-3'>
        {[
          { name: 'رمز عبور فعلی', key: 'passwordCurrent' },
          { name: 'رمز عبور جدید', key: 'password' },
          { name: ' تکرار رمز عبور جدید', key: 'passwordConfirm' },
        ].map((el, index) => {
          return <ProfileInput el={el} key={index} setFormData={setFormData} />;
        })}
        {/* Aplly Btn */}
        <div
          onClick={() => {
            setForm(true);
          }}
          className='w-full h-auto flex  items-center justify-center  p-2'
        >
          <span className='w-full h-14 slef-end  flex justify-center items-center bg-[rgb(169,206,173)] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '>
            اعمال تغییرات
          </span>
        </div>
      </div>
    </>
  );
}
