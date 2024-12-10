import { NewAdForm } from '../components/newAd/NewAdForm';

export default function NewAd() {
  return (
    <>
      <div className='w-[95%] lg:w-[85%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>
        <NewAdForm />
      </div>
    </>
  );
}
