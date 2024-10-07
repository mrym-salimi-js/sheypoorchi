import { ClearForm } from './ClearForm';

export function FormHeader() {
  return (
    <div className='w-full lg:p-4 flex justify-between items-center border-b pb-5'>
      <p className='text-lg lg:text-xl'>ثبت آگهی</p>
      <ClearForm />
    </div>
  );
}
