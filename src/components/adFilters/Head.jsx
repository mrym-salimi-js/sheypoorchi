import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';

export default function Head() {
  const handleClearingFilter = () => {};
  return (
    <div className='w-full h-30 p-8 flex items-center justify-between border-b '>
      <p className='text-lg lg:text-xl'>فیلتر</p>
      <BorderRoundedBtn
        lable={'حذف فیلتر'}
        handleAction={handleClearingFilter}
        borderColor={'border-[#84105C]'}
        bgColor={'bg-pink-50'}
        textColor={'text-[#84105C]'}
      />
    </div>
  );
}
