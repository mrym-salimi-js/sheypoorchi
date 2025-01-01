import { useQuery } from '@tanstack/react-query';
import ProfileInput from './ProfileInput';
import { useState } from 'react';
import { updateUserInfo } from '../../../services/user/updateUserInfo';
import { ToastContainer, toast } from 'react-toastify';

export default function EditInfo({ userInfo }) {
  const [formData, setFormData] = useState();
  const [form, setForm] = useState(false);

  const { data } = useQuery({
    queryKey: ['userInfo', formData],
    queryFn: async () => updateUserInfo(formData),
    enabled: form,
    refetchInterval: false,
  });

  form &&
    data !== undefined &&
    (data?.data?.status === 'success'
      ? toast.success('تغییرات با موفقیت انجام شد.')
      : toast.error('خطایی رخ داد!'));
  return (
    <>
      {<ToastContainer position='top-center' />}
      <div className='w-full lg:w-1/2 h-auto  flex flex-col gap-3'>
        {[
          { name: 'نام', key: 'name' },
          { name: 'ایمیل', key: 'email' },
        ].map((el, index) => {
          return (
            <ProfileInput
              data={userInfo}
              el={el}
              key={index}
              setFormData={setFormData}
            />
          );
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
