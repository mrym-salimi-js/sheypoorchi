// import { useQuery } from '@tanstack/react-query';
import ProfileInput from './ProfileInput';
import { useRef, useState } from 'react';
import { updateUserInfo } from '../../../services/user/updateUserInfo';
// import { ToastContainer, toast } from 'react-toastify';
import NotifToast from '../../globals/NotifToast';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function EditInfo({ userInfo }) {
  // const [formData, setFormData] = useState();
  // const [form, setForm] = useState(false);
  const formRef = useRef();
  const [notifToast, setNotifToast] = useState({ message: '', status: '' });

  const schema = yup
    .object({
      name: yup.string().required('لطفااین قسمت را تکمیل کنید'),
      email: yup
        .string()
        .email('آدرس ایمیل صحیح نمی باشد')
        .required('لطفااین قسمت را تکمیل کنید'),
    })
    .required();

  const {
    register,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   name: userInfo !== undefined && userInfo?.name,
    //   email: userInfo !== undefined && userInfo?.email,
    // },
  });
  console.log(errors);
  const onSubmit = (data) => {
    updateUserInfo(data);
    formRef?.current && formRef?.current.submit();
  };

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
          { label: 'نام', name: 'name', error: 'لطفا این قسمت را تکمیل کنید' },
          {
            label: 'ایمیل',
            name: 'email',
            error: 'لطفا این قسمت را تکمیل کنید',
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
              trigger={trigger}
            />
          );
        })}
        {/* Aplly Btn */}
        <div
          onClick={handleSubmit(onSubmit)}
          className='w-full h-auto flex  items-center justify-center  p-2'
        >
          <span className='w-full h-14 slef-end  flex justify-center items-center bg-[rgb(169,206,173)] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '>
            اعمال تغییرات
          </span>
        </div>
      </form>
    </>
  );
}
