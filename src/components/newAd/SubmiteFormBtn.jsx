import { useContext, useState, useCallback } from 'react';
import { NewAdContext } from './NewAdForm';
import { SpinnerLoading } from '../globals/SpinnerLoading';
import formData from '../../utils/newAd/formData';
import { useMutation } from '@tanstack/react-query';
import createAd from '../../services/createAd';
import formValidate from '../../utils/newAd/formValidate';
import { clearPersistedState } from '../../store/store';
import { ChevronLeft } from '../globals/Icons';

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
        message: 'خطای سرور',
        status: 'fail',
      });
      setIsSubmitting(false);
    },
  });
  useCallback(() => {
    const sending = async () => {
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
    };

    if (
      validation !== undefined &&
      typeof validation === 'object' &&
      Object.keys(validation).length > 0
    ) {
      return;
    } else {
      setIsSubmitting(true);
      sending();
    }
  }, [validation]);

  const handleFormSubmite = async () => {
    if (!newAdStorageValue) return;

    await formValidate(
      (setVal) => {
        setValidation(setVal);
      },
      newAdStorageValue,
      validation
    );
  };

  return (
    <button
      onClick={handleFormSubmite}
      type='button'
      className='w-full h-auto bg-[#84105C] p-3 rounded-full flex items-center justify-around  hover:opacity-[0.9] shadow-md focus:outline-none'
    >
      <p className='w-[90%] text-sm text-white'>
        {isSubmitting || mutation.isLoading ? 'درحال ثبت آگهی' : 'ثبت آگهی'}
      </p>

      <div className='rounded-full bg-[#89677f87] p-1 relative right-3 ml-2'>
        {isSubmitting || mutation.isLoading ? (
          <SpinnerLoading w={'w-5'} h={'h-5'} />
        ) : (
          <ChevronLeft color={'#ffffff'} strokeWidth={'1.5'} size={'size-5'} />
        )}
      </div>
    </button>
  );
}
