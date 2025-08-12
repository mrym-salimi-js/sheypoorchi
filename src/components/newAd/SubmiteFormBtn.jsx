import { useContext, useEffect, useState } from 'react';
import { NewAdContext } from './NewAdForm';
import { SpinnerLoading } from '../globals/SpinnerLoading';
import formData from '../../utils/newAd/formData';
import { useQuery } from '@tanstack/react-query';
import createAd from '../../services/createAd';
import formValidate from '../../utils/newAd/formValidate';
import { clearPersistedState } from '../../store/store';

export function SubmiteFormBtn({ userInfo }) {
  const { newAdStorageValue, setValidation, validation, setNotifToast } =
    useContext(NewAdContext);

  const [validFormData, setValidFormData] = useState(false);
  const [formDatas, setFormDatas] = useState(false);

  // Create NewAd
  const { data, isLoading } = useQuery({
    queryKey: ['creatNewAd', formDatas],
    queryFn: async () => await createAd(formDatas),
    enabled: validFormData,
  });
  // console.log(data);

  // Create Message Toast
  useEffect(() => {
    data !== undefined &&
      (data?.status === 'success'
        ? (setNotifToast({
            message: 'آگهی شما با موفقیت ثبت شد',
            status: 'success',
          }),
          clearPersistedState(),
          window.location.reload())
        : setNotifToast({
            message: 'در ثبت آگهی خطایی رخ داده',
            status: 'fail',
          }));
  }, [data]);

  // Get FormData And Validate Them
  const handleFormSubmite = () => {
    const getFormData = async () => {
      const res = await formData(newAdStorageValue, userInfo);

      res !== undefined && setFormDatas(res);
    };

    newAdStorageValue &&
      (validation === undefined ||
        (typeof validation === 'object' &&
          Object.entries(validation)?.length == 0)) &&
      setValidFormData(true),
      getFormData();

    if (newAdStorageValue) {
      //Form Final Error Handling
      formValidate(
        (setVal) => {
          setValidation(setVal);
        },
        newAdStorageValue,
        validation
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='w-full h-auto flex fixed right-0 bottom-0  lg:relative z-[10000] items-center justify-center  p-2'>
          <span className='w-full h-14   flex gap-3 justify-center  items-center bg-[#84105ba7]  cursor-grabbing rounded-lg '>
            <p className='text-white'> در حال ارسال فرم</p>
            <SpinnerLoading />
          </span>
        </div>
      ) : (
        <div className='w-full h-auto flex fixed right-0 bottom-0  lg:relative z-[10000] items-center justify-center  p-2'>
          <span
            onClick={handleFormSubmite}
            className='w-full h-14    flex justify-center items-center bg-[#84105C] text-white cursor-pointer rounded-lg hover:opacity-[0.7] '
          >
            ثبت آگهی
          </span>
        </div>
      )}
    </>
  );
}
