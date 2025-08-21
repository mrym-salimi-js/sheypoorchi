import { useContext, useState, useCallback } from 'react';
import { NewAdContext } from './NewAdForm';
import { SpinnerLoading } from '../globals/SpinnerLoading';
import formData from '../../utils/newAd/formData';
import { useMutation } from '@tanstack/react-query';
import createAd from '../../services/createAd';
import formValidate from '../../utils/newAd/formValidate';
import { clearPersistedState } from '../../store/store';

export function SubmiteFormBtn({ userInfo }) {
  const { newAdStorageValue, setValidation, validation, setNotifToast } =
    useContext(NewAdContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mutation برای ایجاد آگهی
  const mutation = useMutation({
    mutationFn: async (payload) => await createAd(payload),
    onSuccess: (data) => {
      if (data?.status === 'success') {
        setNotifToast({
          message: 'آگهی شما با موفقیت ثبت شد',
          status: 'success',
        });
        clearPersistedState();
        window.location.reload();
      } else {
        setNotifToast({
          message: 'در ثبت آگهی خطایی رخ داده',
          status: 'fail',
        });
      }
      setIsSubmitting(false);
    },
    onError: () => {
      setNotifToast({
        message: 'خطای شبکه یا سرور!',
        status: 'fail',
      });
      setIsSubmitting(false);
    },
  });

  const handleFormSubmite = useCallback(async () => {
    if (!newAdStorageValue) return;

    formValidate(
      (setVal) => {
        setValidation(setVal);
      },
      newAdStorageValue,
      validation
    );

    if (
      validation !== undefined &&
      typeof validation === 'object' &&
      Object.keys(validation).length > 0
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = await formData(newAdStorageValue, userInfo);
      if (payload) {
        mutation.mutate(payload);
      } else {
        setIsSubmitting(false);
      }
    } catch (err) {
      setIsSubmitting(false);
      setNotifToast({
        message: 'خطا در آماده‌سازی داده‌ها',
        status: 'fail',
      });
    }
  }, [newAdStorageValue, userInfo, validation, setValidation, mutation]);

  return (
    <div className='w-full h-auto flex fixed right-0 bottom-0 lg:relative z-[10000] items-center justify-center p-2'>
      {isSubmitting || mutation.isLoading ? (
        <span className='w-full h-14 flex gap-3 justify-center items-center bg-[#84105ba7] cursor-grabbing rounded-lg'>
          <p className='text-white text-sm'>در حال ثبت آگهی</p>
          <SpinnerLoading />
        </span>
      ) : (
        <span
          onClick={handleFormSubmite}
          className='w-full h-14 flex justify-center items-center bg-[#84105C] text-white cursor-pointer rounded-lg hover:opacity-[0.7]'
        >
          ثبت آگهی
        </span>
      )}
    </div>
  );
}
